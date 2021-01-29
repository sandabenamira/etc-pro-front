import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Auxiliary from "../../../../../util/Auxiliary";
import TextField from "@material-ui/core/TextField";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Row, Col } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export class DetailsService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let element = this.props.data;

    const regex = /-/gi;
    let iconCode = "icon-btn " + element.path_img_service + " zmdi-hc-2x";
    return (
      <Auxiliary>
        <Modal isOpen={this.props.openDetail}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            Aperçu
            <IconButton className="text-white" onClick={this.props.cancel}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ paddingLeft: "5%", paddingRight: "5%" }}>
            <Form>
              <div>
                <Row>
                  <h3 style={{ color: "blue" }}>Descriptif</h3>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="Nom"
                        label="Nom"
                        value={element.name_fr_service}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="Type"
                        label="Type"
                        value={element.type_service}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <Row>
                      <label> Photo associée</label>
                    </Row>
                    <Row style={{ marginLeft: "auto", marginRight: "auto" }}>
                      <i className={iconCode}></i>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "5%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: "blue" }}>Monnaie</h3>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="Monnaie"
                        label="Monnaie"
                        value={element.currencyV2.code_currency}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="TVA"
                        label="TVA"
                        value={element.vat_service + " %"}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="Autre-Taxe"
                        label="Autre Taxe"
                        value={element.other_vat_service + " %"}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "5%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: "blue" }}>Fréquence</h3>
                </Row>
                <Row>
                  <Col
                    md="4"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<Radio checked={true} />}
                        label={element.frequencyV2.name_fr_frequency}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md="2"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    <FormGroup>
                      <h5>
                        {element.start_date_service
                          .slice(0, 10)
                          .replace(regex, "/")}
                      </h5>
                    </FormGroup>
                  </Col>
                  <Col
                    md="2"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    <FormGroup>
                      <h5>
                        {element.end_date_service
                          .slice(0, 10)
                          .replace(regex, "/")}
                      </h5>
                    </FormGroup>
                  </Col>
                  <Col
                    md="1"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  >
                    <FormGroup>
                      <CalendarTodayIcon />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <TextField
                        id="price"
                        value={
                          element.price_service +
                          " " +
                          element.currencyV2.sign_currency
                        }
                        variant="outlined"
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: "100%",
                      margin: "auto",
                      marginTop: "5%",
                      marginBottom: "5%",
                      border: "1px dashed #979A9A",
                      paddingLeft: "-100%",
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: "blue" }}>Commentaire</h3>
                </Row>
                <Row>
                  <p style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                    {element.comment}
                  </p>
                </Row>
                <Row style={{ float: "right" }}>
                  <Col>
                    <Button
                      variant="contained"
                      className="bg-grey text-white "
                      style={{ borderRadius: "16px" }}
                      onClick={this.props.cancel}
                    >
                      <IntlMessages id="components.establishments.formadd.buttonCancel" />
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="contained"
                      className="bg-indigo text-white "
                      style={{ borderRadius: "16px" }}
                      onClick={this.props.modify}
                    >
                      <IntlMessages id="button.modify" />
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}

export default DetailsService;
