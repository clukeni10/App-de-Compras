// Recupera os registros do localStorage
export let Registros1 = JSON.parse(localStorage.getItem('Registros') || '[]');
export let ultimoRegistro = Registros1.length > 0 ? Registros1[Registros1.length - 1] : null;
// Recupera o carrinho atual do localStorage para o usuário atual
export let CarrinhosPorUsuario1 = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
export let carrinho = ultimoRegistro ? CarrinhosPorUsuario1[ultimoRegistro.nome] || [] : [];
export const listaProdutos = document.getElementById('listaProdutos');
export const itensContainer = document.createElement('div');
itensContainer.id = 'itensContainer';
export const finalizarCompraBtn = document.getElementById('finalizarCompra');
if (finalizarCompraBtn) {
    listaProdutos.insertBefore(itensContainer, finalizarCompraBtn);
}
export function finalizarCompra({ valorUser, totalCarrinho, ultimoRegistro, Registros1, CarrinhosPorUsuario1, carrinho, }) {
    if (valorUser >= totalCarrinho) {
        // Atualiza o saldo do usuário
        ultimoRegistro.valor = valorUser - totalCarrinho;
        Registros1[Registros1.length - 1] = ultimoRegistro;
        localStorage.setItem('Registros', JSON.stringify(Registros1));
        // Salva os produtos finalizados no localStorage
        const ComprasFinalizadas = JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');
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
    }
    else {
        alert('Saldo insuficiente para finalizar a compra.');
    }
}
