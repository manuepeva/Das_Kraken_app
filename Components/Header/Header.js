import React, { useContext } from 'react'
import Buscar from '../UserInterface/Buscar'
import Navegacion from '../UserInterface/Navegacion'
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Boton from '../UserInterface/Boton';

// Firebase Context Hook
import FirebaseContext from '../../Firebase/context';

// Cabecera y nav bar 
const ContenedorHeader = styled.div`
    max-width: 1200px;
    width:95%;
    margin: 0 auto;
    @media(min-width: 768px){
        display: flex; 
        justify-content: space-between;
    }
`

// Logotipo dentro de un <p>
const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
    cursor: pointer;
`


function Header() {

    const { usuario, firebase } = useContext(FirebaseContext);

    return (
        <header css={css`
            border-bottom: 2px solid var(--gris3);
            padding: 1rem 0;
        `}>
            <ContenedorHeader>
                <div
                    css={css`
                    display:flex;
                    align-items: center;
                    `}
                >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Buscar />

                    <Navegacion />
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    {usuario ? (
                        <>
                            <p
                                css={css`
                            margin-right: 2rem;
                        `}
                            >Hola: {usuario.displayName}</p>

                            <Boton
                                bgColor='true'
                                type="button"
                                onClick={() => firebase.cerrarSesion()}
                            >Cerrar Sesión</Boton>
                        </>

                    ) : (
                            <>
                                <Link href="/login">
                                    <Boton
                                        bgColor='true'
                                    >Login</Boton>
                                </Link>
                                <Link href="/crear-cuenta">
                                    <Boton>Crear Cuenta</Boton>
                                </Link>
                            </>
                        )}

                </div>
            </ContenedorHeader>
        </header>
    )
}

export default Header
