
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import IntlMessages from "../../../../../util/IntlMessages";
import Button from '@material-ui/core/Button';
import Auxiliary from "../../../../../util/Auxiliary";
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import docLogo from "../../../Lesson/Assets/pdf.png"
import eyesLogo from "../../../../../assets/images/display.png"
 
class DownloadFiles extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  render() {
    const { url } = this.props;

    return (
      <Auxiliary>
        <Modal isOpen={this.props.opendownload}>
          <ModalHeader
            toggle={this.props.cancelModal}
            className="modal-box-header bg-primary text-white"
          >

            {<IntlMessages id="download.homework" />}
          </ModalHeader>
          <br />
          <ModalBody>
          
              <div className="app-wrapper">
                { url ?  
                <div className="row">
                  <div className="col-md-5">
                <ButtonBase
                  focusRipple
                  onClick={() => {

                  }}
                  href={url} download
                  className="complex-btn ripple-effect"
                  style={{
                    width: '40%',
                  }}>
                  <div
                    className="img-src"
                    style={{
                      backgroundImage: `url(${docLogo})`,
                    }}
                  />
                  <div className="img-btn-overlay" />
                  <div className="img-btn">
                    <Typography
                      component="h3"
                      type="subheading"
                      color="inherit"
                      className="img-title"
                    >
                      {<IntlMessages id="message.attach.download" />}
                      <div className="img-marked" />
                    </Typography>
                  </div>
                </ButtonBase>
                </div>
                &nbsp;&nbsp;
                <div className="col-md-5">
                <ButtonBase
                  focusRipple
                  href={url} 
                  className="complex-btn ripple-effect"
                  style={{
                    width: '40%',
                  }}>
                  <div
                    className="img-src"
                    style={{
                      backgroundImage: `url(${eyesLogo})`,
                    }}
                  />
                  <div className="img-btn-overlay" />
                  <div className="img-btn">
                    <Typography
                      component="h3"
                      type="subheading"
                      color="inherit"
                      className="img-title"
                    >
                      {<IntlMessages id="message.attach.eye" />}
                      <div className="img-marked" />
                    </Typography>
                  </div>
                </ButtonBase>
                </div>
                </div>
                : <h1>{<IntlMessages id="message.no.file" />} </h1> 
                  
                }
               
              </div>
              <div className="col-md-12 text-right ">
                <br />
                <br />
                <Button
                  variant="contained"
                  className="jr-btn bg-grey text-white "
                  onClick={this.props.cancelModal}
                >
                  {
                    <IntlMessages id="components.establishments.formadd.buttonCancel" />
                  }
                </Button>
              </div>
           
          </ModalBody>
        </Modal>
      </Auxiliary>
    );
  }
}
export default DownloadFiles;