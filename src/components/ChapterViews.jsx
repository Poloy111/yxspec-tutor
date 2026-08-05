import { useState } from 'react';
import { Badge, Stat, Card, Callout, Tutor, SectionTitle } from './ui';
import { Hl, Keyline, ClarifyCallGraph } from './shared';

/* ============================================================
 * 通用章节渲染器 —— 后续每个流程章节共用同一套视图
 * 章节数据文件只需提供：overview / steps / io / artifacts /
 * samples / mechanisms / sections，即可完整渲染 0-4（可扩展）
 * ============================================================ */

/* ---------- 0. 命令总览 ---------- */
export function ChapterOverview({ data }) {
  const ov = data.overview;
  const inst = ov.instance;
  const steps = data.steps || [];
  const [selStep, setSelStep] = useState(null);

  return (
    <div>
      <div className="page-title">
        <h1>命令总览</h1>
        <div className="sub">{ov.oneLiner}</div>
      </div>

      <Card title="这一阶段到底在干嘛？">
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <b style={{ color: 'var(--blue)' }}>{ov.purpose.oneLiner}</b>
        </div>

        <SectionTitle sub={ov.purpose.input.note}>输入：{ov.purpose.input.title}</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {ov.purpose.input.items.map((it, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{it}</li>
          ))}
        </ul>

        <SectionTitle>加工：{ov.purpose.processTitle || '几步，全自动'}</SectionTitle>
        {ov.purpose.process.map((p, i) => (
          <div key={i} style={{ fontSize: 13.5, padding: '4px 0' }}>{p}</div>
        ))}

        <SectionTitle>产出：{ov.purpose.outputsTitle || '3 样（下游全靠它们）'}</SectionTitle>
        <table className="tbl">
          <thead><tr><th>产物</th><th>是什么</th><th>谁用</th></tr></thead>
          <tbody>
            {ov.purpose.outputs.map((o, i) => (
              <tr key={i}><td style={{ whiteSpace: 'nowrap' }}><Badge kind="amber">{o.name}</Badge></td><td>{o.what}</td><td>{o.consumer}</td></tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>为什么必须有这一步？</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {ov.purpose.value.map((v, i) => (
            <li key={i} style={{ margin: '4px 0' }}>{v}</li>
          ))}
        </ul>

        <SectionTitle>它不管什么？（边界）</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {ov.purpose.boundary.map((b, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{b}</li>
          ))}
        </ul>

        {ov.purpose.example && (
          <Callout kind="amber">
            <b>一个真实的例子：</b>{ov.purpose.example}
          </Callout>
        )}
      </Card>

      <Card title="一个比喻帮你记住">
        <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-2)' }}>{ov.analogy}</div>
        <Keyline>{ov.memoryLine}</Keyline>
      </Card>

      {ov.roles && (
        <Card title={ov.rolesTitle || '谁在干活？'}>
          <table className="tbl">
            <thead><tr><th>角色</th><th>是谁</th><th>干什么</th></tr></thead>
            <tbody>
              {ov.roles.map((r, i) => (
                <tr key={i}>
                  <td><Badge kind={r.kind || 'blue'}>{r.role}</Badge></td>
                  <td>{r.who}</td>
                  <td>{r.does}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Card title={ov.whyTitle || '为什么要这样分工？'}>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {ov.whyShell.map((p, i) => (
            <li key={i} style={{ margin: '5px 0' }}>{p}</li>
          ))}
        </ul>
        {ov.whyMemory && <Keyline>{ov.whyMemory}</Keyline>}
      </Card>

      <Card title="真实跑一次是什么样？">
        <div className="stat-grid" style={{ marginBottom: 10 }}>
          {inst.stats.map((s, i) => (
            <Stat key={i} num={s.num} label={s.label} numKind={s.kind || 'cyan'} desc={s.desc} />
          ))}
        </div>
        <Keyline>{inst.memoryLine}</Keyline>
      </Card>

      {steps.length > 0 && (
        <Card title="内部步骤（点击看细节）">
          <div className="wf-row" style={{ flexWrap: 'wrap' }}>
            {steps.map((n, i) => (
              <div key={n.id} className="wf-row" style={{ display: 'contents' }}>
                <div
                  className={`wf-node ${n.color || 'cyan'} ${selStep !== null && selStep !== n.id ? 'dim' : ''}`}
                  onClick={() => setSelStep(selStep === n.id ? null : n.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelStep(selStep === n.id ? null : n.id);
                    }
                  }}
                  style={selStep === n.id ? { borderColor: 'var(--amber)', boxShadow: '0 0 0 2px rgba(181,113,10,.25)' } : undefined}
                >
                  <div className="wf-icon">{n.icon || '▸'}</div>
                  <div className="wf-cmd">{i}. {n.name}</div>
                  <div className="wf-stage">{n.sub}</div>
                </div>
                <div className="wf-arrow">{n.after || '→'}</div>
              </div>
            ))}
          </div>
          {selStep !== null && (
            <div className="answer" style={{ marginTop: 12 }}>
              <div className="h">Step {selStep} · {steps[selStep].name}</div>
              <div style={{ fontSize: 13 }}>
                <b>在干什么：</b>{steps[selStep].action}
                <br />
                <b>完成后要有：</b>{steps[selStep].post} —— <b>为什么：</b>{steps[selStep].why}
              </div>
            </div>
          )}
        </Card>
      )}

      {ov.downstream && (
        <Card title="下游产物（谁拿走了什么）">
          <div className="pipe" style={{ gap: 10 }}>
            {ov.downstream.map((d, i) => (
              <span key={i} className="seg output">{d}</span>
            ))}
          </div>
          <Keyline>{ov.downstreamLine}</Keyline>
        </Card>
      )}

      {ov.ironRules && (
        <Card title="铁律（为什么这么设计）">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
            {ov.ironRules.map((r, i) => (
              <li key={i} style={{ margin: '4px 0' }}>{r}</li>
            ))}
          </ul>
        </Card>
      )}

      {ov.tutor && <Tutor question={ov.tutor.question}>{ov.tutor.answer}</Tutor>}
    </div>
  );
}

/* ---------- 1. 执行流程（互动流程图，支持任意步骤数） ---------- */
export function ChapterFlow({ data }) {
  const steps = data.flowSteps;
  const [open, setOpen] = useState(0);

  return (
    <div>
      <div className="page-title">
        <h1>{data.flowTitle}</h1>
        <div className="sub">{data.flowSub}</div>
      </div>

      <div className="card">
        {data.phaseBar && (
          <div className="clarify-phasebar">
            {data.phaseBar.map((p, i) => (
              <span key={i} className={`phase-seg ${p.kind}`}>{p.label}</span>
            ))}
          </div>
        )}
        <div className="steps">
          {steps.map((s, si) => {
            const isOpen = open === s.id;
            const isLast = si === steps.length - 1;
            return (
              <div key={s.id} className={`step-row ${isLast ? 'done' : 'active'}`}>
                <div className={`step-node ${s.phase === 'back' ? 'phase-back' : ''}`}>{s.id}</div>
                <div
                  className={`card clickable step-card ${isOpen ? 'selected' : ''}`}
                  style={{ marginBottom: 0, padding: isOpen ? '16px 18px' : '11px 16px' }}
                  onClick={() => setOpen(isOpen ? -1 : s.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(isOpen ? -1 : s.id); } }}
                >
                  <div className="step-title">
                    <span>{s.id}. {s.label}</span>
                    <Badge kind="gray">{s.name}</Badge>
                    {s.badges && s.badges.map((b, bi) => <Badge key={bi} kind={b.kind}>{b.text}</Badge>)}
                  </div>
                  <div className="step-desc">{s.action}</div>

                  <div className="step-edge">
                    <span className="edge-arrow">↓ 传给下一步：</span>
                    <span className="edge-label">{s.edge}</span>
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: 10 }}>
                      <div className="tbl-wrap">
                        <table className="tbl">
                          <tbody>
                            <tr><td style={{ width: 110 }}><Badge kind="cyan">完成后要有</Badge></td><td>{s.post}</td></tr>
                            <tr><td><Badge kind="amber">为什么需要这一步</Badge></td><td>{s.why}</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
                {!isLast && (
                  <div className={`step-connector ${s.stopAfter ? 'stop' : ''}`}>
                    <span className={`connector-line ${s.stopAfter ? 'stop' : ''}`} />
                    <span className="connector-label">{s.connectorLabel || s.edge}</span>
                    <span className="connector-arrow">▼</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {data.flowTutor && <Tutor question={data.flowTutor.question}>{data.flowTutor.answer}</Tutor>}
    </div>
  );
}

/* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
export function ChapterIo({ data }) {
  const io = data.io;
  return (
    <div>
      <div className="page-title">
        <h1>命令的输入、输出及调用关系</h1>
        <div className="sub">{data.ioSub || '考核①明确要求：分析每个 Command 的输入、输出及调用关系。'}</div>
      </div>

      <Card title="输入（开始前手里有什么）">
        <table className="tbl">
          <thead><tr><th>输入</th><th>是什么</th></tr></thead>
          <tbody>
            {io.inputs.map((it, i) => (
              <tr key={i}><td style={{ whiteSpace: 'nowrap' }}><code>{it.name}</code></td><td>{it.role}</td></tr>
            ))}
          </tbody>
        </table>
        {io.inputKeyline && <Keyline>{io.inputKeyline}</Keyline>}
      </Card>

      <Card title="输出（跑完会留下什么）">
        <table className="tbl">
          <thead><tr><th>输出</th><th>是什么</th></tr></thead>
          <tbody>
            {io.outputs.map((it, i) => (
              <tr key={i}><td style={{ whiteSpace: 'nowrap' }}><code>{it.name}</code></td><td>{it.role}</td></tr>
            ))}
          </tbody>
        </table>
        {io.outputKeyline && <Keyline>{io.outputKeyline}</Keyline>}
      </Card>

      {io.callGraphs && (
        <Card title="调用关系（谁调谁 · 传什么 · 为什么）">
          {io.callGraphs.map((g, i) => (
            <ClarifyCallGraph key={i} graph={g} />
          ))}
          <Keyline>{io.callKeyline}</Keyline>
        </Card>
      )}

      {io.pipeline && (
        <Card title="管道视图：一条命令的数据流">
          <div className="pipe">
            {io.pipeline.map((p, i) => (
              <span key={i} style={{ display: 'contents' }}>
                {i > 0 && <span className="arr">→</span>}
                <span className={`seg ${p.seg}`}>{p.label}</span>
              </span>
            ))}
          </div>
          {io.pipeKeyline && <Keyline>{io.pipeKeyline}</Keyline>}
        </Card>
      )}

      {io.components && (
        <Card title="脚本 / Worker 明细">
          {io.components.map((sec, i) => (
            <div key={i}>
              {sec.title && <SectionTitle>{sec.title}</SectionTitle>}
              <table className="tbl">
                <thead><tr>{sec.cols.map((c, ci) => <th key={ci}>{c}</th>)}</tr></thead>
                <tbody>
                  {sec.rows.map((r, ri) => (
                    <tr key={ri}>
                      {sec.cols.map((c, ci) => (
                        <td key={ci} style={ci === 0 ? { whiteSpace: 'nowrap' } : undefined}>
                          {c === '名称' || c === '脚本' || c === 'Worker' ? <code>{r[ci]}</code> : r[ci]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {io.componentsNote && <Callout kind="cyan">{io.componentsNote}</Callout>}
        </Card>
      )}

      {io.qualityGates && (
        <Card title="质量门明细">
          <table className="tbl">
            <thead><tr><th>门</th><th>名称</th><th>所在 Phase</th><th>检查什么</th><th>真实结果</th></tr></thead>
            <tbody>
              {io.qualityGates.map((q, i) => (
                <tr key={i}>
                  <td><Badge kind="cyan">{q.code}</Badge></td>
                  <td>{q.name}</td>
                  <td>{q.phase}</td>
                  <td>{q.check}</td>
                  <td><Badge kind="green">{q.outcome}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          {io.gateNote && <Callout kind="cyan">{io.gateNote}</Callout>}
        </Card>
      )}

      {io.gateTable && (
        <Card title="gate 内部检查表">
          <table className="tbl">
            <thead><tr><th>Step</th><th>名称</th><th>post 检查</th></tr></thead>
            <tbody>
              {io.gateTable.map((g) => (
                <tr key={g.step}>
                  <td><Badge kind="gray">{g.step}</Badge></td>
                  <td><code>{g.name}</code></td>
                  <td><code>{g.post}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {io.failures && (
        <Card title="故障处置表">
          <table className="tbl">
            <thead><tr><th>故障</th><th>处置</th></tr></thead>
            <tbody>
              {io.failures.map((f, i) => (
                <tr key={i}><td><code>{f.fault}</code></td><td>{f.action}</td></tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {data.ioTutor && <Tutor question={data.ioTutor.question}>{data.ioTutor.answer}</Tutor>}
    </div>
  );
}

/* ---------- 3. 产物实例 ---------- */
export function ChapterArtifacts({ data }) {
  const art = data.artifacts;
  const samples = data.samples || [];
  const [sel, setSel] = useState(null);

  return (
    <div>
      <div className="page-title">
        <h1>产物实例（本仓库真实文件）</h1>
        <div className="sub">{data.artifactsSub || '产物文件都在工程里真实存在，答辩时可打开验证。'}</div>
      </div>

      <Card title={`${art.length} 个产物：是什么 · 有什么用 · 谁用`}>
        <table className="tbl">
          <thead><tr><th>产物</th><th>内容要点</th><th>有什么用（谁用）</th></tr></thead>
          <tbody>
            {art.map((a, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}><Badge kind={a.kind}>{a.name}</Badge></td>
                <td>{a.what}</td>
                <td>{a.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.artifactsChain && <Keyline>{data.artifactsChain}</Keyline>}
      </Card>

      {samples.length > 0 && (
        <Card title={data.samplesTitle || '真实样例（点开看细节）'}>
          <div className="clq-grid">
            {samples.map((c) => {
              const open = sel === c.id;
              return (
                <div key={c.id} className={`clq-card ${open ? 'selected' : ''}`} onClick={() => setSel(open ? null : c.id)} role="button" tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(open ? null : c.id); } }}>
                  <div className="clq-head">
                    <span className="clq-title">{c.id}</span>
                    {c.badges && c.badges.map((b, bi) => <Badge key={bi} kind={b.kind}>{b.text}</Badge>)}
                    {c.meta && <span className="muted">{c.meta}</span>}
                  </div>
                  <div className="clq-q">{c.title}</div>
                  {open && (
                    <div className="clq-body">
                      {c.fields.map((f, fi) => (
                        <div key={fi} className="clq-answer"><b>{f.k}：</b>{f.v}</div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {data.samplesNote && <Callout kind="amber">{data.samplesNote}</Callout>}
        </Card>
      )}

      {data.extraArtifactBlocks && data.extraArtifactBlocks.map((b, bi) => (
        <Card key={bi} title={b.title}>
          {b.body}
        </Card>
      ))}
    </div>
  );
}

/* ---------- 4. 机制 ---------- */
export function ChapterMechanisms({ data }) {
  const mech = data.mechanisms;
  return (
    <div>
      <div className="page-title">
        <h1>{mech.title}</h1>
        <div className="sub">{mech.sub}</div>
      </div>

      {mech.mechTable && (
        <Card title={mech.mechTableTitle || '机制总览'}>
          <table className="tbl">
            <thead><tr>{mech.mechTable.cols.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
            <tbody>
              {mech.mechTable.rows.map((r, i) => (
                <tr key={i}>{mech.mechTable.cols.map((c, ci) => <td key={ci}>{r[ci]}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {mech.sections && mech.sections.map((sec, si) => (
        <Card key={si} title={sec.title}>
          {sec.type === 'ul' && (
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
              {sec.items.map((it, ii) => <li key={ii} style={{ margin: '5px 0' }}>{it}</li>)}
            </ul>
          )}
          {sec.type === 'pipe' && (
            <div className="pipe" style={{ gap: 10 }}>
              {sec.items.map((it, ii) => (
                <span key={ii} style={{ display: 'contents' }}>
                  {ii > 0 && <span className="arr">→</span>}
                  <span className={`seg ${it.kind || 'cmd'}`}>{it.label}</span>
                </span>
              ))}
            </div>
          )}
          {sec.type === 'callout' && <Callout kind={sec.kind || 'green'}>{sec.text}</Callout>}
          {sec.type === 'table' && (
            <div className="tbl-wrap">
              <table className="tbl">
                <thead><tr>{sec.cols.map((c, ci) => <th key={ci}>{c}</th>)}</tr></thead>
                <tbody>
                  {sec.rows.map((r, ri) => (
                    <tr key={ri}>{sec.cols.map((c, ci) => <td key={ci}>{r[ci]}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {sec.keyline && <Keyline>{sec.keyline}</Keyline>}
        </Card>
      ))}
    </div>
  );
}

/* ---------- 通用章节包装（0-4 视图注册） ---------- */
export function chapterViews(chapterData, keys) {
  return keys.map((k) => {
    switch (k) {
      case 'overview': return <ChapterOverview data={chapterData} />;
      case 'flow': return <ChapterFlow data={chapterData} />;
      case 'io': return <ChapterIo data={chapterData} />;
      case 'artifacts': return <ChapterArtifacts data={chapterData} />;
      case 'mechanisms': return <ChapterMechanisms data={chapterData} />;
      default: return null;
    }
  });
}
