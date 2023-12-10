import React, { useContext, useEffect } from "react";
import { HOOKContext } from "../../../hooks/authContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(HOOKContext);
    const usuario = localStorage.getItem("usuario");
    const logout = () => {
        Swal.fire({
            title: "Cerrar sesion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, cerrar sesion"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    {
                        position: "center",
                        icon: "success",
                        title: "Sesion cerrada correctamente",
                        showConfirmButton: false,
                        timer: 2000
                    }
                );
                // cambiar auth a false y eliminar el token
                setAuth({
                    token: "",
                    authentication: false
                });
                // Removemos el token del local storage
                localStorage.removeItem("token");
                localStorage.removeItem("usuario");
                // Redireccionamos a iniciar sesion
                navigate("/");
            }
        });
    };
    useEffect(() => {

    }, [auth]);

    return (
        <header className='barra'>
            <div className="contenedor contenido-barra">
                <Link to={"/users"}>
                    <h1>Sistema de Gestión</h1>
                </Link>
                {auth.authentication !== true
                    ? null
                    : <>
                        <p
                            className="usuario-autenticado"
                        >
                            Bienvenido
                            <span className="user">
                                {usuario}
                            </span>
                            <button
                                type="button"
                                className="btn btn-rojo"
                                onClick={logout}
                            >
                                <img src={logout} alt="icon logout" />
                                Logout
                            </button>
                        </p>
                    </>
                }
            </div>
        </header>
    );
};

export default Header;
