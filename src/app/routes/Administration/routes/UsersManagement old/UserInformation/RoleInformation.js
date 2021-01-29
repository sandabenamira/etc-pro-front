import React, { Component } from 'react'
import IntlMessages from "../../../../../../util/IntlMessages";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Can from "../../../../../../can";
import { RoleContext } from "../../../../../../Context";
import { UncontrolledAlert } from 'reactstrap';
import { connect } from "react-redux";
import { getNameRole } from "../../../../../../actions/countriesAction";

class RoleInformation extends Component {
    render() {
        const { values, handleChangeRole, handleChangeEstablishment, handleChange, handleBlur, touched, errors } = this.props

        return (
            <div>
                {values.communsuccessAlert? <UncontrolledAlert className="alert-addon-card bg-success bg-success text-white shadow-lg">
                    <span className="icon-addon alert-addon">
                        <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                    </span>
                    <span className="d-inline-block">{<IntlMessages id="notification.successMessage" />}</span>
                </UncontrolledAlert> : ''}
                <RoleContext.Consumer>
                    {({ role }) => (

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <TextField
                                        variant="outlined"
                                        required
                                        name="role_id"
                                        id="role_id"
                                        select
                                        label={<IntlMessages id="stuppUser.formadd.role" />}
                                        value={values.role_id}
                                        onChange={handleChangeRole('role_id')}
                                        SelectProps={{}}
                                        margin="normal"
                                        fullWidth >
                                        {values.roleList.map(role => (
                                            <MenuItem key={role.id} value={role.id}>
                                               {getNameRole(role.id, this.props.settings)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                            <div className="col-md-6" >
                                <Can
                                    role={role}
                                    perform="role-filter-establishment:visit"
                                    yes={() => (
                                        <div className="form-group">
                                            <TextField
                                                variant="outlined"
                                                required
                                                name="establishment_id"
                                                id="establishment_id"
                                                select
                                                label={<IntlMessages id="stuppUser.formadd.establishment" />}
                                                value={values.establishment_id}
                                                onChange={handleChangeEstablishment('establishment_id')}
                                                SelectProps={{}}
                                                margin="normal"
                                                fullWidth >
                                                {values.establishmentList.map(establishment => (
                                                    <MenuItem key={establishment.id} value={establishment.id}>
                                                        {establishment.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    )}

                </RoleContext.Consumer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        successStatus: state.alert.successSteper,
        errorStatus: state.alert.errorSteper,
        message: state.alert.messageSteper,
        settings: state.settings.locale.languageId,
    };
};


export default connect(mapStateToProps)(RoleInformation);