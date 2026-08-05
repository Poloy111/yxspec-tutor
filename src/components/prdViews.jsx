import { useState } from 'react';
import { prdOverview, prdSteps, prdIo } from '../data/prdData';
import { Badge, Stat, Card, Callout, Tutor, SectionTitle } from './ui';
import { Hl, Keyline, ClarifyCallGraph } from './shared';

/* ============================================================
 * /yxspec:prd-analysis 章节视图（SYS.1 产品需求分析）
 * ============================================================ */

export function PrdOverviewView() {
  const inst = prdOverview.instance;
  const [selStep, setSelStep] = useState(null);

  return (
    <div>
      <div className="page-title">
        <h1>命令总览</h1>
        <div className="sub">{prdOverview.oneLiner}</div>
      </div>

      <Card title="这一阶段到底在干嘛？">
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <b style={{ color: 'var(--blue)' }}>{prdOverview.purpose.oneLiner}</b>
        </div>

        <SectionTitle sub={prdOverview.purpose.input.note}>输入：4 类（都是前两步的产出）</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {prdOverview.purpose.input.items.map((it, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{it}</li>
          ))}
        </ul>

        <SectionTitle>加工：5 步，全自动 + 1 次人工签署</SectionTitle>
        {prdOverview.purpose.process.map((p, i) => (
          <div key={i} style={{ fontSize: 13.5, padding: '4px 0' }}>{p}</div>
        ))}

        <SectionTitle>产出：3 样（下游全靠它们）</SectionTitle>
        <table className="tbl">
          <thead><tr><th>产物</th><th>是什么</th><th>谁用</th></tr></thead>
          <tbody>
            {prdOverview.purpose.outputs.map((o, i) => (
              <tr key={i}><td style={{ whiteSpace: 'nowrap' }}><Badge kind="amber">{o.name}</Badge></td><td>{o.what}</td><td>{o.consumer}</td></tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>为什么必须有这一步？</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {prdOverview.purpose.value.map((v, i) => (
            <li key={i} style={{ margin: '4px 0' }}>{v}</li>
          ))}
        </ul>

        <SectionTitle>它不管什么？（边界）</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {prdOverview.purpose.boundary.map((b, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{b}</li>
          ))}
        </ul>

        <Callout kind="amber">
          <b>一个真实的例子：</b>规格书里「支持远程控车」一句话 → PRD 抽成一条编号需求 <code>REQ-F-0000xx</code>「系统应支持通过平台下发上电/熄火/寻车/设防/撤防指令」+ 派生非功能需求（响应时间、可靠性）。
        </Callout>
      </Card>

      <Card title="一个比喻帮你记住">
        <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-2)' }}>{prdOverview.analogy}</div>
        <Keyline>
          记住：<Hl>prd-analysis = 把「客户的话」变成「工程化的需求」</Hl>—— 373 条编号需求，全流程第一条正式规格书。
        </Keyline>
      </Card>

      <Card title="谁在干活？（命令 / Agent / 脚本）">
        <table className="tbl">
          <thead><tr><th>角色</th><th>是谁</th><th>干什么</th></tr></thead>
          <tbody>
            <tr>
              <td><Badge kind="blue">总导演</Badge></td>
              <td><code>/yxspec:prd-analysis</code> 命令</td>
              <td>按顺序推进 5 个 Phase，每步读质量门结果判定继续/重试/停止</td>
            </tr>
            <tr>
              <td><Badge kind="cyan">编剧组</Badge></td>
              <td>Plan / Extract×7 / Merge / Generate×3 四个 Agent</td>
              <td>规划锚点、分段抽需求、合并去重、分区写 PRD 正文</td>
            </tr>
            <tr>
              <td><Badge kind="amber">质检员</Badge></td>
              <td>Review Agent + prd_verify.py 脚本</td>
              <td>AI 审（RQ-1~7）+ 脚本校验（EQ/MQ/GQ 门）+ 人工签署</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card title="为什么要这样分工？（为什么 5 个 Phase）">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {prdOverview.whyShell.map((p, i) => (
            <li key={i} style={{ margin: '5px 0' }}>{p}</li>
          ))}
        </ul>
        <Keyline>
          记住 <Hl>EQ → MQ → GQ → RQ 四道质量门</Hl>——每一步产物独立校验，问题在哪一步产生就在哪一步修。
        </Keyline>
      </Card>

      <Card title="真实跑一次是什么样？（本仓库 2026-07-28 实跑）">
        <div className="stat-grid" style={{ marginBottom: 10 }}>
          <Stat num={inst.duration} label="总耗时 6h 29m" numKind="cyan" desc="5 个 Phase + 2 轮审查" />
          <Stat num={inst.totalReqs} label="373 条需求" numKind="cyan" desc="功能 219 + 非功能 154" />
          <Stat num={inst.phases} label="5 个 Phase" numKind="cyan" desc="Plan/Extract/Merge/Generate/Review" />
          <Stat num={inst.passRate} label="需求通过率" numKind="green" desc="373/373 = 100%" />
          <Stat num={inst.gqVerdict} label="质量门 GREEN" numKind="green" desc="gq5 得分 82.5" />
        </div>
        <Keyline>
          记住这 4 个数字：<Hl>6.5 小时、373 条、5 个 Phase、100% 通过</Hl>。答辩时说「373 条需求全过四道质量门，审查 conditional→approved 双签放行」。
        </Keyline>
      </Card>

      <Card title="prd 内部 10 步（点击看细节）">
        <div className="wf-row" style={{ flexWrap: 'wrap' }}>
          {prdSteps.map((n, i) => (
            <div key={n.id} className="wf-row" style={{ display: 'contents' }}>
              <div
                className={`wf-node ${n.id < 4 ? 'blue' : n.id < 8 ? 'cyan' : n.id === 8 ? 'amber' : 'green'} ${selStep !== null && selStep !== n.id ? 'dim' : ''}`}
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
                <div className="wf-icon">{i < 4 ? '⚙️' : i === 8 ? '🔍' : '🤖'}</div>
                <div className="wf-cmd">{i}. {n.label}</div>
                <div className="wf-stage">{n.post.split('（')[0].split('：')[0]}</div>
              </div>
              <div className="wf-arrow">→</div>
            </div>
          ))}
        </div>
        {selStep !== null && (
          <div className="answer" style={{ marginTop: 12 }}>
            <div className="h">Step {selStep} · {prdSteps[selStep].label}</div>
            <div style={{ fontSize: 13 }}>
              <b>在干什么：</b>{prdSteps[selStep].action}
              <br />
              <b>完成后要有：</b>{prdSteps[selStep].post} —— <b>为什么：</b>{prdSteps[selStep].why}
            </div>
          </div>
        )}
      </Card>

      <Card title="下游产物（谁拿走了什么）">
        <div className="pipe" style={{ gap: 10 }}>
          <span className="seg output">PRD 规格书 → sys-analysis</span>
          <span className="seg output">审查报告 → 质量证据</span>
          <span className="seg output">任务台账 → 证据链</span>
        </div>
        <Keyline>
          一句话：<Hl>PRD 是「需求的源头」</Hl>—— 后面每条系统需求/软件需求都 derived_from 它。
        </Keyline>
      </Card>

      <Card title="五条铁律（为什么这么设计）">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          <li><b>上游不齐不开工</b> —— gate 校验 parse-summary / parsed/ / 无 blocking CLQ</li>
          <li><b>每 Phase 独立门控</b> —— EQ/MQ/GQ 每步校验，retry ≤3 轮，超过升级人工</li>
          <li><b>质量门四连</b> —— EQ → MQ → GQ → RQ 全链通过才算完</li>
          <li><b>AI 审完必须人签</b> —— PRD 是源头，驳回就回对应 Phase 修</li>
          <li><b>不编造</b> —— 每条需求必须 derived_from 上游文档</li>
        </ul>
      </Card>

      <Tutor question="考官问「PRD 的四道质量门是什么？」怎么答？">
        <b>EQ</b>（抽取：WQ-1~5 来源可溯无编造）→ <b>MQ</b>（合并：去重保留率）→ <b>GQ</b>（生成：gq5 得分 82.5 / gq8 保真 / gq11 覆盖）→ <b>RQ</b>（审查：RQ-1~7 逐项）。
        每道门由脚本校验 + Agent 自检，任一不过就回退对应 Phase，重试 ≤3 轮，超过升级人工。这就是「质量门控」机制在 SYS.1 的落地。
      </Tutor>
    </div>
  );
}

export function PrdFlowView() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      <div className="page-title">
        <h1>执行流程：10 步互动流程图</h1>
        <div className="sub">
          从上到下是真实执行顺序，<b>箭头上的标签 = 传给下一步的产物</b>。点击任一步展开看细节。
        </div>
      </div>

      <div className="card">
        <div className="steps">
          {prdSteps.map((s) => {
            const isOpen = open === s.id;
            return (
              <div key={s.id} className={`step-row ${s.id >= 8 ? 'done' : 'active'}`}>
                <div className="step-node">{s.id}</div>
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
                    {s.id === 4 && <Badge kind="cyan">单 Worker</Badge>}
                    {s.id === 5 && <Badge kind="cyan">并发 ×7</Badge>}
                    {s.id === 7 && <Badge kind="cyan">并发 ×3</Badge>}
                    {s.id === 8 && <Badge kind="amber">人工签署</Badge>}
                    {s.id === 9 && <Badge kind="green">git commit</Badge>}
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
                {s.id < prdSteps.length - 1 && (
                  <div className="step-connector">
                    <span className="connector-line" />
                    <span className="connector-label">{s.edge}</span>
                    <span className="connector-arrow">▼</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Tutor question="考官问「为什么 PRD 要 5 个 Phase 而不是一个 AI 全干？」怎么答？">
        原因和 init 一样是「上下文装不下」：373 条需求 + 上游文档量巨大，一个 AI 全程会崩。
        所以拆成 5 个 Phase：<b>规划 → 抽取（并发 7）→ 合并 → 生成（并发 3）→ 审查</b>，
        每 Phase 独立校验（EQ/MQ/GQ/RQ），问题在哪一步就在哪一步修。这就是「AI 协同」在 SYS.1 的形态。
      </Tutor>
    </div>
  );
}

export function PrdIoView() {
  return (
    <div>
      <div className="page-title">
        <h1>命令的输入、输出及调用关系</h1>
        <div className="sub">考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。</div>
      </div>

      <Card title="输入（prd-analysis 开始前手里有什么）">
        <table className="tbl">
          <thead><tr><th>输入</th><th>是什么</th></tr></thead>
          <tbody>
            {prdIo.inputs.map((it, i) => (
              <tr key={i}><td style={{ whiteSpace: 'nowrap' }}><code>{it.name}</code></td><td>{it.role}</td></tr>
            ))}
          </tbody>
        </table>
        <Keyline>
          最关键输入是 <Hl>澄清矩阵（无 blocking）</Hl>——blocking 没清完，PRD 不能开工。
        </Keyline>
      </Card>

      <Card title="输出（prd-analysis 跑完会留下什么）">
        <table className="tbl">
          <thead><tr><th>输出</th><th>是什么</th></tr></thead>
          <tbody>
            {prdIo.outputs.map((it, i) => (
              <tr key={i}><td style={{ whiteSpace: 'nowrap' }}><code>{it.name}</code></td><td>{it.role}</td></tr>
            ))}
          </tbody>
        </table>
        <Keyline>
          核心输出链：<Hl>锚点 → 抽取稿 → 合并稿 → PRD → 审查报告</Hl>，一步一个文件，全部可追溯。
        </Keyline>
      </Card>

      <Card title="调用关系（谁调谁 · 传什么 · 为什么）">
        {prdIo.callGraphs.map((g, i) => (
          <ClarifyCallGraph key={i} graph={g} />
        ))}
        <Keyline>
          两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（5 个 Phase 谁在干活）。点击任意节点看「为什么调它」。
        </Keyline>
      </Card>

      <Card title="管道视图：一条命令的数据流">
        <div className="pipe">
          {prdIo.pipeline.map((p, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {i > 0 && <span className="arr">→</span>}
              <span className={`seg ${p.seg}`}>{p.label}</span>
            </span>
          ))}
        </div>
        <Keyline>
          蓝色=脚本 · 琥珀=Worker（AI）· 绿色=产物——一眼看清「脚本门控 + AI 干活」的分工。
        </Keyline>
      </Card>

      <Card title="质量门明细（EQ/MQ/GQ/RQ 四连）">
        <table className="tbl">
          <thead><tr><th>门</th><th>名称</th><th>所在 Phase</th><th>检查什么</th><th>真实结果</th></tr></thead>
          <tbody>
            {prdIo.qualityGates.map((q, i) => (
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
        <Callout kind="cyan">
          <b>对比 init/clarify：</b>init 是「每步 gate 一次」，PRD 是「每 Phase 一个独立质量门 + retry ≤3 轮」——粒度更大，但每道门都是多规则复合检查。这是从「单命令校验」到「流水线质量体系」的升级。
        </Callout>
      </Card>

      <Card title="故障处置表">
        <table className="tbl">
          <thead><tr><th>故障</th><th>处置</th></tr></thead>
          <tbody>
            {prdIo.failures.map((f, i) => (
              <tr key={i}><td><code>{f.fault}</code></td><td>{f.action}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Tutor question="答辩时 prd-analysis 的调用关系怎么讲？">
        「prd-analysis 消费 clarify 的澄清矩阵 + parsed/ 副本，命令推进 5 个 Phase：Plan（1 个）→ Extract（并发 7）→ Merge → Generate（并发 3）→ Review（pre+post 双模式）。
        每 Phase 由 prd_verify.py 门控 + Agent 自检，EQ/MQ/GQ/RQ 四连全过 + 人工签署，产出 prd-*.md 给下游 sys-analysis。」
      </Tutor>
    </div>
  );
}
