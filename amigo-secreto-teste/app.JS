let amigos = [];
let sorteio = {};

const inputNome = document.getElementById('nome-amigo');
const btnAdicionar = document.getElementById('adicionar');
const listaAmigos = document.getElementById('amigos-list');
const btnSortear = document.getElementById('sortear');
const btnReiniciar = document.getElementById('reiniciar');

const modal = document.getElementById("modal");
const mensagemSorteio = document.getElementById("mensagem-sorteio");
const closeModal = document.querySelector(".close");

// Atualiza a exibição da lista de amigos
function atualizarLista() {
  listaAmigos.innerHTML = '';
  amigos.forEach((nome, index) => {
    const li = document.createElement('li');
    li.textContent = nome;

    // Botão para ver o resultado individualmente
    const btnVerSorteio = document.createElement('button');
    btnVerSorteio.textContent = 'Ver Sorteio';
    btnVerSorteio.style.marginLeft = '10px';
    btnVerSorteio.onclick = () => mostrarSorteio(nome);

    li.appendChild(btnVerSorteio);
    listaAmigos.appendChild(li);
  });
}

// Adiciona um novo participante
btnAdicionar.addEventListener('click', () => {
  const nome = inputNome.value.trim();
  if (nome === '' || amigos.includes(nome)) {
    alert('Insira um nome válido e não repetido.');
    return;
  }
  amigos.push(nome);
  inputNome.value = '';
  atualizarLista();
});

// Função para embaralhar a lista
function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Realiza o sorteio sem revelar todos os resultados de uma vez
btnSortear.addEventListener('click', () => {
  if (amigos.length < 2) {
    alert('Adicione pelo menos dois participantes para realizar o sorteio.');
    return;
  }
  
  const sorteados = embaralhar([...amigos]);
  sorteio = {};  // Limpa os resultados anteriores

  sorteados.forEach((nome, index) => {
    sorteio[nome] = sorteados[(index + 1) % sorteados.length]; // Associa cada pessoa ao próximo da lista
  });

  alert('O sorteio foi realizado! Agora, cada participante pode ver quem tirou.');
  atualizarLista();
});

// Exibe o resultado individualmente em um modal
function mostrarSorteio(nome) {
  if (!sorteio[nome]) {
    alert('O sorteio ainda não foi realizado.');
    return;
  }
  mensagemSorteio.innerHTML = `<strong>${nome}</strong>, seu amigo secreto é <strong>${sorteio[nome]}</strong>!`;
  modal.style.display = "flex";
}

// Fecha o modal ao clicar no botão de fechar
closeModal.onclick = function() {
  modal.style.display = "none";
}

// Fecha o modal se o usuário clicar fora dele
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Reinicia o sorteio
btnReiniciar.addEventListener('click', () => {
  amigos = [];
  sorteio = {};
  atualizarLista();
});