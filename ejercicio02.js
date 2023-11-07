// se obtienen todas las imágenes en miniatura de la página

let imagenes = document.querySelectorAll(".miniatura");

//Se crea la funnción MouseIn
function MouseOver(element) {
    //Se obtiene el atributo src de la imagen y la posición de la imagen
    let ruta = element.getAttribute("src");
    let positionX = element.getBoundingClientRect().left;
    let positionY = element.getBoundingClientRect().top;

    //Se crea un nuevo elemento img, se le asigna la misma ruta, se le asigna la clase "grande" 
    let imagenGrande = document.createElement("img");
    imagenGrande.setAttribute("src", ruta);
    imagenGrande.setAttribute("class", "grande");

    //Se hace la imagen más grande
    imagenGrande.style.width = "200px";
    imagenGrande.style.height = "200px";

    //Se le agregan los estilos para que se vea bien
    imagenGrande.style.backgroundColor = "white";
    imagenGrande.style.border = "1px solid black";
    imagenGrande.style.boxShadow = "5px 5px 5px black";
    imagenGrande.style.padding = "5px";
    


    //Se pone la imagen a un lado de la imagen pequeña
    imagenGrande.style.position = "absolute";
    imagenGrande.style.left = positionX + 100 + "px";
    imagenGrande.style.top = (positionY - 100) + "px";

    document.body.appendChild(imagenGrande);

}

//Se crea la función MouseOut
function MouseOut() {
    //Se obtiene la imagen grande
    let imagenGrande = document.querySelector(".grande");
    //Se elimina la imagen grande
    imagenGrande.remove();
}


imagenes.forEach(element => {
    element.addEventListener("mouseover", function () { MouseOver(element) });
    element.addEventListener("mouseout", MouseOut);
});


function obtenerGeneroPintura( pintura){
    let etiqueta = pintura.querySelector("td:nth-child(6)");
    if (etiqueta == null){
        return null;

    }else{
        console.log(etiqueta.innerHTML);
        let genero = etiqueta.innerHTML;
        return genero;
    }

}

function filtrarPinturas(genero){
    let pinturas = document.querySelectorAll(".pintura");
    pinturas.forEach(pintura => {
        let generoPintura = obtenerGeneroPintura(pintura);
        if(generoPintura == genero ){
            pintura.style.display = "table-row";
           
        }else{
            pintura.style.display = "none";
        }
    });
}

//Se obtiene el selector de genero
const selectElement = document.querySelector('select[name="filter"]');
const selectedValue = selectElement.value;

const form = document.querySelector('form');
const buttonFiltrar = document.querySelector('input[name="FiltrarBTN"]');


buttonFiltrar.addEventListener('click', (event) => {
  event.preventDefault();
  let genero = selectElement.value.toString();
  filtrarPinturas(genero);
});

//Para cada pintura, se obtniene el td que corresponda al boton de editar
let pinturas = document.querySelectorAll(".pintura");
pinturas.forEach(pintura => { 
    let botonEditar = pintura.querySelector("td:nth-child(7) > button");
    botonEditar.addEventListener("click", (event) => {
        event.preventDefault();

        //Se activa el modal
        let modal = document.querySelector(".modal");

        //Se pone el contenido del modal
        let imagen = pintura.querySelector("td:nth-child(2)").querySelector("img").src;
        let nombre = pintura.querySelector("td:nth-child(3)").querySelector("em").innerHTML;
        let autor = pintura.querySelector("td:nth-child(4)").innerHTML;
        let fecha = pintura.querySelector("td:nth-child(5)").innerHTML;
        let genero = pintura.querySelector("td:nth-child(6)").innerHTML;

        let imagenModal = document.querySelector("#img-modal");
        let inputNombre = document.querySelector("#Nombre");
        let inputAutor = document.querySelector("#Artista");
        let inputFecha = document.querySelector("#Anio");
        let inputGenero = document.querySelector("#Genero");

        console.log(imagen);
        imagenModal.src = imagen;
        inputNombre.value = nombre;
        inputAutor.value = autor;
        inputFecha.value = fecha;
        inputGenero.value = genero;

        console.log(nombre);
        console.log(autor);
        console.log(fecha);
        console.log(genero);

        

        modal.style.display = "flex";
        //Se obtiene el id de la pintura
    });
});


//Se obtiene el boton de cerrar el modal
let botonCerrar = document.querySelector("#cerrarModal");
botonCerrar.addEventListener("click", (event) => {
    event.preventDefault();
    let modal = document.querySelector(".modal");
    modal.style.display = "none";
});

//Se obtiene el boton de guardar cambios
let botonGuardar = document.querySelector("#guardar");
botonGuardar.addEventListener("click", (event) => {
    event.preventDefault();
    let modal = document.querySelector(".modal");

    let imagenModal = document.querySelector("#img-modal");
    let nuevoNombre = document.querySelector("#Nombre").value;
    let nuevoAutor = document.querySelector("#Artista").value;
    let nuevoAnio = document.querySelector("#Anio").value;
    let nuevoGenero = document.querySelector("#Genero").value;

    let pintura = document.querySelectorAll(".pintura");
    
    console.log(pintura);
    let img ;
    for (let i = 0; i < pintura.length; i++) {
        img = pintura[i].querySelector("td:nth-child(2)").querySelector("img");
        if(img.src == imagenModal.src){
            pintura = pintura[i];
            break;
        }
    }

    
    let nombre = pintura.querySelector("td:nth-child(3)").querySelector("em");
    let autor = pintura.querySelector("td:nth-child(4)");
    let fecha = pintura.querySelector("td:nth-child(5)");
    let genero = pintura.querySelector("td:nth-child(6)");

    nombre.innerHTML = nuevoNombre;
    autor.innerHTML = nuevoAutor;
    fecha.innerHTML = nuevoAnio;
    genero.innerHTML = nuevoGenero;

   
    modal.style.display = "none";
});
