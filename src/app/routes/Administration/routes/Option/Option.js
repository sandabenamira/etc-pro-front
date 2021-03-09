import React from "react";
import AddOption from "./AddOption";
import { connect } from "react-redux";
import { UncontrolledAlert } from "reactstrap";
import {
  addOptions
} from "../../../../../actions/Setting";
import CardBox from "../../../../../components/CardBox/index";

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartTime: new Date(),
      selectedEndTime: new Date(),
      startTime: "",
      endTime: "",
      appLangId: "",
      conferenceTool:""
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UNSAFE_componentWillMount(){
    const startDayTime = new Date();
    const endDayTime = new Date();
    if  (this.props.startTime && this.props.endTime) {
      startDayTime.setHours(this.props.startTime.substr(0, 2));
      startDayTime.setMinutes(this.props.startTime.substr(3, 2));
      endDayTime.setHours(this.props.endTime.substr(0, 2));
      endDayTime.setMinutes(this.props.endTime.substr(3, 2));
      this.setState({ selectedStartTime: startDayTime,
        selectedEndTime: endDayTime,})
    }
    this.setState({
      startTime:this.props.startTime,
      endTime:this.props.endTime,
      appLangId: this.props.appLang,
      conferenceTool:this.props.conferenceTool
    })
  }
  componentDidUpdate(prevProps){
    if ( prevProps.appLang !== this.props.appLang ) {
     this.setState({appLangId:this.props.appLang})
    }
    if ( prevProps.conferenceTool !== this.props.conferenceTool ) {
      this.setState({conferenceTool:this.props.conferenceTool
      })
    }
    if ( prevProps.startTime !== this.props.startTime ) {
      const startDayTime = new Date();
      if  (this.props.startTime ) {
        startDayTime.setHours(this.props.startTime.substr(0, 2));
        startDayTime.setMinutes(this.props.startTime.substr(3, 2));
        this.setState({ selectedStartTime: startDayTime, startTime:this.props.startTime})
      }
    }
    if ( prevProps.endTime !== this.props.endTime ) {
      const endDayTime = new Date();
      if  ( this.props.endTime) {
        endDayTime.setHours(this.props.endTime.substr(0, 2));
        endDayTime.setMinutes(this.props.endTime.substr(3, 2));
        this.setState({selectedEndTime: endDayTime, endTime:this.props.endTime,})
      }

    }
  }
  handleStartTimeChange = (time) => {
    this.setState({ selectedStartTime: time, startTime: time.format("LT") });
  };

  handleEndTimeChange = (time) => {
    this.setState({ selectedEndTime: time, endTime: time.format("LT") });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  
    let data = {
      app_lang: this.state.appLangId,
      start_time_calendar: this.state.startTime,
      end_time_calendar: this.state.endTime,
      establishment_id: this.props.userProfile.establishment_id,
      conference_tool:this.state.conferenceTool
    };
      this.props.dispatch(addOptions(data))
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleCancel() {
    this.setState({
      selectedStartTime: new Date(),
      selectedEndTime: new Date(),
      startTime: "",
      endTime: "",
      appLangId: "",
      conferenceTool:""
    });
  }


  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="app-wrapper ">
    
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
          ""
        )}
        <div className="d-flex flex-row flex-wrap d-flex justify-content-center">
        
        
          <div className="col-lg-6 col-md-6 col-sm-6">
          <CardBox
          styleName="col-lg-12 text-primary"
           >
    
          <AddOption
          establishment_id={this.props.userProfile.establishment_id}
          values={this.state}
          handleCancel={this.handleCancel}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleEndTimeChange={this.handleEndTimeChange.bind(this)}
          handleStartTimeChange={this.handleStartTimeChange.bind(this)}
        />
        </CardBox>
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    startTime : state.settings.startTime,
    endTime : state.settings.endTime,
    appLang : state.settings.appLang,
    conferenceTool : state.settings.conferenceTool,
    
  };
};

export default connect(mapStateToProps)(Option);
