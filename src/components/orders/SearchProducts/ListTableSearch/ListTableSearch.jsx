import React, { useState } from "react";
import "./ListTableSearch.css";
export const ListTableSearch = ({ dbProducts = [], onAddProduct, closeDivSearch }) => {
    const [isDivVisible, setIsDivVisible] = useState(true);
    const handleAddProduct = (id) => {
        setIsDivVisible(true);
        onAddProduct(id);
        closeDivSearch();
    };

    return (
        <>
            <div className={` ${isDivVisible ? "product-list-add" : "product-list-hidden"}`}>
                <div className="list-header">
                    <ul>
                        <li>
                            <p>Nombre</p>
                            <p>Descripción</p>
                            <p>Precio</p>
                            <p>Stock</p>
                            <p>Acciones</p>
                        </li>
                    </ul>
                </div>
                <div className="list-body">
                    <ul>
                        {
                            !dbProducts.length
                                ? (<p className="product-not-stock">Producto no disponible en stock</p>)
                                : (dbProducts
                                    .map(({ id, fullname, description, price, quantity }, i) => (
                                        <li key={id}>
                                            <p>{fullname}</p>
                                            <p>{description}</p>
                                            <p>{price}€</p>
                                            <p>{quantity}</p>
                                            <p onClick={() => handleAddProduct(id)}>Añadir</p>
                                        </li>
                                    )))
                        }
                    </ul>
                </div>
            </div >
        </>
    );
};
