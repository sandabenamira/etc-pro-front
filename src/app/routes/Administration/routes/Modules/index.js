import React from 'react';
import Switch from '@material-ui/core/Switch';
import CardBox from '../../../../../components/CardBox/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IntlMessages from '../../../../../util/IntlMessages';

class ModulesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registre_appel: false,
            timetable: false,
            bulletin: false,
            messaging: false
        }
    }
    handleChange = name => (event, checked) => {
        this.setState({ [name]: checked });

    };
    render() {
        return (
            <div className="app-wrapper">

                <CardBox styleName="col-lg-12" >
                    <div className="table-responsive-material">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> {<IntlMessages id="component.model.name_model" />}</TableCell>
                                    <TableCell align="right">{<IntlMessages id="component.model.status" />}</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>


                                <TableRow>
                                    <TableCell>{<IntlMessages id="model.register_appel" />}</TableCell>
                                    <TableCell align="right">
                                        <Switch
                                            classes={{
                                                checked: 'text-success',
                                                bar: 'bg-success',
                                            }}
                                            checked={this.state.registre_appel}
                                            onChange={this.handleChange('registre_appel')}
                                            aria-label="registre_appel"
                                        />

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{<IntlMessages id="model.timetable" />}</TableCell>
                                    <TableCell align="right">
                                        <Switch
                                            classes={{
                                                checked: 'text-success',
                                                bar: 'bg-success',
                                            }}
                                            checked={this.state.timetable}
                                            onChange={this.handleChange('timetable')}
                                            aria-label="timetable"
                                        />

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{<IntlMessages id="model.bulletin" />}</TableCell>
                                    <TableCell align="right">
                                        <Switch
                                            classes={{
                                                checked: 'text-success',
                                                bar: 'bg-success',
                                            }}
                                            checked={this.state.bulletin}
                                            onChange={this.handleChange('bulletin')}
                                            aria-label="bulletin"
                                        />

                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{<IntlMessages id="model.messaging" />}</TableCell>
                                    <TableCell align="right">
                                        <Switch
                                            classes={{
                                                checked: 'text-success',
                                                bar: 'bg-success',
                                            }}
                                            checked={this.state.messaging}
                                            onChange={this.handleChange('messaging')}
                                            aria-label="messaging"
                                        />

                                    </TableCell>
                                </TableRow>


                            </TableBody>
                        </Table>
                    </div>

                </CardBox>
            </div>
        );
    }
}

export default ModulesPage;