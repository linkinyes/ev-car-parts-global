// Google Analytics集成
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics配置
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// 初始化Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// 记录页面浏览
export const logPageView = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// 记录事件
export const logEvent = (action: string, category?: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 记录异常
export const logException = (description: string, fatal = false) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description,
      fatal,
    });
  }
};

// 记录购买事件
export const logPurchase = (transactionId: string, value: number, currency: string, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  }
};

// 记录添加到购物车事件
export const logAddToCart = (currency: string, value: number, items: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: currency,
      value: value,
      items: items,
    });
  }
};

// 记录搜索事件
export const logSearch = (searchTerm: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    });
  }
};

// 记录登录事件
export const logLogin = (method: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'login', {
      method: method,
    });
  }
};

// 记录注册事件
export const logSignUp = (method: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'sign_up', {
      method: method,
    });
  }
};