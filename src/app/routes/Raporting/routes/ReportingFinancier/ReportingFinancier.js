import React, { Component } from 'react'

import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import VerticalAlignBottomOutlinedIcon from "@material-ui/icons/VerticalAlignBottomOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";


export default class ReportingFinancier extends Component {
    render() {
        return (
            <div class="d-flex flex-column col-lg-12 col-md-12 col-sm-12">
                <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
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

                <div class="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
                    {/* -- LEFT SIDE --*/}
                    <div class="d-flex flex-column p-2 col-lg-6 col-md-6 col-sm-12" style={{backgroundColor: "gray"}}>
                        <div class="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12 col-sm-6" style={{backgroundColor: "red"}}>
                            <div class="p-2 col-lg-6 col-md-6 col-sm-12">donut chart</div>
                            <div class="p-2 col-lg-6 col-md-6 col-sm-12">icons</div>
                        </div>
                        <div class="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12 col-sm-6" style={{backgroundColor: "yellow"}}>
                            <div class="p-2 col-lg-6 col-md-6 col-sm-12">column chart</div>
                            <div class="p-2 col-lg-6 col-md-6 col-sm-12">assiduité</div>
                        </div>
                    </div>
                    {/* -- RIGHT SIDE --*/}
                    <div class="d-flex flex-column p-2 col-lg-6 col-md-6 col-sm-12" style={{backgroundColor: "Black"}}>
                        <div class="p-2">Satifsaction chart</div>
                        <div class="p-2">commentss</div>
                    </div>
                </div>
            </div>

        )
    }
}
