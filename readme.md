# react-native-tree-table

在 FlatList 基础上封装的表格组件，支持树形数据的渲染。

## Install

```bash
npm install react-native-tree-table --save
```


## Usage

使用树形结构的数据

```jsx
import Table from 'react-native-tree-table ';
const data2 = [
  {
    name: 'Akira',
    age: 13,
    birth: '1995年4月29日',
    position: '舞蹈',
    group: 'SNH48 Team NII',
    id: '1',
    children: [
      {
        name: 'Akira2',
        birth: '1996年5月11日',
        age: 23,
        position: '舞蹈',
        group: 'SNH48 Team SII',
        id: '90'
      },
      {
        name: 'Akira3',
        birth: '1996年5月11日',
        age: 23,
        position: '舞蹈',
        group: 'SNH48 Team SII',
        id: '51'
      }
    ]
  },
  {
    name: 'Tako',
    birth: '1996年5月11日',
    age: 23,
    position: '舞蹈',
    group: 'SNH48 Team SII',
    id: '2'
  },
  {
    name: 'Bee',
    age: 33,
    birth: '1992年4月11日',
    position: 'Vocal',
    group: 'SNH48 Team SII',
    id: '3',
    children: [
      {
        name: 'Bee2',
        age: 1,
        birth: '1995年8月27日',
        position: '舞蹈,Rapper',
        group: 'SNH48 Team SII',
        id: '23'
      }
    ]
  },
  {
    name: 'Kiki',
    age: 1,
    birth: '1995年8月27日',
    position: '舞蹈,Rapper',
    group: 'SNH48 Team SII',
    id: '4'
  }
];

const columns2 = [
  {
    propName: 'name',
    title: '名称',
    style: { width: 120 }
  },
  {
    propName: 'age',
    title: '年龄',
    style: { width: 70 }
  },
  {
    propName: 'birth',
    title: '出生地',
    style: { width: 150 }
  },
  {
    propName: 'position',
    title: '队内担当'
  },
  {
    propName: 'group',
    title: '所属团体'
  }
];

<Table dataSource={data} columns={columns} />
```

![表格截图.gif](https://upload-images.jianshu.io/upload_images/3748553-4c23efdfd039efd2.gif?imageMogr2/auto-orient/strip)


## option
|    参数名    | 说明 | 类型 |
| ---------- | --- | --- |
| dataSource |  渲染表格的数据 | Array |
| columns       |  表格列的配置项(类似antd的columns) | Array|


#### column 的 配置 说明

|    配置名    | 说明 | 类型 |
| ---------- | --- | --- |
| propName |  属性的键 | String |
| title    |  对应的键的表头描述 | String|
| style    |  列的样式 | Style |
| valTransform    |  对应的值的转换 | Funciton(item,index) |

## Todo
* [ ] 默认样式的调整
* [ ] 添加树形列表展开按钮的自定义
