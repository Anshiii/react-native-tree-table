import React from 'react';
import Box from './Box';
import Text from './TextEle';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Size } from '../config';

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  }
});

const ListEmpty = props => {
  const { height } = props;
  return (
    <Box style={[styles.box, { height }]}>
      <Text size={Size.px(40)} color={Colors.helperTextColor}>
        暂无数据
      </Text>
    </Box>
  );
};

ListEmpty.propTypes = {
  height: PropTypes.number
};

ListEmpty.defaultProps = {
  height: Size.px(300)
};

export default ListEmpty;
