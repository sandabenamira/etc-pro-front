import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import UsersList from "./UsersList";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { orange } from "@material-ui/core/colors";


export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    

    return (
      <div className="app-wrapper ">
        <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
          <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
            <div className="p-2">
              <h1
                style={{
                  color: "#484cb4",
                  marginBottom: "5%",
                  fontSize: "26px",
                }}
              >
                Gestion des Utilisateurs
              </h1>
            </div>
            
          </div>
          <div className="d-flex justify-content-around">
          <div className="p-2">
          <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "40px",
                    fontSize: "15px", fontFamily:"sans-serif",
                    fontWeight: "bold",width:"200px",height:"40px"

                  }}
                  
                >
                  
                  Tous les Roles

                  <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
                </Button>
                




          </div>


         
  <div className="p-2 justify-content-reverse  " >
  
  <div className="search-box  ">
  <div className="package-footer " >
  
          <IconButton  style={{color:"blue",}} >
          
        <SearchRoundedIcon  style={{color:"blue",borderColor: "coral"}}/>
         Recherche...
         
        </IconButton>
       
        
        
     </div>   
     
    
    </div>
   
  
             
                
             
              
            
            
  
  
  
  
  
  
  </div>




  <div className="p-2">
  <div className="d-flex ">
              
              <Button>
                
                <AddCircleOutlineOutlinedIcon style={{ color: orange[500] }} />
              
              &nbsp;&nbsp;&nbsp;
              <div style={{ fontSize: "25px", color: "orange" ,fontWeight:"bold",fontFamily:"sans-serif"}}>
                Ajouter un Utilisateur
              </div>
              </Button>
            </div>



  </div>





          </div>
          <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
            <UsersList />
          </div>
          </div>
          <div className="d-flex flex-row-reverse p-2 col-lg-10 col-md-12 col-sm-12 mt-4">
          <div className="d-flex "style=
          {{color: "#A4A4A4", fontWeight: "bold", textAlign:"center",fontSize:"20px"}}>
            <IconButton aria-label="delete"  style={{color:"#A4A4A4",backgroundColor:"#FFFFFF",width:"40px",height:"40px"}}>
          <DeleteOutlineRoundedIcon backgroundColor="white"/>
        </IconButton>
                <div className="p-2">Archive (5)</div>
                </div>
              </div>
          </div>
        
     
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(User);
