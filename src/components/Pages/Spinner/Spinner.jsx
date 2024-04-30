import React from "react";
import "./Spinner.css";
const Spinner = () => {
    return (
        <>
            <div className="spinner-container">
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
                <div>
                    <h3>Cargando pedidos...</h3>
                </div>
            </div>
        </>

    );
};

export default Spinner;
