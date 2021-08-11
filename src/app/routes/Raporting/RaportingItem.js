import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';

import Avatar from "@material-ui/core/Avatar";
import moment from "moment";



const RaportingItem =({nom,formateur,participants,frais,charges,revenu,rentabilite}) =>
        <tr style={{backgroundColor :"#DCDCDC"}}>
            <th scope="row" 
            style = {{borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px"
            ,display:"flex", flexDirection: "row", textAlign: "center"}}>
                <Avatar
                    className={"size-40 mr-3"}
                    style={{ fontSize: 11, background: "#00b4d8" }}>
                        {moment().format("DD")}
                        <br />
                        {moment().format("MMM")}
                    </Avatar>
                {nom}
            </th>
            <td style={{textAlign: "center"}}>{formateur}</td>
            <td style={{textAlign: "center"}}>{participants}</td>
            <td style={{textAlign: "center"}}>{frais}</td>
            <td style={{textAlign: "center"}}>{charges}</td>
            <td style={{textAlign: "center"}}>{revenu}</td>
            <td style = {{borderTopRightRadius: "10px", borderBottomRightRadius: "10px",
             textAlign:"center"}}>{rentabilite}</td>
        </tr>

export default RaportingItem
