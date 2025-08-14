let input = document.querySelector('input[name=github_user')
let btn = document.querySelector('#btn');
let div = document.querySelector('#app');

let promise = function (){
    return new Promise(function(resolve, reject){
        let user = input.value;
        //console.log(input.value)

        let ajax = new XMLHttpRequest();
        ajax.open('GET', `https://api.github.com/users/${user}`);
        ajax.send(null);
        
        ajax.onreadystatechange = function(){
            if(ajax.readyState === 4){
                if(ajax.status === 200){
                    resolve(JSON.parse(ajax.responseText));
                } else {
                    reject(`Usuário ${input.value} não encontrado`);
                }
            }
        }
    })
}

btn.onclick = function(){
    div.innerHTML = ''

    //Criando o span
    let spanNome = document.createElement('span')

    //Criando o nome
    let nome = ''

    //Executando a function promise()
    promise()
        //resolver - Sucesso
        .then(function(response){
            //Ser o Usuario tem nome
            if(response['name'] !== null){
                nome = document.createTextNode(response['name'])

                let img = document.createElement('img')
                img.setAttribute('src', response['avatar_url'])
                img.setAttribute('alt', response['name'])
                img.setAttribute('width', '100px')
                img.setAttribute('height', '100px')
                div.appendChild(img)
            }else {
                nome = document.createTextNode(`Usuario ${input.value} não tem nome`)

            }
            //Adicionando o nome ao span
            spanNome.appendChild(nome)
            //Adicionando o span ao div
            div.appendChild(spanNome)
    
            
        })
        .catch(function(error){
            nome = document.createTextNode(error)
            //Adicionando o nome ao span
            spanNome.appendChild(nome)
            //Adicionando o span ao div
            div.appendChild(spanNome)

        })

}