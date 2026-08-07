/**
 * yxspec-tutor · prd-analysis 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/prd-analysis.md
 * 真实产物：project/specs/prd/prd-trainees-2026.md + task_prd.md + review-report-prd
 * 真实运行：2026-07-28 10:30 → 17:00（6h 29m）+ 07-30 审查闭环
 */

const prdChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:prd-analysis · SYS.1 · 产品需求分析',
    oneLiner:
      '把 clarify 之后「干净、无歧义」的输入，加工成一份标准的产品需求规格书（PRD）——373 条需求，含功能 219 + 非功能 154，这是后面所有阶段的「需求总源头」。',
    analogy:
      '把 PRD 想象成「设计师出图纸」：把客户的零散想法（SOR + 澄清答案）整理成一张标准工程图纸（PRD），每条需求都有编号、有出处、可追溯。后续系统设计、软件设计、测试全都照这张图纸做。',
    memoryLine:
      '记住：<Hl>prd-analysis = 把「客户的话」变成「工程化的需求」</Hl>——373 条编号需求，全流程第一条正式规格书。',
    purpose: {
      oneLiner:
        '产出全流程第一份正式规格书：把上游所有输入（SOR + 45 条澄清答案）收敛成 373 条编号需求，每条都能追溯到源头。',
      input: {
        title: '4 类（都是前两步的产出）',
        items: [
          'parse-summary.md —— init 的解析摘要（文件清单）',
          'parsed/ 干净副本 —— init 复制的文档',
          'clq-sys-matrix —— clarify 的澄清矩阵（无 blocking）',
          'yxspec.json —— 项目配置（spec_id）',
        ],
        note: 'gate-check 第 1 步就校验这些——缺了直接停',
      },
      processTitle: '5 步，全自动 + 1 次人工签署',
      process: [
        '① Plan：规划锚点（产品类型模板 + 章节结构 + 每条需求的编号预分配）',
        '② Extract：派多个 AI 分段精读上游文档，抽需求（并发 7 个）',
        '③ Merge：把各段抽出的需求合并去重，形成统一底稿',
        '④ Generate：3 个 AI 并行写 PRD 正文（A/B/C 三个区段）',
        '⑤ Review：AI 预审 + 人工签署，过审才进下一阶段',
      ],
      outputsTitle: '3 样（下游全靠它们）',
      outputs: [
        { name: 'prd-trainees-2026.md', what: '产品需求规格书：373 条需求（F219 + NFR154）', consumer: 'sys-analysis 的输入（系统需求源头）' },
        { name: 'review-report-prd', what: '审查报告（RQ-1~7 逐项）', consumer: '质量证据 + 答辩' },
        { name: 'task_prd.md', what: '任务台账：5 阶段全程记录', consumer: '门控放行 + 追溯证据' },
      ],
      value: [
        '第一次把「客户的话」变成「工程化的需求」——有编号、有分类、可追溯',
        '功能需求（F 219 条）+ 非功能需求（NFR 154 条）分开管理，后续各取所需',
        '质量门全链：EQ（抽取）→ MQ（合并）→ GQ（生成）→ RQ（审查）四道检查',
      ],
      boundary: [
        '不管「系统怎么设计」——那是 sys-analysis / sys-arch 的事',
        '不管「软件怎么写」——那是 swe-analysis 的事',
        'PRD 只回答「产品要做什么」，不回答「怎么做」',
      ],
      example:
        '规格书里「支持远程控车」一句话 → PRD 抽成一条编号需求 REQ-F-0000xx「系统应支持通过平台下发上电/熄火/寻车/设防/撤防指令」+ 派生非功能需求（响应时间、可靠性）。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '总导演', who: '/yxspec:prd-analysis 命令', does: '按顺序推进 5 个 Phase，每步读质量门结果判定继续/重试/停止' },
      { kind: 'cyan', role: '编剧组', who: 'Plan / Extract×7 / Merge / Generate×3 四个 Agent', does: '规划锚点、分段抽需求、合并去重、分区写 PRD 正文' },
      { kind: 'amber', role: '质检员', who: 'Review Agent + prd_verify.py 脚本', does: 'AI 审（RQ-1~7）+ 脚本校验（EQ/MQ/GQ 门）+ 人工签署' },
    ],
    whyTitle: '为什么要这样分工？（为什么 5 个 Phase）',
    whyShell: [
      '为什么分 5 个 Phase？—— 每步产出独立校验，问题在哪一步产生就在哪一步修，不会到最后才发现整份 PRD 不能用',
      '为什么 Extract 并发 7 个？—— 文档量大，分段并行读，又快又不漏',
      '为什么 Generate 分 3 个 Block？—— 章节多，A/B/C 三区并行写，最后拼接',
      '为什么还要人工签署？—— AI 审完只是「预审」，PRD 是下游一切的源头，必须人来拍板',
    ],
    whyMemory: '记住 <Hl>EQ → MQ → GQ → RQ 四道质量门</Hl>——每一步产物独立校验，问题在哪一步产生就在哪一步修。',
    instance: {
      stats: [
        { num: '6h 29m', label: '总耗时', desc: '5 个 Phase + 2 轮审查', kind: 'cyan' },
        { num: '373', label: '条需求', desc: '功能 219 + 非功能 154', kind: 'cyan' },
        { num: '5', label: '个 Phase', desc: 'Plan/Extract/Merge/Generate/Review', kind: 'cyan' },
        { num: '100%', label: '需求通过率', desc: '373/373', kind: 'green' },
        { num: 'GREEN', label: '质量门', desc: 'gq5 得分 82.5', kind: 'green' },
      ],
      memoryLine: '记住这 4 个数字：<Hl>6.5 小时、373 条、5 个 Phase、100% 通过</Hl>。答辩时说「373 条需求全过四道质量门，审查 conditional→approved 双签放行」。',
    },
    downstream: ['PRD 规格书 → sys-analysis', '审查报告 → 质量证据', '任务台账 → 证据链'],
    downstreamLine: '一句话：<Hl>PRD 是「需求的源头」</Hl>——后面每条系统需求/软件需求都 derived_from 它。',
    ironRules: [
      '<b>上游不齐不开工</b> —— gate 校验 parse-summary / parsed/ / 无 blocking CLQ',
      '<b>每 Phase 独立门控</b> —— EQ/MQ/GQ 每步校验，retry ≤3 轮，超过升级人工',
      '<b>质量门四连</b> —— EQ → MQ → GQ → RQ 全链通过才算完',
      '<b>AI 审完必须人签</b> —— PRD 是源头，驳回就回对应 Phase 修',
      '<b>不编造</b> —— 每条需求必须 derived_from 上游文档',
    ],
    tutor: {
      question: '考官问「PRD 的四道质量门是什么？」怎么答？',
      answer: (
        <span>
          <b>EQ</b>（抽取：WQ-1~5 来源可溯无编造）→ <b>MQ</b>（合并：去重保留率）→ <b>GQ</b>（生成：gq5 得分 82.5 / gq8 保真 / gq11 覆盖）→ <b>RQ</b>（审查：RQ-1~7 逐项）。
          每道门由脚本校验 + Agent 自检，任一不过就回退对应 Phase，重试 ≤3 轮，超过升级人工。这就是「质量门控」机制在 SYS.1 的落地。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '五阶段流程 · 全自动 + 1 次人工签署',
  flowTitle: '执行流程：10 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>箭头上的标签 = 传给下一步的产物</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'session-open', label: '会话启动',
      action: '建任务台账（task_prd.md）+ 状态文件，记录本次运行',
      post: 'task_prd.md + workflow-prd-state.md', edge: '任务台账（记录已开）',
      why: '所有步骤的记录要有汇总的地方——门控检查靠它放行',
    },
    {
      id: 1, name: 'gate-check', label: '门控检查',
      action: '校验上游前置：parse-summary 在不在、parsed/ 有没有文件、有没有 blocking CLQ',
      post: 'PRD-GATE done=true（门控通过）', edge: '门控通过',
      why: '上游缺东西就开工 = 白干，先检查再动手',
    },
    {
      id: 2, name: 'checkpoint + prepare', label: '断点 + 备料',
      action: '看状态文件判断是否断点续传；读配置拿 spec_id，读摘要拿文件清单',
      post: 'spec_id + 输入清单就绪', edge: 'spec_id + 文件清单',
      why: '跑一半断了可以接着跑，不用重头再来',
    },
    {
      id: 3, name: 'brief-gen + user-confirm', label: '生成任务包 + 用户确认',
      action: '给 Plan Agent 打包输入（产品类型 + 文件清单 + CLQ 状态），向用户展示工作流概览等确认',
      post: '用户确认后才开工', edge: '工作流概览 → 用户确认',
      why: '大工程先让用户看清要跑什么、怎么跑，再动手',
      badges: [{ kind: 'amber', text: '用户确认' }],
    },
    {
      id: 4, name: 'Phase 0 Plan', label: '规划（Plan）',
      action: '单个 AI：定产品类型锚点、裁剪章节结构、预分配需求编号、生成文件覆盖索引',
      post: 'prd-anchor-list.md + fc-index + line-hints', edge: '锚点清单 + 编号预分配',
      why: '先定「从哪抽、抽什么、编号怎么排」，后面才能并行',
      badges: [{ kind: 'cyan', text: '单 Worker' }],
    },
    {
      id: 5, name: 'Phase 1 Extract', label: '抽取（Extract ×7 并发）',
      action: '按锚点把上游文档分段，7 个 AI 并行精读抽需求，每个 Worker 自检后输出',
      post: 'partial-extract-*.md（分段抽取稿）', edge: '分段抽取稿',
      why: '文档量大，并行读快；每段独立自检，问题早暴露',
      badges: [{ kind: 'cyan', text: '并发 ×7' }],
    },
    {
      id: 6, name: 'Phase 2 Merge', label: '合并（Merge + Finalizer）',
      action: '全批 AI 按功能域分组合并去重 → 单个 Finalizer 收编成统一底稿，质量评分',
      post: 'prd-merged.md（统一底稿）', edge: '合并底稿',
      why: '多段抽取会有重复/冲突，合并成一份干净的中间稿',
    },
    {
      id: 7, name: 'Phase 3 Generate', label: '生成（Generate ×3 并行）',
      action: '3 个 AI 分 A/B/C 三个区段写 PRD 正文（A: 封面+1-2章+附录；B: 功能详解前半；C: 后半+非功能），master 拼接 + GQ 门控',
      post: 'prd-trainees-2026.md（373 条）', edge: 'PRD 初稿',
      why: '章节多，三区并行写再拼接，比一个 AI 从头写到底快',
      badges: [{ kind: 'cyan', text: '并发 ×3' }],
    },
    {
      id: 8, name: 'Phase 4 Review + sign-off', label: '审查 + 人工签署',
      action: 'AI 预审（pre 审底稿 / post 审成品，共 7 项 RQ 规则）→ 人工看结果签署：通过/驳回/带条件通过',
      post: 'review-report-prd + 人工签署', edge: '审查报告 → 通过后进下游',
      why: 'PRD 是一切需求的源头，AI 审完必须人来拍板——「人在回路」',
      badges: [{ kind: 'amber', text: '人工签署' }],
    },
    {
      id: 9, name: 'finalize + suggest-next', label: '收尾 + 建议下一步',
      action: '更新台账标记完成、提交；建议下一步 sys-analysis',
      post: '全部 Phase done + commit', edge: 'PRD 规格书 → 交给下游',
      why: '收尾留档，让下游知道「可以开工了」',
      badges: [{ kind: 'green', text: 'git commit' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '会话启动', icon: '▶', color: 'blue', sub: '建台账' },
    { id: 1, name: '门控检查', icon: '🔒', color: 'amber', sub: '校验上游' },
    { id: 2, name: '断点+备料', icon: '↻', color: 'blue', sub: 'spec_id 就绪' },
    { id: 3, name: '任务包+确认', icon: '📦', color: 'blue', sub: '用户确认' },
    { id: 4, name: 'Plan 规划', icon: '📋', color: 'cyan', sub: '锚点+编号' },
    { id: 5, name: 'Extract 抽取', icon: '🤖', color: 'cyan', sub: '并发 ×7' },
    { id: 6, name: 'Merge 合并', icon: '🧩', color: 'cyan', sub: '统一底稿' },
    { id: 7, name: 'Generate 生成', icon: '✍️', color: 'cyan', sub: '并发 ×3' },
    { id: 8, name: 'Review 审查', icon: '🔍', color: 'amber', sub: '人工签署' },
    { id: 9, name: '收尾+提交', icon: '✅', color: 'green', sub: 'commit' },
  ],
  flowTutor: {
    question: '考官问「为什么 PRD 要 5 个 Phase 而不是一个 AI 全干？」怎么答？',
    answer: (
      <span>
        原因和 init 一样是「上下文装不下」：373 条需求 + 上游文档量巨大，一个 AI 全程会崩。
        所以拆成 5 个 Phase：<b>规划 → 抽取（并发 7）→ 合并 → 生成（并发 3）→ 审查</b>，
        每 Phase 独立校验（EQ/MQ/GQ/RQ），问题在哪一步就在哪一步修。这就是「AI 协同」在 SYS.1 的形态。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'parse-summary.md', role: 'init 的解析摘要（文件清单）' },
      { name: 'parsed/', role: 'init 的干净副本（需求抽取来源）' },
      { name: 'clq-sys-matrix', role: 'clarify 的澄清矩阵（无 blocking 才能进）' },
      { name: 'yxspec.json', role: '项目配置（spec_id，决定产物命名）' },
    ],
    inputKeyline: '最关键输入是 <Hl>澄清矩阵（无 blocking）</Hl>——blocking 没清完，PRD 不能开工。',
    outputs: [
      { name: 'prd-trainees-2026.md', role: '产品需求规格书（373 条：F219 + NFR154）' },
      { name: 'prd-anchor-list.md', role: '锚点清单（产品类型 + 章节结构 + 编号预分配）' },
      { name: 'prd-merged.md', role: '合并底稿（Generate 的输入）' },
      { name: 'review-report-prd', role: '审查报告（RQ-1~7）' },
      { name: 'task_prd.md', role: '任务台账（5 阶段记录）' },
    ],
    outputKeyline: '核心输出链：<Hl>锚点 → 抽取稿 → 合并稿 → PRD → 审查报告</Hl>，一步一个文件，全部可追溯。',
    callGraphs: [
      {
        title: '命令级 · prd-analysis 与上下游的关系',
        color: 'cyan',
        from: { id: 'prd', cmd: '/yxspec:prd-analysis', sub: 'SYS.1 · 产品需求分析', desc: '把澄清后的输入加工成 PRD，交给系统需求分析' },
        tos: [
          { id: 'up-clarify', cmd: 'clarify', edge: '澄清矩阵（无 blocking）', edgeDesc: 'CLQ 全闭环', desc: '上游：clarify 把 45 条歧义全部澄清，PRD 才能开工（gate 校验）。' },
          { id: 'down-sys', cmd: 'sys-analysis', edge: 'PRD 规格书（373 条）', edgeDesc: '需求源头', desc: '下游：系统需求分析以 PRD 为输入，逐条转成系统需求 SR。' },
          { id: 'side-review', cmd: 'yxspec:review prd_analysis', edge: '审查报告', edgeDesc: 'AI 预审 + 人工签署', desc: '阶段审查：PRD 过审（技术 + 质量双签）才能进下游。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个 Phase 干活',
        color: 'blue',
        from: { id: 'orch', cmd: '编排器（命令）', sub: '5 个 Phase 逐个推进', desc: '读 Agent 定义 → spawn → 读质量门结果 → 判定' },
        tos: [
          { id: 'plan-agent', cmd: 'yxspec-prd-plan', edge: 'Phase 0 · 规划', edgeDesc: '单 Worker', desc: '定产品类型锚点、裁剪章节、预分配编号，输出 prd-anchor-list.md。' },
          { id: 'extract-agent', cmd: 'yxspec-prd-extract-worker', edge: 'Phase 1 · 抽取 ×7', edgeDesc: 'sliding-window 并发 7', desc: '分段精读上游文档抽需求，自检后输出 partial-extract-*.md。' },
          { id: 'merge-agent', cmd: 'yxspec-prd-merge-worker + finalizer', edge: 'Phase 2 · 合并', edgeDesc: '全批并行 + 单 Finalizer', desc: '按功能域合并去重成 prd-merged.md，Finalizer 收编打分。' },
          { id: 'gen-agent', cmd: 'yxspec-prd-generate-worker', edge: 'Phase 3 · 生成 ×3', edgeDesc: 'A/B/C 三区并行', desc: '分三区写 PRD 正文，master 拼接 + GQ 门控，产出最终 PRD。' },
          { id: 'review-agent', cmd: 'yxspec-prd-review', edge: 'Phase 4 · 审查', edgeDesc: 'pre + post 双模式', desc: 'AI 预审（RQ-2/3/4 审底稿 + RQ-1/5/6/7 审成品），输出 review-report。' },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（5 个 Phase 谁在干活）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:prd-analysis' },
      { seg: 'input', label: '澄清矩阵 + parsed/' },
      { seg: 'script', label: 'gate' },
      { seg: 'worker', label: 'Plan ×1' },
      { seg: 'worker', label: 'Extract ×7' },
      { seg: 'worker', label: 'Merge' },
      { seg: 'output', label: 'prd-merged.md' },
      { seg: 'worker', label: 'Generate ×3' },
      { seg: 'output', label: 'prd-trainees-2026.md (373 条)' },
      { seg: 'worker', label: 'Review' },
      { seg: 'output', label: 'review-report-prd + SIGNOFF' },
    ],
    pipeKeyline: '蓝色=脚本 · 琥珀=Worker（AI）· 绿色=产物——一眼看清「脚本门控 + AI 干活」的分工。',
    qualityGates: [
      { code: 'EQ', name: '抽取质量门', phase: 'Phase 1', check: 'WQ-1~5：来源可溯、需求完整、无编造', outcome: 'pass' },
      { code: 'MQ', name: '合并质量门', phase: 'Phase 2', check: '去重保留率、冲突处理、覆盖完整', outcome: 'pass' },
      { code: 'GQ', name: '生成质量门', phase: 'Phase 3', check: 'gq5 得分 82.5 / gq8 保真 / gq11 覆盖', outcome: 'GREEN' },
      { code: 'RQ', name: '审查规则', phase: 'Phase 4', check: 'RQ-1~7 逐项（完整性/格式/OI 覆盖）', outcome: 'passed' },
    ],
    gateNote: '对比 init/clarify：init 是「每步 gate 一次」，PRD 是「每 Phase 一个独立质量门 + retry ≤3 轮」——粒度更大，但每道门都是多规则复合检查。这是从「单命令校验」到「流水线质量体系」的升级。',
    failures: [
      { fault: 'gate passed=false', action: '缺 parse-summary 或 parsed/ 或 blocking CLQ → 回上游补' },
      { fault: 'Extract 自检 failed', action: 'WQ-3/4/5 → 重 spawn（≤3 轮）' },
      { fault: 'Merge verdict=RED', action: '回退 Merge 重做（≤3 轮）' },
      { fault: 'Generate GQ 未全过', action: '可自动修复项 → auto-fix 重生成；不可修复 → escalated 人工' },
      { fault: 'Review 驳回', action: '路由到对应 Phase 修复，重新 Generate + Review（≤3 轮）' },
    ],
  },
  ioTutor: {
    question: '答辩时 prd-analysis 的调用关系怎么讲？',
    answer: (
      <span>
        「prd-analysis 消费 clarify 的澄清矩阵 + parsed/ 副本，命令推进 5 个 Phase：Plan（1 个）→ Extract（并发 7）→ Merge → Generate（并发 3）→ Review（pre+post 双模式）。
        每 Phase 由 prd_verify.py 门控 + Agent 自检，EQ/MQ/GQ/RQ 四连全过 + 人工签署，产出 prd-*.md 给下游 sys-analysis。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'prd-trainees-2026.md', kind: 'cyan', what: '373 条需求：功能 219 + 非功能 154（P48/H51/M23/T18/R14）', who: 'sys-analysis 的输入——系统需求源头' },
    { name: 'prd-anchor-list.md', kind: 'cyan', what: '锚点清单：产品类型 + 章节结构 + 编号预分配 + 文件覆盖索引', who: 'Plan 阶段的规划依据' },
    { name: 'prd-merged.md', kind: 'amber', what: '合并底稿：抽取稿去重后的统一中间稿', who: 'Generate 阶段的输入' },
    { name: 'review-report-prd', kind: 'amber', what: '审查报告：RQ-1~7 逐项 + 5 条 findings', who: '质量证据 + 答辩' },
    { name: 'task_prd.md', kind: 'green', what: '任务台账：5 阶段全程记录', who: '门控放行 + 追溯证据链' },
  ],
  artifactsChain: '一句话串起来：<Hl>锚点（规划）→ 抽取稿（分段读）→ 合并稿（去重）→ PRD（373 条）→ 审查报告（放行）</Hl>。',
  samplesTitle: 'PRD 需求真实样例（点开看字段）',
  samples: [
    {
      id: 'REQ-F-001', badges: [{ kind: 'cyan', text: '功能 F' }], meta: 'FC-01 远程控车',
      title: '系统应支持通过平台下发控车指令（上电/熄火/寻车/设防/撤防）',
      fields: [
        { k: '描述', v: '支持平台通过 MQTT 下发控车指令，TBOX 收到后执行并回执结果' },
        { k: '来源', v: '01产品需求规格书 §4.1 产品功能表（远程控车）' },
        { k: '分类', v: 'F（功能）· 编号 REQ-F-000001' },
      ],
    },
    {
      id: 'NFR-P-01', badges: [{ kind: 'amber', text: '性能 P' }], meta: 'P48 之一',
      title: '控车指令执行回执时间应 ≤5 秒',
      fields: [
        { k: '描述', v: '从平台下发指令到 TBOX 回执结果的时延上限' },
        { k: '来源', v: '04开发协议 通讯协议（指令回执机制）' },
        { k: '分类', v: 'P（性能）· 编号 REQ-P-000048' },
      ],
    },
    {
      id: 'NFR-H-01', badges: [{ kind: 'blue', text: '硬件 H' }], meta: 'H51 之一',
      title: '休眠功耗应 ≤3mA（ACC OFF 且无任务时）',
      fields: [
        { k: '描述', v: '低功耗电源管理的休眠电流上限（来自 CLQ-0001 澄清答案）' },
        { k: '来源', v: '产品规格书 §3 + CLQ-0001 答案' },
        { k: '分类', v: 'H（硬件）· 编号 REQ-H-000051' },
      ],
    },
  ],
  samplesNote: '每条 PRD 需求都 derived_from 上游文档——这就是「零臆造」：需求不能凭空想象，必须能指出出处。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SYS.1 · 产品需求',
    title: '门控 · 追溯 · AI 协同（prd-analysis 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'clarify 怎么表现', 'prd-analysis 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '9 步两段式：每步先 gate 后 mark-done', '5 Phase 各带独立质量门（EQ/MQ/GQ/RQ）+ retry ≤3 轮'],
        ['<Badge kind="green">追溯</Badge>', 'CLQ ← AMB，答案写回副本', '每条 PRD 需求 derived_from 上游文档 + 编号全链'],
        ['<Badge kind="blue">AI 协同</Badge>', 'AI 缺席（LLM-free），人给答案', 'AI 密集：Plan/Extract/Merge/Generate 四个 Agent + 人工签署'],
      ],
    },
    sections: [
      {
        title: '质量门控：EQ → MQ → GQ → RQ 四连',
        type: 'ul',
        items: [
          'EQ（抽取）：WQ-1~5 —— 来源可溯、需求完整、无编造',
          'MQ（合并）：去重保留率、冲突处理、覆盖完整',
          'GQ（生成）：gq5 得分 82.5 / gq8 保真 / gq11 覆盖 —— 真实结果 all_pass',
          'RQ（审查）：RQ-1~7 逐项（完整性/格式/OI 覆盖）—— 真实结果 passed',
        ],
        keyline: '每道门由脚本校验 + Agent 自检，任一不过就回退对应 Phase，重试 ≤3 轮，超过升级人工。',
      },
      {
        title: '追溯链：SOR → PRD → SR',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'SOR' },
          { kind: 'output', label: 'parse-summary' },
          { kind: 'output', label: 'prd-anchor-list' },
          { kind: 'output', label: 'prd-merged' },
          { kind: 'output', label: 'prd-*.md (373 条)' },
          { kind: 'output', label: 'review-report' },
        ],
        keyline: '上游 <Hl>SOR</Hl> → <Hl>PRD</Hl>（本阶段）→ <Hl>SR</Hl>（下游系统需求）。每条需求都能沿着这条链找到源头。',
      },
      {
        title: 'AI 协同：四个 Agent 的分工',
        type: 'table',
        cols: ['Agent', 'Phase', '干什么', '并发'],
        rows: [
          ['<code>yxspec-prd-plan</code>', '0', '锚点裁剪 + 编号预分配', '×1'],
          ['<code>yxspec-prd-extract-worker</code>', '1', '分段精读抽需求', '×7 滑动窗口'],
          ['<code>yxspec-prd-merge-worker</code>', '2', '合并去重', '全批并行 + Finalizer'],
          ['<code>yxspec-prd-generate-worker</code>', '3', '分区写 PRD 正文', '×3（A/B/C）'],
          ['<code>yxspec-prd-review</code>', '4', 'AI 预审', 'pre + post 双模式'],
        ],
        keyline: '这是「AI 协同」最密集的一章：5 类 Agent 接力完成从规划到审查的全流程，脚本只在每 Phase 之间做确定性校验。',
      },
    ],
  },
};

export default prdChapter;
