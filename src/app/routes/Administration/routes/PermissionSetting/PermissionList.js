import React, { Component } from "react";

import PermissionListItem from "./PermissionListItem";

//import IntlMessages from "../../../../../util/IntlMessages";

function createData(
  coord,
  photo,
  administrateur,
  Directeur_des_RH,
  Responsable_Formation,
  Manager,
  Formateur_interne,
  Formateur_externe,
  Collaborateur
) {
  return {
    coord,
    photo,
    administrateur,
    Directeur_des_RH,
    Responsable_Formation,
    Manager,
    Formateur_interne,
    Formateur_externe,
    Collaborateur,
  };
}

const rows = [
  
  createData("Ajouter un Admin"),
  createData("Modifier un Admin"),
  createData("Supprimer un Admin"),
  createData("consulter des Admin"),
  createData("Ajouter un Nombre de Direction"),
  createData("MOdifier un Membre de Direction"),
  createData("Consulter des Membres de Direction"),
];
export default class PermissionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    };
   
 
  }

  render() {
    return (
      <div className="app-wrapper ">
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12 bd-highlight flex-wrap"></div>

        <div className="table-responsive">
          <table
            className="table "
            style={{ borderCollapse: "separate", borderSpacing: "0 15px" }}
          >
            <thead>
              <tr style={{ paddingBottom: "10px", textAlign: "start" }}>
                <th style={{ borderBottom: "0", borderTop: "0" }}></th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Administrateur
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Directeur des RH
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Responsable Formation
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>Manager</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Formateur interne
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Formateur externe
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Collaborateur
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <PermissionListItem
                  coord={row.coord}
                  photo={row.photo}
                  administrateur={row.administrateur}
                  Directeur_des_RH={row.Directeur_des_RH}
                  Responsable_Formation={row.Responsable_Formation}
                  Manager={row.Manager}
                  Formateur_interne={row.Formateur_interne}
                  Formateur_externe={row.Formateur_externe}
                  Collaborateur={row.Collaborateur}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
