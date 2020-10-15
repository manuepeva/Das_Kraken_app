import React, { useEffect, useState } from 'react';
import firebase from '../../Firebase';

function UseAutenticacion() {
    const [usuarioautenticado, guardarUsuarioAutenticado] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(usuario => {
            if (usuario) {
                guardarUsuarioAutenticado(usuario);
            } else {
                guardarUsuarioAutenticado(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return usuarioautenticado;
}

export default UseAutenticacion;
