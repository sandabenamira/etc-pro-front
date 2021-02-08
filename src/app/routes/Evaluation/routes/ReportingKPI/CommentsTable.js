import React, {Component} from 'react';
import CommentsCell from './CommentsCell';


let counter = 0;

function createData(name, desc, image) {
  counter += 1;
  return {id: counter, name, desc, image};
}

class PopularAuthorsTable extends Component {
  state = {
    data: [
      createData('LAMAIRI Marwen', 'Cette formation a été très intéressante mais les horaires ont été un peu raccourcis, ce qui est dommage car il y a beaucoup de matière à traiter :)',  'https://via.placeholder.com/150x150', '45'),
      createData('YOUNSSI Aymen ', 'Très bonne et très complète formation, support parfait. Intervenant très pédagogue. ',  'https://via.placeholder.com/150x150', '73'),
      createData('KHALIL Khadija', 'Très bonne formation : intéressante, complète, explicite, instructive et a répondu à mes attentes.',  'https://via.placeholder.com/150x150', '13'),
    ],
  };

  render() {
    const {data} = this.state;
    return (

      <div className="jr-comments">
        {data.map(data => {
          return (
            <CommentsCell key={data.id} data={data}/>
          );
        })}
      </div>
    );
  }
}

export default PopularAuthorsTable;