import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Auxiliary from '../../../../../util/Auxiliary';
import TextField from '@material-ui/core/TextField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Form, FormGroup, Row, Col } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export class DetailsBill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {   /* eslint eqeqeq: "off" */
    let element = this.props.data;

    return (
      <Auxiliary>
        <Modal isOpen={this.props.openDetail}>
          <ModalHeader className="modal-box-header bg-primary text-white">
            Aperçu
            <IconButton className="text-white" onClick={this.props.cancel}>
              <CloseIcon />
            </IconButton>
          </ModalHeader>
          <ModalBody style={{ paddingLeft: '5%', paddingRight: '5%' }}>
            <Form>
              <div>
                <Row>
                  <h3 style={{ color: 'blue' }}>Descriptif</h3>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Reférence"
                        value={element.bill.reference}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Date"
                        value={element.bill.generation_date.slice(0, 10)}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <Row style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                      <TextField
                        id="standard-basic"
                        label="État"
                        value={'Non payée'}
                        InputProps={{ disableUnderline: true }}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: '100%',
                      margin: 'auto',
                      marginTop: '5%',
                      marginBottom: '5%',
                      border: '1px dashed #979A9A',
                      paddingLeft: '-100%',
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: 'blue' }}>Client</h3>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Parent"
                        value={
                          element.student.student_parents[0].parent.profile.user
                            .name +
                          ' ' +
                          element.student.student_parents[0].parent.profile.user
                            .surname
                        }
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Student"
                        value={
                          element.student.profile.user.name +
                          ' ' +
                          element.student.profile.user.surname
                        }
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Classe"
                        value={element.student.class.name}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <hr
                    style={{
                      width: '100%',
                      margin: 'auto',
                      marginTop: '5%',
                      marginBottom: '5%',
                      border: '1px dashed #979A9A',
                      paddingLeft: '-100%',
                    }}
                  />
                </Row>
                <Row>
                  <h3 style={{ color: 'blue' }}>Détail Facture</h3>
                </Row>

                {element.service_v2.map((element ,index) => (
                  <Row key = {index}>
                    <Col
                      md="4"
                      style={{ marginTop: 'auto', marginBottom: 'auto' }}
                    >
                      <FormGroup>
                        <FormControlLabel
                          control={<Radio checked={true} />}
                          label={element.name_fr_service}
                        />
                        <i className={element.path_img_service}></i>
                      </FormGroup>
                    </Col>

                    <Col
                      md="2"
                      style={{ marginTop: 'auto', marginBottom: 'auto' }}
                    >
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="Prix HT"
                          value={element.price_service}
                          InputProps={{ disableUnderline: true }}
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      md="2"
                      style={{ marginTop: 'auto', marginBottom: 'auto' }}
                    >
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="TVA"
                          value={element.vat_service}
                          InputProps={{ disableUnderline: true }}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <TextField
                          id="standard-basic"
                          label="TOTAL"
                          value={
                            (element.price_service *
                              (element.vat_service + 100)) /
                            100
                          }
                          variant="outlined"
                          InputProps={{ disableUnderline: true }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                ))}
                <Row>
                  <Col
                    md="4"
                    style={{ marginTop: 'auto', marginBottom: 'auto' }}
                  >
                    <FormGroup>
                      {/* <FormControlLabel
                        control={<Radio checked={false} />}
                        label="Total Facture"
                      /> */}
                      <TextField
                        id="standard-basic"
                        label="Total Facture"
                        // value={element.price_service}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md="2"
                    style={{ marginTop: 'auto', marginBottom: 'auto' }}
                  >
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Total HT"
                        value={element.bill.total_excl_tax}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md="2"
                    style={{ marginTop: 'auto', marginBottom: 'auto' }}
                  >
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Total TVA"
                        value={element.bill.total_vat}
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="3">
                    <FormGroup>
                      <TextField
                        id="standard-basic"
                        label="Total TTC"
                        value={element.bill.total_incl_tax}
                        variant="outlined"
                        InputProps={{ disableUnderline: true }}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <hr
                    style={{
                      width: '100%',
                      margin: 'auto',
                      marginTop: '5%',
                      marginBottom: '5%',
                      border: '1px dashed #979A9A',
                      paddingLeft: '-100%',
                    }}
                  />
                </Row>

                <Row style={{ float: 'right' }}>
                  <Col>
                    <Button
                      variant="contained"
                      className="bg-grey text-white "
                      style={{ borderRadius: '16px' }}
                      onClick={this.props.cancel}
                    >
                      <IntlMessages id="components.establishments.formadd.buttonCancel" />
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

export default DetailsBill;
