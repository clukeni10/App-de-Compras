import { FinalizarCompraParams, Produto, ItemCarrinho, Registro, CarrinhosPorUsuario } from "../Interfaces";
import { carrinho, ultimoRegistro, CarrinhosPorUsuario1, updateRegister, updateShopping, cleanCart, userCart, loadCart, loadRegister, saveShoppingCart } from "../DAO/CarrinhoDAO";
import { itensContainer } from "../carrinho";
import {GetBackEmptyCart, CreateItem} from "../View/CarrinhoView"




export function finalizarCompra({
  valorUser,
  totalCarrinho,
  ultimoRegistro,
  Registros1,
  CarrinhosPorUsuario1,
  
}: FinalizarCompraParams): void {
  if (valorUser >= totalCarrinho) {
    // Atualiza o saldo do usuário
    ultimoRegistro.valor = valorUser - totalCarrinho;
    Registros1[Registros1.length - 1] = ultimoRegistro;

    updateRegister(Registros1);
  }

  
}

export function saveShopping(ultimoRegistro: {
  valor: number; nome: string
}, carrinho: Produto[]): void {
  // Recupera o array de ComprasFinalizadas do localStorage ou usa um array vazio se não existir
  const ComprasFinalizadas: Array<{ nome: string; produtos: Produto[] }> = JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');

  // Adiciona a nova compra ao array
  ComprasFinalizadas.push({
    nome: ultimoRegistro.nome,
    produtos: carrinho,
  });
  saveShoppingCart(ComprasFinalizadas)

  updateShopping(ComprasFinalizadas);

  CarrinhosPorUsuario1[ultimoRegistro.nome] = [];
  cleanCart(CarrinhosPorUsuario1);

  const evento = new Event('dadosAtualizados');
  window.dispatchEvent(evento);

  alert(`Compra realizada com sucesso! Seu novo saldo é de KZ ${ultimoRegistro?.valor.toFixed(2)}`);



  // Atualiza a interface (deve ser definida globalmente ou passada como argumento)
  if (typeof window.carregarCarrinho === 'function') {
    window.carregarCarrinho();
  }
  else {
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
    GetBackEmptyCart(itensContainer);
  }
}


export function adicionarItem(produto: Produto, index: number): void {
  const item = CreateItem(produto, index);
  itensContainer.appendChild(item);

  const removerBtn = item.querySelector('.remover') as HTMLButtonElement;
  removerBtn.addEventListener('click', () => removerItem(index));
}


export function removerItem(index: number): void {
  carrinho.splice(index, 1); // Remove o item do array
  if (ultimoRegistro) {
    CarrinhosPorUsuario1[ultimoRegistro.nome] = carrinho; // Atualiza o carrinho do usuário
    userCart(CarrinhosPorUsuario1);
  }
  carregarCarrinho(); // Atualiza a interface dinamicamente
}

export function calcularTotalCarrinho(carrinho: ItemCarrinho[]): number {
  return carrinho.reduce((total, item) => total + item.preco, 0);
}



export function handleFinalizarCompra(): void {
  // Carrega os registros e o último usuário
  const Registros1: Registro[] = loadRegister();
  const ultimoRegistro = Registros1[Registros1.length - 1];

  if (!ultimoRegistro) {
    alert('Nenhum usuário encontrado.');
    return;
  }

  // Carrega os carrinhos
  const CarrinhosPorUsuario1: CarrinhosPorUsuario = loadCart();
  const carrinho = CarrinhosPorUsuario1[ultimoRegistro.nome] || [];

  if (carrinho.length === 0) {
    alert('O carrinho está vazio.');
    return;
  }

  // Calcula o total do carrinho
  const totalCarrinho = calcularTotalCarrinho(carrinho);

  // Obtém o saldo do usuário
  const valorUser = ultimoRegistro.valor;

  // Chama a função de finalização da compra
  finalizarCompra({
    valorUser,
    totalCarrinho,
    ultimoRegistro,
    Registros1,
    CarrinhosPorUsuario1,
    carrinho,
  });

}
