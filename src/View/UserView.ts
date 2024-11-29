import { imageIcon } from "../User";

export function ImageSubstitution (){
    imageIcon.innerHTML = `<img src="${imageBase64}" alt="Imagem Selecionada" style="width: 100%; height: auto;"/>`;
}