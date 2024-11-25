

export interface Produto {
  id?: string;
  nome: string;
  preco: number;
}


export interface Compra {
  nome: string;
  produtos: Produto[];
}


export interface Registro {
  nome: string;
  valor: number;
  imagem?: string;
}


export interface CompraFinalizada {
  nome: string;
  produtos: Produto[];
}


export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
}


export interface CarrinhosPorUsuario {
  [key: string]: ItemCarrinho[];
}


export interface FinalizarCompraParams {
  valorUser: number; // Saldo do usuário
  ultimoRegistro: Registro; // Registro do usuário
  Registros1: Registro[]; // Lista de registros
  CarrinhosPorUsuario1: CarrinhosPorUsuario; // Carrinhos por usuário
  carrinho: ItemCarrinho[]; // Itens do carrinho
}