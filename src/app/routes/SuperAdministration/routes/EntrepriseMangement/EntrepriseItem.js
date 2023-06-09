import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import EntrepriseModal from "./EntrepriseModal";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

export default function EntrepriseItem(props) {
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
        <p className="fw-bold mb-1"> {props.data.nameEntreprise}</p>
      </th>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.serialNumberEntreprise}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.addressEntreprise}
      </td>

      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.governorateEntreprise}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.countryEntreprise}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.telephoneNumberEntreprise? props.data.telephoneNumberEntreprise :99568356}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.createdIn}
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
        </div>
      </td>
      {opendetails && (
        <EntrepriseModal opendetailsUser={opendetailsUser} {...props} />
      )}
    </tr>
  );
}
