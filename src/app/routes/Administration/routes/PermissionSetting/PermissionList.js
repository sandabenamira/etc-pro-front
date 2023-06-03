import React, { Component } from "react";

import PermissionListItem from "./PermissionListItem";
import Select from "react-select";

import IntlMessages from "../../../../../util/IntlMessages";

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
      listRoles: [
        {
          id: 0,
          label: "Administrateur",
          value: 0,
        },
        {
          id: 1,
          label: "Directeurs des Ressouces Humaines",
          value: 1,
        },
        {
          id: 2,
          label: "Responsable des Formations",
          value: 2,
        },
        {
          id: 3,
          label: "Chef D'agences",
          value: 3,
        },
        {
          id: 4,
          label: "Formateurs",
          value: 4,
        },
        {
          id: 5,
          label: "Collaborateurs",
          value: 5,
        },
      ],
      listModules: [
        {
          id: 0,
          label: "Administration",
          value: 0,
        },
        {
          id: 1,
          label: "E-learning",
          value: 1,
        },
        {
          id: 2,
          label: "Catalogues",
          value: 2,
        },
        {
          id: 3,
          label: "Rapports",
          value: 3,
        },
      ],
      listSousModules: [
        {
          id: 0,
          label: "Formations en Ligne",
          value: 0,
        },
        {
          id: 1,
          label: "Supports des Formations",
          value: 1,
        },
        {
          id: 2,
          label: "Moocs",
          value: 2,
        },
        {
          id: 3,
          label: "Gestions des Agences",
          value: 3,
        },
        {
          id: 4,
          label: "Gestions des utilisateurs",
          value: 4,
        },
        {
          id: 5,
          label: "Parametres des permission",
          value: 5,
        },
        {
          id: 6,
          label: "Gestions des formateurs",
          value: 6,
        },
      ],
    };
  }
  handleChangeRole = (selectedOption) => {};

  render() {
    return (
      <div className="app-wrapper ">
        <div className="d-flex justify-content-around bd-highlight flex-wrap">
          <div className="p-2">
            <Select
              required
              options={this.state.listRoles}
              onChange={this.handleChangeRole}
              id="role"
              name="role"
              styles={{
                control: (base) => ({
                  ...base,
                  "&:hover": { borderColor: "gray" }, // border style on hover
                  border: "1px solid lightgray", // default border color
                  boxShadow: "none", // no box-shadow
                  borderTopStyle: "none",
                  borderRightStyle: "none",
                  borderLeftStyle: "none",
                  borderRadius: " none",
                  width: 200,
                }),
              }}
            />{" "}
          </div>

          <div className="p-2">
            <Select
              required
              options={this.state.listModules}
              onChange={this.handleChangeRole}
              id="Module"
              name="Module"
              styles={{
                control: (base) => ({
                  ...base,
                  "&:hover": { borderColor: "gray" }, // border style on hover
                  border: "1px solid lightgray", // default border color
                  boxShadow: "none", // no box-shadow
                  borderTopStyle: "none",
                  borderRightStyle: "none",
                  borderLeftStyle: "none",
                  borderRadius: " none",
                  width: 200,
                }),
              }}
            />{" "}
          </div>

          <div className="p-2">
            <Select
              required
              options={this.state.listSousModules}
              onChange={this.handleChangeRole}
              id="SousModule"
              name="SousModule"
              styles={{
                control: (base) => ({
                  ...base,
                  "&:hover": { borderColor: "gray" }, // border style on hover
                  border: "1px solid lightgray", // default border color
                  boxShadow: "none", // no box-shadow
                  borderTopStyle: "none",
                  borderRightStyle: "none",
                  borderLeftStyle: "none",
                  borderRadius: " none",
                  width: 200,
                }),
              }}
            />{" "}
          </div>
        </div>
        <br />
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
                  <IntlMessages id="role.admin" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="component.etablishments.info.director" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="role.supervisor" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  <IntlMessages id="reporting.formation.Manager" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="internal.trainer" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="external.trainer" />
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                <IntlMessages id="userStuppDisplay.Student" />
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
