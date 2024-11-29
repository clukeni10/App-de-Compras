import { saveDados } from "./DAO/UserDAO";
import { IconChange } from "./Repository/UserRepository";

// Tipagem dos elementos
const btn = document.getElementById("btn") as HTMLButtonElement | null;
export const imageInput = document.getElementById("imageInput") as HTMLInputElement | null;
export const imageIcon = document.getElementById("imageIcon") as HTMLElement;



export function getNome(): string {
  return (document.getElementById("nome") as HTMLInputElement)?.value ?? "";
}
 
export function getValor(): number {
  return Number((document.getElementById("valor") as HTMLInputElement)?.value ?? 0);
}


btn?.addEventListener("click", () => {
  const sucesso = saveDados();
  
  if (sucesso) {
    window.location.href = "produtos.html"; // Redireciona apenas se os dados forem salvos com sucesso
  } else{
    alert("Erro, os dados não foram salvos!");
  }
});




// Verifica se o elemento existe antes de passar para a função
if (imageInput) {
  IconChange(imageInput);
}

 