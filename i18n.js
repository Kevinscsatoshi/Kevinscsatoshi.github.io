// ============================================================
//  界面文字（导航、标题、按钮等）· 中文 / English / 日本語
//  内容（经历、照片、项目、文章…）在 content.js 里改
// ============================================================
window.I18N = {
  zh: {
    site: {
      name: "顾思聪 Kevin",
      title: "顾思聪 Kevin Sicong Gu",
      homeTitle: "顾思聪 Kevin Sicong Gu · 储能电气工程师 · 摄影",
      description: "顾思聪（Kevin Sicong Gu），宁德时代（CATL）储能电气工程师。个人网站：经历、旅行 & 摄影、Vibe 项目与 Blog。",
    },
    nav: { experience: "个人经历", photography: "旅行 & 摄影", projects: "Vibe 项目", blog: "Blog", city: "东京" },
    hero: {
      // 大标题：名字（<em> 部分带米色高光）
      name: '<span class="line">顾思聪</span> <span class="line"><em lang="en">Kevin</em></span>',
    },
    pages: {
      experience: {
        title: "个人经历",
        alt: "Experience",
        intro: "现任宁德时代（CATL）储能电气工程师。此前在东京 DataLabs 负责建筑 DX 产品商务拓展，更早在 MIT Media Lab 和 UT Austin Japan Lab 从事 3D 与数字人文研究。中英日三语流利。",
        timeline: "履历",
        selected: "代表项目",
      },
      photography: { title: "旅行 & 摄影", alt: "Travel & Photo", desc: "顾思聪（Kevin Sicong Gu）的飞行足迹与旅行相册。", all: "全部", count: "{n} 张", back: "← 全部相册", empty: "照片整理中，敬请期待。" },
      projects: {
        title: "Vibe 项目",
        alt: "Vibe Projects",
        intro: "独立开发并运营的两款开源产品，均已上线。",
        live: "运行中",
        note: "* 研究工具，不构成投资建议。",
      },
      blog: {
        title: "Blog",
        alt: "",
        intro: "历史、市场与生活随笔，首发于微信公众号“路邊野犬”。",
        back: "← 返回 Blog",
        empty: "暂无文章。",
        missing: "文章不存在。",
      },
    },
    travel: {
      life: "人生至今的旅行", headline: "{age} 年人生 · {flights} 次航班 · {countries} 个国家和地区",
      age: "{n} 岁", first: "第一次飞行 · {age} 岁", now: "现在 · {age} 岁", yearTip: "{year} · {age} 岁 · {n} 次航班", none: "没有航班",
      all: "全部", flights: "航班", distance: "飞行里程", time: "空中时间", airports: "机场", airlines: "航空公司", countries: "国家和地区",
      laps: "≈ 绕地球 {n} 圈", days: "{d} 天 {h} 小时", source: "数据来自 Flighty · 更新于 {date}",
      hint: "拖动旋转 · 点击图钉打开相册", map: "📍 地图",
    },
    links: { visit: "访问", play: "试玩", site: "官网" },
    footer: { eyebrow: "联系我", made: "用心制作。" },
    notFound: { title: "页面不存在", text: "这个页面不存在，或已经移动。", home: "返回首页" },
    egg: {
      hint: "✦ 点一下漩涡",
      console: "你好 👋 喜欢看源码？这个网站开源在 github.com/Kevinscsatoshi/Kevinscsatoshi.github.io\n小提示：点一下首页的漩涡。",
    },
    lightbox: { close: "关闭 ✕", prev: "上一张", next: "下一张" },
  },

  en: {
    site: {
      name: "Kevin Sicong Gu",
      title: "Kevin Sicong Gu",
      homeTitle: "Kevin Sicong Gu — Energy Storage Electrical Engineer at CATL",
      description: "Kevin Sicong Gu (顾思聪), energy storage electrical engineer at CATL. Experience, travel & photos, vibe projects and a blog.",
    },
    nav: { experience: "Experience", photography: "Travel & Photo", projects: "Vibe Projects", blog: "Blog", city: "Tokyo" },
    hero: {
      name: '<span class="line"><em>Kevin</em></span> <span class="line">Sicong Gu</span>',
    },
    pages: {
      experience: {
        title: "Experience",
        alt: "",
        intro: "I'm an energy storage electrical engineer at CATL. Before that, I worked in business development for construction-DX products at DataLabs in Tokyo, and earlier still on 3D and digital humanities projects at the MIT Media Lab and the UT Austin Japan Lab. I speak Chinese, English and Japanese.",
        timeline: "Timeline",
        selected: "Selected Work",
      },
      photography: { title: "Travel & Photo", alt: "", desc: "Kevin Sicong Gu's flights, travels and photo albums.", all: "All", count: "{n} photos", back: "← All albums", empty: "Photos coming soon." },
      projects: {
        title: "Vibe Projects",
        alt: "",
        intro: "Two open-source products I built and run — both live in production.",
        live: "Live",
        note: "* Research tools — not investment advice.",
      },
      blog: {
        title: "Blog",
        alt: "",
        intro: "Essays on history, markets and life, first published in Chinese on my WeChat account 路邊野犬.",
        back: "← Back to Blog",
        empty: "No posts yet.",
        missing: "Post not found.",
      },
    },
    travel: {
      life: "A life in flights, so far", headline: "{age} years · {flights} flights · {countries} countries & regions",
      age: "age {n}", first: "First flight · age {age}", now: "Now · age {age}", yearTip: "{year} · age {age} · {n} flights", none: "no flights",
      all: "All-time", flights: "Flights", distance: "Distance", time: "Time in the air", airports: "Airports", airlines: "Airlines", countries: "Countries & regions",
      laps: "≈ {n}× around the Earth", days: "{d}d {h}h", source: "Data from Flighty · updated {date}",
      hint: "Drag to rotate · click a pin to open the album", map: "📍 Map",
    },
    links: { visit: "Visit", play: "Play", site: "Website" },
    footer: { eyebrow: "Get in touch", made: "Made with care." },
    notFound: { title: "Page not found", text: "This page doesn't exist or has moved.", home: "Back to home" },
    egg: {
      hint: "✦ Click the vortex",
      console: "Hi 👋 Curious about the source? This site is open source: github.com/Kevinscsatoshi/Kevinscsatoshi.github.io\nHint: click the vortex on the home page.",
    },
    lightbox: { close: "Close ✕", prev: "Previous photo", next: "Next photo" },
  },

  ja: {
    site: {
      name: "顧 思聡 Kevin",
      title: "顧 思聡 Kevin Sicong Gu",
      homeTitle: "顧 思聡 Kevin Sicong Gu · CATL 電気エンジニア · 写真",
      description: "顧 思聡（Kevin Sicong Gu）の個人サイトです。CATL（寧徳時代）で蓄電システムの電気エンジニアとして勤務。経歴、旅と写真、Vibe プロジェクト、ブログを掲載しています。",
    },
    nav: { experience: "経歴", photography: "旅と写真", projects: "Vibe プロジェクト", blog: "ブログ", city: "東京" },
    hero: {
      name: '<span class="line"><span class="furi" data-r="こ">顧</span> <span class="furi" data-r="しそう">思聡</span></span> <span class="line"><em lang="en">Kevin</em></span>',
    },
    pages: {
      experience: {
        title: "経歴",
        alt: "Experience",
        intro: "現在は CATL（寧徳時代）で、蓄電システムの電気エンジニアとして勤務しています。前職では東京の DataLabs で建設DXプロダクトの事業開発を担い、それ以前は MIT Media Lab と UT Austin Japan Lab で3D・デジタル人文学のプロジェクトに携わりました。中国語・英語・日本語を話すトリリンガルです。",
        timeline: "経歴一覧",
        selected: "主な実績",
      },
      photography: { title: "旅と写真", alt: "Travel & Photo", desc: "顧 思聡（Kevin Sicong Gu）のフライトの記録と旅のアルバム。", all: "すべて", count: "{n} 枚", back: "← アルバム一覧", empty: "写真は準備中です。" },
      projects: {
        title: "Vibe プロジェクト",
        alt: "Vibe Projects",
        intro: "個人で開発・運用しているオープンソースのプロダクトを2つ紹介します。いずれも本番環境で稼働中です。",
        live: "稼働中",
        note: "※ いずれもリサーチ用のツールであり、投資助言を目的としたものではありません。",
      },
      blog: {
        title: "ブログ",
        alt: "Blog",
        intro: "歴史やマーケット、暮らしについて綴ったエッセイを掲載しています。もとは WeChat 公式アカウント「路邊野犬」に中国語で発表したものです。",
        back: "← ブログ一覧へ",
        empty: "まだ記事はありません。",
        missing: "記事が見つかりません。",
      },
    },
    travel: {
      life: "これまでの人生の旅", headline: "{age} 年の人生 · {flights} フライト · {countries} の国・地域",
      age: "{n} 歳", first: "初フライト · {age} 歳", now: "現在 · {age} 歳", yearTip: "{year} · {age} 歳 · {n} フライト", none: "フライトなし",
      all: "全期間", flights: "フライト", distance: "飛行距離", time: "飛行時間", airports: "空港", airlines: "航空会社", countries: "国・地域",
      laps: "≈ 地球 {n} 周分", days: "{d}日 {h}時間", source: "データ：Flighty · {date} 更新",
      hint: "ドラッグで回転 · ピンをクリックでアルバムへ", map: "📍 地図",
    },
    links: { visit: "サイトへ", play: "プレイ", site: "公式サイト" },
    footer: { eyebrow: "お問い合わせ", made: "心を込めてつくりました。" },
    notFound: { title: "ページが見つかりません", text: "お探しのページは存在しないか、移動した可能性があります。", home: "トップページへ" },
    egg: {
      hint: "✦ 渦をクリック",
      console: "こんにちは 👋 ソースコードが気になりますか？このサイトはオープンソースです：github.com/Kevinscsatoshi/Kevinscsatoshi.github.io\nヒント：トップページの渦をクリックしてみてください。",
    },
    lightbox: { close: "閉じる ✕", prev: "前の写真", next: "次の写真" },
  },
};
