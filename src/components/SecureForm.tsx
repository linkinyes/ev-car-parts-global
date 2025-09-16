// 安全表单组件，包含CSRF保护和输入验证
'use client';

import React, { useState, useRef } from 'react';
import { generateCSRFToken, escapeHtml, validateEmail, validatePhone } from '@/lib/security';

interface SecureFormProps {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  className?: string;
}

export default function SecureForm({ onSubmit, children, className }: SecureFormProps) {
  const [csrfToken] = useState(generateCSRFToken());
  const formRef = useRef<HTMLFormElement>(null);

  // 安全提交处理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    const data: any = {};
    
    // 遍历表单数据并进行安全处理
    for (let [key, value] of formData.entries()) {
      // 对字符串值进行XSS防护
      if (typeof value === 'string') {
        data[key] = escapeHtml(value);
      } else {
        data[key] = value;
      }
    }
    
    // 添加CSRF令牌
    data.csrfToken = csrfToken;
    
    // 调用父组件的提交处理函数
    onSubmit(data);
  };

  // 输入验证函数
  const validateField = (name: string, value: string): boolean => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      default:
        return true; // 默认通过验证
    }
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className={className}
      noValidate
    >
      {/* 隐藏的CSRF令牌字段 */}
      <input 
        type="hidden" 
        name="csrfToken" 
        value={csrfToken} 
      />
      {children}
    </form>
  );
}

// 导出验证工具函数
export { validateEmail, validatePhone, escapeHtml };