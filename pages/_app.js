import App from 'next/app';
import firebase, { FirebaseContext } from '../Firebase';
import UseAutenticacion from '../Components/Hooks/UseAutenticacion';

const MyApp = (props) => {

  const usuario = UseAutenticacion();

  const { Component, pageProps } = props;

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}



export default MyApp;
