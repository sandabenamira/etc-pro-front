import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Button from '@material-ui/core/Button';
import Auxiliary from "../../../../../util/Auxiliary";
import IntlMessages from '../../../../../util/IntlMessages';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { classService } from "../../../../../_services/class.service"


class AddSupplies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generic_event_id: '',
            supplies: [{ name: "", description: "" }],
        };
        this.handleAnnule = this.handleAnnule.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAnnule() {
        this.setState({
            supplies: [{ name: "", description: "" }],
            generic_event_id: ''
        })
        this.props.annuleModal();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let supplies = this.state.supplies;
        let data = {
            supplie_list: supplies,
            status: true,
            contextual_event_id: this.props.eventId
        }
        let apiEndpoint = `/supplies/addSupplie?access_token=${localStorage.token}`
        classService.post(apiEndpoint, data)
            .then(response => {
                alert('L\'ajout est effectué avec succès');
            })
            .catch(error => {
             });
        this.setState({
            supplies: [{ name: "", description: "" }],
        });
        this.props.annuleModal();
    }

    addSupplie = (e) => {
        this.setState((prevState) => ({
            supplies: [...prevState.supplies, { name: "", description: "" }],
        }));
    }

    handleChange = (e) => {
        let supplies = [...this.state.supplies]
        supplies[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({ supplies })
    }

    render() {
        let { supplies } = this.state
        return (
            <Auxiliary>
                <Modal isOpen={this.props.isOpen} >
                    <ModalHeader toggle={this.handleAnnule}>{<IntlMessages id="components.supplies" />}</ModalHeader>
                    <ModalBody>
                        <br />
                        <form autoComplete="off" onSubmit={this.handleSubmit}  >
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            {
                                                supplies.map((val, idx) => {
                                                    let nameId = `cat-${idx}`, descriptionId = `description-${idx}`
                                                    return (
                                                        <div className="row" key={nameId + idx}>
                                                            <div className="col-md-12" >
                                                                <label htmlFor={nameId}>{<IntlMessages id="comoponent.supplie" />} {`#${idx + 1}`}</label>
                                                                &nbsp;&nbsp;&nbsp;
                                                            <input
                                                                    onChange={this.handleChange}
                                                                    type="text"
                                                                    name={nameId}
                                                                    data-id={idx}
                                                                    id={nameId}
                                                                    value={supplies[idx].name}
                                                                    className="name"

                                                                />
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <label htmlFor={descriptionId}>{<IntlMessages id="room.description" />}</label>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <input
                                                                    onChange={this.handleChange}
                                                                    type="text"
                                                                    name={descriptionId}
                                                                    data-id={idx}
                                                                    id={descriptionId}
                                                                    value={supplies[idx].description}
                                                                    className="description"
                                                                />
                                                                &nbsp;&nbsp;
                                                            <Fab size="small" color="primary" aria-label="Add" onClick={this.addSupplie}>
                                                                    <AddIcon />
                                                                </Fab>
                                                            </div> &nbsp;&nbsp;
                                                    </div>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="col-md-12 text-left ">
                                <br /><br />
                                <Button variant="contained" className="jr-btn bg-indigo text-white " type="submit" >{<IntlMessages id="components.establishments.formadd.buttonAdd" />}</Button>
                                <Button variant="contained" className="jr-btn bg-grey text-white " onClick={this.handleAnnule}>{<IntlMessages id="components.establishments.formadd.buttonCancel" />}</Button>
                            </div>
                        </form>

                    </ModalBody>
                </Modal>
            </Auxiliary>
        )
    }
}

export default AddSupplies;