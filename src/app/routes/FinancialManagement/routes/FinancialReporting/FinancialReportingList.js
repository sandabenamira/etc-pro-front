import React from 'react';
import FinancialReportingItem from "./FinancialReportingItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IntlMessages from "../../../../../util/IntlMessages";

const data =[
    {id:1, name:"Formation Biat", type:"mejri", formateur :"Linda" , trainingFirm: "ADN", participant: 30, location:"Sousse", cost: "20000 DT", calculateReimbursement: "500"},
    {id:1, name:"Formation Biat", type:"mejri", formateur :"Linda" , trainingFirm: "ADN", participant: 30, location:"Sousse", cost: "20000 DT", calculateReimbursement: "500"},
    {id:1, name:"Formation Biat", type:"mejri", formateur :"Linda" , trainingFirm: "ADN", participant: 30, location:"Sousse", cost: "20000 DT", calculateReimbursement: "500"},
    {id:1, name:"Formation Biat", type:"mejri", formateur :"Linda" , trainingFirm: "ADN", participant: 30, location:"Sousse", cost: "20000 DT", calculateReimbursement: "500"},
    {id:1, name:"Formation Biat", type:"mejri", formateur :"Linda" , trainingFirm: "ADN", participant: 30, location:"Sousse", cost: "20000 DT", calculateReimbursement: "500"}

]
class FinancialReportingList extends React.Component {
constructor(props) {
    super(props);

    this.state = {
    };
}

    render() {
        return  <div className="table-responsive-material">

        <br />
        <Table className="default-table table-unbordered table table-sm table-hover">
          <TableHead className="th-border-b">
            <TableRow>
              <TableCell>
                {" "}
                {/* <IntlMessages id="components.student.formadd.section" /> */}
                Nom de formation
              </TableCell>
              <TableCell><IntlMessages id="service.type" /></TableCell>
              <TableCell>Formateur</TableCell>
              <TableCell>Cabinet de formation</TableCell>
              <TableCell>Participant</TableCell>
              <TableCell>Lieu</TableCell>
              <TableCell>Coût</TableCell>
              <TableCell>Calcule de remboursement</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              return (
                <FinancialReportingItem
                archived={true}
                  key={index}
                  item={item}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>;
    }
}


export default FinancialReportingList;