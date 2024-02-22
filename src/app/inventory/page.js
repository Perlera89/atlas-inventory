'use client'
import ModalItem from '@/components/display/modal'
import { Button } from 'antd'
import { useState } from 'react'

export default function InventoryPage () {
  const [openModal, setOpenMOdal] = useState(false)

  const handleOpenModal = () => {
    setOpenMOdal(true)
  }

  const handleCloseModal = () => {
    setOpenMOdal(false)
  }
  return (
    <>
      <Button onClick={handleOpenModal}>Abrir Modal</Button>
      <ModalItem
        title="Modal"
        width={500}
        isModalOpen={openModal}
        handleCancel={handleCloseModal}
      />
    </>
  )
}
