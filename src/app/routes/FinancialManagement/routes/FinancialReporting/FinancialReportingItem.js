import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
const FinancialReportingItem = ({ data }) => {
  const {
    id,
    name,
    Type,
    Formateur,
    Cabinet,
    Participants,
    Lieu,
    Prix,
    Coût,
    remboursement,
  } = data;
  return (
    <>
      <TableRow key={id}>
        <TableCell>
          {' '}
          <div className="user-profile d-flex flex-row align-items-center">
            <h5 className="user-name">{name} </h5>
          </div>
        </TableCell>

        <TableCell>{Type}</TableCell>
        <TableCell>{Formateur}</TableCell>
        <TableCell>{Cabinet}</TableCell>
        <TableCell>{Participants}</TableCell>
        <TableCell>{Lieu}</TableCell>
        <TableCell>{Prix}</TableCell>
        <TableCell>{Coût}</TableCell>
        <TableCell>{remboursement}</TableCell>
      </TableRow>
    </>
    // <tr tabIndex={-1} key={id}>
    //   <td>
    //     <div className="user-profile d-flex flex-row align-items-center">
    //       <h5 className="user-name">{name} </h5>
    //     </div>
    //   </td>

    //   <td><h5>{Type}</h5></td>
    //   <td><h5>{Formateur}</h5></td>

    //   <td><h5>{Cabinet}</h5></td>
    //   <td><h5>{Participants}</h5></td>
    //   <td><h5>{Lieu}</h5></td>
    //   <td><h5>{Prix}</h5></td>
    //   <td><h5>{Coût}</h5></td>
    //   <td><h5>{remboursement}</h5></td>

    // </tr>
  );
};

export default FinancialReportingItem;
