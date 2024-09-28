import { displayCategories } from "./modules/displayCategories.js";
import { displayProducts } from "./modules/displayProducts.js";

const API_URL = 'https://fakestoreapi.com';
const form = document.querySelector('.form');
const btnOpenForm = document.querySelector('.btn__add');
const btnCloseFrom = document.querySelector('.btn__close');


async function getData(url) {
    try {
        const res = await fetch(`${url}/products`);
        if (!res.ok) throw new Error('Network response was not ok');
        const products = await res.json();
        displayProducts(products)
    } catch (error) {
        console.log('Error fetching products: ' + error.message, 'error');
    }
};

async function getCategories(url) {
    try {
        const res = await fetch(`${url}/products/categories`);
        if (!res.ok) throw new Error('Network response was not ok');
        const categories = await res.json();
        displayCategories(categories)
    } catch (error) {
        console.log('Error fetching products: ' + error.message, 'error');
    }
}

async function addProduct(event) {
    event.preventDefault();
    const newProduct = {
        title: document.getElementById('pTitle').value,
        price: parseFloat(document.getElementById('pPrice').value),
        description: document.getElementById('pDesc').value,
        category: document.getElementById('pCategory').value
    }
    try {
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        if (!res.ok) throw new Error('Network response was not ok');
        const addedProduct = await res.json();
        console.log('Product added successfully' + addedProduct);
    } catch (error) {
        console.log('Error adding product: ' + error.message, 'error');
    }
};

btnOpenForm.addEventListener('click', () => {
    form.classList.add('form__active')
    getCategories(API_URL)
});

btnCloseFrom.addEventListener('click', () => {
    form.classList.remove('form__active')
});

form.addEventListener('submit', addProduct)

getData(API_URL);
