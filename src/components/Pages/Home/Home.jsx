import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
    return (

        <div className='contenedor-home'>
            <h2>
                <strong>B</strong>ienvenido
                <span>para acceder debes estar registrado</span>
            </h2>
            <Link to={"/login"} className='boton'>Ir a login</Link>
            <div className="register-account">
                <p>¿No tienes cuenta?</p>
                <Link to={"/register"} className="btn">Regístrate</Link>
            </div>
        </div>

    );
};

export default Home;
