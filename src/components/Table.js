import React from 'react';
import { VirtualizedList, Text, View, TouchableOpacity } from 'react-native';

import List from './List';
import iteratorTree from '../util/iteratorTree';
import propTypes from 'prop-types';

class Table extends React.PureComponent {
  state = {
    data: [],
    isTree: false
  };

  componentDidMount() {
    this.setState(this.flattenData(this.props.dataSource));
  }

  flattenData(dataSour = []) {
    let isTree = dataSour.some(
      item => item.children && Array.isArray(item.children)
    );

    /* 有任何之一的一级元素 带children key 且 值为数组，就认为是树形数组 */
    let data = isTree ? iteratorTree(dataSour) : dataSour;
    return {
      data,
      isTree
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    if (this.props.dataSource !== dataSource) {
      this.setState(this.flattenData(dataSource));
    }
  }

  render() {
    const { style, columns } = this.props;
    return (
      <List
        data={this.state.data}
        isTree={this.state.isTree}
        columns={columns}
        style={style}
      />
    );
  }
}

Table.propTypes = {
  dataSource: propTypes.array,
  /* columns{propName,propName,render,valTransform} */
  columns: propTypes.array,
  style: propTypes.object
};

export default Table;
