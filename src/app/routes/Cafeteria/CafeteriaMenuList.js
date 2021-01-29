import React, { Component } from 'react';
import CafeteriaMenuItem from './CafeteriaMenuItem';
import EditCafeteriaMenu from './EditCafeteriaMenu';
import { editMenu } from '../../../actions/CafeteriaAction';
import { connect } from 'react-redux';
class CafeteriaMenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_date: new Date(),
      prix: '',
      suite: '',
      dessert: '',
      entree: '',
      id: '',
    };
    this.editMenuShowModal = this.editMenuShowModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.editCafeteriaMenu = this.editCafeteriaMenu.bind(this);
  }

  editCafeteriaMenu = () => {
    var data = {};
    data.menu_date = this.state.menu_date;
    data.prix = this.state.prix;
    data.suite = this.state.suite;
    data.dessert = this.state.dessert;
    data.entree = this.state.entree;
    data.establishment_id = this.props.userProfile.establishment_id;
    data.status = true;
    data.id = this.state.id;
    this.props.editMenu(data);
    this.setState({
      editIsopen: false,
      menu_date: new Date(),
      prix: '',
      suite: '',
      dessert: '',
      entree: '',
    });
  };

  editMenuShowModal = (MenuObjectEdit) => {
    this.setState({
      editIsopen: true,
      menu_date: MenuObjectEdit.menu_date,
      prix: MenuObjectEdit.prix,
      suite: MenuObjectEdit.suite,
      dessert: MenuObjectEdit.dessert,
      entree: MenuObjectEdit.entree,
      establishment_id: MenuObjectEdit.establishment_id,
      id: MenuObjectEdit.id,
    });
  };

  handleChangeDate = (date) => {
    this.setState({ menu_date: date });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleCancel = () => {
    this.setState({
      editIsopen: false,
    });
  };

  render() {
    const { values } = this.props;
    var ListByFilter;

    if (values.selectedFilterDate === null) {
      ListByFilter = this.props.MenuList;
    } else {
      ListByFilter = this.props.MenuList.filter(
        (element) =>
          element.menu_date.slice(0, 10) === values.selectedFilterDate
      );
    }

    return (
      <div>
        {ListByFilter.length > 0 ? (
          <div className="row animated slideInUpTiny animation-duration-3">
            {ListByFilter.map((element) => (
              <div className="col-md-4 pt-3">
                <CafeteriaMenuItem
                  MenuItem={element}
                  editMenuShowModal={this.editMenuShowModal}
                />
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        {this.state.editIsopen === true ? (
          <EditCafeteriaMenu
            MenuList={this.props.MenuList}
            values={this.state}
            handleCancel={this.handleCancel}
            handleChange={this.handleChange}
            handleChangeDate={this.handleChangeDate}
            editCafeteriaMenu={this.editCafeteriaMenu}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProfile: state.auth.userProfile,
    successStatus: state.alert.success,
    errorStatus: state.alert.error,
    message: state.alert.message,
    settings: state.settings.locale,
    MenuList: state.CafeteriaReducer.remoteCafeteria,
  };
}

export default connect(
  mapStateToProps,
  {
    editMenu,
  }
)(CafeteriaMenuList);
