/* 深度遍历树形结构 */
export default (data=[]) => {
  data = JSON.parse(JSON.stringify(data));
  let lastIdx = -1;
  let array = [];
  for (let i = 0; i < data.length; i++) {
    lastIdx = node(array, lastIdx, data[i], '' + i);
  }
  return array;
};

let node = (array, lastIdx, e, j) => {
  e.tree_key = j;
  array[++lastIdx] = e;
  if (e.children) {
    for (let i = 0; i < e.children.length; i++) {
      lastIdx = node(array, lastIdx, e.children[i], j + '-' + i);
    }
  }
  return lastIdx;
};
