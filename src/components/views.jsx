import { useState } from 'react';
import {
  initOverview, steps, io, components, ambSamples, gating, mechanisms,
  defensePoints, examMapping, initFlowNodes,
} from '../data/yxspecData';
import { Badge, Stat, Card, Callout, Tutor, Answer, SectionTitle } from './ui';
import { Hl, Keyline } from './shared';
import WorkflowGraph from './WorkflowGraph';

/* ============================================================
 * A. 流程总览视图（一张关系图 — 基于真实执行记录）
 * ============================================================ */
export function DirectoryView() {
  return (
    <div>
      <div className="page-title">
        <h1>一张图看懂所有流程与依赖</h1>
        <div className="sub">
          节点 = 命令，<b>连线 = 真实依赖关系</b>（实线=实际执行，虚线=支撑）。数据来自
          git log + task 会话 + specs 产物 + 评审汇报。点击节点高亮其上下游；各节点内部细节在对应章节查看。
        </div>
      </div>

      <Card>
        <WorkflowGraph />
      </Card>
    </div>
  );
}

/* ============================================================
 * 0. 命令总览（含真实运行实例 + init 内部 9 步 + 翻转统计卡）
 * ============================================================ */
export function CommandOverviewView() {
  const inst = initOverview.instance;
  const [selStep, setSelStep] = useState(null);

  return (
    <div>
      <div className="page-title">
        <h1>命令总览</h1>
        <div className="sub">{initOverview.oneLiner}</div>
      </div>

      <Card title="这一阶段到底在干嘛？">
        <div style={{ fontSize: 14, lineHeight: 1.7 }}>
          <b style={{ color: 'var(--blue)' }}>{initOverview.purpose.oneLiner}</b>
        </div>

        <SectionTitle sub={initOverview.purpose.input.note}>输入：上游甩来的 {inst.rawFiles} 份原始文档（4 类）</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {initOverview.purpose.input.items.map((it, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{it}</li>
          ))}
        </ul>

        <SectionTitle>加工：4 步，全部自动</SectionTitle>
        {initOverview.purpose.process.map((p, i) => (
          <div key={i} style={{ fontSize: 13.5, padding: '4px 0' }}>{p}</div>
        ))}

        <SectionTitle>产出：3 样（后面阶段全靠它们）</SectionTitle>
        <table className="tbl">
          <thead><tr><th>产物</th><th>是什么</th><th>谁用</th></tr></thead>
          <tbody>
            {initOverview.purpose.outputs.map((o, i) => (
              <tr key={i}><td style={{ whiteSpace: 'nowrap' }}><Badge kind="amber">{o.name}</Badge></td><td>{o.what}</td><td>{o.consumer}</td></tr>
            ))}
          </tbody>
        </table>

        <SectionTitle>为什么必须有这一步？</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {initOverview.purpose.value.map((v, i) => (
            <li key={i} style={{ margin: '4px 0' }}>{v}</li>
          ))}
        </ul>

        <SectionTitle>它不管什么？（边界）</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {initOverview.purpose.boundary.map((b, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{b}</li>
          ))}
        </ul>

        <Callout kind="amber">
          <b>一个真实的例子（AMB-001）：</b>规格书第 4.1 节写「低功耗电源管理：支持」，但没写怎么支持 —— AI 标成 <code>AMB-001</code>。下游 clarify 就要去问客户：低功耗模式是什么？怎么唤醒？要不要测试？
        </Callout>
      </Card>

      <Card title="一个比喻帮你记住">
        <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-2)' }}>{initOverview.analogy}</div>
        <Keyline>
          记住：<Hl>init = 把原始文档变成「干净 + 已知疑点」的输入</Hl>，后续每个阶段都从它开始。
        </Keyline>
      </Card>

      <Card title="谁在干活？（三个角色）">
        <table className="tbl">
          <thead><tr><th>角色</th><th>是谁</th><th>干什么</th></tr></thead>
          <tbody>
            <tr>
              <td><Badge kind="blue">监工</Badge></td>
              <td><code>/yxspec:init</code> 命令</td>
              <td>按顺序喊口令：先扫描、再分桶、再派工人……每步做完检查一下（门控），不对就停</td>
            </tr>
            <tr>
              <td><Badge kind="cyan">工人</Badge></td>
              <td><code>scan_init.py</code> 脚本</td>
              <td>干体力活：扫描文件、算哈希、分桶、复制副本、合并编号、写摘要 —— 全自动，不会累</td>
            </tr>
            <tr>
              <td><Badge kind="amber">质检员</Badge></td>
              <td>AI Worker（native/convert）</td>
              <td>读文档找毛病：哪句话说得含糊、哪个功能没写全，记成一条条歧义（AMB）</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card title="为什么要这样分工？（为什么不是一个人全干）">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {initOverview.whyShell.map((p, i) => (
            <li key={i} style={{ margin: '5px 0' }}>{p}</li>
          ))}
        </ul>
        <Keyline>
          这个「监工 - 工人 - 质检员」的分工，就是考核要讲的 <Hl>AI 协同机制</Hl>。
        </Keyline>
      </Card>

      <Card title="真实跑一次是什么样？（本仓库 2026-07-28 实跑）">
        <div className="stat-grid" style={{ marginBottom: 10 }}>
          <Stat num={inst.duration} label="总耗时 7m19s" numKind="cyan" desc="从按下 init 到全部完成" />
          <Stat num={inst.rawFiles} label="16 个原始文件" numKind="cyan" desc="要解析的文档总数（13 份文档 + 3 张图片）" />
          <Stat num={inst.buckets} label="7 个桶" numKind="cyan" desc="文件被分成 7 组（6 组 AI 读 + 1 组附件）" />
          <Stat num={inst.ambTotal} label="45 条歧义" numKind="amber" desc="AI 找到 45 处「说得不清楚」的地方，等下游 clarify 澄清" />
          <Stat num={inst.result} label="结果 ok" numKind="green" desc="全部 9 步检查通过，正常收尾" />
        </div>
        <Keyline>
          记住这 4 个数字就够：<Hl>7 分钟、16 份文档、7 组、45 处歧义</Hl> —— 它们分别对应「做了多久、处理了啥、怎么分组的、找出了什么」，答辩时就是你的记忆锚。
        </Keyline>
      </Card>

      <Card title="init 内部 9 步（点击看细节）">
        <div className="wf-row">
          {initFlowNodes.map((n, i) => (
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
                <div className="wf-cmd">{i}. {n.name}</div>
                <div className="wf-stage">{n.real}</div>
              </div>
              {i < initFlowNodes.length - 1 && <div className="wf-arrow">→</div>}
            </div>
          ))}
        </div>
        {selStep !== null && (
          <div className="answer" style={{ marginTop: 12 }}>
            <div className="h">Step {selStep} · {initFlowNodes[selStep].name}</div>
            <div style={{ fontSize: 13 }}>
              真实运行：<Hl>{initFlowNodes[selStep].real}</Hl> —— 点击左侧「9 步执行流程」看完整 pre/post/命令细节。
            </div>
          </div>
        )}
      </Card>

      <Card title="下游产物（4 样，都是真文件）">
        <div className="pipe" style={{ gap: 10 }}>
          <span className="seg output">解析副本 parsed/</span>
          <span className="seg output">解析摘要 parse-summary.md</span>
          <span className="seg output">文件清单 manifest.json</span>
          <span className="seg output">任务台账 task_init.md</span>
        </div>
        <Keyline>
          完整产物清单与用途见「产物实例」章节；这里记住：<Hl>4 样东西分别给谁用</Hl>——副本给下游、摘要给人看、清单给机器比对、台账给门控和答辩。
        </Keyline>
      </Card>

      <Card title="三条铁律（为什么这么设计）">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          <li><b>原件永远只读</b> —— 原始文档绝不修改，只动副本，出问题随时能还原</li>
          <li><b>不编造</b> —— 每条歧义必须指出"哪份文档哪一行"，不能凭空想象</li>
          <li><b>可断点续传</b> —— 跑一半断了，下次接着跑，做过的步骤不重复</li>
        </ul>
      </Card>

      <Tutor question="为什么是「分工」而不是一个 AI 全干？">
        早期版本是一个 AI 同时干扫描、复制、找歧义、写总结，文档一多（几百份）AI 一次装不下就直接崩。
        后来改成<b>分工</b>：确定性的事（扫描、复制、编号）交给脚本，AI 只做它擅长的（找歧义）。
        这个「脚本干体力活、AI 干智力活」的分工，就是考核要讲的 <b>AI 协同机制</b>。
      </Tutor>
    </div>
  );
}

/* ============================================================
 * 1. 执行流程（9 步互动流程图）
 * ============================================================ */
export function FlowView() {
  const [open, setOpen] = useState(0); // 展开的步骤

  return (
    <div>
      <div className="page-title">
        <h1>执行流程：9 步互动流程图</h1>
        <div className="sub">
          从上到下是真实执行顺序，<b>箭头上的标签 = 这步传给下一步的产物</b>。点击任一步展开看该步在干什么。
        </div>
      </div>

      <div className="card">
        <div className="steps">
          {steps.map((s) => {
            const isOpen = open === s.id;
            return (
              <div key={s.id} className={`step-row ${s.id === 8 ? 'done' : s.id === 0 ? 'active' : ''}`}>
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
                    {s.id === 8 && <Badge kind="green">git commit</Badge>}
                    {s.id === 6 && <Badge kind="cyan">并发派发</Badge>}
                    {s.id === 3 && <Badge kind="amber">模式判定</Badge>}
                  </div>
                  <div className="step-desc">{s.action}</div>

                  {/* 传给下一步的产物（箭头标签） */}
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
                {/* 步骤间箭头（产物流转） */}
                {s.id < steps.length - 1 && (
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

      <Tutor question="怎么向考官讲这 9 步？">
        不要背步骤，讲<b>三个机制</b>：① 门控（每步先检查后标记，防跳步）；② 追溯（每步有记录、有时间戳，证据可查）；
        ③ AI 协同（脚本干确定活、Worker 干识别活、命令调度）。指着真实 task_init.md 的任务行讲更有说服力。
      </Tutor>
    </div>
  );
}

/* ============================================================
 * 2. 输入 / 输出 / 调用关系
 * ============================================================ */
function CallGraph({ graph }) {
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

export function IoView() {
  return (
    <div>
      <div className="page-title">
        <h1>命令的输入、输出及调用关系</h1>
        <div className="sub">考核①明确要求：通过 AI 辅助分析每个 Command 的输入、输出及调用关系。下方调用图分三层：命令 / 脚本 / Worker。</div>
      </div>

      <Card title="输入（init 开始前手里有什么）">
        <table className="tbl">
          <thead><tr><th>输入</th><th>是什么</th></tr></thead>
          <tbody>
            {io.inputs.map((it, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}><code>{it.name}</code></td>
                <td>{it.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Keyline>
          最关键输入是 <Hl>raw/（只读）</Hl>——全流程它永不被修改，这是「零臆造 + 溯源」的根基。
        </Keyline>
      </Card>

      <Card title="输出（init 跑完会留下什么）">
        <table className="tbl">
          <thead><tr><th>输出</th><th>是什么</th></tr></thead>
          <tbody>
            {io.outputs.map((it, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}><code>{it.name}</code></td>
                <td>{it.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Keyline>
          核心输出链：<Hl>清单 → 分组 → 副本 → 各桶歧义 → 总歧义清单 → 摘要</Hl>，一步一个文件，全部可追溯。
        </Keyline>
      </Card>

      <Card title="调用关系（谁调谁 · 传什么 · 为什么）">
        {io.callGraphs.map((g, i) => (
          <CallGraph key={i} graph={g} />
        ))}
        <Keyline>
          三种颜色：<Hl>青 = 命令级</Hl>（init 完成后建议下游）· <Hl>深蓝 = 脚本级</Hl>（scan_init.py 指挥工具模块）· <Hl>琥珀 = Worker 级</Hl>（编排器派 AI 质检员）。点击任意节点看「为什么调它」。
        </Keyline>
      </Card>

      <Card title="管道视图：一条命令的数据流">
        <div className="pipe">
          <span className="seg cmd">/yxspec:init</span>
          <span className="arr">→</span>
          <span className="seg script">manifest</span>
          <span className="arr">→</span>
          <span className="seg output">manifest.json</span>
          <span className="arr">→</span>
          <span className="seg script">resume</span>
          <span className="arr">→</span>
          <span className="seg script">plan</span>
          <span className="arr">→</span>
          <span className="seg output">bucket_plan.json</span>
          <span className="arr">→</span>
          <span className="seg script">copy-native</span>
          <span className="arr">→</span>
          <span className="seg output">parsed/</span>
          <span className="arr">→</span>
          <span className="seg script">brief × N</span>
          <span className="arr">→</span>
          <span className="seg worker">worker × N</span>
          <span className="arr">→</span>
          <span className="seg output">bucket_ambiguity_*.json</span>
          <span className="arr">→</span>
          <span className="seg script">merge-amb</span>
          <span className="arr">→</span>
          <span className="seg output">amb_index.json</span>
          <span className="arr">→</span>
          <span className="seg script">gen-summary</span>
          <span className="arr">→</span>
          <span className="seg output">parse-summary.md</span>
        </div>
        <Keyline>
          蓝色=脚本（确定性）· 琥珀=Worker（智能识别）· 绿色=产物（JSON/MD）——一眼看清三权分立。
        </Keyline>
      </Card>

      <Card title="脚本 / Worker 明细">
        <SectionTitle>Python 脚本（干体力活）</SectionTitle>
        <table className="tbl">
          <thead><tr><th>脚本</th><th>干什么</th></tr></thead>
          <tbody>
            {components.scripts.map((s, i) => (
              <tr key={i}>
                <td><code>{s.name}</code>{s.core && <Badge kind="cyan" >核心</Badge>}</td>
                <td>{s.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <SectionTitle>AI Worker（找歧义）</SectionTitle>
        <table className="tbl">
          <thead><tr><th>Worker</th><th>模型</th><th>职责</th></tr></thead>
          <tbody>
            {components.workers.map((w, i) => (
              <tr key={i}><td><code>{w.name}</code></td><td><Badge kind="cyan">{w.model}</Badge></td><td>{w.role}</td></tr>
            ))}
          </tbody>
        </table>
        <Callout kind="amber" >
          <b>Retry 策略：</b>失败 → 同模型 retry 1 次 → 仍失败 → session=gate_failed，人工介入。
        </Callout>
      </Card>

      <Tutor question="答辩时调用关系怎么讲？">
        「init 调用链是：命令薄壳 → <code>scan_init.py</code> 的 <Hl>12 个子命令</Hl>（9 个流程核心 + scan-xrefs/gen-scope/incremental-prep 辅助）→ 6 个 <code>yxspec-init-native-worker</code> → 产物 JSON → merge 出 <code>amb_index.json</code> → 下游 <code>/yxspec:clarify</code> 消费它。脚本干确定活、Worker 干识别活。」
      </Tutor>
    </div>
  );
}

/* ============================================================
 * 3. 产物实例
 * ============================================================ */
export function ArtifactsView() {
  return (
    <div>
      <div className="page-title">
        <h1>产物实例（本仓库真实文件）</h1>
        <div className="sub">每一步做完，会留下什么、它有什么用、谁会用 —— 都在这。产物文件都在工程里真实存在，答辩时可打开验证。</div>
      </div>

      <Card title="7 个产物：是什么 · 有什么用 · 谁用">
        <table className="tbl">
          <thead><tr><th>产物</th><th>内容要点</th><th>有什么用（谁用）</th></tr></thead>
          <tbody>
            <tr>
              <td><Badge kind="cyan">manifest.json</Badge></td>
              <td><Hl>16</Hl> 个文件的清单 + 每个文件的指纹</td>
              <td>「文件账本」——比对指纹判断文档变了没（断点续传）；切桶、复制、写摘要都读它</td>
            </tr>
            <tr>
              <td><Badge kind="cyan">bucket_plan.json</Badge></td>
              <td><Hl>7</Hl> 桶分组方案（6 组 AI 读 + 1 组附件）</td>
              <td>「排班表」——派几个 AI、谁读哪桶都按它来</td>
            </tr>
            <tr>
              <td><Badge kind="cyan">parsed/</Badge></td>
              <td>原始文档的干净副本（原件永远不动）</td>
              <td>「工作副本」——AI 读它找歧义；下游系统需求从它抽取</td>
            </tr>
            <tr>
              <td><Badge kind="amber">bucket_ambiguity_*.json</Badge></td>
              <td>6 份歧义清单（W01 桶 <Hl color="amber">12</Hl> 条）</td>
              <td>每个 AI 的「作业答案」——合并步骤把它们拼成总清单</td>
            </tr>
            <tr>
              <td><Badge kind="amber">amb_index.json</Badge></td>
              <td>合并后的总清单：<Hl color="amber">45</Hl> 条歧义，已编号</td>
              <td><b>init 最重要的交接物</b>——下游 clarify 逐条读它去澄清；就是关系图里 init→clarify 那条边</td>
            </tr>
            <tr>
              <td><Badge kind="green">parse-summary.md</Badge></td>
              <td>一页总结：这次解析干了什么</td>
              <td>给人看（答辩一页讲完）+ 给下次运行看（判断走全新解析还是增量）</td>
            </tr>
            <tr>
              <td><Badge kind="green">task_init.md</Badge></td>
              <td>任务台账：<Hl color="green">15</Hl> 条任务记录 + 时间戳</td>
              <td>考核的「证据链」——门控靠它放行；答辩靠它证明每一步都做过</td>
            </tr>
          </tbody>
        </table>
        <Keyline>
          一句话串起来：<Hl>账本</Hl>（manifest）→ <Hl>排班</Hl>（bucket_plan）→ <Hl>工作副本</Hl>（parsed）→ <Hl>作业答案</Hl>（bucket_ambiguity）→ <Hl>交接给 clarify</Hl>（amb_index）→ <Hl>总结</Hl>（parse-summary）→ <Hl>证据链</Hl>（task_init）。
        </Keyline>
      </Card>

      <Card title="AMB 样例（识别出的歧义——下游 clarify 的输入）">
        {ambSamples.map((a) => (
          <div key={a.id} className="amb-card" style={{ marginBottom: 10 }}>
            <div className="amb-head">
              <span className="amb-title">{a.id}</span>
              <Badge kind="amber">{a.category}</Badge>
              <span className="muted">{a.bucket} · {a.src}</span>
              <span className="muted">{a.line}</span>
            </div>
            <div className="amb-desc">{a.desc}</div>
            <div className="amb-impact"><b>影响：</b>{a.impact}</div>
          </div>
        ))}
        <Callout kind="amber">
          <b>为什么是 amber？</b>AMB（Ambiguity）是 init 的核心产出之一：识别出的歧义会进入 <code>amb_index.json</code>，下游 <code>/yxspec:clarify</code> 逐条澄清，形成 CLQ 澄清矩阵。
        </Callout>
      </Card>
    </div>
  );
}

/* ============================================================
 * 4. 门控 / 追溯 / AI 协同
 * ============================================================ */
export function MechanismsView() {
  return (
    <div>
      <div className="page-title">
        <h1>门控 · 追溯 · AI 协同</h1>
        <div className="sub">考核①A 级要求：讲清门控、追溯、AI 协同机制。</div>
      </div>

      <Card title="机制总览">
        <table className="tbl">
          <thead><tr><th>机制</th><th>核心</th><th>实例</th></tr></thead>
          <tbody>
            {mechanisms.map((m, i) => (
              <tr key={i}>
                <td style={{ whiteSpace: 'nowrap' }}><Badge kind={i === 0 ? 'cyan' : i === 1 ? 'green' : 'blue'}>{m.key}</Badge></td>
                <td>{m.role}</td>
                <td><span className="muted">{m.example}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="门控细则（gate 命令）">
        <Callout kind="cyan">
          <b>规则：</b>{gating.rule}
        </Callout>
        <SectionTitle>反跳过铁律</SectionTitle>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          {gating.ironRules.map((r, i) => (
            <li key={i} style={{ margin: '4px 0' }}>{r}</li>
          ))}
        </ul>
        <SectionTitle>gate 内部检查表（真实源码 INIT_STEPS）</SectionTitle>
        <table className="tbl">
          <thead><tr><th>Step</th><th>名称</th><th>post 检查（全过才放行）</th></tr></thead>
          <tbody>
            {components.gateTable.map((g) => (
              <tr key={g.step}>
                <td><Badge kind="gray">{g.step}</Badge></td>
                <td><code>{g.name}</code></td>
                <td><code>{g.post}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Keyline>
          gate 的 <Hl>mark-done</Hl> 模式会逐条校验 post 表达式：任一不满足即 rc=1 → 回退重做，绝不含糊。
        </Keyline>
        <SectionTitle>故障处置表</SectionTitle>
        <table className="tbl">
          <thead><tr><th>故障</th><th>处置</th></tr></thead>
          <tbody>
            {gating.failures.map((f, i) => (
              <tr key={i}><td><code>{f.fault}</code></td><td>{f.action}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="追溯细节（任务行 + session）">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5 }}>
          <li>任务行字段：<code>id / name / type / module / action / verify / done / started_at / finished_at / duration / model / notes</code></li>
          <li>真实例：<code>INIT-GATE | Gate Check | review | — | 校验 raw/ 存在 | rc=0 | true | 08:55:02 | 08:55:02 | 0s</code></li>
          <li>session 行：<code>session_id / started_at / finished_at / duration / code_baseline / module_scope / result / notes</code></li>
          <li>规划 vs 实际：<code>planned_modules → done_modules / skipped / failed + total_duration</code></li>
        </ul>
        <Callout kind="green">
          <b>追溯 = 证据链。</b>评审时考官会看「每个产物有没有 verify 条件、有没有时间戳、上下游 derived_from 是否闭合」——task_init.md 就是 init 阶段的证据链。
        </Callout>
      </Card>
    </div>
  );
}

/* ============================================================
 * ★ 答辩
 * ============================================================ */
export function DefenseView() {
  return (
    <div>
      <div className="page-title">
        <h1>答辩要点</h1>
        <div className="sub">结合 git 提交记录 + 阶段一/阶段二完成情况 + 对 yxspec 的理解（工程目录框架 + 工作流 Command 执行记录）展开。</div>
      </div>

      <Card title="① 流程理解 A 级要点（25 分）">
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
          {defensePoints.map((p, i) => (
            <li key={i} style={{ margin: '5px 0' }}>{p}</li>
          ))}
        </ul>
        <Callout kind="green">
          <b>你的记忆锚：</b>「<Hl>16</Hl> 文件 / <Hl>7</Hl> 桶 / <Hl className="hl-amber">45</Hl> AMB / <Hl>7m19s</Hl> / FULL 模式」+「三个机制（门控 / 追溯 / AI 协同）」+「调用链（scan_init.py 12 子命令 → 6 worker → amb_index → clarify）」。
        </Callout>
      </Card>

      <Card title="阶段一 9 节点（init → swe-coding-verify-pc）">
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13.5 }}>
          {examMapping.phase1Steps.map((p, i) => (
            <li key={i} style={{ margin: '3px 0' }}>{p}</li>
          ))}
        </ol>
        <Callout kind="amber">
          <b>注意：</b>考核方案版本为 v1.4，阶段一节点 8 写的是 <code>swe-coding-plan → swe-coding-do</code>；
          本仓库 CLAUDE.md 已升级为 <code>swe-coding-plan-v2 → swe-coding-do-v2</code>（且流程裁剪注：swe-detail* 已废弃）。答辩时说明版本即可。
        </Callout>
      </Card>

      <Card title="分数结构">
        <div className="stat-grid">
          <Stat num="25" label="① 流程理解" numKind="cyan" desc="A 级 22-25" />
          <Stat num="45" label="② 阶段一" desc="时间 10 + 实操 35" />
          <Stat num="30" label="③ SQT 方案一" desc="最高 30 分" />
          <Stat num="+5" label="④ 方案二每条采纳" desc="不封顶" />
        </div>
        <Callout kind="cyan">
          <b>核心规则：</b>阶段一完成后阶段二分数才有效；阶段一未完成者阶段二计 0 分。
        </Callout>
      </Card>
    </div>
  );
}
