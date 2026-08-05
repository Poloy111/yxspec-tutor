/** 通用 UI 小件 */

export function Badge({ kind = 'gray', children }) {
  return <span className={`badge ${kind}`}>{children}</span>;
}

export function Stat({ num, numKind = '', label, desc }) {
  return (
    <div className="stat">
      <div className={`num ${numKind}`}>{num}</div>
      <div className="label">{label}</div>
      {desc && <div className="desc">{desc}</div>}
    </div>
  );
}

export function Card({ title, children, bar = true }) {
  return (
    <div className="card">
      {title && (
        <h2>
          {bar && <span className="bar" />}
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

export function Callout({ kind = 'cyan', children }) {
  return <div className={`callout ${kind}`}>{children}</div>;
}

export function Tutor({ question, children }) {
  return (
    <div className="tutor">
      <div className="avatar">师</div>
      <div className="body">
        <span className="q">{question}</span>
        {children}
      </div>
    </div>
  );
}

export function Answer({ title = '答辩要点', items }) {
  return (
    <div className="answer">
      <div className="h">{title}</div>
      <ul>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export function SectionTitle({ children, sub }) {
  return (
    <div style={{ margin: '18px 0 10px' }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{children}</h3>
      {sub && <div className="muted" style={{ marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
