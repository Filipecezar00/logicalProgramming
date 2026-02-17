 const input_nome = document.getElementById("input_nome"); 
            const input_categoria = document.getElementById("input_categoria"); 
            const input_quantidade = document.getElementById("input_quantidade"); 
            const input_preco = document.getElementById("input_preco"); 
            const btn_adicionar = document.getElementById("btn_adicionar"); 
            const btn_filtrar = document.getElementById("btn_filtrar"); 
            const exibicao = document.getElementById("exibicao"); 
            const dashboard = document.getElementById("dashboard"); 

            let produtos =[]

            
        function GerarDashboard(){
            let totalPatrimonio = 0 
            let totalItensCriticos = 0 

            produtos.forEach(p => {
                totalPatrimonio += (p.quantity*p.price) 
                if(p.quantity<5){
                    totalItensCriticos++
                }
            });
            const cor = totalItensCriticos > 0 ? "red" : "green"
            let StringHtml = `<p style="color:${cor}">Patrimônio Total: ${totalPatrimonio.toLocaleString('pt-br',{style:'currency',currency:'BRL'})} <br> Itens em Crise: ${totalItensCriticos}</p>`;  

            dashboard.innerHTML = StringHtml
        }

        function LimparFormulario(){
            input_nome.value = ""
            input_categoria.value=""
            input_quantidade.value=""
            input_preco.value = ""

            input_nome.focus()

        }

        function GerenciarEstoque(lista=produtos){
         let relatorio = {}
         let htmlFinal = ""
        
        lista.forEach(p=>{
            if(!relatorio[p.category]){
                relatorio[p.category] = {itens:[],totalGeral:0,valorFinanceiro:0}; 
            }
            relatorio[p.category].itens.push(p); 
            relatorio[p.category].totalGeral +=p.quantity
            relatorio[p.category].valorFinanceiro += (p.quantity * p.price) 
        })

         for(let cat in relatorio){
            htmlFinal += `<p>
                Categoria: ${cat} <br> Total de Itens: ${relatorio[cat].totalGeral}
                <p>
                <ul>
                    ${relatorio[cat].itens.map(item=>{
                        const cor = item.quantity < 5 ? 'red' : 'green'; 
                        const status = item.quantity<5 ? "É necessario reposição" : "Tudo ok"
                        return `<li style="color:${cor}">ITEM: ${item.name} <br> Quantidade Total do Item: ${item.quantity} <br> Preço do item: R$: ${item.price} <br> Status de Armazenagem: (${status})</li>`; 
                    }).join('')}    
                    </ul>
                `
         } 
         exibicao.innerHTML = htmlFinal
    }; 

     function FiltrarCriticos(){
        let listaFiltrada = [] 
        function LessQuantidade(quantidade,produto){
            if(quantidade<5){
                return produto; 
            }
        }
            listaFiltrada = produtos.filter(LessQuantidade) 
            
            if(listaFiltrada.length==0){
                exibicao.innerText=`Nenhum Item em estado critico, Excelente Trabalho!`
            }else{
                GerenciarEstoque(listaFiltrada);             
            }
        }

        btn_filtrar.addEventListener("click",()=>{
            FiltrarCriticos();   
        })


       btn_adicionar.addEventListener("click",()=>{
          
              let nome = input_nome.value;  
              let categoria = input_categoria.value;
              let quantidade = Number(input_quantidade.value); 
              let preco = Number(input_preco.value); 

           if(preco<=0 ||quantidade<=0){
                alert("ERRO: O preco e a quantidade não podem ser menores que 0.")
                return
            }

           const produto ={
                name:nome,
                category:categoria,
                quantity:quantidade,
                price:preco 
            }

            produtos.push(produto); 
            GerarDashboard();    
            GerenciarEstoque();
            LimparFormulario(); 
        })