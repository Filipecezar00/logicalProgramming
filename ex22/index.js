const imgPreview = document.getElementById("imgPreview");
const inputFoto = document.getElementById("inputFoto");
const btn_enviar = document.getElementById("btn_enviar");
const mensagem = document.getElementById("mensagem");

async function uploadApi(e) {
  e.preventDefault();
  const input_value = inputFoto.value;
  if (!input_value || inputFoto.files.length === 0) {
    return (mensagem.innerHTML = `Faça o upload de um arquivo antes de continuar!`);
  }

  const arquivo = inputFoto.files[0];

  try {
    const urlTemporaria = URL.createObjectURL(arquivo);
    imgPreview.src = urlTemporaria;
    imgPreview.style.display = "block";

    const form_data = new FormData();
    form_data.append("foto", arquivo);

    mensagem.innerHTML = `<p>Carregando...</p>`;

    btn_enviar.disabled = true;

    const reqApi = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: form_data,
    });

    const resposta = await reqApi.json();

    mensagem.innerHTML = `<p style="color:green;">Upload realizado com sucesso!</p>`;
  } catch (error) {
    console.error("ERRO AO REALIZAR UPLOAD DO ARQUIVO PARA API", error);
    mensagem.innerHTML = `Erro ao realizar upload do arquivo`;
  } finally {
    btn_enviar.disabled = false;
  }
}

btn_enviar.addEventListener("click", uploadApi);
