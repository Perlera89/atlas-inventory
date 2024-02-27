'use client'
import CardItem from '@/components/ui/display/card'
import ModalItem from '@/components/ui/display/modal'
import TableItem from '@/components/ui/display/table'
import { Image, Card, Button, Radio, Typography } from 'antd'

import { LuBoxes, LuAlignJustify, LuLayoutGrid } from 'react-icons/lu'
import { useState } from 'react'

const { Text } = Typography

const dataSource = [
  {
    key: '1',
    name: 'Product 1',
    code: 'product1',
    stock: 32
  },
  {
    key: '2',
    name: 'product 2',
    code: 'product2',
    stock: 42
  },
  {
    key: '3',
    name: 'product 3',
    code: 'product3',
    stock: 42
  },
  {
    key: '4',
    name: 'product 4',
    code: 'product4',
    stock: 42
  },
  {
    key: '5',
    name: 'product 5',
    code: 'product5',
    stock: 42
  },
  {
    key: '6',
    name: 'product 6',
    code: 'product6',
    stock: 42
  }
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock'
  }
]

export default function InventoryPage () {
  const [openModal, setOpenMOdal] = useState(false)
  const [viewList, setViewList] = useState('list')

  const handleViewList = (e) => {
    setViewList(e.target.value)
  }

  const handleOpenModal = () => {
    setOpenMOdal(true)
  }

  const handleCloseModal = () => {
    setOpenMOdal(false)
  }
  return (
    <>
      <div className="flex flex-col gap-4">
        <CardItem title="Total products">
          <div className="flex items-center gap-2">
            <LuBoxes size='24px' />
            <h3 className="text-2xl font-semibold">6</h3>
          </div>
        </CardItem>
        <div className="flex justify-between">
          <Button onClick={handleOpenModal}>Add product</Button>
          <Radio.Group value={viewList} onChange={handleViewList}>
            <Radio.Button value="list">
              <LuAlignJustify title='List' className="h-full" />
            </Radio.Button>
            <Radio.Button value="kanban">
              <LuLayoutGrid title='Kanban' className="h-full" />
            </Radio.Button>
          </Radio.Group>
        </div>
        <ModalItem
          title="Modal"
          width={500}
          isModalOpen={openModal}
          handleCancel={handleCloseModal}
        />
        {viewList === 'list'
          ? (
          <TableItem dataSource={dataSource} columns={columns} />
            )
          : (
          <div className="grid grid-cols-5 gap-2">
            <Card size='small' className='hover:bg-dark-gray transition-colors hover:cursor-pointer'>
              <div className="flex gap-4">
                <Image width={75} height={75} preview={{ mask: null }} fallback="/fallback.png" src="" />
                <div>
                  <h3 className="text-lg font-bold">Product 6</h3>
                  <div className="flex gap-2">
                    <Text>Stock:</Text>
                    <Text type="secondary">32</Text>
                  </div>
                  <div className="flex gap-2">
                    <Text>Price:</Text>
                    <Text type="secondary">$100</Text>
                  </div>
                </div>
              </div>
            </Card>
            <Card size='small' className='hover:bg-dark-gray transition-colors hover:cursor-pointer'>
              <div className="flex gap-4">
                <Image width={75} height={75} preview={{ mask: null }} fallback="/fallback.png" src="" />
                <div>
                  <h3 className="text-lg font-bold">Product 6</h3>
                  <div className="flex gap-2">
                    <Text>Stock:</Text>
                    <Text type="secondary">32</Text>
                  </div>
                  <div className="flex gap-2">
                    <Text>Price:</Text>
                    <Text type="secondary">$100</Text>
                  </div>
                </div>
              </div>
            </Card>
            <Card size='small' className='hover:bg-dark-gray transition-colors hover:cursor-pointer'>
              <div className="flex gap-4">
                <Image width={75} height={75} preview={{ mask: null }} fallback="/fallback.png" src="" />
                <div>
                  <h3 className="text-lg font-bold">Product 6</h3>
                  <div className="flex gap-2">
                    <Text>Stock:</Text>
                    <Text type="secondary">32</Text>
                  </div>
                  <div className="flex gap-2">
                    <Text>Price:</Text>
                    <Text type="secondary">$100</Text>
                  </div>
                </div>
              </div>
            </Card>
            <Card size='small' className='hover:bg-dark-gray transition-colors hover:cursor-pointer'>
              <div className="flex gap-4">
                <Image width={75} height={75} preview={{ mask: null }} fallback="/fallback.png" src="" />
                <div>
                  <h3 className="text-lg font-bold">Product 6</h3>
                  <div className="flex gap-2">
                    <Text>Stock:</Text>
                    <Text type="secondary">32</Text>
                  </div>
                  <div className="flex gap-2">
                    <Text>Price:</Text>
                    <Text type="secondary">$100</Text>
                  </div>
                </div>
              </div>
            </Card>
            <Card size='small' className='hover:bg-dark-gray transition-colors hover:cursor-pointer'>
              <div className="flex gap-4">
                <Image width={75} height={75} preview={{ mask: null }} fallback="/fallback.png" src="" />
                <div>
                  <h3 className="text-lg font-bold">Product 6</h3>
                  <div className="flex gap-2">
                    <Text>Stock:</Text>
                    <Text type="secondary">32</Text>
                  </div>
                  <div className="flex gap-2">
                    <Text>Price:</Text>
                    <Text type="secondary">$100</Text>
                  </div>
                </div>
              </div>
            </Card>
            <Card size='small' className='hover:bg-dark-gray transition-colors hover:cursor-pointer'>
              <div className="flex gap-4">
                <Image width={75} height={75} preview={{ mask: null }} fallback="/fallback.png" src="" />
                <div>
                  <h3 className="text-lg font-bold">Product 6</h3>
                  <div className="flex gap-2">
                    <Text>Stock:</Text>
                    <Text type="secondary">32</Text>
                  </div>
                  <div className="flex gap-2">
                    <Text>Price:</Text>
                    <Text type="secondary">$100</Text>
                  </div>
                </div>
              </div>
            </Card>
            <Card size='small' className='hover:bg-dark-gray transition-colors hover:cursor-pointer'>
              <div className="flex gap-4">
                <Image width={75} height={75} preview={{ mask: null }} fallback="/fallback.png" src="" />
                <div>
                  <h3 className="text-lg font-bold">Product 6</h3>
                  <div className="flex gap-2">
                    <Text>Stock:</Text>
                    <Text type="secondary">32</Text>
                  </div>
                  <div className="flex gap-2">
                    <Text>Price:</Text>
                    <Text type="secondary">$100</Text>
                  </div>
                </div>
              </div>
            </Card>
          </div>
            )}
      </div>
    </>
  )
}
