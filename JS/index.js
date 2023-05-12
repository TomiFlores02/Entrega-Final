const imgCarrito = document.getElementById ("imgCarrito")
const container = document.querySelector ("div#container")
const inputSearch = document.querySelector ("input#inputSearch")
const carrito = recoverCarrito ()

function productsFilter(valor) {
    let result = productos.filter (shoe => shoe.nombre.toLowerCase ().includes (valor.toLowerCase()))
        if (result.length > 0) {
            loadProducts (result)
        }
}

function returnCardHTML (shoe) {
return `<div class="card">
        <div class="card-image"><img src="${shoe.imagen}" alt="Image"></div>
        <div class="card-model">${shoe.nombre}</div>
        <div class="price-button">
        <div class="card-price"><span class="price">$${shoe.precio}</span></div>
        <button onclick="compra()" class="buy-now" id="${shoe.id}">Comprar Ahora</button>
        </div>`
}

function compra() {
    swal({
        title: "Producto agregado correctamente",
        icon: "success",
        button: "Aceptar",
    });
}

// Versión anterior:

// function loadProducts (array) {
//     container.innerHTML = ""
//     array.forEach (shoe => {
//         container.innerHTML += returnCardHTML (shoe)
//     })
//     clickActivate ()
// }

// Modificación de la función para hacerla asincrónica y usar promesas:

function loadProducts (array) {
    return new Promise (function (resolve, reject) {
      container.innerHTML = "";
      array.forEach (shoe => {
        container.innerHTML += returnCardHTML (shoe);
      });
      clickActivate ();
  
      resolve ();
    });
  }
  
  loadProducts (productos)
    .then (function () {
      console.log ("Productos cargados correctamente");
    })
    .catch (function (error) {
      console.error ("Error al cargar los productos:", error);
    });

inputSearch.addEventListener ("search", (e) => {
    productsFilter (e.target.value)
})

function clickActivate () {
    const botones = document.querySelectorAll ("button.buy-now")
          for (const boton of botones) {
            boton.addEventListener ("click", () => {
                let result = productos.find (shoe => shoe.id === parseInt (boton.id))
                    carrito.push (result)
                    saveCarrito ()
            })
          }
}

function saveCarrito () {
    localStorage.setItem ("carritoShoe", JSON.stringify (carrito))
}

function recoverCarrito () {
    return JSON.parse (localStorage.getItem ("carritoShoe")) || []
}

loadProducts (productos)
recoverCarrito ()