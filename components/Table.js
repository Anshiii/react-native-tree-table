import React from 'react';
import { VirtualizedList, Text, View, TouchableOpacity } from 'react-native';

import ListEmpty from './ListEmpty';
import List from './List';
import iteratorTree from '../util/iteratorTree';
import propTypes from 'prop-types';

class Table extends React.PureComponent {
  state = {
    data: this.flattenData(this.props.data)
  };

  flattenData(data) {
    let newData = JSON.parse(JSON.stringify(data));

    /* 有任何之一的一级元素 带children key 且 值为数组，就认为是树形数组 */
    return data.some(item => item.children && Array.isArray(item.children))
      ? iteratorTree(newData)
      : data;
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    if (this.props.dataSource !== data) {
      this.setState({
        data: this.flattenData(data)
      });
    }
  }

  render() {
    const { style, columns } = this.props;
    return <List data={this.state.data} columns={columns} style={style} />;
  }
}

Table.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  style: PropTypes.object
};

export default Table;
