import { Modal, ModalBody } from "reactstrap";

import Avatar from "@material-ui/core/Avatar";

import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";

export default function UserDetails(props) {
  const data = props.data;
  return (
    <Modal isOpen={true}>
      <ModalBody>
        <form className="row" autoComplete="off">
          <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-8 col-sm-12">
            <div
              className="d-flex justify-content-end mt-2 "
              style={{
                color: "#4C25B7",
                fontSize: "25px",
                marginRight: "2%",
              }}
            >
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={props.opendetailsUser}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <br />

            <div className="d-flex justify-content-center flex-row flex-wrap ">
              <div className="col-lg-4 col-md-8 col-sm-10 d-flex flex-wrap flex-column  justify-content-center align-items-center">
                <Avatar
                  alt="Remy Sharp"
                  src={data.photo}
                  style={{ width: 180, height: 180 }}
                />
              </div>

              <div className="col-lg-8 col-md-12 col-sm-4 d-flex flex-column justify-content-start  ">
                <h1 style={{ fontSize: "30px", color: "#44548F" }}>
                  {data.nom + " " + data.prenom}
                </h1>
                <h2 style={{ fontSize: "25px", color: "#8C8C8C" }}>
                  {data.role}
                </h2>

                <h3 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  <b>
                    <IntlMessages id="user.identifiant" />
                  </b>
                  <b> : </b>
                  {data.identifiant}
                </h3>
                <h4 style={{ fontSize: "20px", color: "#8C8C8C" }}>
               
                    <IntlMessages id="gestion.agence.agency" />    <b> : </b>
                 {data.agency}
                </h4>
              </div>
            </div>
            <hr style={{ width: "650px", color: "black" }} />
            <div className="d-flex justify-content-start flex-row flex-wrap  ">
              <div className="col-lg-8 col-md-5 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="user.birthday.date" />
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.dateNaissance.slice(0,10)}
                </h2>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>Pays</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.pays}
                </h2>
              </div>
            </div>

            <div className="d-flex justify-content-start flex-row flex-wrap  ">
              <div className="col-lg-8 col-md-5 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="user.address.postal" />
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.adressePostale}
                </h2>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="zip.code.user" />
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.codePostal}
                </h2>
              </div>
            </div>
            <div className="d-flex justify-content-start flex-row flex-wrap  ">
              <div className="col-lg-8 col-md-5 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="appModule.email" />
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.email}
                </h2>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>N° tel</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.numeroTelephone}
                </h2>
              </div>
            </div>

            <div className=" d-flex flex-row d-flex justify-content-start bd-highlight flex-wrap">
              <div className=" d-flex flex-column col-md-5 col-lg-7 d-flex justify-content-start align-items-start bd-highlight flex-wrap">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="country.user" />
                </h1>
                <h2 style={{ fontSize: "19px", color: "#8C8C8C" }}>
                  {data.pays}
                </h2>
              </div>
            </div>

            <div className="d-flex justify-content-start flex-row flex-wrap  ">
              <div className="col-lg-8 col-md-5 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="user.join.papiers" /> (1)
                </h1>
                <h2> {data.papier} </h2>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                <h1 style={{ fontSize: "19px", color: "#8C8C8C" }}>
                  <PictureAsPdfOutlinedIcon />
                  Contrat Biat
                  <hr />
                </h1>
                <h2> </h2>
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
