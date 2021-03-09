import React from "react";
import IntlMessages from "../../../../../util/IntlMessages";
import IconWithTextCard from "../../../FinancialManagement/routes/ServiceAllocation/ServiceAllocationComp/IconWithTextCard";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import CardBox from "../../../../../components/CardBox/index";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { RoleContext } from "../../../../../Context";
import Can from "../../../../../can";
import { NavLink } from "react-router-dom";
import { getLevelClassSubjectData } from "../../../../../actions/MaterialCourseAction";
import moment from "moment";
import { roleIdProfessor, roleIdAdmin } from "../../../../../config/config";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import ReportIcon from "@material-ui/icons/Report";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FolderIcon from "@material-ui/icons/Folder";
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import BigCalendar from "react-big-calendar";


import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { ButtonGroup } from "reactstrap";
import Button from "@material-ui/core/Button";

var options = {
    month: "long",
  };
const localizer = BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const styles = (theme) => ({
  textColorPrimary: {
    color: "red",
  },
});

class DetailsCallRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ],
    };
    // this.handleChangeFolder = this.handleChangeFolder.bind(this);
    this.CustomToolbar = this.CustomToolbar.bind(this);

  }
  


  CustomToolbar = (toolbar) => {
    var currentDate = moment(toolbar.date);
    var weekStart = currentDate.clone().startOf("week");
    var weekEnd = currentDate.clone().endOf("week");

    const goToDayView = () => {
      toolbar.onView("day");
      this.props.handleView("day");
    };

    const goToWeekView = () => {
      toolbar.onView("week");
      this.props.handleView("week");
    };

    const goToMonthView = () => {
      toolbar.onView("month");
      this.props.handleView("month");
    };

    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };
    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };
    return (
      <div
        className="d-flex flex-row bd-highlight mb-3 d-flex 
justify-content-around"
      >
        <div className="p-2 bd-highlight"></div>
        <div className="p-2 bd-highlight">
          <ButtonGroup vertical={false}>
            <Button
              className=" jr-btn active" 
              
              onClick={goToDayView}
            >
              <span className="label-filter-off">
                <IntlMessages id="timetable.day" />
              </span>
            </Button>
            <Button
              className="jr-btn"
              
              onClick={goToWeekView}
            >
              <span className="label-filter-off">
                {" "}
                <IntlMessages id="timetable.week" />
              </span>
            </Button>
            <Button
              className="jr-btn"
              
              onClick={goToMonthView}
            >
              <span className="label-filter-off">
                <IntlMessages id="timetable.month" />
              </span>
            </Button>
          </ButtonGroup>
        </div>

        <div className="p-2 row bd-highlight">
          {/* <i
            className="zmdi zmdi-chevron-left zmdi-hc-2x 
mr-3"
            style={{ color: "#0000CD" }}
            onClick={goToBack}
          ></i> */}
          {/* {this.props.settings === "tunisia" ? (
            <span style={{ color: "#0000CD" }}>
              {" "}
              <IntlMessages id="timetable.week" />{" "}
              {moment(toolbar.date).weeks()}:{moment(weekStart).format("DD")} -{" "}
              {moment(weekEnd).format("DD") - 1}
              {new Date(weekStart).toLocaleDateString("ar-TN", options)}
            </span>
          ) : this.props.settings === "french" ? (
            <span style={{ color: "#0000CD" }}>
              {" "}
              <IntlMessages id="timetable.week" />{" "}
              {moment(toolbar.date).weeks()}:{moment(weekStart).format("DD")} -{" "}
              {moment(weekEnd).format("DD") - 1}
              {moment(weekStart).format("MMMM")}
            </span>
          ) : (
            <span style={{ color: "#0000CD" }}>
              {" "}
              <IntlMessages id="timetable.week" />{" "}
              {moment(toolbar.date).weeks()}:{moment(weekStart).format("DD")} -{" "}
              {moment(weekEnd).format("DD") - 1}
              {new Date(weekStart).toLocaleDateString("en-US", options)}
            </span>
          )} */}

          {/* <i
            className="zmdi zmdi-chevron-right zmdi-hc-2x 
ml-3"
            style={{ color: "#0000CD" }}
            onClick={goToNext}
          ></i> */}
          <h3 className="ml-5">
              {/* {this.props.values.classeName} */}
              </h3>
        </div>
      </div>
    );
  };



  eventStyleGetter(event, start, end, isSelected) {
    let diff = moment
      .utc(
        moment(event.end, "DD/MM/YYYY HH:mm").diff(
          moment(event.start, "DD/MM/YYYY HH:mm")
        )
      )
      .format("HH:mm");
    const mn = moment.duration(diff).asMinutes();
    let height = mn * 1.3 * 0.33 + "px";
    var backgroundColor = event.subjectColor;
    var style = {
      backgroundColor: backgroundColor,
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
      borderRadius: "10px",
      paddingTop: height,
    };
    return {
      style: style,
    };
  }


  render() {   /* eslint eqeqeq: "off" */
    const { classes } = this.props;
    const startDayTime = new Date();
    const endDayTime = new Date();
    console.log("alaaaaa");

    return (
      <div class="d-flex flex-column    col-lg-12 col-md-12 col-sm-6 bd-highlight ">
        <div
          class="d-flex flex-column    col-lg-12 col-md-12 col-sm-6 bd-highlight bg-green"
          style={{ height: "500px" }}
        >
          <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "all" })}>
                <IntlMessages id="service.filter.with.all" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>

            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "progress" })}>
                <IntlMessages id="status.classe.virtual.progrés" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "upcoming" })}>
                {" "}
                <IntlMessages id="status.classe.virtual.programmé" />
              </h5>
            </div>

            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "past" })}>
                <IntlMessages id="status.classe.virtual.términé" />
              </h5>
            </div>
          </div>
          <Typography
            variant="h6"
            style={{
              color: "black",
              fontWeight: "normal",
              fontFamily: "Roboto",
              fontSize: "12px",
              marginRight:"50%"
            }}
          >
            {"Asuidité/Registe d'appel"}
          </Typography>
          
          <div className=" d-flex flex-row     bd-highlight bg-dark  " style={{height:"50px"}}>
          <div className=" d-flex flex-row col-lg-10 col-md-10 col-sm-10 bd-highlight bg-pink ">

          <ListItem>
            <ListItemAvatar>
              <FolderIcon
                style={{
                  fontSize: "55",
                  marginRight: "20px",
                }}
                color="primary"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <div className="  d-flex row">
                  <Typography
                    variant="h4"
                    style={{
                      color: "#3F51B5",
                      fontWeight: "normal",
                      fontFamily: "Roboto",
                    }}
                  >
                    {this.props.match.params.className +
                      "/" +
                      this.props.match.params.subjectName}
                  </Typography>
                  <Typography
                    variant="h4"
                    style={{
                      color: "black",
                      fontWeight: "normal",
                      fontFamily: "Roboto",
                    }}
                  >
                    {"/" + this.props.match.params.schoolSessionName}
                  </Typography>
                </div>
              }
            />{" "}
          </ListItem>
          </div>

          <div className=" d-flex flex-row justify-content-end col-lg-2 col-md-2 col-sm-2 bd-highlight bg-white ">
          <PrintIcon
                style={{
                  fontSize: "55",
                  marginRight: "20px",
                }}
                color="primary"
              />
                 <PictureAsPdfIcon
                style={{
                  fontSize: "55",
                  marginRight: "20px",
                }}
                color="primary"
              />
          </div>

          </div>







          <div className=" d-flex flex-row     bd-highlight bg-dark  " style={{height:"50px"}}>
         
        <div
          class="d-flex flex-row justify-content-around   col-lg-12 col-md-12 col-sm-6 bd-highlight bg-red"
          style={{ height: "50px" }}
        >
          <div
            class=" bd-highlight bg-grey col-lg-3 col-md-2 col-sm-6 "
            style={{ height: "100%" }}
          ></div>

          <div
            class=" d-flex bd-highlight bg-dark col-lg-4 col-md-5 col-sm-12 justify-content-end "
            style={{ height: "995px", width: "100%" }}
          >
             <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "all" })}>
                <IntlMessages id="service.filter.with.all" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>

            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "progress" })}>
                <IntlMessages id="status.classe.virtual.progrés" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "upcoming" })}>
                {" "}
                <IntlMessages id="status.classe.virtual.programmé" />
              </h5>
            </div>

            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "past" })}>
                <IntlMessages id="status.classe.virtual.términé" />
              </h5>
            </div>
          </div>
          </div>

          <div
            class=" d-flex bd-highlight bg-dark col-lg-4 col-md-5 col-sm-12 justify-content-end "
            style={{ height: "100%" }}
          >
              <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "all" })}>
                <IntlMessages id="service.filter.with.all" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>

            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "progress" })}>
                <IntlMessages id="status.classe.virtual.progrés" />
              </h5>
            </div>
            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "upcoming" })}>
                {" "}
                <IntlMessages id="status.classe.virtual.programmé" />
              </h5>
            </div>

            <div className="p-2 bd-highlight">|</div>
            <div className="p-2 bd-highlight pointer">
              <h5 onClick={() => this.setState({ filterStatus: "past" })}>
                <IntlMessages id="status.classe.virtual.términé" />
              </h5>
            </div>
          </div>

          </div>
        </div>

          </div>









































        </div>


        <div
          class="d-flex flex-row justify-content-around   col-lg-12 col-md-12 col-sm-6 bd-highlight bg-red"
          style={{ height: "1000px" }}
        >




























          <div
            class=" bd-highlight bg-grey col-lg-3 col-md-2 col-sm-6 "
            style={{ height: "100%" }}
          >


<div class="p-2 bd-highlight">
                <DragAndDropCalendar
                  localizer={localizer}
                  events={[]}
                  defaultView="day"
                  timeslots={1}
                  min={startDayTime}
                  max={endDayTime}
                  eventPropGetter={this.eventStyleGetter}
                  resizableAccessor={() => false}
                  messages={{
                    month: <IntlMessages id="timetable.month" />,
                    day: <IntlMessages id="timetable.day" />,
                    today: <IntlMessages id="timetable.today" />,
                    previous: <IntlMessages id="appModule.back" />,
                    next: <IntlMessages id="appModule.next" />,
                    agenda: <IntlMessages id="timetable.agenda" />,
                    week: <IntlMessages id="timetable.week" />,
                  }}
                  // onSelectEvent={event => this.props.displayEventDetails(event)}
                  components={{
                    event: Event,
                    toolbar: this.CustomToolbar,
                  }}
                />
              </div>



          </div>




































































          <div
            class=" col-lg-4 col-md-5 col-sm-12 d-flex flex-column justify-content-start bg-yellow"
            style={{ height: "995px", width: "100%" }}
          >
            {this.state.tab.slice(0, 15).map((element) => (
              <AppBar
                position="relative"
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  border: "1px solid #abada8",
                  height: "5%",
                  backgroundColor: "#FFFFFF",
                  marginBottom: "2%",
                }}
              >
                <Tabs
                  variant="scrollable"
                  scrollButtons="on"
                  textColor="primary"
                >
                  <Tab
                    colorTransparent="red"
                    style={{ backgroundColor: "#FFFFFF" }}
                    icon={
                      <div class="d-flex justify-content-start mr-3">
                        <div className="bd-highlight">
                          <Avatar
                            align="left"
                            className="size-40"
                            alt="..."
                            src={this.state.uri}
                          />
                        </div>
                        <div className="bd-highlight mt-2 mr-2 pl-2">
                          <h5>{"Aloulou Amine"}</h5>
                        </div>
                      </div>
                    }
                  />
                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={
                      <Switch
                        inputProps={{ "aria-label": "success checkbox" }}
                      />
                    }
                  />

                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={<AccessAlarmsIcon />}
                  />

                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={<ReportIcon />}
                  />
                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={
                      <div
                        className="d-flex"
                        style={{
                          borderWidth: "thin",
                          borderStyle: "solid",
                          borderColor: "#979A9A",
                          height: "30px",
                        }}
                      ></div>
                    }
                  />
                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={<AddCircleIcon />}
                  />
                </Tabs>
              </AppBar>
            ))}
          </div>

          <div
            class=" bd-highlight bg-dark col-lg-4 col-md-5 col-sm-12"
            style={{ height: "100%" }}
          >
            {this.state.tab.slice(15, 30).map((element) => (
              <AppBar
                position="relative"
                style={{
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  border: "1px solid #abada8",
                  height: "5%",
                  backgroundColor: "#FFFFFF",
                  marginBottom: "2%",
                }}
              >
                <Tabs
                  variant="scrollable"
                  scrollButtons="on"
                  textColor="primary"
                >
                  <Tab
                    colorTransparent="red"
                    style={{ backgroundColor: "#FFFFFF" }}
                    icon={
                      <div class="d-flex justify-content-start mr-3">
                        <div className="bd-highlight">
                          <Avatar
                            align="left"
                            className="size-40"
                            alt="..."
                            src={this.state.uri}
                          />
                        </div>
                        <div className="bd-highlight mt-2 mr-2 pl-2">
                          <h5>{"Aloulou Amine"}</h5>
                        </div>
                      </div>
                    }
                  />
                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={
                      <Switch
                        inputProps={{ "aria-label": "success checkbox" }}
                      />
                    }
                  />

                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={<AccessAlarmsIcon />}
                  />

                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={<ReportIcon />}
                  />
                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={
                      <div
                        className="d-flex"
                        style={{
                          borderWidth: "thin",
                          borderStyle: "solid",
                          borderColor: "#979A9A",
                          height: "30px",
                        }}
                      ></div>
                    }
                  />
                  <Tab
                    style={{ backgroundColor: "#FFFFFF", minWidth: "12%" }}
                    icon={<AddCircleIcon />}
                  />
                </Tabs>
              </AppBar>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings.locale.languageId,

  };
};
export default withStyles(styles)(
  connect(mapStateToProps)(DetailsCallRegister)
);
