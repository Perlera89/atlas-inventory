import { Table } from 'antd'

export default function TableItem ({ locale, columns, data, loading }) {
  return (
    <Table
      bordered
      locale={locale}
      columns={columns}
      dataSource={data}
      loading={loading}
      scroll={{
        x: 'auto'
      }}
    />
  )
}
