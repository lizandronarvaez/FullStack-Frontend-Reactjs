import React from "react";
import "./ResetPassword.css";
const ResetPassword = () => {






    return (
        <>
            <div className="reset-password">
                <div className="reset-image"></div>
                <div className="reset-formulario">
                    <form>
                        <h2>Reestablecer password</h2>
                        <div className="campo">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                            />
                        </div>
                        <div className="campo">
                            <input
                                type="submit"
                                value="Reestablecer"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
