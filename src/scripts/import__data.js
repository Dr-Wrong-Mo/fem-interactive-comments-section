import * as json from '../JSON/data.json';

// Checks to see if data already exists in local storage, if not, will initialize local storage item
if (!localStorage.getItem('FEM-comments')) {
  localStorage.setItem('FEM-comments', JSON.stringify(json));
}

// get local storage
let data = JSON.parse(localStorage.getItem('FEM-comments'));