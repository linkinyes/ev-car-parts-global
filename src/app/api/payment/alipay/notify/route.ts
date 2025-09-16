// 支付宝支付通知处理
import { NextRequest } from 'next/server';
import { orderManager } from '@/lib/order';
import { paymentGateway } from '@/lib/payment';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const params: any = {};
    
    // 将FormData转换为普通对象
    for (const [key, value] of formData.entries()) {
      params[key] = value;
    }
    
    // 验证通知签名
    const isValid = paymentGateway.verifyAlipayNotification(params);
    
    if (!isValid) {
      return new Response('fail', { status: 400 });
    }
    
    // 处理支付结果
    const outTradeNo = params.out_trade_no;
    const tradeStatus = params.trade_status;
    
    if (tradeStatus === 'TRADE_SUCCESS' || tradeStatus === 'TRADE_FINISHED') {
      // 更新订单状态
      // 注意：在实际项目中，需要根据订单号找到对应订单并更新状态
      console.log(`Alipay payment successful for order: ${outTradeNo}`);
      
      // 这里应该调用订单管理器更新订单状态
      // orderManager.updatePaymentStatus(outTradeNo, 'paid');
      
      return new Response('success');
    } else {
      console.log(`Alipay payment failed for order: ${outTradeNo}`);
      return new Response('fail', { status: 400 });
    }
  } catch (error) {
    console.error('Alipay notification processing failed:', error);
    return new Response('fail', { status: 500 });
  }
}