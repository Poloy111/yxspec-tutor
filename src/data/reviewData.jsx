/**
 * yxspec-tutor · review 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/review.md + 各阶段 specs 目录下真实 review 报告（13 个有 review 阶段 / 15 份 signoff）
 * 真实运行：2026-07-28~30（sys_elicitation→sys_analysis→sys_arch→swe_analysis→swe_arch→coding_plan→coding→sqt_*）
 */

const reviewChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:review <stage> · 阶段审查',
    oneLiner:
      '对指定阶段规格书按阶段专属检查单逐项审查（pass/deviation/na）→ 生成审查报告 + SIGNOFF 人工表单 → 人工确认签名后放行下游。本工程 13 个有 review 阶段全部 approved（15 份 signoff；sqt-defect-feedback 含 3 轮迭代）。',
    analogy:
      '把 review 想象成「出厂质检 + 签字放行」：质检员（AI）拿着检查单（review-{stage}.yaml）逐项检验产品（规格书），合格标 pass、有问题标 deviation 并给修正建议，最后开一张签字单（SIGNOFF）——技术负责人和质量负责人签字后产品才能发货（放行下游）。AI 不能替人签字。',
    memoryLine: '记住：<Hl>review = AI 预审 + 人工双签放行</Hl>——13 个阶段 / 15 份 signoff 全 approved。',
    purpose: {
      oneLiner:
        '两阶段：阶段 A（AI 预审）逐项审查 → verdict 自动推导（approved/conditional/rejected）+ 生成 SIGNOFF 表单；阶段 B（人工确认）校验签名完整与逻辑一致 → 同步回 REVIEW 报告 → 放行判定（approved / conditional+tech_lead 双签）。',
      input: {
        title: '3 项 Gate',
        items: [
          '目标阶段的规格产物已存在（specs/ 或 source/ 下）',
          '对应审查检查单存在（templates/yaml/review-checklist/review-{stage}.yaml）',
          '目标阶段的 task 文件状态为已完成',
        ],
        note: 'swe_coding 追加机械门禁：coding_review.py 四项确定性检查',
      },
      processTitle: '两阶段',
      process: [
        '① 阶段 A（AI 预审）：A1 规划 task 文件 → A2 定位规格+检查单 → A3 逐项审查（pass/deviation/na）→ A4 verdict 自动推导 → A4.5 上游反馈识别 → A5 生成 REVIEW → A6 生成 SIGNOFF 表单',
        '② 阶段 B（人工确认）：B1 加载 SIGNOFF → B2 校验填写完整性 → B3 校验签字逻辑一致 → B4 同步回 REVIEW → B5 放行结论',
      ],
      outputsTitle: '3 样',
      outputs: [
        { name: 'REVIEW-{STAGE}-{YYYY}-{NNN}.md', what: '审查报告（§1 摘要 / §2 检查明细 / §3 偏离项 / signoff）', consumer: '门控放行依据' },
        { name: 'REVIEW-{STAGE}-{YYYY}-{NNN}-SIGNOFF.md', what: '人工审查表单（偏离判定 + 双签 + 放行条件）', consumer: '人工填写' },
        { name: 'task_review_{stage}.md', what: '本阶段任务文件', consumer: '门控 + 追溯' },
      ],
      value: [
        '13 个阶段 15 份 signoff 全 approved——每个阶段都有放行证据',
        'verdict 自动推导不被人工覆盖——Major=0 才可能放行',
        'AI 不填签名——签名不可伪造，人工双签',
      ],
      boundary: [
        '不自动执行阶段 B —— 阶段 A 完成后提示人工填 SIGNOFF',
        '不自动执行下游阶段 —— review 只放行，推进由用户决定',
        '审查独立性 —— 审查过程不得修改被审查的规格文件',
      ],
      example:
        'review-sys_arch：26 项检查 25 pass / 1 Minor（CHK-SA-016 HSI 20<37.4）→ 人工判定接受 → V1.2 双签 approved 放行（套用 SYS.1 闭环范式）。',
    },
    rolesTitle: '谁在干活？（命令 / 检查单 / 人）',
    roles: [
      { kind: 'blue', role: '审查队长', who: '/yxspec:review 命令', does: '阶段 A 预审 + 报告/SIGNOFF 生成 + 阶段 B 校验' },
      { kind: 'cyan', role: '检查单', who: 'templates/yaml/review-checklist/review-{stage}.yaml', does: '逐项判定依据（CHK-{STAGE}-NNN）' },
      { kind: 'amber', role: '技术/质量负责人', who: '人工（本工程 zhengyonghong 双签）', does: '偏离判定（接受/豁免/需修正）+ 签名放行' },
    ],
    whyTitle: '为什么要两阶段审查？',
    whyShell: [
      '为什么 AI 预审 + 人工确认？—— AI 快但不可信，人慢但权威——互补',
      '为什么 verdict 自动推导？—— 不被人工覆盖，Major>0 就是 rejected',
      '为什么签名不可伪造？—— 放行是责任，AI 不能替人担责',
    ],
    whyMemory: '记住 <Hl>「AI 预审 + 人工双签」</Hl>——verdict 自动推导不被覆盖。',
    instance: {
      stats: [
        { num: '13', label: '个 review 阶段', desc: '15 份 signoff 全 approved', kind: 'green' },
        { num: '26', label: '项 sys_arch 检查', desc: '25 pass + 1 Minor', kind: 'cyan' },
        { num: '2', label: '阶段 A/B', desc: 'AI 预审 + 人工确认', kind: 'blue' },
        { num: 'approved', label: '终审结论', desc: 'DEV 接受 + 双签', kind: 'green' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>13 个阶段、15 份 signoff</Hl>。答辩时说「每个阶段审查通过才放行，13 阶段全 approved」就是一句话结论。',
    },
    downstream: ['approved → 放行下游', 'conditional+双签 → 附条件放行', 'rejected → 修正重审'],
    downstreamLine: '一句话：<Hl>审查是「出厂质检 + 签字放行」</Hl>——没有签名不发货。',
    ironRules: [
      '<b>逐项审查不跳过</b> —— 遍历检查单每一条',
      '<b>证据驱动</b> —— 每条判定引用规格文件具体位置',
      '<b>偏离严格分级</b> —— 按检查单预定义 severity，不得降级',
      '<b>签名不可伪造</b> —— AI 不得填写人工签名栏',
    ],
    tutor: {
      question: '考官问「verdict 怎么推导？conditional 和 approved 什么关系？」怎么答？',
      answer: (
        <span>
          verdict 由 Major/Minor 计数自动推导：<b>approved</b> = 全部 pass/na；
          <b>conditional</b> = Major=0 且 Minor&gt;0（附条件放行，需人工逐项确认 + 技术负责人签名）；
          <b>rejected</b> = Major&gt;0。
          放行判定：approved 直接放行；conditional + tech_lead.verdict 属于 (approved, conditional) 时放行。
          本工程 sys_arch：1 Minor（HSI 数量）→ 技术负责人判定接受 → <b>双签升级 approved</b>。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '两阶段 · 6+5 步',
  flowTitle: '执行流程：6 步互动流程图',
  flowSub: '阶段 A（AI 预审）→ 阶段 B（人工确认）。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'A1-A2', label: '规划 + 定位（阶段 A）',
      action: '生成 task_review_{stage}.md + 校验 stage 合法值 + 定位最新规格文件 + 加载检查单',
      post: '任务文件 + 检查单', edge: '准备就绪',
      why: '参数校验与文件定位先行',
    },
    {
      id: 1, name: 'A3-A4', label: '逐项审查 + verdict（阶段 A）',
      action: '遍历检查单每条：pass/deviation/na + 偏离描述与 AI 建议修正 + 证据引用 → verdict 自动推导',
      post: '检查明细 + 结论', edge: '审查结论',
      why: '证据驱动逐项判定，结论自动推导',
      badges: [{ kind: 'amber', text: 'pass/deviation/na' }],
    },
    {
      id: 2, name: 'A4.5', label: '上游反馈识别（阶段 A）',
      action: '偏离根因属上游权威产物 → 调用 yxspec-upstream-feedback skill 生成候选 + 记录 feedback_candidate',
      post: 'feedback_candidate + 推荐命令', edge: '候选转正式',
      why: 'review 不直接写 UF 文件，落盘由 feedback create 执行',
    },
    {
      id: 3, name: 'A5-A6', label: '生成 REVIEW + SIGNOFF（阶段 A）',
      action: '按模板生成审查报告（§1 摘要/§2 明细/§3 偏离）+ 人工审查表单（偏离判定/双签/放行条件留空）',
      post: 'REVIEW + SIGNOFF 文件', edge: '等待人工',
      why: '签名栏 AI 不得填写',
      badges: [{ kind: 'green', text: 'AI 预审完成' }],
    },
    {
      id: 4, name: 'B1-B3', label: '人工确认（阶段 B）',
      action: '加载 SIGNOFF → 校验填写完整（偏离判定非空/豁免理由/双签非空/放行条件勾选）→ 校验签字逻辑一致（Major 未关闭不得 approved）',
      post: '校验通过', edge: '确认放行',
      why: '双签是放行的责任凭证',
    },
    {
      id: 5, name: 'B4-B5', label: '同步 + 放行（阶段 B）',
      action: '人工结果写入 REVIEW（deviations.human_verdict + signoff 双签 + release_conditions）→ 输出放行结论与下一步建议',
      post: 'FINAL_VERDICT', edge: '放行下游',
      why: 'approved/conditional 才放行，rejected 修正重审',
      badges: [{ kind: 'green', text: 'approved' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '规划定位', icon: '🗂️', color: 'blue', sub: 'A1-A2' },
    { id: 1, name: '逐项审查', icon: '🔍', color: 'cyan', sub: 'A3-A4' },
    { id: 2, name: '上游识别', icon: '🔄', color: 'amber', sub: 'A4.5' },
    { id: 3, name: '生成报告', icon: '📄', color: 'cyan', sub: 'A5-A6' },
    { id: 4, name: '人工确认', icon: '✍️', color: 'amber', sub: 'B1-B3' },
    { id: 5, name: '同步放行', icon: '✅', color: 'green', sub: 'B4-B5' },
  ],
  flowTutor: {
    question: '考官问「swe_coding 审查和其他阶段有什么不同？」怎么答？',
    answer: (
      <span>
        swe_coding 是<b>编码完成机械门禁</b>：coding_review.py 单次调用完成四项确定性检查
        （<b>GATE-TASKS-STATUS</b> 任务全 done / <b>GATE-TBD-SCAN</b> 无 TBD/TODO / <b>GATE-ORPHAN</b> 无死代码 /
        <b>GATE-BASELINE-DIFF</b> evolve 基线签名无漂移），全部 pass 即模块通过，
        <b>无 LLM 逐项判定</b>——功能正确性由下游验证链承担。其他阶段（sys_arch 等）才是检查单逐项 AI 审查。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: '阶段规格产物', role: 'specs/ 或 source/ 下目标文件（审查对象）' },
      { name: 'review-{stage}.yaml 检查单', role: '逐项判定依据（CHK 条目）' },
      { name: 'SIGNOFF 表单', role: '阶段 B 人工填写 + 校验' },
    ],
    inputKeyline: '最关键输入是 <Hl>检查单 + 规格产物</Hl>——逐项判定必须引用规格证据。',
    outputs: [
      { name: 'REVIEW-{STAGE}-{YYYY}-{NNN}.md', role: '审查报告（§1~§6 + signoff）' },
      { name: 'REVIEW-*-SIGNOFF.md', role: '人工审查表单（偏离判定 + 双签）' },
      { name: 'task_review_{stage}.md', role: '任务文件' },
    ],
    callGraphs: [
      {
        title: '命令级 · review 与上下游的关系',
        color: 'cyan',
        from: { id: 'rv', cmd: '/yxspec:review <stage>', sub: '阶段审查', desc: 'AI 预审 + 人工放行' },
        tos: [
          { id: 'up-stage', cmd: '上游阶段产物', edge: '审查对象', edgeDesc: 'specs/ 或 source/', desc: '上游：各阶段规格产物。' },
          { id: 'up-fb', cmd: 'feedback', edge: '上游反馈识别', edgeDesc: 'A4.5 候选', desc: '协作：偏离根因属上游时生成 UF 候选。' },
          { id: 'down-next', cmd: '/yxspec:next', edge: '放行后推进', edgeDesc: 'approved 放行', desc: '下游：放行后建议执行下游阶段。' },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:review' },
      { seg: 'input', label: '规格 + 检查单' },
      { seg: 'script', label: '阶段 A 逐项' },
      { seg: 'worker', label: 'REVIEW + SIGNOFF' },
      { seg: 'output', label: 'REVIEW-{STAGE}-{YYYY}-{NNN}.md' },
      { seg: 'worker', label: '阶段 B 校验' },
      { seg: 'output', label: 'FINAL_VERDICT (approved)' },
    ],
    qualityGates: [
      { code: 'Gate', name: '3 项 Gate', phase: '前置', check: '产物存在 / 检查单存在 / task 已完成', outcome: '全过' },
      { code: 'VERDICT', name: '结论自动推导', phase: '执行', check: 'Major=0 才可能放行，不被人工覆盖', outcome: 'approved/conditional' },
      { code: 'SIGN', name: '双签校验', phase: '收尾', check: '偏离判定 + 双签名 + 放行条件勾选', outcome: '过' },
    ],
    failures: [
      { fault: '检查单条目缺失', action: '检查单与产物对不上时报告阻塞' },
      { fault: 'Major 偏离未关闭', action: 'verdict=rejected，修正后重新审查' },
      { fault: '签名不完整', action: '阶段 B 报具体缺失并停止' },
    ],
  },
  ioTutor: {
    question: '答辩时 review 怎么讲？',
    answer: (
      <span>
        「review 是阶段审查：<b>阶段 A（AI 预审）</b>按 review-{'stage'}.yaml 检查单逐项审查规格书
        （pass/deviation/na，证据驱动），verdict 自动推导（approved/conditional/rejected），生成 REVIEW 报告 + SIGNOFF 人工表单；
        <b>阶段 B（人工确认）</b>校验签名完整与逻辑一致后同步回报告放行。
        本工程 13 阶段全 approved（15 份 signoff；SQT-TR 唯一一次 rejected→UF 闭环→approved 是门控拦截实证）。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'review-sys_arch-2026-001.md', kind: 'green', what: '26 项检查 25 pass/1 Minor → approved（双签）', who: 'sys-arch 放行' },
    { name: 'review-swe_analysis-2026-001.md', kind: 'cyan', what: 'SW-SRS 审查报告（16 项 CHK-SWR 检查，上游 verify 52 项 49P/0F/3WARN）', who: 'SWE.1 放行' },
    { name: 'review-swe_coding-2026-001.md', kind: 'amber', what: '编码机械门禁（coding_review.py 四项）', who: 'SWE.4 放行' },
    { name: 'review-*-SIGNOFF.md', kind: 'cyan', what: '人工审查表单（偏离判定 + 双签 + 放行条件）', who: '人工填写' },
  ],
  artifactsChain: '一句话串起来：<Hl>规格产物 → AI 预审 → REVIEW + SIGNOFF → 人工双签 → 放行</Hl>。',
  samplesTitle: '真实审查样例（点开看字段）',
  samples: [
    {
      id: 'DEV-001', badges: [{ kind: 'amber', text: 'Minor' }], meta: 'sys_arch',
      title: 'CHK-SA-016：HSI 数量 20 < 门控阈值 37.4',
      fields: [
        { k: '现象', v: 'HSI=20 < 374×0.1=37.4（门控阈值）' },
        { k: '根因', v: 'RESOURCE-TABLE-XLSX 降级（xlsx 未解析），文档如实标 WARN 未臆造凑数' },
        { k: '人工判定', v: '接受——根因为输入侧资源表未解析非架构遗漏；芯片级 HSI 由 HWE.1/SWE.2 补全' },
      ],
    },
    {
      id: 'CHK-SA-007', badges: [{ kind: 'green', text: 'Major pass' }], meta: 'sys_arch',
      title: '全部 SR 100% 分配（无遗漏/重复）',
      fields: [
        { k: '证据', v: '§7 唯一 SR-ID=374，与 sys-req ID 集合比对 缺0 多0' },
        { k: '分配', v: '每 SR 唯一主属子系统，F 类 FC 1:1' },
      ],
    },
  ],
  samplesNote: '每项判定必须引用规格文件具体位置——证据驱动，不是感觉驱动。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: '阶段审查',
    title: '门控 · 追溯 · AI 协同（review 版）',
    sub: '阶段质量门——AI 预审 + 人工放行。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '3 项 Gate + verdict 自动推导 + 双签校验'],
        ['<Badge kind="green">追溯</Badge>', 'CHK 逐项结果 + DEV 偏离 + signoff 全留档'],
        ['<Badge kind="blue">AI 协同</Badge>', 'AI 预审（快）+ 人工确认（权威）——签名不可伪造'],
      ],
    },
    sections: [
      {
        title: 'verdict 推导规则（放行判定）',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'approved：全部 pass/na' },
          { kind: 'output', label: '→ 直接放行' },
          { kind: 'output', label: 'conditional：Major=0, Minor>0' },
          { kind: 'output', label: '→ 人工逐项确认 + 技术负责人签名' },
          { kind: 'output', label: 'rejected：Major>0' },
          { kind: 'output', label: '→ 修正后重新审查' },
        ],
        keyline: '结论自动推导不被人工覆盖——Major 未关闭就是 rejected，双签才放行。',
      },
      {
        title: 'swe_coding 机械门禁（四项）',
        type: 'ul',
        items: [
          'GATE-TASKS-STATUS：plan tasks[] 全 done，无 blocked/pending 残留',
          'GATE-TBD-SCAN：源文件无 TBD/TODO/FIXME（前 5 条命中即 fail）',
          'GATE-ORPHAN：新增非 static 业务出口函数须有调用者（反死代码）',
          'GATE-BASELINE-DIFF：evolve 模块 public_apis[] 签名级漂移检查',
          '结论：纯机械门禁无 LLM 逐项——功能正确性由下游验证链承担',
        ],
        keyline: '编码审查用机器秒级门禁代替 LLM 逐项——确定性优先。',
      },
    ],
  },
};

export default reviewChapter;
