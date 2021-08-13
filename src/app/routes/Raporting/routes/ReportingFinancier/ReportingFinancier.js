import React, { Component } from 'react'

import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VerticalAlignBottomOutlinedIcon from "@material-ui/icons/VerticalAlignBottomOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";

import AccessibilityIcon from '@material-ui/icons/Accessibility';

export default class ReportingFinancier extends Component {
    render() {
        return (
            <div className="app-wrapper ">
                <div className="d-flex flex-column col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12" >
                        <div className="p2">
                            <h1
                                style={{
                                    color: "#484cb4",
                                    marginBottom: "5%",
                                    fontSize: "26px",
                                }}
                            >
                                Reporting Formation
                            </h1>
                        </div>
                        {/* -- ICONS --*/}
                        <div className="ml-auto p-2 d-flex flex-row">
                            <VerticalAlignBottomOutlinedIcon
                                style={{
                                    color: "#484cb4",
                                    marginRight: "4%",
                                    cursor: "pointer",
                                }}
                            ></VerticalAlignBottomOutlinedIcon>
                            <PrintOutlinedIcon
                                style={{
                                    color: "#484cb4",
                                    marginRight: "4%",
                                    cursor: "pointer",
                                }}
                            ></PrintOutlinedIcon>
                            <NearMeOutlinedIcon
                                style={{ color: "#484cb4", cursor: "pointer" }}
                            ></NearMeOutlinedIcon>
                        </div>
                    </div>

                    <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
                        {/* -- LEFT SIDE --*/}
                        <div className="d-flex flex-column p-2 col-lg-6 col-md-6 col-sm-12" >
                            <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12 col-sm-6">
                                <div className="p-2 col-lg-6 col-md-6 col-sm-12">donut chart</div>
                                <div className="p-2 d-flex flex-row justify-content-center col-lg-6 col-md-6 col-sm-12">
                                    <div className="p-2 m-2 d-flex flex-column  col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center' }}>
                                        <AccessibilityIcon style={{ color: '#F15381', fontSize: '5vw' }}></AccessibilityIcon>
                                        <div style={{ color: '#F15381', fontSize: '1.1vw' }}>Manager</div>
                                        <div style={{ color: '#F15381', fontSize: '1.4vw' }}>50%</div>
                                    </div>
                                    <div className="p-2 m-2 d-flex flex-column col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center' }}>
                                        <AccessibilityIcon style={{ color: '#F9972D', fontSize: '5vw' }}></AccessibilityIcon>
                                        <div style={{ color: '#F9972D', fontSize: '1.1vw' }}>Haut Cadre</div>
                                        <div style={{ color: '#F9972D', fontSize: '1.4vw' }}>25%</div>
                                    </div>
                                    <div className="p-2 m-2 d-flex flex-column col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center' }}>
                                        <AccessibilityIcon style={{ color: '#3BBDD5', fontSize: '5vw' }}></AccessibilityIcon>
                                        <div style={{ color: '#3BBDD5', fontSize: '1.1vw' }}>Cadre</div>
                                        <div style={{ color: '#3BBDD5', fontSize: '1.4vw' }}>15%</div>
                                    </div>
                                    <div className="p-2 m-2 d-flex flex-column col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center' }}>
                                        <AccessibilityIcon style={{ color: '#3F51B5', fontSize: '5vw' }}></AccessibilityIcon>
                                        <div style={{ color: '#3F51B5', fontSize: '1.1vw' }}>Employé</div>
                                        <div style={{ color: '#3F51B5', fontSize: '1.4vw' }}>10%</div>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12 col-sm-6" >
                                <div className="p-2 col-lg-6 col-md-6 col-sm-12">column chart</div>
                                <div className="p-2 d-flex flex-column col-lg-6 col-md-6 col-sm-12" >
                                    <div className="p-2 d-flex flex-column col-lg-12 col-md-12 col-sm-12" style={{ alignItems: 'center' }}>
                                        <h2 style={{
                                            marginBottom: "2%",
                                            color: 'rgb(72, 76, 180)',
                                        }}>Assiduité</h2>
                                        <div className="p-2 d-flex flex-row col-lg-12 col-md-12 col-sm-12" >
                                            <div className="p-2 d-flex flex-row col-lg-6 col-md-6 col-sm-6">
                                                <div className="p-2 col-lg-6 col-md-6 col-sm-6">
                                                    Abscence
                                                </div>
                                                <div className="p-2 col-lg-6 col-md-6 col-sm-6" style={{}}>
                                                    10%
                                                </div>
                                            </div>
                                            <div className="p-2 d-flex flex-row col-lg-6 col-md-6 col-sm-6">
                                                <div className="p-2 col-lg-6 col-md-6 col-sm-6">
                                                    Retard
                                                </div>
                                                <div className="p-2 col-lg-6 col-md-6 col-sm-6" style={{border: "solid 1px black", borderRadius:"50%"}}>
                                                    5%
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* -- RIGHT SIDE --*/}
                        <div className="d-flex flex-column p-2 col-lg-6 col-md-6 col-sm-12" style={{ backgroundColor: "Black" }}>
                            <div className="p-2">Satifsaction chart</div>
                            <div className="p-2">commentss</div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
