import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import CardMenu from '../CardMenu';

class CardHeader extends React.Component {


  onOptionMenuSelect = event => {
    this.setState({menuState: true, anchorEl: event.currentTarget});
  };
  handleRequestClose = () => {
    this.setState({menuState: false});
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
    }
  }

  render() {   /* eslint eqeqeq: "off" */
    const {heading, subHeading} = this.props;
    let {styleName} = this.props;
    const {anchorEl, menuState} = this.state;
    return (
      <div className={`jr-card-header d-flex align-items-start ${styleName}`}>
        <div className="mr-auto">
          <h3 className="card-heading">{heading}</h3>
          {subHeading && <p className="sub-heading">{subHeading}</p>}
        </div>

        <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                      }}
                    >
                      <IconButton color="primary">
                        <i className="zmdi zmdi-more-vert" />
                      </IconButton>
                      &nbsp;
                      <IconButton color="primary">
                        <i className="zmdi zmdi-close" size="small" />
                      </IconButton>
                    </div>
        <CardMenu menuState={menuState} anchorEl={anchorEl}
                  handleRequestClose={this.handleRequestClose.bind(this)}/>
      </div>
    )
  }
}

export default CardHeader;
CardHeader.defaultProps = {
  styleName: '',
  subHeading: ''
};

