import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Partners from './Partners';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

export class AddPartner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

        };
        this.openPartnersList = this.openPartnersList.bind(this);
    }
    openPartnersList() {
        this.setState({ open: true });
    }

    render() {
        if (this.state.open !== true) {
            return (
                <div className="app-wrapper"
                    style={{

                    }}
                >
                    <IconButton
                        aria-label="delete"
                        style={{
                            color: "#blue",
                            backgroundColor: "#blue",
                            width: "28px",
                            height: "28px",
                        }}
                        onClick={this.openPartnersList}

                    >
                        <ArrowBackIosOutlinedIcon />
                    </IconButton>

                    <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px", marginBottom: "1.5rem" }}>
                        Resultat de recherches pour GO MY CODE
                    </div>
                    <div className="d-flex flex-wrap flex-row col-lg-12 col-md-12 col-sm-12">
                        <div className="d-flex col-lg-6 col-md-6 col-sm-6">
                            <div className="col-lg-4 col-md-4 col-sm-5">
                                <Avatar
                                    alt="go my code"
                                    src="https://scontent.ftun15-1.fna.fbcdn.net/v/t1.6435-9/120805521_3329728503784965_2984770882616413953_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=973b4a&_nc_ohc=vbnp_4xquz0AX_Yim4t&_nc_oc=AQkW2XHfakV7hkLrJ5k9pjbQofkR1StF5kZU5NK5FZzZYeTdzz3mWLgaNsq0pqPDkR4&_nc_ht=scontent.ftun15-1.fna&oh=43803f658fe1942a63615850e24b8331&oe=61569C5E"
                                />
                                GO MY CODE Tunisie</div>
                            <div className="col-lg-8 col-md-8 col-sm-7">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        borderRadius: "25px",
                                        fontSize: "14px",
                                        fontFamily: "Roboto",
                                    }}
                                >
                                    Ajouter à mon réseau
                                </Button>
                            </div>
                        </div>
                        <div className="d-flex col-lg-6 col-md-6 col-sm-6">
                            aaaaa</div>
                    </div>
                </div>
            );
        }
        else {
            return <Partners openPartnersList={this.openPartnersList} />
        }
    }

}

const mapStateToProps = state => {
    return {};
};
export default connect(mapStateToProps)(AddPartner);