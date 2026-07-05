# 此为响应式方案收集


## 图片适配

图标必须用 SVG（矢量图）
图片/背景图必须提供   2x 图  3x 图  4x 图 等


## 字体适配

必须用 rem（保证可访问性）。


## 间距（margin/padding）

推荐用 rem 或 clamp()（保证节奏感）。


## 边框（border）

用 px（边框太细，缩放后容易消失或变粗，不适合缩放）。


## 宽度/高度（布局尺寸）

用 %、vw、flex、grid（让流式布局自己去适应屏幕）。





## 顶部通栏 + 左侧固定侧边栏 + 右侧自适应内容

### 顶部通栏 高度固定


### 左侧固定侧边栏 宽度固定

* 策略 A：折叠式侧边栏（后台管理系统最常见）
在屏幕宽度 < 992px（或 < 768px）时，左侧侧边栏完全隐藏，通过右上角的“汉堡菜单”按钮控制侧边栏从左侧滑出（Drawer 抽屉效果）。

* 策略 B：图标收缩式
设置一个显示宽度界限，大于该界限时，侧边栏完全展开显示；小于该界限时，侧边栏收缩，仅展示图标，80px

默认提供 300px 和 480px（宽模式） 两种尺寸。
允许用户手动拖拽侧边栏边缘调整宽度，并且浏览器会记住用户的偏好（存进 LocalStorage）。这样，用4K大屏的用户自己拉宽一次，以后就舒服了。


### 右侧 主要内容区的方案

* 主容器：永远使用 `max-width: min(理想宽, 百分百)` 加一个“硬天花板”。
* 文字区域：必须单独限制宽度（`max-width: 70ch 或 800px`），这是超大屏适配的第一铁律。
* 布局增强：利用 `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` 配合 `minmax`，可以不用写死列数，让卡片自动换行填充，比硬编码 `repeat(4, 1fr)` 更鲁棒。
    ```css
    /* ========== 1. 基础范围（< 2560px，适配 720p ~ 2K 显示器） ========== */
    .main-content {
        max-width: min(1440px, 90%);
        margin: 0 auto;
        padding: 0 clamp(1rem, 3vw, 3rem);
    }

    /* 基础文本块：此时依靠父容器限宽，无需额外限制，但显式写出以防万一 */
    .text-block,
    .article-content p,
    .description {
        max-width: 100%; /* 默认跟随父容器 */
    }

    /* 基础卡片网格：默认 3 列（适合 1080p 和 2K 下 1440px 容器） */
    .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: clamp(1rem, 2vw, 2rem);
    }

    /* ========== 2. 宽屏增强（>= 2560px，对应 1440p/2K 显示器逻辑宽度） ========== */
    @media screen and (min-width: 2560px) {
        .main-content {
            max-width: min(1600px, 85%);
            padding: 0 7.5%;
        }

        /* 关键：容器放宽后，强制限制文本宽度，保证 70~80 字符舒适阅读 */
        .text-block,
        .article-content p,
        .description {
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        /* 卡片网格扩充至 4 列，利用更多横向空间展示内容 */
        .card-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: clamp(1.5rem, 2vw, 2.5rem);
        }
    }

    /* ========== 3. 超大屏巨幕（>= 3840px，对应 4K / 8K 显示器） ========== */
    @media screen and (min-width: 3840px) {
        .main-content {
            max-width: min(1800px, 80%); /* 哪怕 8K 也不超过 1800px 物理上限 */
            padding: 0 10%;
        }

        /* 超大屏下，文本宽度可略微放宽至 900px，配合更大的字号 */
        .text-block,
        .article-content p,
        .description {
            max-width: 900px; /* 比 2560 断点略宽，配合大屏视野 */
            margin-left: auto;
            margin-right: auto;
        }

        /* 网格进一步扩充至 6 列（适合展示大量数据卡片或缩略图） */
        .card-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: clamp(2rem, 2.5vw, 3.5rem);
        }

        /* 超大屏下整体字号和间距可等比微调，避免内容显得“渺小” */
        body {
            font-size: clamp(18px, 1.2vw, 24px);
        }
    }
    ```