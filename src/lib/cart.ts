// 购物车管理系统
export interface CartItem {
  id: string;
  type: 'part' | 'vehicle';
  name: string;
  price: number;
  wholesalePrice?: number;
  quantity: number;
  image: string;
  specifications?: {
    [key: string]: string;
  };
  supplierId: string;
  supplierName: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
}

// 购物车状态管理
class CartManager {
  private cart: Cart = {
    items: [],
    totalItems: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    currency: 'USD'
  };

  private listeners: ((cart: Cart) => void)[] = [];

  // 添加商品到购物车
  addItem(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const existingItemIndex = this.cart.items.findIndex(
      cartItem => cartItem.id === item.id && cartItem.type === item.type
    );

    if (existingItemIndex > -1) {
      this.cart.items[existingItemIndex].quantity += quantity;
    } else {
      this.cart.items.push({ ...item, quantity });
    }

    this.updateCartTotals();
    this.notifyListeners();
    this.saveToLocalStorage();
  }

  // 从购物车移除商品
  removeItem(itemId: string, type: 'part' | 'vehicle'): void {
    this.cart.items = this.cart.items.filter(
      item => !(item.id === itemId && item.type === type)
    );

    this.updateCartTotals();
    this.notifyListeners();
    this.saveToLocalStorage();
  }

  // 更新商品数量
  updateQuantity(itemId: string, type: 'part' | 'vehicle', quantity: number): void {
    const itemIndex = this.cart.items.findIndex(
      item => item.id === itemId && item.type === type
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeItem(itemId, type);
      } else {
        this.cart.items[itemIndex].quantity = quantity;
        this.updateCartTotals();
        this.notifyListeners();
        this.saveToLocalStorage();
      }
    }
  }

  // 清空购物车
  clearCart(): void {
    this.cart = {
      items: [],
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      currency: 'USD'
    };

    this.notifyListeners();
    this.saveToLocalStorage();
  }

  // 计算购物车总计
  private updateCartTotals(): void {
    this.cart.totalItems = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
    this.cart.subtotal = this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 税费计算 (假设8.5%的税率)
    this.cart.tax = this.cart.subtotal * 0.085;
    
    // 运费计算 (超过$100免运费，否则$15)
    this.cart.shipping = this.cart.subtotal > 100 ? 0 : 15;
    
    this.cart.total = this.cart.subtotal + this.cart.tax + this.cart.shipping;
  }

  // 获取购物车状态
  getCart(): Cart {
    return { ...this.cart };
  }

  // 订阅购物车变化
  subscribe(listener: (cart: Cart) => void): () => void {
    this.listeners.push(listener);
    
    // 返回取消订阅函数
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // 通知所有监听器
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getCart()));
  }

  // 保存到本地存储
  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ev_cart', JSON.stringify(this.cart));
    }
  }

  // 从本地存储加载
  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('ev_cart');
      if (savedCart) {
        try {
          this.cart = JSON.parse(savedCart);
          this.updateCartTotals();
          this.notifyListeners();
        } catch (error) {
          console.error('Failed to load cart from localStorage:', error);
        }
      }
    }
  }

  // 获取用户类型对应的价格
  getItemPrice(item: CartItem, userType: 'retail' | 'wholesale' = 'retail'): number {
    return userType === 'wholesale' && item.wholesalePrice 
      ? item.wholesalePrice 
      : item.price;
  }

  // 计算批发商购物车总计
  calculateWholesaleTotal(userType: 'retail' | 'wholesale' = 'retail'): Cart {
    if (userType === 'retail') {
      return this.getCart();
    }

    const wholesaleCart = { ...this.cart };
    wholesaleCart.subtotal = this.cart.items.reduce((sum, item) => {
      const price = this.getItemPrice(item, userType);
      return sum + (price * item.quantity);
    }, 0);

    wholesaleCart.tax = wholesaleCart.subtotal * 0.085;
    wholesaleCart.shipping = wholesaleCart.subtotal > 100 ? 0 : 15;
    wholesaleCart.total = wholesaleCart.subtotal + wholesaleCart.tax + wholesaleCart.shipping;

    return wholesaleCart;
  }
}

// 创建全局购物车实例
export const cartManager = new CartManager();

// 在浏览器环境中加载购物车数据
if (typeof window !== 'undefined') {
  cartManager.loadFromLocalStorage();
}