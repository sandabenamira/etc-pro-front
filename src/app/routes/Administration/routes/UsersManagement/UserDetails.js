import { Modal, ModalBody } from "reactstrap";

import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";

import "react-circular-progressbar/dist/styles.css";
import IntlMessages from "../../../../../util/IntlMessages";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";

export default function UserDetails(props) {
  const data = props.data;
  const agences = useSelector((state) => state.Agence.agences);
  const agenceName = agences.filter((e) => e.id === data.agenceId)[0].name
  return (
    <Modal isOpen={true}>
      <ModalBody>
        <form className="row" autoComplete="off">
          <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-8 col-sm-8">
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
            <div className="d-flex justify-content-start flex-row flex-wrap ">
              <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-wrap flex-column  justify-content-start mb-4">
                <Avatar
                  alt={data.firstName}
                  //  src={require(data.photo)}
                  style={{ width: 180, height: 180 }}
                />
              </div>

              <div className="col-lg-7 col-md-4 col-sm-4 d-flex flex-column justify-content-start ">
                <h1 style={{ fontSize: "30px", color: "#44548F" }}>
                  {data.firstName + " " + data.lastName}
                </h1>
                <h2 style={{ fontSize: "25px", color: "#8C8C8C" }}>
                  {props.roleName}
                </h2>

                <h3 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  <IntlMessages id="user.identifiant" />:{data.identifier}
                </h3>
                <h4 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  <IntlMessages id="gestion.agence.agency" /> <b> : </b>
                  {agenceName}
                </h4>
              </div>
            </div>
            <hr style={{ width: "650px", color: "black" }} />
            <div className="d-flex justify-content-start flex-row flex-wrap  ">
              <div className="col-lg-7 col-md-6 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="user.birthday.date" />
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.dateBirth}
                </h2>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>Pays</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.country}
                </h2>
              </div>
            </div>

            <div className="d-flex justify-content-start flex-row flex-wrap  ">
              <div className="col-lg-7 col-md-6 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="user.address.postal" />
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.address}
                </h2>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="zip.code.user" />
                </h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.postalCode}
                </h2>
              </div>
            </div>
            <div className="d-flex justify-content-start flex-row flex-wrap  ">
              <div className="col-lg-7 col-md-6 col-sm-10 d-flex flex-wrap flex-column  justify-content-start  ">
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
                  {data.telephoneNumber}
                </h2>
              </div>
            </div>

            <div className=" d-flex justify-content-start flex-row flex-wrap ">
              {/* <div className=" d-flex flex-column col-md-6 col-lg-7 d-flex justify-content-start align-items-start bd-highlight flex-wrap">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="country.user" />
                </h1>
                <h2 style={{ fontSize: "19px", color: "#8C8C8C" }}>
                  {data.country}
                </h2>
              </div> */}
              <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>CIN</h1>

                <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                  {data.cin}
                </h2>
              </div>
            </div>

            <div className="d-flex justify-content-start flex-row flex-wrap  ">
              <div className="col-lg-7 col-md-6 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                  <IntlMessages id="user.join.papiers" /> (1)
                </h1>
                <h2> {data.attachment} </h2>
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
