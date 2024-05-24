export default function OrderFooter ({ total, iva }) {
  return (
    <div className="flex flex-col justify-end items-end h-full">
      <div className="text-right mr-2 mb-2">
        <p className="font-bold">Total: $ {total} </p>
        <p className="text-sm">Impuesto: $ {iva} </p>
      </div>
    </div>
  )
}
