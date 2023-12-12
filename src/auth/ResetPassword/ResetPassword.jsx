import React from "react";
import { Link } from "react-router-dom";
import "./ResetPassword.css";
import { Back } from "../../assets";
export const ResetPassword = () => {
    return (
        <>
            <div className="reset-password">
                <div className="reset-image"></div>
                <div className="reset-formulario">
                    <form>
                        <h2>Reestablecer password</h2>
                        <div className="campo">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" placeholder="Introduce email" />
                        </div>
                        <div className="campo">
                            <input type="submit" value="Reestablecer" />
                        </div>
                        <div className="campo">
                            <Link to={"/login"}>
                                <img src={Back} alt="back" />
                                Ir a login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
