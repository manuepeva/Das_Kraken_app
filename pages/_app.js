import App from 'next/app';
import firebase from '../Firebase/firebase';
import FirebaseContext from '../Firebase/context'
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
