import React, { Component } from "react";
import PartnersItem from "./PartnersItem";


function createData(nom, pays, gouvernerat, adresse, email, Ntel,) {
    return { nom, pays, gouvernerat, adresse, email, Ntel, };
}

const rows = [

    createData('MR MOHAMED BOUJMIL', 'Tunisie', 'Tunis', 'Place Taher Haddad 1 Tunis 1053', 'mohamed.boujmil@gmail.com', 39143900),
    createData('MR JENDOUBI NIZAR', 'Tunisie', 'Tunis', "23 Rue d'Algerie Tunis 1000", 'nizar.jendoubi@gmail.com', 39143900),
];


export default class PartnersList extends Component {
    render() {
        return (
            <div className="d-flex flex-column">
              
                <div className="table-responsive">
                    <table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 15px" }} >
                        <thead>
                            <tr style={{ paddingBottom: "10px", textAlign: "center", }}>

                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    Nom</th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    pays</th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    Gouvernorat</th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    Adress</th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    E-mail</th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    N tel</th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <PartnersItem
                                    nom={row.nom}
                                    pays={row.pays}
                                    gouvernerat={row.gouvernerat}
                                    adresse={row.adresse}
                                    email={row.email}
                                    Ntel={row.Ntel}

                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}