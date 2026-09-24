# Kevin Sicong Gu — personal website

中文 / English / 日本語 三语个人网站：个人经历 · 摄影旅行 · Vibe 项目 · Blog。
纯静态 HTML / CSS / JS，无需构建。

## 改内容

| 要改什么 | 文件 |
| --- | --- |
| 经历、项目、旅行照片、Blog 文章 | `content.js` |
| 界面文字（导航、标题、按钮…） | `i18n.js` |
| 样式 | `style.css` |
| 首页点阵漩涡 | `art.js` |

文字字段可以写成一句通用文字，或 `{ zh, en, ja }` 三语对象。

## 本地预览

```bash
npx serve -l 5173 .
```

然后打开 http://localhost:5173（`serve.json` 关闭了自动去掉 `.html` 的重定向，保证 `?lang=` 参数不丢）。
