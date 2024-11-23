// Interfaces para tipagem

import{ Registros, CarrinhosPorUsuario, ComprasFinalizadas} from "./DAO/ListandoDAO"



// Elemento onde as compras serão listadas
const listaCompras = document.getElementById('listaCompras') as HTMLElement;

// Função para exibir as compras
function atualizarLista(): void {
  listaCompras.innerHTML = ''; // Limpa a lista antes de atualizar

  // Exibe as compras de todos os usuários
  ComprasFinalizadas.forEach(compra => {
    const usuarioDiv = document.createElement('div');
    usuarioDiv.classList.add('usuario');

    // Encontra o usuário correspondente e seu saldo
    const usuario = Registros.find(u => u.nome === compra.nome);
    const saldoUsuario = usuario ? parseFloat(usuario.valor.toString()) : 0;

    if (!isNaN(saldoUsuario)) {
      // Criação do HTML para exibir os dados do usuário
      const usuarioHTML = `
        <div>
          ${
            usuario?.imagem
              ? `<div class="img-container"><img src="${usuario.imagem}" alt="Imagem do usuário"/></div>`
              : ''
          }
          <h2>${compra.nome} <br> Saldo: ${saldoUsuario.toFixed(2)} KZ</h2>
          <h3>Compras Finalizadas:</h3>
          <ul>
            ${compra.produtos
              .map(
                produto => `
              <li>${produto.nome} - ${produto.preco.toFixed(2)} KZ</li>
            `
              )
              .join('')}
          </ul>
        </div>
      `;

      usuarioDiv.innerHTML = usuarioHTML;
      listaCompras.appendChild(usuarioDiv);
    }
  });
}

// Atualiza a lista ao carregar a página
atualizarLista();

// Escuta o evento de dados atualizados para atualizar a lista automaticamente
window.addEventListener('dadosAtualizados', atualizarLista);

const backButton = document.getElementById('back');
backButton?.addEventListener('click', () => {
  window.location.href = 'produtos.html';
});