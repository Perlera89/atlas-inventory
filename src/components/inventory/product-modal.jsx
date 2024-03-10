'use client'
import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { Modal, Button } from 'antd'

import { useInventoryStore } from '@/store/inventory'

// icons
import { MdClose, MdDelete } from 'react-icons/md'

export default function ProductModalItem ({
  width,
  isModalOpen,
  handleSave,
  handleCancel,
  handleEdit,
  validate,
  children
}) {
  const action = useInventoryStore((state) => state.action)
  const [disabled, setDisabled] = useState(true)
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  })

  const draggleRef = useRef(null)
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement
    const targetRect = draggleRef.current?.getBoundingClientRect()
    if (!targetRect) {
      return
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y)
    })
  }
  return (
    <Modal
      open={isModalOpen}
      width={width}
      closeIcon={false}
      onCancel={handleCancel}
      maskClosable
      footer={
        action === 'view'
          ? (
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>
            )
          : (
          <>
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="save" type="primary" onClick={handleCancel}>
              Save
            </Button>
          </>
            )
      }
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggleRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          top: '18px',
          width: '100%',
          right: '14px',
          cursor: 'grabbing'
        }}
        onMouseOver={() => {
          if (disabled) {
            setDisabled(false)
          }
        }}
        onMouseOut={() => {
          setDisabled(true)
        }}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <div className="flex gap-1 justify-end items-center align-middle">
          {action === 'view' && (
            <>
              <Button
                type="text"
                icon={
                  <MdDelete
                    title="Delete"
                    className="text-font-color flex items-center text-2xl"
                  />
                }
                className="rounded-full mr-1"
                onClick={handleCancel}
              />
            </>
          )}
          <Button
            type="text"
            icon={
              <MdClose title="Close" className="text-font-color text-2xl" />
            }
            className="rounded-full"
            onClick={handleCancel}
          />
        </div>
      </div>
    </Modal>
  )
}
