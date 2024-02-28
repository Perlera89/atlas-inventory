import { Table } from 'antd'

export default function TableItem ({ locale, columns, dataSource, loading }) {
  return (
    <Table
      bordered
      locale={locale}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      scroll={{
        x: 'auto'
      }}
    />
  )
}
