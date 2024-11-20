// DAO responsável por acessar o localStorage
export const dao = {
    // Recupera registros de usuários
    getRegistros: (): Registro[] => JSON.parse(localStorage.getItem('Registros') || '[]'),
  
    // Salva registros atualizados
    saveRegistros: (registros: Registro[]): void =>
      localStorage.setItem('Registros', JSON.stringify(registros)),
  
    // Recupera carrinhos por usuário
    getCarrinhosPorUsuario: (): Record<string, Produto[]> =>
      JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}'),
  
    // Salva carrinhos por usuário
    saveCarrinhosPorUsuario: (carrinhos: Record<string, Produto[]>): void =>
      localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(carrinhos)),
  
    // Recupera compras finalizadas
    getComprasFinalizadas: (): CompraFinalizada[] =>
      JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]'),
  
    // Salva compras finalizadas
    saveComprasFinalizadas: (compras: CompraFinalizada[]): void =>
      localStorage.setItem('ComprasFinalizadas', JSON.stringify(compras)),
  };
  