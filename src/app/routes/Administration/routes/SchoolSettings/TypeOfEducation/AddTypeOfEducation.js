import React from 'react';
import IntlMessages from '../../../../../../util/IntlMessages';
import CardBox from '../../../../../../components/CardBox/index';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import { connect } from 'react-redux';

class AddTypeOfEducation extends React.Component {
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div>
        <form autoComplete="off" onSubmit={this.props.handleSubmit}>
          <div className="d-flex justify-content-start">
            <h1>
              <b>
                <IntlMessages id="new.type.ofEducation" />
              </b>
            </h1>
            &nbsp;&nbsp;&nbsp;
            <Fab size="small" color="primary" aria-label="Add" onClick={this.props.openAddModal}>
              {this.props.values.isOpen ? <RemoveSharpIcon /> : <AddIcon />}
            </Fab>
          </div>
          <br />
          {this.props.values.isOpen ? (
            <>
              {' '}
              <CardBox styleName=" text-black  ">
                <div className="row">
                  <div className="col-md-6   ">
                    <TextField
                      required
                      id="nameTypeEducation"
                      label={<IntlMessages id="sidebar.components.typeOfEducation" />}
                      value={this.props.values.nameTypeEducation}
                      onChange={this.props.handleChange('nameTypeEducation')}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                </div>
              </CardBox>
              <div className="d-flex flex-wrap justify-content-end ">
                <Button
                  variant="contained"
                  onClick={this.openAddModal}
                  style={{
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    width: '10%',
                    height: '20%',
                  }}
                >
                  {<IntlMessages id="components.establishments.formadd.buttonCancel" />}
                </Button>
                &nbsp;&nbsp;
                <Button
                  variant="contained"
                  style={{
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    width: '10%',
                    height: '6%',
                  }}
                  className=" bg-indigo text-white "
                  type="submit"
                >
                  <IntlMessages id="service.button.publish" />
                </Button>
              </div>{' '}
            </>
          ) : (
            ''
          )}
        </form>
      </div>
    );
  }
}

export default connect()(AddTypeOfEducation);
