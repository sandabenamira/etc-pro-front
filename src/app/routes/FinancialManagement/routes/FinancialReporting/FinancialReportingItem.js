import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";

class FinancialReportingItem extends React.Component {
constructor(props) {
    super(props);

    this.state = {
    };
}

    render() 

    {
        const { item } = this.props;
        return <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.type}</TableCell>
        <TableCell>{item.formateur}</TableCell>
        <TableCell>{item.trainingFirm}</TableCell>
        <TableCell>{item.participant}</TableCell>
        <TableCell>{item.location}</TableCell>
        <TableCell>{item.cost}</TableCell>
        <TableCell>{item.calculateReimbursement}</TableCell>


      </TableRow>;
    }
}


export default FinancialReportingItem;