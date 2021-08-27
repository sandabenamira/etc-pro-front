import React, { Component } from 'react'

import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VerticalAlignBottomOutlinedIcon from "@material-ui/icons/VerticalAlignBottomOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";

import SatisfactionChart from './SatisfactionChart';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import CommentSection from './CommentSection';

import pink from '../../../../../assets/images/pinkMan.png';
import orange from '../../../../../assets/images/orangMan.png';
import blue from '../../../../../assets/images/blueMan.png';
import blue2 from '../../../../../assets/images/blue2Man.png';
import femaleIcon from '../../../../../assets/images/woman.png';

import IntlMessages from "../../../../../util/IntlMessages";

export default class ReportingFinancier extends Component {
    render() {
        return (

            <div className="d-flex flex-column col-lg-12 col-md-12 col-sm-12">
                <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12" style={{ marginBottom: "2%", }} >
                    <div className="p2">
                        <h1
                            style={{
                                color: "#484cb4",

                                fontSize: "26px",
                            }}
                        >
                            <IntlMessages id="reporting.formation.title" />
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

                <div className="d-flex flex-wrap col-lg-12 col-md-12  col-sm-12" style={{ padding: "0" }}>
                    {/* -- LEFT SIDE --*/}
                    <div className="d-flex flex-column col-lg-6 col-md-12 col-sm-12" style={{ height: "100%" }}>
                        <div className="d-flex flex-row col-lg-12 col-md-12 col-sm-6" style={{ marginBottom: "15%" }} >
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="d-flex justify-content-center">
                                    <h2 style={{
                                        marginBottom: "5%",
                                        color: '#53869e',
                                    }}><IntlMessages id="reporting.formation.Genre" /></h2>
                                </div>
                                <DonutChart></DonutChart>
                                <div className='d-flex flex-row justify-content-center'>
                                    <img alt='male' src={blue2}></img>
                                    <img alt='female' src={femaleIcon}></img>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '10%' }} >
                                <div className=" m-3 d-flex flex-column  col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center' }}>
                                    <img alt='Manager' src={pink}></img>
                                    <div style={{ color: '#F15381', fontSize: '1.1vw' }}><IntlMessages id="reporting.formation.Manager" /></div>
                                    <div style={{ color: '#F15381', fontSize: '1.4vw' }}>50%</div>
                                </div>
                                <div className="m-3 d-flex flex-column col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center' }}>
                                    <img alt='Haut Cadre' src={orange}></img>
                                    <div style={{ color: '#F9972D', fontSize: '1.1vw' }}><IntlMessages id="reporting.formation.HautCadre" /></div>
                                    <div style={{ color: '#F9972D', fontSize: '1.4vw' }}>25%</div>
                                </div>
                                <div className=" m-3 d-flex flex-column col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center' }}>
                                    <img alt='Cadre' src={blue}></img>
                                    <div style={{ color: '#3BBDD5', fontSize: '1.1vw' }}><IntlMessages id="reporting.formation.Cadre" /></div>
                                    <div style={{ color: '#3BBDD5', fontSize: '1.4vw' }}>15%</div>
                                </div>
                                <div className="m-3 d-flex flex-column col-lg-2 col-md-2 col-sm-2" style={{ alignItems: 'center', height: '60px' }}>
                                    <img alt='Employé' src={blue2}></img>
                                    <div style={{ color: '#3F51B5', fontSize: '1.1vw' }}><IntlMessages id="reporting.formation.Employé" /></div>
                                    <div style={{ color: '#3F51B5', fontSize: '1.4vw' }}>10%</div>
                                </div>
                            </div>

                        </div>
                        <div className="d-flex flex-row col-lg-12 col-md-12 col-sm-6" >
                            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column ">
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <h2 style={{
                                            marginBottom: "5%",
                                            color: '#53869e',
                                        }}><IntlMessages id="reporting.formation.MoyenneAge" /></h2>
                                    </div>
                                    <BarChart></BarChart>

                                </div>
                            </div>
                            <div className="d-flex flex-column col-lg-6 col-md-6 col-sm-12" style={{ padding: "0" }}  >
                                <div className="d-flex flex-column col-lg-12 col-md-12 col-sm-12" style={{ alignItems: 'center', height: "100%", padding: "0" }}>
                                    <h2 style={{
                                        marginBottom: "12%",
                                        color: '#53869e',
                                    }}><IntlMessages id="reporting.formation.Assiduité" /></h2>
                                    <div className="d-flex flex-row justify-content-between col-lg-12 col-md-12 col-sm-12" style={{ padding: "0" }} >

                                        <div className="d-flex flex-row col-lg-5 col-md-5 col-sm-5 " style={{ padding: "0", color: "#484cb4", fontSize: "14px", height: "50px" }}>
                                            <div className="p-2">
                                                <IntlMessages id="reporting.formation.Absence" />
                                            </div>
                                            <div className="d-flex size-40" style={{ border: "solid 2px #484cb4", borderRadius: "50%", marginLeft: "4px", alignItems: "center", justifyContent: "center" }}>
                                                10%
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row col-lg-5 col-md-5 col-sm-5 " style={{ padding: "0", color: "#484cb4", fontSize: "14px" }}>
                                            <div className="p-2">
                                                <IntlMessages id="reporting.formation.Retard" /> 
                                            </div>
                                            <div className="d-flex size-40" style={{ border: "solid 2px #484cb4", borderRadius: "50%", marginLeft: "4px", alignItems: "center", justifyContent: "center" }}>
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
                            <IntlMessages id="reporting.formation.NIVsatisfaction" />
                        </div>
                        <div className="d-flex flex-row col-lg-12 col-md-12 col-sm-12" style={{ paddingLeft: "4px" }}>
                            <div className="col-lg-6 col-md-6 col-sm-6" style={{ padding: "4px" }} >
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.1" /></div>
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.2" /></div>
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.3" /></div>
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.4" /></div>
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.5" /></div>
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.6" /></div>
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.7" /></div>
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.8" /></div>
                                <div style={{ height: "20px", color: "#53869e", fontSize: "16px", fontWeight: "bold", marginBottom: "12px", marginTop: "12px" }}>
                                    <IntlMessages id="reporting.formation.NIVsatisfaction.9" /></div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6"><SatisfactionChart></SatisfactionChart></div>
                        </div>

                        <div className="p-2 col-lg-12 col-md-12 col-sm-12" style={{
                            color: "#49759b",
                            fontSize: "16px",
                            marginTop: "8%"
                        }}>
                            <IntlMessages id="reporting.formation.Commentaires" />
                           
                            <CommentSection></CommentSection>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
