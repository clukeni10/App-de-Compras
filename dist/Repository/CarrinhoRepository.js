import { carrinho, ultimoUser, CarrinhosPorUsuario1, updateShopping, cleanCart, UserCart, loadCart, loadRegister, saveShoppingCart, getComprasFinalizadas } from "../DAO/CarrinhoDAO.js";
import { itensContainer } from "../carrinho.js";
import { GetBackEmptyCart, CreateItem, RemoveBtn } from "../View/CarrinhoView.js";
import { updateRegister } from "../DAO/UserDAO.js";
export function finalizarCompra({ valorUser, totalCarrinho, ultimoUser, Users1, CarrinhosPorUsuario1, }) {
    if (valorUser >= totalCarrinho) {
        // Atualiza o saldo do usuário
        ultimoUser.valor = valorUser - totalCarrinho;
        Users1[Users1.length - 1] = ultimoUser;
        updateRegister(Users1);
    }
}
export function saveShopping(ultimoUser, carrinho) {
    // Recupera o array de ComprasFinalizadas do localStorage ou usa um array vazio se não existir
    const ComprasFinalizadas = getComprasFinalizadas();
    // Adiciona a nova compra ao array
    ComprasFinalizadas.push({
        nome: ultimoUser.nome,
        produtos: carrinho,
    });
    saveShoppingCart(ComprasFinalizadas);
    updateShopping(ComprasFinalizadas);
    CarrinhosPorUsuario1[ultimoUser.nome] = [];
    cleanCart(CarrinhosPorUsuario1);
    const evento = new Event('dadosAtualizados');
    window.dispatchEvent(evento);
    alert(`Compra realizada com sucesso! Seu novo saldo é de KZ ${ultimoUser === null || ultimoUser === void 0 ? void 0 : ultimoUser.valor.toFixed(2)}`);
    // Atualiza a interface (deve ser definida globalmente ou passada como argumento)
    if (typeof window.carregarCarrinho === 'function') {
        window.carregarCarrinho();
    }
    else {
        alert('Saldo insuficiente para finalizar a compra.');
    }
}
export function carregarCarrinho() {
    console.log(carrinho);
    itensContainer.innerHTML = ""; // Limpa os itens anteriores
    if (carrinho.length > 0) {
        carrinho.forEach((produto, index) => {
            adicionarItem(produto, index);
        });
    }
    else {
        GetBackEmptyCart(itensContainer);
    }
}
export function adicionarItem(produto, index) {
    const item = CreateItem(produto, index);
    itensContainer.appendChild(item);
    RemoveBtn(item, index);
}
export function removerItem(index) {
    carrinho.splice(index, 1); // Remove o item do array
    if (ultimoUser) {
        CarrinhosPorUsuario1[ultimoUser.nome] = carrinho; // Atualiza o carrinho do usuário
        UserCart(CarrinhosPorUsuario1);
    }
    carregarCarrinho(); // Atualiza a interface dinamicamente
}
export function calcularTotalCarrinho(carrinho) {
    return carrinho.reduce((total, item) => total + item.preco, 0);
}
export function handleFinalizarCompra() {
    // Carrega os Users e o último usuário
    const Users1 = loadRegister();
    const ultimoUser = Users1[Users1.length - 1];
    if (!ultimoUser) {
        alert('Nenhum usuário encontrado.');
        return;
    }
    // Carrega os carrinhos
    const CarrinhosPorUsuario1 = loadCart();
    const carrinho = CarrinhosPorUsuario1[ultimoUser.nome] || [];
    if (carrinho.length === 0) {
        alert('O carrinho está vazio.');
        return;
    }
    // Calcula o total do carrinho
    const totalCarrinho = calcularTotalCarrinho(carrinho);
    // Obtém o saldo do usuário
    const valorUser = ultimoUser.valor;
    // Chama a função de finalização da compra
    finalizarCompra({
        valorUser,
        totalCarrinho,
        ultimoUser,
        Users1,
        CarrinhosPorUsuario1,
        carrinho,
    });
}
