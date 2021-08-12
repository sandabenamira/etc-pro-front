import React, { Component } from 'react';

import UserListItem from './UserListItem';

import Avatar from '@material-ui/core/Avatar';

function createData(photo, nom, prenom, role, email, Ntel, ) {
    return { photo, nom, prenom, role, email, Ntel,  };
  }
  
  const rows = [
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> ,
    createData('ML', 'Med Ouni', 9.0, 37, 4.3 ,2,'Rentable'),
    createData('Marketing', 'Med Ouni', 16.0, 24, 5, 3,'Rentable'),
    createData('Business', 'Med Ouni', 37, 67, 4.3, 5,'Rentable'),
  ];
  

export default class UserList extends Component {
    render(){
        return(
            <table class="table" style={{borderCollapse: "separate",
                borderSpacing:"0 15px"}} >
                <thead>
                    <tr style={{paddingBottom: "10px", textAlign:"center"}}>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            photo</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            nom</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            prenom</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            role de Formation</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            email</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            N tél</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} scope="col">
                            </th>
                    </tr>
                </thead>
                    <tbody>
                    {rows.map((row) => (
                        <UserListItem nom={row.nom}
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

