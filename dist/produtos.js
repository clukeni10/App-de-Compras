var _a, _b, _c;
// Adiciona evento aos botões de compra
document.querySelectorAll('.btnComprar').forEach(button => {
    button.addEventListener('click', function () {
        const produto = this.closest('.product-card');
        if (produto) {
            // Obtém informações do produto
            const productId = parseInt(produto.getAttribute('data-id') || '');
            const productName = produto.getAttribute('data-nome') || '';
            const productPrice = parseFloat(produto.getAttribute('data-preco') || '0');
            // Recupera o User do usuário atual
            const Users = JSON.parse(localStorage.getItem('Users') || '[]');
            const ultimoUser = Users.length > 0 ? Users[Users.length - 1] : null;
            if (ultimoUser) {
                // Recupera ou inicializa os carrinhos por usuário
                const CarrinhosPorUsuario = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
                const carrinho = CarrinhosPorUsuario[ultimoUser.nome] || [];
                // Adiciona o produto ao carrinho do usuário
                carrinho.push({ id: productId, nome: productName, preco: productPrice });
                // Atualiza o carrinho do usuário no localStorage
                CarrinhosPorUsuario[ultimoUser.nome] = carrinho;
                localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario));
                alert(`${productName} foi adicionado ao carrinho!`);
            }
            else {
                alert('Por favor, registre um usuário antes de adicionar itens ao carrinho.');
            }
        }
    });
});
// Redireciona para a página do carrinho
(_a = document.getElementById('carrinho')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    window.location.href = 'carrinho.html';
});
// Modal
const openModal = document.getElementById('user');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
openModal === null || openModal === void 0 ? void 0 : openModal.addEventListener('click', () => {
    if (modal) {
        modal.style.display = 'flex';
        const Users = JSON.parse(localStorage.getItem('Users') || '[]');
        const ultimoUser = Users.length > 0 ? Users[Users.length - 1] : null;
        if (ultimoUser) {
            const nome = ultimoUser.nome;
            const valor = ultimoUser.valor;
            const nomeUser = document.getElementById('nome');
            const valorUser = document.getElementById('valor');
            if (nomeUser && valorUser) {
                nomeUser.value = nome;
                valorUser.value = valor.toString();
            }
            else {
                console.error('Elementos nome ou valor não encontrados no DOM.');
            }
        }
        else {
            console.log('Não há Users no localStorage.');
        }
    }
});
const updateButton = document.getElementById('update');
updateButton === null || updateButton === void 0 ? void 0 : updateButton.addEventListener('click', () => {
    var _a, _b;
    const nomeUser = ((_a = document.getElementById('nome')) === null || _a === void 0 ? void 0 : _a.value) || '';
    const valorUser = parseFloat(((_b = document.getElementById('valor')) === null || _b === void 0 ? void 0 : _b.value) || '0');
    const Users = JSON.parse(localStorage.getItem('Users') || '[]');
    if (Users.length > 0) {
        const ultimoUser = Users[Users.length - 1];
        ultimoUser.nome = nomeUser;
        ultimoUser.valor = valorUser;
        alert('Os dados foram atualizados com sucesso!');
    }
    else {
        const novoUser = { nome: nomeUser, valor: valorUser };
        Users.push(novoUser);
        alert('Novo User criado com sucesso!');
    }
    localStorage.setItem('Users', JSON.stringify(Users));
    if (modal) {
        modal.style.display = 'none';
    }
});
closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener('click', () => {
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
(_b = document.getElementById('registrarUser')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    window.location.href = 'index.html';
});
(_c = document.getElementById('lista')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    window.location.href = 'listando.html';
});
export {};
