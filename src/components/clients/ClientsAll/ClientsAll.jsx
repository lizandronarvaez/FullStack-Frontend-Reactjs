import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clienteAxios } from "../../../api/axios";
import ClientItem from "../ClientItem/ClientItem";
import "./ClientsAll.css";
const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [buscarCliente, setBuscarCliente] = useState("");
    const [clientsFilter, setClientsFilter] = useState([]);
    const [searchClient, setSearchCliente] = useState(false);
    const consultaClientes = async () => {
        const { data } = await clienteAxios.get("/clients");
        setClientes(data);
    };

    const handleBusquedaCliente = (e) => {
        e.preventDefault();
        const result = e.target.value;
        setBuscarCliente(result);
        setSearchCliente(true);
        filterClient(result);
    };

    const filterClient = (word) => {
        const filteredClients = clientes.filter((client) => {
            const { fullname, company, email } = client;
            const searchValue = word.toLowerCase().trim();
            return (
                fullname.toLowerCase().includes(searchValue) ||
                company.toLowerCase().includes(searchValue) ||
                email.toLowerCase().includes(searchValue)
            );
        });
        setClientsFilter(filteredClients);
    };
    useEffect(() => { consultaClientes(); }, [clientes]);
    return (
        <>
            <div className="clientsAll">
                <div className="header">
                    <h2>Clientes</h2>
                    <Link to={"/clientes/nuevo-cliente"}> Nuevo Cliente </Link>
                </div>
                <form className="form_search_client" onSubmit={handleBusquedaCliente}>
                    <div className="busqueda-cliente">
                        <label htmlFor="busca-cliente">Buscar un cliente</label>
                        <input type="text" placeholder="Introduce nombre, email o empresa" name="word"
                            value={buscarCliente}
                            onChange={handleBusquedaCliente} />
                        {searchClient && clientsFilter.length === 0 && <span className="client-notFound">No existe ningún cliente</span>}
                    </div>
                    <div className="table-clients">
                        <table className='list-clients'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Empresa</th>
                                    <th>Telefono</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            {!clientsFilter.length
                                ? clientes.map((cliente) => (
                                    <ClientItem key={cliente._id} cliente={cliente} />
                                ))
                                : clientsFilter.map((cliente) => (
                                    <ClientItem key={cliente._id} cliente={cliente} />
                                ))}
                        </table>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Clientes;
