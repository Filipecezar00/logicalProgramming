let andarAtual=0
const filaDeDestinos=[];
let estaMovimentando=false 
let direcao="parado"

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
  
  setTimeout(function(){
    andarAtual=proximoAndar
    let removendo = filaDeDestinos.shift();
  },1000)
  
}

function clicarNoBotao(andarSelecionado){
  if(filaDeDestinos!=andarSelecionado){
    filaDeDestinos.push(andarSelecionado)
    filaDeDestinos.sort(direcao)
  }else if(estaMovimentando==false){
    processarFila();
  }
}
