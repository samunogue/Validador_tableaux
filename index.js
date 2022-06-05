const input = document.querySelector(".visor")
var botoes = document.querySelectorAll(".botao");
var regras_tableaux = [/~/g,/T/g,/V/g,/->/g,/<->/g,/=/]
var proposicoes = ["A","","B","","C","","D",""]
function definir_proposicoes(){
    const input = document.querySelector("div").innerHTML
    var array_input = input.split("")
    array_input.forEach(Element =>{
        if(proposicoes.indexOf(Element) != -1){
            var decisao = prompt(Element+" == Digite se o elemento é verdadeiro ou falso. Use (V) ou (F)");
            if(decisao  == "V"){
                proposicoes[proposicoes.indexOf(Element)+1] = true
            }else if(decisao  == "F"){
                proposicoes[proposicoes.indexOf(Element)+1] = false
            }else{
                alert("Resposta inválida")
            }
        }     
})
console.log(proposicoes)
}
function criando_elemento_resposta(element_1,sinal,element_2,validade){
    var div = document.createElement("div")
    var resposta = document.createElement("p")
    div.classList.add("resposta")
    var body = document.querySelector(".secao")
    resposta.innerHTML =  element_1+sinal+element_2+" == "+validade
    div.appendChild(resposta);
    body.appendChild(div)    
}
function verificando_contra(input){
    var ocorrencias = []
    var inicio_busca = 0
    var letras = []
    for(i=0;i<input.length;i++){
        var pesquisa = input.indexOf("~", inicio_busca)
        if(pesquisa == -1){ break }
        ocorrencias.push(pesquisa)
        inicio_busca = pesquisa+1         
    }
    ocorrencias.forEach(Element =>{letras.push(input[Element+1])})
    letras.forEach(Element =>{ 
        var valor_verdade = (proposicoes.indexOf(Element)+1)
        if(proposicoes[valor_verdade] == true){
            proposicoes.splice(valor_verdade, 1, false)
        }else if(proposicoes[valor_verdade] == false){
            proposicoes.splice(valor_verdade, 1, true)
        }
    })
    }
function verificando_AND(input){
        var ocorrencias = []
        var inicio_busca = 0
        var letras = []
        for(i=0;i<input.length;i++){
            var pesquisa = input.indexOf("^", inicio_busca)
            if(pesquisa == -1){ break }
            ocorrencias.push(pesquisa)
            inicio_busca = pesquisa+1         
        }
        ocorrencias.forEach(Element =>{letras.push(input[Element-1]); letras.push(input[Element]); letras.push(input[Element+1]),letras.push("/")})
        var inicio_busca_expressao = 0
        for(i=0;i<letras.length;i = i+3){
            var pesquisa_sinal = letras.indexOf("/", inicio_busca_expressao)
            if(pesquisa_sinal == -1){break}
            var ele_1 = letras[pesquisa_sinal-3]
            var ele_2 = letras[pesquisa_sinal-1]
            var posicao_elemento_1 = proposicoes.indexOf(ele_1)
            var posicao_elemento_2 = proposicoes.indexOf(ele_2)
            if(proposicoes[posicao_elemento_1+1] == true && proposicoes[posicao_elemento_2+1] == true){
                criando_elemento_resposta(letras[pesquisa_sinal-3],letras[pesquisa_sinal-2],letras[pesquisa_sinal-1], true)
            }else{
                criando_elemento_resposta(letras[pesquisa_sinal-3],letras[pesquisa_sinal-2],letras[pesquisa_sinal-1], false)
            }            
            inicio_busca_expressao = pesquisa_sinal+1         
        }    
    }
function verificando_OU(input){
        var ocorrencias = []
        var inicio_busca = 0
        var letras = []
        for(i=0;i<input.length;i++){
            var pesquisa = input.indexOf("v", inicio_busca)
            if(pesquisa == -1){ break }
            ocorrencias.push(pesquisa)
            inicio_busca = pesquisa+1         
        }
        ocorrencias.forEach(Element =>{letras.push(input[Element-1]); letras.push(input[Element]); letras.push(input[Element+1]),letras.push("/")})
        var inicio_busca_expressao = 0
        for(i=0;i<letras.length;i = i+3){
            var pesquisa_sinal = letras.indexOf("/", inicio_busca_expressao)
            if(pesquisa_sinal == -1){break}
            var ele_1 = letras[pesquisa_sinal-3]
            var ele_2 = letras[pesquisa_sinal-1]
            var posicao_elemento_1 = proposicoes.indexOf(ele_1)
            var posicao_elemento_2 = proposicoes.indexOf(ele_2)
            if(proposicoes[posicao_elemento_1+1] == false && proposicoes[posicao_elemento_2+1] == false){
                criando_elemento_resposta(letras[pesquisa_sinal-3],letras[pesquisa_sinal-2],letras[pesquisa_sinal-1], false)
            }else{
                criando_elemento_resposta(letras[pesquisa_sinal-3],letras[pesquisa_sinal-2],letras[pesquisa_sinal-1], true)
            }            
            inicio_busca_expressao = pesquisa_sinal+1         
        }
    }
function  verificando_condicional(input){
        var ocorrencias = []
        var inicio_busca = 0
        var letras = []
        for(i=0;i<input.length;i++){
            var pesquisa = input.indexOf("-&gt;", inicio_busca)
            if(pesquisa == -1){ break }
            ocorrencias.push(pesquisa)
            inicio_busca = pesquisa+1         
        }
        ocorrencias.forEach(Element =>{letras.push(input[Element-1]); letras.push(input[Element]); letras.push(input[Element+5]),letras.push("/")})
        var inicio_busca_expressao = 0
        for(i=0;i<letras.length;i = i+3){
            var pesquisa_sinal = letras.indexOf("/", inicio_busca_expressao)
            if(pesquisa_sinal == -1){break}
            var ele_1 = letras[pesquisa_sinal-3]
            var ele_2 = letras[pesquisa_sinal-1]
            var posicao_elemento_1 = proposicoes.indexOf(ele_1)
            var posicao_elemento_2 = proposicoes.indexOf(ele_2)
            if(proposicoes[posicao_elemento_1+1] == true && proposicoes[posicao_elemento_2+1] == true){
                criando_elemento_resposta(letras[pesquisa_sinal-3],"->",letras[pesquisa_sinal-1], false)
            }else{
                criando_elemento_resposta(letras[pesquisa_sinal-3],"->",letras[pesquisa_sinal-1], true)
            }            
            inicio_busca_expressao = pesquisa_sinal+1         
        }
    }
function verificando_bicondicional(input){
        var ocorrencias = []
        var inicio_busca = 0
        var letras = []
        for(i=0;i<input.length;i++){
            var pesquisa = input.indexOf("&lt;-&gt;", inicio_busca)
            if(pesquisa == -1){ break }
            ocorrencias.push(pesquisa)
            inicio_busca = pesquisa+1         
        }
        ocorrencias.forEach(Element =>{letras.push(input[Element-1]); letras.push(input[Element]); letras.push(input[Element+9]),letras.push("/")})
        var inicio_busca_expressao = 0
        for(i=0;i<letras.length;i = i+3){
            var pesquisa_sinal = letras.indexOf("/", inicio_busca_expressao)
            if(pesquisa_sinal == -1){break}
            var ele_1 = letras[pesquisa_sinal-3]
            var ele_2 = letras[pesquisa_sinal-1]
            var posicao_elemento_1 = proposicoes.indexOf(ele_1)
            var posicao_elemento_2 = proposicoes.indexOf(ele_2)
            if((proposicoes[posicao_elemento_1+1] == true && proposicoes[posicao_elemento_2+1] == true) || (proposicoes[posicao_elemento_1+1] == false && proposicoes[posicao_elemento_2+1] == false)){
                criando_elemento_resposta(letras[pesquisa_sinal-3],"<->",letras[pesquisa_sinal-1], true)
            }else{
                criando_elemento_resposta(letras[pesquisa_sinal-3],"<->",letras[pesquisa_sinal-1], false)
            }            
            inicio_busca_expressao = pesquisa_sinal+1         
        }
    }
function simplificando_expressão(){
    var input = document.querySelector(".visor").innerHTML
    var inicio_busca = 0
    var expressoes = []
    var posicao_pares = []
    for(c=0;c<input.length;i++){
        var par_1 = input.indexOf("(", inicio_busca)
        if(par_1 == -1){ break }
        posicao_pares.push(par_1)
        var par_2 = input.indexOf(")", inicio_busca)
        posicao_pares.push(par_2)
        inicio_busca = par_2+1
        var expressao = []
        var array_input = input.split("")
        var validador_de_captura = false
        for(i=0;i<array_input.length; i++){
            var elemento = array_input[i]
            if(par_2 > i && i > par_1){
                validador_de_captura = true 
            }else{ validador_de_captura = false }            
            
            if(validador_de_captura == true){
                expressao.push(elemento)
            }
        }
        expressoes.push(expressao)
    }
    console.log(expressoes)
    expressoes.forEach(Element =>{
        var expressao = Element.join("");
        if(expressao.indexOf("^") != -1){
            verificando_AND(expressao)
        }else if(expressao.indexOf("v") != -1 ){
            verificando_OU(expressao)
        }else if(expressao.indexOf("&lt;-&gt;") != -1){
            verificando_bicondicional(expressao)
        }else if(expressao.indexOf("-&gt;") != -1){
            verificando_condicional(expressao)
        }
    })
}
function adicionar_input(){
    var cont = input.innerHTML
    input.innerHTML = cont + this.getAttribute("data-valor")
}
botoes.forEach(Element =>{
    Element.addEventListener("click", adicionar_input)
})
function metodo_final(){
    definir_proposicoes()
    simplificando_expressão()
}
