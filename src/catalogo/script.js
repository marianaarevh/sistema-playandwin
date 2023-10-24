class Videojuego {
  constructor(id, image, nombre, descripcion, categoria, precio) {
    this.id = id;
    this.image = image;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.precio = precio;
  }
}

// Arreglo de videojuegos
let VideojuegoList = [];

// Función para mostrar la tabla de videojuegos
function displayTable(games) {
  clearTable();
  showLoadingMessage();

  setTimeout(() => {
    hideMessage();
    const tablaBody = document.getElementById('data-table-body');
    const imagePath = '../assets/img/catalogo/';

    games.forEach(game => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${game.id}</td>
        <td><img src="${imagePath + game.image}" alt="${game.nombre}" width="100"></td>
        <td>${game.nombre}</td>
        <td>${game.descripcion}</td>
        <td>${game.categoria}</td>
        <td>${game.precio}</td>
      `;

      tablaBody.appendChild(row);
    });
  }, 2000); // Retraso de 2 segundos (2000 ms) antes de mostrar los datos
}

// Función para limpiar la tabla
function clearTable() {
  const tableBody = document.getElementById('data-table-body');
  tableBody.innerHTML = '';
}

// Función para mostrar el mensaje de carga
function showLoadingMessage() {
  const messageNotFound = document.getElementById('message-not-found');
  messageNotFound.innerHTML = 'Cargando...';
  messageNotFound.style.display = 'block';
}

// Función para ocultar el mensaje de carga
function hideMessage() {
  const messageNotFound = document.getElementById('message-not-found');
  messageNotFound.style.display = 'none';
}

// Función para obtener los datos de la API
function searchData() {
  const OPTIONS = {
    method: 'GET',
    headers: {
      'Accept': 'application json'
    }
  };

  fetch('https://6536a0c4bb226bb85dd26f80.mockapi.io/juegos', OPTIONS)
    .then(response => response.json())
    .then(data => {
      VideojuegoList = data.map(item => {
        const videojuego = new Videojuego(
          item.id,
          item.image,
          item.name,
          item.description,
          item.categoria,
          item.price
        );
        // Agregar el nombre al select
        const select = document.querySelector('#text');
        const option = document.createElement('option');
        option.value = videojuego.nombre;
        option.text = videojuego.nombre;
        select.appendChild(option);

        return videojuego;
      });
      displayTable(VideojuegoList);
    })
    .catch(error => console.log(error));
}

searchData();

// Obtener los elementos del formulario
const form = document.querySelector('#filter-form');
const textInput = document.querySelector('#text');
const categoryInput = document.querySelector('#category');
const minPriceInput = document.querySelector('#price-min');
const maxPriceInput = document.querySelector('#price-max');

// Manejar el evento de envío del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que se recargue la página al enviar el formulario

  // Obtener los valores de entrada del usuario
  const filterText = textInput.value.toLowerCase();
  const filterCategory = categoryInput.value.toLowerCase();
  const filterMinPrice = parseFloat(minPriceInput.value);
  const filterMaxPrice = parseFloat(maxPriceInput.value);

  // Filtrar los videojuegos basados en los criterios
  const videojuegosFiltrados = VideojuegoList.filter(function (videojuego) {
    const cumpleTexto = videojuego.nombre.toLowerCase().includes(filterText);
    const cumpleCategoria = videojuego.categoria.toLowerCase().includes(filterCategory);
    const cumplePrecioMin = isNaN(filterMinPrice) || videojuego.precio >= filterMinPrice;
    const cumplePrecioMax = isNaN(filterMaxPrice) || videojuego.precio <= filterMaxPrice;

    return cumpleTexto && cumpleCategoria && cumplePrecioMin && cumplePrecioMax;
  });

  // Mostrar los videojuegos filtrados en la tabla
  displayTable(videojuegosFiltrados);
});

// Manejar el evento de restablecimiento del formulario
document.querySelector('#reset-filters').addEventListener('click', function () {
  form.reset(); // Restablecer el formulario
  displayTable(VideojuegoList); // Mostrar todos los videojuegos nuevamente
});