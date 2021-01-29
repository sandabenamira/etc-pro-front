import React from 'react';
import IconButton from '@material-ui/core/IconButton';
//import {Badge} from 'reactstrap';
import moment from 'moment';

const EventCell = ({event}) => {
  const {start_date_generic_event, end_date_generic_event,title,event_type,id} = event;
  
  return (

    <tr
      tabIndex={-1}
      key={'projects-'+id}>

      <td className="max-width-100">
        <p className="text-truncate mb-0">{title}</p>
      </td>
      <td className="max-width-100">
        
        <p className="text-truncate mb-0">{event_type}</p>
      </td>
      <td className="max-width-100">
        <p className="text-truncate mb-0">{moment(start_date_generic_event).format('LT')}</p>
      </td>
      <td className="max-width-100">
        <p className="text-truncate mb-0">{moment(end_date_generic_event).format('LT')}</p>
      </td>
      <td className="max-width-100">
        <p className="text-truncate mb-0">{moment(end_date_generic_event).format('LL')}</p>
      </td>
       <td className="max-width-100">
        <p className="text-truncate mb-0">{moment(end_date_generic_event).toNow()}</p>
      </td>

      

      {/* <td className="text-nowrap">{date}</td> */}
      {/* <td>
        <Badge className="d-block" color={color}>{status}</Badge>
      </td> */}
      <td className="text-right">
        <IconButton className="icon-btn text-light p-1"><i className="zmdi zmdi-more-vert text-grey"/></IconButton>
      </td>
      
    </tr>
    
  );
};

export default EventCell;
