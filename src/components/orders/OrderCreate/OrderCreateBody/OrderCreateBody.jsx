import React from "react";
import "./OrderCreateBody.css";
export const OrderCreateBody = ({ productos, onProductQuanty }) => {
    return (
        <div className="order-client">
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio und</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((product, i) => (
                            <tr key={i}>

                                <td>{product.fullname}</td>
                                <td>{product.price}€</td>
                                <td>
                                    <input
                                        type="number"
                                        name="cantidad"
                                        onChange={(e) => onProductQuanty(e, i, product)}
                                        min={1}
                                        defaultValue={1}
                                    />
                                </td>
                                <td>{product.total}</td>
                                <td>Acciones</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
