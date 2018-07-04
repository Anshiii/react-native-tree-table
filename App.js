import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Table from './src/components/Table';
export default class App extends React.Component {
  render() {
    let data = [
      {
        name: 'keo',
        age: 23,
        key: '1231312'
      }
    ];

    let columns = [
      {
        propName: 'name',
        title: '名称'
      },
      {
        propName: 'age',
        title: '年龄'
      }
    ];
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Table dataSource={data} columns={columns} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
