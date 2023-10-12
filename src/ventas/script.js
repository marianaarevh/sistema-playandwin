//#region Modelos

class VideoGame {

    constructor(id, name, description, category, price, image) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.category = category;
      this.price = price;
      this.image = image;
    }
  
  }
  
const videogame1 = 
    new VideoGame(
        1,
        "The Witcher 3: Wild Hunt", 
        "Un juego de rol de acción con mundo abierto que sigue las aventuras del cazador de monstruos Geralt de Rivia.", 
        "RPG de Accion",
        29.99, 
        "witcher3.jpeg"
        );
  
const videogame2 = 
    new VideoGame(
        2, 
        "The Legend of Zelda: Breath of the Wild", 
        "Un juego de acción y aventura de mundo abierto que sigue las aventuras de Link en un vasto y hermoso reino de Hyrule.",
        "Aventura", 
        59.99, 
        "zelda.jpeg"
        );

const videogame3 = 
    new VideoGame(
        3, 
        "Overwatch", 
        "Un shooter en primera persona donde los jugadores forman equipos y luchan en intensas batallas en línea para alcanzar objetivos específicos.", 
        "Shooter",
        39.99, 
        "overwatch.jpeg"
        );
      
const videogamesList = [videogame1, videogame2, videogame3];
  
  //#endregion

//#region despliegue tabla

function displayTable(games) {

    clearTable();

    const tablaBody = document.getElementById('data-table-body');

    const imagePath = `../assets/img/catalogo/`;

    games.forEach(game => {

      const row = document.createElement('tr');

      row.innerHTML = `
        <td> ${game.id} </td>
        <td> <img src="${imagePath + game.image}" alt="${game.name}" width="100"> </td>
        <td>${game.name}</td>
        <td>${game.description}</td>
        <td>${game.category}</td>
        <td>${game.price}</td>
      `;

      tablaBody.appendChild(row);

    });
}

// #endregion

function clearTable() {
    const tableBody = document.getElementById('data-table-body');
  
    tableBody.innerHTML = '';
  }

//#region Filtrado

// inicializar eventos de los botones del filtro
function initButtonsHandler() {

    document.getElementById('filter-form').addEventListener('submit', event => {
      event.preventDefault();
      applyFilters();
    });
  
    document.getElementById('reset-filters').addEventListener('click', () => {
      document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
      applyFilters();
    });
  
  }
  
  
  // aplicacion del filtro a los datos y despliegue
  function applyFilters() {
    const filterText = document.getElementById('text').value.toLowerCase();
    const filterCategory = document.getElementById('category').value.toLowerCase();
    const filterMinPrice = parseFloat(document.getElementById('price-min').value);
    const filterMaxPrice = parseFloat(document.getElementById('price-max').value);
  
    const filteredGames = filterGames(videogamesList, filterText, filterCategory, filterMinPrice, filterMaxPrice);
  
    displayTable(filteredGames);
  }
  
  
  // logica para filtrar
  function filterGames(games, text, category, minPrice, maxPrice) {
  
    return games.filter( game =>
        (!text     || game.name.toLowerCase().includes(text) || game.description.toLowerCase().includes(text)) &&
        (!category || game.category.toLowerCase().includes(category)) &&
        (!minPrice || game.price >= minPrice) &&
        (!maxPrice || game.price <= maxPrice)
      );
  }
  
  //#endregion

displayTable(videogamesList);
initButtonsHandler();

  