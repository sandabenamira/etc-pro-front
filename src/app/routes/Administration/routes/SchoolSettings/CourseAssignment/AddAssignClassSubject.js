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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
class AddAssignClassSubject extends React.Component {
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
                      <b>
                        <IntlMessages id="sidebar.components.courseAssignment" />
                      </b>
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
                        {' '}
                        <CardBox styleName="col-lg-12">
                          <div className="d-flex flex-row  ">
                            <div className="col-md-6">
                              <InputLabel required htmlFor="name-class">
                                {<IntlMessages id="class.choice" />}
                              </InputLabel>
                              <Select
                                options={this.props.ClassSettingsList}
                                onChange={this.props.handleChangeClass}
                                id="classRoom"
                                name="classRoom"
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
                            <div className="col-md-6">
                              <InputLabel required htmlFor="name-multiple">
                                {<IntlMessages id="subject.choice" />}
                              </InputLabel>
                              <Select
                                options={this.props.subjectList.filter(
                                  (element) =>
                                    !this.props.values.subjectIDselected.includes(element.id)
                                )}
                                onChange={this.props.handleChangeSubject}
                                isMulti
                                id="subject"
                                name="subject"
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
                        </CardBox>
                        <div
                          className={ClassNames({
                            'd-flex flex-row justify-content-end':
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
export default connect(mapStateToProps)(AddAssignClassSubject);
