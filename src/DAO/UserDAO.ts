import { Produto, Users, CompraFinalizada } from "../Interfaces";
import { getNome, getValor } from "../User";


export let User: Users[] = JSON.parse(localStorage.getItem('Users') || '[]');


export let CarrinhosPorUsuario: Record<string, Produto[]> = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');

export let ComprasFinalizadas: CompraFinalizada[] = JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]') as CompraFinalizada[];




export function saveDados(): boolean {
  const nome = getNome();
  const valor = getValor();

  if (nome && valor) {

    let Users: Users[] = JSON.parse(
      localStorage.getItem("Users") || "[]"
    );


    const imagem = localStorage.getItem("imagem");


    Users.push({
      nome: nome ?? "",
      valor: isNaN(valor) ? 0 : valor,
      imagem: imagem ?? ""
    });

    localStorage.setItem("Users", JSON.stringify(Users));
    alert("Dados salvos com sucesso.");


    return true;
  } else {
    alert("Insira todos os dados");
    return false;
  }
};


export function saveImage(imageBase64: string) {
  if (imageBase64) {
    localStorage.setItem("imagem", imageBase64);
    console.log("Imagem salva no localStorage");
  } else {
    console.error("Falha ao salvar a imagem: Dados inválidos.");
  }
}

export function updateRegister(Users1: any){
  localStorage.setItem('Users', JSON.stringify(Users1)); 
};
