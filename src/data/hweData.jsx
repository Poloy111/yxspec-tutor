/**
 * yxspec-tutor · hwe-analysis 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/agents/yxspec-hwe-analysis.md（HWE.1 硬件需求分析）
 * 真实产物：project/specs/sys/hw-analyse-2026-001.md（56 条 HWA 条目）+ task_hwe_analysis.md
 * 真实运行：2026-07-28 20:09 → 07-29 08:12（含跨夜）+ 07-30 审查闭环 HWA-TASK-004
 */

const hweChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:hwe-analysis · HWE.1 · 硬件需求分析',
    oneLiner:
      '从系统架构分叉出的硬件支：把系统需求里硬件相关部分（H 类 51 条 + M 类 23 条 + 接口 21 条）逐维分析「硬件怎么满足」——选型、接口、功耗、EMC、散热、可靠性、安全，产出硬件需求分析规格书。与软件需求分析（SWE.1）并行开展。',
    analogy:
      '把 hwe-analysis 想象成「材料工程师评审施工图」：sys-arch 给了总蓝图，hwe-analysis 把蓝图里跟硬件有关的部分摊开细看——用什么芯片（选型）、怎么接线（接口）、耗多少电（功耗）、会不会被干扰（EMC）、烫不烫（散热）、容不容易坏（可靠性）、安不安全（ISO 26262）。产出是硬件设计的「材料评审报告」。',
    memoryLine: '记住：<Hl>hwe-analysis = 把硬件需求摊开成七大维度分析</Hl>——选型/接口/功耗/EMC/散热/可靠性/安全，56 条 HWA 条目。',
    purpose: {
      oneLiner:
        '按模板 12 章节、七大分析维度生成硬件需求分析规格书：56 条 HWA 条目（HWA-0001 起连续编号），每条 derived_from SYS-H/M/IF 需求，覆盖选型/接口/功耗/EMC/散热/可靠性/安全。',
      input: {
        title: '2 类输入',
        items: [
          'sys-req-trainees-2026.md —— 系统需求（374 条 SR）',
          'SYS-H-00001~51（H 类硬件）+ SYS-M-00001~23（M 类结构）+ SYS-IF-0001~21（系统接口）',
        ],
        note: '门控校验：sys-req 存在 + H 类 51 条齐备 + review-sys_analysis 放行（conditional，Major=0）',
      },
      processTitle: '5 步，全流程',
      process: [
        '① 规划：建任务文件 + 读模板（hw-analyse.md.tpl）',
        '② 加载输入：读系统需求 + 硬件需求',
        '③ 硬件分析：按 12 章节逐项填入（选型/接口/功耗/EMC/散热/可靠性/安全）',
        '④ 生成产物：严格按模板生成 HW-ANALYSE .md（单次 Write ≤50 行，超出用 Edit 追加）',
        '⑤ 质量校验：七大维度覆盖 + 编号连续无跳号 + 置信度 <0.90 标注 [NEEDS CLARIFICATION]',
      ],
      outputsTitle: '2 样（硬件设计的输入）',
      outputs: [
        { name: 'hw-analyse-2026-001.md', what: '硬件需求分析规格书：12 章节 + 56 条 HWA 条目', consumer: '硬件设计（HW 详设）+ 采购选型' },
        { name: 'task_hwe_analysis.md', what: '任务台账：HWA-TASK-001~004', consumer: '门控放行 + 证据链' },
      ],
      value: [
        '七大维度全覆盖——硬件设计前把电、热、磁、可靠性、安全都想清楚',
        '56 条 HWA 编号连续可追溯，每条有来源（H/M/IF 需求）',
        '与软件交叉的接口标注 sw_dependency——软硬件边界清晰',
      ],
      boundary: [
        '不管「电路原理图怎么画」——那是硬件详细设计的事',
        '不管「PCB 怎么布局」——那是硬件设计的事',
        'hwe-analysis 只回答「硬件需求怎么分析」，给出选型与约束',
      ],
      example:
        'SR 里「系统休眠功耗应 ≤3mA」→ 功耗分析章节做模式预算（运行/休眠/唤醒），并给出优化策略（PMU 深睡、外设断电），标注实测验证方式。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 模板）',
    roles: [
      { kind: 'blue', role: '硬件分析师', who: 'yxspec-hwe-analysis agent', does: '规划 → 加载输入 → 12 章节分析 → 生成产物 → 质量校验' },
      { kind: 'amber', role: '模板', who: 'templates/md/hw-analyse.md.tpl', does: '强制 12 章节结构 + 全部表格原样保留' },
      { kind: 'cyan', role: '上游守卫', who: '门控检查', does: 'sys-req 存在 + hw-*.md（本项目由 H 类承载）+ review 放行' },
    ],
    whyTitle: '为什么要这样分工？（为什么模板强制 12 章节）',
    whyShell: [
      '为什么模板强制 12 章节？—— 硬件分析维度多（选型/接口/功耗/EMC/散热/可靠性/安全），模板保证七大维度一查就有、不遗漏',
      '为什么编号连续不跳号？—— HWA-0001 起每条可追溯，审查与验证靠编号定位',
      '为什么置信度 <0.90 标注待确认？—— 数据不全时如实标注 [NEEDS CLARIFICATION]，不臆造参数',
    ],
    whyMemory: '记住 <Hl>「模板 12 章节 + 七大维度 + 连续编号」</Hl>——硬件分析最怕漏维度，模板就是防漏清单。',
    instance: {
      stats: [
        { num: '12h 2m', label: '总耗时', desc: '20:09 起跨夜 → 08:12（HWA-002 最长 12h）', kind: 'cyan' },
        { num: '56', label: '条 HWA 条目', desc: 'HWA-0001 起连续编号', kind: 'cyan' },
        { num: '12', label: '章节', desc: '模板强制 §1~§12', kind: 'cyan' },
        { num: '7', label: '大维度', desc: '选型/接口/功耗/EMC/散热/可靠性/安全', kind: 'cyan' },
        { num: 'approved', label: '阶段审查', desc: '15pass/1Minor，DEV-001 接受，双签放行', kind: 'green' },
      ],
      memoryLine: '记住这 3 个数字：<Hl>12 章节、56 条 HWA、7 大维度</Hl>。答辩时说「HWE.1 按模板 12 章节七大维度全覆盖，review approved 双签」就是一句话结论。',
    },
    downstream: ['hw-analyse-*.md → 硬件设计', 'sw_dependency 标注 → swe 接口规范', '审查报告 → 门控放行'],
    downstreamLine: '一句话：<Hl>硬件需求分析是「硬件设计的材料评审报告」</Hl>——选型/功耗/EMC/散热/可靠性/安全七维齐备。',
    ironRules: [
      '<b>上游不齐不开工</b> —— sys-req 存在 + review 放行才动工',
      '<b>模板强制 12 章节</b> —— 不得缺失/合并/重命名，未知数据标注「待确认」',
      '<b>七大维度全覆盖</b> —— 选型/接口/功耗/EMC/散热/可靠性/安全',
      '<b>编号连续不跳号</b> —— HWA-0001 起，逐条可追溯',
      '<b>低置信度如实标注</b> —— <0.90 标 [NEEDS CLARIFICATION]，不臆造',
    ],
    tutor: {
      question: '考官问「hwe-analysis 和 sys-analysis 的输入有什么不同？」怎么答？',
      answer: (
        <span>
          <b>sys-analysis 吃 PRD（产品需求）</b>，产出 SR（系统需求）——全量转换；
          <b>hwe-analysis 吃 SR 里的硬件相关部分</b>（H 类 51 条 + M 类 23 条 + SYS-IF 21 条），
          做的是「聚焦分析」而非「全量转换」——围绕七大维度把硬件需求分析透，产出 hw-analyse 规格书（56 条 HWA）。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '5 步流程 · 模板驱动 · 质量校验收口',
  flowTitle: '执行流程：5 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>箭头上的标签 = 传给下一步的产物</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: '规划', label: '规划（建台账 + 读模板）',
      action: '生成 task_hwe_analysis.md 任务文件；Read hw-analyse.md.tpl 获取完整结构',
      post: 'task_hwe_analysis.md + 模板结构', edge: '台账 + 模板',
      why: '先有记录与骨架，再填内容',
    },
    {
      id: 1, name: '加载输入', label: '加载输入（门控 + 需求）',
      action: '门控检查：sys-req 存在 + hw-*.md（H 类承载）+ review 放行；加载系统需求与硬件需求',
      post: '输入加载完成', edge: 'SYS-H/M/IF 需求',
      why: '输入不齐不开工，先过门控',
      badges: [{ kind: 'amber', text: '门控' }],
    },
    {
      id: 2, name: '硬件分析', label: '硬件分析（12 章节逐项）',
      action: '按模板 12 章节逐项填入：选型（§4）/接口（§5）/功耗（§6）/EMC（§7）/散热（§8）/可靠性（§9）/安全（§10）',
      post: '12 章节分析内容', edge: '七大维度分析',
      why: '硬件分析维度多，模板保证不漏',
      badges: [{ kind: 'cyan', text: '7 大维度' }],
    },
    {
      id: 3, name: '生成产物', label: '生成产物（严格按模板）',
      action: '生成 HW-ANALYSE .md：严格按模板结构（§1~§12），单次 Write ≤50 行，超出用 Edit 追加',
      post: 'hw-analyse-2026-001.md', edge: '规格书初稿',
      why: '模板强制结构，分片写入防截断',
      badges: [{ kind: 'cyan', text: '56 条 HWA' }],
    },
    {
      id: 4, name: '质量校验', label: '质量校验（3 项）',
      action: '七大维度均有覆盖 + 编号连续无跳号 + 置信度 <0.90 标注 [NEEDS CLARIFICATION]',
      post: '校验通过', edge: '规格书 → 阶段审查',
      why: '漏维度/跳号/臆造都是硬件大忌，三项必查',
      badges: [{ kind: 'green', text: 'review' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '规划', icon: '📋', color: 'blue', sub: '台账+模板' },
    { id: 1, name: '加载输入', icon: '🔒', color: 'amber', sub: '门控+需求' },
    { id: 2, name: '硬件分析', icon: '🔧', color: 'cyan', sub: '12 章节' },
    { id: 3, name: '生成产物', icon: '✍️', color: 'cyan', sub: '56 条 HWA' },
    { id: 4, name: '质量校验', icon: '⚖️', color: 'green', sub: '3 项必查' },
  ],
  flowTutor: {
    question: '考官问「HWE.1 的质量校验查什么？」怎么答？',
    answer: (
      <span>
        三项：<b>① 七大维度覆盖</b>（选型/接口/功耗/EMC/散热/可靠性/安全——一查便知有没有漏）；
        <b>② 编号连续无跳号</b>（HWA-0001 起 56 条，审查按编号定位）；
        <b>③ 低置信度标注</b>（置信度 &lt;0.90 标 [NEEDS CLARIFICATION]，不臆造）。
        真实运行 3 项全过，审查 15pass/1Minor（DEV-001 接受）双签放行。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'sys-req-trainees-2026.md', role: '系统需求（374 条 SR）—— 硬件分析的来源' },
      { name: 'SYS-H-00001~51', role: 'H 类硬件需求（51 条）—— 硬件分析主体' },
      { name: 'SYS-M-00001~23', role: 'M 类结构需求（23 条）—— 机械结构参考' },
      { name: 'SYS-IF-0001~21', role: '系统接口（21 条）—— 接口设计依据' },
      { name: 'hw-analyse.md.tpl', role: '模板（强制 12 章节结构）' },
    ],
    inputKeyline: '最关键输入是 <Hl>H 类需求（SYS-H 51 条）</Hl>——门控校验 H 类齐备 + review 放行。',
    outputs: [
      { name: 'hw-analyse-2026-001.md', role: '硬件需求分析规格书（12 章节 + 56 条 HWA 条目）' },
      { name: 'task_hwe_analysis.md', role: '任务台账（HWA-TASK-001~004）' },
    ],
    outputKeyline: '核心输出是 <Hl>hw-analyse 规格书</Hl>——七大维度 + 连续编号 + sw_dependency 标注。',
    callGraphs: [
      {
        title: '命令级 · hwe-analysis 与上下游的关系',
        color: 'cyan',
        from: { id: 'hwe', cmd: '/yxspec:hwe-analysis', sub: 'HWE.1 · 硬件需求分析', desc: '把硬件需求摊开成七大维度分析' },
        tos: [
          { id: 'up-sys', cmd: 'sys-analysis', edge: 'SYS-H/M/IF 需求', edgeDesc: '硬件需求来源', desc: '上游：H 类 51 + M 类 23 + SYS-IF 21，全部来自 sys-req。' },
          { id: 'up-arch', cmd: 'sys-arch', edge: '硬件架构 + 芯片选型', edgeDesc: '分析参考', desc: '上游：系统架构的硬件章节供分析参考。', dashed: true },
          { id: 'down-hw', cmd: '硬件设计', edge: 'hw-analyse-*.md', edgeDesc: '硬件设计输入', desc: '下游：硬件详细设计与采购选型的输入。' },
          { id: 'side-review', cmd: 'yxspec:review hwe_analysis', edge: '审查报告', edgeDesc: '16 项全量审查', desc: '阶段审查：15pass/1Minor DEV-001 接受，双签放行。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个 Step 干活',
        color: 'blue',
        from: { id: 'hwe-agent', cmd: 'yxspec-hwe-analysis agent', sub: '5 Step 执行', desc: '规划 → 加载 → 分析 → 生成 → 校验' },
        tos: [
          { id: 'tpl', cmd: 'hw-analyse.md.tpl 模板', edge: 'Step 1/3 · 结构约束', edgeDesc: '强制 12 章节', desc: '模板规定 12 章节顺序与全部表格，不得缺失/合并/重命名。' },
          { id: 'sub', cmd: 'subagent 并行（条件）', edge: 'HW 需求 ≥20 条时', edgeDesc: '按分析维度拆分', desc: '需求多时分派 subagent 并行分析各维度，本案例 51+23 条触发。', dashed: true },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（agent 执行 + 模板约束）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:hwe-analysis' },
      { seg: 'input', label: 'SYS-H/M/IF (95 条)' },
      { seg: 'script', label: 'gate' },
      { seg: 'worker', label: '12 章节分析' },
      { seg: 'script', label: '质量校验' },
      { seg: 'output', label: 'hw-analyse-2026-001.md (56 HWA)' },
      { seg: 'output', label: 'review-hwe_analysis-2026-001.md (SIGNOFF)' },
    ],
    pipeKeyline: '蓝色=脚本 · 琥珀=Agent（AI）· 绿色=产物——门控 + 分析 + 校验一条链。',
    qualityGates: [
      { code: '门控', name: '上游前置检查', phase: 'Step 1', check: 'sys-req 存在 + hw-*.md 存在 + review 放行（Major=0）', outcome: 'pass' },
      { code: '质量', name: '质量校验 3 项', phase: 'Step 5', check: '七维度覆盖 / 编号连续 / 低置信度标注', outcome: 'pass' },
    ],
    gateNote: '对比 sys-arch：SYS.3 是「Worker 内嵌 AQ 门 29 项」；HWE.1 是「上游门控 + 3 项质量校验」两道——因为硬件分析是模板驱动的填充式工作，校验聚焦在覆盖度与编号。',
    failures: [
      { fault: '门控不通过', action: '上游缺失或未放行 → 回上游补' },
      { fault: '维度缺失', action: '补写缺失维度章节' },
      { fault: '编号跳号', action: '重排编号（HWA-0001 起连续）' },
      { fault: '数据不确定', action: '标 [NEEDS CLARIFICATION]，如实记录待确认' },
    ],
  },
  ioTutor: {
    question: '答辩时 hwe-analysis 的调用关系怎么讲？',
    answer: (
      <span>
        「hwe-analysis 吃 sys-req 里的硬件相关需求（H 51 + M 23 + SYS-IF 21），按模板 12 章节做七大维度分析（选型/接口/功耗/EMC/散热/可靠性/安全），
        产出 hw-analyse-*.md（56 条 HWA 连续编号），给硬件设计与采购选型；软硬件交叉的接口标注 sw_dependency。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'hw-analyse-2026-001.md', kind: 'cyan', what: '硬件需求分析规格书：12 章节 + 56 条 HWA 条目（status released）', who: '硬件设计 + 采购选型的输入' },
    { name: '§4 硬件选型分析', kind: 'amber', what: 'MCU/SoC（ML307C）+ 外围器件 + 通信接口芯片（AB2026B3/AT9850B）', who: '选型决策依据' },
    { name: '§5 接口设计分析', kind: 'amber', what: '电源/通信/传感器/执行器四类接口（含 4PIN 一线通定义）', who: '硬件原理图设计' },
    { name: '§6~§10 五维分析', kind: 'amber', what: '功耗（模式预算）+ EMC（EMI/EMS 约束表）+ 散热（TDP）+ 可靠性（MTBF/降额）+ 安全（ASIL）', who: '硬件设计与验证' },
    { name: '§11 待澄清项', kind: 'green', what: '未决问题如实列出（如内置电池单位待确认）', who: '下游澄清' },
    { name: 'task_hwe_analysis.md', kind: 'green', what: '任务台账：HWA-TASK-001~004', who: '门控放行 + 追溯证据链' },
  ],
  artifactsChain: '一句话串起来：<Hl>SYS-H/M/IF 需求 → 12 章节七维分析 → hw-analyse 规格书（56 条 HWA）→ 硬件设计与审查</Hl>。',
  samplesTitle: 'HWA 条目真实样例（点开看字段）',
  samples: [
    {
      id: 'HWA-0001', badges: [{ kind: 'cyan', text: '硬件选型' }], meta: '56 条之一',
      title: '主控蜂窝 SoC 选型：ML307C（4G Cat.1，含 ARM 核 + OpenCPU）',
      fields: [
        { k: '来源', v: 'SYS-H-00001（通信网络制式 4G CAT1）+ 产品规格书 §3' },
        { k: '维度', v: '硬件选型 §4.1 MCU/SoC' },
        { k: '要点', v: '4G Cat.1 集成 OpenCPU，覆盖 FDD B1/3/5/8 + TDD B34/38/39/40/41' },
      ],
    },
    {
      id: 'HWA-0002', badges: [{ kind: 'blue', text: '接口设计' }], meta: '56 条之一',
      title: '一线通 4PIN 对外插件逐位定义（5V 紫 / VIN+ 橙 / GND 黑 / NC）',
      fields: [
        { k: '来源', v: 'SYS-H-00043（4PIN 对外插件）+ 产品规格书 §2.4' },
        { k: '维度', v: '接口设计 §5（含 sw_dependency 标注）' },
        { k: '要点', v: 'COM 上拉电阻 5V/2.2K（或 3.3V/1K），波特率匹配' },
      ],
    },
    {
      id: 'HWA-0003', badges: [{ kind: 'amber', text: '功耗分析' }], meta: '56 条之一',
      title: '休眠模式功耗预算：ACC OFF 且无上报任务时 ≤3mA',
      fields: [
        { k: '来源', v: 'SYS-H（休眠功耗条目）+ CLQ-0001 答案' },
        { k: '维度', v: '功耗分析 §6.1 模式预算表' },
        { k: '要点', v: 'PMU 深睡 + 外设断电，实测验证方式登记' },
      ],
    },
  ],
  samplesNote: '每条 HWA 都 derived_from SYS-H/M/IF 需求——硬件追溯链从 SR 延伸到硬件条目。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'HWE.1 · 硬件需求',
    title: '门控 · 追溯 · AI 协同（hwe-analysis 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'sys-arch 怎么表现', 'hwe-analysis 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', 'Worker 内嵌 AQ 门 29 项 + 外置取证', '上游门控（sys-req + H 类 + review）+ 3 项质量校验'],
        ['<Badge kind="green">追溯</Badge>', 'SR 分配到子系统（§7 矩阵 100%）', 'HWA 条目 derived_from SYS-H/M/IF（编号连续可查）'],
        ['<Badge kind="blue">AI 协同</Badge>', '单 Worker 全包 + 脚本门控', 'agent 执行 + 模板强制结构 + 条件性 subagent 并行'],
      ],
    },
    sections: [
      {
        title: '追溯链：SR → H/M/IF → HWA 条目',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'SR (374 条)' },
          { kind: 'output', label: 'H 51 + M 23' },
          { kind: 'output', label: 'SYS-IF 21' },
          { kind: 'output', label: '12 章节分析' },
          { kind: 'output', label: 'HWA ×56' },
        ],
        keyline: '每一跳都有 derived_from：HWA ← SYS-H/M/IF ← sys-req ← PRD。硬件追溯链从系统级延伸到硬件条目。',
      },
      {
        title: 'AI 协同：模板约束 + 条件并行',
        type: 'table',
        cols: ['角色', '干什么', '为什么'],
        rows: [
          ['<code>yxspec-hwe-analysis</code>', '规划 → 加载 → 12 章节分析 → 生成 → 校验', '主执行者，全流程负责'],
          ['<code>hw-analyse.md.tpl</code>', '强制 12 章节 + 全部表格原样保留', '防漏维度——模板即防漏清单'],
          ['<code>subagent（条件）</code>', 'HW 需求 ≥20 条时按维度并行', '51+23 条触发，选型/接口/功耗等可并行'],
        ],
        keyline: '「模板管结构、agent 管内容、条件并行提速度」——HWE.1 的协同分工。',
      },
      {
        title: '审查闭环：16 项全量审查（真实结果）',
        type: 'ul',
        items: [
          '审查依据：review-hwe_analysis.yaml（16 项 CHK-HW 检查）',
          '真实结果：15 pass / 1 Minor（DEV-001 低置信度标注，接受闭合）',
          '放行：双签 zhengyonghong，产物 status draft → released',
          'V0.1 生成 → V0.2 审查放行（2026-07-30 14:18）',
        ],
        keyline: '阶段审查（review）是每个阶段产物进下游前的「关卡」——SUP.1 过程域的统一机制。',
      },
    ],
  },
};

export default hweChapter;
