import React, { useEffect, useState } from "react";
import "./SearchProducts.css";
import { springBootAxios } from "../../../api/axios";
import { ListTableSearch } from "./ListTableSearch/ListTableSearch";
export const SearchProducts = ({ onAddProduct }) => {
    const [searchProduct, setSearchProduct] = useState("");
    const [dbProducts, setdbProducts] = useState([]);
    const valorInput = ({ target: { value } }) => setSearchProduct(value);
    const searchValueClean = searchProduct.trim().toLowerCase();

    const onSearchProductDB = async () => {
        if (searchValueClean < 1) return;
        const { data } = await springBootAxios.get("/products");
        setdbProducts(data);
    };

    const closeDivSearch = () => {
        setSearchProduct("");
        setdbProducts([]);
    };

    useEffect(() => { onSearchProductDB(); }, [searchProduct]);
    return (
        <>
            <form className="search-products">
                <legend>Busca los productos para crear un pedido</legend>
                <div >
                    <div className="campo">
                        <label>Productos:</label>
                        <input
                            type="text"
                            placeholder="Busca el producto"
                            name="productos"
                            onChange={valorInput}
                            value={searchProduct}
                        />
                    </div>
                    {
                        searchProduct.length > 1
                            ? < ListTableSearch dbProducts={dbProducts} onAddProduct={onAddProduct} closeDivSearch={closeDivSearch} />
                            : null
                    }
                </div>

            </form >
        </>
    );
};
