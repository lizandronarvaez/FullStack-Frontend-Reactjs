import React, { useContext, useEffect, useState } from "react";
import { springBootAxios } from "../../api/axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2/dist/sweetalert2.all";
import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { SpinnerLoading } from "../spinner/SpinnerLoading";

const form = {
    email: "",
    password: ""
};

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(form);
    const [loading, setLoading] = useState(false);
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);

    const onInputChangeValues = ({ target: { name, value } }) => {
        if (name === "email") value = value.trim().toLowerCase();
        setFormData({ ...formData, [name]: value });
    };

    const onkeyboardCapsLock = (e) => {
        if (e.getModifierState("CapsLock")) {
            setIsCapsLockOn(true);
            return;
        }
        setIsCapsLockOn(false);
    };
    const onSubmitForm = async (e) => {
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
        setLoading(true);
        try {
            const { data } = await springBootAxios.post("/auth/login", formData);
            const { token, message, userEntity: { fullname } } = data;
            localStorage.setItem("token", token);
            localStorage.setItem("usuario", fullname);
            loginUser(token);

            Swal.fire({
                position: "center",
                icon: "success",
                title: message,
                text: "Acceso correcto",
                showConfirmButton: false,
                timer: 2000
            }).then(() => navigate("/dashboard", { replace: true }));
            setLoading(true);
        } catch (error) {
            const errorMesssage = error?.response?.data || "Hubo un error";
            if (error.response) {
                Swal.fire({ icon: "error", title: "Hubo un error", text: errorMesssage });
            }
        }
    };

    useEffect(() => {

    }, [loading, isCapsLockOn]);
    return (
        <div className='login'>
            <div className="login-image"></div><div className="login-formulario">
                <form className="form_login" onSubmit={onSubmitForm}>
                    <h2>Bienvenido</h2>
                    <div className='campo'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={onInputChangeValues} autoComplete='on' placeholder="Introduce tu email" />
                    </div>
                    <div className='campo'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={onInputChangeValues} onKeyDown={onkeyboardCapsLock} autoComplete="current-password" placeholder="Introduce tu password" />
                        {
                            isCapsLockOn && <span className="capsLock">La tecla Mayús está activada</span>
                        }
                    </div>
                    <div className="campo">
                        {
                            loading
                                ? <SpinnerLoading />
                                : <button type="submit" className='btn'>
                                    Login
                                </button>
                        }

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
