"use strict";
// carrinho.ts
// Recupera os registros do localStorage
let Registros1 = JSON.parse(localStorage.getItem('Registros') || '[]');
let ultimoRegistro = Registros1.length > 0 ? Registros1[Registros1.length - 1] : null;
// Recupera o carrinho atual do localStorage para o usuário atual
let CarrinhosPorUsuario1 = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
let carrinho = ultimoRegistro ? CarrinhosPorUsuario1[ultimoRegistro.nome] || [] : [];
// Elemento onde os produtos serão listados
const listaProdutos = document.getElementById('listaProdutos');
// Cria um container para os itens dinamicamente
const itensContainer = document.createElement('div');
itensContainer.id = 'itensContainer';
const finalizarCompraBtn = document.getElementById('finalizarCompra');
if (finalizarCompraBtn) {
    listaProdutos.insertBefore(itensContainer, finalizarCompraBtn);
}
// Preenche o carrinho com os itens do localStorage
function carregarCarrinho() {
    console.log(carrinho);
    itensContainer.innerHTML = ""; // Limpa os itens anteriores
    if (carrinho.length > 0) {
        carrinho.forEach((produto, index) => {
            adicionarItem(produto, index);
        });
    }
    else {
        itensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    }
}
// Adiciona um novo item no carrinho
function adicionarItem(produto, index) {
    const item = document.createElement('div');
    item.className = 'item';
    item.innerHTML = `
        <p>${produto.nome} - KZ ${produto.preco.toFixed(2)}</p>
        <button class="remover" data-index="${index}">Remover</button>
      `;
    itensContainer.appendChild(item);
    // Evento do botão de remoção
    const removerBtn = item.querySelector('.remover');
    removerBtn.addEventListener('click', () => removerItem(index));
}
// Remove um item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1); // Remove o item do array
    if (ultimoRegistro) {
        CarrinhosPorUsuario1[ultimoRegistro.nome] = carrinho; // Atualiza o carrinho do usuário
        localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1)); // Atualiza o localStorage
    }
    carregarCarrinho(); // Atualiza a interface dinamicamente
}
// Finalizar Compra
finalizarCompraBtn === null || finalizarCompraBtn === void 0 ? void 0 : finalizarCompraBtn.addEventListener('click', () => {
    if (!ultimoRegistro) {
        alert('Erro: Nenhum registro de usuário encontrado.');
        return;
    }
    const valorUser = parseFloat(ultimoRegistro.valor.toString());
    const totalCarrinho = carrinho.reduce((total, produto) => total + produto.preco, 0);
    if (valorUser >= totalCarrinho) {
        // Atualiza o saldo do usuário
        ultimoRegistro.valor = valorUser - totalCarrinho;
        Registros1[Registros1.length - 1] = ultimoRegistro;
        localStorage.setItem('Registros', JSON.stringify(Registros1));
        // Salva os produtos finalizados no localStorage
        const ComprasFinalizadas = JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');
        ComprasFinalizadas.push({
            nome: ultimoRegistro.nome,
            produtos: carrinho, // Itens comprados
            data: new Date().toLocaleString(), // Adiciona a data da compra
        });
        localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
        // Esvazia o carrinho atual
        CarrinhosPorUsuario1[ultimoRegistro.nome] = [];
        localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
        // Dispara um evento para notificar outras páginas
        const evento = new Event('dadosAtualizados');
        window.dispatchEvent(evento);
        alert(`Compra realizada com sucesso! Seu novo saldo é de KZ ${ultimoRegistro.valor.toFixed(2)}`);
        // Atualiza a interface
        carregarCarrinho();
    }
    else {
        alert('Saldo insuficiente para finalizar a compra.');
    }
});
// Inicializa o carrinho ao carregar a página
carregarCarrinho();
const backButton1 = document.getElementById('back');
backButton1 === null || backButton1 === void 0 ? void 0 : backButton1.addEventListener('click', () => {
    window.location.href = 'produtos.html';
});
