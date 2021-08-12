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
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => {};

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

async function retornaId(event) {
  if (event.target.classList.contains('item__add') === true) {
    const botao = event.target.parentNode;
    const sku = botao.firstChild.innerText;
    const obj = await requisicaoEndPoint(sku);
    const name = obj.title;
    const salePrice = obj.price;
    const objetoTemp = { sku, name, salePrice };
    const ol = document.querySelector('.cart__items');
    ol.appendChild(createCartItemElement(objetoTemp));
  }
}

const itens = document.querySelector('.items');
itens.addEventListener('click', retornaId);

// section class = items vai ficar ouvindo
// toda vez que qualuqer bottao for clicado
// event.target 

minhaFetch();
