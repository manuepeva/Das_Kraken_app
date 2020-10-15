import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router';
import Layout from '../../Components/Layout/Layout';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale'
import { Campo, InputSubmit } from '../../Components/UserInterface/Styles/Formulario';
import Boton from '../../Components/UserInterface/Boton';

// Importar la base de datos Firebase
import { FirebaseContext } from '../../Firebase';

import Error404 from '../../Components/Layout/Error404';


const ContenedorProducto = styled.div`
    @media (min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;

    }
`;

const CreadorProducto = styled.p`
    padding: 1.5rem 2rem;
    background-color: #da552f;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`


const Producto = () => {

    // State del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({});

    // Routing para obtener el id actual
    const router = useRouter();
    const { query: { id } } = router;

    // Context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    guardarProducto(producto.data());
                } else {
                    guardarError(true);
                }
            }
            obtenerProducto();
        }
    }, [id, producto]);

    if (Object.keys(producto).length === 0) return 'Cargando..';


    const { comentarios, creado,
        descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado } = producto;

    // Administrar y validar los votos
    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login')
        }
        // Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

        // Verificar si el usuario actual ha votado
        if (haVotado.includes(usuario.uid)) {
            return;
        }

        // Guardar el id del usuario que ya votó
        const hanVotado = [...haVotado, usuario.uid]

        // Actualizar la Base de datos
        firebase.db.collection('productos').doc(id).update(
            { votos: nuevoTotal, haVotado: hanVotado });

        // Actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })
    }

    // Funciones para crear comentarios
    const comentarioOnChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value,
        })
    }

    // Identifica si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id === id) {
            return true;
        }
    }

    const agregarComentario = e => {
        e.preventDefault();

        if (!usuario) {
            return router.push('/login')
        }

        // Información extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar una copia del comentario y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // Actualizsar la DB 
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        // Actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })

    }

    return (
        <Layout>
            <>
                {error && <Error404 />}

                <div className="contenedor">
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >{nombre}</h1>
                    <ContenedorProducto>
                        <div>
                            <p>Publicado hace:  {formatDistanceToNow(new Date(creado), { locale: es })}
                            </p>
                            <p>Publicado por: {creador.nombre} de: {empresa} </p>
                            <img src={urlimagen} />
                            <p>{descripcion}</p>

                            {usuario && (
                                <>
                                    <h2>Agrega Tu Comentario</h2>
                                    <form
                                        onSubmit={agregarComentario}
                                    >
                                        <Campo>
                                            <input
                                                type="text"
                                                name="mensaje"
                                                onChange={comentarioOnChange}
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                                </>
                            )}

                            <h2
                                css={css`
                                    margin: 2rem 0
                                `}
                            >Comentarios</h2>


                            {comentarios.length === 0 ? 'Aún no hay comentarios' : (
                                <ul>
                                    {comentarios.map((comentario, i) => (

                                        <li
                                            key={`${comentario.usuarioId}-${i}`}
                                            css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 2rem;
                                            `}
                                        >
                                            <p>{comentario.mensaje}</p>
                                            <p>Escrito por:
                                                <span
                                                    css={css`
                                                        font-weight: bold;
                                                    `}
                                                >
                                                    {''} {comentario.usuarioNombre}
                                                </span>
                                            </p>
                                            {esCreador(comentario.usuarioId) &&
                                                <CreadorProducto>Es Creador</CreadorProducto>}
                                        </li>
                                    ))}
                                </ul>

                            )}

                        </div>

                        <aside>
                            <Boton
                                target="_blank"
                                bgColor="true"
                                href={url}
                            >
                                Visitar URL
                            </Boton>


                            <div
                                css={css`
                                    margin-top: 5rem;
                                `}
                            ></div>


                            <p
                                css={css`
                                    text-align: center;
                                `}
                            >{votos} Votos</p>

                            {usuario && (
                                <Boton
                                    onClick={votarProducto}
                                >
                                    Votar
                                </Boton>
                            )}
                        </aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    )
}

export default Producto;

