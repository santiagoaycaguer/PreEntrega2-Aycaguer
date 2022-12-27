window.addEventListener("load",inicio);


let huespedesRegistrados= []; // lista que mantiene los huespedes registrados

let UsuarioActual= null; // husped que esta logeado en este momento

let error = ""; //guarda el msj de error de las funciones


function inicio() {

    document.querySelector("#btnLogin").addEventListener("click",DivMostrarLogin);

    document.querySelector("#btnRegistro").addEventListener("click",DivMostrarRegistrar);

    document.querySelector("#btnRegistro").addEventListener("click",DivMostrarRegistroHuesped);

    document.querySelector("#btnARegistro").addEventListener("click",RegistrarHuesped);

    document.querySelector("#btnIngreso").addEventListener("click",IngresarUsuario);

    document.querySelector("#btnSalir").addEventListener("click",Salir);

    /*document.querySelector("#btnGestionar").addEventListener("click",agenciaViajes);*/

    OcultarDivsMenuInicial();

    huespedesRegistrados.push(new Huesped("Santiago","Santi1","Santi1","A","098244181","santiagoaycaguer@gmail.com","CI","5.222.111-6", huespedesRegistrados[0])); //precargo un huesped
}

function OcultarDivsMenuInicial(){
    document.querySelector("#login").style.display = "none";
    document.querySelector("#registro").style.display = "none";
    document.querySelector("#registroHuesped").style.display = "none";
    document.querySelector("#divMenuHuesped").style.display = "none";
}


function DivMostrarLogin(){

    OcultarDivsMenuInicial();

    document.querySelector("#login").style.display = "block";
}

function DivMostrarRegistrar(){

    OcultarDivsMenuInicial();

    document.querySelector("#registro").style.display = "block";
}

function DivMostrarRegistroHuesped(){

    document.querySelector("#registroHuesped").style.display = "block";
}

function RegistrarHuesped(){

    let nombre= document.querySelector("#inputANombre").value; //guardo el nombre que ingreso el usuario

    let usuario =  document.querySelector("#inputAUsuario").value; //guardo el usuario que ingreso el usuario

    let pass =  document.querySelector("#inputAPass").value; //guardo la contraseña que ingreso el usuario

    document.querySelector("#devolucionARegistro").innerHTML= "" //limpio la devolucion
    error = ""; //pongo el error en blanco

    let casillavacia = EstaVacio(nombre) || EstaVacio(usuario) || EstaVacio(pass); //guardo en casilla vacia si alguno de los inputs esta en blanco

    if (casillavacia) // si esta en blanco devuelvo el error
   {
        document.querySelector("#devolucionARegistro").innerHTML = error;
   }
   else //si no esta en blanco compruebo que la contraseña se correcta
   {
        if (!CumplePassword(pass)) //si la contraseña es incorrecta entonces :
        {
            document.querySelector("#devolucionARegistro").innerHTML = error;
        }
        else // si cumple entonces:
        {
            let existeotrousuarioigual = false; // inicio si existe otro usuario como falso
            for (const huesped of huespedesRegistrados) { // voy usuario por usuario chequiando si tienen el mismo usuario
                if(huesped.usuario == usuario)
                {
                    existeotrousuarioigual = true; // si encuentro otro con el mismo usuario convierto en verdadero
                    error = "Existe un usuario con el mismo nombre"
                }
            }
            if(existeotrousuarioigual) // si existe otro usuario con el mismo usuario devuelvo el error
            {
                document.querySelector("#devolucionARegistro").innerHTML = error;
            }
            else //si no habia otro usuario con el mismo usuario ya pase todas las pruebas
            {
                let nuevoHuesped = new Huesped(nombre,pass,usuario,) // creo el huesped nuevo
                huespedesRegistrados.push(nuevoHuesped); // lo agrego a la lista de huespedes registrados

                document.querySelector("#inputANombre").value = "";
                document.querySelector("#inputAUsuario").value = "";
                document.querySelector("#inputAPass").value = "";
                document.querySelector("#devolucionARegistro").innerHTML = "Registro Exitoso";
            }
        }
   }

}


function EstaVacio(texto)
{
    let devolucion = false;
    if (texto == "")
    {
        devolucion = true;
        error = "Una casilla esta vacia"
    }
    return devolucion;
}


function CumplePassword(password)
{
    let devolucion = true;
    let numerodemayusculas = 0;
    let numerodeminusculas = 0;
    let numerodenumeros = 0;
    if (password.length < 4)
    {
        devolucion = false;
        error = "La contraseña tiene menos de 4 caracteres <br>"
    }
    for (let index = 0; index < password.length; index++) { // voy letra por letra de la password
        let letra = password.charAt(index); //guardo la letra
        if (letra.charCodeAt(0) >= "A".charCodeAt(0) && letra.charCodeAt(0) <= "Z".charCodeAt(0)) //chequeo si es mayuscula
        {
            numerodemayusculas++ //sumo uno a mayusculas
        }
        else if(letra.charCodeAt(0) >= "a".charCodeAt(0) && letra.charCodeAt(0) <= "z".charCodeAt(0))
        {
            numerodeminusculas ++; //sumo una minuscula
        }
        else if(!isNaN(parseInt(letra)))
        {
            numerodenumeros++;
        }
        
    }
    
    if(numerodemayusculas == 0) //Si encuentra al menos una mayuscula el numero es diferente de 0 entonces no devuelve falso
    {
        devolucion = false;
        error += "La contraseña requiere al menos una mayuscula <br>"
    }
    
    if (numerodeminusculas == 0)
    {
        devolucion = false;
        error += "La contraseña requiere al menos una minuscula <br>"
    }
    
    if (numerodenumeros == 0)
    {
        devolucion = false;
        error += "La contraseña requiere al menos un numero <br>"
    }
    
    return devolucion;
}


function IngresarUsuario()
{
    document.querySelector("#devolucionLogin").innerHTML = "" //limpio la devolucion del login

    let usuario = document.querySelector("#inputUsuario").value; //guardo el usuario ingresado

    let pass = document.querySelector("#inputPass").value; //guardo la contraseña ingresada

    let nohaycoincidencia = true; //creo una variable de que no hay coincidencia en el usuario

    for (const Huesped of huespedesRegistrados) { //busco coincidencias con los huespedes
        if (Huesped.usuario == usuario) //si encuentro un huesped con el mismo usuario que el ingresado entro al if
        {
            if(Huesped.contraseña == pass) //si la contraseña coincide ingreso al if
            {
                nohaycoincidencia = false; //hay coincidencia
                UsuarioActual = Huesped; //el usuario actual es el huesped con mismo usuario y pass
                LoginHuesped(); //llamo a la funcion de que entro un huesped
                document.querySelector("#textoBienvenida").innerHTML = "Bienvenido " + UsuarioActual.nombre
            }
        }
    }

    if (nohaycoincidencia) //si no hay coincidencia
    {
        document.querySelector("#devolucionLogin").innerHTML = "Usuario y/o contraseña incorrectos" //devuelvo el error
    }

    document.querySelector("#inputUsuario").value = "";
    document.querySelector("#inputPass").value = "";
}


function LoginHuesped(){
    OcultarDivsMenuInicial(); //oculto todos los divs
    document.querySelector("#botonesLogYRegistro").style.display="none"; //oculto el menu de registro y login
    document.querySelector("#divMenuHuesped").style.display = "block"; //muestro
}


function Salir(){
    OcultarDivsMenuInicial();
    document.querySelector("#botonesLogYRegistro").style.display = "block";
    UsuarioActual=null; 
    document.querySelector("#textoBienvenida").innerHTML = "Bienvenido ";
}




//alert("Bienvenidos!! ¿Maletas listas para su nuevo destino?!!")

/*function agenciaViajes() {
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

//let huespedBuscado= prompt("Ingrese el nombre del huesped a buscar");
let isExist= listaHuespedes[0].nombres.toUpperCase().includes(huespedBuscado);
let isExist1= listaHuespedes[1].nombres.toUpperCase().includes(huespedBuscado);
let isExist2= listaHuespedes[2].nombres.toUpperCase().includes(huespedBuscado);
if (isExist || isExist1 || isExist2) {// Encontre al huesped
    console.log("Encontraste al huesped buscado");
} else {// No se encontro
    console.log("No se encontro al huesped buscado");
}*/