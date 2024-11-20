import { dao } from './carrinhoDAO';
import { Produto, Registro, CompraFinalizada } from './carrinhoInterfaces';

// Lida com a lógica do carrinho e compra
export const carrinhoService = {
  // Carrega o carrinho atual para o usuário logado
  carregarCarrinho: (usuarioAtual: string): Produto[] => {
    const carrinhos = dao.getCarrinhosPorUsuario();
    return carrinhos[usuarioAtual] || [];
  },

  // Adiciona ou remove itens do carrinho e salva
  salvarCarrinho: (usuarioAtual: string, carrinho: Produto[]): void => {
    const carrinhos = dao.getCarrinhosPorUsuario();
    carrinhos[usuarioAtual] = carrinho;
    dao.saveCarrinhosPorUsuario(carrinhos);
  },

  // Finaliza a compra
  finalizarCompra: (usuario: Registro, carrinho: Produto[]): string => {
    const totalCarrinho = carrinho.reduce((total, produto) => total + produto.preco, 0);

    if (usuario.valor >= totalCarrinho) {
      // Atualiza o saldo do usuário
      usuario.valor -= totalCarrinho;

      // Atualiza registros
      const registros = dao.getRegistros();
      const indice = registros.findIndex((reg) => reg.nome === usuario.nome);
      if (indice >= 0) registros[indice] = usuario;
      dao.saveRegistros(registros);

      // Registra a compra finalizada
      const compras = dao.getComprasFinalizadas();
      compras.push({ nome: usuario.nome, produtos: carrinho, data: new Date().toLocaleString() });
      dao.saveComprasFinalizadas(compras);

      // Limpa o carrinho do usuário
      carrinhoService.salvarCarrinho(usuario.nome, []);

      return `Compra realizada com sucesso! Seu novo saldo é de KZ ${usuario.valor.toFixed(2)}`;
    } else {
      return 'Saldo insuficiente para finalizar a compra.';
    }
  },
};
