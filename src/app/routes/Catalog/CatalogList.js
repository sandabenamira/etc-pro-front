import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from '@material-ui/core/colors';
import CatalogItem from "./CatalogItem";

export default class CatalogList extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row flex-wrap">
          <div className="p-2 col-md-2 col-sm-1 col-lg-1">
            <TextField
              className="textfield"
              id="level_id"
              //   onChange={this.props.handleChangeLevel(
              //     "level_id"
              //   )}
              select
              label="Filtrer par"
              //   value={this.props.values.level_id}
              SelectProps={{}}
              margin="normal"
              fullWidth
              variant="outlined"
              size="small"
            >
              {/* {this.props.levels.map((level) => (
                                    <MenuItem key={level.id} value={level.id}>
                                      {level.name}
                                    </MenuItem>
                                  ))} */}
            </TextField>
          </div>
          <div className="p-2 ml-5 col-md-3 col-sm-2 col-lg-2">
            <TextField
              id="search"
              name="search"
              label="Rechercher ..."
              size="small"
              //   onChange={this.props.handleChangeSearchTicket(
              //     "nameForHistory"
              //   )}
              //   value={nameForHistory}
              margin="normal"
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="zmdi zmdi-search" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="p-2 ml-auto ">
            <div className="d-flex justify-content-start align-items-center">
              <Fab
                size="small"
                // color="primary"
                aria-label="Add"
                // onClick={this.props.openAddModal}
              >
                {/* {this.props.values.open ? (
                          <RemoveSharpIcon />
                        ) : (
                          <AddIcon />
                        )} */}
                <AddIcon style={{ color: orange[500] }} />
              </Fab>
              &nbsp;&nbsp;&nbsp;
              <div style={{fontSize:"25px" , color:"orange"}} >
               Ajouter une formation
              </div  >
              
            </div>
          </div>
        </div>
        <div className="p-2 price-tables row pt-default d-flex justify-content-start ">
            {    [1,2,3,4,5].map((element, index) => (
              <div className="col-md-6 col-lg-3 col-sm-6 " key={index}>
                <CatalogItem
                  key={index}
                
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
}
