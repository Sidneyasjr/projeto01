var form = document.querySelector("#form");
var inputItem = document.getElementById("inputItem");
var lista = document.querySelector("#lista");
var itensDaLista = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();
    addItemNaLista(inputItem.value);
});

carregaLista();
function addItemNaLista(txtItem) {
    if (txtItem) {
        var novoItem = document.createElement('li');
        novoItem.classList.add("list-group-item")
        novoItem.innerHTML = `<input type="checkbox" value="0">
                                <span class=""></span>
                                <button type="button" class="btn btn-sm float-right">🗑️Excluir</button>`
        novoItem.querySelector("span").innerHTML = txtItem;
        lista.appendChild(novoItem);
        inputItem.value ="";
        itensDaLista.push(txtItem);
        inputItem.focus();
        salvarLista();
    } else {
        alert("Você deve digitar uma tarefar antes de adicionar")
    }
}

lista.addEventListener("click", function (event) {
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


function salvarLista() {
    localStorage.setItem("lista", JSON.stringify(itensDaLista));
}

function carregaLista() {
    var listaLocalStorage = JSON.parse(localStorage.getItem("lista"));
    if (listaLocalStorage) {
        for (var i = 0; i < listaLocalStorage.length; i++) {
            addItemNaLista(listaLocalStorage[i]);
        }
    }
}

