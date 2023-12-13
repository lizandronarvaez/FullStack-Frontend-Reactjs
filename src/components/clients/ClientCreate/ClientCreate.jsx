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
    const datosFormulario = ({ target: { name, value } }) => { setClientes({ ...cliente, [name]: value }); };
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
        Swal.fire(data.mensaje, "", "success");
        navigate("/clientes");
    };

    // funcion para validar el formulario
    const validarFormulario = () => {
        const { fullname, company, email, phone } = cliente;
        const validar = !fullname.length || !company.length || !email.length || !phone.length;
        return validar;
    };
    useEffect(() => { }, [cliente]);
    return (
        <>
            <div className="create-client">
                <h2>Crear Nuevo Cliente</h2>
                <form className="form_create_client" onSubmit={enviarFormulario}>
                    <legend>Campos obligatorios*</legend>
                    <div className="campo">
                        <label htmlFor="fullname">Nombre*</label>
                        <input type="text" placeholder="Nombre" name="fullname" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="company">Empresa*</label>
                        <input type="text" placeholder="Empresa" name="company" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="email">Email*</label>
                        <input type="email" placeholder="Email" name="email" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Teléfono*</label>
                        <input type="text" placeholder="Teléfono" name="phone" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <input type="submit" className="buttonSubmit" value="Crear cliente" disabled={validarFormulario()} />
                    </div>
                </form>
            </div>

        </>

    );
};

export default NuevoCLiente;
