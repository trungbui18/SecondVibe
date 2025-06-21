import { CartDetail } from "@/types/cartDetail";
interface CheckoutSummaryProps {
  items: CartDetail[];
  onCheckout: () => void;
}
export default function CheckoutSummary({
  items,
  onCheckout,
}: CheckoutSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="border border-gray-300 p-4 rounded shadow-md w-full  bg-white">
      <h2 className="text-lg font-bold mb-4">Order summary</h2>

      {items.length === 0 ? (
        <p>Không có sản phẩm nào được chọn.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              <img
                src={item.urlImage}
                alt={item.name}
                className="w-16 h-16 object-contain rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm line-clamp-1 overflow-hidden text-ellipsis">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">{item.size}</p>
              </div>
              <p className="text-sm font-bold text-gray-700">
                {(item.price * item.quantity).toLocaleString()} đ
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal ({items.length} items)</span>
          <span>{subtotal.toLocaleString()} đ</span>
        </div>
        {/* <div className="flex justify-between">
          <span>Platform fee</span>
          <span>${platformFee.toLocaleString()}</span>
        </div> */}
        <div className="flex justify-between text-base font-bold text-black">
          <span>Total</span>
          <span>{total.toLocaleString()} đ</span>
        </div>
        <p className="text-xs text-gray-400">(Incl. GST where applicable)</p>
      </div>

      <div className="mt-4 text-xs text-gray-500 leading-snug">
        By tapping on <strong>"Place order"</strong>, you accept our{" "}
        <a href="#" className="text-blue-600 underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 underline">
          Privacy Policy
        </a>
        .
      </div>

      <button
        className="w-full bg-green-800 hover:bg-green-700 text-white
       font-semibold py-2 px-4 rounded mt-4"
        onClick={onCheckout}
      >
        Place order
      </button>
    </div>
  );
}
