import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IntlMessages from '../../../../../../util/IntlMessages';
import EditGroupes from './EditGroupes';
import GroupesItem from './GroupesItem';
import DeleteGroupes from './DeleteGroupes';
import { connect } from 'react-redux';
import { deleteGroup, editGroup } from '../../../../../../actions/GroupsAction';
class GroupesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      item: {},
      deleteIsopen: false,
      deleteItem: {},
      group: '',
      classId: '',
      id: '',
      status: true,
      itemEdit: {},
    };
    this.handleAnnule = this.handleAnnule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleToggle = this.handleToggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };
  //   handleToggle() {
  //     this.handleCancel();
  //   }
  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: this.state.group,
      id: this.state.id,
      fk_id_class: this.state.classId,
      status: this.state.status,
    };
    this.props.editGroup(data);
    this.handleCancel();
  };
  handleDeleteGroup = (event) => {
    event.preventDefault();
    this.props.deleteGroup(this.state.deleteItem);
    this.setState({
      deleteIsopen: false,
    });
  };
  handleAnnule = () => {
    this.handleCancel();
  };
  handleCancel = () => {
    this.setState({
      isOpen: false,
      deleteIsopen: false,
      group: '',
      classId: '',
      id: '',
      status: true,
    });
  };

  handleEdit = (item, event) => {
    event.preventDefault();
    this.setState({
      isOpen: true,

      itemEdit: item,
    });
  };
  handleDelete = (item, event) => {
    event.preventDefault();
    this.setState({ deleteIsopen: true, deleteItem: item });
  };

  render() {
    /* eslint eqeqeq: "off" */
    return (
      <div className="table-responsive-material">
        <div>
          <h1>
            <b>
              <IntlMessages id="list.groupe" />
            </b>
          </h1>
        </div>
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {' '}
                <IntlMessages id="sidebar.components.groupes" />
              </TableCell>

              <TableCell>
                <IntlMessages id="sidebar.components.class" />
              </TableCell>
              <TableCell>
                <IntlMessages id="action.subject.module" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.groupsList.length === 0
              ? ''
              : this.props.groupsList.map((groupItem) => {
                  return <GroupesItem archived={false} groupItem={groupItem} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />;
                })}
          </TableBody>
        </Table>
        {this.state.isOpen ? (
          <EditGroupes
            closeModal={this.handleCancel}
            isOpen={this.state.isOpen}
            values={this.state}
            handleAnnule={this.handleAnnule}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            // handleToggle={this.handleToggle}
          />
        ) : (
          ''
        )}
        {this.state.deleteIsopen === true ? (
          <DeleteGroupes
            handleDeleteGroup={this.handleDeleteGroup}
            deleteItem={this.state.deleteItem}
            handleCancel={this.handleCancel}
            deleteIsopen={this.state.deleteIsopen}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,

  { editGroup, deleteGroup }
)(GroupesList);
