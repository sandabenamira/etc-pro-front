import { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import UserDetails from "./UserDetails";

import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ReplayIcon from "@material-ui/icons/Replay";

export default function ArshivedUserItems(props) {
  const [opendetails, setOpendetails] = useState(false);

  const data = props.data;
  const opendetailsUser = () => {
    setOpendetails(!opendetails);
  };
  console.log("dataaaaaaaaaaaaaa archive", data);

  return (
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
        <div style={{ textAlign: "center" }}>
          <Avatar alt={data.prenom} src={data.photo} />
        </div>
      </th>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.nom}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.prenom}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.role}
      </td>

      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.email}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.numeroTelephone}
      </td>
      <td
        style={{
          textAlign: "center",
          backgroundColor: "#F5F5F5",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <div className="package-footer d-flex justify-content-around ">
          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#3F51B5",
              width: "28px",
              height: "28px",
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
              width: "28px",
              height: "28px",
            }}
          >
            <ReplayIcon backgroundColor="white" />
          </IconButton>
        </div>
      </td>
      {opendetails && (
        <UserDetails
          opendetailsUser={opendetailsUser}
          {...props}
          key={data.id}
        />
      )}
    </tr>
  );
}
