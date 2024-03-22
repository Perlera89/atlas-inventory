import { MdInfo } from 'react-icons/md'
import { Badge } from 'antd'

export default function BadgeItem ({ title, validate, children }) {
  return (
    <Badge
      count={
        validate
          ? null
          : (
          <MdInfo
            title={title}
          />
            )
      }
      offset={[-40, 16]}
    >
      {children}
    </Badge>
  )
}
