// 订单管理系统
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  userName: string;
  userType: 'retail' | 'wholesale';
  
  // 订单商品
  items: Array<{
    id: string;
    type: 'part' | 'vehicle';
    name: string;
    price: number;
    quantity: number;
    image: string;
    specifications?: { [key: string]: string };
    supplierId: string;
    supplierName: string;
  }>;

  // 价格信息
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;

  // 配送信息
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };

  // 支付信息
  paymentMethod: 'alipay' | 'wechat' | 'paypal' | 'card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionId?: string;

  // 订单状态
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  // 时间戳
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;

  // 备注
  notes?: string;
  trackingNumber?: string;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  paymentMethod: 'alipay' | 'wechat' | 'paypal' | 'card' | 'bank_transfer';
  returnUrl: string;
  notifyUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  qrCode?: string;
  message?: string;
  error?: string;
}

// 导入支付网关
import { paymentGateway } from './payment';

// 订单管理器
class OrderManager {
  private orders: Order[] = [];

  // 创建订单
  async createOrder(
    cart: any,
    userInfo: any,
    shippingAddress: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod']
  ): Promise<Order> {
    const orderNumber = this.generateOrderNumber();
    const orderId = this.generateOrderId();

    const order: Order = {
      id: orderId,
      orderNumber,
      userId: userInfo.id,
      userEmail: userInfo.email,
      userName: userInfo.name,
      userType: userInfo.type || 'retail',
      
      items: cart.items.map((item: any) => ({
        id: item.id,
        type: item.type,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        specifications: item.specifications,
        supplierId: item.supplierId,
        supplierName: item.supplierName
      })),

      subtotal: cart.subtotal,
      tax: cart.tax,
      shipping: cart.shipping,
      total: cart.total,
      currency: cart.currency,

      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      status: 'pending',

      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 保存订单
    this.orders.push(order);
    this.saveToLocalStorage();

    // 发送订单确认邮件 (模拟)
    await this.sendOrderConfirmationEmail(order);

    return order;
  }

  // 处理支付
  async processPayment(orderId: string, paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    const order = this.getOrderById(orderId);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    try {
      // 根据支付方式处理支付
      let paymentResponse: PaymentResponse;

      switch (paymentRequest.paymentMethod) {
        case 'alipay':
          paymentResponse = await this.processAlipayPayment(paymentRequest, order);
          break;
        case 'wechat':
          paymentResponse = await this.processWechatPayment(paymentRequest, order);
          break;
        case 'paypal':
          paymentResponse = await this.processPaypalPayment(paymentRequest, order);
          break;
        case 'card':
          paymentResponse = await this.processCardPayment(paymentRequest);
          break;
        case 'bank_transfer':
          paymentResponse = await this.processBankTransferPayment(paymentRequest);
          break;
        default:
          return { success: false, error: 'Unsupported payment method' };
      }

      if (paymentResponse.success) {
        order.paymentStatus = 'paid';
        order.status = 'confirmed';
        order.paidAt = new Date();
        order.transactionId = paymentResponse.paymentId;
        order.updatedAt = new Date();

        this.saveToLocalStorage();
        await this.sendPaymentConfirmationEmail(order);
      }

      return paymentResponse;
    } catch (error) {
      console.error('Payment processing failed:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  }

  // 支付宝支付
  private async processAlipayPayment(request: PaymentRequest, order: Order): Promise<PaymentResponse> {
    try {
      // 获取支付宝支付参数
      const params = paymentGateway.getAlipayParams(order);
      
      // 生成签名
      const signature = paymentGateway.generateAlipaySignature(params);
      
      // 构建支付URL
      const queryString = new URLSearchParams({ ...params, sign: signature }).toString();
      const paymentUrl = `${params.gateway}?${queryString}`;
      
      return {
        success: true,
        paymentId: `alipay_${Date.now()}`,
        paymentUrl
      };
    } catch (error) {
      console.error('Alipay payment processing failed:', error);
      return { success: false, error: 'Alipay payment processing failed' };
    }
  }

  // 微信支付
  private async processWechatPayment(request: PaymentRequest, order: Order): Promise<PaymentResponse> {
    try {
      // 获取微信支付参数
      const params = paymentGateway.getWechatParams(order);
      
      // 生成签名
      const signature = paymentGateway.generateWechatSignature(params);
      
      // 实际项目中需要调用微信统一下单API
      // 这里简化处理，返回模拟二维码
      const qrCodeData = `weixin://wxpay/bizpayurl?pr=${order.orderNumber}`;
      
      return {
        success: true,
        paymentId: `wxpay_${Date.now()}`,
        qrCode: qrCodeData
      };
    } catch (error) {
      console.error('WeChat payment processing failed:', error);
      return { success: false, error: 'WeChat payment processing failed' };
    }
  }

  // PayPal支付
  private async processPaypalPayment(request: PaymentRequest, order: Order): Promise<PaymentResponse> {
    try {
      // 获取PayPal支付链接
      const paymentUrl = await paymentGateway.getPaypalPaymentUrl(order);
      
      return {
        success: true,
        paymentId: `paypal_${Date.now()}`,
        paymentUrl
      };
    } catch (error) {
      console.error('PayPal payment processing failed:', error);
      return { success: false, error: 'PayPal payment processing failed' };
    }
  }

  // 信用卡支付 (模拟实现)
  private async processCardPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          paymentId: `card_${Date.now()}`,
          message: 'Card payment processed successfully'
        });
      }, 1500);
    });
  }

  // 银行转账 (模拟实现)
  private async processBankTransferPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          paymentId: `transfer_${Date.now()}`,
          message: 'Bank transfer instructions sent to email'
        });
      }, 500);
    });
  }

  // 更新订单状态
  updateOrderStatus(orderId: string, status: Order['status']): boolean {
    const order = this.getOrderById(orderId);
    if (!order) return false;

    order.status = status;
    order.updatedAt = new Date();

    if (status === 'shipped') {
      order.shippedAt = new Date();
    } else if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    this.saveToLocalStorage();
    return true;
  }

  // 获取订单
  getOrderById(orderId: string): Order | undefined {
    return this.orders.find(order => order.id === orderId);
  }

  // 获取用户订单
  getUserOrders(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  // 获取所有订单 (管理员)
  getAllOrders(): Order[] {
    return [...this.orders];
  }

  // 生成订单号
  private generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    return `EV${year}${month}${day}${random}`;
  }

  // 生成订单ID
  private generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // 发送订单确认邮件 (模拟)
  private async sendOrderConfirmationEmail(order: Order): Promise<void> {
    console.log(`Sending order confirmation email to ${order.userEmail} for order ${order.orderNumber}`);
    // 在实际项目中，这里会发送真实的邮件
  }

  // 发送支付确认邮件 (模拟)
  private async sendPaymentConfirmationEmail(order: Order): Promise<void> {
    console.log(`Sending payment confirmation email to ${order.userEmail} for order ${order.orderNumber}`);
    // 在实际项目中，这里会发送真实的邮件
  }

  // 保存到本地存储
  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ev_orders', JSON.stringify(this.orders));
    }
  }

  // 从本地存储加载
  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('ev_orders');
      if (savedOrders) {
        try {
          this.orders = JSON.parse(savedOrders);
        } catch (error) {
          console.error('Failed to load orders from localStorage:', error);
        }
      }
    }
  }
}

// 创建全局订单管理实例
export const orderManager = new OrderManager();

// 在浏览器环境中加载订单数据
if (typeof window !== 'undefined') {
  orderManager.loadFromLocalStorage();
}