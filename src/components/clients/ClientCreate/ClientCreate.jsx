import React, { useEffect, useState } from "react";
import { clienteAxios } from "../../../api/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useNavigate } from "react-router-dom";
import "./ClientCreate.css";
const dataFormClient = {
    fullname: "",
    company: "",
    email: "",
    phone: ""
};
const NuevoCLiente = () => {
    const navigate = useNavigate();
    const [cliente, setClientes] = useState(dataFormClient);
    const datosFormulario = ({ target }) => { setClientes({ ...cliente, [target.name]: target.value }); };
    const enviarFormulario = async (e) => {
        e.preventDefault();
        const { data, status } = await clienteAxios.post("/clients", cliente);
        if (status !== 201) {
            Swal.fire({
                title: "El cliente ya esta esta registrado o existe",
                text: "Hubo un conflicto de datos",
                icon: "error"
            });
            return;
        }
        Swal.fire(
            data.mensaje,
            "",
            "success"
        );
        navigate("/clientes");
    };

    // funcion para validar el formulario
    const validarFormulario = () => {
        const { fullname, company, email, phone } = cliente;
        // Revisar que las propiedades no esten vacias
        const validar = !fullname.length || !company.length || !email.length || !phone.length;
        return validar;
    };
    useEffect(() => {
    }, [cliente]);
    return (
        <>
            <div className="create-client">
                <h2>Crear Nuevo Cliente</h2>
                <form onSubmit={enviarFormulario}>
                    <legend>Llena todos los campos</legend>
                    <div className="campo">
                        <label>Nombre</label>
                        <input type="text" placeholder="Nombre Cliente" name="fullname" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label>Empresa</label>
                        <input type="text" placeholder="Empresa Cliente" name="company" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label>Email</label>
                        <input type="email" placeholder="Email Cliente" name="email" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label>Teléfono</label>
                        <input type="text" placeholder="Teléfono Cliente" name="phone" onChange={datosFormulario} />
                    </div>
                    <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Cliente" onChange={enviarFormulario} disabled={validarFormulario()} />
                    </div>
                </form>
            </div>

        </>

    );
};

export default NuevoCLiente;
