let filaDeClientes=[
  {
    nome:"João",
    cesta:[
      {nome:"Leite",preco:5.50},
      {nome:"Pão",preco:4.00}
    ]
  },
  {
    nome:"Maria",
    cesta:[
    {nome:"Café",preco:15.00},
    {nome:"Açúcar",preco:3.50}
    ]
  }
 ]
let estoque = {"Leite":10,"Pão":50,"Café":20};
let faturamentoTotal=0

window.onload = function(){
  const btn_atender=document.getElementById("btn-atender");
  const btn_fechar=document.getElementById("btn-fechar");
  
  btn_atender.addEventListener("click",atenderProximoCliente);
  btn_fechar.addEventListener("click",fecharCaixa);
}

function processarCompra(cestaDoCliente){
  let total = 0
  cestaDoCliente.forEach((item)=>{
    if(estoque[item.nome]>0){
      estoque[item.nome]--
      total=total + item.preco
    }else{
     alert(`O produto ${item.nome} acabou no estoque`);
    }
  })
  if(total>100){
    total = total * 0.90
    alert("Desconto aplicado!");
  }
  return total
}

function atenderProximoCliente(){
  let visorStatus=document.getElementById("status-caixa");
  
  if(filaDeClientes.length===0){
    alert("Nenhum cliente na fila");
  }else{
  let cliente=filaDeClientes.shift();
  let valorPago=processarCompra(cliente.cesta);
  faturamentoTotal=faturamentoTotal+valorPago
    visorStatus.innerText=`Cliente ${cliente.nome} pagou R$: ${valorPago.toFixed(2)}`;
  }
}

function fecharCaixa(){
  alert(`O total vendido hoje foi de ${faturamentoTotal}`)
}