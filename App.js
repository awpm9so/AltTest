function add(){
    var li = document.createElement("li");  
    var input = document.getElementById("add");
    li.innerHTML = input.value;
   
    input.value = "";

    document.getElementById("list").appendChild(li);
}



