import React from 'react'
import { Divider, Table } from 'antd'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  }
]
const data = [
  {
    key: '1',
    name: 'Manuel Perlera',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Manuel Perlera',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Manuel Perlera',
    age: 32,
    address: 'Sydney No. 1 Lake Park'
  }
]
const TableItem = () => (
  <>
    <Table columns={columns} bordered dataSource={data} size="middle" />
  </>
)
export default TableItem
