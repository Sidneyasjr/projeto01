var form = document.querySelector("#form");
var inputItem = document.getElementById("inputItem");
var lista = document.querySelector("#lista");


form.addEventListener("submit", function(event) {
    event.preventDefault();
    addItemNaLista();
});



function addItemNaLista() {
    var txtItem = inputItem.value;
    if (txtItem) {
        var novoItem = document.createElement('li');
        novoItem.classList.add("list-group-item")
        novoItem.innerHTML = `<input type="checkbox" class="">
                                <span class=""></span>
                                <button type="button" class="btn btn-sm btn-danger excluir float-right"><i
                                        class="bi bi-trash"></i></button>`
        novoItem.querySelector("span").innerHTML = txtItem;
        lista.appendChild(novoItem);
        inputItem.value = "";
        inputItem.focus();
    } else {
        alert("Você deve digitar uma tarefar antes de adicionar")
    }
}