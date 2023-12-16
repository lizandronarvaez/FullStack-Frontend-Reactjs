import React from "react";
import "./ListTableSearch.css";
export const ListTableSearch = ({ dbProductFiltered = [], onAddProduct }) => {
    return (
        <>
            <div className="product-list-add">
                <div className="list-header">
                    <ul>
                        <li>
                            <p>Nombre</p>
                            <p>Marca</p>
                            <p>Precio</p>
                            <p>Stock</p>
                            <p>Acciones</p>
                        </li>
                    </ul>
                </div>
                <div className="list-body">
                    <ul>
                        {
                            !dbProductFiltered.length
                                ? (<p className="product-not-stock">Producto no disponible en stock</p>)
                                : (dbProductFiltered.map((product, i) => (
                                    <li key={product._id}>
                                        <p>{product.fullname}</p>
                                        <p>{product.brand}</p>
                                        <p>{product.price}</p>
                                        <p>{product.stock}</p>
                                        <p
                                            onClick={() => onAddProduct(product._id)}
                                        >
                                            Añadir
                                        </p>
                                    </li>
                                )))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};
