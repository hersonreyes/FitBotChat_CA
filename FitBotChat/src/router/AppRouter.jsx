import React from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Routes,
    Route
} from 'react-router-dom';
import Home from '../pages/Home';
import AuthRouter from './AuthRouter';

const AppRouter = () => {
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