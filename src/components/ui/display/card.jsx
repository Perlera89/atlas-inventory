import { Card } from 'antd'

// icons
import { ListFilter } from 'lucide-react'
import IconButtonItem from '../common/icon-buttom'
export default function CardItem ({ title, children, filterItems }) {
  return (
    <Card
      title={title}
      size="small"
      extra={
        filterItems && (
          <IconButtonItem icon={<ListFilter />} handleClick={filterItems} />
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
