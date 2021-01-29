import React from "react";
import Avatar from '@material-ui/core/Avatar';
import { classService } from "../../../../_services/class.service";

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleName: ''
    };
  };

  componentWillMount() {
    let apiEndpoint= `/roles/` + localStorage.roles_id+`?access_token=${localStorage.token}`
    classService.get(apiEndpoint)
      .then(res => {
        if(res){
          const roleName = res.data.name;
          this.setState({ roleName });
        }
      })
  }
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (

      <div className="jr-profile-banner">
        <div className="jr-profile-container">
          <div className="jr-profile-banner-top">
            <div className="jr-profile-banner-top-left">
              <div className="jr-profile-banner-avatar">
                <Avatar className="size-90" alt="..." src={user.photo} />
              </div>
              <div className="jr-profile-banner-avatar-info">
                <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">{user.surname.toUpperCase()} {(user.name.charAt(0).toUpperCase() + user.name.substring(1).toLowerCase())}</h2>
                <p className="mb-0 jr-fs-lg">{this.state.roleName}</p>
              </div>
            </div>
            <div className="jr-profile-banner-top-right">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ProfileHeader;

