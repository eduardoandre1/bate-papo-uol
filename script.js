axios.defaults.headers.common['Authorization'] = 'CXsWjs5oIZPtLIyHNdgCzRAl';
let user = null
//login e entrar no servidor
const user_block = (resposta) =>{
    alert('usuario já existe')
    user = null;
    const login = document.querySelector('.login')
    login.classList.remove('disableclass')
    const user_name = document.getElementById('user_name')
    user_name.innerHTML = ''
}
function login(resposta){
    const status1 = resposta.status
    const user_name = document.getElementById('user_name')
    const login = document.querySelector('.login')
    login.classList.add('disableclass')
}

function entrar(){
    const user_name = document.getElementById('user_name')
    if(user_name.value !== ""){
        user = {name:user_name.value}
        let user_request = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants ',user)
        user_request.then(login)
        user_request.catch(user_block)
    }else{
        alert("por favor ,digite algum nome para se identificar")
        user_name.innerHTML = ''
    }
}
//manter online
const conferironline = (resposta) =>{
    console.log('online')
}
const logoff = (resposta) =>{
    user = null;
    const login = document.querySelector('.login')
    login.classList.remove('disableclass')
}
const manteronline = ()=>{
    if(user !== null){
        let user_request = axios.post('https://mock-api.driven.com.br/api/vm/uol/status',user)
        user_request.then(conferironline)
        user_request.catch(logoff)
    }
}
    
setInterval(manteronline,5000)

//enviar mensagem
function generete_text(resposta){
    console.log('texto enviado') 
    carregar_chat()
}
function send(){
    const mensager = document.getElementById('mensager')
    const envio = {
        from : user.name,
        to : 'everyone',
        text: mensager.value,
        type: "message"
    }
    const send = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages',envio)
    send.then(generete_text)
    send.catch(logoff)
    mensager.value = ''
}

//carregar mensagens
function criar_text(data){
    const bate_papo = document.querySelector('.bate-papo')
    bate_papo.innerHTML += `<div class="mensagem" data-test="message">     (${data.time}) ${data.from} para ${data.to}: ${data.text} </div>`
    console.log(data)
}
function data_chat(resposta){
    const bate_papo = document.querySelector('.bate-papo')
    bate_papo.innerHTML = ''
    const array = resposta.data
    array.forEach(criar_text);

}
function carregar_chat(){
    const bate_papo = document.querySelector('.bate-papo')
    if(user !== null){
        const receber = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages')
        receber.then(data_chat)
    }
}
setInterval(carregar_chat,3000)
carregar_chat()
document.addEventListener('keypress',function(e){
    if(e.key === 'Enter' && user != null){
        send()
    }
})