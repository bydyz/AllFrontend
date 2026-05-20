#!/bin/bash
# Skill 辅助脚本示例

# 显示环境信息
echo "=== 环境信息 ==="
echo "当前用户: $(whoami)"
echo "当前目录: $(pwd)"
echo "日期时间: $(date)"

# Node.js 信息
if command -v node &> /dev/null; then
    echo "Node 版本: $(node --version)"
    echo "NPM 版本: $(npm --version)"
fi

# Git 信息
if [ -d .git ]; then
    echo "Git 分支: $(git branch --show-current)"
    echo "Git 状态: $(git status --short | wc -l) 文件变更"
fi

# 包管理器检测
if [ -f package.json ]; then
    if [ -f yarn.lock ]; then
        echo "包管理器: yarn"
    elif [ -f pnpm-lock.yaml ]; then
        echo "包管理器: pnpm"
    else
        echo "包管理器: npm"
    fi
fi

echo "=== 完成 ==="