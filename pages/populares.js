import React from 'react'
import Layout from '../Components/Layout/Layout';
import DetallesProducto from '../Components/Layout/DetallesProducto';
import UseProductos from '../Components/Hooks/UseProductos';

function Populares() {

    const { productos } = UseProductos('votos');

    return (
        <div>
            <Layout>
                <div className="listado-productos">
                    <div className="contenedor">
                        <ul className="bg-white">
                            {productos.map(producto => (
                                <DetallesProducto
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
export default Populares;