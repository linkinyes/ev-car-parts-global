// 安全API路由 - 处理安全相关的后端逻辑
import { NextResponse } from 'next/server';
import { hashPassword, verifyPassword, generateToken } from '@/lib/security';

// 生成CSRF令牌
export async function GET() {
  try {
    const csrfToken = generateToken(32);
    
    // 设置CSRF令牌为HTTP-only cookie
    const response = NextResponse.json({ 
      success: true, 
      message: 'CSRF token generated successfully' 
    });
    
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1小时
      path: '/',
      sameSite: 'strict',
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

// 验证CSRF令牌
export async function POST(request: Request) {
  try {
    const { csrfToken } = await request.json();
    const cookieToken = request.headers.get('cookie')?.split('csrf-token=')[1]?.split(';')[0];
    
    if (!csrfToken || !cookieToken) {
      return NextResponse.json(
        { success: false, message: 'CSRF token missing' },
        { status: 400 }
      );
    }
    
    // 验证令牌匹配
    if (csrfToken !== cookieToken) {
      return NextResponse.json(
        { success: false, message: 'Invalid CSRF token' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'CSRF token validated successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to validate CSRF token' },
      { status: 500 }
    );
  }
}