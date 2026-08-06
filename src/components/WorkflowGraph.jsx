import { useMemo, useRef, useState } from 'react';
import dagre from 'dagre';
import { graphNodes, graphEdges, graphLegend } from '../data/yxspecData';

/* 关系图：dagre 自上而下布局 + SVG 边 + HTML 节点 */
export default function WorkflowGraph() {
  const wrapRef = useRef(null);
  const [selected, setSelected] = useState(null);

  // dagre 布局（TB：自上而下，主链纵向流动）
  const layout = useMemo(() => {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'TB', nodesep: 24, ranksep: 46, marginx: 12, marginy: 12 });
    g.setDefaultEdgeLabel(() => ({}));

    const nodeW = 164, nodeH = 92;
    graphNodes.forEach((n) => g.setNode(n.id, { width: nodeW, height: nodeH }));
    graphEdges.forEach((e) => g.setEdge(e.from, e.to, e));
    // 同一父节点的并行支（分叉点）标注并行提示
    dagre.layout(g);

    const nodes = graphNodes.map((n) => {
      const p = g.node(n.id);
      return { ...n, x: p.x - nodeW / 2, y: p.y - nodeH / 2, w: nodeW, h: nodeH };
    });
    const edges = graphEdges.map((e) => {
      const edge = g.edge(e.from, e.to);
      return { ...e, points: edge.points };
    });
    const dims = g.graph();
    return { nodes, edges, graphW: dims.width, graphH: dims.height };
  }, []);

  // 节点点击 → 高亮相邻边
  const neighbors = useMemo(() => {
    const set = new Set();
    if (!selected) return set;
    graphEdges.forEach((e) => {
      if (e.from === selected) set.add(e.to);
      if (e.to === selected) set.add(e.from);
    });
    return set;
  }, [selected]);

  const pad = 16;
  const svgW = layout.graphW + pad * 2;
  const svgH = layout.graphH + pad * 2;

  const edgeColor = (e) => {
    if (selected && e.from !== selected && e.to !== selected) return '#d5dce6';
    if (e.from === selected || e.to === selected) return '#0d7fa8';
    return '#9db0c6';
  };
  const edgeWidth = (e) => (selected && (e.from === selected || e.to === selected) ? 2.4 : 1.3);
  const nodeDim = (n) => (selected && n.id !== selected && !neighbors.has(n.id) ? 'dim' : '');

  return (
    <div className="graph-wrap" ref={wrapRef}>
      {/* 图例 */}
      <div className="graph-legend">
        {graphLegend.map((l) => (
          <span key={l.color} className={`legend-item legend-${l.color}`}>
            <span className="legend-swatch" />{l.label}
          </span>
        ))}
        <span className="legend-item">
          <span className="legend-line solid" />实线 = 实际执行依赖
        </span>
        <span className="legend-item">
          <span className="legend-line dashed" />虚线 = 支撑 / 并行参考
        </span>
      </div>

      <div className="graph-scroll">
        <div className="graph-canvas" style={{ width: svgW, height: svgH }}>
          {/* SVG 边 */}
          <svg
            width={svgW}
            height={svgH}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <defs>
              <marker id="arrowhead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#8aa0b8" />
              </marker>
              <marker id="arrowhead-hl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0d7fa8" />
              </marker>
            </defs>
            {layout.edges.map((e, i) => {
              const pts = e.points || [];
              if (pts.length < 2) return null;
              const d = pts
                .map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x + pad} ${p.y + pad}`)
                .join(' ');
              const mid = pts[Math.floor(pts.length / 2)] || pts[0];
              const color = edgeColor(e);
              const isHl = selected && (e.from === selected || e.to === selected);
              return (
                <g key={i}>
                  <path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={edgeWidth(e)}
                    strokeDasharray={e.dashed ? '6 4' : undefined}
                    markerEnd={isHl ? 'url(#arrowhead-hl)' : 'url(#arrowhead)'}
                  />
                  {e.label && (
                    <g transform={`translate(${mid.x + pad}, ${mid.y + pad - 8})`}>
                      <rect
                        x={-e.label.length * 3.1 - 5}
                        y={-8}
                        width={e.label.length * 6.2 + 10}
                        height={15}
                        rx={3}
                        fill={isHl ? 'rgba(13,127,168,.12)' : 'rgba(255,255,255,.92)'}
                        stroke={isHl ? 'rgba(13,127,168,.4)' : 'none'}
                      />
                      <text
                        textAnchor="middle"
                        fontSize="10.5"
                        fontFamily="Consolas, monospace"
                        fill={isHl ? '#0d7fa8' : '#5b6b80'}
                      >
                        {e.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* HTML 节点 */}
          {layout.nodes.map((n) => (
            <div
              key={n.id}
              className={`graph-node graph-${n.color} ${nodeDim(n)} ${selected === n.id ? 'selected' : ''}`}
              style={{
                left: n.x + pad,
                top: n.y + pad,
                width: n.w,
                height: n.h,
              }}
              onClick={() => setSelected(selected === n.id ? null : n.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(selected === n.id ? null : n.id);
                }
              }}
              title={n.desc}
            >
              <div className="g-icon">{n.icon}</div>
              <div className="g-cmd">{n.cmd}</div>
              <div className="g-stage">{n.stage} · {n.label}</div>
              <div className="g-out">{n.out}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 选中详情 */}
      {selected && (
        <div className="graph-detail">
          <b>已选中：</b>
          <code>{selected}</code>
          <div className="graph-detail-desc">
            {graphNodes.find((n) => n.id === selected)?.desc}
          </div>
        </div>
      )}
    </div>
  );
}
