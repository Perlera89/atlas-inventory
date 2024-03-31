export default function OrderList () {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-muted/50 transition-colors">
      <div>
        <p className="text-sm font-bold">Product 1</p>
        <div className="flex gap-1">
          <p className="text-sm">2</p>
          <p className="text-sm">Units x $ 0.25</p>
        </div>
      </div>
      <p className="text-sm">$ 0.5</p>
    </div>
  )
}
