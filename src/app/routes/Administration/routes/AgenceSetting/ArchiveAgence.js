import React from "react";
import { connect } from "react-redux";
import ArchiveList from "./ArchiveList";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import IntlMessages from "../../../../../util/IntlMessages";

export default function ArchiveAgence(props) {
  return (
    <div className="app-wrapper">
      <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
        <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
          <div className="p-2">
            <div className="package-footer d-flex justify-content-start">
              <IconButton
                aria-label="delete"
                style={{
                  color: "#blue",
                  backgroundColor: "#blue",
                  width: "28px",
                  height: "28px",
                }}
                onClick={props.handleopenArchived}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              <h1
                style={{
                  color: "#3f51b5",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                <IntlMessages id="gestion.agence.agency.management" /> -{" "}
                <IntlMessages id="gestion.agence.archive" />
              </h1>
            </div>
            <br/>    <br/>
          </div>
        </div>
        <div className="p-2">
          <ArchiveList data={props.data} />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};
connect(mapStateToProps)(ArchiveAgence);
