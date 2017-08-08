class Territory {

  constructor(nome, abreviacao, nomeSimples, regraConquista, cor) {
    this.nome = nome;
    this.abreviacao = abreviacao;
    this.nomeSimples = nomeSimples;
    this.regraConquista = regraConquista;
    this.cor = cor;
  }

  conquistou(acertos) {
    let acertouTerritoriosNecessarios = true;
    for (const territorioNecessario of this.regraConquista) {
      if (acertos.indexOf(territorioNecessario) == -1) {
        acertouTerritoriosNecessarios = false;
      }
    }
    if (acertouTerritoriosNecessarios) {
      for (const territorioNecessario of this.regraConquista) {
        acertos.indexOf(territorioNecessario)
      }
    }
    return acertouTerritoriosNecessarios;
  }
}


const territories = [
  new Territory('Utânia', 'U', 'Utania', 'FT', '#c58832'),
  new Territory('Fhárum', 'F', 'Fharum', 'UF', '#bca95f'),
  new Territory('Jaura', 'J', 'Jaura', 'JN', '#e3b55a'),
  new Territory('Tháriem', 'T', 'Thariem', 'UJ', '#818420'),
  new Territory('Plomo', 'P', 'Plomo', 'UFJ', '#cb8042'),
  new Territory('Niar', 'N', 'Niar', 'JTN', '#6f8b7e'),
  new Territory('Galétros', 'G', 'Galetros', 'FTG', '#809d91'),
  new Territory('Sudor', 'S', 'Sudor', 'NGS', '#ae532c'),
  new Territory('Arigoth', 'A', 'Arigoth', 'NGA', '#636e5e'),
]

function increment(btnId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.innerHTML = parseInt(btn.innerHTML) + 1;
    computarLancamentos();
  }
}

function clearBtnCounter() {
  for (ter of territories) {
    let btn = document.getElementById('btn'+ter.nomeSimples);
    btn.innerHTML = 0;
  }
  computarLancamentos();
}

function computarLancamentos() {

  let acertosJogador = '';
  for (ter of territories) {
    let qtd = parseInt(document.getElementById('btn'+ter.nomeSimples).innerHTML);
    for (let i = 0; i < qtd; i++) {
      acertosJogador = acertosJogador.concat(ter.abreviacao);
    }
  }

  const conquistas = document.getElementById("conquistas");
  conquistas.innerHTML = '';

  let acertosCopiados = acertosJogador.concat('');
  for (ter of territories) {
    if (ter.conquistou(acertosCopiados)) {
      addTerritory(conquistas, ter.nome);
    }
  }

}

function addTerritory(conquistas, name) {
  const span = document.createElement('span');
  span.innerHTML = name;
  conquistas.appendChild(span);
}
