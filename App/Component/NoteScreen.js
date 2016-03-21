import React, {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

export default class NoteScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {note:this.props.note, title: this.props.note.title, body: this.props.note.body, id: this.props.note.id};
  }
  updateNote(title, body) {
    var note = Object.assign(this.state.note, {title: title, body:body});
    this.props.onChangeNote(note);
    this.setState(note);
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            autoFocus={true}
            autoCapitalize="sentences"
            placeholder="Untitled"
            style={[styles.textInput, styles.title]}
            onEndEditing={(text) => {this.refs.body.focus()}}
            underlineColorAndroid="transparent"
            value={this.state.note.title}
            onChangeText={ (title) => this.updateNote(title, this.state.body, this.state.id)}
          />
        </View>
        <View style={[styles.inputContainer, {height: 300}]}>
          <TextInput
            ref="body"
            multiline={true}
            placeholder="Start typing"
            style={[styles.textInput, styles.body]}
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            value={this.state.body}
            onChangeText={ (body) => this.updateNote(this.state.title, body)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 64
  },
  title: {
    height: 40
  },
  body: {
    flex: 1
  },
  inputContainer: {
  //  backgroundColor: 'red',
    borderBottomColor: '#9E7CE3',
    borderBottomWidth: 1,
    flexDirection: 'column',
    //marginBottom: 10
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
});
