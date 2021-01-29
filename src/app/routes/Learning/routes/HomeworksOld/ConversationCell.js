import React from 'react';
import DownloadFiles from './DownloadFiles';
import { classService } from "../../../../../_services/class.service";
import _ from 'lodash';
var options = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
class ConversationCell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      downloadModal: false,

    }
    this.handleCancel = this.handleCancel.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
  }
  handleCancel() {
    this.setState({  downloadModal: false })
  };
  downloadFile() {
    this.setState({ downloadModal: true })
    const files = this.props.conversation.file;

    if (files !== null) {
      let apiEndpoint = '';
      var estblishmentId = localStorage.getItem('establishment_id');
      apiEndpoint = `/establishments/` + estblishmentId + `?access_token=${localStorage.token}`
      classService.get(apiEndpoint)
        .then(response => {
          if (response) {
            this.setState({
              establishmentName: response.data.name
            })
            apiEndpoint = `/containers/checkFileExist/${response.data.name}?access_token=${localStorage.token}`
            classService.get(apiEndpoint)
              .then((response) => {
                if (response) {
                  let fileList = _.isEmpty(response.data.checkFile) ? null :
                    response.data.checkFile.find(item => item.name === files);
                  const establishLogoUrl = _.isEmpty(fileList) ? null : `/containers/` + this.state.establishmentName + '/download/' + fileList.name + `?access_token=${localStorage.token}`;

                  if (establishLogoUrl !== null) {

                    classService.getPhoto(establishLogoUrl)

                      .then((response) => {
                        if (response) {
                          var arr = response.data;
                          var data2 = new Uint8Array(arr);
                          var blob = new Blob([data2], { type: 'application/pdf' });
                          var url = URL.createObjectURL(blob);
                          this.setState({
                            url: url,
                            downloadFile: true
                          })
                        }
                      })
                      .catch((err) => {
                       })
                  }
                  else {
                    this.setState({
                      url: null
                    })
                  }
                }
              });
          }
        })
    } else {
    }
  }
  render() {
    const { conversation, language } = this.props;
    return (
      <div className="d-flex module-detail-item">
        <div className="chat-toto-info">
          <div className="d-flex  flex-column">
            <br/>
            <b>
              <div className="name mr-2">
                {language === 'tunisia'
                  ? new Date(conversation.comment_date).toLocaleDateString('ar-TN', options)
                  : language === 'french'
                    ? new Date(conversation.comment_date).toLocaleDateString('fr-FR', options)
                    : new Date(conversation.comment_date).toLocaleDateString('en-US', options)}
                 </div>
              <div className="time text-muted">
                
                {language === 'tunisia'
                  ? <h4>{conversation.profile.user.surname_ar} {conversation.profile.user.name_ar} </h4>
                  : <h4>{conversation.profile.user.name} {conversation.profile.user.surname}</h4>
                  }
                </div>
            </b>
          </div>
          <div className="message">{conversation.comment}</div>
          <div className="text-primary"> <p onClick={() => this.downloadFile()} className=" mt-auto mb-0 pointer">{conversation.file_name}</p></div>
        </div>
        {this.state.downloadModal ? < DownloadFiles opendownload={this.state.downloadModal} cancelModal={this.handleCancel} url={this.state.url} /> : ''}
      </div>
    )
  };
}
export default ConversationCell;