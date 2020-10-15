export default function ValidarCrearProducto(valores) {
    let errores = {};

    // Validar el nombre del usuario
    if (!valores.nombre) {
        errores.nombre = 'El Nombre es Obligatorio';
    }

    // Validar la empresa
    if (!valores.empresa) {
        errores.empresa = 'El Nombre de la Empresa es Obligatorio'
    }

    // Validar la url
    if (!valores.url) {
        errores.url = 'La Url del Producto es Obligatoria'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = 'URL no válida'
    }

    // Validar descrición
    if (!valores.descripcion) {
        errores.descripcion = 'Agrega una Descripción de tu Producto'
    }



    return errores;
}