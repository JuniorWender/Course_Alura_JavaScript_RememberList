const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []; // Busca itens no localStorage, se estiver vazio, cria um array vazio

itens.forEach(elemento => {
    criaElemento(elemento);
});

form.addEventListener('submit', event => {
    event.preventDefault();
    
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade" : quantidade.value
    };

    if(existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual);

        itens[itens.findIndex(e => e.id === existe.id)] = itemAtual;
    }
    else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0 ; 

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem("itens",JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {
   const novoItem = document.createElement('li');
   
   novoItem.classList.add('item');

   const numItem = document.createElement('strong');
   numItem.innerHTML = item.quantidade;

   numItem.dataset.id = item.id

   novoItem.appendChild(numItem);
   novoItem.innerHTML += item.nome;

   novoItem.appendChild(botaoDeleta(item.id));

   lista.appendChild(novoItem);

}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X'

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode,id);
    })

    return elementoBotao;
}

function deletaElemento(tag,id) {
    tag.remove();

    itens.splice(itens.findIndex(e => e.id == id),1);

    localStorage.setItem('itens',JSON.stringify(itens));
}