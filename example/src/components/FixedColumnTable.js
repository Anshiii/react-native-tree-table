import React from 'react';
import { ScrollView, View } from 'react-native';

import { Icon, TreeList, Text } from '../../../component';
import { Common, Colors, Size } from '../../../config';
import { iteratorTree } from '../../../util/iteratorTree';
import { WAREHOUSE_PRODUCT_TABLE_MAP } from '../constant';
import { exchangeBoxCssToStyle } from '../../../util/exchangeBoxCssToStyle';
import { ListEmpty } from '../../../component';

const styles = exchangeBoxCssToStyle({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
});

export default class Component extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      shrink: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (this.props.data !== data) {
      this.setState({
        productList: data
      });
    }
  }

  toggleShrink = index => {
    let shrink = this.state.shrink;
    this.setState({
      shrink: { ...shrink, [index]: !shrink[index] }
    });
  };

  getColumns = () => {
    return Object.keys(WAREHOUSE_PRODUCT_TABLE_MAP).map(item => {
      let column = {
        title: WAREHOUSE_PRODUCT_TABLE_MAP[item],
        propName: item
      };
      if (item !== 'name') {
        /* 金额保留2位，非金额四位。 */
        if (['price', 'inventoryAmount'].indexOf(item) > -1) {
          column.valTransform = Common.changeMoney;
        } else {
          column.valTransform = value => Common.changeMoney(value, 0);
        }
        column.style = { textAlign: 'right' };
      } else {
        column.style = {
          width: Size.px(350),
          paddingRight: Size.px(8)
        };
      }
      return column;
    });
  };

  render() {
    const { data } = this.props;
    const { shrink } = this.state;
    let columns = this.getColumns();

    return (
      <ScrollView>
        {data.length > 0 ? (
          <View style={styles.wrap}>
            <TreeList
              style={{
                minWidth: Size.px(353)
              }}
              data={data}
              columns={columns.slice(0, 1)}
              shrink={shrink}
              toggleShrink={this.toggleShrink}
            />
            <ScrollView horizontal={true}>
              <TreeList
                style={{ minWidth: Size.DEVICE_WIDTH }}
                data={data}
                columns={columns.slice(1)}
                shrink={shrink}
                toggleShrink={this.toggleShrink}
              />
            </ScrollView>
          </View>
        ) : (
          <ListEmpty />
        )}
      </ScrollView>
    );
  }
}
