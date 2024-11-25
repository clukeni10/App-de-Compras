import { imageIcon } from "../script.js";
import { SaveImage } from "../DAO/ScriptDAO.js";
// Lidar com a seleção da imagem
export function IconChange(imageInput) {
    imageInput.addEventListener("change", function () {
        var _a;
        const file = (_a = this.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // Cria um objeto FileReader para ler a imagem
            const reader = new FileReader();
            // Quando o arquivo for lido, salvar no localStorage e substituir o ícone
            reader.onload = function (e) {
                var _a;
                const imageBase64 = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                SaveImage(imageBase64, imageIcon);
                // Substituir o ícone pela imagem selecionada
                imageIcon.innerHTML = `<img src="${imageBase64}" alt="Imagem Selecionada" style="width: 100%; height: auto;"/>`;
            };
            reader.readAsDataURL(file); // Lê o arquivo como URL de dados (base64)
        }
    });
}
;
