// ============================================================
//  网站内容都在这里改 —— 不用碰 HTML / CSS
//
//  多语言写法：任何文字字段都可以写成
//    "同一段文字"                                ← 三种语言都显示这一句
//    { zh: "中文", en: "English", ja: "日本語" }  ← 按语言切换
//  缺少某种语言时，依次回退到 English → 中文。
//  界面上的固定文字（导航、按钮等）在 i18n.js 里。
//  链接文字可以写 "@visit" / "@play" / "@site"，会自动用 i18n.js 里的翻译。
// ============================================================
window.SITE = {
  email: "kevingunj@gmail.com",
  // 生日：旅行页的「人生至今的旅行」用它算年龄（按东京时间，每年 2 月 4 日自动加一岁）
  born: "2002-02-04",
  portrait: "assets/portrait.png",
  // 名字旁轮换的 emoji：储能 · 摄影 · 开发
  roleEmoji: ["🔋", "📷", "💻"],
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/kevin-ko-/" },
    { label: "GitHub", url: "https://github.com/Kevinscsatoshi" },
  ],

  // ---------- 个人经历 experience.html ----------
  profileLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/kevin-ko-/" },
    { label: "GitHub", url: "https://github.com/Kevinscsatoshi" },
  ],
  // logo：assets/logos/ 里的官方标志（PNG）；可以是一个路径，或几个路径的数组
  timeline: [
    {
      year: "2026.09 —",
      title: { zh: "储能电气工程师", en: "Energy Storage Electrical Engineer", ja: "電気エンジニア（蓄電システム）" },
      org: { zh: "宁德时代（CATL）", en: "CATL", ja: "CATL（寧徳時代）" },
      logo: "assets/logos/catl.png",
      url: "https://www.catl.com/",
    },
    {
      year: "2025.09 — 2026.08",
      title: { zh: "商务拓展（BD）", en: "Business Development", ja: "事業開発" },
      org: { zh: "DataLabs 株式会社 · 建筑 DX SaaS", en: "DataLabs Inc. · Construction-DX SaaS", ja: "DataLabs 株式会社 · 建設DX SaaS" },
      logo: "assets/logos/datalabs.png",
      url: "https://www.datalabs.jp/",
    },
    {
      year: "2024.06 —",
      title: { zh: "创始人 / 开发者", en: "Founder & Builder", ja: "ファウンダー／開発者" },
      org: { zh: "NewZ · GeoZ · 个人开源项目", en: "NewZ · GeoZ · Open source", ja: "NewZ · GeoZ · 個人開発（OSS）" },
      logo: ["assets/logos/newz.png", "assets/logos/geoz.png"],
      url: "https://github.com/Kevinscsatoshi",
    },
    {
      year: "2024.07 — 12",
      title: { zh: "研究助理 · 3D 与数字遗产", en: "Research Assistant, 3D & Digital Heritage", ja: "リサーチアシスタント（3D・デジタル文化遺産）" },
      org: { zh: "MIT Media Lab · 美国剑桥", en: "MIT Media Lab · Cambridge, MA", ja: "MIT Media Lab · マサチューセッツ州ケンブリッジ" },
      logo: "assets/logos/mit-media-lab.png",
      url: "https://www.media.mit.edu/",
    },
    {
      year: "2023.01 — 2024.01",
      title: { zh: "研究团队负责人 · 工程与叙事", en: "Research Team Lead, Engineering & Narrative", ja: "リサーチチームリード（開発・ナラティブ）" },
      org: "UT Austin Japan Lab",
      url: "https://www.utjapanlab.com/",
      logo: "assets/logos/japan-lab.png",
    },
    {
      year: "2020 — 2024",
      title: {
        zh: "电子与计算机工程（ECE，2020–2023）↔ 历史学学士 · 辅修信息学",
        en: "Electrical & Computer Engineering (ECE, 2020–2023) ↔ B.A. History · Minor in Informatics",
        ja: "電気・コンピュータ工学専攻（ECE、2020–2023）↔ 学士（歴史学）／副専攻：情報学",
      },
      org: {
        zh: "得克萨斯大学奥斯汀分校 · ECE 数据科学方向",
        en: "The University of Texas at Austin · ECE, Data Science track",
        ja: "テキサス大学オースティン校 · ECE（データサイエンス・トラック）",
      },
      logo: "assets/logos/ut-austin.png",
    },
    {
      year: "2017 — 2020",
      title: { zh: "IB 国际文凭", en: "IB Diploma", ja: "国際バカロレア（IB）ディプロマ" },
      org: { zh: "南京外国语学校", en: "Nanjing Foreign Language School", ja: "南京外国語学校" },
      logo: "assets/logos/nfls.png",
    },
  ],
  // 代表项目：同一家公司 / 机构只占一行，下面列出具体项目
  projects: [
    {
      years: "2025 — 2026",
      org: { zh: "DataLabs 株式会社", en: "DataLabs Inc.", ja: "DataLabs 株式会社" },
      logo: "assets/logos/datalabs.png",
      items: [
        {
          title: { zh: "香港土木工程拓展署（CEDD）钢筋检测 PoC", en: "Rebar Inspection PoC for Hong Kong's CEDD", ja: "香港土木工程拓展署（CEDD）向け配筋検査 PoC" },
          desc: {
            zh: "与香港合作伙伴 BeeInventor 共同推进：提出服务方案、与传统检测方式对比验证、撰写 PoC 报告。",
            en: "Worked with Hong Kong partner BeeInventor on the service proposal, benchmarking against conventional inspection, and the PoC report.",
            ja: "現地パートナーの BeeInventor 社と共同で推進。サービス提案、従来の検査手法との比較検証、PoC 報告書の作成を担当。",
          },
        },
        {
          title: { zh: "清水建设 × Modely", en: "Shimizu Corporation × Modely", ja: "清水建設 × Modely" },
          desc: {
            zh: "在清水建设研发设施“NOVARE”推进 Modely 试点，从前期验证到结果评审全程负责，随后协助将合作拓展为高速公路枢纽立交的钢筋竣工（As-built）建模项目。",
            en: "Took a Modely pilot at Shimizu's NOVARE R&D facility from pre-validation to results review, then helped grow it into a rebar as-built modeling project for an expressway junction.",
            ja: "清水建設の技術研究施設「NOVARE」で行った Modely の実証実験を、事前検証から結果レビューまで推進。その後、高速道路ジャンクション工事における鉄筋 As-built モデル作成案件への展開にも貢献。",
          },
        },
        {
          title: { zh: "Framy 英语市场拓展", en: "Framy — English-Market Launch", ja: "Framy の英語圏展開" },
          desc: {
            zh: "新产品 Framy 可从点云与 2D 图纸自动生成 BIM/CIM 模型。负责其英语市场拓展：英文官网、SEO 与索引策略、竞品与关键词分析、海外定位与传播文案。",
            en: "Led the overseas launch of Framy, which auto-generates BIM/CIM models from point clouds and 2D drawings. Handled the English site, SEO and indexing strategy, competitor research and messaging.",
            ja: "点群や2D図面から BIM／CIM モデルを自動生成する新プロダクト「Framy」の英語圏展開を主導。英語版サイトの構築、SEO・インデックス戦略、競合・キーワード分析、海外向けメッセージの策定を担当。",
          },
        },
        {
          title: { zh: "东京都风险企业技术特别奖", en: "Tokyo Venture Technology Special Award", ja: "東京都ベンチャー技術特別賞" },
          desc: {
            zh: "DataLabs 凭借三维点云自动建模技术获奖；我在“产业交流展 2025”上用日语负责现场演示与客户洽谈。",
            en: "Awarded to DataLabs for its automated 3D point-cloud modeling. Ran live demos and client meetings in Japanese at Sangyo Koryuten 2025.",
            ja: "DataLabs が「3次元点群データの自動モデル化技術」で受賞。産業交流展2025では、ブースでのデモや商談に日本語で対応。",
          },
        },
      ],
    },
    {
      years: "2024",
      org: "MIT Media Lab",
      logo: "assets/logos/mit-media-lab.png",
      items: [
        {
          title: { zh: "互动式 3D 文化遗产展陈", en: "Interactive 3D Heritage Exhibits", ja: "文化遺産のインタラクティブ3D展示" },
          desc: {
            zh: "以 Unity 3D 结合摄影测量与 LiDAR 工作流完成三维重建，用于沉浸式展陈与文化可视化。",
            en: "Produced 3D reconstructions for immersive exhibits and cultural visualization, combining Unity 3D with photogrammetry and LiDAR workflows.",
            ja: "Unity 3D、フォトグラメトリ、LiDAR を活用し、没入型展示や文化の可視化に向けた3D復元モデルの制作を支援。",
          },
        },
      ],
    },
    {
      years: "2023",
      org: "UT Austin Japan Lab",
      logo: "assets/logos/japan-lab.png",
      items: [
        {
          title: "Playing at Empire",
          desc: {
            zh: "将 1939 年的日本双六棋盘游戏改编为网页游戏，至今仍在线运行。担任团队负责人，全程统筹编码、玩法设计与打包上线。",
            en: "Led end-to-end development of a digital-history game adapting a 1939 Japanese sugoroku, from code and gameplay logic to builds, while directing the historical-context team. Still online.",
            ja: "1939年に日本で作られた双六を翻案したデジタル歴史ゲーム。チームリードとして、コーディングからゲームロジック、ビルド・公開までを一貫して担当し、歴史考証チームも統括。現在もオンラインでプレイ可能。",
          },
          links: [{ label: "@play", url: "https://laits.utexas.edu/~mr56267/Sugoroku/China_war/China_War.html" }],
        },
      ],
    },
  ],

  // ---------- 摄影旅行 photography.html ----------
  // 相册来自 photos/ 文件夹：每次旅行一个文件夹（如 photos/2024-12-moscow/），说明见 photos/README.md

  // ---------- Vibe 项目 projects.html ----------
  builds: [
    {
      name: "NewZ",
      url: "https://newz.beer/",
      image: "assets/newz.jpg",
      tag: { zh: "预测市场新闻雷达", en: "Prediction-market news radar", ja: "予測市場ニュースレーダー" },
      desc: {
        zh: "选一两个预测市场事件，追踪背后的报道，按新闻、价格、热度与叙事视图查看。",
        en: "Pick one or two prediction markets and follow the reporting behind them, with news, price, heat and narrative views.",
        ja: "予測市場のイベントを1つ（または2つ）選ぶと、その背景にある報道を追跡できます。ニュース・価格・ヒート・ナラティブの各ビューを備えています。",
      },
      github: "https://github.com/Kevinscsatoshi",
    },
    {
      name: "GeoZ",
      url: "https://geo-z.vercel.app/",
      image: "assets/geoz.jpg",
      tag: { zh: "供应链情报", en: "Supply-chain intelligence", ja: "サプライチェーン分析" },
      desc: {
        zh: "搜索公司或股票代码，追溯其供应商、客户及每条关系背后的证据。",
        en: "Search a company or ticker to trace its suppliers and customers — and the evidence behind every link.",
        ja: "企業名やティッカーで検索すると、サプライヤーや顧客とのつながりを、それぞれの根拠とあわせてたどれます。",
      },
      github: "https://github.com/Kevinscsatoshi",
    },
  ],

  // ---------- Blog blog.html ----------
  // 文章首发在微信公众号「路邊野犬」，这里只放标题和链接（点开跳到公众号原文）。
  // 新增一篇：复制一段，改 url / date / title / tag 即可；lang: "zh" 让标题在英日文页面也用中文字体显示。
  // 也可以不写 url、改写 slug + body，把全文直接放在本站（post.html 会渲染；空一行 = 新段落，"## " = 小标题）。
  posts: [
    {
      url: "https://mp.weixin.qq.com/s/dbXcxZ3tOZmvsyCndP6uNw",
      date: "2026-04-14",
      lang: "zh",
      tag: { zh: "投资", en: "Markets", ja: "投資" },
      title: "Gamble日记｜Michael Burry，Palantir和人类学",
      source: { zh: "微信公众号 · 路邊野犬", en: "WeChat · 路邊野犬", ja: "WeChat · 路邊野犬" },
    },
    {
      url: "https://mp.weixin.qq.com/s/ZzK_qIeOPcf9HC-BdNBuqg",
      date: "2025-10-27",
      lang: "zh",
      tag: { zh: "历史", en: "History", ja: "歴史" },
      title: "里海曼波-第一章·油火下的节拍（1920–1938）",
      excerpt: "那一年的四月，巴库的风带着油味。空气中弥漫着一种独特的气息——海盐、煤烟、汽油、还有春天的灰尘。",
      source: { zh: "微信公众号 · 路邊野犬", en: "WeChat · 路邊野犬", ja: "WeChat · 路邊野犬" },
    },
    {
      url: "https://mp.weixin.qq.com/s/noafjqSCOh0XQ-tuMopMPQ",
      date: "2021-05-05",
      lang: "zh",
      tag: { zh: "历史", en: "History", ja: "歴史" },
      title: "國際共運：日本社会主义与安保鬥爭（背景）",
      excerpt: "如果一个国家灭亡的条件是「战败」跟「更改国号」的话，那么日本的确在二战之后正式亡国了。",
      source: { zh: "微信公众号 · 路邊野犬", en: "WeChat · 路邊野犬", ja: "WeChat · 路邊野犬" },
    },
  ],
};
