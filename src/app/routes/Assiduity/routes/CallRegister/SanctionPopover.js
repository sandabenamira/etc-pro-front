import React from "react";
import Auxiliary from "../../../../../util/Auxiliary";
import MomentUtils from "@date-io/moment";
import _ from "lodash";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Popover, PopoverBody } from "reactstrap";
import Select from "react-select";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class SanctionPopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { values } = this.props;
     return (
      <div>
        <Auxiliary>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Popover
              placement={"right"}
              target={"Popover-" + values.sutdentId}
              isOpen={values.isOpenSanction}
            >
              <PopoverBody>
                <form className="row"
                onSubmit={(e) => this.props.handleSubmitSanction(e,values.sutdentId )}
                >
                  <div className="card-body" style={{ width: 300 }}>
                    <div className="d-flex flex-column bd-highlight ">
                      {values.callRegisterSetting.sanction ? (
                        <>
                          <div
                            className="bd-highlight"
                            style={{
                              fontWeight: "bold",
                              fontSize: 14,
                              color: "#656564",
                            }}
                          >
                            <IntlMessages id="call.register.sanction" />
                          </div>
                          <div className=" bd-highlight">
                            <Select
                              value={this.props.values.sanctionSelected}
                              id="nomSelect"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  "&:hover": { borderColor: "gray" },
                                  border: "1px solid lightgray",
                                  boxShadow: "none",
                                  borderTopStyle: "none",
                                  borderRightStyle: "none",
                                  borderLeftStyle: "none",
                                  borderRadius: " none",
                                }),
                              }}
                              onChange={this.props.handleChangeSanctions}
                              options={this.props.values.sanctions}
                            />
                          </div>
                          <div className=" bd-highlight">
                            <TextField
                              name="descriptionSanction"
                              id="descriptionSanction"
                              label={<IntlMessages id="room.description" />}
                              onChange={this.props.handleChange("descriptionSanction")}
                              value={this.props.values.descriptionSanction}
                              margin="normal"
                              fullWidth
                            />
                          </div>
                      
                        </>
                      ) : (
                        ""
                      )}
                    
                      <div className=" d-flex flex-row bd-highlight mt-4">
                        <div className=" bd-highlight ml-2">
                          <Button
                            variant="contained"
                            className="bg-grey text-white "
                            style={{
                              borderBottomLeftRadius: "10px",
                              borderBottomRightRadius: "10px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                              width: "10%",
                              height: "80%",
                              textTransform: "capitalize",
                            }}
                            onClick={(e) => this.props.handleCancel()}
                          >
                            {
                              <IntlMessages id="components.classes.formadd.buttonCancel" />
                            }
                          </Button>
                        </div>

                        <div className=" bd-highlight">
                          <Button
                            variant="contained"
                            style={{
                              borderBottomLeftRadius: "10px",
                              borderBottomRightRadius: "10px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                              width: "10%",
                              height: "80%",
                              textTransform: "capitalize",
                            }}
                            className=" bg-indigo text-white "
                            type="submit"
                          >
                            <IntlMessages id="components.classes.formadd.buttonAdd" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </PopoverBody>
            </Popover>
          </MuiPickersUtilsProvider>
        </Auxiliary>
      </div>
    );
  }
}

export default SanctionPopover;
