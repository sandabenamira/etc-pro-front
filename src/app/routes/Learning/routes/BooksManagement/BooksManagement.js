import React, { Component } from "react";
import CardBox from "../../../../../components/CardBox/index";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Can from "../../../../../can";
import { RoleContext } from "../../../../../Context";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";
import AddBox from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import AddBook from "./AddBook";
import BookList from "./BookList";
import ReservationList from "./ReservationList";
import AddAffectation from "./AddAffectation";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import IntegrationAutosuggest from "./IntegrationAutosuggest"



export default class BooksManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenAddModal: false,
      isOpenReservationModal: false,
      isOpenAddAffectation: false,
    };
  }
  openAddModal() {
    this.setState({ isOpenAddModal: true });
  }
  openReservationModal() {
    this.setState({ isOpenReservationModal: true });
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-wrap flex-column bd-highlight mb-3">
          <div className="p-3  " style={{ color: "blue", fontSize: "15px" }}>
            <IntlMessages id={`book`} />
          </div>
          <div className="p-3 ">
            <RoleContext.Consumer>
              {({ role }) => (
                <Can
                  role={role}
                  perform="add-service"
                  yes={() => (
                    <div className="d-flex flex-wrap flex-row bd-highlight mb-3">
                      <div className="p-2 bd-highlight col-lg-1 col-md-5 col-sm-8">
                        <TextField
                          id="idClasse"
                          name="idClasse"
                          select
                          // value={this.state.filterClassId}
                          // onChange={this.handleChangeFilter('filterClassId')}
                          SelectProps={{}}
                          label={<IntlMessages id={`book.genre.table`} />}
                          InputProps={{ disableUnderline: true }}
                          margin="normal"
                          fullWidth
                        >
                          {/* {this.state.filterClasses.length > 0 ? (
                            this.state.filterClasses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de classe
                            </MenuItem>
                          )} */}
                        </TextField>
                      </div>

                      <div className="pt-5 ">|</div>
                      <div className="p-2 bd-highlight col-lg-2 col-md-5 col-sm-2">
                        <TextField
                          id="idClasse"
                          name="idClasse"
                          select
                          // value={this.state.filterClassId}
                          // onChange={this.handleChangeFilter('filterClassId')}
                          SelectProps={{}}
                          label={<IntlMessages id={`book.disponibility`} />}
                          InputProps={{ disableUnderline: true }}
                          margin="normal"
                          fullWidth
                        >
                          {/* {this.state.filterClasses.length > 0 ? (
                            this.state.filterClasses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de classe
                            </MenuItem>
                          )} */}
                        </TextField>
                      </div>
                      <div className="pt-5 ">|</div>
                      <div className="p-2 bd-highlight col-lg-1 col-md-5 col-sm-2">
                        <TextField
                          id="idClasse"
                          name="idClasse"
                          select
                          // value={this.state.filterClassId}
                          // onChange={this.handleChangeFilter('filterClassId')}
                          SelectProps={{}}
                          label={<IntlMessages id={`book.order`} />}
                          InputProps={{ disableUnderline: true }}
                          margin="normal"
                          fullWidth
                        >
                          {/* {this.state.filterClasses.length > 0 ? (
                            this.state.filterClasses.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem key={0} value={0}>
                              Pas de classe
                            </MenuItem>
                          )} */}
                        </TextField>
                      </div>
                      <div className="pt-5 ">|</div>
                      <div className="pt-5  bd-highlight col-lg-1 col-md-5 col-sm-6">
                        <IntlMessages id={`components.todo.date`} />
                      </div>
                      
                      <div className=" bd-highlight col-lg-3 col-md-6 col-sm-2" style={{paddingTop:"27px"}}>
                      <IntegrationAutosuggest/>
                      </div>
                      </div>
                  )}
                />
              )}
            </RoleContext.Consumer>
          </div>
          <div className="p-2 ">
            <CardBox styleName="col-lg-12 col-md-12">
              <div className="d-flex flex-wrap flex-row  ">
                <div className="p-3 bd-highlight">
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="Add"
                    onClick={this.openAddModal.bind(this)}
                  >
                    {this.state.isOpenAddModal ? (
                      <RemoveSharpIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </Fab>
                  &nbsp;&nbsp; <IntlMessages id={`New.book`} />
                </div>
                <div className="p-3 bd-highlight">
                  <Fab
                    size="small"
                    aria-label="Add"
                    color="secondary"
                    onClick={this.openReservationModal.bind(this)}
                  >
                    {this.state.isOpenReservationModal ? (
                      <RemoveSharpIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </Fab>{" "}
                  &nbsp;&nbsp; <IntlMessages id={`New.book.reservation`} />
                </div>
              </div>
            </CardBox>
          </div>

          {this.state.isOpenAddModal && (
             <div className="" >
            <CardBox styleName="col-lg-12 col-md-12" >
              <AddBook />
            </CardBox>
            </div>
          )}

          <div className=" bd-highlight" style={{ width: "100%" }}>
            <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
              <BookList />
            </CardBox>
          </div>

          <div className=" bd-highlight">
            <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
              <AddAffectation />
            </CardBox>
          </div>

          {this.state.isOpenReservationModal && (
            <div className=" bd-highlight" style={{ width: "100%" }}>
              <CardBox styleName="col-lg-12 col-sm-12 col-md-12">
                <ReservationList />
              </CardBox>
            </div>
          )}
        </div>
      </div>
    );
  }
}
