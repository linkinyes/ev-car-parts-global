#!/bin/bash

echo "🔄 EV Car Parts Global 部署修复脚本"
echo "=================================="

# 检查当前Git状态
echo "📋 检查Git状态..."
cd /Users/Johndin/Qapp/ev-car-parts-global
git status

# 创建部署触发文件
echo "📝 创建部署触发文件..."
echo "# 部署触发 - $(date)" > .vercel-deploy-trigger
echo "项目: EV Car Parts Global" >> .vercel-deploy-trigger
echo "状态: 准备部署" >> .vercel-deploy-trigger

# 添加所有更改
echo "➕ 添加所有更改..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "Deploy: Force trigger Vercel deployment - $(date)"

echo ""
echo "📋 下一步操作指南："
echo "1. 安装GitHub Desktop: https://desktop.github.com"
echo "2. 登录您的GitHub账户"
echo "3. 添加现有仓库: /Users/Johndin/Qapp/ev-car-parts-global"
echo "4. 点击 'Push origin' 推送到远程仓库"
echo "5. 推送完成后，Vercel会自动开始部署"
echo ""
echo "🎯 或者可以尝试以下命令推送："
echo "cd /Users/Johndin/Qapp/ev-car-parts-global"
echo "git push origin main"
echo ""
echo "⏱️ 推送成功后，回到Vercel页面查看部署进度"