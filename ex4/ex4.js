let andarAtual=00
const filaDeDestinos=[];
let estaMovimentando=false 
let portasAbertas=false
let emergenciaAtiva=false
let controleTempoPorta

window.onload=function(){
  const todosOsBotoes=document.querySelectorAll("button"); 
  console.log("Total de botões no html:",todosOsBotoes.length);
  
  const testeEmergencia= document.getElementById("btn_emergencia");
  
  if(testeEmergencia){
    alert("Sucesso! há um botão de emergência");
  }else{
    console.error("O js continua cego");
    todosOsBotoes.forEach((btn,index)=>{
      console.log(`Botão ${index} tem o ID: "${btn.id}"`);
    });
  }


if(btn_um && btn_dois && btn_resetar && btn_emergencia){
  btn_um.addEventListener("click",()=>{
  clicarNoBotao(0);
})
btn_dois.addEventListener("click",()=>{
  clicarNoBotao(1);
})
btn_tres.addEventListener("click",()=>{
  clicarNoBotao(2);
})
btn_quatro.addEventListener("click",()=>{
  clicarNoBotao(3);
})
btn_cinco.addEventListener("click",()=>{
  clicarNoBotao(4);
})
btn_resetar.addEventListener("click",()=>{
  resetarSistema();
})

btn_emergencia.addEventListener("click",()=>{
  paradaDeEmergencia();
})
}else{
  console.error("ERRO: Um ou mais botões não foram encontrados")
}
}

function pararAgora(andarAlvo){
  let distancia = (andarAlvo-andarAtual)
  if(distancia<0.5 && velocidade>2){
    return false 
  }else{
    return true 
  }
}

function abrirPortas(){
  portasAbertas=true 
  atualizarInterface("portas abertas");
  
  if(controleTempoPorta){
    cancelar_aguardar(controleTempoPorta);
  }
  controleTempoPorta=setTimeout(function(){
    fecharPortaERecomecar();
  },3000)
}


function proximoCiclo(){
  if(emergenciaAtiva==true){
   return 
  }
  
  if(filaDeDestinos.length==0){
    estaMovimentando=false
    return 
  }
  estaMovimentando=true 
  let destino = filaDeDestinos[0]
  
  if(andarAtual!=destino){
    if(andarAtual<destino){
      andarAtual++
    }else if(andarAtual>destino){
      andarAtual--
    }
    atualizarVisor(andarAtual);
    moverCabine(andarAtual);
    
    setTimeout(function(){
      proximoCiclo();
    },1500);
  }
  
 else{ 
  abrirPortas();
  filaDeDestinos.shift();

  
  setTimeout(function(){
   proximoCiclo();
  },2000);
  }
  
}
function ordenarFila(){
  if(filaDeDestinos.length<2){
    return
  }
  let primeiroDestino= filaDeDestinos[0];
  if(primeiroDestino>andarAtual){
    filaDeDestinos.sort((a,b)=>a-b);
  }else if(primeiroDestino<andarAtual){
    filaDeDestinos.sort((a,b)=>b-a);
  }
}

function paradaDeEmergencia(){
  emergenciaAtiva=true 
  estaMovimentando=false
  filaDeDestinos=[]
  
  atualizarVisor("EMERGÊNGIA");
  pintarCabine("Vermelho");
  
  abrirPortas();
  
  desativarBotoes();
}

function resetarSistema(){
  if(emergenciaAtiva==true){
    emergenciaAtiva=false
    
    atualizarVisor(andarAtual);
    pintarCabine("Original");
    
    ativarBotoes();
    
    alert("Sistema reiniciado");
  }
}

function clicarNoBotao(andarDesejado){
  if(emergenciaAtiva==true){
    alert("Sistema Bloqueado");
    return 
  }
  
  if(andarDesejado==andarAtual){
    abrirPortas();
    return
  }else if(!filaDeDestinos.includes(andarDesejado)){
    filaDeDestinos.push(andarDesejado);
    ordenarFila();
  } 
  
  if(estaMovimentando==false){
    proximoCiclo();
  }
}

