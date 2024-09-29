import { displayCategories } from "./modules/displayCategories.js";
import { displayProducts } from "./modules/displayProducts.js";
import { showMessage } from "./modules/showMessage.js";

const API_URL = 'https://fakestoreapi.com';

const form = document.querySelector('.form');
const btnOpenForm = document.querySelector('.btn__add');
const btnCloseFrom = document.querySelector('.btn__close');
const filter = document.getElementById('fCategory');
const btnLoad = document.querySelector('.btn__load');


async function getData(url, limit=6) {
    try {
        const res = await fetch(`${url}/products?limit=${limit}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const products = await res.json();
        displayProducts(products)
    } catch (error) {
        showMessage('Error fetching products: ' + error.message, 'error');
    }
};

function loadMore(i) {
    let c = i
    function addCount() {
        c+=6
        return getData(API_URL, c)
    }
    return addCount
}

let moreProducts = loadMore(6)

btnLoad.addEventListener('click', () => {
    moreProducts();
})

async function getFilteredData(url, category) {
    try {
        const res = await fetch(`${url}/products/category/${category}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const products = await res.json();
        displayProducts(products)
        document.querySelector('.title').textContent = category
    } catch (error) {
        showMessage('Error fetching products: ' + error.message, 'error');
    }
}

async function getCategories(url) {
    try {
        const res = await fetch(`${url}/products/categories`);
        if (!res.ok) throw new Error('Network response was not ok');
        const categories = await res.json();
        displayCategories(categories, 'pCategory')
        displayCategories(categories, 'fCategory')
    } catch (error) {
        showMessage('Error fetching products: ' + error.message, 'error');
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
        document.getElementById('pTitle').value = ''
        document.getElementById('pPrice').value = ''
        document.getElementById('pDesc').value = ''
        form.classList.remove('form__active')
        showMessage('Product added successfully');
    } catch (error) {
        showMessage(`Error adding product: ${error.message}`, 'error');
    }
};

export async function deleteProduct(id) {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Network response was not ok');
        showMessage('Product deleted successfully');
    } catch (error) {
        showMessage('Error deleting product: ' + error.message, 'error');
    }
}

btnOpenForm.addEventListener('click', () => {
    form.classList.add('form__active')
});

btnCloseFrom.addEventListener('click', () => {
    form.classList.remove('form__active')
});

form.addEventListener('submit', addProduct)

getData(API_URL);

getCategories(API_URL)

filter.addEventListener('change', () => {
    switch (filter.value) {
        case 'all products':
            getData(API_URL);
            document.querySelector('.title').textContent = 'Все товары'
            btnLoad.classList.remove('hidden')
            break;
        case 'electronics':
            getFilteredData(API_URL, filter[1].value)
            btnLoad.classList.add('hidden')
            break;
        case 'jewelery':
            getFilteredData(API_URL, filter[2].value)
            btnLoad.classList.add('hidden')
            break;
        case "men's clothing":
            getFilteredData(API_URL, filter[3].value)
            btnLoad.classList.add('hidden')
            break;
        case "women's clothing":
            getFilteredData(API_URL, filter[4].value)
            btnLoad.classList.add('hidden')
            break;
        default:
            getData(API_URL);
    }
})

