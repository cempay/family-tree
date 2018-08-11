import React from 'react';
import { View, Text, Alert } from 'react-native';
import {retrieveAllRelatives} from '../Create/CreateActions';
import {isEmpty} from '../../Services/util';

export default class RelativesTreePage extends React.Component {
  static navigationOptions = {
    title: 'Relatives tree',
  };
  constructor(props) {
    super(props);
    this.state = {
      relatives: null
    };
  }

  componentWillMount() {
    debugger;
    this.getData();
  }

  getData = () => {
    retrieveAllRelatives()
      .then((relatives) => {
        this.setState({
          relatives
        })
      })
      .catch(() => {
        Alert.alert(
          'Error',
          'Error retrieving data'
        );
      });
  };

  render() {
    debugger;
    const {relatives} = this.state;
    return (
      <View style={{padding: 10}}>
        {
          isEmpty(relatives)
            ? <Text>No relatives</Text>
            : Object.keys(relatives).map((key) =>
              <View key={key}>
                {relatives[key].fullName}
              </View>
            )
        }
      </View>
    );
  }
}
