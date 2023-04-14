axios.defaults.headers.common['Authorization'] = 'CXsWjs5oIZPtLIyHNdgCzRAl';
let user = ""
let servidor = ''
function alertarresposta(resposta){
    const status1 = resposta.status
    const user_name = document.getElementById('user_name')
    if(status1 === 200){
        const login = document.querySelector('.login')
        login.classList.add('disableclass')
        return true
    }
    else if(status1 ===400){
        alert('outro usuario já esta usando este nome')
        user_name.innerHTML = ''
        return false 
    }
}
function entrar(){
    const user_name1 = document.getElementById('user_name')
    if(user_name1.value !== ""){
        user = {name:user_name.value}
        let user_request = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants ',user)
        let status = user_request.then(alertarresposta)
    }else{
        alert("por favor ,digite algum nome para se identificar")
        user_name1.innerHTML = ''
    }
}