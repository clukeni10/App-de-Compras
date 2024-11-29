import { CarrinhosPorUsuario, Produto, Users} from "../Interfaces";

// Recupera os Users do localStorage
export let Users1: Users[] = JSON.parse(localStorage.getItem('Users') || '[]');
export let ultimoUser: Users | null = Users1.length > 0 ? Users1[Users1.length - 1] : null;

// Recupera o carrinho atual do localStorage para o usuário atual
export let CarrinhosPorUsuario1: any = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
export let carrinho: Produto[] = ultimoUser ? CarrinhosPorUsuario1[ultimoUser.nome] || [] : [];
 



export function updateShopping(ComprasFinalizadas: any){
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
}

export function cleanCart(CarrinhosPorUsuario1: any){
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
}

export function UserCart(CarrinhosPorUsuario1: any){
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
}


export function loadCart(): CarrinhosPorUsuario{
    JSON.parse(
        localStorage.getItem('CarrinhosPorUsuario') || '{}'
      );
      return CarrinhosPorUsuario1;
}

export function loadRegister(): Users[]  {
    JSON.parse(localStorage.getItem('Users') || '[]');
    return Users1;
}

export function saveShoppingCart(ComprasFinalizadas: { nome: string; produtos: Produto[]; }[]): any {
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
}

export function getComprasFinalizadas(): Array<{ nome: string; produtos: Produto[] }> {
    return JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');
  }