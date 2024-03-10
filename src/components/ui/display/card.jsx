import { Card } from 'antd'

// icons
import { RiFilter3Fill } from 'react-icons/ri'

export default function CardItem ({ title, children, filterItems }) {
  return (
    <Card
      title={title}
      size="small"
      extra={
        filterItems && (
          <RiFilter3Fill
            onClick={filterItems}
            className="text-3xl hover:bg-poor-black  rounded-xl p-1 cursor-pointer active:bg-secondary-light/70 transition-colors"
          />
        )
      }
      style={{
        width: '100%'
      }}
    >
      {children}
    </Card>
  )
}