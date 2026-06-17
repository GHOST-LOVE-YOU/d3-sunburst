import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { 
  getModalityColor, 
  createGradientConfig 
} from "./colorUtils";
import sunburstData from "./sunburstData";

const SunburstChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const radius = 450; // 整体半径
    const width = 2 * radius + 700;
    const height = 2 * radius;
    const extendedRadius = radius * 8; // 延伸背景的半径

    // 创建 SVG 元素，并添加一个居中的 Group
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    const background = svg.append("g").attr("class", "background");
    const defs = svg.append("defs");
    const partition = d3.partition().size([2 * Math.PI, radius]);

    // 弧生成器(设置每一级的内外半径)
    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius((d) => {
        if (d.depth === 0) return 0;
        if (d.depth === 1) return 80;
        if (d.depth === 2) return 160;
        if (d.depth === 3) return 240;
        return 0;
      })
      .outerRadius((d) => {
        if (d.depth === 0) return 80;
        if (d.depth === 1) return 159;
        if (d.depth === 2) return 236;
        if (d.depth === 3) return 445;
        return 0;
      })
      // 设置圆角半径
      .cornerRadius((d) => {
        if (d.depth === 0) return 0;
        if (d.depth === 1) return 10;
        if (d.depth === 2) return 15;
        if (d.depth === 3) return 20;
        return 0;
      });

    // 背景弧生成器
    const backgroundArc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .innerRadius(() => 445)
      .outerRadius(() => extendedRadius);
    const root = d3.hierarchy(sunburstData).sum((d) => d.value || 0);
    const nodes = partition(root).descendants();
    const firstLevelNodes = nodes.filter((d) => d.depth === 1);

    // 为每个第一层节点创建径向渐变
    firstLevelNodes.forEach((node, i) => {
      const gradientConfig = createGradientConfig(node, i, extendedRadius);
      
      // 使用径向渐变替代线性渐变
      const gradient = defs
        .append("radialGradient")
        .attr("id", gradientConfig.id)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", gradientConfig.radius)
        .attr("fr", gradientConfig.innerRadius);

      // 创建更平滑的渐变
      gradientConfig.stops.forEach(stop => {
        gradient
          .append("stop")
          .attr("offset", stop.offset)
          .attr("stop-color", stop.color);
      });
    });

    // 绘制背景扩展弧
    background
      .selectAll("path.background-arc")
      .data(firstLevelNodes)
      .enter()
      .append("path")
      .attr("class", "background-arc")
      .attr("d", backgroundArc)
      .style("fill", (d, i) => `url(#gradient-${i})`)
      .style("opacity", 1)
      .style("stroke", "#fff")
      .style("stroke-width", 0.5)
      .style("fill-rule", "evenodd");

    // 绘制扇形路径
    svg
      .selectAll("path.node-arc")
      .data(nodes)
      .enter()
      .append("path")
      .attr("class", "node-arc")
      .attr("d", arc)
      .style("fill", (d) => getModalityColor(d))
      .style("stroke", "#fff")
      .style("stroke-width", (d) => {
        // 设置边框宽度
        if (d.depth === 0) return 0.5;
        if (d.depth === 1) return 4;
        if (d.depth === 2) return 4;
        if (d.depth === 3) return 8;
        return 1; // 默认任何其他深度
      })
      .style("fill-rule", "evenodd");

    // 绘制文本标签
    svg
      .selectAll("text.arc-label")
      .data(
        nodes.filter(
          (d) => d.depth > 0,
        ),
      )
      .enter()
      .append("text")
      .attr("class", "arc-label")
      .attr("transform", (d) => {
        const centroid = arc.centroid(d);
        const angle = (d.x0 + d.x1) / 2;
        let rotation = (angle * 180) / Math.PI - 90;

        if (d.depth === 1 || d.depth === 2) {
          if (angle < Math.PI / 2 || angle > 3 * Math.PI / 2) {
            rotation += 90;
          }
          else {
            rotation += 270;
          }
        }
        else{
          if (angle > Math.PI) {
          rotation += 180;
          }
        }

        return `translate(${centroid}) rotate(${rotation})`;
      })
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.name)
      .style("fill", "#000")
      // 设置字体大小和加粗
      .style("font-size", (d) => {
        if (d.depth === 1) return "20px";
        if (d.depth === 2) return "13px";
        if (d.depth === 3) return "14px";
        return "10px";
      })
      .style("font-weight", (d) => {
        if (d.depth === 1) return 1000;
        if (d.depth === 2) return 1000;
        if (d.depth === 3) return 600;
        return "normal";
      })
      .style("pointer-events", "none");

  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background: "#fff8fb",
      }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SunburstChart;
