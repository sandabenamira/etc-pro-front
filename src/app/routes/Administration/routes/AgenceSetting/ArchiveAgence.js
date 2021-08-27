import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArchiveList from './ArchiveList';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import IntlMessages from "../../../../../util/IntlMessages";

export class ArchiveAgence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,

        };
    }

    render() {

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
                    onClick={this.props.OpenArchive}

                >
                    <ArrowBackIosOutlinedIcon />
                </IconButton>

                <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px", marginBottom: "1.5rem" }}>
                    <IntlMessages id="agency.management" />- Archive
                </div>
                <div className="p-2">
                    <ArchiveList />
                </div>

            </div>

        );


    }
}

const mapStateToProps = state => {
    return {};
};
export default connect(mapStateToProps)(ArchiveAgence);