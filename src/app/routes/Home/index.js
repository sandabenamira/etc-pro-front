import React from 'react';
import {connect} from 'react-redux';
 

class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div
        className="app-wrapper"
        style={{
          marginLeft: '5%',
          marginRight: '10%',
        }}
      >
        <h2>Home Page</h2>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
     
  };
};

export default connect(mapStateToProps)(Home);
