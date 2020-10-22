import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
// import Router from 'react-router-dom';
import { useRouter } from 'next/router';
import DetallesProducto from '../Components/Layout/DetallesProducto';
import UseProductos from '../Components/Hooks/UseProductos';



const Buscar = () => {


    const router = useRouter();

    const q = (router.query.q);

    if (typeof q === 'undefined') {
        console.log(']Variable indefinida..')
    }


    // Todos los productos

    const { productos } = UseProductos('creado');

    const [resultado, guardarResultado] = useState([]);

    useEffect(() => {

        let busqueda = q.toLowerCase();
        console.log(busqueda, 'esta es la bussqueda')
        let rows = productos.length;

        const filtered = productos.filter(prod => prod.descripcion.toLowerCase().includes(busqueda) ||
            prod.nombre.toLowerCase().includes(busqueda));
        guardarResultado(filtered)

    }, [q, productos]);







    return (
        <Layout>
            <div className="listado-productos">
                <div className="contenedor">
                    <ul className="bg-white">
                        {resultado.map(producto => (
                            <DetallesProducto
                                key={producto.id}
                                producto={producto}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout >
    )
}

export default Buscar;
