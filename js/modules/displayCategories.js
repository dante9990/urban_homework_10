export function displayCategories(list) {
    const categoriesList = document.getElementById('pCategory');
    categoriesList.innerHTML = '';
    list.forEach(category => {
        const categoryElem = document.createElement('option');
        categoryElem.value = category
        categoryElem.text = category
        categoriesList.appendChild(categoryElem);
    })
}