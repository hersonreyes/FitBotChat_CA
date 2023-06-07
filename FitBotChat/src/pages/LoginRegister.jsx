import React, { useContext, useState } from 'react';
import stats from '../assets/stats.svg';
import tracker from '../assets/tracker.svg';
import '../styles/LoginRegister.css';

import Swal from 'sweetalert2';

import { AuthContext } from '../auth/AuthContext';

const LoginRegister = () => {

    const { login, register } = useContext( AuthContext );

    const [signUpMode, setSignUpMode] = useState(false);

    const toggleSignUpMode = () => {
        setSignUpMode(!signUpMode);
    };
    
    //login
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onChange = ({ target }) => {
        const { name, value } = target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        
        const { email, password } = form;
        const ok = await login(email, password);
        
        if(!ok){
            Swal.fire('Error', 'Please check user and password', 'error');
        }
    }

    const allOk = () => {
        return ( form.email.length > 0 && form.password.length > 0 ) ? true : false;
    }

    //register
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onChangeRegister = ({ target }) => {
        const { name, value } = target;
        setRegisterForm({
            ...registerForm,
            [name]: value
        });
    };

    const onSubmitRegister = async(e) => {
        e.preventDefault();
        
        const { name, email, password } = registerForm;
        const msg = await register(name, email, password);
        
        if(msg !== true){
            Swal.fire('Error', msg, 'error');
        }
    }

    const allOkRegister = () => {
        return ( registerForm.name.length > 0 && registerForm.email.length > 0 && registerForm.password.length > 0 ) ? true : false;
    }

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