import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { clienteAxios } from "../../../api/axios";
import ClientItem from "../ClientItem/ClientItem";
// import Spinner from "../layout/Spinner/Spinner";
import Swal from "sweetalert2/dist/sweetalert2.all";
import "./ClientsAll.css";
const Clientes = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [buscarCliente, setBuscarCliente] = useState("");

    const consultaClientes = async () => {
        const clientes = await clienteAxios.get("/clients");
        const { data } = clientes;
        setClientes(data);
    };

    const handleBusquedaCliente = (e) => {
        e.preventDefault();
        const result = e.target.value;
        setBuscarCliente(result);
    };

    // Utilizamos ussefect para que actualize los cambios
    useEffect(() => {
        consultaClientes();
    }, [clientes]);

    return (
        <>
            <div className="clientsAll">
                <div className="header">
                    <h2>Clientes</h2>
                    <Link to={"/clientes/nuevo-cliente"}> Nuevo Cliente </Link>
                </div>
                <form className="form_search_client" onSubmit={buscarCliente}>
                    <div className="busqueda-cliente">
                        <label htmlFor="busca-cliente">Buscar un cliente</label>
                        <input type="text" placeholder="Introduce nombre, email o empresa" name="buscar-cliente" value={buscarCliente}/>
                    </div>
                    <div className="table-clients">
                        <table className='listado-clientes'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Empresa</th>
                                    <th>Telefono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            {clientes.map(cliente => (
                                < ClientItem key={cliente._id} cliente={cliente} />
                            ))}
                        </table>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Clientes;
