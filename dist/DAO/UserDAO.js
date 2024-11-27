import { getNome, getValor } from "../User.js";
export let Registros = JSON.parse(localStorage.getItem('Registros') || '[]');
export let CarrinhosPorUsuario = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
export let ComprasFinalizadas = JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');
export function saveDados() {
    const nome = getNome();
    const valor = getValor();
    if (nome && valor) {
        let Registros = JSON.parse(localStorage.getItem("Registros") || "[]");
        const imagem = localStorage.getItem("imagem");
        Registros.push({
            nome: nome !== null && nome !== void 0 ? nome : "",
            valor: isNaN(valor) ? 0 : valor,
            imagem: imagem !== null && imagem !== void 0 ? imagem : ""
        });
        localStorage.setItem("Registros", JSON.stringify(Registros));
        alert("Dados salvos com sucesso.");
        return true;
    }
    else {
        alert("Insira todos os dados");
        return false;
    }
}
;
export function saveImage(imageBase64) {
    if (imageBase64) {
        localStorage.setItem("imagem", imageBase64);
        console.log("Imagem salva no localStorage");
    }
    else {
        console.error("Falha ao salvar a imagem: Dados inválidos.");
    }
}
