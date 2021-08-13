import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import img1 from '../../../../../assets/images/img1.jpg';
import img2 from '../../../../../assets/images/img2.jpeg';
import img3 from '../../../../../assets/images/img3.jpeg';
import img4 from '../../../../../assets/images/img4.jpeg';
import IntlMessages from "../../../../../util/IntlMessages";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
export default function OnlineTrainingItem() {
  const classes = useStyles();
  var things = [img1, img2, img3, img4];
  var thing = things[Math.floor(Math.random() * things.length)];
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
            <div style={{ fontSize: "20px", color: "orange" }}>
              <strong >Marketing Digital : Les bases </strong>
            </div>
          </li>
          <li>
            <div>
              <strong> <IntlMessages id="organizer" /></strong>
            </div>
            <div>
              <strong> <IntlMessages id="trainer " /></strong>
            </div>
            <div>
              <strong> <IntlMessages id="start.date" /></strong>
            </div>
            <div>
              <strong> <IntlMessages id="duration" /></strong>
            </div>
            <div>
              Ce programme a pour objectif de former des techniciens de la relation client autour des métiers du marketing, de la vente et de la communication.
            </div>
          </li>
        </ul>
      </div>
      <div className="package-footer" >
        <Button variant="outlined" size="small" color="primary" className={classes.margin}>
          <IntlMessages id="show.more" />
        </Button>
        <Button variant="contained" size="small" color="primary" className={classes.margin}>
          <IntlMessages id="register" />
        </Button>
        <IconButton aria-label="delete" className={classes.margin}>
          <FavoriteIcon color="secondary" />
        </IconButton>
      </div>
    </div>
  );
}
