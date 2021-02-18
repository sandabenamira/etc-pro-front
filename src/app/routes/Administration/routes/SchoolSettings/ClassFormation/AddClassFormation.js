import React from 'react';
import IntlMessages from '../../../../../../util/IntlMessages';
import CardBox from '../../../../../../components/CardBox/index';
import Can from '../../../../../../can';
import { RoleContext } from '../../../../../../Context';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ClassNames from 'classnames';
import RemoveIcon from '@material-ui/icons/Remove';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
class AddClassFormation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { values } = this.props;
    return (
      <div>
        <RoleContext.Consumer>
          {({ role }) => (
            <Can
              role={role}
              perform="add-service"
              yes={() => (
                <div>
                  <div className="d-flex justify-content-start align-items-center">
                    <h1>
                      <b>Ajouter une classe de formation</b>
                    </h1>
                    &nbsp;&nbsp;&nbsp;
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="Add"
                      onClick={this.props.openAddModal}
                    >
                      {this.props.values.open ? <RemoveSharpIcon /> : <AddIcon />}
                    </Fab>
                  </div>
                  <form autoComplete="off" onSubmit={this.props.handleSubmit}>
                    <br />
                    {this.props.values.open ? (
                      <>
                        <div className="d-flex flex-row  ">
                          <div className="col-md-3">
                            <InputLabel required htmlFor="name-class">
                              nom
                            </InputLabel>
                            <TextField
                              id="nameClassFormation"
                              name="nameClassFormation"
                              // value={values.nameClassFormation || ''}
                              // onChange={this.props.handleChange('nameClassFormation')}
                              style={{
                                marginTop: '2%',
                              }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                          </div>
                          <div className="col-md-3">
                            <InputLabel required htmlFor="name-multiple">
                              Niveau
                            </InputLabel>
                            <Select
                              // options={this.props.subjectList.filter(
                              //   (element) =>
                              //     !this.props.values.subjectIDselected.includes(element.id)
                              // )}
                              // onChange={this.props.handleChangeSubject}
                              // isMulti
                              id="level"
                              name="level"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  '&:hover': { borderColor: 'gray' }, // border style on hover
                                  border: '1px solid lightgray', // default border color
                                  boxShadow: 'none', // no box-shadow
                                  borderTopStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderLeftStyle: 'none',
                                  borderRadius: ' none',
                                }),
                              }}
                            />{' '}
                          </div>
                          <div className="col-md-3">
                            <InputLabel required htmlFor="name-multiple">
                              Formation
                            </InputLabel>
                            <Select
                              // options={this.props.subjectList.filter(
                              //   (element) =>
                              //     !this.props.values.subjectIDselected.includes(element.id)
                              // )}
                              // onChange={this.props.handleChangeSubject}
                              // isMulti
                              id="formation"
                              name="formation"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  '&:hover': { borderColor: 'gray' }, // border style on hover
                                  border: '1px solid lightgray', // default border color
                                  boxShadow: 'none', // no box-shadow
                                  borderTopStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderLeftStyle: 'none',
                                  borderRadius: ' none',
                                }),
                              }}
                            />{' '}
                          </div>
                          <div className="col-md-3">
                            <InputLabel required htmlFor="name-multiple">
                              Formateur
                            </InputLabel>
                            <Select
                              // options={this.props.subjectList.filter(
                              //   (element) =>
                              //     !this.props.values.subjectIDselected.includes(element.id)
                              // )}
                              // onChange={this.props.handleChangeSubject}
                              // isMulti
                              id="formateur"
                              name="formateur"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  '&:hover': { borderColor: 'gray' }, // border style on hover
                                  border: '1px solid lightgray', // default border color
                                  boxShadow: 'none', // no box-shadow
                                  borderTopStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderLeftStyle: 'none',
                                  borderRadius: ' none',
                                }),
                              }}
                            />{' '}
                          </div>
                        </div>
                        <hr
                          style={{
                            width: '100%',
                            margin: 'auto',
                            marginTop: '40px',
                            marginBottom: '10px',
                            border: '1px dashed #979A9A',
                            paddingLeft: '-100%',
                          }}
                        />
                        {/* <div className="d-flex flex-row  mt-5"> */}
                        {[1, 2, 3].map((objSubject, index) => (
                          <div className="d-flex flex-row  mt-5">
                            <div className="col-md-3">
                              <InputLabel required htmlFor="name-multiple">
                                Agence
                              </InputLabel>
                              <Select
                              options={this.props.agenceSettings}
                                // options={this.props.subjectList.filter(
                                //   (element) =>
                                //     !this.props.values.subjectIDselected.includes(element.id)
                                // )}
                                // onChange={this.props.handleChangeSubject}
                                // isMulti
                                id="level"
                                name="level"
                                styles={{
                                  control: (base) => ({
                                    ...base,
                                    '&:hover': { borderColor: 'gray' }, // border style on hover
                                    border: '1px solid lightgray', // default border color
                                    boxShadow: 'none', // no box-shadow
                                    borderTopStyle: 'none',
                                    borderRightStyle: 'none',
                                    borderLeftStyle: 'none',
                                    borderRadius: ' none',
                                  }),
                                }}
                              />{' '}
                            </div>
                            <div className="col-md-3">
                              <InputLabel required htmlFor="name-multiple">
                                Collaborateurs
                              </InputLabel>
                              <Select
                                // options={this.props.subjectList.filter(
                                //   (element) =>
                                //     !this.props.values.subjectIDselected.includes(element.id)
                                // )}
                                // onChange={this.props.handleChangeSubject}
                                // isMulti
                                id="formation"
                                name="formation"
                                styles={{
                                  control: (base) => ({
                                    ...base,
                                    '&:hover': { borderColor: 'gray' }, // border style on hover
                                    border: '1px solid lightgray', // default border color
                                    boxShadow: 'none', // no box-shadow
                                    borderTopStyle: 'none',
                                    borderRightStyle: 'none',
                                    borderLeftStyle: 'none',
                                    borderRadius: ' none',
                                  }),
                                }}
                              />{' '}
                            </div>
                            <div className="col-md-6 col-lg-2 col-sm-12 p-0">
                              <Fab
                                size="small"
                                value={`${index}`}
                                color="primary"
                                aria-label="Add"
                                // onClick={() => {
                                //   if (!objSubject.isAdded) {
                                //     if (objSubject.subjectId != 0) {
                                //       this.props.addNewSubject(index + 1);
                                //     } else {
                                //     }
                                //   } else {
                                //     this.props.deleteChoice(index);
                                //   }
                                // }}
                              >
                                {objSubject.isAdded ? <RemoveIcon /> : <AddIcon />}
                              </Fab>
                            </div>
                            <div className="col-md-6 col-lg-3 col-sm-12 p-0"></div>
                          </div>
                        ))}
                        {/* <div className="col-md-3">
                            <InputLabel required htmlFor="name-multiple">
                              Agence
                            </InputLabel>
                            <Select
                              // options={this.props.subjectList.filter(
                              //   (element) =>
                              //     !this.props.values.subjectIDselected.includes(element.id)
                              // )}
                              // onChange={this.props.handleChangeSubject}
                              // isMulti
                              id="level"
                              name="level"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  '&:hover': { borderColor: 'gray' }, // border style on hover
                                  border: '1px solid lightgray', // default border color
                                  boxShadow: 'none', // no box-shadow
                                  borderTopStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderLeftStyle: 'none',
                                  borderRadius: ' none',
                                }),
                              }}
                            />{' '}
                          </div>
                          <div className="col-md-3">
                            <InputLabel required htmlFor="name-multiple">
                              Collaborateurs
                            </InputLabel>
                            <Select
                              // options={this.props.subjectList.filter(
                              //   (element) =>
                              //     !this.props.values.subjectIDselected.includes(element.id)
                              // )}
                              // onChange={this.props.handleChangeSubject}
                              // isMulti
                              id="formation"
                              name="formation"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  '&:hover': { borderColor: 'gray' }, // border style on hover
                                  border: '1px solid lightgray', // default border color
                                  boxShadow: 'none', // no box-shadow
                                  borderTopStyle: 'none',
                                  borderRightStyle: 'none',
                                  borderLeftStyle: 'none',
                                  borderRadius: ' none',
                                }),
                              }}
                            />{' '}
                          </div> */}
                        {/* </div> */}
                        <hr
                          style={{
                            width: '100%',
                            margin: 'auto',
                            marginTop: '40px',
                            marginBottom: '10px',
                            border: '1px dashed #979A9A',
                            paddingLeft: '-100%',
                          }}
                        />
                        <div
                          className={ClassNames({
                            'd-flex flex-row justify-content-end mt-3':
                              this.props.settings.locale !== 'ar',
                            '': this.props.settings.locale == 'ar',
                          })}
                        >
                          <Button
                            variant="contained"
                            onClick={this.props.handleCancel}
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
                            disabled={values.class == '' || values.subjectsSelected.length == 0}
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
              )}
            />
          )}
        </RoleContext.Consumer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings.locale,
  };
};
export default connect(mapStateToProps)(AddClassFormation);
