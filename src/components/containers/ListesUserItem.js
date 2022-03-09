import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

export default function ListesUserItem(props) {
  return (
    <div>
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
          {props.nomUser}
        </th>

        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
          {props.nomUser}
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
              onClick={props.opendetailsUser}
            >
              <VisibilityOutlinedIcon 
              
              
              />
            </IconButton>
            {/* 
      <IconButton
        aria-label="delete"
        style={{
          color: "#FFFFFF",
          backgroundColor: "#F15381",
          width: "28px",
          height: "28px",
        }}
      >
        <CreateIcon />
      </IconButton> */}
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
      </tr>
    </div>
  );
}
