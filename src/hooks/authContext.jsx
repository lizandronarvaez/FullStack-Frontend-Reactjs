import React, { useEffect, useState } from 'react'

const HOOKContext = React.createContext([{}, () => { }]);

const AUTHContext = (props) => {
    const [auth, setAuth] = useState({
        token: "",
        authentication: false
    })

    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(token){
            setAuth({
                token,
                authentication:true
            })
        return
        }
    },[])
    return (
        <HOOKContext.Provider value={[auth, setAuth]}>
            {props.children}
        </HOOKContext.Provider>
    )
}

export { HOOKContext, AUTHContext }