import MultipleSelectItem from '@/components/ui/entry/multiple-select'
import SelectItem from '@/components/ui/entry/select'
import CustomSelectItem from '@/components/ui/entry/custom-select'

export default function TagsTab () {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <SelectItem
          placeholder="Select type"
          options={[
            { value: 'storable', label: 'Storable' },
            { value: 'service', label: 'Service' },
            { value: 'consumable', label: 'Consumable' }
          ]}
        />
        <CustomSelectItem placeholder="Select category" />
        <CustomSelectItem placeholder="Select brand" />
        <CustomSelectItem placeholder="Select area" />
        <MultipleSelectItem placeholder="Select tags" />
      </div>
    </div>
  )
}
