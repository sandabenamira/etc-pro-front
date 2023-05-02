import PartnersItem from "./PartnersItem";
import { useSelector } from "react-redux";
import React from "react";

function PartnersList({ rr, searchTerm }) {
  const data = useSelector((state) => state.Partner.PARTNERs);

  return (
    <div className="d-flex flex-column">
      <div className="table-responsive">
        <table
          className="table"
          style={{ borderCollapse: "separate", borderSpacing: "0 15px" }}
        >
          <thead>
            <tr style={{ paddingBottom: "10px", textAlign: "center" }}>
              <th style={{ borderBottom: "0", borderTop: "0" }}>Nom</th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>Pays</th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>Gouvernorat</th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>Adresse</th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>E-mail</th>
              <th style={{ borderBottom: "0", borderTop: "0" }}>N tel</th>
              <th style={{ borderBottom: "0", borderTop: "0" }}></th>
            </tr>
          </thead>
          <tbody>
            {!rr
              ? data
                  .filter((e) =>
                    e.nom.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .filter((e) => e.isArchived === false)

                  .map((row) => (
                    <PartnersItem
                      nom={row.nom}
                      pays={row.pays}
                      gouvernerat={row.gouvernerat}
                      adresse={row.adresse}
                      email={row.email}
                      Ntel={row.Ntel}
                      rr={rr ? rr : false}
                    />
                  ))
              : rr &&
                data
                .filter((e) => e.isArchived === true)
                .map((row) => (
                  <PartnersItem
                    nom={row.nom}
                    pays={row.pays}
                    gouvernerat={row.gouvernerat}
                    adresse={row.adresse}
                    email={row.email}
                    Ntel={row.Ntel}
                    rr={rr ? rr : false}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PartnersList;
