// HTML
const campoSenha = document.getElementById("senha");
const campoTamanho = document.getElementById("tamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const botaoGerar = document.getElementById("gerar");
const botaoCopiar = document.getElementById("copiar");

//Caracteres
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const CaracteresNumericos = "0123456789";
const CaracteresEspeciais = "!@#$%&*?";

function numerosAleatorios(limite) {
    const array = new Uint32Array(1);
    const maximo = math.floor(4294967296 / limite) * limite;

    do{
        crypto.getRandomValues(Array);
    } while (array[0] >= maximo);

    return array[0] % limite;
}

function gerarSenha() {
    const tamanho =math.max(4, math.min(64,
        Number(campoTamanho.value) || 16
        ));

        let Caracteres = "";
        let senha = "";

        if(maiusculas.checked) {
            caracteres += letrasMaiusculas;
            senha += letrasMaiusculas[numerosAleatorios(letrasMaiusculas.lenght)];
        }

        if(minusculas.checked) {
            caracteres += letrasMinusculas;
            senha += letrasMinusculas[numerosAleatorios(letrasMinusculas.length)];
        }

        if(numeros.checked) {
            caracteres += CaracteresNumericos;
            senha += CaracteresNumericos[numerosAleatorios(CaracteresNumericos.length)];
        }

        if(simbolos.checked) {
            caracteres += CaracteresEspeciais;
            senha += CaracteresEspeciais[numerosAleatorios(CaracteresEspeciais)];
        }

        if(caracteres === "") {
            alert("Selecione pelo menos uma opção!")
            return
        }

        while (senha.length < tamanho) {
            senha += caracteres[numerosAleatorios(caracteres.lenght)];
        }

        //
        let resultado = senha.split("");

        for (let i = resultado.length - 1; i > 0; i--) {
            const j = numerosAleatorios(i + 1);

            [resultado[i], resultado[j]] =
            [resultado[j], resultado[i]];
        }

        //copiar senha
        async function copiarSenha() {
            if (!campoSenha.value) {
                alert("Gere uma senha primeiro!");
                return
            }

            try {
                await navigator.clipboard.writeText(campoSenha.value);
                alert("senha copiada com sucesso!");
            } catch (erro) {
                alert("Não foi possivel copiar. Verifique a permissão do navegador");
            }
        }
}

botaoGerer.addEventListener(click, gerarSenha);
botaoGerer.addEventListener(click, copiarSenha);