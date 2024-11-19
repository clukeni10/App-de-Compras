// Interfaces para tipagem
interface Produto {
      id: string;
      nome: string;
      preco: number;
    }
    
    interface Registro {
      nome: string;
      valor: number;
    }
    
    // Adiciona evento aos botões de compra
    document.querySelectorAll<HTMLButtonElement>('.btnComprar').forEach(button => {
      button.addEventListener('click', function () {
        const produto = this.closest('.product-card') as HTMLElement;
    
        if (produto) {
          // Obtém informações do produto
          const productId = produto.getAttribute('data-id') || '';
          const productName = produto.getAttribute('data-nome') || '';
          const productPrice = parseFloat(produto.getAttribute('data-preco') || '0');
    
          // Recupera o registro do usuário atual
          const Registros: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');
          const ultimoRegistro = Registros.length > 0 ? Registros[Registros.length - 1] : null;
    
          if (ultimoRegistro) {
            // Recupera ou inicializa os carrinhos por usuário
            const CarrinhosPorUsuario: Record<string, Produto[]> = JSON.parse(
              localStorage.getItem('CarrinhosPorUsuario') || '{}'
            );
            const carrinho = CarrinhosPorUsuario[ultimoRegistro.nome] || [];
    
            // Adiciona o produto ao carrinho do usuário
            carrinho.push({ id: productId, nome: productName, preco: productPrice });
    
            // Atualiza o carrinho do usuário no localStorage
            CarrinhosPorUsuario[ultimoRegistro.nome] = carrinho;
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
    
        const Registros: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');
        const ultimoRegistro = Registros.length > 0 ? Registros[Registros.length - 1] : null;
    
        if (ultimoRegistro) {
          const nome = ultimoRegistro.nome;
          const valor = ultimoRegistro.valor;
    
          const nomeUser = document.getElementById('nome') as HTMLInputElement | null;
          const valorUser = document.getElementById('valor') as HTMLInputElement | null;
    
          if (nomeUser && valorUser) {
            nomeUser.value = nome;
            valorUser.value = valor.toString();
          } else {
            console.error('Elementos #nome ou #valor não encontrados no DOM.');
          }
        } else {
          console.log('Não há registros no localStorage.');
        }
      }
    });
    
    const updateButton = document.getElementById('update');
    updateButton?.addEventListener('click', () => {
      const nomeUser = (document.getElementById('nome') as HTMLInputElement)?.value || '';
      const valorUser = parseFloat((document.getElementById('valor') as HTMLInputElement)?.value || '0');
    
      const Registros: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');
    
      if (Registros.length > 0) {
        const ultimoRegistro = Registros[Registros.length - 1];
        ultimoRegistro.nome = nomeUser;
        ultimoRegistro.valor = valorUser;
        alert('Os dados foram atualizados com sucesso!');
      } else {
        const novoRegistro: Registro = { nome: nomeUser, valor: valorUser };
        Registros.push(novoRegistro);
        alert('Novo registro criado com sucesso!');
      }
    
      localStorage.setItem('Registros', JSON.stringify(Registros));
    
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
    