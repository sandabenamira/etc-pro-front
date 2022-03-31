import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { editUser } from "../../../../../store/actions/User";
import { useDispatch } from "react-redux";

export default function AgenceItem(props) {
  let dispatch = useDispatch();

  const data = props.data;
  const finalData = {
    ...props.data,
    archive: true,
  };
  const handleArchive = (e) => {
    dispatch(editUser(finalData));
    console.log(finalData);
  };
  return (
    <tr style={{ backgroundColor: "white", borderRadius: 15 }}>
      <td
        style={{
          textAlign: "start",
          flexDirection: "row",
          backgroundColor: "#F5F5F5",
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        {data.nom}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {data.type}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {data.gouvernerat}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {data.adresse}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {data.email}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {data.fax}
      </td>
      <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
        {data.numeroTel}
      </td>

      <td style={{ backgroundColor: "#F5F5F5" }}>
        <div className="package-footer d-flex justify-content-around ">
          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#3BBDD5",
              width: "28px",
              height: "28px",
            }}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#F15381",
              width: "28px",
              height: "28px",
            }}
            onClick={(e) => handleArchive(e)}
          >
            <DeleteOutlineRoundedIcon backgroundColor="white" />
          </IconButton>
        </div>
      </td>
      <td
        style={{
          textAlign: "center",
          backgroundColor: "#F5F5F5",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        }}
      ></td>
    </tr>
  );
}
