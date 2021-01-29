import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import CardBox from '../../../../../components/CardBox';




class SchoolYearEtabList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        var schoolYearEtabList = this.props.schoolYearEtabs

        return (
            <div className="app-wrapper">
                <CardBox styleName="col-12">
                    <div className="table-responsive-material">
                        <Table className="default-table table-unbordered table table-sm table-hover">
                            <TableHead className="th-border-b">
                                <TableRow>
                                    <TableCell>
                                        {
                                            <IntlMessages id="components.student.formadd.establishment" />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            <IntlMessages id="sidebar.components.schoolYears" />
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {schoolYearEtabList.map((SchoolYearItem, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {
                                                this.props.establishmentsList.map(
                                                    (establishment, index) => {
                                                        if (
                                                            establishment.id ===
                                                            SchoolYearItem.establishment_id
                                                        ) {
                                                            return (
                                                                <TableCell key={index}>
                                                                    {this.props.settings == "tunisia" ? establishment.ar_name : establishment.name}
                                                                </TableCell>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                )
                                            }
                                            {
                                                this.props.schoolYearsList.map(
                                                    (schoolYear, index) => {
                                                        if (
                                                            schoolYear.id ===
                                                            SchoolYearItem.school_year_id
                                                        ) {
                                                            return (
                                                                <TableCell key={index}>
                                                                    {schoolYear.name}
                                                                </TableCell>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                )
                                            }

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CardBox>
            </div>
        )
    }
}


export default connect()(SchoolYearEtabList);
