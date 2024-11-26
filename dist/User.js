import { saveDados } from "./DAO/UserDAO";
import { IconChange } from "./Repository/ScriptRepository";
// Tipagem dos elementos
const btn = document.getElementById("btn");
export const imageInput = document.getElementById("imageInput");
export const imageIcon = document.getElementById("imageIcon");
export function getNome() {
    var _a, _b;
    return (_b = (_a = document.getElementById("nome")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
}
export function getValor() {
    var _a, _b;
    return Number((_b = (_a = document.getElementById("valor")) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0);
}
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
    const sucesso = saveDados();
    if (sucesso) {
        window.location.href = "produtos.html"; // Redireciona apenas se os dados forem salvos com sucesso
    }
});
// Verifica se o elemento existe antes de passar para a função
if (imageInput) {
    IconChange(imageInput);
}
