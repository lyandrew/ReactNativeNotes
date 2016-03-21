/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import SimpleButton from './App/Component/SimpleButton';
import NoteScreen from './App/Component/NoteScreen';
import HomeScreen from './App/Component/HomeScreen';

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'createNote':
        return (
          <SimpleButton
            onPress={() => navigator.pop()}
            customText='Back'
            style={styles.navBarLeftButton}
            textStyle={styles.navBarButtonText}
           />
        );
      default:
        return null;
    }
  },

  RightButton: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <SimpleButton
            onPress={() => {

              navigator.push({
                name: 'createNote',
                note: {
                  id: new Date().getTime(),
                  title: '',
                  body: '',
                  isSaved: false
                }
              });
            }}
            customText='Create Note'
            style={styles.navBarRightButton}
            textStyle={styles.navBarButtonText}
          />
        );
      case 'createNote':
        if (route.note.isSaved) {
          return (
            <SimpleButton
              onPress={
                () => {
                  navigator.props.onDeleteNote(route.note);
                  navigator.pop();
                }
              }
              customText='Delete'
              style={styles.navBarRightButton}
              textStyle={styles.navBarButtonText}
              />
          );
        } else {
          return null;
        }
      default:
        return null
    }
  },

  Title: function(route, navigator, index, navState) {
    switch (route.name) {
      case 'home':
        return (
          <Text style={styles.navBarTitleText}>React Notes</Text>
        );
      case 'createNote':
        return (
          <Text style={styles.navBarTitleText}>{route.note ? route.note.title : 'Create Note'}</Text>
        );
    }
  }
};

class ReactNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNote: {title:"", body:""},
      notes: {
        1: {title:"Note 1", body:"body", id:1},
        2: {title:"Note 2", body:"body", id:2}
      }
    }
    this.loadNotes();
  }
  async saveNotes(notes) {
    try {
      await AsyncStorage.setItem("@ReactNotes:notes", JSON.stringify(notes));
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  updateNote(note) {
    var newNotes = Object.assign({}, this.state.notes);
    note.isSaved = true;
    newNotes[note.id] = note;
    this.setState({notes:newNotes});
    this.saveNotes(newNotes);
  }
  deleteNote(note) {
    var newNotes = Object.assign({}, this.state.notes);
    delete newNotes[note.id];
    this.setState({notes:newNotes});
    this.saveNotes(newNotes);
  }
  async loadNotes() {
     try {
       var notes = await AsyncStorage.getItem("@ReactNotes:notes");
       if (notes !== null) {
         this.setState({notes:JSON.parse(notes)})
       }
     } catch (error) {
       console.log('AsyncStorage error: ' + error.message);
     }
   }
  renderScene (route, navigator) {
    var obj = Object.assign({}, this.state.notes);
    var arr = Object.keys(obj).map(function (key) {return obj[key]});
    switch (route.name) {
      case 'home':
        return (
          <HomeScreen navigator={navigator}
            notes={arr}
            onSelectNote={(note) => {
              this.setState({selectedNote:note})
              navigator.push({name:"createNote", note: note})}}/>
        );
      case 'createNote':
        return (
          <NoteScreen
            note={this.state.selectedNote}
            onChangeNote={ (note) =>{
              this.setState({selectedNote:{
                id: new Date().getTime(),
                title: '',
                body: ''
              }})
              this.updateNote(note)}} />
        );
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{name: 'home'}}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
        onDeleteNote={(note) => this.deleteNote(note)}
      />
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#5B29C1',
    borderBottomColor: '#48209A',
    borderBottomWidth: 1
  },
  navBarTitleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  //  marginVertical: 9  // iOS
    marginVertical: 16 // Android
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {
    color: '#EEE',
    fontSize: 16,
//    marginVertical: 10 // iOS
    marginVertical: 16 // Android
  }
});

AppRegistry.registerComponent('ReactNotes', () => ReactNotes);
