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
const createClient = () => {
    const navigate = useNavigate();
    const [client, setClient] = useState(formData);
    const onChangeInputForm = ({ target: { name, value } }) => setClient({ ...client, [name]: value });

    const submitFormCreateClient = async (e) => {
        e.preventDefault();
        try {
            const { data, status } = await springBootAxios.post("/clients", client);
            handleSuccessResponse(data, status);
            navigate("/clientes");
        } catch (err) {
            handleErrorResponse(err);
        }
    };

    useEffect(() => { }, [client]);
    return (
        <>
            <div className="create-client">
                <h2>Crear Nuevo Cliente</h2>

                <form className="form_create_client" onSubmit={submitFormCreateClient}>
                    <legend>Campos obligatorios*</legend>
                    <div className="campo">
                        <label htmlFor="fullname">Nombre*</label>
                        <input type="text" placeholder="Nombre" name="fullname" onChange={onChangeInputForm} />
                    </div>
                    <div className="campo">
                        <label htmlFor="company">Email*</label>
                        <input type="text" placeholder="Email" name="email" onChange={onChangeInputForm} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Teléfono*</label>
                        <input type="text" placeholder="Teléfono" name="phone" onChange={onChangeInputForm} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Dirección*</label>
                        <input type="text" placeholder="Dirección" name="address" onChange={onChangeInputForm} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Ciudad*</label>
                        <input type="text" placeholder="Ciudad" name="city" onChange={onChangeInputForm} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">País*</label>
                        <input type="text" placeholder="Teléfono" name="country" onChange={onChangeInputForm} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Codigo Postal*</label>
                        <input type="text" placeholder="Código Postal" name="postalCode" onChange={onChangeInputForm} />
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

export default createClient;
