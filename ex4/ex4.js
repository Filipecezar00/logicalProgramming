let andarAtual=0
const filaDeDestinos=[];
let estaMovimentando=false 
let portasAbertas=false
let emergenciaAtiva=false
const btn_um=document.getElementById("btn_um");
const btn_dois=document.getElementById("btn_dois");
const btn_tres=document.getElementById("btn_tres");
const btn_quatro=document.getElementById("btn_quatro");
const btn_cinco=document.getElementById("btn_cinco");
const btn_emergencia=document.getElementById("btn_emergencia");
const btn_resetar=document.getElementById("btn_resetar");



function abrirPortas(){
  portasAbertas=true 
  atualizarInterface("portas abertas");
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
