//pegando elementos
const mainGeral = document.querySelector('#geral')
const inputDescricao = document.querySelector('#descricao')
const inputLocalidade = document.querySelector('#localidade')
const selectPrioridade = document.querySelector('#prioridade')
const divSelectUsuario = document.querySelector('#selectUsuario')
let idusuario = 0


const montaSelectUsuario = (dados) => {
    const select = document.createElement('select')
    select.setAttribute('name', 'usuario')
    select.setAttribute('id', 'usuario')

    dados.map((elem, i) => {
        const option = document.createElement('option')
        option.value = elem.idusuario
        option.innerHTML = elem.nome

        select.appendChild(option)

    })

    select.addEventListener('click', (evt) => {
        idusuario = evt.target.value
    })

    divSelectUsuario.appendChild(select)
}

const carregaUsuario = () => {
    const endPoint = 'https://localhost:7211/api/Usuario'

    fetch(endPoint)
        .then(resp => resp.json())
        .then(dados => {
            // console.log(dados)
            montaSelectUsuario(dados)
        }
        ).catch(console.log('Erro ao carregar cliente'))
}

carregaUsuario()

const cadastrarPedido = (e) => {

    e.preventDefault()

    //criar objeto data 
    let dataPedido = new Date()
    //formatar data
    let dataFormatada = `${dataPedido.getFullYear()}-${String(dataPedido.getMonth() + 1).padStart(2, '0')}-${String(dataPedido.getDate()).padStart(2, '0')}`

    pedido = {
        "descricao": inputDescricao.value,
        "localidade": inputLocalidade.value,
        "prioridade": selectPrioridade.value,
        "statuspedido": 'Aberto',
        "datapedido": dataFormatada,
        "idUsuario": idusuario
    }

    enviarDados(pedido)
}

const enviarDados = (objPedido) => {
    const endPoint = `https://localhost:7211/api/Pedido`

    fetch(endPoint, {
        method: 'POST',
        body: JSON.stringify({
            "descricao": objPedido.descricao,
            "localidade": objPedido.localidade,
            "prioridade": objPedido.prioridade,
            "statuspedido": objPedido.statuspedido,
            "datapedido": objPedido.datapedido,
            "idUsuario": objPedido.idUsuario
        }),
        headers: {
            'Content-type': 'application/json',
        },
    }).then((resposta) => resposta.json())
        .then((info) => console.log(info))
        .catch((error) => console.log(error))

   mensagem('Pedido Cadastro com Sucesso')
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