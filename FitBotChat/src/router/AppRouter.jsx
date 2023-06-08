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

const AppRouter = () => {

  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if(auth.checking){
    return <h1>Wait please...</h1>
  }

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