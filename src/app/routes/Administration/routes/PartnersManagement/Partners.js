import React, { useState, useEffect } from "react";
import PartnersList from "./PartnersList";
import ArchiveIcon from "@material-ui/icons/Archive";
import PartnersArchive from "./PartnersArchive";
import AddPartner from "./AddPartner";
import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "../../../../../util/IntlMessages";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { orange } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Button from "@material-ui/core/Button";
import { connect, useDispatch } from "react-redux";

export default function Partners() {
  const dispatch = useDispatch();
  const [archived, setArchived] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleopenArchived = () => {
    setArchived(!archived);
  };
  const openaddUser = () => {
    setIsOpen(true);
  };
  //const data = useSelector((state) => state.Agence.agences);
  useEffect(() => {
    //dispatch(getAgences());
  }, [dispatch]);
  if (isOpen) {
    return <>{isOpen && <AddPartner openAddPartner={openaddUser} />} </>;
  } else if (archived) {
    return <>{<PartnersArchive OpenArchive={handleopenArchived} />}</>;
  } else if (!archived) {
    return (
      <>
        {
          <div className="app-wrapper" style={{}}>
            <div
              className="p-2"
              style={{ color: "#3f51b5", fontSize: "24px", fontWeight: "bold" }}
            >
              Gestion des partenaires
            </div>
            <div className="d-flex flex-row flex-wrap p-2 col-lg-12 col-md-12 col-sm-12">
              <div className=" col-lg-2 col-md-6 d-flex flex-wrap">
                <div className="p-2">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "15px",
                      fontSize: "15px",
                      fontFamily: "Roboto",
                    }}
                  >
                    Trier par
                    <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon>
                  </Button>
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
                    <SearchIcon
                      style={{ marginRight: "-100%", color: "#565C79" }}
                    />
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
                <div
                  className="d-flex justify-content-start align-items-center "
                  style={{
                    color: "#616A6B",
                    textAlign: "center",
                  }}
                >
                  <div className="d-flex justify-content-start align-items-center">
                    <Fab size="small" aria-label="Add" onClick={openaddUser}>
                      {}
                      <AddIcon
                        onClick={openaddUser}
                        style={{ color: orange[500] }}
                      />
                    </Fab>
                    &nbsp;&nbsp;&nbsp;
                    <div style={{ fontSize: "25px", color: "orange" }}>add</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2">
              <PartnersList openaddUser={openaddUser} />
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
                    <IntlMessages id="gestion.agence.archive" /> (2){" "}
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
