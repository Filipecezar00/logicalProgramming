let andarAtual=0
const filaDeDestinos=[];
let estaMovimentando=false 
let direcao="parado"||"subindo"



function clicarNoBotao(andarSelecionado){
  if(filaDeDestinos!=andarSelecionado){
    filaDeDestinos=andarSelecionado
    filaDeDestinos.sort(direcao)
  }else if(estaMovimentando==false){
    processarFila();
  }
}