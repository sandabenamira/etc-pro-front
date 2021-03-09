import React, {Component} from 'react';
import TestComponent from 'app/routes/calendar/routes/basic';
import 'react-big-calendar/lib/less/styles.less';
import 'styles/app.scss';


class Test extends Component {
  render() {   /* eslint eqeqeq: "off" */
    return (
      <TestComponent/>
    );
  }
}

export default Test;