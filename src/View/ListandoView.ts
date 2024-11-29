import {User, ComprasFinalizadas} from "../DAO/UserDAO";

export function atualizarLista(listaCompras: HTMLElement): void {
  listaCompras.innerHTML = ''; // Limpa a lista antes de atualizar

  // Exibe as compras de todos os usuários
  ComprasFinalizadas.forEach(compra => {
    const UserDiv = document.createElement('div');
    UserDiv.classList.add('User1');

    // Encontra o usuário correspondente e seu saldo
    const User1 = User.find(u => u.nome === compra.nome);
    const saldoUser1 = User1 ? (User1.valor ?? 0) : 0;

    console.log('User encontrado:', User1); // Debugging
    console.log('Saldo do usuário:', saldoUser1);

    if (!isNaN(saldoUser1)) {
      const User1HTML = `
        <div>
          ${
            User1?.imagem
              ? `<div class="img-container"><img src="${User1.imagem}" alt="Imagem do usuário"/></div>`
              : '<p>Imagem não disponível</p>'
          }
          <h2>${compra.nome} <br> Saldo: ${saldoUser1.toFixed(2)} KZ</h2>
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

      UserDiv.innerHTML = User1HTML;
      listaCompras.appendChild(UserDiv);
    }
  });
}
