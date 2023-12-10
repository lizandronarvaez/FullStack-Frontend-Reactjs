import React, { useContext, useState } from "react";
import clienteAxios from "../../../config/axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2/dist/sweetalert2.all";
import "./Login.css";
// hookContent
import { HOOKContext } from "../../../hooks/authContext";
import { Dashboard } from "../../layout";
import { Link } from "react-router-dom";

const Login = () => {
    const formData = { email: "", password: "" };
    const navigate = useNavigate();
    // useContext
    const [auth, setAuth] = useContext(HOOKContext);
    // useState
    const [credenciales, setCredenciales] = useState(formData);

    // guardar los datos del formulario en un state
    const datosFormulario = ({ target }) => setCredenciales({ ...credenciales, [target.name]: target.value });

    // Crear el submit para enviar los datos
    const enviarFormulario = async (e) => {
        e.preventDefault();
        if (Object.keys(credenciales).length === 0) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Campos vacios",
                text: "Los campos son obligatorios",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        try {
            const result = await clienteAxios.post("/users/iniciar-sesion", credenciales);
            // Extraer token y gurdarlo en el localStorage
            const { token, usuario } = result.data;
            localStorage.setItem("usuario", usuario.nombre);
            localStorage.setItem("token", token);
            // Si el resultado es correcto no redirige al dasboard
            if (result.status === 200) {
                setAuth({ token, authentication: true });
                // redirigir a la ruta
                navigate("/users");
                // muestra un mensaje
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Correcto",
                    text: "Acceso correcto",
                    showConfirmButton: false,
                    timer: 2000
                });
                return;
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message,
                    text: "Hubo un error"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Hubo un error"
                });
            }
        }
    };

    return (
        auth.token
            ? < Dashboard />
            : <div className='login'>
                <div className="login-image"></div>
                <div className="login-formulario">
                    <form onSubmit={enviarFormulario}>
                        <h2>Bienvenido</h2>
                        <div className='campo'>
                            <label htmlFor="email" >Email:</label>
                            <input
                                type="email"
                                name="email"
                                onChange={datosFormulario}
                                autoComplete='on'
                            />
                        </div>
                        <div className='campo'>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                onChange={datosFormulario}
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="campo">
                            <input
                                type="submit"
                                value="Login"
                                className='btn'
                            />
                        </div>
                        <div className="campo-register">
                            <p>¿No tienes cuenta?
                                <Link to={"/register"}>
                                    Crear cuenta
                                </Link>
                            </p>
                        </div>
                        <div className="campo-reset">
                            <p>¿Olvidaste la contraseña?
                                <Link to={"/password-reset"}>
                                    Reestablecer contraseña
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default Login;
