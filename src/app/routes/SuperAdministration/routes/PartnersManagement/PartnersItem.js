import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import ReplayIcon from "@material-ui/icons/Replay";
import { useDispatch } from "react-redux";
import { editPARTNER } from "../../../../../store/actions/Partner";
function PartnersItem({ nom, pays, gouvernerat, adresse, email, Ntel, rr }) {
  let dispatch = useDispatch();

  const finalData = {
    nom: nom,
    pays: pays,
    gouvernerat: gouvernerat,
    adresse: adresse,
    email: email,
    Ntel: Ntel,
    isArchived: false,
  };
  const finalData2 = {
    nom: nom,
    pays: pays,
    gouvernerat: gouvernerat,
    adresse: adresse,
    email: email,
    Ntel: Ntel,
    isArchived: true,
  };
  const handleArchive = (e) => {
    dispatch(editPARTNER(finalData));
  };
  const handleArchive2 = (e) => {
    dispatch(editPARTNER(finalData2));
  };
  return (
    <tr
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        textAlign: "center",
      }}
    >
      <td
        style={{
          textAlign: "center",
          flexDirection: "row",
          backgroundColor: "#F5F5F5",
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        {nom}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {pays}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {gouvernerat}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {adresse}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {email}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {Ntel}
      </td>

      <td style={{ backgroundColor: "#F5F5F5" }}>
        <div className="package-footer d-flex justify-content-around ">
          {rr ? (
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
          ) : (
            <IconButton
              aria-label="delete"
              style={{
                color: "#FFFFFF",
                backgroundColor: "#F15381",
                width: "28px",
                height: "28px",
              }}
              onClick={(e) => handleArchive2(e)}
            >
              <DeleteOutlineRoundedIcon backgroundColor="white" />
            </IconButton>
          )}
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

export default PartnersItem;
