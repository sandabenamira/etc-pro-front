import React from 'react';

import Avatar from "@material-ui/core/Avatar";
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';




const UserListItem =({photo,nom,prenom,role,email,Ntel,}) =>

        <tr style={{backgroundColor :"#F5F5F5",borderRadius: "15px"}}>
            <th scope="row" 
            style = {{
            display:"flex", flexDirection: "row", textAlign: "center"}}>
                <div >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </div>
                
            </th>
            <td style={{textAlign: "start"}}>{photo}</td>
            <td style={{textAlign: "start"}}>{nom}</td>
            <td style={{textAlign: "start"}}>{prenom}</td>
            <td style={{textAlign: "start"}}>{role}</td>
            <td style={{textAlign: "start"}}>{email}</td>
            <td style = {{
             textAlign:"center"}}>{Ntel}
              <div className="package-footer d-flex justify-content-around " >
        
        <IconButton aria-label="delete"  style={{color:"#FFFFFF",backgroundColor:"#3F51B5",width:"28px",height:"28px"}}>
          
            <VisibilityOutlinedIcon/>
            
            
            
          </IconButton>
          
          
          <IconButton aria-label="delete"  style={{color:"#FFFFFF",backgroundColor:"#F15381",width:"28px",height:"28px"}}>
            <CreateIcon  />
          </IconButton>
          <IconButton aria-label="delete"  style={{color:"#FFFFFF",backgroundColor:"#F9972D",width:"28px",height:"28px"}}>
            <DeleteOutlineRoundedIcon backgroundColor="white"/>
          </IconButton>
        
          
          
        </div>
        </td>
        </tr>
        
        

export default UserListItem 
