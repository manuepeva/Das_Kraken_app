export default function ValidarIniciarSesion(valores) {
    let errores = {};

    // Validar el Email
    if (!valores.email) {
        errores.email = 'El Email es Obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
        errores.email = 'Email no válido'
    }

    // Validar la contraseña
    if (!valores.password) {
        errores.password = 'La Contraseña es Obligatoria'
    } else if (valores.password.length < 6) {
        errores.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    return errores;
}