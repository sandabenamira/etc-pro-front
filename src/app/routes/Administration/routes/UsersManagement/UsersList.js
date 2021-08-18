import React, { Component } from 'react';

import UserListItem from './UserListItem';



function createData(photo, nom, prenom, role, email, Ntel, ) {
    return { photo, nom, prenom, role, email, Ntel,  };
  }
  
  const rows = [
   
    createData('Achoura', 'Ahmed','Responsable Formation', 'aa@jj.com', 9548745555 ),
    createData('Ouni', 'Med ', 'chef du projet', 'oo@fef.com', 454184154 ),
    createData('Béji', 'Fatma', "chef d'équipe", 'ff@gdnj.com',5445484455),
    createData('Ben', 'sami','Responsable Marketing', 'aadeded@jj.com', 9548745555 ),
    createData('salem', 'Ahmed','ouvrier', 'accfva@jj.com', 9548745555 ),
  ];
  

export default class UserList extends Component {
    render(){
        return(
            <table className="table" style={{borderCollapse:"separate",borderSpacing:"0 15px"}} >
                <thead>
                    <tr style={{paddingBottom: "10px", textAlign:"start",}}>
                        <th style={{borderBottom: "0", borderTop: "0"}} >
                            photo</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} >
                            nom</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} >
                            prenom</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} >
                            role </th>
                        <th style={{borderBottom: "0", borderTop: "0"}} >
                            email</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} >
                            N tél</th>
                        <th style={{borderBottom: "0", borderTop: "0"}} >
                       
                            </th>
                    </tr>
                </thead>
                    <tbody>
                    {rows.map((row) => (
                        <UserListItem 
                        photo={row.photo} 
                        nom={row.nom}
                        prenom={row.prenom} 
                        role={row.role} 
                        email={row.email} 
                        Ntel={row.Ntel}
                        
                        />
                    ))}
                    </tbody>
                </table>
               
        );
    }



  
}

