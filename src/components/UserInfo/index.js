import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userSignOut } from '../../store/actions/Auth';
import IntlMessages from '../../util/IntlMessages';
import ColorOption from '../containers/Customizer/ColorOption';
import { NavLink } from 'react-router-dom';
import imageStudent from '../../app/routes/Administration/routes/StuppUser/imageUser/supAdmin.png';
import baseUrl from '../../config/config';
import { classService } from '../../_services/class.service';

function getRoleNameByID(roleId) {
  switch (roleId) {
    case '1':
      return <IntlMessages id="role.superAdmin" />;
    case '2':
      return <IntlMessages id="role.admin" />;
    case '3':
      return <IntlMessages id="toDo.professor" />;
    case '4':
      return <IntlMessages id="userStuppDisplay.Parent" />;
    case '5':
      return <IntlMessages id="userStuppDisplay.Student" />;
    case '6':
      return <IntlMessages id="role.supervisor" />;
    default:
      return '';
  }
}

class UserInfo extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    roleName: '',
    colorOption: false,
    establishmentName: '',
    uri: '',
    establishmentName_ar: '',
  };

  activePanel = () => {
    this.setState({ colorOption: true });
    this.setState({ open: false });
  };

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      roleName: '',
    });
  };

  handleCancelPanel() {
    this.setState({ colorOption: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userProfile.establishment_id !== this.props.userProfile.establishment_id) {
      let apiEndpoint =
        `/establishments/` +
        this.props.userProfile.establishment_id +
        `?access_token=${localStorage.token}`;
      classService.get(apiEndpoint).then((res) => {
        if (res) {
          const establishmentName = res.data.name;
          const establishmentName_ar = res.data.ar_name;
          this.setState({
            establishmentName,
            establishmentName_ar: establishmentName_ar,
            uri: res.data.logo,
          });

          // this.setState({ establishmentName,establishmentName_ar:establishmentName_ar, uri: `${baseUrl.baseUrl}/containers/` + establishmentName + `/download?access_token=${localStorage.token}` });
        }
      });
    }
  }

  render() {   /* eslint eqeqeq: "off" */
    const establishmentName = this.state.establishmentName;
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        {user.photo && this.state.uri ? (
          <Avatar alt="..." src={this.state.uri + user.photo} className="user-avatar " />
        ) : (
          <Avatar alt="..." src={imageStudent} className="user-avatar " />
        )}
        <div className="user-detail" onClick={this.handleClick}>
          {this.props.settings.languageId === 'tunisia' ? (
            <h4 className="user-name">
              {user.name_ar} {user.surname_ar}
              <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
            </h4>
          ) : (
            <h4 className="user-name">
              {user.surname.toUpperCase()} {user.name}
              <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
            </h4>
          )}
          <h6 className="user-name"> {getRoleNameByID(localStorage.roles_id)}</h6>
          {this.props.settings.languageId === 'tunisia' ? (
            <h6 className="user-name">{this.state.establishmentName_ar}</h6>
          ) : (
            <h6 className="user-name">{establishmentName.toUpperCase()}</h6>
          )}
        </div>
        <Menu
          className="user-info"
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              minWidth: 120,
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <NavLink to="/app/profile">
              <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
              <IntlMessages id="popup.profile" />
            </NavLink>
          </MenuItem>
          <MenuItem onClick={this.activePanel.bind(this)}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.setting" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.setState({ roleName: '' });
              this.handleRequestClose();
              this.props.userSignOut();
            }}
          >
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />
            <IntlMessages id="user.signOut" />{' '}
          </MenuItem>
        </Menu>
        {this.state.colorOption ? (
          <ColorOption cancelPanel={this.handleCancelPanel.bind(this)} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfile: state.auth.userProfile,
    settings: state.settings.locale,
  };
};

export default connect(mapStateToProps, { userSignOut })(UserInfo);
