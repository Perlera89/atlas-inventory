'use client'

import EmployeePage from '@/components/employees/employee'
import { useParams } from 'next/navigation'

export default function AddClientPage () {
  const { employeeId } = useParams()
  return (
    <>
      <EmployeePage employeeId={employeeId} />
    </>
  )
}
