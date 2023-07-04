import React, { useContext, useEffect, useState } from 'react';
import stats from '../assets/stats.svg';
import tracker from '../assets/tracker.svg';
import '../styles/LoginRegister.css';

import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

//Página de login y registro
const LoginRegister = () => {

    //Obtenemos la función para navegar entre páginas
    let navigate = useNavigate();
    //Obtenemos el token del usuario
    const token = localStorage.getItem('token');

    //Si hay token, redirige a la página de home
    useEffect(() => {

        if(token){
            return navigate("/");
        }
    }, [token]);

    //Obtenemos las funciones de login y registro
    const { login, register } = useContext( AuthContext );
    //Obtenemos el estado del chat
    const [signUpMode, setSignUpMode] = useState(false);
    //Función para cambiar entre login y registro
    const toggleSignUpMode = () => {
        setSignUpMode(!signUpMode);
    };
    
    //Estado del login
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    //Función para cambiar el estado del login
    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    };

    //Función para hacer login
    const onSubmit = async(e) => {
        e.preventDefault();
        //Obtenemos el email y la contraseña
        const { email, password } = form;
        //Llamamos a la función de login y esperamos a que termine de ejecutarse para continuar
        const ok = await login(email, password);
        
        if(!ok){
            Swal.fire('Error', 'Please check user and password', 'error');
        }
    }

    //Función para comprobar que los campos no están vacíos
    const allOk = () => {
        return ( form.email.length > 0 && form.password.length > 0 ) ? true : false;
    }

    //Estado del registro
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    //Función para cambiar el estado del registro
    const onChangeRegister = ({ target }) => {
        const { name, value } = target;
        setRegisterForm({
            ...registerForm,
            [name]: value
        });
    };
    //Función para hacer el registro
    const onSubmitRegister = async(e) => {
        e.preventDefault();
        //Obtenemos el nombre, email y contraseña
        const { name, email, password } = registerForm;
        //Llamamos a la función de registro y esperamos a que termine de ejecutarse para continuar
        const msg = await register(name, email, password);
        
        if(msg !== true){
            Swal.fire('Error', msg, 'error');
        }
    }

    //Función para comprobar que los campos no están vacíos
    const allOkRegister = () => {
        return ( registerForm.name.length > 0 && registerForm.email.length > 0 && registerForm.password.length > 0 ) ? true : false;
    }

    //Renderizamos la página
    return (
    <div className={`containerl ${(signUpMode && 'sign-up-mode')}`}>
        <div className="forms-container">
            <div className="signin-signup">
                <form 
                    onSubmit={ onSubmit } 
                    className="sign-in-form"
                >
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fa fa-user"></i>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            value={ form.email }
                            onChange={ onChange }
                        />
                    </div>
                    <div className="input-field">
                        <i className="fa fa-lock"></i>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={ form.password }
                            onChange={ onChange }
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Login" 
                        className="btnl solid"
                        disabled={ !allOk() }
                    />

                </form>

                <form 
                    onSubmit={ onSubmitRegister }
                    className="sign-up-form"
                >
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <i className="fa fa-user"></i>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Username"
                            value={ registerForm.name }
                            onChange={ onChangeRegister }
                        />
                    </div>
                    <div className="input-field">
                        <i className="fa fa-envelope"></i>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email"
                            value={ registerForm.email }
                            onChange={ onChangeRegister }
                        />
                    </div>
                    <div className="input-field">
                        <i className="fa fa-lock"></i>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={ registerForm.password }
                            onChange={ onChangeRegister }
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Sign up" 
                        className="btnl solid"
                        disabled={ !allOkRegister() }
                    />
                </form>
            </div>
        </div>
        <div className="panels-container">
            <div className="panel left-panel">
                <div className="content">
                    <h3>Don't you have an account yet?</h3>
                    <button onClick={toggleSignUpMode} className="btnl transparent" id="sign-up-btn">Sign up</button>
                </div>

                <img src={tracker} className="image" alt="tracker"/>
            </div>

            <div className="panel right-panel">
                <div className="content">
                    <h3>Already have an account yet?</h3>
                    <button onClick={toggleSignUpMode} className="btnl transparent" id="sign-in-btn">Sign in</button>
                </div>

                <img src={stats} className="image" alt="tracker"/>
            </div>
        </div>
    </div>
  )
}

export default LoginRegister