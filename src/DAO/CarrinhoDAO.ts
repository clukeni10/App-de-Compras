import { Produto, Registro} from "../Interfaces";

// Recupera os registros do localStorage
export let Registros1: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');
export let ultimoRegistro: Registro | null = Registros1.length > 0 ? Registros1[Registros1.length - 1] : null;

// Recupera o carrinho atual do localStorage para o usuário atual
export let CarrinhosPorUsuario1: Record<string, Produto[]> = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
export let carrinho: Produto[] = ultimoRegistro ? CarrinhosPorUsuario1[ultimoRegistro.nome] || [] : [];
 