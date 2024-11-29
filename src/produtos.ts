// Interfaces para tipagem
import { Produto, Users } from "./Interfaces";


// Adiciona evento aos botões de compra
document.querySelectorAll<HTMLButtonElement>('.btnComprar').forEach(button => {
  button.addEventListener('click', function () {
    const produto = this.closest('.product-card') as HTMLElement;

    if (produto) {
      // Obtém informações do produto
      const productId = parseInt(produto.getAttribute('data-id') || '');
      const productName = produto.getAttribute('data-nome') || '';
      const productPrice = parseFloat(produto.getAttribute('data-preco') || '0');

      // Recupera o User do usuário atual
      const Users: Users[] = JSON.parse(localStorage.getItem('Users') || '[]');
      const ultimoUser = Users.length > 0 ? Users[Users.length - 1] : null;

      if (ultimoUser) {
        // Recupera ou inicializa os carrinhos por usuário
        const CarrinhosPorUsuario: Record<string, Produto[]> = JSON.parse(
          localStorage.getItem('CarrinhosPorUsuario') || '{}'
        );
        const carrinho = CarrinhosPorUsuario[ultimoUser.nome] || [];

        // Adiciona o produto ao carrinho do usuário
        carrinho.push({ id: productId, nome: productName, preco: productPrice });

        // Atualiza o carrinho do usuário no localStorage
        CarrinhosPorUsuario[ultimoUser.nome] = carrinho;
        localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario));

        alert(`${productName} foi adicionado ao carrinho!`);
      } else {
        alert('Por favor, registre um usuário antes de adicionar itens ao carrinho.');
      }
    }
  });
});

// Redireciona para a página do carrinho
document.getElementById('carrinho')?.addEventListener('click', () => {
  window.location.href = 'carrinho.html';
});

// Modal
const openModal = document.getElementById('user');
const modal = document.getElementById('modal') as HTMLElement | null;
const closeModal = document.querySelector('.close') as HTMLElement | null;

openModal?.addEventListener('click', () => {
  if (modal) {
    modal.style.display = 'flex';

    const Users: Users[] = JSON.parse(localStorage.getItem('Users') || '[]');
    const ultimoUser = Users.length > 0 ? Users[Users.length - 1] : null;

    if (ultimoUser) {
      const nome = ultimoUser.nome;
      const valor = ultimoUser.valor;

      const nomeUser = document.getElementById('nome') as HTMLInputElement | null;
      const valorUser = document.getElementById('valor') as HTMLInputElement | null;

      if (nomeUser && valorUser) {
        nomeUser.value = nome;
        valorUser.value = valor.toString();
      } else {
        console.error('Elementos nome ou valor não encontrados no DOM.');
      }
    } else {
      console.log('Não há Users no localStorage.');
    }
  }
});

const updateButton = document.getElementById('update');
updateButton?.addEventListener('click', () => {
  const nomeUser = (document.getElementById('nome') as HTMLInputElement)?.value || '';
  const valorUser = parseFloat((document.getElementById('valor') as HTMLInputElement)?.value || '0');

  const Users: Users[] = JSON.parse(localStorage.getItem('Users') || '[]');

  if (Users.length > 0) {
    const ultimoUser = Users[Users.length - 1];
    ultimoUser.nome = nomeUser;
    ultimoUser.valor = valorUser;
    alert('Os dados foram atualizados com sucesso!');
  } else {
    const novoUser: Users = { nome: nomeUser, valor: valorUser };
    Users.push(novoUser);
    alert('Novo User criado com sucesso!');
  }

  localStorage.setItem('Users', JSON.stringify(Users));

  if (modal) {
    modal.style.display = 'none';
  }
});

closeModal?.addEventListener('click', () => {
  if (modal) {
    modal.style.display = 'none';
  }
});

window.addEventListener('click', event => {
  if (event.target === modal) {
    if (modal) {
      modal.style.display = 'none';
    } 
  }
});

document.getElementById('registrarUser')?.addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.getElementById('lista')?.addEventListener('click', () => {
  window.location.href = 'listando.html';
});