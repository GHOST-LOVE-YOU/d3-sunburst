# demo

![svgviewer-output(1).png](https://minio-file.rica.nezuko.me/img/2025/05/11/681f8e57c26e4.png)

# 运行

```bash
# 需要配置node环境
git clone
cd
npm install
npm run dev
```

# 保存为svg

这个需要进入开发者模式(右键->检查), 找到svg标签, 右键"copy -> outer HTML"

![1746898368678.png](https://minio-file.rica.nezuko.me/img/2025/05/11/681f8dc2d4539.png)

将复制的内容粘贴到任意avg online工具, 如[svgviewer.dev](https://www.svgviewer.dev/), 下载svg即可

# 数据

在`sunburstData.js`中定义。

# 颜色

在`colorUtils.js`中定义。

# 布局

在`SunburstChart.jsx`中定义，用于控制图表的尺寸、位置和视觉方面。

## 弧形配置

弧形生成器定义了每个层级的内外半径：

```javascript
// 每层的弧形尺寸
.innerRadius((d) => {
  if (d.depth === 0) return 0;
  if (d.depth === 1) return 80;
  if (d.depth === 2) return 160;
  if (d.depth === 3) return 240;
  return 0;
})
.outerRadius((d) => {
  if (d.depth === 0) return 80;
  if (d.depth === 1) return 160;
  if (d.depth === 2) return 240;
  if (d.depth === 3) return 445;
  return 0;
})
```

## 圆角半径

您可以调整每个扇形的圆角程度：

```javascript
.cornerRadius((d) => {
  if (d.depth === 0) return 0;
  if (d.depth === 1) return 10;
  if (d.depth === 2) return 15;
  if (d.depth === 3) return 20;
  return 0;
})
```

## 描边宽度(扇形周围的那个白边)

可以调整每层的描边宽度：

```javascript
.style("stroke-width", (d) => {
  if (d.depth === 0) return 0.5;
  if (d.depth === 1) return 1;
  if (d.depth === 2) return 1.5;
  if (d.depth === 3) return 3;
  return 1;
})
```
