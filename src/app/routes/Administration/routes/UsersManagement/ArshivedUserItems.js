import React from "react";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ReplayIcon from "@material-ui/icons/Replay";
const ArshivedUserItems = ({ photo, nom, prenom, role, email, Ntel }) => (
  <tr style={{ backgroundColor: "white", borderRadius: 15 }}>
    <th
      scope="row"
      style={{
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        backgroundColor: "#F5F5F5",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
      }}
    >
      <div>
        <Avatar
          alt="Remy Sharp"
          src="https://www.atlassian.com/fr/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
        />
      </div>
    </th>
    <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{photo}</td>
    <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{nom}</td>
    <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{prenom}</td>
    <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{role}</td>
    <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{email}</td>
    <td
      style={{
        textAlign: "center",
        backgroundColor: "#F5F5F5",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >
      {Ntel}
      <div className="package-footer d-flex justify-content-around ">
        <IconButton
          aria-label="delete"
          style={{
            color: "#FFFFFF",
            backgroundColor: "#3F51B5",
            width: "28px",
            height: "28px",
          }}
        >
          <VisibilityOutlinedIcon />
        </IconButton>

        <IconButton
          aria-label="delete"
          style={{
            color: "#FFFFFF",
            backgroundColor: "#F9972D",
            width: "28px",
            height: "28px",
          }}
        >
          <ReplayIcon backgroundColor="white" />
        </IconButton>
      </div>
    </td>
  </tr>
);

export default ArshivedUserItems;
