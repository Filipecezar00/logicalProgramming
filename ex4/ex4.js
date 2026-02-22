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
    processarFila(); 
  },1000)
  
}

function clicarNoBotao(andarSelecionado){
  if(filaDeDestinos.includes(andarSelecionado){
    filaDeDestinos.push(andarSelecionado)
    filaDeDestinos.sort(direcao)
  }else if(estaMovimentando==false){
    processarFila();
  }
}
document.getElementById("btn_um").addEventListener('click',()=>clicarNoBotao(0));
 
 processarFila(); 
 
document.getElementById("btn_dois").addEventListener('click',()=>clicarNoBotao(1));

processarFila();

document.getElementById("btn_tres").addEventListener('click',()=>clicarNoBotao(2));

processarFila();

document.getElementById("btn_quatro").addEventListener('click',()=>clicarNoBotao(3));

processarFila();

document.getElementById("btn_ cinco").addEventListener('click',()=>clicarNoBotao(4));

processarFila();