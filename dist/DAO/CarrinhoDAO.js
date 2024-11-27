// Recupera os registros do localStorage
export let Registros1 = JSON.parse(localStorage.getItem('Registros') || '[]');
export let ultimoRegistro = Registros1.length > 0 ? Registros1[Registros1.length - 1] : null;
// Recupera o carrinho atual do localStorage para o usuário atual
export let CarrinhosPorUsuario1 = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
export let carrinho = ultimoRegistro ? CarrinhosPorUsuario1[ultimoRegistro.nome] || [] : [];
export function updateRegister(Registros1) {
    localStorage.setItem('Registros', JSON.stringify(Registros1));
}
;
export function updateShopping(ComprasFinalizadas) {
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
}
export function cleanCart(CarrinhosPorUsuario1) {
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
}
export function userCart(CarrinhosPorUsuario1) {
    localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario1));
}
export function loadCart() {
    JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
    return CarrinhosPorUsuario1;
}
export function loadRegister() {
    JSON.parse(localStorage.getItem('Registros') || '[]');
    return Registros1;
}
export function saveShoppingCart(ComprasFinalizadas) {
    localStorage.setItem('ComprasFinalizadas', JSON.stringify(ComprasFinalizadas));
}
