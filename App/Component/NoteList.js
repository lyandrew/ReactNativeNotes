import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

export default class NoteList extends React.Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }
  render() {
    return (
      <ListView
        style={styles.listView}
        contentContainerStyle={ styles.listContent }
        dataSource={this.ds.cloneWithRows(this.props.notes)}
        renderRow={
          (rowData) => {
            return (
              <TouchableHighlight onPress={() => this.props.onSelectNote(rowData)} style={styles.rowStyle} underlayColor="#9E7CE3">
                <Text style={styles.rowText}>{rowData.title}</Text>
              </TouchableHighlight>
            )
          }

          }/>
      )
  }
}
var styles = StyleSheet.create({
  rowStyle: {
    borderBottomColor: '#9E7CE3',
    borderBottomWidth: 1,
    padding: 20,
  },
  rowText: {
    fontWeight: '600'
  },
  listView: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
  },
  listContent: {
    alignItems: 'center'
  }
});
