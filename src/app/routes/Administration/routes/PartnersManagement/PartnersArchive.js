import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartnersList from './PartnersList';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Partners from './Partners';

export class PartnersArchive extends Component {
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
                       Gestion des partenaires - Archive
                    </div>
                    <div className="p-2">
                        <PartnersList />
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
export default connect(mapStateToProps)(PartnersArchive);