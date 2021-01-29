
import React from 'react';
import IntlMessages from '../../../../../util/IntlMessages';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardBox from '../../../../../components/CardBox/index';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ExamList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: undefined,
			menuState: false, 
			refresh: false
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.handleRequestDelete = this.handleRequestDelete.bind(this);
	}

	onOptionMenuSelect = event => {
		this.setState({ menuState: true, anchorEl: event.currentTarget });
	};
	handleRequestClose = () => {
		this.setState({ menuState: false });
	};

	handleEdit(e) {
		e.preventDefault();
		this.props.editExam(e.currentTarget.value);
		this.setState({ menuState: false});
	};

	handleRequestDelete(e) {
		e.preventDefault();
		this.props.requestDeleteExam(e.currentTarget.value);
		this.setState({ menuState: false });
	};

	render() {
		const { anchorEl, menuState } = this.state;
		const listExams = this.props.listExams;
		const listSubject = this.props.listSubject;
		const listEstablishment = this.props.listEstablishment;
		return (
			<div className="app-wrapper">
				<CardBox styleName="col-lg-12" >
					<div className="table-responsive-material">
						<Table className="default-table table-unbordered table table-sm table-hover">
							<TableHead className="th-border-b">
								<TableRow>
									<TableCell>{<IntlMessages id="components.exam.subject" />}</TableCell>
									<TableCell>{<IntlMessages id="components.exam.type" />}</TableCell>
									<TableCell>{<IntlMessages id="components.exam.period" />}</TableCell>
									<TableCell>{<IntlMessages id="components.exam.coefficient" />}</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{listExams.map((Exam, index) => {
									return (
										<TableRow key={index}>
											{listSubject.map((subject, index) => {
												if (subject.id === Exam.subject_id) {
													return (
														<TableCell key={index}>{subject.name}</TableCell>
													);
												}
											})}
											<TableCell >{Exam.type}</TableCell>
											<TableCell>{Exam.period}</TableCell>
											<TableCell>{Exam.coefficient}</TableCell>

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
													<MenuItem onClick={this.handleEdit} value={Exam.id} >{<IntlMessages id="button.modify" />}</MenuItem>
													<MenuItem onClick={this.handleRequestDelete} value={Exam.id} >{<IntlMessages id="button.delete" />}</MenuItem>
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
	}
}

export default ExamList;