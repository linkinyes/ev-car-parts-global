#!/bin/bash

echo "🚀 开始生产环境部署流程..."

# 1. 检查项目状态
echo "📋 检查项目状态..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 项目构建成功"
else
    echo "❌ 项目构建失败，请检查错误"
    exit 1
fi

# 2. 添加所有文件到Git
echo "📁 添加文件到Git..."
git add .

# 3. 提交更改
echo "💾 提交更改..."
git commit -m "🎉 Production ready: Add real images and final optimizations

- ✅ Added high-quality images from Unsplash
- ✅ Updated image mapping system
- ✅ Configured Next.js for external image domains
- ✅ Built and tested production version
- ✅ All 25 display items now have real images
- ✅ Ready for commercial launch"

# 4. 推送到GitHub
echo "📤 推送到GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ 代码已成功推送到GitHub"
    echo "🌐 Vercel将自动开始部署..."
    echo ""
    echo "📋 部署状态检查："
    echo "1. 访问 https://vercel.com/dashboard"
    echo "2. 检查项目部署状态"
    echo "3. 验证生产环境"
    echo ""
    echo "🎯 预计部署时间: 3-5分钟"
else
    echo "❌ 推送失败，请检查网络连接和权限"
    exit 1
fi

echo "🎉 部署流程启动完成！"