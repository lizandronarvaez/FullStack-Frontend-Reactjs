/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { clienteAxios } from "../../../api/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { OrderAll, SearchProducts } from "..";
import "./OrderCreate.css";
export const OrderCreate = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [cliente, setCliente] = useState({});
    const [buscar, setBuscar] = useState("");
    const [productos, setProductos] = useState([]);
    const [totalPrecio, setTotalPrecio] = useState(0);
    const { fullname, company, phone } = cliente;
    const consultaBackend = async () => {
        const resultado = await clienteAxios.get(`/clients/${_id}`);
        setCliente(resultado.data);
    };
    const buscarProducto = async (e) => {
        e.preventDefault();
        const { data } = await clienteAxios.get(`/products/clientes/${buscar}`);
        if (!data[0]) {
            Swal.fire({
                title: "No existe el producto",
                text: "No hay resultados",
                icon: "error"
            });
        } else {
            const resultadoProducto = data[0];
            // Agregamos una llave a producto
            resultadoProducto.producto = data[0]._id;
            resultadoProducto.cantidad = 0;
            // Guardamos los datos en el state
            setProductos([...productos, resultadoProducto]);
        };
    };
    const valorInput = ({ target: { value } }) => setBuscar(value);
    const cantidadProductos = (e, i) => {
        // Hacemos una copia de los productos
        const todosProductos = [...productos];
        // Posicion de cada producto y accedemos a su valor
        productos[i].cantidad = Number(e.target.value);
        // Almacenar el las cantidades en el nuevo array
        setProductos(todosProductos);
    };
    // Funcion que calculara el total de los productos
    const totalProductos = () => {
        if (!productos.length) setTotalPrecio(0);
        // Calcular el total
        let totalPedido = 0;
        // eslint-disable-next-line no-return-assign
        productos.map(producto => totalPedido += (producto.cantidad * producto.precio));
        // Guardar el total
        setTotalPrecio(totalPedido);
    };
    // ELiminar un producto de la lista
    const eliminarProductoLista = (id) => {
        // FIltramos todos los productos diferentes al que buscamos
        const eliminarProducto = productos.filter(producto => producto.producto !== id);
        // Guardamos en el state con los productos que no estamos eliminados
        setProductos(eliminarProducto);
        // console.log(productos)
    };

    // GUrdar el pedido en la base de datos
    const submitPedido = async (e) => {
        // Evitar actualizar la pagina
        e.preventDefault();
        // Creamos el objeto
        const pedido = {
            cliente: _id,
            pedido: productos,
            total: totalPrecio
        };
        // Guardamos en la base de datos
        const { status, data } = await clienteAxios.post(`/orders/nuevo/${_id}`, pedido);
        // consultar que el pediido se ha guardado correcto
        status === 201
            ? Swal.fire({
                position: "center",
                icon: "success",
                title: data.mensaje,
                showConfirmButton: false,
                timer: 2000
            }).then(async result => {
                if (result) navigate("/pedidos/clientes");
            })
            : Swal.fire({
                position: "center",
                icon: "error",
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            });
    };
    useEffect(() => {
        consultaBackend();
        totalProductos();
    }, [productos]);

    return (
        <>
            <div className="order-create-client">
                <h2>Nuevo Pedido</h2>
                <div className="data-client">
                    <h3>Datos del cliente</h3>
                    <p>Nombre: <span>{fullname}</span></p>
                    <p>Contacto: <span>{phone}</span></p>
                    <p>Empresa: <span>{company}</span> </p>
                </div>
                <SearchProducts buscarProducto={buscarProducto} valorInput={valorInput} />
                {
                    !productos.length
                        ? null
                        : (
                            <>
                                <div className="resumen">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nº Articulo</th>
                                                <th>Nombre Articulo</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        {productos.map((producto, index) => (
                                            <OrderAll
                                                key={producto.producto}
                                                producto={producto}
                                                index={index}
                                                cantidadProductos={cantidadProductos}
                                                eliminarProductoLista={eliminarProductoLista} />
                                        ))}
                                    </table>
                                </div>
                                <div className="resumen-total">
                                    <div className="campo-total">
                                        <p>Total a pagar: <span>{totalPrecio.toFixed(2)}€</span> </p>
                                    </div>
                                    <div className="campo">
                                        <form onSubmit={submitPedido}>
                                            <input type="submit" className="btn btn-azul " value="Realizar Pedido" />
                                        </form>

                                    </div>
                                </div>
                            </>
                        )
                }

            </div>
        </>
    );
};
