'use strict';

import React, {Component} from 'react';
import {RNUploader} from 'NativeModules';
import MyNavigationBar from './MyNavigationBar';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  DeviceEventEmitter
} from 'react-native';

import {AudioRecorder, AudioUtils} from 'react-native-audio';

class Record extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false
    };
  }
  

  componentDidMount() {
    let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 44100,
      Channels: 1,
      AudioQuality: "High",
      AudioEncoding: "aac"
    });
    
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
      console.log('Finished recording: ' + data.finished);
    };

    //
    DeviceEventEmitter.addListener('RNUploaderProgress', (data)=>{
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;

      console.log( "upload progress: " + progress + "%");
    });

  }

  _doUpload(){
    this._stop();
    let files = [
        {
            name: 'file',
            filename: 'test.aac',
            filepath: AudioUtils.DocumentDirectoryPath + '/test.aac',  // image from camera roll/assets library
            filetype: 'audio/aac',
        },
    ];

    let opts = {
        url: 'http://50.24.35.236:5000/upload',
        files: files, 
        method: 'POST',                             // optional: POST or PUT
        //headers: { 'Accept': 'application/json' },  // optional
        //params: { 'user_id': 1 },                   // optional
    };

    RNUploader.upload( opts, (err, response) => {
        if( err ){
            console.log(err);
            return;
        }

        let status = response.status;
        let responseString = response.data;
        //let json = JSON.parse( responseString );
        let json = responseString;
        console.log("responeString: " + json);
        console.log('upload complete with status ' + status);
    });
}


  _renderButton(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }

  _pause() {
    if (this.state.recording)
      AudioRecorder.pauseRecording();
    else if (this.state.playing) {
      AudioRecorder.pausePlaying();
    }
  }

  _stop() {
    if (this.state.recording) {
      AudioRecorder.stopRecording();
      this.setState({stoppedRecording: true, recording: false});
    } else if (this.state.playing) {
      AudioRecorder.stopPlaying();
      this.setState({playing: false, stoppedPlaying: true});
    }
  }

  _record() {
    AudioRecorder.startRecording();
    this.setState({recording: true, playing: false});
  }

  _play() {
    if (this.state.recording) {
      this._stop();
      this.setState({recording: false});
    }
    AudioRecorder.playRecording(); 
    this.setState({playing: true});
  }
 
  rightButtonHandler(){
    this.props.onClose();
  }

  render() {
    const titleConfig = {
      title: 'Contacts',
    };

    const rightButtonConfig = {
      title: 'CLOSE',
      handler: this.rightButtonHandler.bind(this)
    };
    
    return (
      <View style={styles.container}>
        <MyNavigationBar
          titletitle={titleConfig}
          rightButton={rightButtonConfig}
        />
        <View style={styles.controls}>
          {this._renderButton("RECORD", () => {this._record()}, this.state.recording )}
          {this._renderButton("STOP", () => {this._stop()} )}
          {this._renderButton("PAUSE", () => {this._pause()} )}
          {this._renderButton("PLAY", () => {this._play()}, this.state.playing )}
          {this._renderButton("UPLOAD", () => {this._doUpload()} )}
          <Text style={styles.progressText}>{this.state.currentTime}s</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b608a",
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#fff"
  },
  button: {
    padding: 20
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  activeButtonText: {
    fontSize: 20,
    color: "#B81F00"
  }

});

export default Record;