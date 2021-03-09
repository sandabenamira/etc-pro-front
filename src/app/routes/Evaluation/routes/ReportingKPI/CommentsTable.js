import React, { Component } from "react";
import CommentsCell from "./CommentsCell";

let counter = 0;

function createData(name, desc, image) {
  counter += 1;
  return { id: counter, name, desc, image };
}

class PopularAuthorsTable extends Component {
  state = {
    data: [
      createData(
        "LAMAIRI Marwen",
        "Cette formation a été très intéressante mais les horaires ont été un peu raccourcis, ce qui est dommage car il y a beaucoup de matière à traiter :)",
        "https://s3.eu-west-3.amazonaws.com/classebook.data.storage/user1.png      ",
        "45"
      ),
      createData(
        "YOUNSSI Aymen ",
        "Très bonne et très complète formation, support parfait. Intervenant très pédagogue. ",
        "https://s3.eu-west-3.amazonaws.com/classebook.data.storage/user1.png      ",
        "73"
      ),
      createData(
        "KHALIL Khadija",
        "Très bonne formation : intéressante, complète, explicite, instructive et a répondu à mes attentes.",
        "https://s3.eu-west-3.amazonaws.com/classebook.data.storage/user2.jpg        ",
        "13"
      ),
    ],
  };

  render() {   /* eslint eqeqeq: "off" */
    const { data } = this.state;
    return (
      <div className="jr-comments">
        {data.map((data) => {
          return <CommentsCell key={data.id} data={data} />;
        })}
      </div>
    );
  }
}

export default PopularAuthorsTable;
