import React, { Component } from 'react'
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


export default class AddBook extends Component {
    render() {
        return (
            <div class="d-flex flex-wrap flex-column bd-highlight ">
            <div class="p-2 ">
            <div class="d-flex flex-wrap flex-row bd-highlight  justify-content-around">
            <div class="p-2 col-md-6 col-lg-4 col-sm-12">
                            <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.title" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="title"
                              name="title"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
                         
            </div>
            <div class="p-2 col-md-6 col-lg-4 col-sm-12">
            <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.author" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="author"
                              name="author"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
                         
            </div>
          </div>
            </div>
            <div class="p-2 ">
            <div class="d-flex flex-wrap flex-row bd-highlight  justify-content-around">
            <div class="p-2 col-md-6 col-lg-4 col-sm-12">
                            <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="Book.language" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="language"
                              name="language"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
                         
            </div>
            <div class="p-2 col-md-6 col-lg-4 col-sm-12">
            <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.genre" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="genre"
                              name="genre"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
                         
            </div>
          </div>
            </div>
            <div class="p-2 ">
            <div class="d-flex flex-wrap flex-row bd-highlight  justify-content-around">
            <div class="p-2 col-md-6 col-lg-4 col-sm-12">
                            <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.edition" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="edition"
                              name="edition"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
                         
            </div>
            <div class="p-2 col-md-6 col-lg-4 col-sm-12">
            <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.page" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="page"
                              name="page"
                              type="number"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
                         
            </div>
          </div>
            </div>
            <div class="p-2 ">
          
            <div class="d-flex flex-wrap flex-row bd-highlight  justify-content-around">
            <div class="p-5 col-md-6 col-lg-3 col-sm-12">
            <InputLabel
                              style={{
                                fontFamily: "Roboto",
                                fontSize: "18px",
                                marginTop: "-2%",
                              }}
                              required
                            >
                              {<IntlMessages id="book.stock" />}
                            </InputLabel>
                            <TextField
                               // error={values.nameError}
                              id="stock"
                              name="page"
                              type="number"
                              // value={values.userNationnality || ""}
                              // onChange={this.props.handleChange("userNationnality")}
                              // style={{
                              //   marginTop: "3%",
                              // }}
                              fullWidth
                              SelectProps={{
                                native: true,
                              }}
                            />
                            {/* <FormHelperText
                              error={values.nameError}
                              >
                                {values.nameError ? 'Nom de support de cours déja existe' : ''}
                              </FormHelperText> */}
                         
            </div>
            <div className="p-2 col-md-6 col-lg-3 col-sm-12 ">
                            <div className="d-flex flex-row justify-content-start align-items-center ">
                              <input
                                type="file"
                                className="d-none"
                                accept="image/png, image/jpeg,image/bmp,application/pdf,application/docx"
                                id="add-file"
                                multiple
                                // onChange={(e) => this.props.attachFile(e)}
                              />
                              <label htmlFor="add-file" className="d-flex  bd-highlight">
                                <CheckCircleIcon checked={true} color={"default"} />
                              </label>
                              <div className="p-2 bd-highlight">
                                <Typography
                                  variant="h6"
                                  style={{
                                    color: "grey",
                                    fontWeight: "normal",
                                  }}
                                >
                                  <IntlMessages id="book.etat.papiers" />
                                </Typography>
                              </div>
                            </div>
                            <div className="bd-highlight" style={{ marginTop: "-40px" }}>
                              <i className="zmdi zmdi-caret-down zmdi-hc-2x mt-4 ml-1 "></i>
                            </div>
                            <div className="d-flex flex-row bd-highlight ">
                              <div className="p-2 bd-highlight ">
                                <hr
                                  style={{
                                    height: "80%",
                                    margin: "auto",
                                    marginTop: "5%",
                                    marginBottom: "5%",
                                    border: "1px dashed #979A9A",
                                    paddingLeft: "-100%",
                                  }}
                                />
                              </div>
                              <div className=" bd-highlight ">
                                <div className="d-flex flex-column bd-highlight mb-3">
                                <div className=" bd-highlight " >
                                     Nouveau
                                    </div>
                                    <div className=" bd-highlight " >
                                     Bon état
                                    </div>
                                    <div className=" bd-highlight " >
                                     Usé
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-2 col-md-6 col-lg-4 col-sm-12 ">
                            <div className="d-flex flex-wrap flex-row justify-content-start align-items-center ">
                              <input
                                type="file"
                                className="d-none"
                                accept="image/png, image/jpeg,image/bmp,application/pdf,application/docx"
                                id="add-file"
                                multiple
                                // onChange={(e) => this.props.attachFile(e)}
                              />
                              <label htmlFor="add-file" className="d-flex  bd-highlight">
                                <CheckCircleIcon checked={true} color={"default"} />
                              </label>
                              <div className="p-2 bd-highlight">
                                <Typography
                                  variant="h6"
                                  style={{
                                    color: "grey",
                                    fontWeight: "normal",
                                  }}
                                >
                                  <IntlMessages id="book.numerique" />
                                </Typography>
                              </div>
                            </div>
                            <div className="bd-highlight" style={{ marginTop: "-40px" }}>
                              <i className="zmdi zmdi-caret-down zmdi-hc-2x mt-4 ml-1 "></i>
                            </div>
                            <div className="d-flex flex-row bd-highlight ">
                              <div className="p-2 bd-highlight ">
                                <hr
                                  style={{
                                    height: "80%",
                                    margin: "auto",
                                    marginTop: "5%",
                                    marginBottom: "5%",
                                    border: "1px dashed #979A9A",
                                    paddingLeft: "-100%",
                                  }}
                                />
                              </div>
                              <div className=" bd-highlight ">
                                <div className="d-flex flex-column bd-highlight mb-3">
                                <div className="p-2 bd-highlight " >
                                     
                                <div class="d-flex flex-row bd-highlight ">
                                <div class="p-1 bd-highlight"> 
                                <Typography
                                
                                style={{
                                  color: "grey",
                                  fontSize: "14px",
                                }}
                              >
                                <IntlMessages id="book.upload" />
                              </Typography>
                                </div>
          
            <div class="p-1 bd-highlight">
            <input
                              type="file"
                              className="d-none"
                              accept="image/png, image/jpeg,image/bmp"
                              id="add-photo"
                              // onChange={(e) => this.props.uploadPhoto(e)}
                            />
                             <label htmlFor="add-photo" >
                              <AddBox fontSize="inherit" style={{ fontSize: "25px" }} />
                            </label>
            </div>
           
            <div class="p-1 bd-highlight">
            <Typography
                                
                                style={{
                                  color: "grey",
                                  fontSize: "15px",
                                }}
                              >
                                <IntlMessages id="book.join.photo" />
                              </Typography>
            </div>
          </div>
                                    </div>
                                    <div className="p-2 bd-highlight " >
                                     
                                <div class="d-flex flex-row bd-highlight ">
                                <div class="p-1 bd-highlight"> 
                                <Typography
                                
                                style={{
                                  color: "grey",
                                  fontSize: "14px",
                                }}
                              >
                                <IntlMessages id="book.consult" />
                              </Typography>
                                </div>
          
            <div class="p-1 bd-highlight">
            <input
                              type="file"
                              className="d-none"
                              accept="image/png, image/jpeg,image/bmp"
                              id="add-photo"
                              // onChange={(e) => this.props.uploadPhoto(e)}
                            />
                             <label htmlFor="add-photo" >
                              <AddBox fontSize="inherit" style={{ fontSize: "25px" }} />
                            </label>
            </div>
           
            <div class="p-1 bd-highlight">
            <Typography
                                
                                style={{
                                  color: "grey",
                                  fontSize: "15px",
                                }}
                              >
                                <IntlMessages id="book.join.consult" />
                              </Typography>
            </div>
          </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>           
          </div>
          
          
          
            </div>
            <div class="p-2 ">
            <div class="d-flex flex-row-reverse ">
            <div class="p-2 bd-highlight">
            <div class="d-flex flex-row bd-highlight ">
            <div class="p-1 bd-highlight">
            <input
                              type="file"
                              className="d-none"
                              accept="image/png, image/jpeg,image/bmp"
                              id="add-photo"
                              // onChange={(e) => this.props.uploadPhoto(e)}
                            />
                             <label htmlFor="add-photo" >
                              <AddBox fontSize="inherit" style={{ fontSize: "25px" }} />
                            </label>
            </div>
           
            <div class="p-1 bd-highlight">
            <Typography
                                
                                style={{
                                  color: "grey",
                                  fontSize: "15px",
                                }}
                              >
                                <IntlMessages id="user.join.photo" />
                              </Typography>
            </div>
          </div>
            </div>
            
          </div>
            </div>
            <div class=" d-flex flex-wrap flex-row justify-content-end pt-1">
                          <div class="p-1">
                            <Button
                              variant="contained"
                              className="bg-grey text-white pr-2 "
                              style={{
                                borderBottomLeftRadius: "16px",
                                borderBottomRightRadius: "16px",
                                borderTopLeftRadius: "16px",
                                borderTopRightRadius: "16px",
                                width: "100px",
                                height: "30px",
                              }}
                            >
                              {
                                <IntlMessages id="components.establishments.formadd.buttonCancel" />
                              }
                            </Button>
                          </div>
                          <div className="p-1">
                            <Button
                            // disabled={values.roleId ==="" || values.schoolyearId===""}
                              variant="contained"
                              style={{
                                borderBottomLeftRadius: "16px",
                                borderBottomRightRadius: "16px",
                                borderTopLeftRadius: "16px",
                                borderTopRightRadius: "16px",
                                width: "100px",
                                height: "30px",
                              }}
                              className=" bg-indigo text-white pr-2 "
                              type="submit"
                            >
                              <IntlMessages id="service.button.publish" />
                            </Button>
                          </div>
                        </div>
          </div>
        )
    }
}
