// Recupera os Users do localStorage
export let Users1 = JSON.parse(localStorage.getItem('Users') || '[]');
export let ultimoUser = Users1.length > 0 ? Users1[Users1.length - 1] : null;
// Recupera o carrinho atual do localStorage para o usuário atual
export let CarrinhosPorUsuario1 = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
export let carrinho = ultimoUser ? CarrinhosPorUsuario1[ultimoUser.nome] || [] : [];
export function updateShopping(ComprasFinalizadas) {
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
}
export function cleanCart(CarrinhosPorUsuario1) {
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
}
export function UserCart(CarrinhosPorUsuario1) {
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
}
export function loadCart() {
    JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
    return CarrinhosPorUsuario1;
}
export function loadRegister() {
    JSON.parse(localStorage.getItem('Users') || '[]');
    return Users1;
}
export function saveShoppingCart(ComprasFinalizadas) {
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
}
export function getComprasFinalizadas() {
    return JSON.parse(localStorage.getItem('ComprasFinalizadas') || '[]');
}
