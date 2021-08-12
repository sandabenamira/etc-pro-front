import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import UsersList from "./UsersList";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

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
            <div className="p2">
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
          <div className="d-flex flex-row col-lg-12 col-md-12 col-sm-12 mt-2 justify-content-around ">
            
            {/* -- Bouttons roles rechercher --*/}
            <div className="d-flex justify-content-center flex-row mt-4 ">
              <div className="col-lg-10 col-md-11 col-sm-12 d-flex flex-wrap  flex-row  ">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "15px",
                    fontSize: "15px",
                    fontWeight: "bold"

                  }}
                >
                  Tous les Roles

                  <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
                </Button>
                
              </div>
            </div>
            <div className="p-2 ml-5 col-md-3 col-sm-2 col-lg-2">
            <TextField
              id="search"
              name="search"
              label="Rechercher ..."
              size="small"
              style={{borderRadius:15}}
              
              margin="normal"
              fullWidth
              variant="outlined"
              InputProps={{
                
              }}
            />
          </div>
          <div className="p-2 ml-auto ">
            <div className="d-flex justify-content-start align-items-center">
              
              
                
                <AddCircleOutlineOutlinedIcon style={{ color: orange[500] }} />
              
              &nbsp;&nbsp;&nbsp;
              <div style={{ fontSize: "25px", color: "orange" }}>
                Ajouter un Utilisateur
              </div>
            </div>
          </div>
          
          </div>
          <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
            <UsersList />
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
