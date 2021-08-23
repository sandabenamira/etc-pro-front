import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from "@material-ui/core/colors";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";
import AgenceItems from "./AgenceItems";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import ArchiveIcon from '@material-ui/icons/Archive';
import IntlMessages from "../../../../../util/IntlMessages";

function createData(agence, type, gouvernerat, adresse, email, fax, Ntel,) {
  return { agence, type, gouvernerat, adresse, email, fax, Ntel, };
}

const rows = [

  createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
  createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
  createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
  createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
  createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
];


export default class ArchiveAgence extends Component {
  render() {
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
          <div className="p-2 col-md-2 col-sm-1 col-lg-1">

          </div>

          <div className=" p-2 col-md-2 col-sm-2 col-lg-2">
            <div className="p-2">
              <Button
                variant="contained"
                color="primary"
                style={{
                  borderRadius: "40px",
                  fontSize: "15px", fontFamily: "sans-serif",
                  width: "150px", height: "40px"
                }}
              >
                <IntlMessages id="sort.by" />
                <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
              </Button>
            </div>
          </div>

          <div className="p-2 col-md-2 col-sm-2 col-lg-2">
            <Paper
              component="form"
              className="d-flex flex-row"
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                borderRadius: "100px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#565C79",
              }}
            >
              <IconButton aria-label="search">
                <SearchIcon style={{ marginRight: "-100%", color: "#565C79" }} />
              </IconButton>
              <InputBase
                style={{
                  marginLeft: "5%",
                  flex: 1,
                  fontWeight: "bold",
                }}
                placeholder="Recherche ..."
                inputProps={{ "aria-label": "search google maps" }}
              />
            </Paper>

          </div>

          <div className="p-2 ml-auto ">
            <div className="d-flex justify-content-start align-items-center">
              <Fab
                size="small"

                aria-label="Add"
                onClick={this.props.openAddAgence}
              >
                { }
                <AddIcon style={{ color: orange[500] }} />
              </Fab>
              &nbsp;&nbsp;&nbsp;
              <div style={{ fontSize: "25px", color: "orange" }}>
                <IntlMessages id="add.agency" />
              </div>
            </div>
          </div>

        </div>

        <table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 15px" }} >
          <thead>
            <tr style={{ paddingBottom: "10px", textAlign: "start", }}>

              <th style={{ borderBottom: "0", borderTop: "0" }} >
                <IntlMessages id="agency" /></th>
              <th style={{ borderBottom: "0", borderTop: "0" }} >
                <IntlMessages id="type" /></th>
              <th style={{ borderBottom: "0", borderTop: "0" }} >
                <IntlMessages id="governorate" /></th>
              <th style={{ borderBottom: "0", borderTop: "0" }} >
                <IntlMessages id="address" /></th>
              <th style={{ borderBottom: "0", borderTop: "0" }} >
                <IntlMessages id="mail" /></th>
              <th style={{ borderBottom: "0", borderTop: "0" }} >
                <IntlMessages id="fax" /></th>
              <th style={{ borderBottom: "0", borderTop: "0" }} >
                <IntlMessages id="tel" /></th>
              <th style={{ borderBottom: "0", borderTop: "0" }} >

              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <AgenceItems
                agence={row.agence}
                type={row.type}
                gouvernerat={row.gouvernerat}
                adresse={row.adresse}
                email={row.email}
                fax={row.fax}
                Ntel={row.Ntel}

              />
            ))}
          </tbody>
        </table>
        <br />

        <div className="p-2 ml-auto ">
          <div className="d-flex justify-content-start align-items-center">
            <IconButton aria-label="delete" style={{ color: "#616A6B", }}>
              <ArchiveIcon onClick={<ArchiveAgence />} backgroundColor="white" />
            </IconButton>
            <div style={{ fontSize: "19px", color: "#616A6B" }}>
              <IntlMessages id="archive" /> (2)
            </div>
          </div>
        </div>

      </div>

    );
  }
}
