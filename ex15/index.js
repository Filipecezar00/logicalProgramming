const tarefa_value = document.querySelector(".tarefa_value");
const btn_enviar = document.querySelector(".btn_enviar");
const tarefas_container = document.querySelector(".tarefas_container");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarNoStorage() {
  try {
    const Arraytarefas = JSON.stringify(tarefas);
    localStorage.setItem("tarefas", Arraytarefas);
  } catch (error) {
    console.log("ERRO AO SALVAR NO STORAGE:", error);
    tarefas_container.innerHTML = `ERRO AO SALVAR NO STORAGE`;
  }
}

function adicionarTarefa() {
  try {
    const input_value = tarefa_value.value;
    if (input_value === "") {
      return alert("Digite uma tarefa no input");
    }
    const tarefa = {
      id: Date.now(),
      texto: input_value,
      concluida: false,
    };
    tarefas.push(tarefa);
    tarefa_value.value = "";
    salvarNoStorage();
    renderizarTarefas();
  } catch (error) {
    console.error("ERRO AO INSERIR TAREFA", error);
    tarefas_container.innerHTML = `ERRO AO INSERIR TAREFA`;
  }
}

function toggleTarefa(id) {
  try {
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);
    if (tarefa) {
      tarefa.concluida = !tarefa.concluida;
    }
    salvarNoStorage();
    renderizarTarefas();
  } catch (error) {
    console.log("ERRO AO REALIZAR TOGGLE", error);
    tarefas_container.innerHTML = `Erro ao realizar toggle`;
  }
}

function excluirTarefa(id) {
  try {
    tarefas = tarefas.filter((item) => item.id !== id);
    salvarNoStorage();
    renderizarTarefas();
  } catch (error) {
    console.log("ERRO AO REALIZAR EXCLUSÃO", error);
    tarefas_container.innerHTML = `Erro ao realizar exclusão`;
  }
}

function renderizarTarefas() {
  try {
    tarefas_container.innerHTML = "";
    tarefas.forEach((tarefa) => {
      tarefas_container.innerHTML += `<p style="color:${tarefa.concluida ? "green" : "yellow"}">Tarefa: ${tarefa.texto}</p>\n
      <button onclick="toggleTarefa(${tarefa.id})">Concluir</button>\n 
      <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
      `;
    });
  } catch (error) {
    console.error("ERRO AO REALIZAR RENDERIZAÇÃO DE TAREFAS", error);
    tarefas_container.innerHTML = `Erro ao renderizar tarefas`;
  }
}

btn_enviar.addEventListener("click", adicionarTarefa);
renderizarTarefas();
