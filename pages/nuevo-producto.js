import React, { useState, useContext } from 'react'
import styles from '../styles/Home.module.css'
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Layout from '../Components/Layout/Layout';
import { Campo, Formulario, InputSubmit, Error } from '../Components/UserInterface/Styles/Formulario';

// Base de Datos firebase
import { FirebaseContext } from '../Firebase';

// Validaciones
import UseValidacion from '../Components/Hooks/UseValidacion';
import ValidarCrearProducto from '../Components/Hooks/Validacion/ValidarCrearProducto';
import { route } from 'next/dist/next-server/server/router';
import Error404 from '../Components/Layout/Error404';


const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    // imagen: '',
    url: '',
    descripcion: ''
}



const NuevoProducto = () => {


    // State de las imágenes
    const [nombreimagen, guardarNombreImagen] = useState('');
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlImagen] = useState('');

    const [error, guardarError] = useState(false);

    const {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur } = UseValidacion(STATE_INICIAL, ValidarCrearProducto, crearNuevoProducto);

    const { nombre, empresa, imagen, url, descripcion } = valores;

    // Hook de routing para redireccionar 
    const router = useRouter();

    // Context con las operaciones CRUD de firebase
    const { usuario, firebase } = useContext(FirebaseContext);


    async function crearNuevoProducto() {
        // Si el usuario no está autenticado llevar al login
        if (!usuario) {
            return router.push('/login');
        }

        // Crear el objecto de nuevo producto
        // const producto = {
        //     nombre,
        //     empresa,
        //     url,
        //     urlimagen,
        //     descripcion,
        //     votos: 0,
        //     comentarios: [],
        //     creado: Date.now()
        // }


        // Insertarlo en la base de datos
        firebase.db.collection("productos").add({
            nombre,
            empresa,
            url,
            urlimagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            },
            haVotado: []
        });

        return router.push('/');
        const test = firebase.db.collection('productos');
        console.log(test);
    }

    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }

    const handleProgress = progreso => guardarProgreso({ progreso });

    const handleUploadError = error => {
        guardarSubiendo(error);
        console.log(error);
    }

    const handleUploadSuccess = nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);
        guardarNombreImagen(nombre);
        firebase
            .storage
            .ref("productos")
            .child(nombre)
            .getDownloadURL()
            .then(url => {
                console.log(url);
                guardarUrlImagen(url);
            });
    };


    return (
        <div>
            <Layout>
                {!usuario ? <Error404 /> : (
                    <>
                        <h1
                            css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                        >Nuevo Producto</h1>
                        <Formulario
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <fieldset>
                                <legend>Información General</legend>

                                <Campo>
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        placeholder="Nombre del Nuevo Producto"
                                        name="nombre"
                                        value={nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Campo>

                                {errores.nombre && <Error>{errores.nombre}</Error>}

                                <Campo>
                                    <label htmlFor="empresa">Empresa</label>
                                    <input
                                        type="text"
                                        id="empresa"
                                        placeholder="Nombre de Tu Empresa o Companía"
                                        name="empresa"
                                        value={empresa}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Campo>

                                {errores.empresa && <Error>{errores.empresa}</Error>}


                                <Campo>
                                    <label htmlFor="imagen">Imágen</label>
                                    <FileUploader
                                        accept="image/*"
                                        id="imagen"
                                        name="imagen"
                                        randomizeFilename
                                        storageRef={firebase.storage.ref('productos')}
                                        onUploadStart={handleUploadStart}
                                        onUploadError={handleUploadError}
                                        onUploadSuccess={handleUploadSuccess}
                                        onProgress={handleProgress}
                                    />
                                </Campo>


                                <Campo>
                                    <label htmlFor="url">URL</label>
                                    <input
                                        type="url"
                                        id="url"
                                        name="url"
                                        value={url}
                                        placeholder="Url de Tu Producto"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Campo>

                                {errores.url && <Error>{errores.url}</Error>}

                            </fieldset>

                            <fieldset>
                                <legend>Sobre Tu Producto</legend>

                                <Campo>
                                    <label htmlFor="descripcion">Descripción</label>
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={descripcion}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Campo>

                                {errores.descripcion && <Error>{errores.descripcion}</Error>}
                            </fieldset>



                            {error && <Error>{error}</Error>}
                            <InputSubmit
                                type="submit"
                                value="Crear Producto"
                            />
                        </Formulario>
                    </>
                )}

            </Layout>
        </div>
    )
}

export default NuevoProducto
