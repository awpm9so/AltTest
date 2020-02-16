


 var index = 0; // порядковый номер записи

    var button = document.getElementById("add_btn");
    var input = document.getElementById("add_input");
    var table = document.getElementById("my_table");
    var radio = document.getElementsByName("sort");
// добавление новой записи
      button.addEventListener("click", function(){
      var row = document.createElement("tr"); 
      if (input.value != ""){     
        table.appendChild(row);
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("button");
        var td4 = document.createElement("button");

        td1.innerHTML = ++index;
        td2.innerHTML = input.value;
        td3.textContent = "Udate"
        td4.textContent = "Delete";
          
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);


        //перед добавлением смотрим, как нужно отсортировать новую запись
        for (var i=0;i<radio.length; i++) {
          if (radio[i].checked){
            sort(radio[i].value);
            break;
          }
      }
        input.value = "";   

        //удаление записи
        td4.addEventListener("click", function(){
            this.parentNode.remove();            
        });


        //редактирование записи
        td3.addEventListener("click", function(){
          var update = document.createElement("input");
          var ok = document.createElement("button");
          var cancel = document.createElement("button");
          ok.textContent = "Ok";
          cancel.textContent = "Cancel";
          this.parentNode.innerHTML= "";
          update.value = td2.textContent;        
          row.appendChild(td1);
          row.appendChild(update);
          row.appendChild(ok);
          row.appendChild(cancel);

          ok.addEventListener("click", function(){  
              this.parentNode.innerHTML= "";            
              td2.innerHTML = update.value;
              row.appendChild(td1);
              row.appendChild(td2);
              row.appendChild(td3);
              row.appendChild(td4);              
          });

          cancel.addEventListener("click", function(){
            this.parentNode.innerHTML= "";            
            td2.innerHTML = td2.textContent;
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4); 
          });


        });

      


        
      }//if 

});



//проверяем был ли изменен тип сортировки
for (var i=0;i<radio.length; i++) {
        radio[i].onchange = sort;
    }

function sort(type_sorted){

  
  if (this.value == "asc_num" || type_sorted.value == "asc_num") {
  let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => (Number)(rowA.cells[0].innerHTML) > (Number)(rowB.cells[0].innerHTML) ? 1 : -1);

   table.tBodies[0].append(...sortedRows);
  }
  else if (this.value == "desc_num" || type_sorted == "desc_num"){
    let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => (Number)(rowA.cells[0].innerHTML) < (Number)(rowB.cells[0].innerHTML) ? 1 : -1);
   table.tBodies[0].append(...sortedRows);
  }

  else if (this.value == "asc_alp" || type_sorted == "asc_alp"){
    let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1);

   table.tBodies[0].append(...sortedRows);
  }

  else if (this.value == "desc_alp" || type_sorted == "desc_alp"){
    let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[1].innerHTML < rowB.cells[1].innerHTML ? 1 : -1);

   table.tBodies[0].append(...sortedRows);
  }
   
}
  


