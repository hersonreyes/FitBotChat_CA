import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Routes,
    Route
} from 'react-router-dom';
import Home from '../pages/Home';
import AuthRouter from './AuthRouter';
import { AuthContext } from '../auth/AuthContext';

//Rutas de la aplicación
const AppRouter = () => {

  //Obtenemos el estado de la autenticación
  const { auth, verifyToken } = useContext(AuthContext);

  //Verificamos el token del usuario
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  //Si está verificando el token, muestra un mensaje
  if(auth.checking){
    return <h1>Wait please...</h1>
  }

  //Si no está verificando el token, muestra las rutas
  return (
    <Router>
        <Routes>
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="/" element={<Home />} />
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    </Router>
  )
}

export default AppRouter