type PaymentResult = boolean
type RefundResult = boolean

abstract class PaymentGateway {
  // 抽象实例方法（子类必须实现）
  abstract processPayment(amount: number): Promise<PaymentResult>;
  abstract refundPayment(transactionId: string): Promise<RefundResult>;
  abstract getBalance(): number;
}



export {}