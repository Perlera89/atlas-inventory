import { MdInfo } from 'react-icons/md'
import { Badge } from 'antd'

export default function BadgeItem ({ title, validate, children }) {
  return (
    <Badge
      count={
        !validate && (
          <MdInfo
            title={title}
            className={'text-red-500 z-50'}
          />
        )
      }
      className="w-full"
    >
      {children}
    </Badge>
  )
}
