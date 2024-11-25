import { Registro } from "./Interfaces";

// Tipagem dos elementos
const btn = document.getElementById("btn") as HTMLButtonElement | null;
const imageInput = document.getElementById("imageInput") as HTMLInputElement | null;
const imageIcon = document.getElementById("imageIcon") as HTMLElement | null;

btn?.addEventListener("click", () => {
  const nome = (document.getElementById("nome") as HTMLInputElement)?.value;
  const valor = Number(document.getElementById("valor") as HTMLInputElement);

  if (nome && valor) {
    // Recupera os registros do localStorage ou inicializa como um array vazio
    let Registros: Registro[]  = JSON.parse(
      localStorage.getItem("Registros") || "[]"
    );

    // Recuperar a imagem armazenada no localStorage, se houver
    const imagem = localStorage.getItem("imagem");
 
    // Salvar os dados (nome, valor e imagem) no localStorage
    Registros.push({
      nome: nome ?? "", // Mantém a string como padrão
      valor: isNaN(valor) ? 0 : valor,
      imagem: imagem ?? "" // Mantém a string vazia como padrão
    });

    localStorage.setItem("Registros", JSON.stringify(Registros));
    alert("Dados salvos com sucesso.");

    // Redirecionar para a próxima página
    window.location.href = "produtos.html";
  } else {
    alert("Insira todos os dados");
  }
});

// Lidar com a seleção da imagem
imageInput?.addEventListener("change", function () {
  const file = this.files?.[0];

  if (file) {
    // Cria um objeto FileReader para ler a imagem
    const reader = new FileReader();

    // Quando o arquivo for lido, salvar no localStorage e substituir o ícone
    reader.onload = function (e) {
      const imageBase64 = e.target?.result as string;

      if (imageBase64 && imageIcon) {
        // Salvar a imagem como base64 no localStorage
        localStorage.setItem("imagem", imageBase64);

        // Substituir o ícone pela imagem selecionada
        imageIcon.innerHTML = `<img src="${imageBase64}" alt="Imagem Selecionada" style="width: 100%; height: auto;"/>`;
      }
    };

    reader.readAsDataURL(file); // Lê o arquivo como URL de dados (base64)
  }
});