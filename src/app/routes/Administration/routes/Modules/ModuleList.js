
import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardBox from 'components/CardBox/index';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ModuleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: undefined,
            menuState: false
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRequestDelete = this.handleRequestDelete.bind(this);
    };

	onOptionMenuSelect = event => {
        this.setState({ menuState: true, anchorEl: event.currentTarget });
      };
      handleRequestClose = () => {
        this.setState({ menuState: false });
        };

    handleEdit(e) {
        e.preventDefault();
     this.props.editModule(e.currentTarget.value);
     this.setState({ menuState: false });
    };

    handleRequestDelete(e) {
        e.preventDefault();
   this.props.requestDeleteModule(e.currentTarget.value);
   this.setState({ menuState: false });
    };

    render() {
        const listModule = this.props.list;
        const { anchorEl, menuState } = this.state;
        return (
            <div className="app-wrapper">
            <CardBox styleName="col-lg-12" >
                <div className="table-responsive-material">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">{<IntlMessages id="component.module" />}</TableCell>
                                <TableCell align="right">{<IntlMessages id="room.description" />}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listModule.map(moduleItem => {
                                return (
                                    <TableRow key={moduleItem.id}>        
                                        <TableCell >{moduleItem.name}</TableCell>
                                        <TableCell align="right">{moduleItem.description}</TableCell>
                                        <TableCell>
												<IconButton onClick={this.onOptionMenuSelect.bind(this)}>
													<i className="zmdi zmdi-more-vert" /></IconButton>
												<Menu id="long-menu"
													anchorEl={anchorEl}
													open={menuState}
													onClose={this.handleRequestClose.bind(this)}
													MenuListProps={{
														style: {
															width: 150,
															paddingTop: 0,
															paddingBottom: 0
														},
													}}>
													<MenuItem onClick={this.handleEdit} value={moduleItem.id} >{<IntlMessages id="button.modify" />}</MenuItem>
													<MenuItem onClick={this.handleRequestDelete} value={moduleItem.id} >{<IntlMessages id="button.delete" />}</MenuItem>
												</Menu>

											</TableCell>
                                    </TableRow>
                                );

                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardBox>
        </div>
        )
    };
};
export default ModuleList;