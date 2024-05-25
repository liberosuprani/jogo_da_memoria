
const FORMULARIO_REGISTRO = "registerForm";
const BOTAO_REGISTRO = "botaoRegisto";
const ITEM_DADOS_USUARIO = "dados";
const EMAIL_ID = "email";
const NAME_ID = "name";
const GENDER_ID = "gender";
const PASSWORD_ID = "password";
const AGE_ID = "age";

let formulario = null;
let dados = [];

console.log("lista aqui", dados)

class User {
    constructor(email, nome, senha, idade = null, genero, scores = { jogos: null, tempoTotal: null, tempoPorJogo: [] }) {
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.idade = idade;
        this.genero = genero;
        this.scores = scores;
    }
}

window.addEventListener("load", principal);

function defineEventListeners() {
    document.getElementById(BOTAO_REGISTRO).addEventListener("click", gravaDadosUser);
}

function principal() {
    obtemDadosUsuario();
    formulario = document.forms[FORMULARIO_REGISTRO];
    console.log(formulario);
    defineEventListeners();
}

function obtemDadosUsuario() {
    dados = JSON.parse(localStorage.getItem(ITEM_DADOS_USUARIO)) || [];
}

function gravaDadosUser() {
    let errorMsg = document.getElementById("errorMsg");
    let usuarioJaExiste = false;

    let email = formulario.elements[EMAIL_ID].value;

    for (let i = 0; i < dados.length; i++) {
        if (email == dados[i].email) {
            usuarioJaExiste = true;
            break;
        }
    }
    if (usuarioJaExiste) {
        errorMsg.style.visibility = "visible";
    }
    else {
        errorMsg.style.visibility = "hidden";

        let name = formulario.elements[NAME_ID].value;
        let password = formulario.elements[PASSWORD_ID].value;
        let age = formulario.elements[AGE_ID].value;
        let gender = formulario.elements[GENDER_ID].value;

        console.log("dados user: ", dados);
        dados.push(new User(email, name, password, age, gender));
        localStorage.setItem(ITEM_DADOS_USUARIO, JSON.stringify(dados));
        window.location.href = "login.html";
    }
}