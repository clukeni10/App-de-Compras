import { carrinhoService } from './carrinhoService';
import { dao } from './carrinhoDAO';

// Recupera o último registro do usuário
let Registros1 = dao.getRegistros();
let ultimoRegistro: Registro | null = Registros1.length > 0 ? Registros1[Registros1.length - 1] : null;

// Recupera o carrinho atual
let carrinho: Produto[] = ultimoRegistro ? carrinhoService.carregarCarrinho(ultimoRegistro.nome) : [];

// Preenche o carrinho com os itens do localStorage
function carregarCarrinho(): void {
  console.log(carrinho);
  itensContainer.innerHTML = ""; // Limpa os itens anteriores

  if (carrinho.length > 0) {
    carrinho.forEach((produto, index) => {
      adicionarItem(produto, index);
    });
  } else {
    itensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
  }
}

// Finaliza a compra
finalizarCompraBtn?.addEventListener('click', () => {
  if (!ultimoRegistro) {
    alert('Erro: Nenhum registro de usuário encontrado.');
    return;
  }

  const mensagem = carrinhoService.finalizarCompra(ultimoRegistro, carrinho);
  alert(mensagem);
  carregarCarrinho(); // Atualiza a interface
});

// Inicializa o carrinho ao carregar a página
carregarCarrinho();
