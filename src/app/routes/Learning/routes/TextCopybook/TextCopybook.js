import React from "react";
import IconWithTextCard from "../../../CommonComponents/IconWithTextCard";
import IntlMessages from "../../../../../util/IntlMessages";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CardBox from "../../../../../components/CardBox/index";
import TextField from "@material-ui/core/TextField";
import TextCopybookList from "./TextCopybookList";
import { ButtonGroup } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AddCopybook from './AddCopybook';
import RemoveSharpIcon from '@material-ui/icons/RemoveSharp';

class TextCopybook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenAddModal:false,
    };
  }
  openAddModal(){
this.setState({isOpenAddModal:true})
  }

  render() {
    let detailCards = [
      {
        cardColor: "primary",
        imageIcon: require("../../../../../assets/images/dashboard/teams-icon.png"),
        // title: this.props.virtualClasses.length,
        subTitle: <IntlMessages id={`message.Numbers.of.students`} />,
      },
      {
        cardColor: "secondary",
        imageIcon: require("../../../../../assets/images/dashboard/tasks-icon.png"),
        // title: this.state.prog,
        subTitle: <IntlMessages id={`homework.file`} />,
      },
      {
        cardColor: "info",
        imageIcon: require("../../../../../assets/images/dashboard/project-icon.png"),
        // title: this.state.encours,
        subTitle: <IntlMessages id={`homework.uncorrected`} />,
      },
      {
        cardColor: "success",
        imageIcon: require("../../../../../assets/images/dashboard/files-icon.png"),
        // title: this.state.encours,
        subTitle: <IntlMessages id={`homework.educational.files`} />,
      },
      {
        cardColor: "orange",
        imageIcon: require("../../../../../assets/images/dashboard/files-icon.png"),
        // title: this.state.encours,
        subTitle: <IntlMessages id={`homework.educational.files`} />,
      },
    ];
    return (
      <div>
        <div className="d-flex flex-wrap flex-column">
          <div className="p-2 ">
            <div class="d-flex flex-wrap flex-row justify-content-center">
              {detailCards.map((data, index) => (
                <div key={index} className="p-2">
                  <IconWithTextCard data={data} />
                </div>
              ))}
            </div>
          </div>
          <div className="pl-2 ">
            <CardBox styleName="col-lg-12 col-md-12">
              <div className="d-flex flex-wrap flex-row">
                <div className="pl-2 mt-2" style={{fontSize:"18px"}}>Nouveau contenu</div>
                <div className="pl-2">
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
                </div>
              </div>
            </CardBox>
          </div>
          <div className="pl-2 ">
            {this.state.isOpenAddModal && 
             <CardBox styleName="col-lg-12 col-md-12">
             <AddCopybook />
             </CardBox>
            }
         
          </div>
          <div className="pl-5" style={{ fontSize: "20px", color:"#0000CD" }}>
            Contenu séance
          </div>
          
          <div className="p-2">
            <div class=" pl-4 d-flex flex-wrap flex-row">
              <div className="p-2 col-lg-1 col-md-2 col-sm-2">
                <TextField
                  id="idClasse"
                  name="idClasse"
                  select
                  // value={this.state.filterClassId}
                  // onChange={this.handleChangeFilter('filterClassId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`components.note.subject`} />}
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
              <div className="p-2 col-lg-1 col-md-2 col-sm-2">
                <TextField
                  id="idClasse"
                  name="idClasse"
                  select
                  // value={this.state.filterClassId}
                  // onChange={this.handleChangeFilter('filterClassId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`components.note.class`} />}
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
              <div className="p-2 col-lg-1 col-md-2 col-sm-2">
                <TextField
                  id="idClasse"
                  name="idClasse"
                  select
                  // value={this.state.filterClassId}
                  // onChange={this.handleChangeFilter('filterClassId')}
                  SelectProps={{}}
                  label={<IntlMessages id={`material.professor.name`} />}
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
            </div>
          </div>
          <div className="p-2 ml-4">
          <ButtonGroup vertical={false}>
            <Button
              // className={this.state.status === 'day' ? ' jr-btn active' : 'jr-btn'}
              // onClick={goToCurrent}
              className="jr-btn active"
            >
              <span className="label-filter-off">
                {/* <IntlMessages id="timetable.day" /> */}
                Jour
              </span>
            </Button>
            <Button
              // className={this.state.status === 'week' ? ' jr-btn active' : 'jr-btn'}
              // onClick={goToWeekView}
              className="jr-btn"
            >
              <span className="label-filter-off">
                {' '}
                <IntlMessages id="timetable.week" />
              </span>
            </Button>
      
          </ButtonGroup>
          </div>
         
          <div className="p-2">
              <TextCopybookList />
          </div>
        </div>
      </div>
    );
  }
}

export default TextCopybook;
