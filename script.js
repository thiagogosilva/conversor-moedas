const moedaDe = document.getElementById('moeda-de');
const moedaPara = document.getElementById('moeda-para');
const valorInput = document.getElementById('valor');
const botaoConverter = document.getElementById('converter');
const resultado = document.getElementById('resultado');
const botaoTrocar = document.getElementById('trocar-moedas');

botaoConverter.addEventListener('click', async () => {
    const de = moedaDe.value;
    const para = moedaPara.value;
    const valor = parseFloat(valorInput.value);

    if (isNaN(valor) || valor <= 0) {
        resultado.textContent = 'Digite um valor válido!';
        return;
    }

    const endpoint = `https://economia.awesomeapi.com.br/last/${de}-${para}`;

    try {
        const res = await fetch(endpoint);
        const data = await res.json();
    
        const parMoeda = `${de}${para}`;
        const cotacao = parseFloat(data[parMoeda].bid);
    
        const convertido = valor * cotacao;
    
        resultado.textContent = `${valor} ${de} = ${convertido.toFixed(2)} ${para}`;
    } catch (error) {
        resultado.textContent = 'Erro ao converter. Verifique as moedas e tente novamente!';
    }
    });

    botaoTrocar.addEventListener('click', () => {
        const temp = moedaDe.value;
        moedaDe.value = moedaPara.value;
        moedaPara.value = temp;
    
    
    botaoTrocar.classList.add('girando');
    
    setTimeout(() => {
        botaoTrocar.classList.remove('girando');
    }, 500);
});