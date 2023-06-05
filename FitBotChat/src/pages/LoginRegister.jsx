import React, { useState } from 'react';
import stats from '../assets/stats.svg';
import tracker from '../assets/tracker.svg';
import '../styles/LoginRegister.css';

const LoginRegister = () => {

    const [signUpMode, setSignUpMode] = useState(false);

    const toggleSignUpMode = () => {
        setSignUpMode(!signUpMode);
    };
    
    return (
    <div className={`containerl ${(signUpMode && 'sign-up-mode')}`}>
        <div className="forms-container">
            <div className="signin-signup">
                <form action="" className="sign-in-form">
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Username"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="text" placeholder="Password"/>
                    </div>
                    <input type="submit" value="Login" className="btnl solid"/>


                </form>

                <form action="" className="sign-up-form">
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Username"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input type="text" placeholder="Email"/>
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="text" placeholder="Password"/>
                    </div>
                    <input type="submit" value="Sign up" className="btnl solid"/>
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