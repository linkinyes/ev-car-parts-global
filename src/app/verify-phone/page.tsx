'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { authManager } from '@/lib/auth';

function VerifyPhoneContent() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await authManager.verifyPhone(verificationCode);
      if (result.success) {
        setSuccess(true);
        // 2秒后跳转到个人中心
        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      } else {
        setError(result.error || '验证码错误');
      }
    } catch (err) {
      console.error('Phone verification failed:', err);
      setError('验证过程中出现错误');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    setError('');
    
    try {
      // 获取当前用户的手机号
      const user = authManager.getCurrentUser();
      if (user && user.phone) {
        const result = await authManager.sendPhoneVerificationCode(user.phone);
        if (!result.success) {
          setError(result.error || '发送验证码失败');
        }
      } else {
        setError('未找到用户手机号');
      }
    } catch (err) {
      console.error('Resend code failed:', err);
      setError('发送验证码过程中出现错误');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          手机验证
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          请输入我们发送到您手机的6位验证码
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">手机验证成功！</h3>
              <p className="text-sm text-gray-500">
                您的手机号已成功验证。
              </p>
              <p className="text-sm text-gray-500 mt-2">
                即将跳转到个人中心...
              </p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleVerify}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  验证码
                </label>
                <div className="mt-1">
                  <input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    required
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-center text-2xl tracking-widest"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  请输入6位数字验证码
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || verificationCode.length !== 6}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {loading ? '验证中...' : '验证'}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resending}
                  className="text-sm font-medium text-green-600 hover:text-green-500 disabled:opacity-50"
                >
                  {resending ? '重新发送中...' : '重新发送验证码'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPhonePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            手机验证
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            加载中...
          </p>
        </div>
      </div>
    }>
      <VerifyPhoneContent />
    </Suspense>
  );
}