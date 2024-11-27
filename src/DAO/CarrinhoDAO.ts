import { CarrinhosPorUsuario, Produto, Registro} from "../Interfaces";
import { ComprasFinalizadas } from "./UserDAO";


// Recupera os registros do localStorage
export let Registros1: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');
export let ultimoRegistro: Registro | null = Registros1.length > 0 ? Registros1[Registros1.length - 1] : null;

// Recupera o carrinho atual do localStorage para o usuário atual
export let CarrinhosPorUsuario1: any = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
export let carrinho: Produto[] = ultimoRegistro ? CarrinhosPorUsuario1[ultimoRegistro.nome] || [] : [];
 

export function updateRegister(Registros1: any){
    localStorage.setItem('Registros', JSON.stringify(Registros1));
};

export function updateShopping(ComprasFinalizadas: any){
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
}

export function cleanCart(CarrinhosPorUsuario1: any){
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
}

export function userCart(CarrinhosPorUsuario1: any){
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
}


export function loadCart(): CarrinhosPorUsuario{
    JSON.parse(
        localStorage.getItem('CarrinhosPorUsuario') || '{}'
      );
      return CarrinhosPorUsuario1;
}

export function loadRegister(): Registro[]  {
    JSON.parse(localStorage.getItem('Registros') || '[]');
    return Registros1;
}

export function saveShoppingCart(ComprasFinalizadas: { nome: string; produtos: Produto[]; }[]): any {
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
}