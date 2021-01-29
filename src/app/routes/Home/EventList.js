import React from 'react';
import EventCell from './EventCell';


const EventList = ({ events }) => {
  return (
    <div className="table-responsive-material">
      <table className="project-list-table table remove-table-border mb-0">
        <thead>
          <tr>
            <th scope="col">
              <span className="d-block badge badge-success">Evenement</span>
            </th>
            <th scope="col">
              <span className="d-block badge badge-warning">Type d'evenement</span>
            </th>
            <th scope="col">
              <span className="d-block badge badge-info"> Heure début</span>
            </th>
            <th scope="col">
              <span className="d-block badge  badge-secondary"> Heure fin</span>
            </th>
            <th scope="col">
              <span className="d-block badge  badge-grey "> Date</span>
            </th>
            <th colSpan="2">
              <span className="d-block badge  badge-danger "> Durée restant</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => {
            return (
              <EventCell key={event.id} event={event} />
            );
          })}
        </tbody>
      </table>
    </div>
  );

};

export default EventList;