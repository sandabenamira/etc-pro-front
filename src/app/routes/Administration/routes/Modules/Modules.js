
import React from 'react';
import AddModule from './AddModule';
import DeleteModule from './DeleteModule';
import EditModule from './EditModule';
import ModuleList from './ModuleList';
import ModulesPage from './index';
import { connect } from "react-redux";
import { getModules } from '../../../../../actions/ModuleAction'


const mapStateToProps = (state) => {
    return {
        modules: state.module.remoteModules
    }
};

class Modules extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moduleItem: [],
            edit: false,
            modulesList: [],
            modalDelete: false,
            itemId: 0
        };
        this.editItemModule = this.editItemModule.bind(this);
        this.requestDeleteModule = this.requestDeleteModule.bind(this);
        this.handleCancelModalDelete = this.handleCancelModalDelete.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
    };
    editItemModule(id) {
        const moduleItem = this.props.modules.find(element => element.id == id);
        this.setState({ moduleItem: moduleItem, edit: true });
    };

    requestDeleteModule(id) {
        this.setState({ modalDelete: true, itemId: id });
    };

    handleCancelModalDelete() {
        this.setState({ modalDelete: false, itemId: 0 })
    };

    handleCancelModal() {
        this.setState({ edit: false })
    }


    componentDidMount() {
        this.props.getModules();
    };

    render() {
        return (
            <div className="app-wrapper">
                <AddModule />
                <ModuleList list={this.props.modules} editModule={this.editItemModule} requestDeleteModule={this.requestDeleteModule} />
                {this.state.edit ? <EditModule moduleItem={this.state.moduleItem} cancelModal={this.handleCancelModal} /> : ''}
                {this.state.modalDelete ? <DeleteModule cancelModalDelete={this.handleCancelModalDelete} itemId={this.state.itemId} /> : ''}
            </div>
        )
    };
};

export default connect(mapStateToProps, { getModules })(Modules);
