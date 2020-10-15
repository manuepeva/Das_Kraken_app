import React, { useEffect, useState, useContext } from 'react'
import styles from '../styles/Home.module.css'
import styled from '@emotion/styled';
import Layout from '../Components/Layout/Layout';
import { FirebaseContext } from '../Firebase';
import DetallesProducto from '../Components/Layout/DetallesProducto';


export default function Home() {

  const [productos, guardarProductos] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
    }
    obtenerProductos();
  }, []);

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    guardarProductos(productos);
  }


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
