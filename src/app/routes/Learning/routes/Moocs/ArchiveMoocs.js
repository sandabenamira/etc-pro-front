import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import MoocsItem from "./MoocsItem";

class ArchiveMoocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div
      className="row col-lg-12 col-md-12 col-sm-6"
     
      >
       {!_.isEmpty(this.props.listMoocsArchived) ? (
  this.props.listMoocsArchived.map((Item, index) => (
    
      <MoocsItem archived={true} key={index} moocsItem={Item}/>
    
  ))
) : (
  <div></div>
)}

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    archivedClassSettings: state.ClassSettingsReducer.archivedClassSettings,
  };
};
export default connect(mapStateToProps)(ArchiveMoocs);


