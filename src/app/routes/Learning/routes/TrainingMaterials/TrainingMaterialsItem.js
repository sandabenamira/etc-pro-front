import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import img1 from '../../../../../assets/images/img1.jpg';
import img2 from '../../../../../assets/images/img2.jpeg';
import img3 from '../../../../../assets/images/img3.jpeg';
import img4 from '../../../../../assets/images/img4.jpeg';
import IntlMessages from "../../../../../util/IntlMessages";
import MaterialVisualisation from './MaterialVisualisation';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function TrainingMaterialsItem() {
  const classes = useStyles();
  var things = [img1, img2, img3, img4];
  var thing = things[Math.floor(Math.random() * things.length)];

  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div className="card package bg-white shadow">

      <div className="package-items">
        <div>
          <img src={thing} alt="formation" style={{ width: '100%', height: '200px' }} />
        </div>

        <ul
          className="package-items package-items text-grey text-darken-3"
        >
          <li>
            {" "}
            <div style={{ fontSize: "20px", color: "orange", textAlign: "center" }}>
              <strong>Management</strong>
            </div>
          </li>
          <li>
            <div>
              <strong> <IntlMessages id="training.materials.added.by" /></strong>
            </div>
            <div>
              <strong> <IntlMessages id="training.materials.added.on" /></strong>
            </div>
            <div>
              <strong> <IntlMessages id="training.materials.intended.for " /></strong>
            </div>
            <div>
              <strong><IntlMessages id="training.materials.training" /></strong>
            </div>

            <div>
              
              Ce programme a pour objectif de former des techniciens de la relation client autour des métiers du marketing, de la vente et de la communication.
            </div>
          </li>
        </ul>
      </div>
      <div className="package-footer" >
        <IconButton
          aria-label="delete"
          onClick={() => {
            setModalOpen(true);
          }}
          className={classes.margin} style={{ color: "#FFFFFF", backgroundColor: "#3F51B5", width: "30px", height: "30px" }}>
          <VisibilityOutlinedIcon />
          {modalOpen && <MaterialVisualisation setOpenModal={setModalOpen} />}
        </IconButton>
        <IconButton aria-label="delete" className={classes.margin} style={{ color: "#FFFFFF", backgroundColor: "#3BBDD5", width: "30px", height: "30px" }}>
          <SaveAltRoundedIcon />
        </IconButton>
        <IconButton aria-label="delete" className={classes.margin} style={{ color: "#FFFFFF", backgroundColor: "#F15381", width: "30px", height: "30px" }}>
          <CreateIcon />
        </IconButton>
        <IconButton aria-label="delete" className={classes.margin} style={{ color: "#FFFFFF", backgroundColor: "#F9972D", width: "30px", height: "30px" }}>
          <DeleteOutlineRoundedIcon backgroundColor="white" />
        </IconButton>
      </div>
    </div>
  );
}
