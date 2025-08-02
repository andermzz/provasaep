//Pegando dadoss do dom
const mainGeral = document.querySelector('#geral')
const divAberto = document.querySelector("#aberto")
const divEmAndamento = document.querySelector("#em_andamento")
const divFinalizado = document.querySelector("#fizalizado")

const endpoint = 'https://localhost:7211/api/Pedido/ComUsuario'

const carregaApiAberto = (dados) => {
    //dados.map((elem, i) => {

        dados.filter((elem, i) => elem.statuspedido === 'Aberto').map((elem, i) => {

        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        const divDados = document.createElement('div')
        divDados.setAttribute('class', 'dados')

        const spanDescricao = document.createElement('span')
        spanDescricao.setAttribute('class', 'etiqueta')
        spanDescricao.innerHTML = `<strong> Pedido </strong> ${elem.descricao}`

        const spanLocalidade = document.createElement('span')
        spanLocalidade.setAttribute('class', 'etiqueta')
        spanLocalidade.innerHTML = `<strong> Localidade </strong> ${elem.localidade}`

        const spanPrioridade = document.createElement('span')
        spanPrioridade.setAttribute('class', 'etiqueta')
        spanPrioridade.innerHTML = `<strong> Prioridade </strong> ${elem.prioridade}`

        const spanUsuario = document.createElement('span')
        spanUsuario.setAttribute('class', 'etiqueta')
        spanUsuario.innerHTML = `<strong> Cliente </strong> ${elem.usuarioNome}`

        //converter data para data
        let dataPedido = new Date(elem.datapedido)
        //formatar data
        let dataFormatada = dataPedido.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

        const spanDataPedido = document.createElement('span')
        spanDataPedido.setAttribute('class', 'etiqueta')
        spanDataPedido.innerHTML = `<strong> Data Pedido </strong> ${dataFormatada}`

        divDados.appendChild(spanDescricao)
        divDados.appendChild(spanLocalidade)
        divDados.appendChild(spanPrioridade)
        divDados.appendChild(spanUsuario)
        divDados.appendChild(spanDataPedido)

        const divBtns = document.createElement('div')
        divBtns.setAttribute('class', 'btns')

        const buttonEditar = document.createElement('button')
        buttonEditar.innerHTML = 'Editar'

        const buttonExcluir = document.createElement('button')
        buttonExcluir.innerHTML = 'Excluir'

        divBtns.appendChild(buttonEditar)
        divBtns.appendChild(buttonExcluir)

        const divOpcoesStatus = document.createElement('div')
        divOpcoesStatus.setAttribute('class', 'opcaostatus')

        const select = document.createElement('select')
        select.setAttribute('id', `status${i}`)

        const option01 = document.createElement('option')
        option01.setAttribute('value', 'Aberto')
        option01.innerHTML = 'Aberto'

        const option02 = document.createElement('option')
        option02.setAttribute('value', 'Em Andamento')
        option02.innerHTML = 'Em Andamento'

        const option03 = document.createElement('option')
        option03.setAttribute('value', 'Finalizado')
        option03.innerHTML = 'Finalizado'

        select.appendChild(option01)
        select.appendChild(option02)
        select.appendChild(option03)

        const buttonAlterarStatus = document.createElement('button')
        buttonAlterarStatus.innerHTML = 'Alterar Status'

        buttonAlterarStatus.addEventListener('click', () => {
            const objSelect = document.querySelector(`#status${i}`)

            const pedido = {
                "idpedido": elem.pedidoId,
                "descricao": elem.descricao,
                "localidade": elem.localidade,
                "prioridade": elem.prioridade,
                "statuspedido": objSelect.value,
                "datapedido": elem.datapedido,
                "idUsuario": elem.usuarioid
            }

            alteraStatus(pedido)
        })

        divOpcoesStatus.appendChild(select)
        divOpcoesStatus.appendChild(buttonAlterarStatus)

        divCard.appendChild(divDados)
        divCard.appendChild(divBtns)
        divCard.appendChild(divOpcoesStatus)

        divAberto.appendChild(divCard)

    })

    dados.filter((elem, i) => elem.statuspedido === 'Em Andamento').map((elem, i) => {
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        const divDados = document.createElement('div')
        divDados.setAttribute('class', 'dados')

        const spanDescricao = document.createElement('span')
        spanDescricao.setAttribute('class', 'etiqueta')
        spanDescricao.innerHTML = `<strong> Pedido </strong> ${elem.descricao}`

        const spanLocalidade = document.createElement('span')
        spanLocalidade.setAttribute('class', 'etiqueta')
        spanLocalidade.innerHTML = `<strong> Localidade </strong> ${elem.localidade}`

        const spanPrioridade = document.createElement('span')
        spanPrioridade.setAttribute('class', 'etiqueta')
        spanPrioridade.innerHTML = `<strong> Prioridade </strong> ${elem.prioridade}`

        const spanUsuario = document.createElement('span')
        spanUsuario.setAttribute('class', 'etiqueta')
        spanUsuario.innerHTML = `<strong> Cliente </strong> ${elem.usuarioNome}`

        //converter data para data
        let dataPedido = new Date(elem.datapedido)
        //formatar data
        let dataFormatada = dataPedido.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

        const spanDataPedido = document.createElement('span')
        spanDataPedido.setAttribute('class', 'etiqueta')
        spanDataPedido.innerHTML = `<strong> Data Pedido </strong> ${dataFormatada}`

        divDados.appendChild(spanDescricao)
        divDados.appendChild(spanLocalidade)
        divDados.appendChild(spanPrioridade)
        divDados.appendChild(spanUsuario)
        divDados.appendChild(spanDataPedido)

        const divBtns = document.createElement('div')
        divBtns.setAttribute('class', 'btns')

        const buttonEditar = document.createElement('button')
        buttonEditar.innerHTML = 'Editar'

        const buttonExcluir = document.createElement('button')
        buttonExcluir.innerHTML = 'Excluir'

        divBtns.appendChild(buttonEditar)
        divBtns.appendChild(buttonExcluir)

        const divOpcoesStatus = document.createElement('div')
        divOpcoesStatus.setAttribute('class', 'opcaostatus')

        const select = document.createElement('select')
        select.setAttribute('id', `status${i}`)

        const option01 = document.createElement('option')
        option01.setAttribute('value', 'Aberto')
        option01.innerHTML = 'Aberto'

        const option02 = document.createElement('option')
        option02.setAttribute('value', 'Em Andamento')
        option02.innerHTML = 'Em Andamento'

        const option03 = document.createElement('option')
        option03.setAttribute('value', 'Finalizado')
        option03.innerHTML = 'Finalizado'

        select.appendChild(option02)
        select.appendChild(option01)
        select.appendChild(option03)

        const buttonAlterarStatus = document.createElement('button')
        buttonAlterarStatus.innerHTML = 'Alterar Status'

        buttonAlterarStatus.addEventListener('click', () => {
            const objSelect = document.querySelector(`#status${i}`)

            const pedido = {
                "idpedido": elem.pedidoId,
                "descricao": elem.descricao,
                "localidade": elem.localidade,
                "prioridade": elem.prioridade,
                "statuspedido": objSelect.value,
                "datapedido": elem.datapedido,
                "idUsuario": elem.usuarioid
            }

            alteraStatus(pedido)
        })

        divOpcoesStatus.appendChild(select)
        divOpcoesStatus.appendChild(buttonAlterarStatus)

        divCard.appendChild(divDados)
        divCard.appendChild(divBtns)
        divCard.appendChild(divOpcoesStatus)

        divEmAndamento.appendChild(divCard)

    })

    dados.filter((elem, i) => elem.statuspedido === 'Finalizado').map((elem, i) => {
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        const divDados = document.createElement('div')
        divDados.setAttribute('class', 'dados')

        const spanDescricao = document.createElement('span')
        spanDescricao.setAttribute('class', 'etiqueta')
        spanDescricao.innerHTML = `<strong> Pedido </strong> ${elem.descricao}`

        const spanLocalidade = document.createElement('span')
        spanLocalidade.setAttribute('class', 'etiqueta')
        spanLocalidade.innerHTML = `<strong> Localidade </strong> ${elem.localidade}`

        const spanPrioridade = document.createElement('span')
        spanPrioridade.setAttribute('class', 'etiqueta')
        spanPrioridade.innerHTML = `<strong> Prioridade </strong> ${elem.prioridade}`

        const spanUsuario = document.createElement('span')
        spanUsuario.setAttribute('class', 'etiqueta')
        spanUsuario.innerHTML = `<strong> Cliente </strong> ${elem.usuarioNome}`

        //converter data para data
        let dataPedido = new Date(elem.datapedido)
        //formatar data
        let dataFormatada = dataPedido.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

        const spanDataPedido = document.createElement('span')
        spanDataPedido.setAttribute('class', 'etiqueta')
        spanDataPedido.innerHTML = `<strong> Data Pedido </strong> ${dataFormatada}`

        divDados.appendChild(spanDescricao)
        divDados.appendChild(spanLocalidade)
        divDados.appendChild(spanPrioridade)
        divDados.appendChild(spanUsuario)
        divDados.appendChild(spanDataPedido)

        const divBtns = document.createElement('div')
        divBtns.setAttribute('class', 'btns')

        const buttonEditar = document.createElement('button')
        buttonEditar.innerHTML = 'Editar'

        const buttonExcluir = document.createElement('button')
        buttonExcluir.innerHTML = 'Excluir'

        divBtns.appendChild(buttonEditar)
        divBtns.appendChild(buttonExcluir)

        const divOpcoesStatus = document.createElement('div')
        divOpcoesStatus.setAttribute('class', 'opcaostatus')

        const select = document.createElement('select')
        select.setAttribute('id', `status${i}`)

        const option01 = document.createElement('option')
        option01.setAttribute('value', 'Aberto')
        option01.innerHTML = 'Aberto'

        const option02 = document.createElement('option')
        option02.setAttribute('value', 'Em Andamento')
        option02.innerHTML = 'Em Andamento'

        const option03 = document.createElement('option')
        option03.setAttribute('value', 'Finalizado')
        option03.innerHTML = 'Finalizado'

        select.appendChild(option03)
        select.appendChild(option01)
        select.appendChild(option02)

        const buttonAlterarStatus = document.createElement('button')
        buttonAlterarStatus.innerHTML = 'Alterar Status'

        buttonAlterarStatus.addEventListener('click', () => {
            const objSelect = document.querySelector(`#status${i}`)

            console.log('xxxxx',elem.usuarioid, elem.descricao,elem.localidade, elem.datapedido,elem.prioridade,elem.usuarioid, objSelect.value, elem.usuarioNome, elem.usuarioEmail)

            const pedido = {
                "idpedido": elem.pedidoId,
                "descricao": elem.descricao,
                "localidade": elem.localidade,
                "prioridade": elem.prioridade,
                "statuspedido": objSelect.value,
                "datapedido": elem.datapedido,
                "idUsuario": elem.usuarioid
            }

            alteraStatus(pedido)
        })

        divOpcoesStatus.appendChild(select)
        divOpcoesStatus.appendChild(buttonAlterarStatus)

        divCard.appendChild(divDados)
        divCard.appendChild(divBtns)
        divCard.appendChild(divOpcoesStatus)

        divFinalizado.appendChild(divCard)

    })
}

const alteraStatus = (objPedido) => {
    const endPoint = `https://localhost:7211/api/Pedido/${objPedido.idpedido}`

    fetch(endPoint, {
        method: 'PUT',
        body: JSON.stringify({
                "idpedido": objPedido.idpedido,
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

        mensagem('Pedido Alterado com Sucesso')

}

const carregaPedidoAPi = () => {
    fetch(endpoint)
        .then(resp => resp.json())
        .then(dados => {
            carregaApiAberto(dados)
        }).catch(console.log("NÃO FOI POSSÍVEL ESTABELECER UMA CONEXÃO"))
}

carregaPedidoAPi()

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