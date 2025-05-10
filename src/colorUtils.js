import * as d3 from "d3";

// ---------------------------- 颜色配置 ----------------------------
// 第1层的基础色
const BASE_COLORS = {
  "PPaMo-Cap": "#f5b4b0",
  "PPaMo-QA": "#d0eac7",
  "PPaMo-Hall": "#d4a7e0",
};

const ROOT_COLOR = "#ffffff"; // 根节点颜色

// 随意调节查看效果
const COLOR_CONFIG = {
  level3FirstChildDarkenAmount: 0.1,
  level2LightenAmount: 0.2,
  depthLightenBaseAmount: 0.04,
  level3SiblingMaxLightenAmount: 0.5,
  otherLevelsSiblingMaxLightenAmount: 0.4,
};
// ------------------------------------------------------------------

const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  
  const rgbToHex = (r, g, b) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = Math.min(255, Math.max(0, Math.round(x))).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };
  
  const lightenColor = (color, amount) => {
    const rgb = hexToRgb(color);
    // Move RGB values toward white (255,255,255)
    const r = rgb.r + (255 - rgb.r) * amount;
    const g = rgb.g + (255 - rgb.g) * amount;
    const b = rgb.b + (255 - rgb.b) * amount;
    return rgbToHex(r, g, b);
  };
  
  const darkenColor = (color, amount) => {
    const rgb = hexToRgb(color);
    // Move RGB values toward black (0,0,0)
    const r = rgb.r * (1 - amount);
    const g = rgb.g * (1 - amount);
    const b = rgb.b * (1 - amount);
    return rgbToHex(r, g, b);
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

  let parentColor = d.parent ? getModalityColor(d.parent) : "#ccc";
  const siblingPosition = d.parent ? d.parent.children.indexOf(d) : 0;
  const siblingCount = d.parent ? d.parent.children.length : 1;

  // 第3层第一个子节点 - 加深颜色
  if (d.depth === 3 && siblingPosition === 0) {
    return darkenColor(parentColor, COLOR_CONFIG.level3FirstChildDarkenAmount);
  }

  // 第2层第一个子节点 - 变浅颜色
  if (d.depth === 2) {
    return lightenColor(parentColor, COLOR_CONFIG.level2LightenAmount);
  }

  // 其它节点 - 根据兄弟节点位置计算变浅颜色
  const baseAmount = COLOR_CONFIG.depthLightenBaseAmount * d.depth;
  const siblingAmount =
    d.depth === 3
      ? siblingPosition > 0
        ? (siblingPosition / siblingCount) *
          COLOR_CONFIG.level3SiblingMaxLightenAmount
        : 0
      : (siblingPosition / siblingCount) *
        COLOR_CONFIG.otherLevelsSiblingMaxLightenAmount;

  return lightenColor(parentColor, baseAmount + siblingAmount);
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
