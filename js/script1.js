//Ajax (XMLHttpRequest) - Asynchronous JavaScript and XML

let btn = document.querySelector('#btn')
let input = document.querySelector('input[name=github_user]')
let div = document.querySelector('#app')

btn.onclick = function() {

    //Limpando o conteudo da div#app
    div.innerHTML = ''

    //Criando o object Ajax
    let ajax = new XMLHttpRequest()
    //console.log(input.value)
    //Abrindo uma conexão (Usar os metodos http => GET, POST, PUT, DELETE)
    //ajax.readyState => 0
    ajax.open('GET', `https://api.github.com/users/${input.value}`)

    //Enviando a requisição
    //ajax.readyState => 1
    ajax.send(null)

    //Tratando a resposta
    ajax.onreadystatechange = function() {
        let spanNone = document.createElement('span')

        //Criando a variavel nome
        let nome = ''

        /*
        ajax.readyState => 0 - Antes da conceção ser aberta
        ajax.readyState => 1 - Apos abrir a coneção
        ajax.readyState => 2 - headers foram recebidos
        ajax.readyState => 3 - Carregando a requisição
        ajax.readyState => 4 - A requisição foi concluida e a resposta esta pronta
        */

        if(ajax.readyState === 4) {
            if(ajax.status === 200){
                //Convertando os dados JSON para array
                usuario = JSON.parse(ajax.responseText)

                //se o user tiver nome
                if(usuario['name'] !== null) {
                    nome = document.createTextNode(usuario['name'])
                    let img = document.createElement('img')
                    img.setAttribute('src', usuario['avatar_url'])
                    img.setAttribute('alt', usuario['name'])
                    img.setAttribute('width', '100px')
                    img.setAttribute('height', '100px')
                    //Adcionando a imagem na div#app
                    div.appendChild(img)

                    let link = document.createTextNode(usuario['html_url'])
                } else {
                    nome = document.createTextNode(`O usuário ${input.value} não tem nome no GitHub`)
                }
                //
                spanNone.appendChild(nome)
                div.appendChild(spanNone)

                input.value = ''
            } else {
                nome = document.createTextNode(`Não encontrei o usuário ${input.value} no GitHub`)
                spanNone.appendChild(nome)
                div.appendChild(spanNone)

                //console.log(div)

                input.value = ''
            }

        }
    }


}

//1. Create an XHLHttpRequest object    