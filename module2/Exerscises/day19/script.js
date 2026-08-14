// 1

const heading = document.querySelector('h1');

heading.textContent = 'DOM Events';

heading.classList.toggle('active');


// 2

const cities = ['Addis Ababa', 'Bahir Dar', 'Mekelle'];

const cityList = document.getElementById('myList');

cities.forEach((city) => {

    const listItem = document.createElement('li');

    listItem.textContent = city;

    cityList.appendChild(listItem);

});


// 3

const button = document.getElementById('btn');

button.addEventListener('click', (event) => {

    console.log(event.target);

});

const buttonContainer = document.getElementById('buttonContainer');

buttonContainer.addEventListener('click', () => {

    console.log('Div listener fired');

});


// 4

const itemList = document.getElementById('itemList');

const items = ['Item1', 'Item2', 'Item3'];

items.forEach((item) => {

    const listItem = document.createElement('li');

    listItem.textContent = item;

    listItem.style.marginBottom = '10px';

    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'Delete';

    deleteButton.style.marginLeft = '10px';

    listItem.appendChild(deleteButton);

    itemList.appendChild(listItem);

});

itemList.addEventListener('click', (event) => {

    if (event.target.tagName === 'BUTTON') {

        event.target.parentElement.remove();

    }

});


// 5

const form = document.querySelector('form');

const input = document.getElementById('name');

const newItemList = document.getElementById('newItemList');

form.addEventListener('submit', (event) => {

    event.preventDefault();

    const value = input.value;

    const listItem = document.createElement('li');

    listItem.textContent = value;

    newItemList.appendChild(listItem);

    input.value = '';

});