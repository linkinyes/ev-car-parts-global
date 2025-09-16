// PayPal支付通知处理
import { NextRequest } from 'next/server';
import { orderManager } from '@/lib/order';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证通知来源（在实际项目中需要验证PayPal webhook签名）
    const isValid = true; // 简化处理
    
    if (!isValid) {
      return new Response('Invalid notification', { status: 400 });
    }
    
    // 处理不同的通知类型
    const eventType = body.event_type;
    const resource = body.resource;
    
    if (eventType === 'PAYMENT.SALE.COMPLETED') {
      const orderId = resource.custom; // 自定义字段，存储订单ID
      const paymentId = resource.id;
      
      // 更新订单状态
      console.log(`PayPal payment successful for order: ${orderId}`);
      
      // 这里应该调用订单管理器更新订单状态
      // orderManager.updatePaymentStatus(orderId, 'paid', paymentId);
      
      return new Response('success');
    } else {
      console.log(`PayPal notification received: ${eventType}`);
      return new Response('success');
    }
  } catch (error) {
    console.error('PayPal notification processing failed:', error);
    return new Response('fail', { status: 500 });
  }
}