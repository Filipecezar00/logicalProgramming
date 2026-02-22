let andarAtual=0
const filaDeDestinos=[];
let estaMovimentando=false 
let direcao="parado"||"subindo" || "descendo"

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
  
}

function clicarNoBotao(andarSelecionado){
  if(filaDeDestinos!=andarSelecionado){
    filaDeDestinos=andarSelecionado
    filaDeDestinos.sort(direcao)
  }else if(estaMovimentando==false){
    processarFila();
  }
}