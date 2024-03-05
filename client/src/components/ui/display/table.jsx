import { Table } from 'antd'

export default function TableItem ({ locale, columns, dataSource, loading, handleRowClick }) {
  return (
    <Table
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            handleRowClick(record)
          }
        }
      }}
      rowClassName='cursor-pointer'
      bordered
      size="small"
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
