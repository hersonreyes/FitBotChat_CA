import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoginRegister from '../pages/LoginRegister';

//Rutas de autenticación de la aplicación
const AuthRouter = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginRegister />} />
        <Route
            path="*"
            element={<Navigate to="/auth/login" replace />}
        />
    </Routes>
  )
}

export default AuthRouter