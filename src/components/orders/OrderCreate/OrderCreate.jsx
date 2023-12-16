import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { clienteAxios } from "../../../api/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { SearchProducts } from "..";
import { OrderCreateBody } from "./OrderCreateBody/OrderCreateBody";
import "./OrderCreate.css";

export const OrderCreate = () => {
    const navigate = useNavigate();
    const { _id: idClient } = useParams();
    const [cliente, setCliente] = useState({});
    const { fullname, company, phone } = cliente;

    const [orderItem, setOrderItem] = useState("");

    const [productos, setProductos] = useState([]);

    const [totalOrder, setTotalOrder] = useState(0);

    const consultaBackend = async () => {
        const { data } = await clienteAxios.get(`/clients/${idClient}`);
        setCliente(data);
    };

    const onAddProduct = (order) => { setOrderItem(order); buscarProducto(); };

    const buscarProducto = async () => {
        if (orderItem === "") return;
        const { data } = await clienteAxios.get(`/products/${orderItem}`);
        const order = {
            id: data._id,
            fullname: data.fullname,
            price: data.price,
            cantidad: 0,
            total: 0
        };
        setProductos([...productos, order]);
    };

    const onProductQuanty = (e, index, product) => {
        // Hacemos una copia de los productos
        const allProducts = [...productos];
        // Posicion de cada producto y accedemos a su valor
        allProducts[index].cantidad = Number(e.target.value);
        allProducts[index].total = (allProducts[index].price * allProducts[index].cantidad);
        // Almacenar el las cantidades en el nuevo array
        setProductos(allProducts);
    };

    const totalQuantyProducts = () => {
        if (!productos.length) setTotalOrder(0);
        let total = 0;
        for (const item of productos) total += item.total;
        setTotalOrder(total);
    };

    // ELiminar un producto de la lista
    // eslint-disable-next-line no-unused-vars
    // !! TODO: SOLUCIONAR ELIMINAR PEDIDOS DE LA LISTA
    const eliminarProductoLista = (id) => {
        // // FIltramos todos los productos diferentes al que buscamos
        // const eliminarProducto = productos.filter(producto => producto.producto !== id);
        // // Guardamos en el state con los productos que no estamos eliminados
        // setProductos(eliminarProducto);
        // // console.log(productos)
    };

    const submitPedido = async (e) => {
        e.preventDefault();
        for (const product of productos) delete product.total;

        // !! todo: solucionar descontar unidades de el stock

        const pedido = {
            client: idClient,
            order: productos,
            total: totalOrder
        };
        // Guardamos en la base de datos
        const { data: { ok, message } } = await clienteAxios.post(`/orders/${idClient}`, pedido);

        if (ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: message,
                showConfirmButton: false,
                timer: 2000
            });
            navigate("/pedidos/clientes");
        }
    };
    useEffect(() => {
        consultaBackend();
        totalQuantyProducts();
    }, [productos, orderItem, totalOrder]);

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

                <SearchProducts buscarProducto={buscarProducto} onAddProduct={onAddProduct} />
                {
                    !productos.length
                        ? null
                        : (
                            <>
                                <OrderCreateBody productos={productos} onProductQuanty={onProductQuanty} />
                                <div className="resumen-total">
                                    <div className="campo-total">
                                        <p>Factural Total:<span> {totalOrder.toFixed(2)}€</span> </p>
                                    </div>
                                    <div className="campo">
                                        <form onSubmit={submitPedido}>
                                            <input type="submit" className="" value="Crear pedido" />
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
