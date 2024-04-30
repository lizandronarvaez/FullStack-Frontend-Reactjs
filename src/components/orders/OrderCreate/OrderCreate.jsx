import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { springBootAxios } from "../../../api/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { SearchProducts } from "..";
import { OrderCreateBody } from "./OrderCreateBody/OrderCreateBody";
import "./OrderCreate.css";

export const OrderCreate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [client, setClient] = useState({});
    const { fullname, email, phone } = client;
    const [orderItem, setOrderItem] = useState("");
    const [orderProducts, setOrderProducts] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);

    const getDataDB = async () => {
        const { data: { client } } = await springBootAxios.get(`/clients/${id}`);
        setClient(client);
    };
    const onAddProduct = (order) => { setOrderItem(order); searchProductDB(); };
    const searchProductDB = async () => {
        if (orderItem === "") return;
        const { data: { product: { id, fullname, price } } } = await springBootAxios.get(`/products/${orderItem}`);
        const order = { id, fullname, price, quantity: 0, total: 0 };
        setOrderProducts([...orderProducts, order]);
    };

    const onProductQuanty = (e, index) => {
        const quantyValue = Number(e.target.value);
        if (quantyValue <= 0) {
            confirmProductList(index);
            return;
        }
        // Hacemos una copia de los productos
        const allProducts = [...orderProducts];
        // Posicion de cada producto y accedemos a su valor
        allProducts[index].quantity = Number(e.target.value);
        allProducts[index].total = (allProducts[index].price * allProducts[index].quantity);
        // Almacenar el las cantidades en el nuevo array
        setOrderProducts(allProducts);
    };

    const totalQuantyProducts = () => {
        const total = orderProducts.reduce((acc, { total }) => acc + total, 0);
        setTotalOrder(total);
    };

    const removeProductList = (index) => {
        const productDelete = orderProducts.filter((_, i) => i !== index);
        setOrderProducts(productDelete);
    };
    const confirmProductList = (index) => {
        Swal.fire({
            title: "Eliminar producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si,eliminar",
            cancelButtonText: "No,cancelar"

        }).then((result) => {
            if (result.isConfirmed) {
                removeProductList(index);
            }
        });
    };

    const submitPedido = async (e) => {
        e.preventDefault();
        for (const product of orderProducts) delete product.total;

        // !! todo: solucionar descontar unidades de el stock

        const pedido = {
            client,
            order: orderProducts,
            total: totalOrder.toFixed(2)
        };

        // Guardamos en la base de datos
        const data = await springBootAxios.post("/orders", pedido);
        // console.log(data)

        // if (ok) {
        //     Swal.fire({
        //         position: "center",
        //         icon: "success",
        //         title: message,
        //         showConfirmButton: false,
        //         timer: 2000
        //     });
        //     navigate("/pedidos/clientes");
        // }
    };
    useEffect(() => {
        getDataDB();
        totalQuantyProducts();
    }, [orderProducts, orderItem, totalOrder]);

    return (
        <>
            <div className="order-create-client">
                <h2>Nuevo Pedido</h2>
                <div className="data-client">
                    <h3>Datos del cliente</h3>
                    <p>Nombre: <span>{fullname}</span></p>
                    <p>Contacto: <span>{phone}</span></p>
                    <p>Email: <span>{email}</span> </p>
                </div>

                <SearchProducts buscarProducto={searchProductDB} onAddProduct={onAddProduct} />

                {
                    !orderProducts.length
                        ? null
                        : (
                            <>
                                <OrderCreateBody productos={orderProducts} onProductQuanty={onProductQuanty} />
                                <div className="resumen-total">
                                    <div className="campo-total">
                                        <p>Factural Total:<span> {totalOrder.toFixed(2)}€</span> </p>
                                    </div>
                                    <div className="campo">
                                        <form onSubmit={submitPedido}>
                                            <input type="submit" value="Crear pedido" />
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
