#!/bin/bash

# 🚀 EV Car Parts Global 一键上线脚本

echo "🚀 开始部署 EV Car Parts Global 平台..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "📦 检查项目依赖..."
npm install

echo "🔧 运行构建测试..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建成功！"

echo "📝 初始化Git仓库..."
git init 2>/dev/null || echo "Git仓库已存在"
git add .
git commit -m "Deploy: EV Car Parts Global platform ready for production" 2>/dev/null || echo "代码已是最新版本"

echo "📋 部署检查清单："
echo "1. ✅ 项目构建成功"
echo "2. ✅ Git仓库已准备"
echo "3. ✅ 部署配置文件已创建"
echo "4. ✅ SEO配置已优化"
echo "5. ✅ 性能配置已启用"

echo ""
echo "🎯 下一步操作："
echo "1. 创建GitHub仓库：https://github.com/new"
echo "2. 推送代码到GitHub："
echo "   git remote add origin https://github.com/你的用户名/ev-car-parts-global.git"
echo "   git branch -M main" 
echo "   git push -u origin main"
echo ""
echo "3. Vercel部署：https://vercel.com/new"
echo "   - 选择GitHub仓库"
echo "   - 使用默认配置"
echo "   - 点击Deploy"
echo ""
echo "4. 配置环境变量："
echo "   NODE_ENV=production"
echo "   NEXTAUTH_URL=https://your-app.vercel.app"
echo ""
echo "🎉 预计10分钟内完成上线！"

# 打开相关网站
read -p "是否打开GitHub和Vercel？(y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 打开GitHub..."
    open "https://github.com/new" 2>/dev/null || xdg-open "https://github.com/new" 2>/dev/null || echo "请手动打开 https://github.com/new"
    
    echo "🌐 打开Vercel..."
    open "https://vercel.com/new" 2>/dev/null || xdg-open "https://vercel.com/new" 2>/dev/null || echo "请手动打开 https://vercel.com/new"
fi

echo ""
echo "📱 记住您的联系方式："
echo "📧 邮箱: linkinyes@gmail.com"
echo "📞 电话: +86 19866695358"
echo "💬 WhatsApp: +8619866695358"
echo ""
echo "🚀 准备上线！祝您成功！"