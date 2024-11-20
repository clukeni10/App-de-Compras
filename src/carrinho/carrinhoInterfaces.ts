export interface Produto {
    nome: string;
    preco: number;
  }
  
  export interface Registro {
    nome: string;
    valor: number;
  }
  
  export interface CompraFinalizada {
    nome: string;
    produtos: Produto[];
    data: string;
  }