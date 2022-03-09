import { Modal, ModalBody } from "reactstrap";

import "react-circular-progressbar/dist/styles.css";
import Button from "@material-ui/core/Button";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
export default function ModaleInscription(props) {
  return (
    <div>
      <Modal isOpen={true}>
        <ModalBody>
          <form
            className="row"
            autoComplete="off"
           // onSubmit={props.handleSubmit}
          >
            <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-8 col-sm-12">
              <div className=" d-flex flex-row d-flex justify-content-end ">
                <div className=" d-flex flex-row col-md-6 col-sm-1 col-lg-1 d-flex align-items-end">
                  <Button
                    type="button"
                    class="close"
                    aria-label="Close"
                    onClick={props.opendetailsUser}
                    style={{ width: 100, height: 100 }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </Button>
                </div>
              </div>

              <br />

              <div className="d-flex justify-content-center flex-row flex-wrap ">
                <div className="col-lg-4 col-md-8 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start">
                  <h1></h1>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-4 d-flex flex-column justify-content-start  ">
                  <h1>
                    <h1 style={{ fontSize: "30px", color: "#44548F" }}>
                      Oudherfi Oumaima
                    </h1>
                    <h2 style={{ fontSize: "25px", color: "#8C8C8C" }}>
                      Responsable Formation
                    </h2>

                    <h3 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      <b></b>
                      <b> : </b>
                      oudherfioumaima5
                    </h3>
                    <h4 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      <b></b> Agence Mohamed V
                    </h4>
                  </h1>
                </div>
              </div>
              <hr style={{ width: "650px", color: "black" }} />
              <div className="d-flex justify-content-start flex-row flex-wrap  ">
                <div className="col-lg-8 col-md-5 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}></h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      17/04/2000
                    </h2>
                  </h1>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>CIN</h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      00000007
                    </h2>
                  </h1>
                </div>
              </div>

              {/* Add adress */}
              <div className="d-flex justify-content-start flex-row flex-wrap  ">
                <div className="col-lg-8 col-md-5 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}></h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      avenue hbib bourguiba, Borj Cedria
                    </h2>
                  </h1>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}></h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>4120</h2>
                  </h1>
                </div>
              </div>
              <div className="d-flex justify-content-start flex-row flex-wrap  ">
                <div className="col-lg-8 col-md-5 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}></h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      oumaima.afff@gmail.com
                    </h2>
                  </h1>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      N° tel
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      99944754548
                    </h2>
                  </h1>
                </div>
              </div>

              <div className=" d-flex flex-row d-flex justify-content-start bd-highlight flex-wrap">
                <div className=" d-flex flex-column col-md-5 col-lg-7 d-flex justify-content-start align-items-start bd-highlight flex-wrap">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}></h1>
                  <h2 style={{ fontSize: "19px", color: "#8C8C8C" }}>
                    Tunisie
                  </h2>
                </div>
              </div>

              <div className="d-flex justify-content-start flex-row flex-wrap  ">
                <div className="col-lg-8 col-md-5 col-sm-10 d-flex flex-wrap flex-column  justify-content-start align-items-start ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}></h1>
                  </h1>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 d-flex flex-column justify-content-start  ">
                  <h1>
                    <h1 style={{ fontSize: "19px", color: "#8C8C8C" }}>
                      <PictureAsPdfOutlinedIcon />
                      Contrat Biat
                      <hr />
                    </h1>
                  </h1>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
