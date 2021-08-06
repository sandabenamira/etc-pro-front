import React, {Component} from 'react';
import {connect} from 'react-redux';
//import Select from 'react-select'
import './Raporting.css';

//import PrintIcon from '@material-ui/icons/Print';
//import GetAppIcon from '@material-ui/icons/GetApp';
//import SendIcon from '@material-ui/icons/Send';

import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* eslint eqeqeq: "off" */


function createData(nom, formateur, participants, frais, charges, revenu, rentabilite) {
  return { nom, formateur, participants, frais, charges, revenu, rentabilite };
}

const rows = [
  createData('AI', 'Med Ouni', 6.0, 24, 4.0,1,'Rentable'),
  createData('ML', 'Med Ouni', 9.0, 37, 4.3 ,2,'Rentable'),
  createData('Marketing', 'Med Ouni', 16.0, 24, 6.0, 3,'Rentable'),
  createData('Business', 'Med Ouni', 37, 67, 4.3, 5,'Rentable'),
];


/*
const options = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: 'january', label: 'january' }
]*/
export class Raporting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  render() {
    /* eslint eqeqeq: "off" */

    return (
      <div className="app-wrapper raportingFinancier">
        <div style={{ display:"flex", flexDirection: "row"}}>
          <h2 style={{ color:"#484cb4", marginBottom: "40px" }}>Reporting financier</h2>
          
        </div>
        <div className="d-flex mb-3 col-lg-12 col-md-12  col-sm-12">
          <div className="container" style={{ display: "flex", flexDirection: "column" }}>
            <div className="row raportingFinancierRow" style={{height: "110px"}} >
              <div className="col-md-3 col-sm-6">
                <div className="h-100 w-100 d-inline-block raportingFinancierCard" 
                style={{
                  backgroundColor: "#4150b7",
                  }}>
                  **</div>
                </div>
              <div className="col-md-3 col-sm-6">
                <div className="h-100 w-100 d-inline-block raportingFinancierCard" 
                style={{
                  backgroundColor: "#00bbd4",
                  }}>
                  **
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="h-100 w-100 d-inline-block raportingFinancierCard" 
                style={{
                  backgroundColor: "#fe9901",
                  }}>
                  **
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="h-100 w-100 d-inline-block raportingFinancierCard" 
                style={{
                  backgroundColor: "#ff3f80",
                  }}>
                  **
                </div>
              </div>    
            </div>
            <div className="row raportingFinancierRow" >
              <div className="raportingFinancierButtonContainer">
                <div className="raportingFinancierButton">
                  Fitrer par
                </div>
              </div>
              <div className="raportingFinancierButtonContainer">  
                <div className="raportingFinancierButton">Rentabilité</div>
              </div>
            </div> 
            <div classname="raportingFinancierTable">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
              <TableHead>
                <TableRow className="raportingFinancierTable">
                  <TableCell>Formation</TableCell>
                  <TableCell align="right">Formateur</TableCell>
                  <TableCell align="right">participants&nbsp;</TableCell>
                  <TableCell align="right">Frais de formation&nbsp;</TableCell>
                  <TableCell align="right">Charges&nbsp;</TableCell> 
                  <TableCell align="right">Revenu&nbsp;</TableCell>  
                  <TableCell align="right">Rentabilité&nbsp;</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.nom}>
                    <TableCell component="th" scope="row">
                      <div style={{ display:"flex", flexDirection: "row", alignItems:"center" }}>
                        <Avatar
                            className={"size-40 mr-3"}
                            style={{ fontSize: 11, background: "#00b4d8" }}
                          >
                            {moment().format("DD")}
                            <br />
                            {moment().format("MMM")}
                        </Avatar>
                        <div style={{ marginLeft: "15px" }}>  
                          {row.nom}
                        </div>
                    </div>
                    </TableCell>
                    <TableCell align="right">{row.formateur}</TableCell>
                    <TableCell align="right">{row.participants}</TableCell>
                    <TableCell align="right">{row.frais}</TableCell>
                    <TableCell align="right">{row.charges}</TableCell>
                    <TableCell align="right">{row.revenu}</TableCell>
                    <TableCell align="right">{row.rentabilite}</TableCell>
                  </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>  
          
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Raporting);
