import React from "react";


import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import img1 from '../../../../../assets/images/img1.jpg';
import img2 from '../../../../../assets/images/img2.jpeg';
import img3 from '../../../../../assets/images/img3.jpeg';
import img4 from '../../../../../assets/images/img4.jpeg';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
export default function Item() {
    const classes = useStyles();
    var things = [img1, img2, img3, img4];
    var thing = things[Math.floor(Math.random() * things.length)];
  return (
    <div className="card package bg-white shadow">
      <div
        className="package-header  lighten-1 text-white"
       
      >
        
        <img src={thing} alt="Moocs" style={{ width: '100%', height: '150px' }} />
        <div style={{ fontSize: "30px", color: "orange",fontWeight: "bold" ,textAlign:"center"}}>
            Management
          </div>
      </div>
      
     <div className="package-items">
         
     
      <div
        className="package-items package-items text-grey text-darken-3" 
      >
        
          <div style={{fontWeight:"bold"}} >
            <strong> Ajouté par  : </strong> &nbsp; Mohamed Hosni
          </div>
          <div style={{fontWeight: "bold"}}>
            <strong> Ajouté le : </strong> &nbsp; 01/06/2021
          </div>
          <div style={{fontWeight: "bold"}}>
            <strong> Déstiné aux :</strong> &nbsp; Managers
          </div>
          <div>
            
          </div>
          <div><br/>
          Lorem ipsum dolor sit amet,
          consectetuer adipiscing elit,sed diam
          nonummy nibh euismodtincidunt ut
          </div>
        
        </div>
      </div>
      <div className="package-footer" >
        
      <IconButton aria-label="delete" className={classes.margin} style={{color:"#FFFFFF",backgroundColor:"#3F51B5",width:"30px",height:"30px"}}>
        
          <VisibilityOutlinedIcon/>
          
          
          
        </IconButton>
        
        
        <IconButton aria-label="delete" className={classes.margin} style={{color:"#FFFFFF",backgroundColor:"#F15381",width:"30px",height:"30px"}}>
          <CreateIcon  />
        </IconButton>
        <IconButton aria-label="delete" className={classes.margin} style={{color:"#FFFFFF",backgroundColor:"#F9972D",width:"30px",height:"30px"}}>
          <DeleteOutlineRoundedIcon backgroundColor="white"/>
        </IconButton>
      
        
        
      </div>
      
      
    </div>
    
  
  );
}
