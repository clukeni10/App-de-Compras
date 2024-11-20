const btn = document.getElementById("btn");
const imageInput = document.getElementById("imageInput");
const imageIcon = document.getElementById("imageIcon");

btn.addEventListener("click", () => {
  const nome = document.getElementById("nome").value;
  const valor = document.getElementById("valor").value;

  if (nome && valor) {
    let Registros = JSON.parse(localStorage.getItem("Registros")) || [];

    // Recuperar a imagem armazenada no localStorage, se houver
    const imagem = localStorage.getItem("imagem");

    // Salvar os dados (nome, valor e imagem) no localStorage
    Registros.push({ nome, valor, imagem });

    localStorage.setItem("Registros", JSON.stringify(Registros));
    alert("Dados salvos com sucesso.");

    // Redirecionar para a próxima página
    window.location.href = "produtos.html";
  } else {
    alert("Insira todos os dados");
  }
});

// Lidar com a seleção da imagem
imageInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    // Cria um objeto FileReader para ler a imagem
    const reader = new FileReader();

    // Quando o arquivo for lido, salvar no localStorage e substituir o ícone
    reader.onload = function (e) {
      const imageBase64 = e.target.result;

      // Salvar a imagem como base64 no localStorage
      localStorage.setItem("imagem", imageBase64);

      // Substituir o ícone pela imagem selecionada
      imageIcon.innerHTML = `<img src="${imageBase64}" alt="Imagem Selecionada" style="width: 100%; height: auto;"/>`;
    };

    reader.readAsDataURL(file); // Lê o arquivo como URL de dados (base64)
  }
});