import { Card } from 'antd'

// icons
import { RiFilter3Fill } from 'react-icons/ri'

export default function CardItem ({ cardTitle, children, filterItems }) {
  return (
    <Card
      title={cardTitle}
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
