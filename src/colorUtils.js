import * as d3 from "d3";

// ---------------------------- 颜色配置 ----------------------------
// 第1层的基础色
// const BASE_COLORS = {
//   "KineParse-Cap": "#59affa",
//   "KineParse-QA": "#8471ef",
//   "KineParse-Hall": "#dd4c51",
// };

// const BASE_COLORS = {
//   "KineParse-Cap": "#1f5adc",
//   "KineParse-QA": "#9452d6",
//   "KineParse-Hall": "#ee508b",
// };

const BASE_COLORS = {
  "KineParse-Cap": "#e0bce8",
  "KineParse-QA": "#ffccd0",
  "KineParse-Hall": "#f8bcd0",
};

const BACKGROUND_COLORS = {
  "KineParse-Cap": "#f8f0f8",
  "KineParse-QA": "#fff6f7",
  "KineParse-Hall": "#ffe8f2",
};

const ROOT_COLOR = "#ffffff"; // 根节点颜色

const COLOR_CONFIG = {
  level2LightenRange: [0, 0.08],
  level3LightenRange: [0.02, 0.22],
};
// ------------------------------------------------------------------

const mixWithWhite = (color, amount) =>
  d3.interpolateRgb(color, "#ffffff")(amount);

const getSiblingLightenAmount = (d, [min, max]) => {
  const siblings = d.parent?.children || [];
  const siblingCount = Math.max(siblings.length - 1, 1);
  const siblingPosition = siblings.indexOf(d);

  return min + ((max - min) * siblingPosition) / siblingCount;
};

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

  // 第3层
  if (d.depth === 3) {
    const parentColor = d.parent ? getModalityColor(d.parent) : "#ccc";
    return mixWithWhite(
      parentColor,
      getSiblingLightenAmount(d, COLOR_CONFIG.level3LightenRange),
    );
  }

  // 第2层
  if (d.depth === 2) {
    const parentColor = d.parent ? getModalityColor(d.parent) : "#ccc";
    return mixWithWhite(
      parentColor,
      getSiblingLightenAmount(d, COLOR_CONFIG.level2LightenRange),
    );
  }

  return "#ccc";
};

// 创建背景弧线的渐变配置
export const createGradientConfig = (node, index, extendedRadius) => {
  const baseColor = BACKGROUND_COLORS[node.data.name] || mixWithWhite(getModalityColor(node), 0.9);

  return {
    id: `gradient-${index}`,
    stops: [
      { offset: "0%", color: baseColor },
      { offset: "100%", color: baseColor },
    ],
    radius: extendedRadius,
    innerRadius: 445,
  };
};
