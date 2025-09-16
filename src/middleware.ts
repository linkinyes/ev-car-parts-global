import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 安全中间件
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // 设置安全头
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // 强制HTTPS（在生产环境中）
  if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }
  
  return response;
}

// 配置中间件匹配路径
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径除了那些从/_next/static开始的（静态文件）
     * 以及/_next/image（图片优化文件）
     * 和favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};