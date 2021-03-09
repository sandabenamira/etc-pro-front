import React from 'react';
import { connect } from 'react-redux';

import HomeworkItem from './HomeworkItem';

class ArchivedHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {   /* eslint eqeqeq: "off" */
    return (
      <div className="col-xl-12 col-md-12 col-lg-12 col-sm-6 ">
        <div className="   price-tables row pt-default d-flex flex-wrap justify-content-start ">
          {this.props.homeworks.map((element, index) => (
            <div className="col-md-12 col-lg-6 col-sm-6 col-xl-3 ">
              <HomeworkItem archived={true} key={index} homeworkItem={element} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
   };
};
export default connect(mapStateToProps)(ArchivedHomework);
