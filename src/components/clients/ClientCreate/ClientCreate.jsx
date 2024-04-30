import React, { useEffect, useState } from "react";
import { springBootAxios } from "../../../api/axios";
import "./ClientCreate.css";
import { handleErrorResponse, handleSuccessResponse } from "../utils/handleResponse";
import { useNavigate } from "react-router-dom";
const formData = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: ""
};
const NuevoCLiente = () => {
    const navigate = useNavigate();
    const [cliente, setClientes] = useState(formData);
    const datosFormulario = ({ target: { name, value } }) => {
        setClientes({ ...cliente, [name]: value });
    };
    const enviarFormulario = async (e) => {
        e.preventDefault();
        try {
            const { data, status } = await springBootAxios.post("/clients", cliente);
            handleSuccessResponse(data, status);
            navigate("/clientes");
        } catch (err) {
            handleErrorResponse(err);
        }
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
                        <label htmlFor="company">Email*</label>
                        <input type="text" placeholder="Email" name="email" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Teléfono*</label>
                        <input type="text" placeholder="Teléfono" name="phone" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Dirección*</label>
                        <input type="text" placeholder="Dirección" name="address" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Ciudad*</label>
                        <input type="text" placeholder="Ciudad" name="city" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">País*</label>
                        <input type="text" placeholder="Teléfono" name="country" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Codigo Postal*</label>
                        <input type="text" placeholder="Código Postal" name="postalCode" onChange={datosFormulario} />
                    </div>
                    <div className="campo campos-submit">
                        <input type="submit" className="buttonSubmit" value="Crear cliente" />
                        <input type="submit" className="cancelSubmit" value="Volver" onClick={() => navigate("/clientes")} />
                    </div>
                </form>
            </div>

        </>

    );
};

export default NuevoCLiente;
