import React from "react";
import "./SpinnerLoading.css";
export const SpinnerLoading = () => {
    return (
        <div className="loading-spinner">
            <span className="loader"></span>
            <p>Accediendo a tu cuenta...Espere mientras se realiza la conexión</p>
        </div>
    );
};
