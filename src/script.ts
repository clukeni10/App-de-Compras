import { saveDados } from "./DAO/ScriptDAO";
import { IconChange } from "./Repository/ScriptRepository";

// Tipagem dos elementos
const btn = document.getElementById("btn") as HTMLButtonElement | null;
export const imageInput = document.getElementById("imageInput") as HTMLInputElement | null;
export const imageIcon = document.getElementById("imageIcon") as HTMLElement ;



export function getNome(): string {
  return (document.getElementById("nome") as HTMLInputElement)?.value ?? "";
}

export function getValor(): number {
  return Number((document.getElementById("valor") as HTMLInputElement)?.value ?? 0);
}


btn?.addEventListener("click", saveDados);


// Verifica se o elemento existe antes de passar para a função
if (imageInput) {
    IconChange(imageInput);
}

