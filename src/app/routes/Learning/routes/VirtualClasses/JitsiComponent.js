import React, { Component } from 'react'
import Jitsi from 'react-jitsi'

export default class JitsiComponent extends Component {

    render() {
        return (
            <div>
                <Jitsi
                    roomName={this.props.values.virtualClassName}
                    // displayName={this.props.values.displayName}
                    // password={this.props.values.class_password}
                    displayName={this.props.values.classUrl}
                    password={this.props.values.password}
                    containerStyle={{ width: '1200px', height: '800px' }}
                    onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
                    config={{ startAudioOnly: true }}
                    interfaceConfig={{ filmStripOnly: true }}
                />
            </div>
        )
    }
}
