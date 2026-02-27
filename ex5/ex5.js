
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

function processarCompra(cestaDoCliente){
  let total = 0
  cestaDoCliente.forEach((item)=>{
    total=total + item.preco
  })
  if(total>100){
    total = total * 0.90
    alert("Desconto aplicado!");
  }
  return total
}

function atenderProximoCliente(){
  if(filaDeClientes.length===0){
    alert("Nenhum cliente na fila");
  }else{
  let cliente=filaDeClientes.shift();
  let valorPago=processarCompra(cliente.cesta);
    alert(`Cliente ${cliente.nome} pagou R$: ${valorPago.toFixed(2)}`);
  }
}