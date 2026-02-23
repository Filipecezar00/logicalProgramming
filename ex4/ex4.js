let andarAtual=0
const filaDeDestinos=[];
let estaMovimentando=false 
let portasAbertas=false

function processarFila(){
  if(filaDeDestinos.length==0){
    estaMovimentando=false
    direcao="parado"
    return
  }
  estaMovimentando=true
  let proximoAndar=filaDeDestinos[0];
  
  if(proximoAndar>andarAtual){
    direcao="subindo"
  }else if (proximoAndar<andarAtual){
    direcao="descendo"
  }
  const cabine = document.getElementById("cabine");
  
  cabine.style.transform="translateY(-" +(proximoAndar * 80)+"px)";
  
  
  setTimeout(function(){
    andarAtual=proximoAndar
    filaDeDestinos.shift();
    processarFila(); 
  },1500)
}

function abrirPortas(){
  portasAbertas=true 
  atualizarInterface("portas abertas");
}


function proximoCiclo(){
  if(filaDeDestinos.length==0){
    estaMovimentando=falso
    return 
  }
  estaMovimentando=true 
  let destino = filaDeDestinos[0]
  
  if(andarAtual!=destino){
    if(andarAtual<destino){
      andarAtual=andarAtual++
    }else if(andarAtual>destino){
      andarAtual=andarAtual--
    }
    atualizarVisor(andarAtual);
    moverCabine(andarAtual);
    
    setTimeout(function(){
      proximoCiclo();
    }1500);
  }
  
  abrirPortas();
  filaDeDestinos.shift();
  
  
  setTimeout(function(){
   proximoCiclo();
  },2000);
  
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

function clicarNoBotao(andarDesejado){
  if(andarDesejado==andarAtual){
    abrirPortas();
    return
  }else if(!filaDeDestinos.includes(andarDesejado)){
    filaDeDestinos.sort(andarDesejado)
    ordenarFila();
  }else if(estaMovimentando==false){
    proximoCiclo();
  }
}
document.getElementById("btn_um").addEventListener('click',()=>clicarNoBotao(0));
 
 
document.getElementById("btn_dois").addEventListener('click',()=>clicarNoBotao(1));


document.getElementById("btn_tres").addEventListener('click',()=>clicarNoBotao(2));


document.getElementById("btn_quatro").addEventListener('click',()=>clicarNoBotao(3));


document.getElementById("btn_cinco").addEventListener('click',()=>clicarNoBotao(4));