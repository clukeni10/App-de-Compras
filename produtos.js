 // Seleciona todos os botões de compra
 document.querySelectorAll('.btnComprar').forEach(button => {
  button.addEventListener('click', function () {
    let produto = this.closest('.product-card'); // Encontra o produto relacionado ao botão clicado

    // Obtem informações do produto
    let productId = produto.getAttribute('data-id');
    let productName = produto.getAttribute('data-nome');
    let productPrice = parseFloat(produto.getAttribute('data-preco'));

    // Recupera o carrinho atual do localStorage ou inicializa um novo array
    let carrinho = JSON.parse(localStorage.getItem('Carrinho')) || [];

    // Adiciona o produto ao carrinho
    carrinho.push({
      id: productId,
      nome: productName,
      preco: productPrice,
    });

    // Atualiza o carrinho no localStorage
    localStorage.setItem('Carrinho', JSON.stringify(carrinho));

    alert(`${productName} foi adicionado ao carrinho!`);
  });
});

document.getElementById('carrinho').addEventListener('click', () => {

  window.location.href = "carrinho.html";
});


// Seleciona os elementos
const openModal = document.getElementById('user');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');

// Abre o modal ao clicar no botão
openModal.addEventListener('click', () => {
  modal.style.display = 'flex'; // Mostra o modal

  let Registros = JSON.parse(localStorage.getItem('Registros')) || [];
  let ultimoRegistro = Registros.length > 0 ? Registros[Registros.length - 1] : null;

  if (ultimoRegistro) {
    // Obtém nome e valor diretamente do último registro
    let nome = ultimoRegistro.nome;
    let valor = ultimoRegistro.valor;

    // Seleciona os elementos no DOM
    let nomeUser = document.getElementById('nome');
    let valorUser = document.getElementById('valor');

    // Verifica se os elementos existem antes de tentar alterar
    if (nomeUser && valorUser) {
      // Atualiza o conteúdo dos elementos com os valores
      nomeUser.value = nome;
      valorUser.value = valor;
    } else {
      console.error('Elementos #nome ou #valor não encontrados no DOM.');
    }
  } else {
    console.log('Não há registros no localStorage.');
  }
});

// Botão de atualização
let updateButton = document.getElementById('update');
if (updateButton) {
  updateButton.addEventListener('click', () => {
    let nomeUser = document.getElementById('nome').value;
    let valorUser = document.getElementById('valor').value;

    // Recupera os registros do localStorage
    let Registros = JSON.parse(localStorage.getItem('Registros')) || [];

    // Verifica se existem registros e atualiza o último registro
    if (Registros.length > 0) {
      let ultimoRegistro = Registros[Registros.length - 1];

      // Atualiza os dados do último registro
      ultimoRegistro.nome = nomeUser;
      ultimoRegistro.valor = valorUser;

      // Salva novamente no localStorage
      localStorage.setItem('Registros', JSON.stringify(Registros));

      // Exibe um alert informando que os dados foram atualizados
      alert('Os dados foram atualizados com sucesso!');
      modal.style.display = 'none'; // Fecha o modal após a atualização
    } else {
      console.log('Não há registros para atualizar.');
    }
  });
}


// Fecha o modal ao clicar no botão de fechar
closeModal.addEventListener('click', () => {
  modal.style.display = 'none'; // Esconde o modal
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none'; // Esconde o modal
  }
});

