import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ReplayIcon from "@material-ui/icons/Replay";
import { useDispatch } from "react-redux";
import { editAgence } from "../../../../../store/actions/Agence";

export default function ArchiveItem(props) {
  let dispatch = useDispatch();
  const data = props.data;
  const finalData = {
    ...props.data,
    isArchived: false,
  };
  const handleArchive = (e) => {
    dispatch(editAgence(finalData));
   };
  return (
    <tr style={{ backgroundColor: "white", borderRadius: 15 }}>
      <td
        style={{
          textAlign: "center",
          flexDirection: "row",
          backgroundColor: "#F5F5F5",
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        {data.name}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.type}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.governorate}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.address}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.email}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.fax}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {data.telephoneNumber}
      </td>

    
      <td style={{ backgroundColor: "#F5F5F5" }}>
        <div className="package-footer d-flex justify-content-around ">
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
            <ReplayIcon backgroundColor="white" />
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
