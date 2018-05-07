import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Size } from '../theme';

import ListEmpty from './ListEmpty';

import propTypes from 'prop-types';

const styles = {
  item0wrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemWrap: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 44
  },
  expandButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4
  },
  expandIcon: {
    fontSize: 14
  },
  thText: {
    color: '#a9a9a9'
  },
  defaultCol: {
    width: 140
  },
  defaultColBig: {
    width: 170
  },
  noHeight: {
    height: 0,
    minHeight: 0
  }
};

class TreeList extends React.PureComponent {
  state = {
    shrink: {},
    toggleShrink: this.toggleShrink,
    stateFromKey: 'state'
  };

  toggleShrink = index => {
    let shrink = this.state.shrink;
    this.setState({
      shrink: { ...shrink, [index]: !shrink[index] }
    });
  };

  componentDidMount() {
    /* 动态 */
    const { shrink, toggleShrink } = this.props;
    if (shrink && toggleShrink && typeof toggleShrink === 'function') {
      this.setState({
        stateFromKey: 'props'
      });
    }
  }

  hide = item => {
    let key = item.key.split('-') || [];
    let shrink = this[this.state.stateFromKey].shrink;
    /* 如果 shrink 没有值，或者 key 的长度是1(第一级元素) 那必定显示 */
    if (Object.keys(shrink).length < 1 || key.length < 2) {
      return false;
    }
    let result = false;
    /* 如果 0 - 那么 0X都是 -  */
    /* 0 + 00-  选负，任一负就是负 */
    for (let i = 0; i < key.length - 1; i++) {
      result = shrink[key.slice(0, i + 1).join('-')];
      if (result) {
        break;
      }
    }
    return result;
  };

  normalItem = (item, index) => {
    /* 符合一些条件的 item 高度为 0 */
    /* 展开的 项的 key 与 当前项的 key 符合。 */
    let columns = this.props.columns;
    return (
      <View
        style={[
          styles.itemWrap,
          {
            backgroundColor: index % 2 === 0 ? Colors.white : Colors.tableOddBg
          },
          this.hide(item) ? styles.noHeight : {}
        ]}
      >
        {columns.map((columnItem, columnIdx) => {
          let value = item[columnItem.propName];

          let transform = columnItem.valTransform;
          let style = columnItem.style;
          let render = columnItem.render;

          if (typeof transform === 'function') {
            value = transform(value);
          }

          if (typeof render === 'function') {
            /* 如果自带渲染函数，返回渲染函数的值 参数 （该项的值，该条数据对象，该条数据的index） */
            return render(value, item, index);
          }

          let keyArray = item.key.split('-');
          /* 缩进是每一列第一项都有的，但是expand 是有children且第一项才有的 */

          return columnIdx === 0 && columnItem.propName === 'name' ? (
            <View
              key={columnIdx}
              style={[
                styles.defaultColBig,
                styles.item0wrap,
                { paddingLeft: (keyArray.length - 1) * Size.px(48) },
                style,
                this.hide(item) ? styles.noHeight : {}
              ]}
            >
              {item.children &&
                !this.hide(item) && (
                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() =>
                      this[this.state.stateFromKey].toggleShrink(item.key)
                    }
                  >
                    {this.props.shrink[item.key] ? (
                      <Text style={styles.expandIcon}>+</Text>
                    ) : (
                      <Text style={styles.expandIcon}>-</Text>
                    )}
                  </TouchableOpacity>
                )}
              <Text>{value}</Text>
            </View>
          ) : (
            <Text key={columnIdx} style={[styles.defaultCol, style]}>
              {value}
            </Text>
          );
        })}
      </View>
    );
  };

  renderListHeader = () => {
    const columns = this.props.columns;
    return (
      <View
        style={{ backgroundColor: Colors.tableOddBg }}
        justifyContent="flex-start"
        padding="16"
        borderBottomWidth="1"
      >
        {columns.map((col, colIndex) => (
          <Text
            key={col.propName}
            style={[styles.defaultCol, styles.thText,col.style]}
          >
            {col.title}
          </Text>
        ))}
      </View>
    );
  };

  renderItem = info => {
    let { item, index } = info;
    item = item || {};

    return this.normalItem(item, index);
  };

  render() {
    const { data, style } = this.props;
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderListHeader()}
        keyExtractor={(item, index) => item.key}
        ListEmptyComponent={<ListEmpty />}
        style={style}
        scrollEnabled={false}
      />
    );
  }
}

TreeList.propTypes = {};


export default TreeList;
