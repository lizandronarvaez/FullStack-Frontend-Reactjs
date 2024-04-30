import React from "react";
import "./OrderCreateBody.css";
export const OrderCreateBody = ({ productos, onProductQuanty }) => {
    return (
        <div className="order-client">
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio/Und</th>
                        <th>Cantidad</th>
                        <th>Total</th>
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
                                        name="quantity"
                                        onChange={(e) => onProductQuanty(e, i)}
                                        defaultValue={1}
                                    />
                                </td>
                                <td>{Math.round(product.total * 100) / 100}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
