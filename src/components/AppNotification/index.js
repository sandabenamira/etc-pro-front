import React from 'react';

import NotificationItem from './NotificationItem';
import {notifications} from './data';
import CustomScrollbars from '../../util/CustomScrollbars';

const AppNotification = () => {
  return (
    <CustomScrollbars className="messages-list scrollbar" style={{height: 280}}>
         {notifications.map((notification, index) => <NotificationItem key={index} notification={notification}/>)
        }
     </CustomScrollbars>
  )
};

export default AppNotification;

