import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';


const AgenceItems = ({ agence, type, gouvernerat, adresse, email, fax, Ntel, }) =>

    <tr style={{ backgroundColor: "#F5F5F5", borderRadius: "15px" }}>
        <td style={{ textAlign: "start" }}>{agence}</td>
        <td style={{ textAlign: "start" }}>{type}</td>
        <td style={{ textAlign: "start" }}>{gouvernerat}</td>
        <td style={{ textAlign: "start" }}>{adresse}</td>
        <td style={{ textAlign: "start" }}>{email}</td>
        <td style={{ textAlign: "start" }}>{fax}</td>
        <td style={{ textAlign: "start" }}>{Ntel}</td>
        <td>
            <div className="package-footer d-flex justify-content-around " >


                <IconButton aria-label="delete" style={{ color: "#FFFFFF", backgroundColor: "#3BBDD5", width: "28px", height: "28px" }}>
                    <CreateIcon />
                </IconButton>
                <IconButton aria-label="delete" style={{ color: "#FFFFFF", backgroundColor: "#F15381", width: "28px", height: "28px" }}>
                    <DeleteOutlineRoundedIcon backgroundColor="white" />
                </IconButton>
            </div>
        </td>
    </tr>

export default AgenceItems