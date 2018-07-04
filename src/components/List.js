import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  VirtualizedList
} from 'react-native';
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
  static defaultProps = {
    showHeader:true
  };
  constructor(props) {
    super(props);
    this.state = {};
    this._vList = React.createRef();
  }

  getItem = (data, index) => {
    return this.newData[index];
  };

  hide = item => {
    let key = item.key.split('-') || [];
    let shrink = this.props.shrink || {};
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
    const { fixedColumnName } = this.props;
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

          if (typeof transform === 'function') {
            value = transform(value);
          }
          let keyArray = item.key.split('-');
          /* 缩进是每一列第一项都有的，但是expand 是有children且第一项才有的 */

          return columnIdx === 0 && columnItem.propName === fixedColumnName ? (
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
              {item.hasChildren &&
                !this.hide(item) && (
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => this.props.toggleShrink(item.key)}
                >
                  {this.props.shrink[item.key] ? (
                    <Text style={styles.expandIcon}>+</Text>
                  ) : (
                    <Text style={styles.expandIcon}>-</Text>
                  )}
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => this.props.toggleShrink(item.key)}
              >
                <Text>{value}</Text>
              </TouchableOpacity>
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

  static renderListHeader = columns => {
    return (
      <View
        style={{ backgroundColor: Colors.tableOddBg }}
        justifyContent="flex-start"
        padding={32}
        borderWidth={1}
      >
        {columns.map((col, colIndex) => (
          <Text
            key={col.propName}
            style={[styles.defaultCol, col.style, styles.thText]}
          >
            {col.title}
          </Text>
        ))}
      </View>
    );
  };

  newData = [];

  getItemCount = data => {
    return data.length;
  };

  renderItem = info => {
    let { item, index } = info;
    item = item || {};
    item.hasChildren = Boolean(
      item.children && item.children.length && item.children.length > 0
    );

    return this.normalItem(item, index);
  };

  /**
   * 尽量不要用
   * @param obj
   */
  scrollTo = obj => {
    this._vList.current._scrollRef.scrollTo(obj);
  };

  render() {
    const {
      data,
      style,
      columns,
      scrollEnabled,
      showHeader,
      stickyHeaderIndices,
      onScroll
    } = this.props;
    return (
      <FlatList
        stickyHeaderIndices={stickyHeaderIndices}
        data={data}
        renderItem={this.renderItem}
        ListHeaderComponent={
          data.length > 0 && showHeader
            ? TreeList.renderListHeader(columns)
            : null
        }
        keyExtractor={(item, index) => item.key}
        ListEmptyComponent={<ListEmpty />}
        style={style}
        scrollEnabled={scrollEnabled}
        onScroll={onScroll}
        ref={this._vList}
      />
    );
  }
}

export default TreeList;
