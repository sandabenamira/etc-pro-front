import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';


const AgenceItems = ({ agence, type, gouvernerat, adresse, email, fax, Ntel, }) =>

    <tr style={{ backgroundColor: "white", borderRadius: 15 }}>

        <td style={{
            textAlign: "start", 
            flexDirection: "row",
            backgroundColor: "#F5F5F5",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15
        }}>{agence}
        </td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{type}</td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{gouvernerat}</td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{adresse}</td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{email}</td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{fax}</td>
        <td style={{ textAlign: "start", backgroundColor: "#F5F5F5" }}>{Ntel}</td>

        <td style={{ backgroundColor: "#F5F5F5" }}>
            <div className="package-footer d-flex justify-content-around " >


                <IconButton aria-label="delete" style={{ color: "#FFFFFF", backgroundColor: "#3BBDD5", width: "28px", height: "28px" }}>
                    <CreateIcon />
                </IconButton>
                <IconButton aria-label="delete" style={{ color: "#FFFFFF", backgroundColor: "#F15381", width: "28px", height: "28px" }}>
                    <DeleteOutlineRoundedIcon backgroundColor="white" />
                </IconButton>
            </div>
        </td>
        <td
            style={{
                textAlign: "center",
                backgroundColor: "#F5F5F5",
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
            }}
        ></td>
    </tr>

export default AgenceItems