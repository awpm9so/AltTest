
window.onload=function(){
//добавляем знечение введное в текстовое поле в список 
var button = document.getElementById("add_btn");
button.addEventListener("click", function(){
    
    var li = document.createElement("li"); 
    var input = document.getElementById("add_input");
    li.innerHTML = input.value + " <button style=\"font-size:5px\">X</button>"; 
    input.value = "";
    document.getElementById("list").appendChild(li);


     //удаление записи по нажатию на кнопку "X", которая распологаяется рядом с ней
     li.addEventListener('click', function (e) {
                if(e.target && e.target.nodeName == "BUTTON") {                     
                e.target.parentNode.remove();               
        }         
        });

}); 
}

