import { Produto, Registro, CompraFinalizada } from "./Interfaces.ts";

export let Registros: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');

export let CarrinhosPorUsuario: Record<string, Produto[]> = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');

export let ComprasFinalizadas: CompraFinalizada[] = JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');