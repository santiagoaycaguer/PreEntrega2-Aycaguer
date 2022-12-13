window.addEventListener("load",inicio);

function inicio() {
    document.querySelector("#btnGestionar").addEventListener("click",agenciaViajes);
}

// AGENCIA DE VIAJES---PROYECTO INTEGRADOR

// Preentrega 1

alert("Bienvenidos!! ¿Maletas listas para su nuevo destino?!!")

function agenciaViajes() {
    let edad= document.querySelector("#txtEdad").value;
    let cliente= document.querySelector("#txtNombre").value;
    let costo= 0;
    let cantidad= parseInt(document.querySelector("#cantPersonas").value);
    let destinos= document.querySelector("#destino").value;
    let mensaje= "";
    for(let i=0; i<=cantidad; i++) {
        if (destinos== "Maldonado") {
            costo+= 1500*4;
        }
        if (destinos== "Montevideo") {
            costo+= 1500*2;
        }
        if (destinos== "Colonia") {
            costo+= 1500*1;
        }
        if (destinos== "Rocha") {
            costo+= 1500*3;
        }
        if(cantidad>10) {
            mensaje= "Supera el máximo de personas por habitación";
        }
        else {
            mensaje= cliente + " el costo total es de: $" + costo;
        }
    }
    if(edad<18 || edad=="") {
        mensaje="Debe ingresar su edad y ser mayor de 18";
    }
    if(cliente=="") {
        mensaje="Debe ingresar su nombre";
    }
    document.querySelector("#resultado").innerHTML= mensaje;
}

//Preentrega 2
// OBJETOS

class Pack{
    constructor(nombre, unidadPrecio, precio, contenido) {
        this.nombre= nombre;
        this.unidadPrecio= unidadPrecio;
        this.precio= parseFloat(precio);
        this.contenido= contenido;
    }

    toString() {
        return this.nombre.toUpperCase() + " (" + this.precio.toFixed(2) + ") " + this.contenido;
    }

    sumarIva(){
        this.precio= this.precio * 1.21;
        return this.precio.toFixed(2);
    }

    getDescuento(porcentaje){
        return (this.precio * (porcentaje/100)).toFixed(2);
    }
}

let packTurista= new Pack("Turista", "$", "3990.990",  "3 días en Hotel 3 estrellas con desayuno incluido");
//console.log("Información pack Turista", packTurista);  
//console.log("Pack", packTurista.toString());
//console.log("Pack Turista con IVA incluido:", packTurista.sumarIva());
//console.log("Pack Turista con descuento de:", packTurista.getDescuento(6));

let packEjecutivo= new Pack("Ejecutivo", "$", "9990.990", "7 días en Hotel 5 estrellas all inclusive");
//console.log("Información pack Ejecutivo", packEjecutivo);
//console.log("Pack", packEjecutivo.toString());
//console.log("Pack Ejecutivo con IVA incluido:", packEjecutivo.sumarIva());
//console.log("Pack Ejecutivo con descuento de:", packEjecutivo.getDescuento(6));

class Huesped{
    constructor(nombres, apellidos, telefono, correo, tipoDocumento, numeroDocumento) {
        this.nombres= nombres;
        this.apellidos= apellidos;
        this.telefono= telefono;
        this.correo= correo;
        this.tipoDocumento= tipoDocumento;
        this.numeroDocumento= numeroDocumento;
    }

    toString() {
        return this.nombres + ", " + this.apellidos;
    }
}

let huesped1= new Huesped("Alfredo", "Alonso", "098144355", "aloalfre@gmail.com", "DNI", "1.222.333-4")
//console.log("Los valores del objeto son", huesped1);
//console.log("El huesped se llama", huesped1.toString());

let huesped2= new Huesped("Sebastian", "Cardozo", "099555777", "cardoseba@gmail.com", "Pasaporte", "ABC 4444-99")
//console.log("El huesped se llama", huesped2.toString());

let huesped3= new Huesped("Camila", "Romero", "091333547", "romcami@gmail.com", "DNI", "6.222.999-3")
//console.log("El huesped se llama", huesped3.toString());


// ARRAYS

let packs= [];
packs.push(packTurista, packEjecutivo);
console.log("Los paquetes de viajes habilitados son:", packs);

let listaHuespedes= [];
listaHuespedes.push(huesped1, huesped2, huesped3);
console.log("La lista de todos los huespedes son:", listaHuespedes);

// Buscador de huespedes (visto del lado de la empresa)

let huespedBuscado= prompt("Ingrese el nombre del huesped a buscar");
/*let isExist= listaHuespedes.includes(huespedBuscado);
if (isExist) {// Encontre al huesped
    console.log("Encontraste al huesped buscado");
} else {// No se encontro
    console.log("No se encontro al huesped buscado");
}*/

if (listaHuespedes.nombres== huespedBuscado) {
    console.log("Encontraste al huesped buscado");
} else {// No se encontro
    console.log("No se encontro al huesped buscado");
}