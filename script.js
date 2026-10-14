const mensagem = document.getElementById("mensagem");
const falar = document.getElementById("falar");
const parar = document.getElementById("parar");
const resultado = document.getElementById("resultado");

falar.addEventListener("click", () => {
  const texto = mensagem.value.trim();

  if (!texto) {
    resultado.textContent = "Digite uma mensagem antes de ouvir.";
    mensagem.focus();
    return;
  }

  if (!("speechSynthesis" in window)) {
    resultado.textContent =
      "Seu navegador não oferece suporte à leitura de voz.";
    return;
  }

  window.speechSynthesis.cancel();

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 0.95;

  fala.onstart = () => {
    resultado.textContent = "Lendo sua mensagem em voz alta...";
  };

  fala.onend = () => {
    resultado.textContent = "Leitura concluída!";
  };

  fala.onerror = () => {
    resultado.textContent =
      "Não foi possível reproduzir a voz. Tente novamente.";
  };

  window.speechSynthesis.speak(fala);
});

parar.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  resultado.textContent = "Reprodução interrompida.";
});

// Pergunta interativa para a apresentação
const opcoes = document.querySelectorAll("#opcoes button");
const voto = document.getElementById("voto");

opcoes.forEach((opcao) => {
  opcao.addEventListener("click", () => {
    opcoes.forEach((botao) => {
      botao.classList.remove("selecionada");
      botao.setAttribute("aria-pressed", "false");
    });

    opcao.classList.add("selecionada");
    opcao.setAttribute("aria-pressed", "true");

    const resposta = opcao.dataset.resposta;

    voto.textContent =
      `Você escolheu: ${resposta}. ` +
      "Essa é uma ótima área para desenvolver soluções inclusivas!";
  });
});

// Adiciona suporte inicial ao estado de seleção dos botões
opcoes.forEach((opcao) => {
  opcao.setAttribute("aria-pressed", "false");
});
