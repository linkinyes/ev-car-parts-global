#!/bin/bash

echo "🌐 正在打开Vercel部署页面..."

# 打开Vercel部署页面
if command -v open &> /dev/null; then
    open "https://vercel.com/new"
elif command -v xdg-open &> /dev/null; then
    xdg-open "https://vercel.com/new"
else
    echo "请手动打开: https://vercel.com/new"
fi

echo ""
echo "📋 Vercel部署步骤："
echo "1. 登录Vercel (使用GitHub账户)"
echo "2. 点击 'Import Git Repository'"
echo "3. 选择仓库: linkinyes/ev-car-parts-global"
echo "4. 保持默认配置"
echo "5. 点击 'Deploy'"
echo ""
echo "⚙️ 推荐环境变量配置："
echo "NODE_ENV=production"
echo "NEXTAUTH_URL=https://your-app.vercel.app"
echo ""
echo "⏱️ 预计部署时间: 3-5分钟"
echo "🎉 部署完成后您将获得在线访问URL！"