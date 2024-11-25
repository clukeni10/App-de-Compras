import { getNome, getValor } from "../script.js";
export function saveDados() {
    const nome = getNome();
    const valor = getValor();
    if (nome && valor) {
        // Recupera os registros do localStorage ou inicializa como um array vazio
        let Registros = JSON.parse(localStorage.getItem("Registros") || "[]");
        // Recuperar a imagem armazenada no localStorage, se houver
        const imagem = localStorage.getItem("imagem");
        // Salvar os dados (nome, valor e imagem) no localStorage
        Registros.push({
            nome: nome !== null && nome !== void 0 ? nome : "", // Mantém a string como padrão
            valor: isNaN(valor) ? 0 : valor,
            imagem: imagem !== null && imagem !== void 0 ? imagem : "" // Mantém a string vazia como padrão
        });
        localStorage.setItem("Registros", JSON.stringify(Registros));
        alert("Dados salvos com sucesso.");
        // Redirecionar para a próxima página
        window.location.href = "produtos.html";
    }
    else {
        alert("Insira todos os dados");
    }
}
;
export function SaveImage(imageBase64, imageIcon) {
    if (imageBase64 && imageIcon) {
        localStorage.setItem("imagem", imageBase64);
        console.log("Imagem salva no localStorage");
    }
    else {
        console.error("Falha ao salvar a imagem: Dados inválidos.");
    }
}
