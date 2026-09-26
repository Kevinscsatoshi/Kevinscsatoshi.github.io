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
| 相册照片 | `photos/年-月-地点/`（见 `photos/README.md`） |
| 飞行地球数据 | `flights.js`（由 Flighty 导出生成，见下） |

文字字段可以写成一句通用文字，或 `{ zh, en, ja }` 三语对象。

## 本地预览

```bash
npx serve -l 5173 .
```

预览前可运行 `node tools/build.mjs` 更新相册列表（albums.js）。然后打开 http://localhost:5173（`serve.json` 关闭了自动去掉 `.html` 的重定向，保证 `?lang=` 参数不丢）。

## 部署

推送到 `main` 后，GitHub Actions 运行 `tools/build.mjs`：缩放相册照片（去掉 EXIF/GPS）、生成 albums.js 与 sitemap.xml、给资源加版本号，然后发布到 https://kevinscsatoshi.github.io 。

## 更新飞行地球（Flighty）

在 Flighty 导出航班 CSV，然后运行：

```bash
node tools/flighty.mjs ~/Downloads/FlightyExport-日期.csv --time 27d5h --km 457629
```

`--time` / `--km` 填 Flighty Passport 上的总飞行时间和里程（导出文件里没有起降时间）。
只会公开航线、年份、机场和航空公司代码；航班号、日期、订座号、座位不会写进网站，取消的航班和未来的行程也不会公开。原始 CSV 不要放进这个仓库。
