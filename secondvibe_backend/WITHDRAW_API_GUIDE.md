# Hướng dẫn API Rút Tiền - Luồng Hoạt Động

## Tổng quan

API rút tiền hoạt động theo luồng 3 bước với sự tham gia của cả Client và Admin để đảm bảo an toàn và kiểm soát.

## Luồng Hoạt Động

### 🔄 **Luồng tổng thể:**

```
Client tạo yêu cầu → Admin duyệt/từ chối → Admin thực hiện rút tiền
     ↓                    ↓                        ↓
   PENDING            APPROVED/REJECTED         COMPLETED
```

### 📋 **Chi tiết từng bước:**

#### **Bước 1: Client tạo yêu cầu rút tiền**

- Client gửi thông tin rút tiền
- Hệ thống tạo `WalletTransaction` với status `PENDING`
- **Chưa trừ tiền** khỏi ví

#### **Bước 2: Admin duyệt/từ chối**

- Admin xem danh sách yêu cầu chờ duyệt
- Admin có thể **APPROVE** hoặc **REJECT**
- Nếu REJECT: Giao dịch kết thúc, không trừ tiền
- Nếu APPROVE: Chuyển sang bước 3

#### **Bước 3: Admin thực hiện rút tiền**

- Admin thực hiện chuyển tiền thực tế
- Hệ thống trừ tiền khỏi ví
- Cập nhật status thành `COMPLETED`

## Các Endpoint API

### 1. **Client tạo yêu cầu rút tiền**

**POST** `/wallet/withdraw/request`

**Request Body:**

```json
{
  "amount": 100000,
  "bankAccount": "1234567890",
  "bankName": "Vietcombank",
  "accountHolderName": "Nguyen Van A",
  "description": "Rút tiền về tài khoản cá nhân"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo yêu cầu rút tiền thành công",
  "data": {
    "transactionId": 1,
    "amount": 100000,
    "type": "WITHDRAW",
    "description": "Yêu cầu rút tiền về tài khoản Vietcombank - 1234567890. Rút tiền về tài khoản cá nhân",
    "createdAt": "2024-01-15T10:30:00",
    "bankAccount": "1234567890",
    "bankName": "Vietcombank",
    "accountHolderName": "Nguyen Van A",
    "remainingBalance": 500000,
    "status": "PENDING"
  }
}
```

### 2. **Admin xem danh sách yêu cầu chờ duyệt**

**GET** `/wallet/withdraw/pending`

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách yêu cầu rút tiền thành công",
  "data": [
    {
      "transactionId": 1,
      "amount": 100000,
      "type": "WITHDRAW",
      "description": "Yêu cầu rút tiền về tài khoản Vietcombank - 1234567890. Rút tiền về tài khoản cá nhân",
      "createdAt": "2024-01-15T10:30:00",
      "bankAccount": "1234567890",
      "bankName": "Vietcombank",
      "accountHolderName": "Nguyen Van A",
      "remainingBalance": 500000,
      "status": "PENDING"
    }
  ]
}
```

### 3. **Admin duyệt yêu cầu rút tiền**

**POST** `/wallet/withdraw/approve/{transactionId}`

**Response:**

```json
{
  "success": true,
  "message": "Duyệt yêu cầu rút tiền thành công",
  "data": {
    "transactionId": 1,
    "amount": 100000,
    "type": "WITHDRAW",
    "description": "Yêu cầu rút tiền về tài khoản Vietcombank - 1234567890. Rút tiền về tài khoản cá nhân",
    "createdAt": "2024-01-15T10:30:00",
    "bankAccount": "1234567890",
    "bankName": "Vietcombank",
    "accountHolderName": "Nguyen Van A",
    "remainingBalance": 500000,
    "status": "APPROVED"
  }
}
```

### 4. **Admin từ chối yêu cầu rút tiền**

**POST** `/wallet/withdraw/reject/{transactionId}?reason=Thông tin tài khoản không chính xác`

**Response:**

```json
{
  "success": true,
  "message": "Từ chối yêu cầu rút tiền thành công",
  "data": {
    "transactionId": 1,
    "amount": 100000,
    "type": "WITHDRAW",
    "description": "Yêu cầu rút tiền về tài khoản Vietcombank - 1234567890. Rút tiền về tài khoản cá nhân - Lý do từ chối: Thông tin tài khoản không chính xác",
    "createdAt": "2024-01-15T10:30:00",
    "bankAccount": "1234567890",
    "bankName": "Vietcombank",
    "accountHolderName": "Nguyen Van A",
    "remainingBalance": 500000,
    "status": "REJECTED"
  }
}
```

### 5. **Admin thực hiện rút tiền**

**POST** `/wallet/withdraw/execute/{transactionId}`

**Response:**

```json
{
  "success": true,
  "message": "Thực hiện rút tiền thành công",
  "data": {
    "transactionId": 1,
    "amount": 100000,
    "type": "WITHDRAW",
    "description": "Yêu cầu rút tiền về tài khoản Vietcombank - 1234567890. Rút tiền về tài khoản cá nhân",
    "createdAt": "2024-01-15T10:30:00",
    "bankAccount": "1234567890",
    "bankName": "Vietcombank",
    "accountHolderName": "Nguyen Van A",
    "remainingBalance": 400000,
    "status": "COMPLETED"
  }
}
```

### 6. **Client xem lịch sử rút tiền**

**GET** `/wallet/withdraw/history`

**Response:**

```json
{
  "success": true,
  "message": "Lấy lịch sử rút tiền thành công",
  "data": [
    {
      "transactionId": 1,
      "amount": 100000,
      "type": "WITHDRAW",
      "description": "Yêu cầu rút tiền về tài khoản Vietcombank - 1234567890. Rút tiền về tài khoản cá nhân",
      "createdAt": "2024-01-15T10:30:00",
      "bankAccount": "1234567890",
      "bankName": "Vietcombank",
      "accountHolderName": "Nguyen Van A",
      "remainingBalance": 400000,
      "status": "COMPLETED"
    }
  ]
}
```

### 7. **Client xem thông tin ví**

**GET** `/wallet/info`

**Response:**

```json
{
  "success": true,
  "message": "Lấy thông tin ví thành công",
  "data": {
    "id": 1,
    "balance": 400000,
    "createdAt": "2024-01-01T00:00:00",
    "updatedAt": "2024-01-15T10:30:00"
  }
}
```

## Trạng thái giao dịch (TransactionStatus)

- **PENDING**: Chờ admin duyệt
- **APPROVED**: Đã được admin duyệt, chờ thực hiện
- **REJECTED**: Bị admin từ chối
- **COMPLETED**: Đã hoàn thành (đã trừ tiền)

## Quy tắc và Validation

### **Quy tắc rút tiền:**

1. Số tiền rút phải lớn hơn 0
2. Số tiền rút tối thiểu: 50,000 VND
3. Số dư ví phải đủ để thực hiện giao dịch
4. Thông tin tài khoản ngân hàng không được để trống

### **Phân quyền:**

- **CLIENT**: Chỉ có thể tạo yêu cầu và xem lịch sử
- **ADMINISTRATOR**: Có thể duyệt, từ chối và thực hiện rút tiền

### **Luồng trạng thái:**

```
PENDING → APPROVED → COMPLETED
    ↓
REJECTED (kết thúc)
```

## Lợi ích của luồng này

1. **An toàn**: Admin kiểm soát mọi giao dịch rút tiền
2. **Minh bạch**: Mỗi bước đều được ghi lại
3. **Linh hoạt**: Có thể từ chối yêu cầu không hợp lệ
4. **Kiểm soát**: Chỉ trừ tiền khi admin thực hiện thực tế
5. **Theo dõi**: Dễ dàng theo dõi trạng thái giao dịch

## Authentication

Tất cả các API đều yêu cầu JWT token trong header:

```
Authorization: Bearer <jwt_token>
```
