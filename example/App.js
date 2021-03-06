import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Table from 'react-native-tree-table';

const data = [
  {
    name: 'Akira',
    age: 13,
    birth: '1995年4月29日',
    position: '舞蹈',
    group: 'SNH48 Team NII',
    id: '1'
  },
  {
    name: 'Tako',
    birth: '1996年5月11日',
    age: 23,
    position: '舞蹈',
    group: 'SNH48 Team SII',
    id: '2'
  },
  {
    name: 'Bee',
    age: 33,
    birth: '1992年4月11日',
    position: 'Vocal',
    group: 'SNH48 Team SII',
    id: '3'
  },
  {
    name: 'Kiki',
    age: 1,
    birth: '1995年8月27日',
    position: '舞蹈,Rapper',
    group: 'SNH48 Team SII',
    id: '4'
  }
];

const columns = [
  {
    propName: 'name',
    title: '名称',
    style: { width: 70 }
  },
  {
    propName: 'age',
    title: '年龄',
    style: { width: 70 }
  },
  {
    propName: 'birth',
    title: '出生地',
    style: { width: 150 }
  },
  {
    propName: 'position',
    title: '队内担当'
  },
  {
    propName: 'group',
    title: '所属团体'
  }
];

const data2 = [
  {
    name: 'Akira',
    age: 13,
    birth: '1995年4月29日',
    position: '舞蹈',
    group: 'SNH48 Team NII',
    id: '1',
    children: [
      {
        name: 'Akira2',
        birth: '1996年5月11日',
        age: 23,
        position: '舞蹈',
        group: 'SNH48 Team SII',
        id: '90'
      },
      {
        name: 'Akira3',
        birth: '1996年5月11日',
        age: 23,
        position: '舞蹈',
        group: 'SNH48 Team SII',
        id: '51'
      }
    ]
  },
  {
    name: 'Tako',
    birth: '1996年5月11日',
    age: 23,
    position: '舞蹈',
    group: 'SNH48 Team SII',
    id: '2'
  },
  {
    name: 'Bee',
    age: 33,
    birth: '1992年4月11日',
    position: 'Vocal',
    group: 'SNH48 Team SII',
    id: '3',
    children: [
      {
        name: 'Bee2',
        age: 1,
        birth: '1995年8月27日',
        position: '舞蹈,Rapper',
        group: 'SNH48 Team SII',
        id: '23'
      }
    ]
  },
  {
    name: 'Kiki',
    age: 1,
    birth: '1995年8月27日',
    position: '舞蹈,Rapper',
    group: 'SNH48 Team SII',
    id: '4'
  }
];

const columns2 = [
  {
    propName: 'name',
    title: '名称',
    style: { width: 120 }
  },
  {
    propName: 'age',
    title: '年龄',
    style: { width: 70 }
  },
  {
    propName: 'birth',
    title: '出生地',
    style: { width: 150 }
  },
  {
    propName: 'position',
    title: '队内担当'
  },
  {
    propName: 'group',
    title: '所属团体'
  }
];
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          {/* <Table dataSource={data} columns={columns} /> */}
        </ScrollView>
        <View style={styles.divide} />
        <ScrollView horizontal={true}>
          <Table dataSource={data2} columns={columns2} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  divide: {
    marginVertical: 30
  }
});
