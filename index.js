const input = document.querySelector(".visor")
var botoes = document.querySelectorAll(".botao");
var botao_excluir = document.querySelector(".apagar")
var regras_tableaux = [/~/g,/T/g,/V/g,/->/g,/<->/g,/=/]
var regras_escrita = ["AA","BB","CC","DD","AB","AC","AD","BA","BC","BD","CA","CB","CD","DA","DB","DC","A(","B(","C(","D(","()","(v","(^","(->","(<->","^)","~)","->)","<->)","v)","vv","~~","^^","->->","<-><->","~v","~^","~->","~<->","v^","v->","v<->","^v","^->","^<->","->v","->^","-><->","<->^","<->v","<->->","A~A","A~B","A~C","A~D","B~A","B~B","B~D","C~A","C~B","C~C","C~D","D~A","D~B","D~C","D~D"]
var proposicoes = ["A","","B","","C","","D",""]
var expressoes_respondidas = []
function verificar_sintaxe(){
    var conteudo_input = input.innerHTML;
    var validador_escrita = true
    for(i=0;i<regras_escrita.length;i++){
        if(conteudo_input.indexOf(regras_escrita[i]) != -1){ validador_escrita = false }
    }
    if(validador_escrita == false){
        input.style.borderColor = "red"
    }else if(validador_escrita == true){
        input.style.borderColor = "green"
    }
}
function excluir_digito(){
    var resultado = document.querySelector('.visor').innerHTML;
    document.querySelector('.visor').innerHTML = resultado.substring(0, resultado.length -1);
}
function definir_proposicoes(){
    const input = document.querySelector("div").innerHTML
    var array_input = input.split("")
    array_input.forEach(Element =>{
        var posicao = proposicoes.indexOf(Element)
        if(posicao != -1){
            if(proposicoes[posicao+1] === ""){
                var decisao = prompt(Element+" == Digite se o elemento é verdadeiro ou falso. Use (V) ou (F)");
                if(decisao  == "V"){
                    proposicoes[posicao+1] = true
                }else if(decisao  == "F"){
                    proposicoes[posicao+1] = false
                }else{
                    alert("Resposta inválida")
                }
            }
        }     
})
}
function criando_elemento_resposta(element_1,sinal,element_2,validade){
    var div = document.createElement("div")
    var resposta = document.createElement("p")
    div.classList.add("resposta")
    var section = document.querySelector(".secao_resposta")
    resposta.innerHTML =  element_1+sinal+element_2+" == "+validade
    if(validade == true){
        div.style.borderColor = ("green")
    }else{
        div.style.borderColor = ("red")
    }
    expressoes_respondidas.push(resposta.innerHTML)
    div.appendChild(resposta);
    section.appendChild(div)    
}
function criando_elemento_resposta_composta(element_1,sinal,element_2,validade){
    var div = document.createElement("div")
    var resposta = document.createElement("p")
    div.classList.add("resposta")
    var section = document.querySelector(".secao_resposta")
    resposta.innerHTML =  element_1+sinal+element_2+" == "+validade
    if(validade == true){
        div.style.borderColor = ("green")
    }else{
        div.style.borderColor = ("red")
    }
    expressoes_respondidas.push(resposta.innerHTML)
    div.appendChild(resposta);
    section.appendChild(div)
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
    console.log("ANTES DA FUNCAO  "+proposicoes)
    console.log(expressoes)
    expressoes.forEach(Element =>{
        var expressao = Element.join(""); 
        if(expressao.indexOf("~") != -1){ verificando_contra(expressao) }
        var expressao_sem_contra = expressao.replace(/~/g, "")
        if(expressao_sem_contra.indexOf("^") != -1){
            verificando_AND(expressao_sem_contra)
        }else if(expressao_sem_contra.indexOf("v") != -1 ){
            verificando_OU(expressao_sem_contra)
        }else if(expressao_sem_contra.indexOf("&lt;-&gt;") != -1){
            verificando_bicondicional(expressao_sem_contra)
        }else if(expressao_sem_contra.indexOf("-&gt;") != -1){
            verificando_condicional(expressao_sem_contra)
        }  
    })
    console.log("DEPOIS DA FUNCAO  "+proposicoes) 
}
function adicionar_input(){
    var cont = input.innerHTML
    input.innerHTML = cont + this.getAttribute("data-valor")
}
function expressao_composta(){
    var input = document.querySelector(".visor").innerHTML
    var termos = [")v(",")^(",")-&gt;(",")&lt;-&gt;("]
    var validar_termo = false
    var termos_encontrados = []
    termos.forEach(Element =>{
        if(input.indexOf(Element) != -1){validar_termo = true, termos_encontrados.push(Element)}
    })
    var inicio_busca = 0
    var expressoes = []
    var posicao_pares = []
    if(validar_termo === true){
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
    }
    expressoes.forEach(Element =>{
        var expressao = Element.join(""); 
        if(expressao.indexOf("~") != -1){ verificando_contra(expressao) }
        var expressao_sem_contra = expressao.replace(/~/g, "")
        if(expressao_sem_contra.indexOf("^") != -1){
            verificando_AND(expressao_sem_contra)
        }else if(expressao_sem_contra.indexOf("v") != -1 ){
            verificando_OU(expressao_sem_contra)
        }else if(expressao_sem_contra.indexOf("&lt;-&gt;") != -1){
            verificando_bicondicional(expressao_sem_contra)
        }else if(expressao_sem_contra.indexOf("-&gt;") != -1){
            verificando_condicional(expressao_sem_contra)
        } 
    })
    termos_encontrados.forEach(Element =>{
        if(Element === ")^("){
            var valores_verdade = []
            for(i=0;i<expressoes_respondidas.length;i++){
                if(expressoes_respondidas[i].indexOf("true") != -1){ valores_verdade.push("true")}
                if(expressoes_respondidas[i].indexOf("false") != -1){ valores_verdade.push("false")}
            }
            if(valores_verdade.indexOf("false") != -1){
                criando_elemento_resposta_composta(expressoes_respondidas[0]," ^ ",expressoes_respondidas[1],false)
            }else{ criando_elemento_resposta_composta(expressoes_respondidas[0]," ^ ",expressoes_respondidas[1],true)}
        }else if(Element == ")v("){
            var valores_verdade = []
            for(i=0;i<expressoes_respondidas.length;i++){
                if(expressoes_respondidas[i].indexOf("true") != -1){ valores_verdade.push("true")}
                if(expressoes_respondidas[i].indexOf("false") != -1){ valores_verdade.push("false")}
            }
            if(valores_verdade.indexOf("true") != -1){
                criando_elemento_resposta_composta(expressoes_respondidas[0]," v ",expressoes_respondidas[1],true)
            }else{ criando_elemento_resposta_composta(expressoes_respondidas[0]," v ",expressoes_respondidas[1],false)}

        }else if(Element == "&lt;-&gt;"){
            var valores_verdade = []
            for(i=0;i<expressoes_respondidas.length;i++){
                if(expressoes_respondidas[i].indexOf("true") != -1){ valores_verdade.push("true")}
                if(expressoes_respondidas[i].indexOf("false") != -1){ valores_verdade.push("false")}
            }
            if((valores_verdade.indexOf("true") != -1 && valores_verdade.indexOf("false") == -1) || (valores_verdade.indexOf("false") != -1 && valores_verdade.indexOf("true") == -1)){
                criando_elemento_resposta_composta(expressoes_respondidas[0]," &lt;-&gt; ",expressoes_respondidas[1],true)
            }else{ criando_elemento_resposta_composta(expressoes_respondidas[0]," &lt;-&gt; ",expressoes_respondidas[1],false)}
        
        }else if(Element == "-&gt;"){
            var valores_verdade = []
            for(i=0;i<expressoes_respondidas.length;i++){
                if(expressoes_respondidas[i].indexOf("true") != -1){ valores_verdade.push("true")}
                if(expressoes_respondidas[i].indexOf("false") != -1){ valores_verdade.push("false")}
            }
            if(valores_verdade.indexOf("true") === 0 && valores_verdade.indexOf("false") === 1){
                criando_elemento_resposta_composta(expressoes_respondidas[0]," -&gt; ",expressoes_respondidas[1],false)
            }else{ criando_elemento_resposta_composta(expressoes_respondidas[0]," -&gt; ",expressoes_respondidas[1],true)}
        }
    })
    
}
botoes.forEach(Element =>{
    Element.addEventListener("click", adicionar_input)
    Element.addEventListener("click", verificar_sintaxe)
})
botao_excluir.addEventListener("click", verificar_sintaxe)
function metodo_final(){
    definir_proposicoes()
    const input = document.querySelector(".visor").innerHTML
    var termos_usados = [")v(",")^(",")-&gt;(",")&lt;-&gt;("]
    var validador_expressao_composta = false
    termos_usados.forEach(Element =>{
        if(input.indexOf(Element) != -1){validador_expressao_composta = true}
    })
    if(validador_expressao_composta === true){
        expressao_composta()
    }else{
        simplificando_expressão()
    }
}
