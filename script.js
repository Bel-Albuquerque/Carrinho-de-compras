const ol = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const total = document.createElement('p');
totalPrice.appendChild(total);
let soma = 0;

function saveList() {
  localStorage.setItem('ol', ol.innerHTML);
}

async function somaPrice(objetoTemp) {
  soma += objetoTemp.salePrice;
  total.innerHTML = `Preço Total: R$ ${soma.toFixed(2)}`;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const item = event.target;
 ol.removeChild(item);
 saveList();
 console.log();
}

ol.addEventListener('dblclick', cartItemClickListener);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

const minhaFetch = async () => {
  const response = await fetch(url);
   const json = await response.json();
   const datas = json.results;
   const itens = document.querySelector('.items');
   datas.forEach((produto) => {
     const objetoTemp = {
       sku: produto.id,
       name: produto.title,
       image: produto.thumbnail,
     };
     itens.appendChild(createProductItemElement(objetoTemp));
   });
};

const requisicaoEndPoint = async (id) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const json = await response.json();
  const data = json;
  return data;
};

async function criaProdutoNoCarrinho(event) {
  if (event.target.classList.contains('item__add') === true) {
    const botao = event.target.parentNode;
    const sku = botao.firstChild.innerText;
    const obj = await requisicaoEndPoint(sku);
    const name = obj.title;
    const salePrice = obj.price;
    const objetoTemp = { sku, name, salePrice };
    ol.appendChild(createCartItemElement(objetoTemp));
    saveList();
    somaPrice(objetoTemp);
  }
}

const itens = document.querySelector('.items');
itens.addEventListener('click', criaProdutoNoCarrinho);

minhaFetch();

window.onload = () => {
  ol.innerHTML = localStorage.getItem('ol');
};
