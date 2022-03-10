import React from "react";
import { useEffect } from "react";
import ListesInscriptionItem from "./ListesInscriptionItem";
import { getInscriptions } from "../../../store/actions/Inscription";
import { useDispatch, useSelector } from "react-redux";
import ModaleInscription from "../../../components/containers/ModaleInscription";
import { useState } from "react";

function ListesInscription() {
  let dispatch = useDispatch();
  const data = useSelector((state) => state.Inscriptions.inscriptions);
  useEffect(() => {
    dispatch(getInscriptions());
    console.log(dispatch(getInscriptions()));
  }, []);
  //useEffect: exécuter avant l'afffichage , [] pour l'afficher une seule fois

  const [opendetails, setOpendetails] = useState(false);
  const [handleClick, setHandleClick] = useState(0);

  const opendetailsUser = () => {
    setOpendetails({ opendetails: !opendetails });
  };

  console.log(opendetails);
  console.log(handleClick);

  return (
    <div
      style={{
        overflow: "auto",
        width: "100%",
      }}
    >
      <div
        className="ListeCompany"
        style={{
          marginTop: "30px ",
        }}
      >
        {/* {opendetails && (
          <ModaleInscription
            //  values={}
            opendetailsUser={opendetailsUser}
          />
        )} */}

        <h1
          style={{
            margin: "20px 20px 20px 20px",
          }}
        >
          Listes des entreprises inscrits
        </h1>
        <div className="table-responsive">
          <table
            className="table scrollbar-light-blue "
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 30px",
              width: "100%",
            }}
          >
            <thead className="thead-dark">
              <tr style={{ paddingBottom: "10px", textAlign: "start" }}>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Nom Entreprise
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Numéro série
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Adresse de la société
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Code postal
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Gouvernorat
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>pays</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  numero Telephone
                </th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>createdIn</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>....</th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>nomUser</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>prenoUser</th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  addresseUser
                </th>

                <th style={{ borderBottom: "0", borderTop: "0" }}>
                  Email_User
                </th>
                <th style={{ borderBottom: "0", borderTop: "0" }}> Confirme</th>
                <th style={{ borderBottom: "0", borderTop: "0" }}>boutons</th>
              </tr>
            </thead>
            {/* //key={person.id} */}
            <tbody>
              {data.map((row, index) => (
                <ListesInscriptionItem key={index} data={row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListesInscription;
