

export interface Produto {
  id?: number | undefined;
  nome: string;
  preco: number;
}
 

export interface Compra {
  nome: string;
  produtos: Produto[];
}


export interface Users {
  nome: string;
  valor: number;
  imagem?: string;
}
 

export interface CompraFinalizada {
  nome: string;
  produtos: Produto[];
}


export interface ItemCarrinho {
  id: number | undefined;
  nome: string;
  preco: number;
}


export interface CarrinhosPorUsuario {
  [key: string]: ItemCarrinho[];
}


export interface FinalizarCompraParams {
  valorUser: number; // Saldo do usuário
  totalCarrinho: number; // Total do carrinho
  ultimoUser: Users; // User do usuário
  Users1: Users[]; // Lista de Users
  CarrinhosPorUsuario1: CarrinhosPorUsuario; // Carrinhos por usuário
  carrinho: ItemCarrinho[]; // Itens do carrinho
}