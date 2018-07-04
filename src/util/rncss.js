/* 

** 对样式里的margin,padding,border进行转换

支持以下赋值的写法
border：[1,'solid','red'];
borderLeft:[1,'solid','red'];
margin: [1,2,3,4]
padding:[2,4,5]
margin:[3,6]
margin:'auto'
*/

//转换pad margin的参数

/* 方向固定，只有borderDirection提供简写 */
const dr = ['Top', 'Right', 'Bottom', 'Left'];
const borderDr = dr.map(item => 'border' + item);

function argumentToOne(array) {
  //接受单个数字的值,或者'auto'
  if (typeof array === 'number' || typeof array === 'string') {
    return [array];
  }

  if (array.length === 2) {
    return array.concat(array);
  }

  if (array.length === 3) {
    return [...array, array[1]];
  }
  return array;
}

//转换border的参数
function argumentBorder(type, params = []) {
  //必须是 长度为3的数组 或者大于3，
  if (!params.length || params.length < 3) {
    return {};
  }
  return {
    [`${type}Width`]: params[0],
    borderStyle: params[1],
    [`${type}Color`]: params[2]
  };
}

//type = padding;margin
//返回 style的形式
function exchangePaddingOrMargin(type, value) {
  let argument = argumentToOne(value);
  let result = {};
  if (argument.length === 1) {
    result = {
      [type]: argument[0]
    };
  } else {
    argument.forEach((item, idx) => {
      result[`${type}${dr[idx]}`] = item;
    });
  }
  return result;
}

function parseOneCssObj(css) {
  let style = {};
  Object.keys(css).forEach(styleName => {
    if (styleName === 'padding' || styleName === 'margin') {
      let result = exchangePaddingOrMargin(styleName, css[styleName]);
      style = { ...style, ...result };
      return;
    }
    if (styleName === 'border' || borderDr.indexOf(styleName) > -1) {
      let result = argumentBorder(styleName, css[styleName]);
      style = { ...style, ...result };
      return;
    }
    style[styleName] = css[styleName];
  });
  return style;
}

export default reactNativeStyleInCss = function(styles) {
  let rawStyles = {};
  Object.keys(styles).forEach(item => {
    rawStyles[item] = parseOneCssObj(styles[item]);
  });
  return rawStyles;
});
