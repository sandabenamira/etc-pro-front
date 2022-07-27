import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import UserDetails from "./UserDetails";
import { editUserisArchived } from "../../../../../store/actions/User";
import { useDispatch } from "react-redux";
import AddUser from './AddUser';
import { roleList } from "../../../../../constants/variables and listes";

export default function UserListItem(props) {
  let dispatch = useDispatch();
  const [opendetails, setOpendetails] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const data = props.data;

  const finalData = {
    ...props.data,
    isArchived: true,
  };
  const opendetailsUser = () => {
    setOpendetails(!opendetails);
  };
  const handleArchive = (e) => {
    dispatch(editUserisArchived(finalData));
   };
  const openEditUser = () => {
    setIsOpen(!isOpen);
  };
  var roleName
  for (const element of roleList) {
    if (element.value===data.roleId) {
      roleName = element.label;
    }
  }  return (
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
        <div>
          <Avatar alt={data.firstName} src={data.photo} />
        </div>
      </th>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.firstName}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.lastName}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {roleName}
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
        <div className="package-footer d-flex justify-content-center bd-highlight flex-wrap">
          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#3F51B5",
              width: "28px",
              height: "28px",
              marginRight: "4%",
            }}
            onClick={opendetailsUser}
          >
            <VisibilityOutlinedIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#F15381",
              width: "28px",
              height: "28px",
              marginRight: "4%",
            }}
            onClick={openEditUser}

          >
            <CreateIcon />
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
            <DeleteOutlineRoundedIcon backgroundColor="white" />
          </IconButton>
        </div>
      </td>
      {opendetails && (
        <UserDetails
          opendetailsUser={opendetailsUser}
          {...props}
          key={data.id}
          roleName={roleName}
        />
      )}{isOpen &&(
        <AddUser  openUser={openEditUser} data={data} isOpen={isOpen}/>
      )}
    </tr>
  );
}
