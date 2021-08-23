import React, { Component } from 'react'

import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VerticalAlignBottomOutlinedIcon from "@material-ui/icons/VerticalAlignBottomOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";

import AccessibilityIcon from '@material-ui/icons/Accessibility';

import SatisfactionChart from './SatisfactionChart';

export default class ReportingFinancier extends Component {
    render() {
        return (
            <div className="app-wrapper ">
                <div className="d-flex flex-column col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12" style={{ marginBottom: "5%", }} >
                        <div className="p2">
                            <h1
                                style={{
                                    color: "#484cb4",

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

                    <div className="d-flex flex-wrap col-lg-12 col-md-12  col-sm-12">
                        {/* -- LEFT SIDE --*/}
                        <div className="d-flex flex-column col-lg-6 col-md-12 col-sm-12" style={{ height: "100%" }}>
                            <div className="d-flex flex-row col-lg-12 col-md-12 col-sm-6" >
                                <div className="col-lg-6 col-md-6 col-sm-12">donut chart</div>
                                <div className="d-flex flex-row justify-content-center col-lg-6 col-md-6 col-sm-12" >
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
                                    <div className="p-2 m-2 d-flex flex-column col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center', height: '60px' }}>
                                        <AccessibilityIcon style={{ color: '#3F51B5', fontSize: '5vw' }}></AccessibilityIcon>
                                        <div style={{ color: '#3F51B5', fontSize: '1.1vw' }}>Employé</div>
                                        <div style={{ color: '#3F51B5', fontSize: '1.4vw' }}>10%</div>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex flex-row col-lg-12 col-md-12 col-sm-6" >
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
                                                <div className="p-2 col-lg-6 col-md-6 col-sm-6" style={{ border: "solid 1px black", borderRadius: "50%" }}>
                                                    5%
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* -- RIGHT SIDE --*/}
                        <div className="d-flex flex-column p-2 col-lg-6 col-md-12 col-sm-12" style={{ height: "100%" }}>
                            <div className="p-2 col-lg-12 col-md-12 col-sm-12" style={{
                                color: "#49759b",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}>
                                Niveau de satisfaction :
                            </div>
                            <div className="d-flex flex-row col-lg-12 col-md-12 col-sm-12" style={{paddingLeft:"4px"}}>
                                <div className="col-lg-6 col-md-6 col-sm-6" style={{paddingLeft:"4px"}} >
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",marginBottom: "12px",marginTop: "12px"}}>La relation avec le formateur</div>
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",marginBottom: "12px",marginTop: "12px"}}>Les méthodes utilisées</div>
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",marginBottom: "12px",marginTop: "12px"}}>Le rythme de la formation</div>
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",marginBottom: "12px",marginTop: "12px"}}>Les moyens pédagogiques</div>
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",marginBottom: "12px",marginTop: "12px"}}>L'animation</div>
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",marginBottom: "12px",marginTop: "12px"}}>L'organisation matérielle</div>
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",marginBottom: "12px",marginTop: "12px"}}>L'aide reçue en cas de besoin</div>
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",marginBottom: "12px",marginTop: "12px"}}>Les échanges dans le groupe</div>
                                    <div style={{height: "20px",color: "#53869e",fontSize:"16px",fontWeight:"bold",marginBottom: "12px",marginTop: "12px"}}>Combien cette formation Vous a appris</div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6"><SatisfactionChart></SatisfactionChart></div>
                            </div>

                            <div className="p-2 col-lg-12 col-md-12 col-sm-12" style={{
                                color: "#49759b",
                                fontSize: "16px",
                                marginTop:"8%"
                            }}>
                                Commentaires :
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
