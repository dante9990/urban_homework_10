export function displayProducts(list) {
    const productsList = document.querySelector('.store');
    productsList.innerHTML = '';
    list.forEach(product => {
        const productElem = document.createElement('article');
        productElem.className = 'product';
        productElem.innerHTML = `
                    <img class="product__img" src="${product.image}" alt="${product.title}">
                    <h2 class="product__title">${product.title}</h2>
                    <span class="product__price">${product.price} &#8381;</span>
                    <span class="product__category">${product.category}</span>
                    <p class="product__description">${product.description}</p>
                    <button class="btn btn__delete">Удалить товар</button>
        `;
        productsList.appendChild(productElem);
    })
}