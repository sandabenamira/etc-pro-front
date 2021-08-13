import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from "@material-ui/core/colors";
import OnlineTrainingItem from "./OnlineTrainingItem";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "../../../../../util/IntlMessages";

export default class OnlineTrainingList extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row flex-wrap">
          <div className="p-2 col-md-2 col-sm-1 col-lg-1">
            <TextField
              className="textfield"
              id="level_id"
              style={{ borderRadius: 15 }}
              select
              label="Filtrer par"
              SelectProps={{}}
              margin="normal"
              fullWidth
              variant="outlined"
              size="small"
            >
              {[
                { id: 1, name: "plus récent" },
                { id: 2, name: "Favoris" },
                { id: 3, name: "Inscription" },
              ].map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="p-2 ml-5 col-md-3 col-sm-2 col-lg-2">
            <TextField
              id="search"
              name="search"
              label="Rechercher ..."
              size="small"
              style={{ borderRadius: 15 }}
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
                aria-label="Add"
                onClick={this.props.openAddTraining}
              >
                <AddIcon style={{ color: orange[500] }} />
              </Fab>
              &nbsp;&nbsp;&nbsp;
              <div style={{ fontSize: "25px", color: "orange" }}>
                <IntlMessages id="add.formation" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 price-tables row pt-default d-flex justify-content-start ">
          {[1, 2, 3, 4].map((element, index) => (
            <div className="col-md-6 col-lg-3 col-sm-6 " key={index}>
              <OnlineTrainingItem key={index} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
