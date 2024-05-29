import { useProfileStore } from '@/store/profile'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Pencil } from 'lucide-react'

export default function Profile () {
  const router = useRouter()
  const profile = useProfileStore((state) => state.profile)

  const { thumbnail, name, phone, email, nrc, address, description } = profile

  return (
    <div className="w-full mx-auto bg-background shadow-lg rounded-lg overflow-hidden">
      <header className="bg-secondary px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            alt="Company logo"
            className="rounded-lg object-cover"
            src={thumbnail}
            width={150}
          />
          <h1 className="text-2xl font-semibold text-secondary-foreground">
            {name}
          </h1>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => router.push('/profile/edit')}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </header>
      <div className="p-6 flex justify-between">
        <div className="space-y-4 w-1/2">
          {[
            { label: 'Phone', value: phone },
            { label: 'Email', value: email },
            { label: 'NRC', value: nrc }
          ].map((item) => (
            <div key={item.label} className="grid gap-1">
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className="text-foreground/70">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-4 w-1/2">
          {[
            { label: 'Department', value: address?.department?.name },
            { label: 'District', value: address?.district?.name },
            { label: 'City', value: address?.city?.name }
          ].map((item) => (
            <div key={item.label} className="grid gap-1">
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className="text-foreground/70">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div className="px-6 py-4 bg-muted">
        <p className="text-foreground">{description}</p>
      </div>
    </div>
  )
}
