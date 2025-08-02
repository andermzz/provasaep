//pegando elementos
const mainGeral = document.querySelector('#geral')
const inputNome = document.querySelector('#nome')
const inputEmail = document.querySelector("#email")

const cadastroUsuario = (e) => {
    e.preventDefault()

    usuario = {
        "nome": inputNome.value,
        "email": inputEmail.value
    }

    enviarDados(usuario)
}

const enviarDados = (objUsuario) => {
    const endPoint = `https://localhost:7211/api/Usuario`

    fetch(endPoint, {
        method: 'POST',
        body: JSON.stringify({
            "nome": objUsuario.nome,
            "email": objUsuario.email
        }),
        headers: {
            'Content-type': 'application/json',
        },
    }).then((resposta) => resposta.json())
        .then((info) => console.log(info))
        .catch((error) => console.log(error))

    mensagem('Cadastrado com Sucesso')
}

const mensagem = (txt) => {
    const btnOk = document.createElement('button')
    btnOk.setAttribute('id', 'btnOk')
    btnOk.innerHTML = 'OK'

    btnOk.addEventListener('click', () => {
        window.location = 'index.html'
    })

    const caixaDialog = document.createElement('dialog')
    caixaDialog.setAttribute('class', 'mensagem')
    caixaDialog.innerHTML = `<h2>${txt}</h2>`

    caixaDialog.appendChild(btnOk)

    mainGeral.appendChild(caixaDialog)
    
    caixaDialog.showModal()

}