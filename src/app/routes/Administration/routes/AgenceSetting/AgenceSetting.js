/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import AgenceList from "./AgenceList";
import ArchiveIcon from "@material-ui/icons/Archive";
import ArchiveAgence from "./ArchiveAgence";
import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../../util/IntlMessages";
import { getAgences } from "../../../../../store/actions/Agence";

function AgenceSetting() {
  const dispatch = useDispatch();
  const [archived, setArchived] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleopenArchived = () => {
    setArchived(!archived);
  };
  const openaddUser = () => {
    setIsOpen(true);
  };
  const data = useSelector((state) => state.Agence.agences);
  useEffect(() => {
    dispatch(getAgences());
  }, [dispatch]);
  return (
    <div>
      {!archived && (
        <div className="app-wrapper" style={{}}>
          <div className="d-flex flex-column col-lg-12 col-md-12  col-sm-12">
            <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12  col-sm-12">
              <div
                className="p-2"
                style={{
                  color: "#3f51b5",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                <IntlMessages id="gestion.agence.agency.management" />
              </div>
            </div>
            <div className="d-flex flex-row p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
              <AgenceList openaddUser={openaddUser} data={data} />
            </div>
          </div>
          <div className="d-flex flex-row-reverse p-2 col-lg-12 col-md-12 col-sm-12 mt-4">
            <div
              className="d-flex justify-content-start align-items-center "
              style={{
                color: "#616A6B",
                textAlign: "center",
              }}
            >
              <IconButton
                aria-label="delete"
                style={{
                  color: "#616A6B",
                }}
                onClick={handleopenArchived}
              >
                <ArchiveIcon backgroundColor="white" />
              </IconButton>
              <div style={{ fontSize: "19px", color: "#616A6B" }}>
                <IntlMessages id="gestion.agence.archive" /> (2)
              </div>
            </div>
          </div>
        </div>
      )}

      {archived && (
        <ArchiveAgence handleopenArchived={handleopenArchived} data={data} />
      )}
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps)(AgenceSetting);
