// remove first occurrence of a letter from a string
String.prototype.removeFirstMatch = function(char) {
    for (var i = 0; i < this.length; i++) {
        if (this.charAt(i) == char) {
          return this.slice(0, i) + this.slice(i + 1, this.length);
        }
    }
    return this;
}

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

function concatenarAcertos() {
  let acertosJogador = '';
  for (ter of territories) {
    let qtd = parseInt(document.getElementById('btn'+ter.nomeSimples).innerHTML);
    for (let i = 0; i < qtd; i++) {
      acertosJogador = acertosJogador.concat(ter.abreviacao);
    }
  }
  return acertosJogador;
}

function computarLancamentos() {
  let todasOpcoes = [];
  const acertosIniciais = concatenarAcertos();
  let acertosEu = acertosIniciais.concat('');
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
      let todasOpcoesComMesmoTamanho = todasOpcoes.filter(function(o) {
        return o.length == opcoes.length;
      });
      let opcaoJaExiste = false;
      for (const opcaoMesmoTamanho of todasOpcoesComMesmoTamanho) {
        if (opcoes.every(function (e) { return opcaoMesmoTamanho.indexOf(e) > -1; })) {
          opcaoJaExiste = true;
        }
      }
      const opcaoAindaNaoFoiAdicionada = !todasOpcoesComMesmoTamanho.length || !opcaoJaExiste;
      if (opcaoAindaNaoFoiAdicionada) {
        todasOpcoes.push(opcoes)
      }
    }

  } while (territoriosParaComputar[0].nomeSimples != 'Utania');

  const conquistas = document.getElementById("conquistas");
  conquistas.innerHTML = '';
  for (opcao of todasOpcoes) {
    const ul = document.createElement('ul');
    for (territorio of opcao) {
        const li = document.createElement('li');
        li.innerHTML = territorio.nome;
        ul.appendChild(li);
    }
    conquistas.appendChild(ul);
  }
}

(function () {

  // Create variable for setTimeout
  let delay;

  // Set number of milliseconds for longpress
  let longpress = 700;

  let listItems = document.getElementsByClassName('territory');
  let listItem;

  for (let i = 0, j = listItems.length; i < j; i++) {
    listItem = listItems[i];

    listItem.addEventListener('mousedown', function (e) {
      let _this = this;
      delay = setTimeout(check, longpress);

      function check() {
        _this.childNodes[1].innerHTML = -1;
      }

    }, true);

    listItem.addEventListener('mouseup', function (e) {
      // On mouse up, we know it is no longer a longpress
      clearTimeout(delay);
    });

    listItem.addEventListener('mouseout', function (e) {
      clearTimeout(delay);
    });

  }

}());
