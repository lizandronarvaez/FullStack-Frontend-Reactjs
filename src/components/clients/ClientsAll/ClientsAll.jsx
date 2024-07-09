import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { springBootAxios } from "../../../api/axios";
import ClientItem from "../ClientItem/ClientItem";
import "./ClientsAll.css";
import { Spinner } from "../../Pages";
const ClientsAll = () => {
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
                    {
                        !clients.length
                            ? null
                            : <Link to={"/clientes/nuevo-cliente"}> Nuevo Cliente </Link>
                    }
                </div>
                {
                    !clients.length ?
                        <Spinner message={"Cargando clientes..."} />
                        :
                        <form className="form_search_client" onSubmit={handleFormClient}>
                            <div className="busqueda-cliente">
                                <label htmlFor="busca-cliente">Buscar un cliente</label>
                                <input
                                    type="text"
                                    placeholder="Introduce nombre, email"
                                    name="word"
                                    value={searchingClient}
                                    onChange={handleFormClient}
                                />
                                {searchClient && !clientsFilter.length && <span className="client-notFound">No existe ningún cliente</span>}
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
                                        ? clients.map((client) => (
                                            <ClientItem key={client.id} client={client} />
                                        ))
                                        : clientsFilter.map((client) => (
                                            <ClientItem key={client.id} client={client} />
                                        ))}
                                </table>
                            </div>
                        </form>
                }
            </div>
        </>
    );
};

export default ClientsAll;
