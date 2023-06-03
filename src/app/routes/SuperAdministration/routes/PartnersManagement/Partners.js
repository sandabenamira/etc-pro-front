import React, { useState, useEffect } from "react";
import PartnersList from "./PartnersList";
import ArchiveIcon from "@material-ui/icons/Archive";
import PartnersArchive from "./PartnersArchive";
 import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../../util/IntlMessages";
 import { orange } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
 import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AddPartenaire from "./AddPartenaire";
import {useSelector} from "react-redux"
  export default function Partners() {
   const [searchTerm, setSearchTerm] = useState("");
  const [archived, setArchived] = useState(false);
  const [ setIsOpen] = useState(false);  
  const [openadd, setOpenadd] = useState(false);
 
  const handleSearchTerm = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };
  const handleopenArchived = () => {
    setArchived(!archived);
  };
  const openaddUser = () => {
    setIsOpen(true);
  };
  const openaddAgence = () => {
    setOpenadd(!openadd);
  };
  const data = useSelector((state) => state.Partner.PARTNERs);

  const n= data.filter((e) => e.isArchived === true).length

   if (archived) {
    return <>{<PartnersArchive OpenArchive={handleopenArchived} />}</>;
  } else if (!archived) {
    return (
      <>
        {
          <div className="app-wrapper" style={{}}>
        <>{openadd && <AddPartenaire openaddAgence={openaddAgence} />} </>
             <div
              className="p-2"
              style={{ color: "#3f51b5", fontSize: "24px", fontWeight: "bold" }}
            >
              Gestion des formateurs
            </div>
            <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12 col-sm-12">
              <div className=" col-lg-2 col-md-6 d-flex flex-wrap">
                <div className="p-2">
              
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
                    borderColor: "#3f51b5",
                    height: "40px",
                  }}
                  onChange={handleSearchTerm}
                >
                  <IconButton aria-label="search">
                    <SearchIcon
                      style={{
                        marginRight: "-100%",
                        color: "#565C79",
                        transform: "scaleX(-1)",
                      }}
                    />
                  </IconButton>
                  <InputBase
                    style={{
                      marginLeft: "5%",
                      flex: 1,
                      fontWeight: "bold",
                    }}
                    placeholder="Recherche ..."
                    inputProps={{ "aria-label": "search google maps" }}
                  />
                </Paper>
              </div>

              <div className="p-2 ml-auto ">
                <div
                  className="d-flex justify-content-start align-items-center "
                  style={{
                    color: "#616A6B",
                    textAlign: "center",
                  }}
                >
                  
                  <div className="p-2">
                    <div className="d-flex ">
                      <div className="p-2 ml-auto ">
                        <div className="d-flex justify-content-center align-items-center">
                          <Button
                            style={{ width: "400px", borderRadius: "50px" }}
                            onClick={openaddAgence}
                          >
                            <AddCircleOutlineOutlinedIcon
                              style={{
                                color: orange[500],
                                marginRight: "20px",
                              }}
                            />
                            <div
                              style={{
                                fontSize: "25px",
                                color: "orange",
                                marginRight: "40px",
                                textTransform: "none",
                              }}
                            >
                              Ajouter un formateur
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2">
              <PartnersList openaddUser={openaddUser} searchTerm={searchTerm} />
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
                  <div style={{ fontSize: "19px", color: "#616A6B" }}>
                    <IntlMessages id="gestion.agence.archive" /> ({n}){" "}
                  </div>
                </IconButton>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
connect(mapStateToProps)(Partners);
