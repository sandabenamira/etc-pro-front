import React, { Component } from 'react';

import RaportingItem from './RaportingItem';

//import { makeStyles } from '@material-ui/core/styles';


function createData(nom, formateur, participants, frais, charges, revenu, rentabilite) {
    return { nom, formateur, participants, frais, charges, revenu, rentabilite };
  }
  
  const rows = [
    createData('AI', 'Med Ouni', 6.0, 24, 4.0,1,'Rentable'),
    createData('ML', 'Med Ouni', 9.0, 37, 4.3 ,2,'Rentable'),
    createData('Marketing', 'Med Ouni', 16.0, 24, 6.0, 3,'Rentable'),
    createData('Business', 'Med Ouni', 37, 67, 4.3, 5,'Rentable'),
  ];
  

export default class RaportingList extends Component {
    render(){
        return(
            <table class="table" style={{borderCollapse: "separate",
                borderSpacing:"0 15px"}} >
                <thead>
                    <tr style={{paddingBottom: "10px", textAlign:"center"}}>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            Formation</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            Formateur</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            Participants</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            Frais de Formation</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            Charges</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            Revenu</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            Statut</th>
                    </tr>
                </thead>
                    <tbody>
                    {rows.map((row) => (
                        <RaportingItem nom={row.nom}
                        formateur={row.formateur} 
                        participants={row.participants} 
                        frais={row.frais} 
                        charges={row.charges} 
                        revenu={row.revenu}
                        rentabilite={row.rentabilite}
                        />
                    ))}
                    </tbody>
                </table>
        );
    }



  
}
const mapStateToProps = state => {
    return {};
  };
  

