let andarAtual=00
const filaDeDestinos=[];
let estaMovimentando=false 
let portasAbertas=false
let emergenciaAtiva=false
let controleTempoPorta

window.onload=function(){
  const botoesAndar=[btn_um, btn_dois, btn_tres,btn_quatro,btn_cinco];
  
  botoesAndar.forEach((btn,index)=>{
    btn.addEventListener("click",()=>clicarNoBotao(index));
  });
  
  const btn_resetar=document.getElementById("btn_resetar");
  const btn_emergencia= document.getElementById("btn_emergencia");
  

if(btn_um && btn_dois && btn_resetar && btn_emergencia){



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

function atualizarVisor(andar){
  console.log(`No visor: ${andar}`);
}
function moverCabine(andar){console.log("Cabine indo para: " + andar);
}
function pintarCabine(cor){console.log("Cor da cabine: " + cor);
}
function desativarBotoes(){console.log("Botões Desativados");
}
function ativarBotoes(){
  console.log("Botões Reativados");
}

function fecharPortaERecomecar(){
  portasAbertas=false
  proximoCiclo();
}

function atualizarInterface(e){
  console.log(`Status ${e}`);
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
    clearTimeout(controleTempoPorta);
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

