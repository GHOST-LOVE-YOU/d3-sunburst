import * as d3 from "d3";

// ---------------------------- 颜色配置 ----------------------------
// 第1层的基础色
// const BASE_COLORS = {
//   "PPaMo-Cap": "#59affa",
//   "PPaMo-QA": "#8471ef",
//   "PPaMo-Hall": "#dd4c51",
// };

// const BASE_COLORS = {
//   "PPaMo-Cap": "#1f5adc",
//   "PPaMo-QA": "#9452d6",
//   "PPaMo-Hall": "#ee508b",
// };

const BASE_COLORS = {
  // "PPaMo-Cap": "#402ae4",
  "PPaMo-Cap": "#9452d6",
  "PPaMo-QA": "#f66584",
  "PPaMo-Hall": "#f98923",
};

const ROOT_COLOR = "#ffffff"; // 根节点颜色

// 随意调节查看效果
const COLOR_CONFIG = {
  level3LightenAmount: 0.2,
  level2LightenAmount: 0.1,
};
// ------------------------------------------------------------------

// 根据节点深度和位置计算模态颜色
export const getModalityColor = (d) => {
  // Root node
  if (d.depth === 0) {
    return ROOT_COLOR;
  }

  // 第1层节点 - 使用映射的基础颜色
  if (d.depth === 1) {
    return BASE_COLORS[d.data.name] || "#ccc";
  }

  let parentColor = d.parent ? getModalityColor(d.parent) : "#ccc";
  const siblingPosition = d.parent ? d.parent.children.indexOf(d) : 0;
  // const siblingCount = d.parent ? d.parent.children.length : 1;

  // 第3层
  if (d.depth === 3) {
    return d3
      .color(parentColor)
      .brighter(COLOR_CONFIG.level3LightenAmount * (siblingPosition+1));
  }

  // 第2层
  if (d.depth === 2) {
    return d3
      .color(parentColor)
      .brighter(COLOR_CONFIG.level2LightenAmount * (siblingPosition+3));
  }
};

// 创建背景弧线的渐变配置
export const createGradientConfig = (node, index, extendedRadius) => {
  const baseColor = getModalityColor(node);

  return {
    id: `gradient-${index}`,
    stops: [
      { offset: "0%", color: baseColor },
      { offset: "20%", color: d3.color(baseColor).brighter(10) },
      { offset: "40%", color: d3.color(baseColor).brighter(2) },
      { offset: "60%", color: d3.color(baseColor).brighter(3) },
      { offset: "80%", color: d3.color(baseColor).brighter(4) },
      { offset: "100%", color: "#ffffff" },
    ],
    radius: extendedRadius,
    innerRadius: 250,
  };
};
