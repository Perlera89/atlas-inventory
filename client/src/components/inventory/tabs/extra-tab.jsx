import TextareaItem from '@/components/ui/entry/textarea'
import { Typography } from 'antd'

const { Text } = Typography

export default function ExtraTab () {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Text className='w-28'>Safety information</Text>
          <TextareaItem/>
        </div>
        <div className="flex gap-2">
          <Text className='w-28'>Note</Text>
          <TextareaItem />
        </div>
      </div>
    </div>
  )
}
