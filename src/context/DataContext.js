import React, { createContext, useState} from "react";
import jwt_decode from 'jwt-decode';

//Contexto
export const DataContext = createContext({});

//Contexto Provider
export const DataProvider = ({children}) => {
    const [dadosUsuario, setDadosUsuario] = useState("");

    const armazenarDadosUsuario = (jwt) => {
        var jwtDecodificado = jwt_decode(jwt);

       /* .user = cahve do json retornado pelo back que contem os dados do usuario logado
         a partir da linha abaixo, o conteudo usario sera a string:
        {\"id\":1,\"username\":\"user\",\"email\":\"user@mail.com\",\"roles\":[\"ROLE_USER\"]}
        */
        var usuario = jwtDecodificado.user
        //na linha abaixo a string sjpn é transformada em objt  js
        usuario = JSON.parse(usuario);

        setDadosUsuario({
            id: usuario?.id,
            nome: usuario?.username,
            email: usuario?.email,
            token: jwt,
        })
    }

    return (
        <DataContext.Provider value={{
            dadosUsuario,
            armazenarDadosUsuario,
        }}>
            {children}
        </DataContext.Provider>
    )
}