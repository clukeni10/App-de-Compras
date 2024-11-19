// carrinho.ts

// Interfaces para tipagem
interface Produto {
      nome: string;
      preco: number;
    }
    
    interface Registro {
      nome: string;
      valor: number;
    }
    
    interface CompraFinalizada {
      nome: string;
      produtos: Produto[];
      data: string;
    }
    
    // Recupera os registros do localStorage
    let Registros: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');
    let ultimoRegistro: Registro | null = Registros.length > 0 ? Registros[Registros.length - 1] : null;
    
    // Recupera o carrinho atual do localStorage para o usuário atual
    let CarrinhosPorUsuario: Record<string, Produto[]> = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
    let carrinho: Produto[] = ultimoRegistro ? CarrinhosPorUsuario[ultimoRegistro.nome] || [] : [];
    
    // Elemento onde os produtos serão listados
    const listaProdutos = document.getElementById('listaProdutos') as HTMLElement;
    
    // Cria um container para os itens dinamicamente
    const itensContainer = document.createElement('div');
    itensContainer.id = 'itensContainer';
    const finalizarCompraBtn = document.getElementById('finalizarCompra');
    if (finalizarCompraBtn) {
      listaProdutos.insertBefore(itensContainer, finalizarCompraBtn);
    }
    
    // Preenche o carrinho com os itens do localStorage
    function carregarCarrinho(): void {
      itensContainer.innerHTML = ""; // Limpa os itens anteriores
    
      if (carrinho.length > 0) {
        carrinho.forEach((produto, index) => {
          adicionarItem(produto, index);
        });
      } else {
        itensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
      }
    }
    
    // Adiciona um novo item no carrinho
    function adicionarItem(produto: Produto, index: number): void {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
        <button class="remover" data-index="${index}">Remover</button>
      `;
      itensContainer.appendChild(item);
    
      // Evento do botão de remoção
      const removerBtn = item.querySelector('.remover') as HTMLButtonElement;
      removerBtn.addEventListener('click', () => removerItem(index));
    }
    
    // Remove um item do carrinho
    function removerItem(index: number): void {
      carrinho.splice(index, 1); // Remove o item do array
      if (ultimoRegistro) {
        CarrinhosPorUsuario[ultimoRegistro.nome] = carrinho; // Atualiza o carrinho do usuário
        localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario)); // Atualiza o localStorage
      }
      carregarCarrinho(); // Atualiza a interface dinamicamente
    }
    
    // Finalizar Compra
    finalizarCompraBtn?.addEventListener('click', () => {
      if (!ultimoRegistro) {
        alert('Erro: Nenhum registro de usuário encontrado.');
        return;
      }
    
      const valorUser = parseFloat(ultimoRegistro.valor.toString());
      const totalCarrinho = carrinho.reduce((total, produto) => total + produto.preco, 0);
    
      if (valorUser >= totalCarrinho) {
        // Atualiza o saldo do usuário
        ultimoRegistro.valor = valorUser - totalCarrinho;
        Registros[Registros.length - 1] = ultimoRegistro;
        localStorage.setItem('Registros', JSON.stringify(Registros));
    
        // Salva os produtos finalizados no localStorage
        const ComprasFinalizadas: CompraFinalizada[] = JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');
        ComprasFinalizadas.push({
          nome: ultimoRegistro.nome,
          produtos: carrinho, // Itens comprados
          data: new Date().toLocaleString(), // Adiciona a data da compra
        });
        localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
    
        // Esvazia o carrinho atual
        CarrinhosPorUsuario[ultimoRegistro.nome] = [];
        localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario));
    
        // Dispara um evento para notificar outras páginas
        const evento = new Event('dadosAtualizados');
        window.dispatchEvent(evento);
    
        alert(`Compra realizada com sucesso! Seu novo saldo é de KZ ${ultimoRegistro.valor.toFixed(2)}`);
    
        // Atualiza a interface
        carregarCarrinho();
      } else {
        alert('Saldo insuficiente para finalizar a compra.');
      }
    });
    
    // Inicializa o carrinho ao carregar a página
    carregarCarrinho();
    
    const backButton = document.getElementById('back');
    backButton?.addEventListener('click', () => {
      window.location.href = 'produtos.html';
    });
    