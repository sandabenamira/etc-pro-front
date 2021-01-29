import React, { Component } from 'react'
import axios from "axios";
import baseUrl from "../../../config/config";
import _ from 'lodash';

export default class ActivityCardItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uri: ""
    }
  }

  UNSAFE_componentWillMount() {
    const establishment_id = localStorage.getItem('establishment_id');

    axios.get(`${baseUrl.baseUrl}/users/` + this.props.todo.user_id + `?access_token=${localStorage.token}`)
      .then(res => {
        var photo = res.data.photo
        axios.get(`${baseUrl.baseUrl}/establishments/` + establishment_id + `?access_token=${localStorage.token}`)
          .then(res => {

            const establishmentName = res.data.name

            axios.get(`${baseUrl.baseUrl}/containers/checkFileExist/${res.data.name}?access_token=${localStorage.token}`)
              .then((response) => {

                let fileList = _.isEmpty(response.data.checkFile) ? null :
                  response.data.checkFile.filter(item => item.name === photo);
                _.isEmpty(fileList) ?
                  this.setState({ uri: null })
                  :
                  this.setState({ uri: `${baseUrl.baseUrl}/containers/` + establishmentName + '/download/' + fileList[0].name + `?access_token=${localStorage.token}` })
              })
          })

      })
  }



  render() {
    console.log( this.props.todo,'toppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp');
    return (
      <div className="media user-profile">
        <div className="MuiAvatar-root size-50 mr-3">
          <img src="https://jumbo-react.g-axon.work/static/media/domnic-brown.aca44ca2.png" alt="Activity">
          </img>

          {this.state.uri == null ?
            <img src="https://pngimage.net/wp-content/uploads/2018/05/admin-avatar-png-1.png" alt="Activity"></img> :
            <img src={this.state.uri} alt="Activity"></img>
          }
        </div>
        <div className="media-body align-self-center">
          <p class="mb-0">
            <span class="jr-link">{this.props.todo.professor_name}</span> {this.props.todo.creation_date.hours + ' H , ' + this.props.todo.creation_date.min + ' min'}<br></br>
            <span class="jr-link">{this.props.todo.todo_type + ' , ' + this.props.todo.subject_title}</span>
          </p>
        </div>
      </div>
    )
  }
}
