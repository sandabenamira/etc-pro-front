import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import UserDetails from "./UserDetails";
import { editUserisArchived } from "../../../../../store/actions/User";
import { useDispatch } from "react-redux";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ReplayIcon from "@material-ui/icons/Replay";

export default function ArshivedUserItems(props) {
  let dispatch = useDispatch();
  const [opendetails, setOpendetails] = useState(false);
  const data = props.data;
  const opendetailsUser = () => {
    setOpendetails(!opendetails);
  };
  const finalData = {
    ...props.data,
    isArchived: false,
  };
  const handleArchive = (e) => {
    dispatch(editUserisArchived(finalData));
   };
  return (
    <tr style={{ backgroundColor: "white", borderRadius: 15 }}>
      <th
        scope="row"
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#F5F5F5",
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Avatar style={{}} alt={data.firstName} src={data.photo} />
        </div>
      </th>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.lastName}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.firstName}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.name}
      </td>

      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.email}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.telephoneNumber}
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
            <ReplayIcon />
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
