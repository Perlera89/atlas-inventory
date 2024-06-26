export default function OrderItem ({
  name,
  quantity,
  price,
  discount,
  isSelected = false,
  onClick
}) {
  const getTotal = () => {
    if (discount > 0) {
      return quantity * price - quantity * price * (discount / 100)
    }
    return quantity * price
  }
  return (
    <div
      className={`flex justify-between min-h-16 max-h-20 items-center p-2 transition-colors ${
        isSelected ? 'bg-muted' : 'hover:bg-muted/50 active:bg-muted/70'
      }`}
      onClick={onClick}
    >
      <div>
        <p className="text-sm font-bold">{name}</p>
        <div className="grid gap-1">
          <div className="flex gap-2">
            <p className="text-sm">{quantity}</p>
            <p className="text-sm">Units x $ {price}</p>
          </div>
          {discount > 0 && <p className="text-sm">{discount}% discount</p>}
        </div>
      </div>
      <p className="text-sm">$ {getTotal().toFixed(2)}</p>
    </div>
  )
}
