import React, { useContext, useState } from "react";
import { clienteAxios } from "../../api/axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2/dist/sweetalert2.all";
import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [credenciales, setCredenciales] = useState({ email: "", password: "" });
    const datosFormulario = ({ target: { name, value } }) => setCredenciales({ ...credenciales, [name]: value });
    const enviarFormulario = async (e) => {
        e.preventDefault();
        if (!credenciales.email.length || !credenciales.password.length) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Completa los campos",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        try {
            const { data } = await clienteAxios.post("/auth/login", credenciales);
            const { token, fullname } = data.user;
            localStorage.setItem("usuario", fullname);
            localStorage.setItem("token", token);
            loginUser(localStorage.getItem("token"));
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Login Correcto",
                text: "Acceso correcto",
                showConfirmButton: false,
                timer: 2000
            }).then(() => navigate("/dashboard", { replace: true }));
        } catch (error) {
            const errorMesssage = error?.response?.data?.message || "Hubo un error";
            if (error.response) {
                Swal.fire({
                    icon: "error",
                    title: errorMesssage,
                    text: "Hubo un error"
                });
            }
        }
    };
    return (
        <div className='login'>
            <div className="login-image"></div>
            <div className="login-formulario">
                <form className="form_login" onSubmit={enviarFormulario}>
                    <h2>Bienvenido</h2>
                    <div className='campo'>
                        <label htmlFor="email" >Email</label>
                        <input type="email" name="email" onChange={datosFormulario} autoComplete='on' placeholder="Introduce tu email" />
                    </div>
                    <div className='campo'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={datosFormulario} autoComplete="current-password" placeholder="Introduce tu password" />
                    </div>
                    <div className="campo">
                        <input type="submit" value="Login" className='btn' />
                    </div>
                    <div className="campo-register">
                        <p><Link to={"/register"}>¿No tienes cuenta?</Link></p>
                    </div>
                    <div className="campo-reset">
                        <p><Link to={"/password-reset"}>¿Olvidaste la contraseña?</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
