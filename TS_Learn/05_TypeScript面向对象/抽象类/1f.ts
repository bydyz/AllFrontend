abstract class PaymentProcessor {
  protected abstract processorName: string;
  
  // 抽象方法
  abstract processPayment(amount: number, currency: string): Promise<PaymentResult>;
  abstract refundPayment(transactionId: string, amount: number): Promise<RefundResult>;
  
  // 具体方法
  protected validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 1000000; // 最大100万
  }
  
  protected validateCurrency(currency: string): boolean {
    return ['USD', 'EUR', 'GBP', 'JPY'].includes(currency);
  }
  
  // 模板方法
  async executePayment(amount: number, currency: string): Promise<PaymentResult> {
    if (!this.validateAmount(amount)) {
      throw new Error("Invalid amount");
    }
    if (!this.validateCurrency(currency)) {
      throw new Error("Unsupported currency");
    }
    
    console.log(`Processing ${amount} ${currency} with ${this.processorName}`);
    return await this.processPayment(amount, currency);
  }
}

interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: Date;
}

interface RefundResult {
  success: boolean;
  refundId: string;
  message: string;
}

class StripeProcessor extends PaymentProcessor {
  protected processorName: string = "Stripe";
  
  async processPayment(amount: number, currency: string): Promise<PaymentResult> {
    // 模拟 Stripe API 调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      transactionId: `stripe_${Date.now()}`,
      message: "Payment processed successfully via Stripe",
      timestamp: new Date()
    };
  }
  
  async refundPayment(transactionId: string, amount: number): Promise<RefundResult> {
    // 模拟退款处理
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      refundId: `refund_${Date.now()}`,
      message: `Refund of ${amount} processed for transaction ${transactionId}`
    };
  }
}

class PayPalProcessor extends PaymentProcessor {
  protected processorName: string = "PayPal";
  
  async processPayment(amount: number, currency: string): Promise<PaymentResult> {
    // 模拟 PayPal API 调用
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      transactionId: `paypal_${Date.now()}`,
      message: "Payment processed successfully via PayPal",
      timestamp: new Date()
    };
  }
  
  async refundPayment(transactionId: string, amount: number): Promise<RefundResult> {
    // 模拟 PayPal 退款
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      refundId: `paypal_refund_${Date.now()}`,
      message: `PayPal refund of ${amount} processed`
    };
  }
}

// 使用
async function processPayments() {
  const stripe = new StripeProcessor();
  const paypal = new PayPalProcessor();
  
  const stripeResult = await stripe.executePayment(100, "USD");
  console.log("Stripe:", stripeResult);
  
  const paypalResult = await paypal.executePayment(50, "EUR");
  console.log("PayPal:", paypalResult);
  
  // 处理退款
  const refundResult = await stripe.refundPayment(stripeResult.transactionId, 100);
  console.log("Refund:", refundResult);
}

processPayments();



export {}