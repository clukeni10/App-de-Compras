var _a, _b, _c;
// Adiciona evento aos botões de compra
document.querySelectorAll('.btnComprar').forEach(button => {
    button.addEventListener('click', function () {
        const produto = this.closest('.product-card');
        if (produto) {
            // Obtém informações do produto
            const productId = produto.getAttribute('data-id') || '';
            const productName = produto.getAttribute('data-nome') || '';
            const productPrice = parseFloat(produto.getAttribute('data-preco') || '0');
            // Recupera o registro do usuário atual
            const Registros = JSON.parse(localStorage.getItem('Registros') || '[]');
            const ultimoRegistro = Registros.length > 0 ? Registros[Registros.length - 1] : null;
            if (ultimoRegistro) {
                // Recupera ou inicializa os carrinhos por usuário
                const CarrinhosPorUsuario = JSON.parse(localStorage.getItem('CarrinhosPorUsuario') || '{}');
                const carrinho = CarrinhosPorUsuario[ultimoRegistro.nome] || [];
                // Adiciona o produto ao carrinho do usuário
                carrinho.push({ id: productId, nome: productName, preco: productPrice });
                // Atualiza o carrinho do usuário no localStorage
                CarrinhosPorUsuario[ultimoRegistro.nome] = carrinho;
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
        const Registros = JSON.parse(localStorage.getItem('Registros') || '[]');
        const ultimoRegistro = Registros.length > 0 ? Registros[Registros.length - 1] : null;
        if (ultimoRegistro) {
            const nome = ultimoRegistro.nome;
            const valor = ultimoRegistro.valor;
            const nomeUser = document.getElementById('nome');
            const valorUser = document.getElementById('valor');
            if (nomeUser && valorUser) {
                nomeUser.value = nome;
                valorUser.value = valor.toString();
            }
            else {
                console.error('Elementos #nome ou #valor não encontrados no DOM.');
            }
        }
        else {
            console.log('Não há registros no localStorage.');
        }
    }
});
const updateButton = document.getElementById('update');
updateButton === null || updateButton === void 0 ? void 0 : updateButton.addEventListener('click', () => {
    var _a, _b;
    const nomeUser = ((_a = document.getElementById('nome')) === null || _a === void 0 ? void 0 : _a.value) || '';
    const valorUser = parseFloat(((_b = document.getElementById('valor')) === null || _b === void 0 ? void 0 : _b.value) || '0');
    const Registros = JSON.parse(localStorage.getItem('Registros') || '[]');
    if (Registros.length > 0) {
        const ultimoRegistro = Registros[Registros.length - 1];
        ultimoRegistro.nome = nomeUser;
        ultimoRegistro.valor = valorUser;
        alert('Os dados foram atualizados com sucesso!');
    }
    else {
        const novoRegistro = { nome: nomeUser, valor: valorUser };
        Registros.push(novoRegistro);
        alert('Novo registro criado com sucesso!');
    }
    localStorage.setItem('Registros', JSON.stringify(Registros));
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
