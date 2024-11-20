//produtos.js

// Seleciona todos os botões de compra
document.querySelectorAll('.btnComprar').forEach(button => {
    button.addEventListener('click', function () {
      let produto = this.closest('.product-card'); // Encontra o produto relacionado ao botão clicado
  
      // Obtém informações do produto
      let productId = produto.getAttribute('data-id');
      let productName = produto.getAttribute('data-nome');
      let productPrice = parseFloat(produto.getAttribute('data-preco'));
  
      // Recupera o registro do usuário atual
      let Registros = JSON.parse(localStorage.getItem('Registros')) || [];
      let ultimoRegistro = Registros.length > 0 ? Registros[Registros.length - 1] : null;
  
      if (ultimoRegistro) {
        // Recupera ou inicializa os carrinhos por usuário
        let CarrinhosPorUsuario = JSON.parse(localStorage.getItem('CarrinhosPorUsuario')) || {};
        let carrinho = CarrinhosPorUsuario[ultimoRegistro.nome] || [];
  
        // Adiciona o produto ao carrinho do usuário
        carrinho.push({
          id: productId,
          nome: productName,
          preco: productPrice,
        });
  
        // Atualiza o carrinho do usuário no localStorage
        CarrinhosPorUsuario[ultimoRegistro.nome] = carrinho;
        localStorage.setItem('CarrinhosPorUsuario', JSON.stringify(CarrinhosPorUsuario));
  
        alert(`${productName} foi adicionado ao carrinho!`);
      } else {
        alert('Por favor, registre um usuário antes de adicionar itens ao carrinho.');
      }
    });
  });
  
  // Redireciona para a página do carrinho
  document.getElementById('carrinho').addEventListener('click', () => {
    window.location.href = "carrinho.html";
  });
  
  // Modal
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
  
  let updateButton = document.getElementById('update');
  if (updateButton) {
    updateButton.addEventListener('click', () => {
      let nomeUser = document.getElementById('nome').value;
      let valorUser = document.getElementById('valor').value;
  
      // Recupera os registros do localStorage
      let Registros = JSON.parse(localStorage.getItem('Registros')) || [];
  
      if (Registros.length > 0) {
        // Atualiza o último registro existente
        let ultimoRegistro = Registros[Registros.length - 1];
        ultimoRegistro.nome = nomeUser;
        ultimoRegistro.valor = valorUser;
        alert('Os dados foram atualizados com sucesso!');
      } else {
        // Cria um novo registro se não existir nenhum
        let novoRegistro = { nome: nomeUser, valor: parseFloat(valorUser) || 0 };
        Registros.push(novoRegistro);
        alert('Novo registro criado com sucesso!');
      }
  
      // Salva os registros atualizados no localStorage
      localStorage.setItem('Registros', JSON.stringify(Registros));
  
      // Fecha o modal (caso exista)
      if (typeof modal !== 'undefined' && modal) {
        modal.style.display = 'none';
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
  
  document.getElementById('registrarUser').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  
  document.getElementById('lista').addEventListener('click', () => { 
    window.location.href = 'listando.html';
  });