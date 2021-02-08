import React, { Component } from 'react';
import FinancialReportingItem from './FinancialReportingItem';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
let counter = 0;

function createData(name, Type, Formateur, Cabinet, Participants, Lieu, Prix, Coût, remboursement) {
  counter += 1;
  return {
    id: counter,
    name,
    Type,
    Formateur,
    Cabinet,
    Participants,
    Lieu,
    Prix,
    Coût,
    remboursement,
  };
}

class FinancialReportingList extends Component {
  state = {
    data: [
      createData(
        'Prise de parole',
        'Inter Entreprise',
        'YOUNSSI Sami',
        'FOPEX',
        '8',
        'Tunis',
        '1000DT',
        '8000DT',
        '3840DT'
      ),
      createData(
        'Négociation',
        'Inter Entreprise',
        'HAMMEMI Houssem',
        'FOPEX',
        '10',
        'Sousse',
        '2250DT',
        '22500DT',
        '4200DT'
      ),
      createData(
        'Comptabilté bancaire',
        'Intra Entreprise',
        'MAHMOUDI Salim',
        'CIFOC',
        '13',
        'Tunis',
        '3000DT',
        '39000DT',
        '8450DT'
      ),
      createData(
        'Management',
        'Inter Entreprise',
        'MAHMOUDI Salim',
        'ABF',
        '10',
        'Tunis',
        '2500DT',
        '250000DT',
        '8450DT'
      ),
      createData(
        'E-Learning',
        'Inter Entreprise',
        'Sami Salim',
        'ABF',
        '5',
        'Tunis',
        '800DT',
        '4000DT',
        '2200DT'
      ),
    ],
  };

  render() {
    const { data } = this.state;
    return (
      <div className="table-responsive-material">
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>Formation </TableCell>
              <TableCell>Type </TableCell>
              <TableCell>Formateur </TableCell>
              <TableCell>Cabinet de formation </TableCell>
              <TableCell>Participants </TableCell>
              <TableCell>Lieu </TableCell>
              <TableCell>Prix unitaire </TableCell>
              <TableCell>Coût </TableCell>
              <TableCell>Remboursement </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data.map((data) => {
              return <FinancialReportingItem key={data.id} data={data} />;
            })}
              </TableBody>
        </Table>
        {/* <table className="default-table table table-sm table-hover">
          <thead>
            <tr>
              <th> <span style={{fontSize:"20px",color:"blue"}}>Formation</span > </th>
              <th> <span style={{fontSize:"20px",color:"blue"}}>Type</span></th>
              <th><span style={{fontSize:"20px",color:"blue"}}>Formateur</span ></th>
              <th> <span style={{fontSize:"20px",color:"blue"}}>Cabinet de formation</span></th>
              <th> <span style={{fontSize:"20px",color:"blue"}}>Participants</span></th>
              <th> <span style={{fontSize:"20px",color:"blue"}}>Lieu</span></th>
              <th> <span style={{fontSize:"20px",color:"blue"}}>Prix unitaire</span></th>
              <th><span style={{fontSize:"20px",color:"blue"}}>Coût</span></th> 
              <th><span style={{fontSize:"20px",color:"blue"}}>Remboursement</span></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return <FinancialReportingItem key={data.id} data={data} />;
            })}
          </tbody>
        </table> */}
      </div>
    );
  }
}

export default FinancialReportingList;
