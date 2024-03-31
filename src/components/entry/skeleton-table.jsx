'use client'
import { Card, Table, Skeleton, Button } from 'antd'

import React from 'react'

const SkeletonCard = () => {
  return (
    <Card size="small">
      <Skeleton loading={true} paragraph={{ rows: 1 }} active />
    </Card>
  )
}

const SkeletonButton = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <Button className="w-40" />
        <Button className="w-96" />
        <Button className="w-40" />
      </div>
      <div className="flex gap-2 justify-end">
        <Button className="w-12" />
        <Button className="w-12" />
      </div>
    </div>
  )
}

// Skeleton para una tabla
const SkeletonTable = () => {
  const SkeletonColumn = ({ dataIndex }) => {
    return {
      title: '',
      dataIndex,
      key: dataIndex,
      render: () => <Skeleton paragraph={null} className="px-4 py-2" active />
    }
  }

  return (
    <Table
      size="small"
      bordered
      showHeader={false}
      dataSource={Array(3)
        .fill(null)
        .map((_, i) => ({ key: i }))}
      columns={[
        SkeletonColumn({ dataIndex: 'column1' }),
        SkeletonColumn({ dataIndex: 'column2' }),
        SkeletonColumn({ dataIndex: 'column3' }),
        SkeletonColumn({ dataIndex: 'column3' }),
        SkeletonColumn({ dataIndex: 'column3' })
      ]}
    />
  )
}

export default function SkeletonComponents () {
  return (
    <div className="flex flex-col gap-4">
      <SkeletonCard />
      <SkeletonButton />
      <SkeletonTable />
    </div>
  )
}
