const arquivoInput = document.getElementById("arquivoInput");
const resultado = document.getElementById("resultado");

async function leituraArquivo() {
  try {
    const arquivo = arquivoInput.files[0];
    if (!arquivo) {
      return alert("Coloque um arquivo para realizar o upload");
    }
    const leitor = new FileReader();

    leitor.onload = function (e) {
      const valorInput = e.target.result;
      const arquivoValue = JSON.parse(valorInput);

      resultado.innerHTML = `DADOS DO ARQUIVO : <pre>${JSON.stringify(arquivoValue, null, 2)}</pre>`;
    };
    leitor.readAsText(arquivo);
  } catch (error) {
    console.log("ERRO AO REALIZAR REQUISIÇÃO PARA A API");
    resultado.innerHTML = `ERRO AO REALIZAR REQUISIÇÃO PARA A API!`;
  }
}

arquivoInput.addEventListener("change", leituraArquivo);
