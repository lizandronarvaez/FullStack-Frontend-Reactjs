/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { clienteAxios } from "../../api/axios";

const formValues = {
    fullname: "",
    email: "",
    password: "",
    passwordRepeat: ""
};
const Register = () => {
    const navigate = useNavigate();
    const [dataForm, setDataForm] = useState(formValues);
    const { fullname, email, password, passwordRepeat } = dataForm;
    const registerData = ({ target }) => { setDataForm({ ...dataForm, [target.name]: target.value }); };
    const onSubmitRegister = async (e) => {
        e.preventDefault();
        const inputsValues = Object.values(dataForm);
        for (const input of inputsValues) {
            if (input.length < 1) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No se permite campos vacíos",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }
        }
        if (password !== passwordRepeat) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Las contraseñas no son iguales",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        const dataCleanForm = {
            fullname: fullname.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            password
        };

        try {
            const { data } = await clienteAxios.post("/auth/register", dataCleanForm);
            Swal.fire({
                position: "center",
                icon: "success",
                title: data?.message,
                showConfirmButton: false,
                timer: 1500
            });
            setDataForm({
                fullname: "",
                email: "",
                password: "",
                passwordRepeat: ""
            });
            navigate("/login");
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: error.response.data.message || "Hubo un error en el registro",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className='register'>
            <div className="register-image"></div>
            <div className="registro-formulario">
                <form className="form-register" onSubmit={onSubmitRegister}>
                    <h2>Registrar cuenta</h2>
                    <div className='campo'>
                        <label htmlFor="fullname">Nombre</label>
                        <input type="text" name="fullname" autoComplete='on' value={fullname}
                            onChange={registerData}
                            placeholder="Introduce tu nombre completo"
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" autoComplete='on' value={email}
                            onChange={registerData}
                            placeholder="Introduce tu email"
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" autoComplete="current-password"
                            value={password} onChange={registerData}
                            placeholder="Introduce una contraseña segura"
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="passwordRepeat">Repetir Password</label>
                        <input type="password" name="passwordRepeat" autoComplete="current-password" value={passwordRepeat}
                            onChange={registerData}
                            placeholder="Vuelve a introducir tu contraseña por seguridad"
                        />
                    </div>
                    <div className="campo">
                        <input type="submit" value="Registrar" className='btn' />
                    </div>
                    <div className="campo-login">
                        <p>¿Ya tienes cuenta? <Link to={"/login"}>Ir a login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
