import React, { useContext, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { LogoutBtn } from "../../../../public/index";
import { AuthContext } from "../../../auth/context/authContext";
const Header = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");
    const { logoutUser } = useContext(AuthContext);

    const logoutAccount = () => {
        Swal.fire({
            title: "Cerrar sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, salir de la cuenta"
        }).then((result) => {
            if (result.isConfirmed) {
                logoutUser();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Sesion cerrada correctamente",
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => navigate("/", { replace: true }));
            }
        });
    };
    useEffect(() => {}, [token]);

    return (
        <header className='barra'>
            <div className="contenido-barra">
                <Link to={"/"}>
                    <h1>Sistema de Gestión</h1>
                </Link>
                {token
                    ? (
                        <>
                            <p className="usuario-autenticado">Bienvenido
                                <span className="user">{user}</span>
                                <button type="button" onClick={logoutAccount} >
                                    <img src={LogoutBtn} alt="icon logout" />
                                    Logout
                                </button>
                            </p>
                        </>
                    )
                    : null
                }
            </div>
        </header>
    );
};

export default Header;
