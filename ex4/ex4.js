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
  const cabine = document.getElementById("cabine");
  
  cabine.style.transform="translateY(- +(proximoAndar * 80)+"px)"
  
  
  setTimeout(function(){
    andarAtual=proximoAndar
    filaDeDestinos.shift();
    processarFila(); 
  },1500)
}

function clicarNoBotao(andarSelecionado){
  if(!filaDeDestinos.includes(andarSelecionado)&& andarSelecionado!==andarAtual){
    filaDeDestinos.push(andarSelecionado)
    filaDeDestinos.sort(direcao)
  }else if(estaMovimentando==false){
    processarFila();
  }
}
document.getElementById("btn_um").addEventListener('click',()=>clicarNoBotao(0));
 
 
document.getElementById("btn_dois").addEventListener('click',()=>clicarNoBotao(1));


document.getElementById("btn_tres").addEventListener('click',()=>clicarNoBotao(2));


document.getElementById("btn_quatro").addEventListener('click',()=>clicarNoBotao(3));


document.getElementById("btn_cinco").addEventListener('click',()=>clicarNoBotao(4));