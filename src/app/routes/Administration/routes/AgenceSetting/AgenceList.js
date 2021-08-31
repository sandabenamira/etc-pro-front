import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from "@material-ui/core/colors";
import AgenceItems from "./AgenceItem";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IntlMessages from "../../../../../util/IntlMessages";

function createData(agence, type, gouvernerat, adresse, email, fax, Ntel,) {
    return { agence, type, gouvernerat, adresse, email, fax, Ntel, };
}

const rows = [

    createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
    createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
    createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
    createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
    createData('Agence Nabeul', 'Mixte', 'Nabeul', 'Avenue Habib Bourguiba', 'Biat00@biat.com.tn', 71234567, 954874555),
];


export default class AgenceList extends Component {
    render() {
        return (
            <div className="d-flex flex-column">
                <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12 col-sm-12">

                    <div className=" col-lg-2 col-md-6 d-flex flex-wrap">
                        <div className="p-2">

                            <FormControl variant="outlined" >
                                <InputLabel htmlFor="outlined-age-native-simple">
                                    <IntlMessages id="gestion.agence.sort.by" />
                                </InputLabel>
                                <Select
                                    native

                                    color="primary"
                                    style={{
                                        borderRadius: "30px",
                                        fontSize: "15px",
                                        fontFamily: "sans-serif",
                                        width: "150px",
                                        height: "50px",
                                        textTransform: "capitalize",
                                        backgroundColor: "primary",
                                    }}
                                >
                                    <option ></option>
                                    <option >Type</option>
                                    <option >Gouvernerat</option>
                                </Select>
                            </FormControl>



                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 d-flex flex-wrap align-items-center m-2">
                        <Paper
                            component="form"
                            className="d-flex flex-row"
                            style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                borderRadius: "100px",
                                borderStyle: "solid",
                                borderWidth: "1px",
                                borderColor: "#565C79",
                            }}
                        >
                            <IconButton aria-label="search">
                                <SearchIcon style={{ marginRight: "-100%", color: "#565C79" }} />
                            </IconButton>
                            <InputBase
                                style={{
                                    marginLeft: "5%",
                                    flex: 1,
                                    fontWeight: "bold",
                                }}
                                placeholder="Recherche ..."
                                inputProps={{ "aria-label": "" }}
                            />
                        </Paper>

                    </div>

                    <div className="p-2 ml-auto ">
                        <div className="d-flex justify-content-start align-items-center">
                            <Fab
                                size="small"

                                aria-label="Add"
                                onClick={this.props.openAddAgence}
                            >
                                { }
                                <AddIcon style={{ color: orange[500] }} />
                            </Fab>
                            &nbsp;&nbsp;&nbsp;
                            <div style={{ fontSize: "25px", color: "orange" }}>
                                <IntlMessages id="gestion.agence.add.agency" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="table-responsive">
                    <table className="table" style={{ borderCollapse: "separate", borderSpacing: "0 15px" }} >
                        <thead>
                            <tr style={{ paddingBottom: "10px", textAlign: "start", }}>

                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    <IntlMessages id="gestion.agence.agency" /></th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    <IntlMessages id="gestion.agence.type" /></th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    <IntlMessages id="gestion.agence.governorate" /></th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    <IntlMessages id="gestion.agence.address" /></th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    <IntlMessages id="gestion.agence.mail" /></th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    <IntlMessages id="gestion.agence.fax" /></th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >
                                    <IntlMessages id="gestion.agence.tel" /></th>
                                <th style={{ borderBottom: "0", borderTop: "0" }} >

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <AgenceItems
                                    agence={row.agence}
                                    type={row.type}
                                    gouvernerat={row.gouvernerat}
                                    adresse={row.adresse}
                                    email={row.email}
                                    fax={row.fax}
                                    Ntel={row.Ntel}

                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}