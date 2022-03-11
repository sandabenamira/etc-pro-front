import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import InscriptionModal from "./InscriptionModal";

export default function InscriptionItem(props) {
  const [opendetails, setOpendetails] = useState(false);

  const opendetailsUser = () => {
    setOpendetails(!opendetails);
  };
  return (
    <tr style={{ backgroundColor: "white", borderRadius: 15 }}>
      <th
        scope="row"
        style={{
          flexDirection: "row",
          textAlign: "center",
          backgroundColor: "#F5F5F5",
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        <p className="fw-bold mb-1"> {props.data.nom}</p>
      </th>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.numSerie}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.addresse}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.codePostale}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.gouvernorat}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.pays}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.numero_Telephone}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.createdIn}
      </td>

      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.nomUser}
      </td>

      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.prenoUser}
      </td>

      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.addresseUser}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.numeroTelephoneUser}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.emailUser}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {props.data.confirme}
      </td>
      <td
        style={{
          textAlign: "center",
          backgroundColor: "#F5F5F5",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#3F51B5",
              width: "14px",
              height: "14px",
            }}
            onClick={opendetailsUser}
          >
            <VisibilityOutlinedIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#F9972D",
              width: "14px",
              height: "14px",
            }}
          >
            <DeleteOutlineRoundedIcon backgroundColor="white" />
          </IconButton>
        </div>
      </td>
      {opendetails && (
        <InscriptionModal opendetailsUser={opendetailsUser} {...props} />
      )}
    </tr>
  );
}
