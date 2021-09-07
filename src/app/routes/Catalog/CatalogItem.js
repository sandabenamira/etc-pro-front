import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import img1 from '../../../assets/images/img1.jpg';
import img2 from '../../../assets/images/img2.jpeg';
import img3 from '../../../assets/images/img3.jpeg';
import img4 from '../../../assets/images/img4.jpeg';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
export default function CatalogItem() {
    const classes = useStyles();
    var things = [img1, img2, img3, img4];
    var thing = things[Math.floor(Math.random() * things.length)];
  return (
    <div className="card package bg-white shadow">
      <div
        className="package-header  lighten-1 text-white"
        // style={{ backgroundColor: "orange" }}
      >
        {/* <h3 className="letter-spacing-base text-uppercase mb-0">
          {" "}
          <strong>formation</strong>
        </h3> */}
        <img src={thing} alt="formation" style={{ width: '100%', height: '200px' }} />
      </div>
     <div className="package-items">    
      <ul
        className="package-items package-items text-grey text-darken-3"
      >
        <li>
          {" "}
          <div style={{ fontSize: "20px", color: "orange" }}>
            Marketing Digital : Les bases
          </div>
        </li>
        <li>
          <div>
            <strong> Organizateur</strong> &nbsp; Nour Bouakine
          </div>
          <div>
            <strong> Formateur</strong> &nbsp; Nour Bouakine
          </div>
          <div>
            <strong> Date début</strong> &nbsp; 01/05/2021
          </div>
          <div>
            <strong> DUrée</strong> &nbsp; 3 jours
          </div>
          <div>
          Ce programme a pour objectif de former des techniciens de la relation client autour des métiers du marketing, de la vente et de la communication.
          </div>
        </li>
      </ul>
      </div>
      <div className="package-footer" >
      <Button variant="outlined" size="small" color="primary" className={classes.margin}>
          Savoir Plus
        </Button>
        <Button variant="contained" size="small" color="primary" className={classes.margin}>
          S'inscrire
        </Button>
        <IconButton aria-label="delete" className={classes.margin}>
          <FavoriteIcon color="secondary" />
        </IconButton>
      </div>
    </div>
  );
}
