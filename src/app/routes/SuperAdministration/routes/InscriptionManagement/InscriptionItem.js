import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import InscriptionModal from "./InscriptionModal";
import { useDispatch } from "react-redux";
import { deleteInscription } from "../../../../../store/actions/Inscription";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import IntlMessages from "../../../../../util/IntlMessages";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";

function InscriptionItem(props) {
  let dispatch = useDispatch();
  const [opendetails, setOpendetails] = useState(false);
  const opendetailsUser = () => {
    setOpendetails(!opendetails);
  };
  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const supprimerInsc = () => {
    dispatch(deleteInscription(props.data.id));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
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
        <p className="fw-bold mb-1"> {props.data.nom}</p>
      </th>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.numSerie}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.addresse}
      </td>

      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.gouvernorat}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.pays}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.numeroTelephone}
      </td>
      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.createdIn.slice(0, 10)}
      </td>

      <td style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        {props.data.confirm}
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
            onClick={opendetailsUser}
          >
            <VisibilityOutlinedIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#F9972D",
              width: "14px",
              height: "14px",
            }}
            onClick={handleOpen}
          >
            <DeleteOutlineRoundedIcon backgroundColor="white" />
          </IconButton>
  

          <Dialog open={open} TransitionComponent={Slide}>
            <DialogContent>
              <DialogContentText>
                {<IntlMessages id="message.confirm.modal" />}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>
                <div style={{ textTransform: "none" }}>{<IntlMessages id="button.no" />}</div>
              </Button>

              <Button onClick={supprimerInsc}>
                <div style={{ textTransform: "none" }}>{<IntlMessages id="button.yes" />}</div>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </td>
      {opendetails && (
        <InscriptionModal opendetailsUser={opendetailsUser} {...props} />
      )}
    </tr>
  );
}
export default InscriptionItem;
