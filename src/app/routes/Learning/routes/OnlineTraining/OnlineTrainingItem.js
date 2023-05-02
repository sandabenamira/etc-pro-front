import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import img1 from "../../../../../assets/images/img1.png";
import img2 from "../../../../../assets/images/img2.jpg";
import img3 from "../../../../../assets/images/ff.jpeg"
import img4 from "../../../../../assets/images/img4.jpeg";
import IntlMessages from "../../../../../util/IntlMessages";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
 import AddInscriptionTraining1 from "./AddInscriptionTraining1";
 const useStyles = makeStyles((theme) => ({
  button1: {
    marginBottom: "7px",
    marginRight: "5%",
    borderRadius: "20px",
    textTransform: "none",
    padding: "5px 1àpx 5px 10px",
  },
  button2: {
    marginBottom: "7px",
    borderRadius: "20px",
    textTransform: "none",
  },
}));
export default function OnlineTrainingItem(props) {
  const classes = useStyles();
  const [favoris] = useState(false);
  const [isOpen,setIsOpen]=useState(false)
   var things = [img1, img2, img3, img4];
  var thing = things[Math.floor(Math.random() * things.length)];
  const data = props.data;

 const openInscriptionModal=()=>{
  setIsOpen(!isOpen)
 }
 
  return (
   
    <div className="card package bg-white shadow">
      <div className="package-items">
        <div>
          <img
            src={data.img==="img2" ? img2: data.img==="img1"? img1: img3}
            alt="formation"
            style={{ width: "100%", height: "200px" }}
          />
        </div>
        <ul className="package-items package-items text-grey text-darken-3">
          <li>
            <div style={{ fontSize: "20px", color: "orange" }}>
              <strong>{data.theme} </strong>
              <br />
              {data.title}
            </div>
          </li>
          <li>
            <div className="d-flex justify-content-start">
              <strong>
                <IntlMessages id="trainer " />
              </strong>
              <pre> </pre>
              {data.trainer}
            </div>
            <div className="d-flex justify-content-start">
              <strong>
              {data.formation}
              </strong>
              <pre> </pre>
              
            </div>
            <div className="d-flex justify-content-start">
              <strong>
                <IntlMessages id="start.date" />{" "}
              </strong>
              <pre> </pre>
              {data.sessions[0].startDate.toString().slice(4, 16)}
            </div>
            <div className="d-flex justify-content-start">
              <strong>
                <IntlMessages id="duration" />
              </strong>
              <pre> </pre>
              {data.numberDay + " jours"}
            </div>
            <div>{data.description}</div>
          </li>
        </ul>
      </div>
      <div className="package-footer">
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button1}
          >
            <IntlMessages id="show.more" />
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            className={classes.button2}
            onClick={openInscriptionModal}
          >
            <IntlMessages id="register" />
          </Button>
          <IconButton
            variant="outlined"
            aria-label="delete"
            className={classes.extendedIcon}
          >
            {favoris ? (
              <FavoriteIcon color="secondary" />
            ) : (
              <FavoriteBorderOutlinedIcon color="primary" />
            )}
            {/* secondary */}
          </IconButton>
        </div> {isOpen && (<AddInscriptionTraining1 openInscriptionModal={openInscriptionModal}/>)}
      </div>
    </div>
  );
}
