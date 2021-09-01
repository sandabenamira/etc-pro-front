import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArchiveList from './ArchiveList';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import IntlMessages from "../../../../../util/IntlMessages";
import AgenceSetting from './AgenceSetting';

export class ArchiveAgence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

        };
        this.OpenAgenceList = this.OpenAgenceList.bind(this);
    }
    OpenAgenceList() {
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
                        onClick={this.OpenAgenceList}

                    >
                        <ArrowBackIosOutlinedIcon />
                    </IconButton>

                    <div className="p-2" style={{ color: "#4C25B7", fontSize: "26px", marginBottom: "1.5rem" }}>
                        <IntlMessages id="gestion.agence.agency.management" /> - <IntlMessages id="gestion.agence.archive" />
                    </div>
                    <div className="p-2">
                        <ArchiveList />
                    </div>
                </div>
            );
        }
        else {
            return <AgenceSetting OpenAgenceList={this.OpenAgenceList} />
          } 
    }

}

const mapStateToProps = state => {
    return {};
};
export default connect(mapStateToProps)(ArchiveAgence);