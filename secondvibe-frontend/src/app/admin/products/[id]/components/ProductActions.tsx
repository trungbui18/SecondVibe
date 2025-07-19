"use client";

export default function ProductActions({
  showRejectDialog,
  rejectReason,
  setRejectReason,
  setShowRejectDialog,
  isSubmitting,
  status,
  handleModeration,
}: any) {
  return (
    <>
      {status === "PENDING_APPROVAL" ? (
        <div className="flex gap-4">
          <button
            onClick={() => handleModeration("APPROVED")}
            disabled={isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg"
          >
            {isSubmitting ? "Đang xử lý..." : "Phê duyệt"}
          </button>
          <button
            onClick={() => setShowRejectDialog(true)}
            disabled={isSubmitting}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg"
          >
            {isSubmitting ? "Đang xử lý..." : "Từ chối"}
          </button>
        </div>
      ) : null}

      {showRejectDialog && (
        <div className="fixed inset-0 bg-black/30   flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Từ chối sản phẩm</h3>
              <textarea
                rows={4}
                placeholder="Nhập lý do từ chối sản phẩm..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectDialog(false);
                    setRejectReason("");
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleModeration("REJECTED", rejectReason)}
                  disabled={isSubmitting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
