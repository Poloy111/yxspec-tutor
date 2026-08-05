import { useState } from 'react';
import {
  clarifyOverview, clarifySteps, clarifyIo, clarifyArtifacts, clqSamples, clarifyFlowNodes,
} from '../data/clarifyData';
import { Badge, Stat, Card, Callout, Tutor, SectionTitle } from './ui';
import { Hl, Keyline, ClarifyCallGraph } from './shared';

/* ============================================================
 * /yxspec:clarify 章节视图（对照 init 章节的同构结构）
 * ============================================================ */

/* ---------- 0. 命令总览 ---------- */
export function ClarifyOverviewView() {
  const inst = clarifyOverview.instance;
  const [selStep, setSelStep] = useState(null);

  return (
    <div>
      <div className="page-title">
        <h1>命令总览</h1>
        <div className="sub">{clarifyOverview.oneLiner}</div>
      </div>

      <Card title="这一阶段到底在干嘛？">
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <b style={{ color: 'var(--blue)' }}>{clarifyOverview.purpose.oneLiner}</b>
        </div>

        <SectionTitle sub={clarifyOverview.purpose.input.note}>输入：init 的产出（没有它一步都跑不了）</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {clarifyOverview.purpose.input.items.map((it, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{it}</li>
          ))}
        </ul>

        <SectionTitle>加工：7 步，其中 1 步必须等「人」</SectionTitle>
        {clarifyOverview.purpose.process.map((p, i) => (
          <div key={i} style={{ fontSize: 13.5, padding: '4px 0' }}>{p}</div>
        ))}

        <SectionTitle>产出：3 样（下游全靠它们）</SectionTitle>
        <table className="tbl">
          <thead><tr><th>产物</th><th>是什么</th><th>谁用</th></tr></thead>
          <tbody>
            {clarifyOverview.purpose.outputs.map((o, i) => (
              <tr key={i}><td style={{ whiteSpace: 'nowrap' }}><Badge kind="amber">{o.name}</Badge></td><td>{o.what}</td><td>{o.consumer}</td></tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>为什么必须有这一步？</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {clarifyOverview.purpose.value.map((v, i) => (
            <li key={i} style={{ margin: '4px 0' }}>{v}</li>
          ))}
        </ul>

        <SectionTitle>它不管什么？（边界）</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {clarifyOverview.purpose.boundary.map((b, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{b}</li>
          ))}
        </ul>

        <Callout kind="amber">
          <b>一个真实的例子（CLQ-0001）：</b>init 发现规格书写「低功耗电源管理：支持」但没说怎么支持 → clarify 生成问题「触发条件、唤醒源、功耗指标是什么？」→ 答案填上「ACC OFF 5min 休眠、唤醒源 4 种、休眠 ≤3mA」→ 结论写回副本，下游直接引用。
        </Callout>
      </Card>

      <Card title="一个比喻帮你记住">
        <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-2)' }}>{clarifyOverview.analogy}</div>
        <Keyline>
          记住：<Hl>clarify = 把「说不清」变成「说清了」</Hl>，中间唯一的停顿点是等「人」填答案。
        </Keyline>
      </Card>

      <Card title="谁在干活？（三个角色 + 一个「人等」环节）">
        <table className="tbl">
          <thead><tr><th>角色</th><th>是谁</th><th>干什么</th></tr></thead>
          <tbody>
            <tr>
              <td><Badge kind="blue">监考老师</Badge></td>
              <td><code>/yxspec:clarify</code> 命令</td>
              <td>按顺序喊口令：前半段跑完自动停下，等答案填完再喊后半段；每步检查（门控）</td>
            </tr>
            <tr>
              <td><Badge kind="cyan">试卷机</Badge></td>
              <td><code>scan_clarify.py</code> 脚本</td>
              <td>出卷、判分（打标）、收卷、把答案抄回课本 —— 全自动，不会累</td>
            </tr>
            <tr>
              <td><Badge kind="amber">答题人</Badge></td>
              <td>客户 / 合规 / 系统工程师</td>
              <td>填答题模板 —— <b>全流程第一个必须人参与的环节</b>，AI 猜了不算数</td>
            </tr>
            <tr>
              <td><Badge kind="gray">可选：润色师</Badge></td>
              <td>polish worker（sonnet）</td>
              <td>把偏技术术语的问题改成客户能听懂的话 —— 默认不开，只改措辞</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card title="为什么要这样分工？（为什么停下等人、为什么不用 AI 直接答）">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {clarifyOverview.whyShell.map((p, i) => (
            <li key={i} style={{ margin: '5px 0' }}>{p}</li>
          ))}
        </ul>
        <Keyline>
          这一步的 <Hl>AI 协同机制</Hl> 和 init 相反：init 是「AI 找问题」，clarify 是「人给答案，脚本搬运」——AI 只做可选的润色。
        </Keyline>
      </Card>

      <Card title="真实跑一次是什么样？（本仓库 2026-07-28 实跑）">
        <div className="stat-grid" style={{ marginBottom: 10 }}>
          <Stat num={inst.duration} label="两段式共 ~34 分钟" numKind="cyan" desc={inst.durationNote} />
          <Stat num={inst.clqTotal} label="45 条 CLQ" numKind="cyan" desc="由 45 条 AMB 逐条登记而来" />
          <Stat num={inst.blocking} label="26 条 blocking" numKind="amber" desc="必答项：全部闭环才能推进下游" />
          <Stat num={inst.buckets} label="6 个答题批次" numKind="cyan" desc="每桶一张答题卡" />
          <Stat num={inst.answered} label="45 条全答" numKind="green" desc={inst.answeredBy} />
        </div>
        <Keyline>
          记住这 4 个数字：<Hl>45 条、26 必答、6 批、全答完</Hl>。答辩时说「45 条歧义全部澄清，blocking 26 条全部闭环，可继续推进」就是一句话结论。
        </Keyline>
      </Card>

      <Card title="clarify 内部 9 步（点击看细节）">
        <div className="wf-row" style={{ flexWrap: 'wrap' }}>
          {clarifyFlowNodes.map((n, i) => (
            <div key={n.id} className="wf-row" style={{ display: 'contents' }}>
              <div
                className={`wf-node ${n.color} ${selStep !== null && selStep !== n.id ? 'dim' : ''}`}
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
                <div className="wf-icon">{n.icon}</div>
                <div className="wf-cmd">{typeof n.id === 'number' ? `${i}. ${n.name}` : n.name}</div>
                <div className="wf-stage">{n.real}</div>
              </div>
              <div className="wf-arrow">{n.id === 5 ? '⏸ 停 →' : '→'}</div>
            </div>
          ))}
        </div>
        {selStep !== null && (
          <div className="answer" style={{ marginTop: 12 }}>
            <div className="h">{selStep === 'STOP' ? 'STOP · 停下等人填' : `Step ${selStep} · ${clarifyFlowNodes[selStep].name}`}</div>
            <div style={{ fontSize: 13 }}>
              {selStep === 'STOP' ? (
                <span>这里是<Hl>两段式的分界点</Hl>：答题卡发出去，等客户/负责人填完，再重新进入命令跑后半段（<code>--import</code>）。</span>
              ) : (
                <span>真实运行：<Hl>{clarifyFlowNodes[selStep].real}</Hl> —— 点击左侧「9 步执行流程」看完整动作/产物/为什么。</span>
              )}
            </div>
          </div>
        )}
      </Card>

      <Card title="下游产物（谁拿走了什么）">
        <div className="pipe" style={{ gap: 10 }}>
          <span className="seg output">已澄清副本 → 系统需求</span>
          <span className="seg output">决策清单 → 需求分析</span>
          <span className="seg output">澄清日志 → 留档</span>
          <span className="seg output">任务台账 → 证据链</span>
        </div>
        <Keyline>
          和 init 的关系一句话：<Hl>init 找出 45 处「说不清」，clarify 让它们全部「说清了」</Hl>。
        </Keyline>
      </Card>

      <Card title="四条铁律（为什么这么设计）">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          <li><b>到点必须停</b> —— step 5 完成后禁止越过 STOP，等答案才能跑后半段</li>
          <li><b>没答案不许收卷</b> —— 至少一份模板填了 answer 才允许导入</li>
          <li><b>原件永远只读</b> —— 答案只写 parsed/ 副本，raw/ 不动</li>
          <li><b>答案不靠 AI 猜</b> —— 默认 LLM-free，答案必须来自人</li>
        </ul>
      </Card>

      <Tutor question="考官问「clarify 和 init 的 AI 协同有什么不同？」怎么答？">
        init 是「AI 密集」：6 个 AI Worker 找歧义；clarify 是「AI 缺席」：默认 LLM-free，全部脚本确定性处理，唯一等的是人填答案。
        一句话概括：<b>「找问题靠 AI，给答案靠人」</b>——AI 猜需求不算数，这正是「零臆造」的边界。
      </Tutor>
    </div>
  );
}

/* ---------- 1. 9 步执行流程（两段式互动流程图） ---------- */
export function ClarifyFlowView() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      <div className="page-title">
        <h1>执行流程：9 步互动流程图（含一次停下等人）</h1>
        <div className="sub">
          和 init 最大的不同：跑到第 5 步会<b>停下等人填答案</b>（⏸ STOP），填完重新进命令跑后半段。<b>箭头上的标签 = 传给下一步的产物</b>。点击任一步展开看细节。
        </div>
      </div>

      <div className="card">
        {/* 两段标识 */}
        <div className="clarify-phasebar">
          <span className="phase-seg front">前半段 · 全自动（<b>&lt;5 秒</b>）· 出卷</span>
          <span className="phase-seg stop">⏸ 停下等人填答案</span>
          <span className="phase-seg back">后半段 · 全自动（<b>&lt;10 秒</b>）· 收卷写回</span>
        </div>

        <div className="steps">
          {clarifySteps.map((s) => {
            const isOpen = open === s.id;
            const isFront = s.phase === 'front';
            return (
              <div key={s.id} className={`step-row ${s.id === 8 ? 'done' : isFront ? 'active' : ''}`}>
                <div className={`step-node ${isFront ? '' : 'phase-back'}`}>{s.id}</div>
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
                    {!isFront && <Badge kind="blue">后半段（--import）</Badge>}
                    {s.id === 3 && <Badge kind="amber">规则引擎</Badge>}
                    {s.id === 5 && <Badge kind="cyan">出卷完成</Badge>}
                    {s.id === 8 && <Badge kind="green">git commit</Badge>}
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

                {/* 步骤间箭头：5→6 之间是 STOP */}
                {s.id < clarifySteps.length - 1 && (
                  s.id === 5 ? (
                    <div className="step-connector stop">
                      <span className="connector-line stop" />
                      <span className="connector-label">⏸ STOP —— 停下等客户填答案（唯一需要人的环节）</span>
                      <span className="connector-arrow">▼</span>
                    </div>
                  ) : (
                    <div className="step-connector">
                      <span className="connector-line" />
                      <span className="connector-label">{s.edge}</span>
                      <span className="connector-arrow">▼</span>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Tutor question="考官问「半停止编排是什么意思？」怎么答？">
        指流程跑一半会<b>主动停下等人</b>：前半段 5 步全自动（几十秒出卷），然后 STOP 等客户填答案，
        填完重新进入命令（--import 参数）跑后半段 3 步（收卷、写回、收尾）。
        为什么要停？因为答案只有客户知道，AI 猜了不算数——这是「零臆造」在编排上的体现。
      </Tutor>
    </div>
  );
}

/* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
export function ClarifyIoView() {
  return (
    <div>
      <div className="page-title">
        <h1>命令的输入、输出及调用关系</h1>
        <div className="sub">考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / 脚本级。</div>
      </div>

      <Card title="输入（clarify 开始前手里有什么）">
        <table className="tbl">
          <thead><tr><th>输入</th><th>是什么</th></tr></thead>
          <tbody>
            {clarifyIo.inputs.map((it, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}><code>{it.name}</code></td>
                <td>{it.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Keyline>
          最关键输入是 <Hl>amb_index.json</Hl>——init 的交接物，门控第 1 步就检查它存不存在。
        </Keyline>
      </Card>

      <Card title="输出（clarify 跑完会留下什么）">
        <table className="tbl">
          <thead><tr><th>输出</th><th>是什么</th></tr></thead>
          <tbody>
            {clarifyIo.outputs.map((it, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}><code>{it.name}</code></td>
                <td>{it.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Keyline>
          核心输出链：<Hl>索引 → 答题卡 → 答案 → 写回 → 决策清单</Hl>，每步一个文件，全部可追溯。
        </Keyline>
      </Card>

      <Card title="调用关系（谁调谁 · 传什么 · 为什么）">
        {clarifyIo.callGraphs.map((g, i) => (
          <ClarifyCallGraph key={i} graph={g} />
        ))}
        <Keyline>
          两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = 脚本级</Hl>（scan_clarify.py 指挥工具）。点击任意节点看「为什么调它」。
        </Keyline>
      </Card>

      <Card title="管道视图：一条命令的数据流">
        <div className="pipe">
          {clarifyIo.pipeline.map((p, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {i > 0 && <span className="arr">→</span>}
              <span className={`seg ${p.seg}`}>{p.label}</span>
            </span>
          ))}
        </div>
        <Keyline>
          蓝色=脚本 · 绿色=产物 · 琥珀=输入/答题卡 · <Hl>红色=停下等人</Hl>——一眼看清「自动 + 一步等人」。
        </Keyline>
      </Card>

      <Card title="脚本明细">
        <table className="tbl">
          <thead><tr><th>脚本</th><th>干什么</th></tr></thead>
          <tbody>
            {clarifyIo.components.scripts.map((s, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}><code>{s.name}</code>{s.core && <Badge kind="cyan">核心</Badge>}</td>
                <td>{s.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Callout kind="cyan">
          <b>对比 init：</b>init 的核心脚本是 12 个子命令 + 6 个 AI Worker；clarify 的核心脚本是 13 个子命令 + <b>0 个必选 Worker</b>（AI 只在 --polish 可选模式出现）。这就是「AI 找问题，人给答案」。
        </Callout>
      </Card>

      <Card title="门控细则（gate 命令）+ 故障处置">
        <Callout kind="cyan">
          <b>规则：</b>每步先 <code>gate --step N</code>，完成再 <code>--mark-done</code>；rc != 0 立即停。
          特殊点：step 5 完成后<b>必须停下等人</b>，step 6 前需人工确认有答案。
        </Callout>
        <SectionTitle>gate 内部检查表（两段式）</SectionTitle>
        <table className="tbl">
          <thead><tr><th>Step</th><th>名称</th><th>段</th><th>post 检查</th></tr></thead>
          <tbody>
            {clarifyIo.gateTable.map((g) => (
              <tr key={g.step}>
                <td><Badge kind="gray">{g.step}</Badge></td>
                <td><code>{g.name}</code></td>
                <td>{g.phase}</td>
                <td><code>{g.post}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
        <SectionTitle>故障处置表</SectionTitle>
        <table className="tbl">
          <thead><tr><th>故障</th><th>处置</th></tr></thead>
          <tbody>
            {clarifyIo.failures.map((f, i) => (
              <tr key={i}><td><code>{f.fault}</code></td><td>{f.action}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Tutor question="答辩时 clarify 的调用关系怎么讲？">
        「clarify 消费 init 的 <code>amb_index.json</code>（45 条），脚本 <code>scan_clarify.py</code> 走 13 个子命令：
        ingest → priority（规则引擎打标）→ gen-template（出 6 张答题卡）→ 停下等人 → import-answers → apply-back（写回 parsed/ 副本）
        → export-decisions → gen-log。产出决策清单给下游需求分析当强制约束。」
      </Tutor>
    </div>
  );
}

/* ---------- 3. 产物实例 ---------- */
export function ClarifyArtifactsView() {
  const [sel, setSel] = useState(null);

  return (
    <div>
      <div className="page-title">
        <h1>产物实例（本仓库真实文件）</h1>
        <div className="sub">clarify 跑完会留下什么、它有什么用、谁会用 —— 都在这。产物文件都在工程里真实存在。</div>
      </div>

      <Card title="7 个产物：是什么 · 有什么用 · 谁用">
        <table className="tbl">
          <thead><tr><th>产物</th><th>内容要点</th><th>有什么用（谁用）</th></tr></thead>
          <tbody>
            {clarifyArtifacts.map((a, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}><Badge kind={a.kind}>{a.name}</Badge></td>
                <td>{a.what}</td>
                <td>{a.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Keyline>
          一句话串起来：<Hl>登记</Hl>（clq_index）→ <Hl>出卷</Hl>（batches）→ <Hl>人答卷</Hl>（填模板）→ <Hl>抄回课本</Hl>（parsed 写回）→ <Hl>决策清单</Hl>（下游约束）→ <Hl>留档</Hl>（日志 + 台账）。
        </Keyline>
      </Card>

      <Card title="CLQ 真实样例（点开看问答详情）">
        <div className="clq-grid">
          {clqSamples.map((c) => {
            const open = sel === c.id;
            return (
              <div key={c.id} className={`clq-card ${open ? 'selected' : ''}`} onClick={() => setSel(open ? null : c.id)} role="button" tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(open ? null : c.id); } }}>
                <div className="clq-head">
                  <span className="clq-title">{c.id}</span>
                  <Badge kind="amber">{c.severity}</Badge>
                  <span className="muted">{c.audience}</span>
                </div>
                <div className="clq-q">{c.question}</div>
                {open && (
                  <div className="clq-body">
                    <div className="clq-answer"><b>答案：</b>{c.answer}</div>
                    <div className="clq-meta">
                      <span><Badge kind="gray">confidence: {c.confidence}</Badge></span>
                      <span className="muted">追溯 {c.fromAmb}</span>
                    </div>
                    <div className="clq-note muted">※ {c.note}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Callout kind="amber">
          <b>看清这条链路：</b>AMB-001（init 找的歧义）→ CLQ-0001（clarify 出的题）→ 答案（人/源文档填）→ 写回副本。下游 sys-elicitation 抽需求时直接引用这条结论，不用再猜。
        </Callout>
      </Card>

      <Card title="答题模板长什么样（发出去的试卷）">
        <div className="batch-demo">
          <div className="batch-head"># CLQ 答题模板 — INIT-W01（12 条）</div>
          <div className="batch-rule">
            <b>填写约定：</b>
            <code>answer:</code> 留空 = 接受默认推荐 · <code>answer: &lt;文字&gt;</code> = 自定义答案 · <code>skip</code> = 跳过 · <code>deferred</code> = 推迟
          </div>
          <div className="batch-item">
            <span className="batch-clq">## CLQ-0001</span> <Badge kind="amber">blocking</Badge> <Badge kind="gray">incomplete</Badge>
            <div className="muted">来源：01产品需求规格书/…C25_4G智能中控产品规格书_V1.0.md (L70 表 4.1 第 5 行)</div>
            <div className="batch-q">问题：低功耗电源管理的触发条件、唤醒源及各级功耗指标分别是什么？</div>
            <div className="batch-answer"><b>answer:</b> 休眠进入=ACC OFF 且无上报任务持续 5min；唤醒源=…；功耗：休眠≤3mA…</div>
          </div>
          <Keyline>
            答题人只需改 <Hl>answer: 那一行</Hl>（或留空接受推荐），填完交给流程导入——这就是「人参与」的全部动作。
          </Keyline>
        </div>
      </Card>
    </div>
  );
}

/* ---------- 4. 机制（对照 init 的三大机制） ---------- */
export function ClarifyMechanismsView() {
  return (
    <div>
      <div className="page-title">
        <h1>门控 · 追溯 · AI 协同（clarify 版）</h1>
        <div className="sub">同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。</div>
      </div>

      <Card title="机制总览（与 init 对照）">
        <table className="tbl">
          <thead><tr><th>机制</th><th>init 怎么表现</th><th>clarify 怎么表现</th></tr></thead>
          <tbody>
            <tr>
              <td><Badge kind="cyan">门控</Badge></td>
              <td>9 步单段式：每步先 gate 后 mark-done</td>
              <td>9 步<b>两段式</b>：0-5 前半段 → ⏸ 强制停 → 6-8 后半段；step 6 额外检查「有没有人填了答案」</td>
            </tr>
            <tr>
              <td><Badge kind="green">追溯</Badge></td>
              <td>产物 derived_from 原始文档；AMB 有行号定位</td>
              <td>每条 CLQ <b>derived_from 对应 AMB</b>（如 CLQ-0001 ← AMB-001）；答案写回副本留 [CLARIFIED: CLQ-xxxx] 标记</td>
            </tr>
            <tr>
              <td><Badge kind="blue">AI 协同</Badge></td>
              <td>AI 密集：6 个 Worker 找歧义</td>
              <td><b>AI 缺席（LLM-free）</b>：脚本全确定；唯一"智能"是规则引擎；AI 只在可选 --polish 润色</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card title="半停止编排：为什么「停」反而更重要？">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          <li><b>答案只在人手里</b> —— 客户知道产品意图，AI 只能猜；猜错会污染整条需求链</li>
          <li><b>零臆造的边界</b> —— init 的「零臆造」是 AMB 必须有行号；clarify 的「零臆造」是答案必须来自人</li>
          <li><b>异步不阻塞</b> —— 人等答案的时间，别的事照做（比如准备下游分析）；答案一到，几十秒跑完后半段</li>
          <li><b>可多轮循环</b> —— 答得不全可以再发一批再答，直到 blocking 全闭环</li>
        </ul>
        <Callout kind="green">
          <b>一句话：</b>半停止 = <Hl>「机器能做的全自动，机器做不了的停下来等」</Hl>——这正是 ASPICE「人在回路」在 AI 流程里的落地。
        </Callout>
      </Card>

      <Card title="追溯细节：CLQ 怎么连成链">
        <div className="pipe" style={{ gap: 10 }}>
          <span className="seg cmd">AMB-001</span>
          <span className="arr">→</span>
          <span className="seg output">CLQ-0001</span>
          <span className="arr">→</span>
          <span className="seg output">答案</span>
          <span className="arr">→</span>
          <span className="seg output">[CLARIFIED: CLQ-0001]</span>
          <span className="arr">→</span>
          <span className="seg cmd">下游 SR</span>
        </div>
        <Keyline>
          上游 <Hl>AMB</Hl>（init 找）→ <Hl>CLQ</Hl>（clarify 问）→ <Hl>答案</Hl>（人答）→ <Hl>写回标记</Hl>（副本）→ <Hl>系统需求</Hl>（下游引用）。这条链每一步都能对上号。
        </Keyline>
      </Card>

      <Card title="task_clarify.md 的任务行（真实）">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>id</th><th>名称</th><th>动作</th><th>状态</th></tr></thead>
            <tbody>
              <tr><td><code>CLARIFY-GATE</code></td><td>Gate Check</td><td>校验 amb_index.json 存在</td><td><Badge kind="green">done</Badge></td></tr>
              <tr><td><code>CLARIFY-INGEST</code></td><td>导入 AMB</td><td>amb_index → clq_index，分配 CLQ-NNNN</td><td><Badge kind="green">done</Badge></td></tr>
              <tr><td><code>CLARIFY-PRIORITY</code></td><td>优先级打标</td><td>规则引擎判定 severity+audience</td><td><Badge kind="green">done</Badge></td></tr>
              <tr><td><code>CLARIFY-TEMPLATE</code></td><td>生成答题模板</td><td>N 份 clq-batch + 1 份 clq-index</td><td><Badge kind="green">done</Badge></td></tr>
              <tr><td><code>CLARIFY-IMPORT</code></td><td>导入答案</td><td>解析 batches/ 下所有 clq-batch</td><td><Badge kind="green">done</Badge></td></tr>
              <tr><td><code>CLARIFY-APPLY</code></td><td>写回副本</td><td>AMB 行替换为 [CLARIFIED: CLQ-xxxx]</td><td><Badge kind="green">done</Badge></td></tr>
              <tr><td><code>CLARIFY-LOG</code></td><td>生成 clarify-log</td><td>按模板填充最终日志</td><td><Badge kind="green">done</Badge></td></tr>
            </tbody>
          </table>
        </div>
        <Keyline>
          8 条任务全部 done —— 这就是「追溯 = 证据链」：答辩时指着一行行讲，比讲概念有说服力。
        </Keyline>
      </Card>
    </div>
  );
}
