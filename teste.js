/* var btnAdicionar = document.querySelector("#btnAdd");  */
var inputItem = document.getElementById("inputItem");
var form = document.querySelector("#form");
var lista = document.querySelector("#lista");
var btnSalvar = document.querySelector("#btnSalvar");
var itensDaLista = [];
btnSalvar.addEventListener('click', salvarLista)
//pega a variavel form, que faz referência ao id do formulario
form.addEventListener("submit", function (event) {
    event.preventDefault();
    addItemNaLista(inputItem.value);
});
carregaLista();
function addItemNaLista(txtItem) {
    var optDefault = document.getElementById("optDefault");
    if (txtItem) {
        if (optDefault) {
            lista.remove(optDefault);
        }
        //DONE: Adicionar item na lista
        var novoItem = document.createElement("option");
        novoItem.innerText = txtItem;
        novoItem.value = txtItem;
        lista.appendChild(novoItem);
        itensDaLista.push(txtItem);
        inputItem.value = "";
        inputItem.focus();
    }
    else {
        alert("Favor inserir um item");
    }
    console.log(txtItem);
}
function salvarLista() {
    localStorage.setItem("lista", JSON.stringify(itensDaLista));
}
function carregaLista() {
    var listaLocalStorage = JSON.parse(localStorage.getItem("lista"));
    console.log(listaLocalStorage);
    console.log(typeof listaLocalStorage)
    for(var i = 0; i < listaLocalStorage.length;i++) {
        addItemNaLista(listaLocalStorage[i]);
    }
}