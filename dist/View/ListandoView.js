// compras.ts
import { ComprasFinalizadas, Registros } from '../DAO/UserDAO'; // Certifique-se de importar corretamente
export function atualizarLista(listaCompras) {
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
          ${(usuario === null || usuario === void 0 ? void 0 : usuario.imagem)
                ? `<div class="img-container"><img src="${usuario.imagem}" alt="Imagem do usuário"/></div>`
                : ''}
          <h2>${compra.nome} <br> Saldo: ${saldoUsuario.toFixed(2)} KZ</h2>
          <h3>Compras Finalizadas:</h3>
          <ul>
            ${compra.produtos
                .map(produto => `
              <li>${produto.nome} - ${produto.preco.toFixed(2)} KZ</li>
            `)
                .join('')}
          </ul>
        </div>
      `;
            usuarioDiv.innerHTML = usuarioHTML;
            listaCompras.appendChild(usuarioDiv);
        }
    });
}
