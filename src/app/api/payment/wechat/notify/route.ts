// 微信支付通知处理
import { NextRequest } from 'next/server';
import { orderManager } from '@/lib/order';
import { paymentGateway } from '@/lib/payment';

export async function POST(request: NextRequest) {
  try {
    const xmlData = await request.text();
    
    // 验证通知签名
    const isValid = paymentGateway.verifyWechatNotification(xmlData);
    
    if (!isValid) {
      return new Response('fail', { status: 400 });
    }
    
    // 解析XML数据
    // 在实际项目中需要使用xml2js等库解析XML
    // 这里简化处理，假设已经解析出必要字段
    const parsedData = {
      out_trade_no: 'mock_order_id',
      result_code: 'SUCCESS',
      return_code: 'SUCCESS'
    };
    
    if (parsedData.return_code === 'SUCCESS' && parsedData.result_code === 'SUCCESS') {
      // 更新订单状态
      console.log(`WeChat payment successful for order: ${parsedData.out_trade_no}`);
      
      // 这里应该调用订单管理器更新订单状态
      // orderManager.updatePaymentStatus(parsedData.out_trade_no, 'paid');
      
      return new Response('<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>', {
        headers: { 'Content-Type': 'application/xml' }
      });
    } else {
      console.log(`WeChat payment failed for order: ${parsedData.out_trade_no}`);
      return new Response('fail', { status: 400 });
    }
  } catch (error) {
    console.error('WeChat notification processing failed:', error);
    return new Response('fail', { status: 500 });
  }
}