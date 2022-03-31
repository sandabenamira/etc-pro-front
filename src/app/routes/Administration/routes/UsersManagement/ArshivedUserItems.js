import { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import UserDetails from "./UserDetails";
import { editUser } from "../../../../../store/actions/User";
import { useDispatch } from "react-redux";

import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ReplayIcon from "@material-ui/icons/Replay";

export default function ArshivedUserItems(props) {
  const [opendetails, setOpendetails] = useState(false);
  let dispatch = useDispatch();

  const data = props.data;
  const opendetailsUser = () => {
    setOpendetails(!opendetails);
  };
  const finalData = {
    ...props.data,
    archive: false,

  };
  // const i = 0;
  // i += 1;
  // props.increment = i;
  const handleArchive = (e) => {
    dispatch(editUser(finalData));
    console.log(finalData);
  };
  return (
    <tr style={{ backgroundColor: "white", borderRadius: 15 }}>
      <th
        scope="row"
        style={{
          display: "flex",
          flexDirection: "row",
         // textAlign: "end",
          backgroundColor: "#F5F5F5",
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Avatar style={{
          }} alt={data.prenom} src={data.photo} />
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
            onClick={(e) => handleArchive(e)}
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
