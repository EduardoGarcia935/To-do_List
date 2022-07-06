const input = document.querySelector('.input-tarefa');
const btnAdd = document.querySelector('.btn-tarefa');
const ul = document.querySelector('.tarefas');

btnAdd.addEventListener('click' , (evento)=>{
    if(!input.value) return
    criaTarefa(input.value)
})

input.addEventListener('keypress' , (evento)=>{
    if(evento.keyCode === 13){
        if(!input.value) return
        criaTarefa(input.value)
    }
})

function criaTarefa(texto){
    let li = document.createElement('li')
    li.innerHTML = texto
    ul.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}

function limpaInput(){
    input.value = null
    input.focus()
}

function criaBotaoApagar(li){
    li.innerHTML += "  "
    const btnApagar = document.createElement('button')
    btnApagar.innerHTML = 'Apagar'
    btnApagar.setAttribute('class','apagar')
    li.appendChild(btnApagar)
}

document.addEventListener('click' , (evento)=>{
    const e = evento.target

    if(e.classList.contains('apagar')){
        e.parentElement.remove()
        salvarTarefas()
    }
})

function salvarTarefas(){
    const liTarefas = ul.querySelectorAll('li')
    const listaDeTarefas = []
    for(let tarefa of liTarefas){
        let tarefaTexto = tarefaTexto.replace('apagar','').trim() 
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)

    localStorage.setItem('tarefas',tarefasJSON)
}

function recarregarTarefas(){
    const tarefas = localStorage.getItem('tarefas')

    const listTarefas = JSON.parse(tarefas)

    for(let tarefa of listTarefas){
        criaTarefa(tarefa)
    }
}

recarregarTarefas()