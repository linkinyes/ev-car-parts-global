import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'zh';

  // 简单的翻译函数替代
  const t = (key: string) => {
    const translations: { [key: string]: string } = {
      'footer.description': '全球最大的新能源汽车和零件交易平台',
      'footer.quickLinks': '快速链接',
      'nav.parts': '零件商店',
      'nav.vehicles': '汽车商店',
      'nav.news': '新能源资讯',
      'nav.community': '用户社群',
      'footer.customerService': '客服中心',
      'footer.email': '邮箱',
      'footer.phone': '电话',
      'footer.whatsapp': 'WhatsApp',
      'footer.legal': '法律信息',
      'footer.terms': '用户协议',
      'footer.privacy': '隐私政策',
      'footer.returns': '退货政策',
      'footer.disclaimer': '免责声明',
      'footer.rights': '版权所有'
    };
    
    return translations[key] || key;
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EV Car Parts Global</h3>
            <p className="text-gray-300">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link href="/parts" className="text-gray-300 hover:text-white transition">{t('nav.parts')}</Link></li>
              <li><Link href="/vehicles" className="text-gray-300 hover:text-white transition">{t('nav.vehicles')}</Link></li>
              <li><Link href="/news" className="text-gray-300 hover:text-white transition">{t('nav.news')}</Link></li>
              <li><Link href="/community" className="text-gray-300 hover:text-white transition">{t('nav.community')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.customerService')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{t('footer.email')}: linkinyes@gmail.com</li>
              <li>{t('footer.phone')}: +86 19866695358</li>
              <li>{t('footer.whatsapp')}: +86 19866695358</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition">{t('footer.terms')}</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition">{t('footer.privacy')}</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition">{t('footer.returns')}</Link></li>
              <li><Link href="/disclaimer" className="text-gray-300 hover:text-white transition">{t('footer.disclaimer')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EV Car Parts Global. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}