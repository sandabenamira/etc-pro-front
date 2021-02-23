import React from "react";
import { connect } from "react-redux";
import {
  generateBillForEstablishment,
  getInvoicesByEstablishmentId,
} from "../../../../../actions/BillAction";
import BillIconWithTextCard from "./BillIconWithTextCard";
import CardBox from "../../../../../components/CardBox/index";
import Button from "@material-ui/core/Button";
import IntlMessages from "../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { getLevelByEstablishmentId } from "../../../../../actions/classLevelAction";
 import { classService } from "../../../../../_services/class.service";
import { getSchoolYearEtabs } from "../../../../../actions/SchoolYearEtabAction";
import ListInvoices from "./ListInvoices";
import _ from "lodash";
import { UncontrolledAlert } from 'reactstrap';


const idHighSchool = 2;

class Billing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classesList: [],
      sections: [],
      classLevelId: "",
      classeId: "",
      schoolYearsId: "",
      month: "",
      listBills: [],
    };
    this.generateBill = this.generateBill.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.handleChangeClass = this.handleChangeClass.bind(this);
    this.handleChangeSection = this.handleChangeSection.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getSchoolYearEtabs());
    this.props.dispatch(
      getInvoicesByEstablishmentId(this.props.userProfile.establishment_id)
    );

    if (this.state.month !== "" && this.props.billReducer.length > 0) {
      let listBills = this.props.billReducer.filter(
        (element) => element.bill.month == this.state.month
      );
      this.setState({ listBills });
    } else {
      let listBills = this.props.billReducer;
      this.setState({ listBills });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.classes !== this.props.classes) {
      this.setState({
        classesList: this.props.classes,
      });
    }
    if (
      prevProps.billReducer !== this.props.billReducer ||
      prevState.month !== this.state.month
    ) {
      if (this.state.month !== "" && this.props.billReducer.length > 0) {
        let listBills = this.props.billReducer.filter(
          (element) => element.bill.month == this.state.month
        );
        this.setState({ listBills });
      } else {
        let listBills = this.props.billReducer;
        this.setState({ listBills });
      }
    }
  }
  generateBill(event) {
    event.preventDefault();
    this.props.dispatch(
      generateBillForEstablishment(this.props.userProfile.establishment_id)
    );
  }

  handleChange = (name) => (event) => {
    if (this.state.classLevelId == "" && this.state.classeId == "") {
      let listBills = this.props.billReducer.filter(
        (element) =>
          _.head(element.service_v2).fk_id_schol_year_v2 === event.target.value
      );
      this.setState({ listBills, [name]: event.target.value });
    } else if (this.state.classLevelId !== "" && this.state.classeId == "") {
      let listBills = this.props.billReducer.filter(
        (element) =>
          _.head(element.service_v2).fk_id_schol_year_v2 ===
            event.target.value &&
          element.student.level_id === this.state.classLevelId
      );
      this.setState({ listBills, [name]: event.target.value });
    } else if (this.state.classLevelId == "" && this.state.classeId !== "") {
      let listBills = this.props.billReducer.filter(
        (element) =>
          _.head(element.service_v2).fk_id_schol_year_v2 ===
            event.target.value &&
          element.student.class_id === this.state.classeId
      );
      this.setState({ listBills, [name]: event.target.value });
    } else {
      let listBills = this.props.billReducer.filter(
        (element) =>
          _.head(element.service_v2).fk_id_schol_year_v2 ===
            event.target.value &&
          element.student.class_id === this.state.classeId &&
          element.student.level_id === this.state.classLevelId
      );
      this.setState({ listBills, [name]: event.target.value });
    }
  };

  handleChangeLevel = (name) => (event) => {
    let classesListFiltred = this.props.classes.filter(
      (element) => element.level_id === event.target.value
    );
    let listBills = this.props.billReducer.filter(
      (element) => element.student.level_id === event.target.value
    );
    this.setState({
      classesList: classesListFiltred,
      listBills,
      [name]: event.target.value,
    });
    let apiEndpoint = `/section_by_levels?access_token=${localStorage.token}&filter[where][level_id]=${event.target.value}`;
    classService.get(apiEndpoint).then((response) => {
      this.setState({ sections: response.data });
    });
  };

  handleChangeClass = (name) => (event) => {
    if (_.isEmpty(this.state.classLevelId)) {
      let listBills = this.props.billReducer.filter(
        (element) => element.student.class_id === event.target.value
      );
      this.setState({ listBills, [name]: event.target.value });
    } else {
      let listBills = this.state.listBills.filter(
        (element) => element.student.class_id === event.target.value
      );
      this.setState({ listBills, [name]: event.target.value });
    }
  };

  handleChangeSection = (name) => (event) => {
    // let allocationServerFiltred = this.props.allocationService.filter(
    //   (element) => element.Class.section_id === event.target.value
    // );
    // this.setState({
    //   [name]: event.target.value,
    //   allocationServicesList: allocationServerFiltred,
    // });
  };

  changeMonth = (monthId) => (event) => {
    if (this.state.month == monthId) {
      this.setState({
        month: "",
      });
    } else {
      this.setState({
        month: monthId,
      });
    }
  };

  render() {
    
    let { classLevels, classes, schoolYears } = this.props;
    let { classesList, listBills, sections } = this.state;
    let detailCards = [
      {
        cardColor: "primary",
        imageIcon: require("../ServiceAllocation/Icone/project-icon.png"),
        title: listBills.length,
        subTitle: "TOTAL",
      },
      {
        cardColor: "secondary",
        imageIcon: require("../ServiceAllocation/Icone/tasks-icon.png"),
        title: "100",
        subTitle: "PAYÉE",
      },
      {
        cardColor: "info",
        imageIcon: require("../ServiceAllocation/Icone/teams-icon.png"),
        title: "120",
        subTitle: "NON PAYÉE",
      },
      {
        cardColor: "warning",
        imageIcon: require("../ServiceAllocation/Icone/files-icon.png"),
        title: "09",
        subTitle: "EN RETARD",
      },
    ];

    return (
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className="row">
          {detailCards.map((data, index) => (
            <div
              key={index}
              className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12"
            >
              <BillIconWithTextCard data={data} />
            </div>
          ))}
           
          <CardBox styleName="col-lg-12">
            <div>
          
              <div className="jr-btn-group">
                <Button
                  id="1"
                  variant="contained"
                  className={
                    this.state.month == "1"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("1")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Janvier{" "}
                </Button>
                <Button
                  id="2"
                  variant="contained"
                  className={
                    this.state.month == "2"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("2")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Février{"   "}
                </Button>
                <Button
                  id="3"
                  variant="contained"
                  className={
                    this.state.month == "3"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  style={{ marginRight: "7%", width: "8%" }}
                  onClick={this.changeMonth("3")}
                >
                  Mars {"   "}
                </Button>
                <Button
                  id="4"
                  variant="contained"
                  className={
                    this.state.month == "4"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("4")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Avril {"  "}
                </Button>
                <Button
                  id="5"
                  variant="contained"
                  className={
                    this.state.month == "5"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("5")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Mai {"  "}
                </Button>
                <Button
                  id="6"
                  variant="contained"
                  className={
                    this.state.month == "6"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("6")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Juin {"   "}
                </Button>
              </div>
              <div className="jr-btn-group">
                <Button
                  id="7"
                  variant="contained"
                  className={
                    this.state.month == "7"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("7")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Juillet {"   "}
                </Button>
                <Button
                  id="8"
                  variant="contained"
                  className={
                    this.state.month == "8"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("8")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Août
                </Button>
                <Button
                  id="9"
                  variant="contained"
                  className={
                    this.state.month == "9"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("9")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Septembre
                </Button>
                <Button
                  id="10"
                  variant="contained"
                  className={
                    this.state.month == "10"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("10")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Octobre
                </Button>
                <Button
                  id="11"
                  variant="contained"
                  className={
                    this.state.month == "11"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("11")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Novembre
                </Button>
                <Button
                  id="12"
                  variant="contained"
                  className={
                    this.state.month == "12"
                      ? "jr-btn bg-blue-grey text-white"
                      : "jr-btn bg-white"
                  }
                  onClick={this.changeMonth("12")}
                  style={{ marginRight: "7%", width: "8%" }}
                >
                  Décembre
                </Button>
              </div>
            </div>
          </CardBox>

          <div
            className="row col-lg-12 col-md-12"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-12">
              <TextField
                id="classLevelId"
                name="classLevelId"
                select
                value={this.state.classLevelId}
                onChange={this.handleChangeLevel("classLevelId")}
                SelectProps={{}}
                label={<IntlMessages id={`components.note.niveau`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {classLevels.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-12">
              <TextField
                id="classeId"
                name="classeId"
                select
                value={this.state.classeId}
                onChange={this.handleChangeClass("classeId")}
                SelectProps={{}}
                label={<IntlMessages id={`components.note.class`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {classesList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            {this.state.sectionStatus &&
            this.props.classLevels[0].estab_type_id !== idHighSchool ? (
              <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-12">
                <TextField
                  id="idSection"
                  name="idSection"
                  select
                  value={this.state.idSection}
                  onChange={this.handleChangeSection("idSection")}
                  SelectProps={{}}
                  label={
                    <IntlMessages
                      id={`components.class.level.input.label.section`}
                    />
                  }
                  InputProps={{ disableUnderline: true }}
                  margin="normal"
                  fullWidth
                >
                  {sections.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name_FR}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            ) : (
              ""
            )}

            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-12">
              <TextField
                id="schoolYearsId"
                name="schoolYearsId"
                select
                value={this.state.schoolYearsId}
                onChange={this.handleChange("schoolYearsId")}
                SelectProps={{}}
                label={<IntlMessages id={`filter.school.years`} />}
                InputProps={{ disableUnderline: true }}
                margin="normal"
                fullWidth
              >
                {schoolYears.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        </div>
        {this.props.successStatus ? (
            <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
              <span className="icon-addon alert-addon">
                <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
              </span>
              <span className="d-inline-block"> {this.props.message} </span>
            </UncontrolledAlert>
          ) : (
            ""
          )}
           {this.props.errorStatus ? (
          <UncontrolledAlert className="alert-addon-card bg-danger bg-danger text-white shadow-lg">
            <span className="icon-addon alert-addon">
              <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
            </span>
            <span className="d-inline-block"> {this.props.message} </span>
          </UncontrolledAlert>
        ) : (
          ''
        )}
        <br />
        <div className="row">
          <ListInvoices bills={listBills} month={this.state.month} />        
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    classLevels: state.ClassLevels.remoteLevels,
    classes: state.classes,
    schoolYears: state.schoolYearEtab.remoteSchoolYearEtab,
    billReducer: state.billReducer.remoteBills,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
  };
};

export default connect(mapStateToProps)(Billing);
