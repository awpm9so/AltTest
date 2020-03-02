var input = document.getElementById("add_input");
var table = document.getElementById("my_table");
var radio = document.getElementsByName("sort");


//при первом выводе таблицы, проверяем, как нужно отсортировать
for (var i=0;i<radio.length; i++) {
  if (radio[i].checked){
    PrintTable(radio[i].value);
    break;
  }
}


 //прверка был ли изменен тип сортировки
 for (var i=0;i<radio.length; i++) {
  radio[i].onchange = sort;
}
function sort(){
 PrintTable(this.value);
}




//клик по кнопке удалить, для удаления строки записи
$("#my_table").on("click", ".delete_button", function(e) {  
  id_delete = $(this).parent().siblings(":first").text();
  //var value=$(this).closest('tr').children('td:first').text();
  Delete(id_delete);

  for (var i=0;i<radio.length; i++) {
    if (radio[i].checked){
      PrintTable(radio[i].value);
      break;
    }
  }
});



var id_update = "";
//id для update
$("#my_table").on("click", "tr", function(e) {
  id_update = (($(e.currentTarget).find('td:first').text() ));
  //console.log(id_update);
});


function PrintTable(sort_type){
 $.ajax({
    url: 'http://localhost:3000/' + sort_type,
    method: 'get',
    dataType: 'html',     
    success: function(data){       
       $("#my_table").html(data);  
    }
 });
}

function Update(edit_massage){
    $.ajax({
      url: 'http://localhost:3000/' + id_update,
      method: 'post',
      dataType: 'json',
      data: {edit: edit_massage},
      success: function(data){
        console.log(data);                         
      }
    });                
}

function Delete(id_delete){
    $.ajax({
      url: 'http://localhost:3000/delete/' + id_delete,
      method: 'post',
      dataType: 'json',
      success: function(data){
        console.log(data);                         
      }
    });                
}

$(document).ready(function(){ 
 //добавление записи
   $("#add_btn").bind("click", function(){
     if (input.value != "") //если строка ввода не пустая, то добавляем запись
    $.ajax({
      url: 'http://localhost:3000',
      method: 'post',
      dataType: 'json',
      data: {message: input.value},
      success: function(data){
      console.log(data);  
      input.value = "";  
      }
      });
      //провереям тип сортировки, чтобы правильно втсавить новую запись
      for (var i=0;i<radio.length; i++) {
        if (radio[i].checked){
          PrintTable(radio[i].value);
          break;
        }
      }
      PrintTable(radio[i].value);
        });    

      });




let editingTd;

//редактировние при клике на запись
table.onclick = function(event) {
  // 3 возможных цели
  let target = event.target.closest('.edit-cancel,.edit-ok,td');

  if (!table.contains(target)) return;

  if (event.target.className == 'delete_button') return; //игнорируем нажатие на кнопку "Delete"
  if (event.target.className == 'id') return; //игнорируем нажатие на № 
  
  if (target.className == 'edit-cancel' ) {
    finishTdEdit(editingTd.elem, false);
  } else if (target.className == 'edit-ok') {
    finishTdEdit(editingTd.elem, true);
  } else if (target.nodeName == 'TD') {
    if (editingTd) return; // уже редактируется

    makeTdEditable(target);
  }

};

function makeTdEditable(td) {
  editingTd = {
    elem: td,
    data: td.innerHTML
  };

  let textArea = document.createElement('textarea');
  textArea.style.width = td.clientWidth + 'px';
  textArea.style.height = td.clientHeight + 'px';
  textArea.className = 'edit-area';

  textArea.value = td.innerHTML;
  td.innerHTML = '';
  td.appendChild(textArea);
  textArea.focus();

  td.insertAdjacentHTML("beforeEnd",
    '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
  );
}

function finishTdEdit(td, isOk) {
  if (isOk) {
    td.innerHTML = td.firstChild.value;
    Update(td.innerHTML);
  } else {
    td.innerHTML = editingTd.data;
  }
   editingTd = null;
}





  
