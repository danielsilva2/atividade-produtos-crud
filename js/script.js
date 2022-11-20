// request via JavaScript ajax 4 passos
// 01 criar a váriavel
xhttp = new XMLHttpRequest();
var lista;
var api = "https://jrv-java.herokuapp.com/api/produto/";


function listar() {
    // 02 definição do nosso request (forma e endereço)
    xhttp.open("GET", api);
    // 03 manda de fato a request
    xhttp.send();
    // 04 execução quando tiver a devolutiva do request
    xhttp.onload = function () {
        lista = this.responseText;
        // console.log(lista);
        lista = JSON.parse(lista);
        // console.log(lista);
        texto = "";
        i = 0;
        for (const p of lista) {
            texto += `<tr onclick='editar(${i})'><td>${p.nome}</td><td>${p.descricao}</td><td>${p.valor}</td></tr>`;
            i++;
        }
        document.getElementById('lista').innerHTML = texto;
    }
}

function editar(i) {
    p = lista[i];
    document.getElementById("nome").value = p.nome;
    document.getElementById("descricao").value = p.descricao;
    document.getElementById("valor").value = p.valor;
    document.getElementById("id").value = p.id;
}

function gravar() {
    //alert("Estamos dentro da function incluir");
    var produto = {};
    produto.nome = document.getElementById("nome").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.valor = document.getElementById("valor").value;
    // console.log(produto);

    produto.id = document.getElementById("id").value;
    if (produto.id > 0) {
        acao = "PUT"; // alteração
    } else {
        acao = "POST"; // incluir
    }

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(produto));
    xhttp.onload = function () {
        // console.log(this.responseText);
        listar();
        limpar();
    }
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        listar();
        limpar();
    }

}
listar();