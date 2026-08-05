import { useState } from 'react';

/* ============================================================
 * 跨章节共享小组件（init 章节与 clarify 章节共用）
 * ============================================================ */

/** 亮色高亮文本段 */
export function Hl({ color = 'cyan', children }) {
  return <span className={`hl${color === 'cyan' ? '' : `-${color}`}`}>{children}</span>;
}

/** 重点提示行 */
export function Keyline({ children }) {
  return (
    <div className="keyline">
      <span className="kicon">💡</span>
      <span>{children}</span>
    </div>
  );
}

/** 调用关系图（谁调谁 · 传什么 · 为什么）—— 点击被调用节点看细节 */
export function ClarifyCallGraph({ graph }) {
  const [sel, setSel] = useState(null);
  const f = graph.from;
  return (
    <div className="cg">
      <div className="cg-title">{graph.title}</div>
      <div className="cg-row">
        {/* 调用方 */}
        <div className={`cg-from ${graph.color}`}>
          <div className="cg-cmd">{f.cmd}</div>
          <div className="cg-sub">{f.sub}</div>
          <div className="cg-desc">{f.desc}</div>
        </div>
        {/* 每个被调用方一行：箭头 + 边标签 + 节点 */}
        <div className="cg-tos">
          {graph.tos.map((t) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="cg-arrow">
                <span className="edge-label">{t.edge}</span>
                {t.edgeDesc && <span className="edge-sub">{t.edgeDesc}</span>}
                <span className="arr">→</span>
              </div>
              <div
                className={`cg-to ${graph.color} ${t.dashed ? 'dashed' : ''} ${sel === t.id ? 'selected' : ''}`}
                onClick={() => setSel(sel === t.id ? null : t.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSel(sel === t.id ? null : t.id);
                  }
                }}
              >
                <span className="cg-icon">{t.icon || '▸'}</span>
                <div className="cg-info">
                  <div className="cg-cmd">{t.cmd}</div>
                  <div className="cg-what">{t.what || t.edgeDesc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {sel && (
        <div className="cg-detail">
          <b>为什么调它：</b>
          {graph.tos.find((t) => t.id === sel)?.desc}
        </div>
      )}
    </div>
  );
}
