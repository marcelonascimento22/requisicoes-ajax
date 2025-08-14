let input = document.querySelector('input[name=github_user')
let btn = document.querySelector('#btn');
let div = document.querySelector('#app');

btn.onclick = function() {
    div.innerHTML = '';
    let spanNome = document.createElement('span');
    let nome = '';
    let user = input.value;

    //Axios
    axios.get(`https://api.github.com/users/${user}`)
        .then(function(response) {
            console.log(response)
            if(response.data.name !== null){
                nome = document.createTextNode(response.data.name);

                let img = document.createElement('img');
                img.setAttribute('src', response.data.avatar_url);
                img.setAttribute('alt', response.data.name);
                img.setAttribute('width', '100px');
                img.setAttribute('height', '100px');
                div.appendChild(img);
            } else {
                nome = document.createElement(`Usuario ${input.value} não tem nome`);
            }
            //Adcionando o conteudo na div
            spanNome.appendChild(nome);
            div.appendChild(spanNome);

            input.value = ''
        })
        .catch(function(error) {
            nome = document.createTextNode(`Usuário ${input.value} não encontrado`);
            spanNome.appendChild(nome);
            div.appendChild(spanNome);

            input.value = ''
        })
}