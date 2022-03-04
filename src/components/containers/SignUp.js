import React from "react";
import { connect } from "react-redux";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {

} from "react-notifications";

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignUp,
  userTwitterSignIn,
} from "../../store/actions/Auth";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      company: "",
      phone: "",
   
      message: "",
    };
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 500);
    }
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }

  isEmail = () => {
    let mail = document.getElementById("not-mail");
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (this.email.match(regex)) {
      //esq mail kif regex
      mail.style.display = "none"; //s'hyh tu disparait l'error non valide
      return true;
    } else {
      mail.style.display = "block"; //apparaît
      mail.style.animation = "dongle 1s"; //tet'harek non valid
      return false;
    }
  };
  sendFeedback = (templateId, variables) => {
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        console.log("success !");
        this.name("");
        this.Company("");
        this.Phone("");
        this.Email("");
        this.message("");
      })
      .catch(
        (err) =>
          (document.querySelector(".form-message").innerHTML =
            "Une erreur s'est produite, veuillez réessayer.")
      );
  };
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (this.name && this.isEmail() && this.message)
  //     sendFeedback("***TEMPLAYE_ID***", {
  //       name: this.name,
  //       company: this.company,
  //       phone: this.phone,
  //       email: this.email,
  //       message: this.message,
  //       // company,
  //       // phone,
  //       // email,
  //       // message,
  //     });
  //   else {
  //     console.log("error");
  //   }
  // };

  render() {
    /* eslint eqeqeq: "off" */
    const { name, email } = this.state;

    return (
      <div
        style={{
          backgroundColor: "#1a85b3",
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingBottom: "5%",
          paddingTop: "4%",
          minHeight: "1000px",
          width: "100%",
        }}
      >
        <div
          className="d-flex  flex-column col-lg-12 col-md-12 col-sm-12   "
          style={{
            // maxHeight: "90%",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "40px 20px #125f80",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="d-flex   justify-content-center mt-4  ">
            {/* /première ligne */}
            <img
              width={70}
              src={require("../../assets/images/educapProLogo.png")}
              alt="STUPP"
              title="STUPP"
              style={{
                height: "80px",
                top: "90px",
              }}
            />
            <h1
              style={{
                color: "#1a85b3",
                fontSize: "30px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              <strong>Créer votre compte entreprise sur Educap Pro</strong>
            </h1>
          </div>
          <div
            className="d-flex flex-wrap flex-row  "
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-11  ">
              <div class=" d-flex justify-content-center mt-3">
                <div className="title">
                  <h1
                    className="Accueil"
                    style={{
                      color: "#1a85b3",
                      fontSize: "24px",
                      fontWeight: 400,
                      textAlign: "center",
                    }}
                  >
                    <strong>Votre société</strong>
                  </h1>
                </div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Nom de la société*
                  </h3>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => this.name(e.target.value)}
                    value={name}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de SIRET*
                  </h3>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => this.name(e.target.value)}
                    value={name}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5 ">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Adresse de la société*{" "}
                  </h3>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    onChange={(e) => this.company(e.target.value)}
                    value={this.company}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 ">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Code Postal*
                  </h3>

                  <input
                    type="text"
                    id="company"
                    name="company"
                    onChange={(e) => this.company(e.target.value)}
                    value={this.ccompany}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Gouvernorat
                  </h3>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => this.phone(e.target.value)}
                    value={this.phone}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Pays
                  </h3>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => this.phone(e.target.value)}
                    value={this.phone}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de téléphone
                  </h3>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => this.phone(e.target.value)}
                    value={this.phone}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    E-mail*
                  </h3>
                  <div className="email-content">
                    <h6
                      style={{
                        display: "none",
                        // position: "absolute",
                        // top: "7px",
                        color: "#ff4d4d",
                        // right: "0",
                        // transformOrigin: "50% 50%",
                      }}
                    >
                      Email non valide
                    </h6>
                    <input
                      type="mail"
                      id="email"
                      name="email"
                      onChange={(e) => this.Email(e.target.value)}
                      value={email}
                      required
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        fontFamily: "Verdana, Geneva, Tahoma",
                        fontSize: "1.1rem",
                        borderBottom: "1px solid #1a85b3",
                        color: "#000000",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5 ">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Choix de la devise*
                  </h3>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => this.phone(e.target.value)}
                    value={this.phone}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6"></div>
              </div>
            </div>
            <div className="d-flex flex-wrap flex-column col-lg-1 col-md-1 col-sm-1 ">
              <div class=" d-flex justify-content-start mr-5">
                <p
                  style={{
                    height: "600px",
                    borderRight: "1px solid rgba(134, 134, 134, 0.548)",
                    paddingLeft: " 2cm",
                  }}
                  class="bordure_verticale"
                ></p>
              </div>
            </div>
            <div className="d-flex flex-wrap flex-column col-lg-5 col-md-5 col-sm-11 ">
              <div class=" d-flex justify-content-center mt-3">
                <div className="title">
                  <h1
                    class="Accueil"
                    style={{
                      color: "#1a85b3",
                      fontSize: "24px",
                      fontWeight: 400,
                      textAlign: "center",
                    }}
                  >
                    <strong>Vos coordonnées</strong>
                  </h1>
                </div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Nom*
                  </h3>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => this.name(e.target.value)}
                    value={name}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Prénom*
                  </h3>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => this.name(e.target.value)}
                    value={name}
                    required
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5">
                <h3
                  style={{
                    color: "#1a85b3",
                    fontWeight: 400,
                  }}
                >
                  Vous êtes
                </h3>

                <RadioGroup
                  className=" d-flex flex-row"
                  style={{
                    marginLeft: "30px",
                    marginTop: "-10px",
                  }}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio color="primary" size="3px" />}
                  />

                  <i
                    className="zmdi zmdi-male-alt zmdi-hc-3x"
                    style={{ color: "blue" }}
                  ></i>
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        color="primary"
                        style={{
                          marginLeft: "1cm",
                        }}
                      />
                    }
                  />
                  <i
                    className="zmdi zmdi-female zmdi-hc-3x"
                    style={{ color: "orange" }}
                  ></i>
                </RadioGroup>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Date de naissance
                  </h3>

                  <input
                    type="date"
                    id="phone"
                    name="phone"
                    onChange={(e) => this.phone(e.target.value)}
                    value={this.phone}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6"></div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  {" "}
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    Adresse
                  </h3>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => this.phone(e.target.value)}
                    value={this.phone}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6"></div>
              </div>
              <div class="d-flex flex-wrap flex-row ml-5 mt-5">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    N° de téléphone{" "}
                  </h3>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => this.phone(e.target.value)}
                    value={this.phone}
                    style={{
                      borderLeft: "none",
                      borderRight: "none",
                      borderTop: "none",
                      fontFamily: "Verdana, Geneva, Tahoma",
                      fontSize: "1.1rem",
                      borderBottom: "1px solid #1a85b3",
                      color: "#000000",
                    }}
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <h3
                    style={{
                      color: "#1a85b3",
                      fontWeight: 400,
                    }}
                  >
                    E-mail*
                  </h3>
                  <div className="email-content">
                    <h6
                      style={{
                        display: "none",
                        // position: "absolute",
                        // top: "7px",
                        color: "#ff4d4d",
                        // right: "0",
                        // transformOrigin: "50% 50%",
                      }}
                    >
                      Email non valide
                    </h6>
                    <input
                      type="mail"
                      id="email"
                      name="email"
                      onChange={(e) => this.Email(e.target.value)}
                      value={email}
                      required
                      style={{
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        fontFamily: "Verdana, Geneva, Tahoma",
                        fontSize: "1.1rem",
                        borderBottom: "1px solid #1a85b3",
                        color: "#000000",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap flex-column col-lg-1 col-md-1 col-sm-1 ">
</div>
          </div>
          <div className="d-flex   justify-content-end mb-3 mr-5">
            <button
              className="button2"
              type="reset"
              style={{
                fontSize: "1.3rem",
                color: "#1a85b3",
                cursor: "pointer",
                backgroundColor: "#ffffff",
                padding: "5px 25px 5px 25px",
                borderRadius: "80px",
                border: "#1a85b3 solid 1px",
                marginRight: "26px",
              }}
            >
              Annuler
            </button>
            <button
              className="button1"
              type="submit"
              style={{
                fontSize: "1.3rem",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#1a85b3",
                padding: "5px 25px 5px 25px",
                borderRadius: "80px",
                marginRight: "2cm",
              }}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser };
};

export default connect(mapStateToProps, {
  userSignUp,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn,
})(SignUp);
