import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";

export default class PermissionListItem extends Component {
  render() {
    const {
      coord,
      photo,
      administrateur,
      Directeur_des_RH,
      Responsable_Formation,
      Manager,
      Formateur_interne,
      Formateur_externe,
      Collaborateur,
    } = this.props;
    return (
      <tr style={{ backgroundColor: "white", borderRadius: 15 }}>
        <td
          style={{
            flexDirection: "row",
            textAlign: "start",
            backgroundColor: "#F5F5F5",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          {coord}
        </td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
          {photo}
          <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
            <IconButton
              aria-label="check"
              style={{
                color: "#3F51B5",
                backgroundColor: "#F5F5F5",
                width: "28px",
                height: "28px",
              }}
            >
              <CheckCircleIcon style={{ width: "28px", height: "28px" }}/>
            </IconButton>
          </div>
        </td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
          {administrateur}
          <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
            <IconButton
              aria-label="stop"
              style={{
                color: "#3F51B5",
                backgroundColor: "#F5F5F5",
                width: "28px",
                height: "28px",
              }}
            >
              <BlockOutlinedIcon style={{ width: "28px", height: "28px" }}/>
            </IconButton>
          </div>
        </td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
          {Directeur_des_RH}
          <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
            <IconButton
              aria-label="stop"
              style={{
                color: "#3F51B5",
                backgroundColor: "#F5F5F5",
                width: "28px",
                height: "28px",
              }}
            >
              <BlockOutlinedIcon style={{ width: "28px", height: "28px" }}/>
            </IconButton>
          </div>
        </td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
          {Responsable_Formation}
          <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
            <IconButton
              aria-label="stop"
              style={{
                color: "#3F51B5",
                backgroundColor: "#F5F5F5",
                width: "28px",
                height: "28px",
              }}
            >
              <BlockOutlinedIcon style={{ width: "28px", height: "28px" }} />
            </IconButton>
          </div>
        </td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
          {Manager}
          <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
            <IconButton
              aria-label="stop"
              style={{
                color: "#3F51B5",
                backgroundColor: "#F5F5F5",
                width: "28px",
                height: "28px",
              }}
            >
              <BlockOutlinedIcon style={{ width: "28px", height: "28px" }}/>
            </IconButton>
          </div>
        </td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
          {Formateur_interne}
          <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
            <IconButton
              aria-label="stop"
              style={{
                color: "#3F51B5",
                backgroundColor: "#F5F5F5",
                width: "28px",
                height: "28px",
              }}
            >
              <BlockOutlinedIcon style={{ width: "28px", height: "28px" }}/>
            </IconButton>
          </div>
        </td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>
          {Formateur_externe}
          <div className="package-footer d-flex justify-content-around bd-highlight flex-wrap">
            <IconButton
              aria-label="stop"
              style={{
                color: "#3F51B5",
                backgroundColor: "#F5F5F5",
                width: "28px",
                height: "28px",
              }}
            >
              <BlockOutlinedIcon style={{ width: "28px", height: "28px" }} />
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
        >
          {Collaborateur}
        </td>
      </tr>
    );
  }
}
