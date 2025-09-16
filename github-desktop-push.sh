#!/bin/bash

echo "🔧 准备通过GitHub Desktop推送代码..."

# 检查GitHub Desktop是否已安装
if [ -d "/Applications/GitHub Desktop.app" ]; then
    echo "✅ 发现GitHub Desktop已安装"
    echo "📂 正在打开项目文件夹..."
    open "/Users/Johndin/Qapp/ev-car-parts-global"
    echo "🚀 正在打开GitHub Desktop..."
    open -a "GitHub Desktop"
else
    echo "⚠️  GitHub Desktop未安装"
    echo "📥 正在打开下载页面..."
    open "https://desktop.github.com"
    echo ""
    echo "📋 安装GitHub Desktop后的步骤："
    echo "1. 下载并安装GitHub Desktop"
    echo "2. 登录您的GitHub账户"
    echo "3. 选择 'Add an Existing Repository from your Hard Drive'"
    echo "4. 选择文件夹: /Users/Johndin/Qapp/ev-car-parts-global"
    echo "5. 点击右下角的 'Publish repository' 按钮"
fi

echo ""
echo "📝 GitHub Desktop操作指南："
echo "1. 在GitHub Desktop中您应该能看到最新的更改"
echo "2. 确认更改无误后，点击右侧的 'Push origin' 按钮"
echo "3. 推送成功后，Vercel会自动开始部署"
echo ""
echo "⏱️ 推送完成后，回到Vercel页面刷新查看部署状态"