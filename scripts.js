var form = document.querySelector("#form");
var inputItem = document.getElementById("inputItem");
var lista = document.querySelector("#lista");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    addItemNaLista();
});

function addItemNaLista() {
    var txtItem = inputItem.value;
    var itemDefault = document.getElementById('itemDefault');
    if (txtItem) {
        var novoItem = document.createElement('li');
        novoItem.innerHTML = itemDefault.innerHTML;
        // novoItem.hidden = false;
        novoItem.classList.add("list-group-item")
        novoItem.querySelector("span").innerHTML = txtItem;
        lista.appendChild(novoItem);
        inputItem.value = "";
        inputItem.focus();
    } else {
        alert("Você deve digitar uma tarefar antes de adicionar")
    }
}