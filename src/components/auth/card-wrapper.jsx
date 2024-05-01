import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from '../ui/card'

export default function CardWrapper ({
  label,
  title,
  backButtonHref,
  backButtonLabel,
  children
}) {
  return (
    <Card className="mx-auto max-w-lg shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-foreground/90">
          {label}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">{children}</CardContent>
      <CardFooter className='text-foreground/70 text-sm flex justify-center mb-6'>
        <Link href={backButtonHref}>{backButtonLabel}</Link>
      </CardFooter>
    </Card>
  )
}
