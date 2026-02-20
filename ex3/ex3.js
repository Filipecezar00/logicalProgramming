const btn_Adicionar = document.getElementById("btn_Adicionar"); 
const btn_Limpar = document.getElementById("btn_Limpar"); 
const input_Tarefa = document.getElementById("input_tarefa"); 
const lista_tarefas = document.getElementById("lista_tarefas"); 

let lista = []

window.onload = function(){
    let tarefas = localStorage.getItem("Tarefas"); 
    if(tarefas!==null){
        lista=JSON.parse(tarefas); 
    }
    lista_tarefas.innerHTML=""

    lista.forEach((tarefa)=>{
    lista_tarefas.innerHTML+=`<br> <li>${tarefa}</li> <button type="button" onclick=(excluirTarefa) >Excluir Tarefa</button><br>`
    })
}

function excluirTarefa(){
    
}



function adicionarTarefa(){

    let inputValue = input_Tarefa.value 
    lista.push(inputValue); 


    lista_tarefas.innerHTML=""

    lista.forEach((tarefa)=>{
    let arrayTarefas = JSON.stringify(lista);  
    localStorage.setItem("Tarefas",arrayTarefas); 
    lista_tarefas.innerHTML+= `<br><li>${tarefa} <button type="button" onclick=(excluirTarefa(posicao))>Excluir Tarefa</button></li> <br>`
    })

}


function limparTudo(){
    lista=[];
    localStorage.removeItem("Tarefas");
    input_Tarefa.value=""
    lista_tarefas.innerHTML=""
}
btn_Adicionar.addEventListener("click",()=>{
    adicionarTarefa(); 
})
btn_Limpar.addEventListener("click",()=>{
    limparTudo(); 
})

