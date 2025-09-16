// 安全工具函数库
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// 密码加密
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// 密码验证
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// 生成随机令牌
export const generateToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

// XSS防护 - 转义HTML
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// 验证邮箱格式
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 验证手机号格式
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+\d{1,3})?\d{10,15}$/;
  return phoneRegex.test(phone);
};

// 生成CSRF令牌
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};