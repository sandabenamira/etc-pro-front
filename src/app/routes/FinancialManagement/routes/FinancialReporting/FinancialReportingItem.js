

import React from "react";
import Avatar from "@material-ui/core/Avatar";

const FinancialReportingItem = ({ data }) => {
  const {
    id,
    name,
    Type,
    Formateur,
    Cabinet,
    Participants,
    Lieu,
    Prix,
    Coût,
    remboursement,
  } = data;
  return (
    <tr tabIndex={-1} key={id}>
      <td>
        <div className="user-profile d-flex flex-row align-items-center">
          <h5 className="user-name">{name} </h5>
        </div>
      </td>

      <td><h5>{Type}</h5></td>
      <td><h5>{Formateur}</h5></td>

      <td><h5>{Cabinet}</h5></td>
      <td><h5>{Participants}</h5></td>
      <td><h5>{Lieu}</h5></td>
      <td><h5>{Prix}</h5></td>
      <td><h5>{Coût}</h5></td>
      <td><h5>{remboursement}</h5></td>

    </tr>
  );
};

export default FinancialReportingItem;
