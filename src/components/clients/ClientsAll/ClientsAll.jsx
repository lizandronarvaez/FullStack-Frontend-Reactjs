import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { springBootAxios } from "../../../api/axios";
import ClientItem from "../ClientItem/ClientItem";
import "./ClientsAll.css";
const Clientes = () => {
    const [clients, setClients] = useState([]);
    const [searchingClient, setSearchingClient] = useState("");
    const [clientsFilter, setClientsFilter] = useState([]);
    const [searchClient, setSearchClient] = useState(false);
    const getClientsDB = async () => {
        const { data } = await springBootAxios.get("/clients");
        setClients(data);
    };

    const handleFormClient = (e) => {
        e.preventDefault();
        const result = e.target.value;
        setSearchingClient(result);
        setSearchClient(true);
        filterClient(result);
    };

    const filterClient = (word) => {
        const filteredClients = clients.filter((client) => {
            const { fullname, email } = client;
            const searchValue = word.toLowerCase().trim();
            return (
                fullname.toLowerCase().includes(searchValue) ||
                email.toLowerCase().includes(searchValue)
            );
        });
        setClientsFilter(filteredClients);
    };
    useEffect(() => { getClientsDB(); }, []);
    return (
        <>
            <div className="clientsAll">
                <div className="header">
                    <h2>Clientes</h2>
                    <Link to={"/clientes/nuevo-cliente"}> Nuevo Cliente </Link>
                </div>
                <form className="form_search_client" onSubmit={handleFormClient}>
                    <div className="busqueda-cliente">
                        <label htmlFor="busca-cliente">Buscar un cliente</label>
                        <input type="text" placeholder="Introduce nombre, email" name="word"
                            value={searchingClient}
                            onChange={handleFormClient} />
                        {searchClient && clientsFilter.length === 0 && <span className="client-notFound">No existe ningún cliente</span>}
                    </div>
                    <div className="table-clients">
                        <table className='list-clients'>
                            <thead>
                                <tr>
                                    <th>Nombre Cliente</th>
                                    <th>Email</th>
                                    <th>Contacto</th>
                                    <th>Dirección</th>
                                    <th>Ciudad</th>
                                    <th>País</th>
                                    <th>Codigo Postal</th>
                                    <th>Fecha Registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            {!clientsFilter.length
                                ? clients.map((cliente) => (
                                    <ClientItem key={cliente.id} cliente={cliente} />
                                ))
                                : clientsFilter.map((cliente) => (
                                    <ClientItem key={cliente.id} cliente={cliente} />
                                ))}
                        </table>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Clientes;
