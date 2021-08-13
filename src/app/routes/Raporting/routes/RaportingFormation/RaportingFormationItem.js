import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';

import Avatar from "@material-ui/core/Avatar";
import moment from "moment";



const RaportingFormationItem = ({ nom, formateur, participants, frais, charges, revenu, rentabilite }) =>
    <tr style={{ backgroundColor: "#f6f6f6" }}>
        <th scope="row"
            style={{
                borderTopLeftRadius: "15px", borderBottomLeftRadius: "15px"
                , display: "flex", flexDirection: "row", textAlign: "center"
                , borderTop: "1px solid #f6f6f6",
            }}>
            <Avatar
                className={"size-40 mr-3"}
                style={{ fontSize: 11,   background: "#00b4d8" }}>
                {moment().format("DD")}
                <br />
                {moment().format("MMM")}
            </Avatar>
            {nom}
        </th>
        <td style={{ textAlign: "center", borderTop: "1px solid #f6f6f6", }}>{formateur}</td>
        <td style={{ textAlign: "center", borderTop: "1px solid #f6f6f6", }}>{participants}</td>
        <td style={{ textAlign: "center", borderTop: "1px solid #f6f6f6", }}>{frais}</td>
        <td style={{ textAlign: "center", borderTop: "1px solid #f6f6f6", }}>{charges}</td>
        <td style={{ textAlign: "center", borderTop: "1px solid #f6f6f6", }}>{revenu}</td>
        <td style={{
            borderTopRightRadius: "15px", borderBottomRightRadius: "15px",
            textAlign: "center", borderTop: "1px solid #f6f6f6",
        }}>{rentabilite}</td>
    </tr>

export default RaportingFormationItem
