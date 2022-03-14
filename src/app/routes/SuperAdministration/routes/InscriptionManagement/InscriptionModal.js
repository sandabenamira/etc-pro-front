import { connect } from "react-redux";

import { Modal, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { editInscription } from "../../../../../store/actions/Inscription";
import "react-circular-progressbar/dist/styles.css";

const mapStateToProps = (state) => {
  //mise à jour du store
  return {};
};
function InscriptionModal(props) {
  // console.log("typeop props data confirm in model", typeof props.data.confirm);
  // console.log("this is my props.data: ", props.data);
  // console.log("hello confirmer", props.data.confirm);

  let dispatch = useDispatch();

  const handleRefuser = (e) => {
    e.preventDefault(); //ne pas charger formulaire au premier lieu
    // finalData.confirm(false);
    dispatch(editInscription(finalDataRefuse));
  };
  const handleConfirm = (e) => {
    console.log("_________________________________");
    e.preventDefault();
    dispatch(editInscription(finalData));
  };

  const finalData = {
    ...props.data,
    confirm: true,
  };
  const finalDataRefuse = {
   ...props.data,
    confirm: false,
  };
  //console.log("hey" ,typeof finalData.confirm)

  // const returnedTarget = Object.assign(props.data, finalData);
  // console.log("this is my returnedTarget", returnedTarget);

  return (
    <div>
      <Modal isOpen={true}>
        <ModalBody>
          <form className="row" autoComplete="off">
            <div className="d-flex flex-wrap justify-content-start flex-column col-lg-12 col-md-8 col-sm-12 mt-0">
              <div className=" d-flex flex-row d-flex justify-content-end ">
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={props.opendetailsUser}
                  //   style={{ width: 100, height: 100 }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <br />

              <div className="d-flex justify-content-start flex-row flex-wrap  ">
                <div className=" d-flex flex-row col-md-12 col-sm-12 col-lg-12 d-flex align-items-end"></div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      nom :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.nom}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Numéro Série :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.numSerie}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Addresse :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.addresse}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>email:</h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.email}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Gouvernorat :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.gouvernorat}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Created en :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.createdIn}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      pays :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.pays}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    créer en :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.createdIn}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {/* {props.data.choixDevise} */}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Choix Devise :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.choixDevise}
                    </h2>
                  </h1>
                </div>
                {/* <Button
                type="button"
                className="close"
                aria-label="Close"
                onClick={props.opendetailsUser}
                style={{ width: 100, height: 100 }}
              >
                <span aria-hidden="true">&times;</span>
              </Button> */}
              </div>
              <hr style={{ width: "650px", color: "black" }} />
              <div className="d-flex justify-content-start flex-row flex-wrap  ">
                <div className=" d-flex flex-row col-md-12 col-sm-12 col-lg-12 d-flex align-items-end"></div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  id={props.data.id} , confirme = {props.data.confirm.toString()} ---
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Nom utilisateur:
                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.nomUser}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Prénom :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.prenoUser}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      addresseUser :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.addresseUser}
                    </h2>
                  </h1>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-wrap flex-column  justify-content-start align-items-start mt-0">
                  <h1>
                    <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                      Email :
                    </h1>

                    <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                      {props.data.emailUser}
                    </h2>
                  </h1>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  align-items-start mt-0 ">
                  <h1 style={{ fontSize: "20px", color: "#44548F" }}>
                    Numero Téléphone :
                  </h1>

                  <h2 style={{ fontSize: "20px", color: "#8C8C8C" }}>
                    {props.data.numeroTelephoneUser}
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  align-items-start mt-0 "></div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-end   align-items-end mt-0">
                  <button
                    style={{
                      background: "white",
                    }}
                    onClick={(e) => handleRefuser(e)}
                  >
                    Refuser
                  </button>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column justify-content-start  align-items-start mt-0 ">
                  <button
                    style={{
                      background: "white",
                    }}
                    onClick={(e) => handleConfirm(e)}
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default InscriptionModal;
