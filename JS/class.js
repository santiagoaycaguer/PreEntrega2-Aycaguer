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


class Huesped{
    constructor(nombre, contraseña, usuario, apellidos, telefono, correo, tipoDocumento, numeroDocumento) {
        this.nombre= nombre;
        this.contraseña= contraseña;
        this.usuario= usuario;
        this.apellidos= apellidos;
        this.telefono= telefono;
        this.correo= correo;
        this.tipoDocumento= tipoDocumento;
        this.numeroDocumento= numeroDocumento;
    }
    toString() {
        return this.nombre + ", " + this.apellidos;
    }
}