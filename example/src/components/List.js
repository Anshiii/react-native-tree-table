import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Size } from '../theme';

import ListEmpty from './ListEmpty';
import reactNativeStyleInCss from 'react-native-style-in-css';

import propTypes from 'prop-types';

const styles = reactNativeStyleInCss({
  header: {
    backgroundColor: Colors.tableOddBg,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: [Size.px(12), Size.px(18)],
    borderBottom: [Size.px(1), 'solid', Colors.borderColor]
  },
  item0wrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  /* 普通itemWrap */
  itemWrap: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 44,
    flex: 1
  },
  /* 交互树形列表展开 or 闭合按钮 */
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
  /* 交互Icon */
  expandIcon: {
    fontSize: 14,
    lineHeight: 15
  },
  /* header 内容Item */
  thText: {
    color: '#a9a9a9'
  },
  /* 列的默认宽度 */
  defaultCol: {
    width: 120
  },
  noHeight: {
    height: 0,
    minHeight: 0
  }
});

class TreeList extends React.PureComponent {
  static defaultProps = {
    showHeader: true
  };

  constructor(props) {
    super(props);
    this.state = {
      shrink: {}
    };
    this._vList = React.createRef();
  }

  toggleShrink = key => {
    this.setState({
      shrink: {
        ...this.state.shrink,
        [key]: !this.state.shrink[key]
      }
    });
  };

  hide = item => {
    let key = item.tree_key.split('-') || [];
    let shrink = this.state.shrink || {};
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

  /* 处理transfrorm 和 render 得到真实的 view */
  getShowValue = (columnItem, item) => {
    let value = item[columnItem.propName];
    let transform = columnItem.valTransform;
    if (typeof transform === 'function') {
      value = transform(value);
    }
    return value;
  };

  normalItem = (item, index) => {
    let columns = this.props.columns;
    return (
      <View
        style={[
          styles.itemWrap,
          {
            backgroundColor: index % 2 === 0 ? Colors.white : Colors.tableOddBg
          }
        ]}
      >
        {columns.map((columnItem, columnIdx) => {
          let value = this.getShowValue(columnItem, item);
          let style = columnItem.style;
          return (
            <Text key={columnIdx} style={[styles.defaultCol, style]}>
              {value}
            </Text>
          );
        })}
      </View>
    );
  };

  /* item的外容器  树形首行：带缩进，其他 无缩进。 内容：树形列表带expand的 */
  treeItem = (item, index) => {
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
          let value = this.getShowValue(columnItem, item);

          let style = columnItem.style;
          let keyArray = item.tree_key.split('-');

          /* 缩进是每一列第一项都有的，但是expand 是有children且第一项才有的 */
          return columnIdx === 0 || columnItem.propName === fixedColumnName ? (
            <View
              key={columnIdx}
              style={[
                styles.defaultCol,
                styles.item0wrap,
                { paddingLeft: (keyArray.length - 1) * Size.px(28) },
                style,
                this.hide(item) ? styles.noHeight : {}
              ]}
            >
              {item.hasChildren &&
                !this.hide(item) && (
                <TouchableOpacity
                  style={styles.expandButton}
                  onPress={() => this.toggleShrink(item.tree_key)}
                >
                  {this.state.shrink[item.tree_key] ? (
                    <Text style={styles.expandIcon}>+</Text>
                  ) : (
                    <Text style={styles.expandIcon}>-</Text>
                  )}
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => this.toggleShrink(item.tree_key)}
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
      <View style={styles.header}>
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
    item.hasChildren = Boolean(
      item.children && item.children.length && item.children.length > 0
    );

    if (this.props.isTree) {
      return this.treeItem(item, index);
    } else {
      return this.normalItem(item, index);
    }
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
        keyExtractor={item => item.id}
        ListEmptyComponent={<ListEmpty />}
        style={[style]}
        scrollEnabled={scrollEnabled}
        onScroll={onScroll}
        ref={this._vList}
      />
    );
  }
}

export default TreeList;
