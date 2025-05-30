
const nameList = [{
    nombre: "Franco", apellido: "Puricelli", dni: 46754729
}]
productos = []

//EJERCICIO 1

function writeName() {
    const nombre = document.querySelector(".nombreAlumno");
    //list.forEach((element) => {
        nombre.innerHTML += `<h3>Nombre: ${nameList[0].nombre}  ${nameList[0].apellido} </h3>`;
        console.log(` ${nameList[0].nombre} - ${nameList[0].apellido}`);

    };


//EJERCICIO 2


const getData = async () => {
    const response = await fetch("db.json");
    const data = await response.json();
    productos = data;
    console.log(data);
    mostrarProductos(data);
}

//EJERCICIO 3

function mostrarProductos(data) {
    const contenedor = document.querySelector(".product-grid");
    contenedor.innerHTML = "";
    data.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
    `;

    const btn = document.createElement("button");
    btn.className = "add-to-cart";
    btn.textContent = "Agregar a carrito";
    btn.addEventListener("click", () => {
      agregarAlCarrito(producto)
    
    });

    card.appendChild(btn);
    contenedor.appendChild(card);
  });
}

//EJERCICIO 4

function filtro() {
    const input = document.querySelector(".search-bar");
    input.addEventListener("keyup", (e) => {
        const productoEscrito = e.target.value.toLowerCase();
        const ProductoFiltrado = productos.filter((p) =>
            p.nombre.toLowerCase().includes(productoEscrito)
        );
        console.log(ProductoFiltrado);
        mostrarProductos(ProductoFiltrado);
    });
}


//EJERCICIOS 5 y 6(implementado dentro de la funcion actualizarCarrito())
let carrito = [];

function agregarAlCarrito(producto) {
     const existente = carrito.find(item => item.id === producto.id); //EJERCICIO 7
    //verifica si el producto ya existe en el carrito
    if (existente) {
        existente.cantidad += 1; 
    } else {
        carrito.push({ ...producto, cantidad: 1 }); 
    }

    actualizarCarrito();
}

function actualizarCarrito() { //lo renderiza en realidad
  const contenedor = document.getElementById("cart-items");
  const totalPrecio = document.getElementById("total-price");
const carritoItems = document.getElementById("cart-count");
  if (carrito.length === 0) {
    contenedor.innerHTML = `<p>No hay elementos en el carrito.</p>`;
    totalPrecio.textContent = "$0.00";
    localStorage.removeItem("carrito");
  }

  contenedor.innerHTML = "";

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.className = "item-block";
    li.innerHTML = `
      <p class="item-name">${item.nombre} - $${item.precio} x ${item.cantidad}</p>
      <button class="delete-button">Eliminar</button>
    `;
    
    carritoItems.textContent = carrito.length; 

    contenedor.appendChild(li);
  });

    // calcular el total
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;
  });
  totalPrecio.textContent = `$${total}`;

    // agrego el limina un poducto si hay mas de uno. 
    const BotonEliminar = document.querySelectorAll(".delete-button");
    BotonEliminar.forEach((boton,index) => {
        
       boton.addEventListener("click", () => {
        if (carrito[index].cantidad > 1) {
                carrito[index].cantidad -= 1;
            } else {
                 carrito.splice(index, 1);
            }
            actualizarCarrito();

    });

  localStorage.setItem("carrito", JSON.stringify(carrito)); // guardar el carrito en localStorage

})

//aplicacion del boton vaciar carrito
// botonVaciar = document.getElementById("empty-cart");
// botonVaciar.addEventListener("click", () => {
//     vaciarCarrito();

// });

// //aplicacion del boton finalizar compra
// botonCheckout = document.getElementById("checkout");
// botonCheckout.addEventListener("click", () => {
//     finalizarCompra(total);
// });

}

//funcion que hizo falta para que se guarde el carrito en localStorage
function recuperarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}


//EJERCICIO 9
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

//EJERCICIO 11
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }else{
        alert("tu pedido esta siendo procesado");
        vaciarCarrito();
        return;
    }

}



function init() {
   getData();
   filtro();
   writeName(nameList);
   recuperarCarrito(); 

     const botonVaciar = document.getElementById("empty-cart");
    botonVaciar.addEventListener("click", () => {
        vaciarCarrito();
    });

    const botonCheckout = document.getElementById("checkout");
    botonCheckout.addEventListener("click", () => {
        finalizarCompra();
    });
}


init();
