import React, { useContext, useState } from "react";
import { springBootAxios } from "../../api/axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2/dist/sweetalert2.all";
import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const form = {
    email: "",
    password: ""
};

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(form);
    const onInputChangeValues = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });

    const onSubmitForm = async (e) => {
        formData.email = formData.email.trim().toLowerCase();
        e.preventDefault();
        if (!formData.email.length || !formData.password.length) {
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
            const { data } = await springBootAxios.post("/auth/login", formData);
            const { token, message, userEntity: { fullname } } = data;

            localStorage.setItem("usuario", fullname);
            localStorage.setItem("token", token);
            loginUser(localStorage.getItem("token"));

            Swal.fire({
                position: "center",
                icon: "success",
                title: message,
                text: "Acceso correcto",
                showConfirmButton: false,
                timer: 2000
            }).then(() => navigate("/dashboard", { replace: true }));
        } catch (error) {
            const errorMesssage = error?.response?.data || "Hubo un error";
            if (error.response) {
                Swal.fire({ icon: "error", title: "Hubo un error", text: errorMesssage });
            }
        }
    };
    return (
        <div className='login'>
            <div className="login-image"></div>
            <div className="login-formulario">
                <form className="form_login" onSubmit={onSubmitForm}>
                    <h2>Bienvenido</h2>
                    <div className='campo'>
                        <label htmlFor="email" >Email</label>
                        <input type="email" name="email" onChange={onInputChangeValues} autoComplete='on' placeholder="Introduce tu email" />
                    </div>
                    <div className='campo'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={onInputChangeValues} autoComplete="current-password" placeholder="Introduce tu password" />
                    </div>
                    <div className="campo">
                        <input type="submit" value="Login" className='btn' />
                    </div>
                    <div className="campo-register">
                        <p><Link to={"/register"}>¿No tienes cuenta?</Link></p>
                    </div>
                    {/* <div className="campo-reset">
                        <p><Link to={"/password-reset"}>¿Olvidaste la contraseña?</Link></p>
                    </div> */}
                </form>
            </div>
        </div>
    );
};

export default Login;
