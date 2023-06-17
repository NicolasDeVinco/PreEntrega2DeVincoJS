
/* ARRAY INICIAL */
const productos = [
    {id: 1, nombre: "Original", categoria: "Yerba", stock: 20, precio: 1500},
    {id: 2, nombre: "Menta y Jengibre", categoria: "Yerba", stock: 25, precio: 1200},
    {id: 3, nombre: "Menta y Lavanda", categoria: "Yerba", stock: 25, precio: 1300},
    {id: 4, nombre: "Jengibre y Naranja", categoria: "Yerba", stock: 20, precio: 1400},
    {id: 5, nombre: "Manzanilla", categoria: "Yerba", stock: 30, precio: 1100},
    {id: 6, nombre: "Mate de acero", categoria: "Mate", stock: 15, precio: 7500},
    {id: 7, nombre: "Mate de madera", categoria: "Mate", stock: 10, precio: 6500},
    {id: 8, nombre: "Bombilla de acero", categoria: "Bombilla", stock: 25, precio: 1800},
    {id: 9, nombre: "Bombilla de madera", categoria: "Bombilla", stock: 10, precio: 1100}
]

/* ARRAY ACTUALIZADO*/
productos.push({
    id: 10,
    nombre: "Matera de cuero",
    categoria: "Matera",
    stock: 0,
    precio: 6500
})

/* ARRAY ACTUALIZADO POR SI A FUTURO SE NECESITA CODIGO DE BARRAS */
productos.forEach(producto => {
    producto.codigoDeBarras = generarCodigoDeBarras();
  });


/* VARIABLES GLOBALES */
let mensaje = "Bienvenidos a Fronteras Blends. Elija alguna de las siguientes opciones:\n1. Ver productos \n2. Filtrar por categoría \n3. Ordenar por precio \n4. Consultar stock \n5. Agregar productos al carrito \n6. Ver carrito completo \n7. Eliminar productos del carrito \n8. Ver total y comprar \n9. Salir"
let seleccion
let carrito = []
let idConsultado
let opcionCategoria 



/* FUNCIONES */

function generarCodigoDeBarras() {
    let codigo = Math.floor(Math.random() * 900000) + 100000;
    return codigo;
  }

function lista (pedidoAListar) {
    let listado = "ID - Producto\n"
    for (const elemento of pedidoAListar) {
        listado = listado + elemento.id + " - " + elemento.nombre + "\n"
    }
    return listado
}

function categoria () {
    let listado = "Escribí el nombre de la categoría que queres consultar:\n"
    productos.forEach(elemento => {
        if (!listado.includes(elemento.categoria))
        listado = listado + elemento.categoria +"\n"
    });
    
    opcionCategoria = prompt(listado)
}

function listaID (pedidoAListar) {
    let listado = "Elegí del siguiente listado el numero de ID del producto: \n"
    for (const elemento of pedidoAListar) {
        listado = listado + elemento.id + " - " + elemento.nombre + "\n"
    }
    idConsultado = Number(prompt(listado))
}

function listaPrecio (pedidoAListar) {
    let listado = "ID - Producto - Precio \n"
    for (const elemento of pedidoAListar) {
        listado = listado + elemento.id + " - " + elemento.nombre + " - " + elemento.precio + "\n"
    }
    return listado
}

function iva (precioFinal) {
    let precioIva = precioFinal + ((precioFinal* 21) / 100)
    return precioIva
}

/* PROCESO */

do {
   seleccion = Number(prompt(mensaje))

   /*SELECCION 1*/
   
   if (seleccion === 1) {
        alert(lista(productos) + "Volveras al menú principal")
   }

   /*SELECCION 2*/

   else if (seleccion === 2) {
        categoria(productos)

        if (opcionCategoria.toLowerCase() === "yerba") {
            let opcionYerbas = productos.filter(producto => producto.categoria.toLowerCase() === "yerba")
            alert(lista(opcionYerbas))
        }
        else if (opcionCategoria.toLowerCase() === "mate") {
            let opcionMates = productos.filter(producto => producto.categoria.toLowerCase() === "mate")
            alert(lista(opcionMates))
        }
        else if (opcionCategoria.toLowerCase() === "bombilla") {
            let opcionBombillas = productos.filter(producto => producto.categoria.toLowerCase() === "bombilla")
            alert(lista(opcionBombillas))
        }
        else if (opcionCategoria.toLowerCase() === "matera") {
            let opcionMatera = productos.filter(producto => producto.categoria.toLowerCase() === "matera")
            alert(lista(opcionMatera))
        }

        else {
            alert("Seleccionaste una opción incorrecta")
        }
   }

   /*SELECCION 3*/

   else if (seleccion === 3) {
        let orden = Number(prompt("Seleccione 1 para ordenar de menor a mayor precio o 2 para ordenar de mayor a menor precio:"))
        if (orden === 1) {
            function precioMayor () {
                productos.sort((a,b) => a.precio - b.precio)
                }
            precioMayor()
            alert(listaPrecio(productos))
        }
        else if (orden === 2) {
            function precioMenor () {
                productos.sort((a,b) => b.precio - a.precio)
                }
            precioMenor()
            alert(listaPrecio(productos))
        }
        else {
            alert("Ingesaste un dato incorrecto")
        }
   }

   /*SELECCION 4*/

   else if (seleccion === 4) {
        
        listaID(productos)
        
        function listaStock (productos) {
            let listado = "ID - Producto - Stock \n" + productos.id + " - " + productos.nombre + " - " + productos.stock + "\n"
            return listado
        }

        let stockConsultado = productos.find((producto) => producto.id === idConsultado)

        if (stockConsultado.stock === 0) {
            alert("No hay mas stock")
        } else {
            alert(listaStock(stockConsultado))
        }
   }

   /*SELECCION 5*/

   else if (seleccion === 5) {

    listaID(productos)
    
    let productoAComprar = productos.find((producto) => producto.id === idConsultado)
    let posicionEnCarrito = carrito.findIndex(producto => producto.id === productoAComprar.id)

    if (posicionEnCarrito === -1) {
        carrito.push({
            id: productoAComprar.id,
            nombre: productoAComprar.nombre,
            precioUnitario: productoAComprar.precio,
            unidades: 1,
            subtotal: productoAComprar.precio
            }
        )
    } else {
        carrito[posicionEnCarrito].unidades++
        carrito[posicionEnCarrito].subtotal = carrito
        [posicionEnCarrito].precioUnitario * carrito
        [posicionEnCarrito].unidades
    }
   }

   /*SELECCION 6*/

   else if (seleccion === 6) {
        if (carrito.length > 0) {
            alert(lista(carrito))
        } else {
            alert("Primero debes agregar un producto al carrito")
        }
   }

   /*SELECCION 7*/

   else if (seleccion === 7) {    

        listaID(carrito)
        
        let indiceAEliminar = carrito.findIndex((producto) => producto.id === idConsultado)

        if (indiceAEliminar !== -1) {
            carrito.splice(indiceAEliminar, 1)
            
            if (carrito.length === 0) {
                alert("Tu carrito está vacío")
            } else {
                alert(lista(carrito))
            }
        } else {
            alert("El producto seleccionado no existe en el carrito")
        }
   }
   
   /*SELECCION 8*/

   else if (seleccion === 8) {
    let precioFinal = 0;

    for (let i = 0; i < carrito.length; i++) {
        precioFinal += carrito[i].subtotal;
    }

    alert("El precio final de tus productos es: " + precioFinal + " pesos\nPero a eso hay que agregarle el IVA.\nEntonces te quedaría en: " + iva(precioFinal) + " pesos");
}
   

   /*SELECCION 9*/

   else if (seleccion === 9) {
    alert("Gracias por tu visita. Te esperamos pronto")
   }

   else {
    alert("El dato que ingresaste no se encuentra entre las opciones")
   }
} 
    while (seleccion !== 9) 