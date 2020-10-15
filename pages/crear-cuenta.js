import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Router from 'next/router';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import Layout from '../Components/Layout/Layout';
import { Campo, Formulario, InputSubmit, Error } from '../Components/UserInterface/Styles/Formulario';

// Base de Datos firebase
import firebase from '../Firebase';

// Validaciones
import UseValidacion from '../Components/Hooks/UseValidacion';
import ValidarCrearCuenta from '../Components/Hooks/Validacion/ValidarCrearCuenta';


const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}


export default function CrearCuenta() {

    const [error, guardarError] = useState(false);

    const {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur } = UseValidacion(STATE_INICIAL, ValidarCrearCuenta, crearNuevaCuenta);

    const { nombre, email, password } = valores;

    async function crearNuevaCuenta() {
        try {
            await firebase.registrar(nombre, email, password);
            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al crear un Usuario', error);
            guardarError(error.message);
        }
    }



    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Crear Cuenta</h1>
                    <Formulario
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <Campo>
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                placeholder="Tu Nombre"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.nombre && <Error>{errores.nombre}</Error>}

                        <Campo>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Tu Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        {errores.email && <Error>{errores.email}</Error>}
                        <Campo>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Tu Contraseña"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        {errores.password && <Error>{errores.password}</Error>}

                        {error && <Error>{error}</Error>}
                        <InputSubmit
                            type="submit"
                            value="Crear Cuenta"
                        />
                    </Formulario>
                </>
            </Layout>
        </div>
    )
}

