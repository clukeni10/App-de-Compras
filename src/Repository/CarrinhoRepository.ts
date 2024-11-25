import { FinalizarCompraParams, Produto, ItemCarrinho, Registro, CarrinhosPorUsuario  } from "../Interfaces";
import { carrinho, itensContainer, ultimoRegistro, CarrinhosPorUsuario1 } from "../DAO/CarrinhoDAO";




export function finalizarCompra({
    valorUser,
    ultimoRegistro,
    Registros1,
    CarrinhosPorUsuario1,
    carrinho,
  }: FinalizarCompraParams): void {
    if (valorUser ) {
      // Atualiza o saldo do usuário
      ultimoRegistro.valor = valorUser;
      Registros1[Registros1.length - 1] = ultimoRegistro;
      localStorage.setItem('Registros', JSON.stringify(Registros1));
  
      // Salva os produtos finalizados no localStorage
      const ComprasFinalizadas: Array<{
        nome: string;
        produtos: typeof carrinho;
        data: string;
      }> = JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');
      ComprasFinalizadas.push({
        nome: ultimoRegistro.nome,
        produtos: carrinho,
        data: new Date().toLocaleString(),
      });
      localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
  
      // Esvazia o carrinho atual
      CarrinhosPorUsuario1[ultimoRegistro.nome] = [];
      localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
  
      // Dispara um evento para notificar outras páginas
      const evento = new Event('dadosAtualizados');
      window.dispatchEvent(evento);
  
      alert(`Compra realizada com sucesso! Seu novo saldo é de KZ ${ultimoRegistro.valor.toFixed(2)}`);
  
      // Atualiza a interface (deve ser definida globalmente ou passada como argumento)
      if (typeof window.carregarCarrinho === 'function') {
        window.carregarCarrinho();
      }
    } else {
      alert('Saldo insuficiente para finalizar a compra.');
    }
  }

  export function carregarCarrinho(): void {
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


  export function adicionarItem(produto: Produto, index: number): void {
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


  export function removerItem(index: number): void {
    carrinho.splice(index, 1); // Remove o item do array
    if (ultimoRegistro) {
      CarrinhosPorUsuario1[ultimoRegistro.nome] = carrinho; // Atualiza o carrinho do usuário
      localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1)); // Atualiza o localStorage
    }
    carregarCarrinho(); // Atualiza a interface dinamicamente
  }

 


 export  function handleFinalizarCompra(): void {
    // Carrega os registros e o último usuário
    const Registros1: Registro[] = JSON.parse(localStorage.getItem('Registros') || '[]');
    const ultimoRegistro = Registros1[Registros1.length - 1];
  
    if (!ultimoRegistro) {
      alert('Nenhum usuário encontrado.');
      return;
    }
  
    // Carrega os carrinhos
    const CarrinhosPorUsuario1: CarrinhosPorUsuario = JSON.parse(
      localStorage.getItem('CarrinhosPorUsuario') || '{}'
    );
    const carrinho = CarrinhosPorUsuario1[ultimoRegistro.nome] || [];
  
    if (carrinho.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }
  
    // Calcula o total do carrinho

  
    // Obtém o saldo do usuário
    const valorUser = ultimoRegistro.valor;
  
    // Chama a função de finalização da compra
    finalizarCompra({
      valorUser,
      ultimoRegistro,
      Registros1,
      CarrinhosPorUsuario1,
      carrinho,
    });
  }