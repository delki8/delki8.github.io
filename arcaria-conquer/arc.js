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

function computarLancamentosMultiplos() {
  let todasOpcoes = [];
  const acertosIniciais = 'UUFJ';
  let acertosEu = 'UUFJ';
  let opcoes;
  let territoriosParaComputar = territories.slice();

  do {
    opcoes = [];

    for (ter of territoriosParaComputar) {
      if (ter.conquistou(acertosEu)) {
        for (const territorioNecessario of ter.regraConquista) {
          acertosEu = acertosEu.removeFirstMatch(territorioNecessario);
        }
        opcoes.push(ter);
      }
    }

    let first = territoriosParaComputar.shift();
    territoriosParaComputar.push(first);
    acertosEu = acertosIniciais;

    if (opcoes.length) {
      todasOpcoes.push(opcoes)
    }

  } while (territoriosParaComputar[0].nomeSimples != 'Utania');

  for (op of todasOpcoes) {
    console.log(op);
  }
}

// remove first occurrence of a letter from a string
String.prototype.removeFirstMatch = function(char) {
    for (var i = 0; i < this.length; i++) {
        if (this.charAt(i) == char) {
          return this.slice(0, i) + this.slice(i + 1, this.length);
        }
    }
    return this;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  a.sort();
  b.sort();
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
