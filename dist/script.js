"use strict";
// Tipagem dos elementos
const btn = document.getElementById("btn");
const imageInput = document.getElementById("imageInput");
const imageIcon = document.getElementById("imageIcon");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
    var _a, _b;
    const nome = (_a = document.getElementById("nome")) === null || _a === void 0 ? void 0 : _a.value;
    const valor = (_b = document.getElementById("valor")) === null || _b === void 0 ? void 0 : _b.value;
    if (nome && valor) {
        // Recupera os registros do localStorage ou inicializa como um array vazio
        let Registros = JSON.parse(localStorage.getItem("Registros") || "[]");
        // Recuperar a imagem armazenada no localStorage, se houver
        const imagem = localStorage.getItem("imagem");
        // Salvar os dados (nome, valor e imagem) no localStorage
        Registros.push({
            nome: nome !== null && nome !== void 0 ? nome : "",
            valor: valor !== null && valor !== void 0 ? valor : "",
            imagem: imagem !== null && imagem !== void 0 ? imagem : ""
        });
        localStorage.setItem("Registros", JSON.stringify(Registros));
        alert("Dados salvos com sucesso.");
        // Redirecionar para a próxima página
        window.location.href = "produtos.html";
    }
    else {
        alert("Insira todos os dados");
    }
});
// Lidar com a seleção da imagem
imageInput === null || imageInput === void 0 ? void 0 : imageInput.addEventListener("change", function () {
    var _a;
    const file = (_a = this.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        // Cria um objeto FileReader para ler a imagem
        const reader = new FileReader();
        // Quando o arquivo for lido, salvar no localStorage e substituir o ícone
        reader.onload = function (e) {
            var _a;
            const imageBase64 = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
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
