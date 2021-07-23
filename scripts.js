var form = document.querySelector("#form");
var inputItem = document.getElementById("inputItem");
var lista = document.querySelector("#lista");


form.addEventListener("submit", function (event) {
    event.preventDefault();
    addItemNaLista();
});

function addItemNaLista() {
    var txtItem = inputItem.value;
    if (txtItem) {
        var novoItem = document.createElement('li');
        novoItem.classList.add("list-group-item")
        novoItem.innerHTML = `<input type="checkbox" value="0">
                                <span class=""></span>
                                <button type="button" class="btn btn-sm float-right">🗑️Excluir</button>`
        novoItem.querySelector("span").innerHTML = txtItem;
        lista.appendChild(novoItem);
        inputItem.value = "";
        inputItem.focus();
    } else {
        alert("Você deve digitar uma tarefar antes de adicionar")
    }
}

lista.addEventListener("click", function (event) {
    console.log(event.target)
    if (event.target.type == "checkbox") {
        marcarItemFeito(event.target);
    }
    if (event.target.type == "button") {
        event.target.parentNode.remove();
    }
});


function marcarItemFeito(feito) {
    var item = feito.parentNode;
    var itemFeito = item.querySelector("span");
    if (feito.checked) {
        feito.checked = true;
        feito.value = 1;
        itemFeito.classList.add("item")
    } else {
        feito.checked = false;
        feito.value = 0;
        itemFeito.classList.remove("item")
    }
}

function removerItem(item) {
    item.parentNode.remove();
}