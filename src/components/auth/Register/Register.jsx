/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import "./Register.css";
const Register = () => {
    return (
        <div className='register'>
            <div className="register-image"></div>
            <div>
                <form>
                    <h2>Registrar cuenta</h2>
                    <div className='campo'>
                        <label htmlFor="email">Usuario:</label>
                        <input
                            type="text"
                            name="usuario"
                            autoComplete='on'
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            autoComplete='on'
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="password">Repetir Password:</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="campo">
                        <input
                            type="submit"
                            value="Registrar"
                            className='btn'
                        />
                    </div>
                    <div className="campo-login">
                        <p>¿Ya tienes cuenta?
                            <Link to={"/login"}>
                                Ir a login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
