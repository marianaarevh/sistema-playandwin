//#region MODELO

// Definimos la clase Sale
class Venta {
    constructor(id, customerName, saleDate, salesman, videogame, salePrice, notes) {
      this.id = id;
      this.customerName = customerName;
      this.saleDate = saleDate;
      this.salesman = salesman;
      this.videogame = videogame; 
      this.salePrice = salePrice;
      this.notes = notes;
    }
  }

  function mapAPIToSales(data) {
    return data.map(item => {
        return new Venta(
            item.id,
            item.customerName,
            new Date (item.saleDate),
            item.salesman,
            item.videogame,
            item.salePrice,
            item.notes
        );
    });  
}
  
  //#endregion
  
  // VISTA

  function displayTable(sales) {
    clearTable();

      const tablaBody = document.getElementById('data-table-body');
  
      sales.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${sale.id}</td>
          <td>${sale.customerName}</td>
          <td>${sale.videogame}</td>
          <td>${sale.salesman}</td>
          <td>${sale.saleDate}</td>
          <td>${sale.salePrice}</td>
          <td>
            <button class="btn-delete" alt="eliminar" data-sale-id=${sale.id}><i class="fa-regular fa-trash-can"></i></button>
          </td>
        `;
  
        tablaBody.appendChild(row);
      });
      initDeleteTaskButtonHandler();
  }
  
  function clearTable() {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';
  }

  // #region add-sale
  // Mostrar y ocultar el modal para agregar una nueva venta.
  function initAddSaleButtonHandler() {
  
    document.getElementById('addSale').addEventListener('click', () => {
      openAddSaleModal()
    });
  
    document.getElementById('modalBackground').addEventListener('click', () => {
      closeAddSaleModal();
    });
  
    document.getElementById('sale-form').addEventListener('submit', event => {
      event.preventDefault();
      processSubmitSale();
    });
  
  }
  
  function openAddSaleModal() {
    document.getElementById('sale-form').reset();
    document.getElementById('modalBackground').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
  }
  function closeAddSaleModal() {
    document.getElementById('sale-form').reset();
    document.getElementById('modalBackground').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
  }

  function processSubmitSale() {
    const customerName = document.getElementById('customer').value;
    const videogame = document.getElementById('videogame').value;
   const saleDate = document.getElementById('saleDate').value;
   const salesman = document.getElementById('salesman').value;
   const salePrice = document.getElementById('salePrice').value;
   const notes = document.getElementById('notes').value;
  
  
    const saleToSave = new Sale(
      null,
      customerName,
      videogame,
      salePrice,
      saleDate,
      salesman,
      notes
    );
  
    createSale(saleToSave);
  }
  
  //#endregion

// #region btn delete Sale
// boton Borrar
function initDeleteTaskButtonHandler() {

  document.querySelectorAll('.btn-delete').forEach(button => {

    button.addEventListener('click', () => {

      const saleId = button.getAttribute('data-sale-id'); // Obtenemos el ID de la venta
      deleteSale(saleId); // Llamamos a la función para eleminar la venta

  });

  });

}

// #endregion

// #region API

function getSalesData() {
  fetchAPI(`${apiURL}/Ventas`, 'GET')
    .then(data => {
      const salesList = mapAPIToSales(data);
      displayTable(salesList);
      
    });

}

function createSale(sale) {

  fetchAPI(`${apiURL}/Ventas`, 'POST', sale)
    .then(sale => {
      closeAddSaleModal();
      getSalesData();
      window.alert(`Venta ${sale.id} agregada correctamente`);
    });

}

function deleteSale(saleId) {

  const confirm = window.confirm(`¿seguro que desea eliminar venta: ${saleId}?`);

  if (confirm) {

    fetchAPI(`${apiURL}/Ventas/${saleId}`, 'DELETE')
      .then(() => {
        getSalesData();
        window.alert("Venta eliminada.");
      });

  }
}
//#endregion 
  
  //#region CONTROLADOR
  initAddSaleButtonHandler();

  getSalesData();
  
  //#endregion