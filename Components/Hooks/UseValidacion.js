import React, { useEffect, useState } from 'react'



const UseValidacion = (stateInicial, validar, fn) => {

    const [valores, guardarValores] = useState(stateInicial);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;
            if (noErrores) {
                fn(); // Fn = función que se ejecuta en el componente
            }
            guardarSubmitForm(false);
        }
    }, [errores]);

    // Función que se ejecuta cuando el usuario escribe algo
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    // Función que se ejecuta cuando el usuario presiona el boton submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }

    // Cuando el evento se lleva a cabo (mientras el usuario escribe)
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }


    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    }
}

export default UseValidacion
