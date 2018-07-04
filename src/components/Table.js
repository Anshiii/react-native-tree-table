import React from 'react';
import { VirtualizedList, Text, View, TouchableOpacity } from 'react-native';

import ListEmpty from './ListEmpty';
import List from './List';
import iteratorTree from '../util/iteratorTree';
import propTypes from 'prop-types';

class Table extends React.PureComponent {
  state = {
    data: []
  };

  componentDidMount() {
    this.setState({
      data: this.flattenData(this.props.dataSource)
    });
  }

  flattenData(data = []) {
    let newData = JSON.parse(JSON.stringify(data));
    console.log(data);

    /* 有任何之一的一级元素 带children key 且 值为数组，就认为是树形数组 */
    return data.some(item => item.children && Array.isArray(item.children))
      ? iteratorTree(newData)
      : data;
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    if (this.props.dataSource !== dataSource) {
      this.setState({
        data: this.flattenData(dataSource)
      });
    }
  }

  render() {
    const { style, columns } = this.props;
    console.log(this.state.data);

    return <List data={this.state.data} columns={columns} style={style} />;
  }
}

Table.propTypes = {
  dataSource: propTypes.array,
  /* columns{propName,propName,render,valTransform} */
  columns: propTypes.array,
  style: propTypes.object
};

export default Table;
