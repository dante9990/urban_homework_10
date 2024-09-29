export function displayCategories(list, id) {
    const categoriesList = document.getElementById(id);
    list.forEach(category => {
        const categoryElem = document.createElement('option');
        categoryElem.value = category
        categoryElem.text = category
        categoriesList.appendChild(categoryElem);
    })
}