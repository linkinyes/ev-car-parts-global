// 用户认证管理系统
export interface User {
  id: string;
  name: string;
  email: string;
  type: 'regular' | 'wholesale';
  country: string;
  phone?: string;
  whatsapp?: string;
  ownedVehicles?: string;
  interestedVehicles?: string;
  avatar?: string;
  joinDate: string;
  lastLogin?: string;
  isVerified: boolean;
  isActive: boolean;
}

// 用户认证管理器
class AuthManager {
  private currentUser: User | null = null;

  // 模拟用户数据库
  private users: User[] = [
    {
      id: 'user_1',
      name: '张三',
      email: 'zhang@example.com',
      type: 'regular',
      country: '中国',
      phone: '+86 13800138000',
      whatsapp: '+8613800138000',
      ownedVehicles: 'Tesla Model 3, 比亚迪汉EV',
      interestedVehicles: '蔚来ET7, 小鹏P7',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      isVerified: true,
      isActive: true
    },
    {
      id: 'user_2',
      name: '李四',
      email: 'li@example.com',
      type: 'wholesale',
      country: '沙特阿拉伯',
      phone: '+966 50 123 4567',
      whatsapp: '+966501234567',
      joinDate: '2023-12-10',
      lastLogin: '2024-01-19',
      isVerified: true,
      isActive: true
    }
  ];

  // 用户登录
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // 在实际项目中，这里会调用API验证用户凭据
    console.log(`Login attempt for: ${email}`);
    
    // 模拟登录验证
    const user = this.users.find(u => u.email === email);
    
    if (!user) {
      return { success: false, error: '用户不存在' };
    }
    
    // 模拟密码验证（实际项目中需要加密验证）
    if (password !== 'password123') {
      return { success: false, error: '密码错误' };
    }
    
    if (!user.isActive) {
      return { success: false, error: '账户已被禁用' };
    }
    
    // 更新最后登录时间
    user.lastLogin = new Date().toISOString().split('T')[0];
    this.currentUser = user;
    
    // 保存到本地存储
    this.saveToLocalStorage();
    
    return { success: true, user };
  }

  // 用户注册
  async register(userData: Omit<User, 'id' | 'joinDate' | 'isVerified' | 'isActive' | 'lastLogin'>, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // 在实际项目中，这里会调用API创建新用户
    console.log('Register attempt:', userData);
    
    // 检查邮箱是否已存在
    if (this.users.some(u => u.email === userData.email)) {
      return { success: false, error: '邮箱已被注册' };
    }
    
    // 创建新用户
    const newUser: User = {
      id: `user_${Date.now()}`,
      ...userData,
      joinDate: new Date().toISOString().split('T')[0],
      isVerified: false, // 需要邮箱验证
      isActive: true,
      lastLogin: new Date().toISOString().split('T')[0]
    };
    
    // 批发商需要审核
    if (newUser.type === 'wholesale') {
      newUser.isVerified = false;
    }
    
    this.users.push(newUser);
    this.currentUser = newUser;
    
    // 保存到本地存储
    this.saveToLocalStorage();
    
    return { success: true, user: newUser };
  }

  // 用户登出
  logout(): void {
    this.currentUser = null;
    this.clearLocalStorage();
  }

  // 获取当前用户
  getCurrentUser(): User | null {
    // 如果内存中没有用户信息，尝试从本地存储加载
    if (!this.currentUser) {
      this.loadFromLocalStorage();
    }
    
    return this.currentUser;
  }

  // 检查用户是否已登录
  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  // 检查用户是否为批发商
  isWholesaleUser(): boolean {
    const user = this.getCurrentUser();
    return user ? user.type === 'wholesale' : false;
  }

  // 更新用户信息
  async updateProfile(userData: Partial<User>): Promise<{ success: boolean; error?: string }> {
    const user = this.getCurrentUser();
    
    if (!user) {
      return { success: false, error: '用户未登录' };
    }
    
    // 更新用户信息
    Object.assign(user, userData);
    
    // 同步到用户列表
    const userIndex = this.users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...user };
    }
    
    // 保存到本地存储
    this.saveToLocalStorage();
    
    return { success: true };
  }

  // 发送邮箱验证邮件
  async sendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
    // 在实际项目中，这里会调用邮件服务发送验证邮件
    console.log(`Sending verification email to: ${email}`);
    return { success: true };
  }

  // 验证邮箱验证码
  async verifyEmail(token: string): Promise<{ success: boolean; error?: string }> {
    // 在实际项目中，这里会验证邮箱验证码
    console.log(`Verifying email with token: ${token}`);
    
    const user = this.getCurrentUser();
    if (user) {
      user.isVerified = true;
      this.saveToLocalStorage();
      return { success: true };
    }
    
    return { success: false, error: '验证失败' };
  }

  // 保存到本地存储
  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ev_user', JSON.stringify(this.currentUser));
    }
  }

  // 从本地存储加载
  private loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('ev_user');
      if (savedUser) {
        try {
          this.currentUser = JSON.parse(savedUser);
        } catch (error) {
          console.error('Failed to load user from localStorage:', error);
        }
      }
    }
  }

  // 清除本地存储
  private clearLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ev_user');
      localStorage.removeItem('ev_cart');
      localStorage.removeItem('ev_orders');
    }
  }
}

// 创建全局认证管理实例
export const authManager = new AuthManager();