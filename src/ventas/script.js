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
  
  //#endregion
  
  //#region VISTA
  
  // Mostrar y ocultar el modal para agregar una nueva venta.
  function initAddSaleButtonHandler() {
  
    document.getElementById('addSale').addEventListener('click', () => {
        document.getElementById('modalBackground').style.display = 'block';
        document.getElementById('modal').style.display = 'block';
    });
  
    modalBackground.addEventListener('click', () => {
        document.getElementById('modalBackground').style.display = 'none';
        document.getElementById('modal').style.display = 'none';
    });
  
  }
  
  //#endregion
  
  
  //#region CONTROLADOR
  
  initAddSaleButtonHandler();
  
  //#endregion