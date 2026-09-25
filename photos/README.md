# 相册照片

每次旅行建一个文件夹，名字用「年-月-地点」，把照片放进去即可：

```
photos/
  2024-12-russia/
    01.jpg
    02.jpg
    album.json   ← 可选
```

推送到 GitHub 后会自动：按拍摄方向旋转、缩成网页尺寸（WebP）、去掉 EXIF / GPS 信息，并生成相册页面。
照片按文件名排序；相册按年月倒序（新的在前）。

`album.json`（可选）设置三语地名、封面和单张照片说明：

```json
{
  "place": { "zh": "俄罗斯", "en": "Russia", "ja": "ロシア" },
  "cover": "05.jpg",
  "captions": { "05.jpg": { "zh": "莫斯科", "en": "Moscow", "ja": "モスクワ" } }
}
```

注意：这个仓库是公开的，这里的原图任何人都能下载（网站上显示的是去掉定位信息的小图）。
如果不想公开拍摄地点，请在导出照片时关闭「包含位置信息」。

支持 .jpg / .jpeg / .png / .webp / .avif（iPhone 的 HEIC 请先导出为 JPEG）。
本地预览前可运行 `node tools/build.mjs` 更新相册列表。
