const url = 'https://restcountries.com/v2/all'
var divpaises = document.querySelector('#tabCountries')
var divfavoritos = document.querySelector('#tabFavoritos')
var populacaoTotal = document.querySelector('#totalPopulationList')
var populacaoFav = document.querySelector('#totalPopulationFavorites')
var pesquisa = document.querySelector('#pesquisa')
var favoritos = []
var paises = []
fetch(url)
    .then(promise => promise.json())
    .then((resultado) => {
        console.log(resultado)
        resultado.forEach(element => {
            paises.push(element)
        });
        mostrarDados()
    })

function mostrarDados() {
    var claiton, somaFav = 0, soma = 0
    populacaoTotal.innerHTML = 0
    paises.forEach((element, i) => {
        if(element!=''){
            somaFav += parseInt(element.population)
            claiton += `<tr><td>${element.numericCode}</td><td><img src ="${element.flag}" width="50px"></td><td>${element.name}</td><td>${element.population}</td><td><button onclick="favoritar('${i}')">+</button></td></tr> `
        }
    });
    divpaises.innerHTML = claiton
    populacaoTotal.innerHTML = somaFav
}

function favoritar(p) {
    favoritos[p] = paises[p]
    paises[p]=''
    mostrarDados()
    mostrarFavoritos()
}
function Rfavoritar(p) {
    paises[p] = favoritos[p]
    favoritos[p]=''
    mostrarDados()
    mostrarFavoritos()
}

function mostrarFavoritos() {
    var Pfavoritos, soma = 0
    favoritos.forEach((element, i) => {
        if(element!=''){
            soma += parseInt(element.population)
            Pfavoritos += `<tr><td>${element.numericCode}</td><td><img src ="${element.flag}" width="50px"></td><td>${element.name}</td><td>${element.population}</td><td><button onclick="Rfavoritar('${i}')"> -</button</td></tr> `   
        }
         
    });
    divfavoritos.innerHTML = Pfavoritos
    populacaoFav.innerHTML = soma
}

var pesPaises
pesquisa.addEventListener('input', ()=> {
    pesPaises = pesquisa.value
    funPesquisa(pesPaises)
})

function funPesquisa(paises_pesq){
    var claiton, somaFav = 0, soma = 0
    populacaoTotal.innerHTML = 0
    paises.forEach((element, i) => {
        if(element!=''){
            if(element.name.startsWith(paises_pesq)){
                somaFav += parseInt(element.population)
                claiton += `<tr><td>${element.numericCode}</td><td><img src ="${element.flag}" width="50px"></td><td>${element.name}</td><td>${element.population}</td><td><button onclick="favoritar('${i}')">+</button></td></tr> `
           
            }
             }
    });
    divpaises.innerHTML = claiton
    populacaoTotal.innerHTML = somaFav

}

function filtrar(regiao_pesq){

    var claiton, somaFav = 0, soma = 0
    populacaoTotal.innerHTML = 0
    paises.forEach((element, i) => {
        if(element!=''){
            if(element.region == regiao_pesq){
                somaFav += parseInt(element.population)
                claiton += `<tr><td>${element.numericCode}</td><td><img src ="${element.flag}" width="50px"></td><td>${element.name}</td><td>${element.population}</td><td><button onclick="favoritar('${i}')">+</button></td></tr> `
           
            }
             }
    });
    divpaises.innerHTML = claiton
    populacaoTotal.innerHTML = somaFav

}

document.querySelector("#am").addEventListener('click', ()=>{
    filtrar('Americas')
})

document.querySelector("#eu").addEventListener('click', ()=>{
    filtrar('Europe')
})

document.querySelector("#af").addEventListener('click', ()=>{
    filtrar('Africa')
})

document.querySelector("#as").addEventListener('click', ()=>{
    filtrar('Asia')
})

document.querySelector("#oc").addEventListener('click', ()=>{
    filtrar('Oceania')
})

