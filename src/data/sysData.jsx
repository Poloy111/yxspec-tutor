/**
 * yxspec-tutor · sys-analysis 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/sys-analysis.md
 * 真实产物：project/specs/sys/sys-req-trainees-2026.md + task_sys_analysis.md + review-sys_analysis
 * 真实运行：2026-07-28 17:14 → 19:31（约 2h 17m 主流程）+ 07-30 审查闭环
 */

const sysChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:sys-analysis · SYS.2 · 系统需求分析',
    oneLiner:
      '把 PRD 的 373 条产品需求，逐条转成 374 条系统需求（SR）——从「产品要做什么」到「系统要实现什么」，为系统架构设计提供输入。',
    analogy:
      '把 PRD 想象成「客户的需求清单」，sys-analysis 是「产品经理转工程师需求」：每条客户需求（比如「支持远程控车」）被翻译成一条条系统能验证的技术需求（「系统应能通过平台下发指令，5 秒内执行并回执」）。输出的 374 条系统需求，是后面软硬件设计的分工依据。',
    memoryLine: '记住：<Hl>sys-analysis = 从「产品要做什么」到「系统要实现什么」</Hl>——374 条 SR，系统架构的输入。',
    purpose: {
      oneLiner:
        '把产品级需求（PRD）转成系统级需求（SR）：374 条，按功能 F220 / 性能 P48 / 硬件 H51 / 机械 M23 / 测试 T18 / 法规 R14 分类，每条都能追溯到 PRD 条目。',
      input: {
        title: '3 类',
        items: [
          'prd-trainees-2026.md —— PRD（373 条：F219 + NFR154）',
          'parsed/sys/ 参考文档 —— 芯片 DS / 架构基线',
          'clq-sys-matrix —— 系统级澄清矩阵',
        ],
        note: 'gate 校验：PRD 在 + 无 blocking CLQ；binding 缺失只警告不阻塞',
      },
      processTitle: '6 步，全自动',
      process: [
        '① 切批：按 PRD 功能域把 373 条切成 8 个 batch（每 Worker 1~3 个分类）',
        '② 并行抽取：5 个 AI 滑动窗口并行，把每条 PRD 转成 SR（含编号、分类、可验证描述）',
        '③ 合并去重：Finalizer 把 8 份抽取稿合并成统一 sys-merged.yaml',
        '④ 编号分片：按 6 类（F/P/H/M/T/R）分片成 sys-partition-*.yaml',
        '⑤ 章节生成：6 个 AI 并发生成各分类章节',
        '⑥ 装配 + 质量门：Finalizer 拼成 sys-req 规格书，跑质量门（GREEN）',
      ],
      outputsTitle: '3 样（下游全靠它们）',
      outputs: [
        { name: 'sys-req-trainees-2026.md', what: '系统需求规格书：374 条 SR（F220/P48/H51/M23/T18/R14）', consumer: 'sys-arch 架构设计 + 软硬件分工' },
        { name: 'quality-report-batch*.md', what: '各 batch 的 Worker 质量报告', consumer: '质量门 + 追溯' },
        { name: 'task_sys_analysis.md', what: '任务台账：5 条任务记录', consumer: '门控放行 + 证据链' },
      ],
      value: [
        '从「产品要什么」到「系统要实现什么」的关键一跳——SR 是系统架构的输入',
        '374 条 SR 全部可追溯到 PRD（derived_from），全流程追溯链继续延伸',
        '分类齐全：功能/性能/硬件/机械/测试/法规，软硬件分工时各取所需',
      ],
      boundary: [
        '不管「系统怎么设计成几大块」——那是 sys-arch 的事',
        '不管「软件怎么实现」——那是 swe-analysis 的事',
        'sys-analysis 只回答「系统要实现什么」，不回答「怎么设计实现」',
      ],
      example:
        'PRD 里「支持远程控车」→ SR 转成「系统应支持接收平台下发的控车指令（上电/熄火/寻车/设防/撤防），5 秒内执行并回执结果」，并打上分类 F（功能）。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '项目经理', who: '/yxspec:sys-analysis 命令', does: '按顺序推进 2 个 Phase，每步读质量门结果判定继续/重试/停止' },
      { kind: 'cyan', role: '翻译员', who: 'yxspec-sys-analysis-worker ×5（8 batch）', does: '把每条 PRD 转成 SR，自检自修复后输出' },
      { kind: 'amber', role: '总编辑', who: 'yxspec-sys-analysis-finalizer', does: '合并去重 → 分片 → 章节生成 → 装配 + 质量门' },
    ],
    whyTitle: '为什么要这样分工？（为什么切批 + Finalizer 收编）',
    whyShell: [
      '为什么用「切批 + 并行」？—— 373 条需求一次转不完，按功能域切片，5 个 AI 并行又快又稳',
      '为什么 4 个 Finalizer 子阶段串行？—— 合并→分片→章节→装配有依赖，必须一步步来',
      '为什么质量门要 GREEN？—— 编号连续、覆盖率、颗粒度、可推导性四项全过，才能保证下游架构有据可依',
    ],
    whyMemory: '记住 <Hl>「Worker 并行转 + Finalizer 串行收编」</Hl>——并行使快，串行使稳。',
    instance: {
      stats: [
        { num: '2h 17m', label: '主流程耗时', desc: '17:14 → 19:31', kind: 'cyan' },
        { num: '374', label: '条系统需求 SR', desc: 'F220/P48/H51/M23/T18/R14', kind: 'cyan' },
        { num: '8', label: '个 batch', desc: '按功能域切片', kind: 'cyan' },
        { num: '5', label: '并发 Worker', desc: 'sliding-window', kind: 'cyan' },
        { num: 'GREEN', label: '质量门', desc: '4 项全过', kind: 'green' },
      ],
      memoryLine: '记住这 4 个数字：<Hl>2 小时 17 分、374 条 SR、8 个 batch、质量门 GREEN</Hl>。答辩时说「374 条 SR 全部可追溯到 PRD，审查 approved 双签」就是一句话结论。',
    },
    downstream: ['SYS-REQ 规格书 → sys-arch', '质量报告 → 质量门', '任务台账 → 证据链'],
    downstreamLine: '一句话：<Hl>SYS-REQ 是「系统架构的输入」</Hl>——后面 sys-arch 按 374 条 SR 设计 14 个子系统。',
    ironRules: [
      '<b>PRD 不在不开工</b> —— gate 校验 PRD 存在 + 无 blocking CLQ',
      '<b>Worker 自检自修复</b> —— 每个 batch 输出前先自检，failed 重跑 ≤2 轮',
      '<b>Finalizer 串行收编</b> —— 4a→4b→4c→4d 有依赖，必须一步步来',
      '<b>质量门 GREEN/YELLOW 才放行</b> —— RED 回退修复 ≤3 轮',
      '<b>不编造</b> —— 每条 SR 必须 derived_from PRD 条目',
    ],
    tutor: {
      question: '考官问「sys-analysis 和 prd-analysis 的分工区别？」怎么答？',
      answer: (
        <span>
          <b>prd-analysis 回答「产品要做什么」</b>（373 条产品需求，面向客户价值），
          <b>sys-analysis 回答「系统要实现什么」</b>（374 条系统需求，面向技术实现）。
          PRD 从上游文档抽取，SR 从 PRD 转换；PRD 是 5 Phase 全 Agent 流程，SR 是「Worker 并行转 + Finalizer 串行收编」两 Phase 流程。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '两 Phase 流程 · Worker 并行 + Finalizer 收编',
  flowTitle: '执行流程：10 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>箭头上的标签 = 传给下一步的产物</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'session-open', label: '会话启动',
      action: '建任务台账（task_sys_analysis.md）',
      post: 'task_sys_analysis.md', edge: '任务台账（记录已开）',
      why: '所有步骤的记录要有汇总的地方',
    },
    {
      id: 1, name: 'gate-check', label: '门控检查',
      action: '校验 PRD 存在 + 无 blocking CLQ + binding 状态（缺失仅警告）',
      post: 'passed=true', edge: '门控通过',
      why: '上游 PRD 不在或还有 blocking，开工就是白干',
    },
    {
      id: 2, name: 'checkpoint + prepare', label: '断点 + 备料',
      action: '查任务文件判断续传；读配置、PRD、参考文档、CLQ 矩阵',
      post: '输入清单就绪', edge: 'PRD + 参考文档',
      why: '跑一半能接着跑；先把输入备齐',
    },
    {
      id: 3, name: 'brief-gen + user-confirm', label: '生成任务包 + 用户确认',
      action: '按功能域动态切 8 个 batch，生成 Worker 任务包；展示概览等用户确认',
      post: '批次方案 + 用户确认', edge: '8 个 batch 方案',
      why: '让用户看清怎么切批、几个并发，再开工',
      badges: [{ kind: 'amber', text: '用户确认' }],
    },
    {
      id: 4, name: 'Phase 1 Worker 分解', label: '并行转 SR（×5 并发 / 8 batch）',
      action: '5 个 AI 滑动窗口并行：每个 batch 把 PRD 条目转成 SR，自检自修复后输出',
      post: 'sys-extract-batch*-checked.md（8 份）', edge: '8 份抽取稿',
      why: '并行转得快；每个 Worker 自检，问题早暴露',
      badges: [{ kind: 'cyan', text: '并发 ×5' }],
    },
    {
      id: 5, name: 'Phase 2a 合并去重', label: 'Finalizer 收编 · 合并',
      action: '把 8 份抽取稿合并成统一 sys-merged.yaml（去重 + 冲突处理）',
      post: 'sys-merged.yaml', edge: '合并稿',
      why: '多份抽取有重复/冲突，先合并成一份干净的',
      badges: [{ kind: 'cyan', text: 'Finalizer' }],
    },
    {
      id: 6, name: 'Phase 2b 编号分片', label: 'Finalizer 收编 · 分片',
      action: '按 6 类（F/P/H/M/T/R）把合并稿分片成 sys-partition-*.yaml',
      post: 'sys-partition-{class}.yaml（6 份）', edge: '6 份分片',
      why: '按类分片，每类章节可以并行生成',
      badges: [{ kind: 'cyan', text: 'Finalizer' }],
    },
    {
      id: 7, name: 'Phase 2c 章节生成', label: 'Finalizer 收编 · 章节（×6 并发）',
      action: '6 个 AI 并发按分片生成各分类章节（F/P/H/M/T/R）',
      post: 'sys-section-{class}.md', edge: '6 份章节稿',
      why: '6 类互不依赖，并行生成快',
      badges: [{ kind: 'cyan', text: '并发 ×6' }],
    },
    {
      id: 8, name: 'Phase 2d 装配 + 质量门', label: 'Finalizer 收编 · 装配',
      action: '拼成 sys-req 规格书，跑质量门：编号连续 / 覆盖率 / 颗粒度 / 可推导性',
      post: 'sys-req-trainees-2026.md（374 条，质量门 GREEN）', edge: 'SYS-REQ 规格书 → 交给下游',
      why: '装配后四项质量门全过，才能保证下游架构有据可依',
      badges: [{ kind: 'green', text: '质量门 GREEN' }],
    },
    {
      id: 9, name: 'finalize + suggest-next', label: '收尾 + 建议下一步',
      action: '更新台账、提交；建议下一步 review sys_analysis 或 sys-arch',
      post: 'done + commit', edge: 'SYS-REQ → 系统架构',
      why: '收尾留档，让下游知道可以开工',
      badges: [{ kind: 'green', text: 'git commit' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '会话启动', icon: '▶', color: 'blue', sub: '建台账' },
    { id: 1, name: '门控检查', icon: '🔒', color: 'amber', sub: 'PRD 在 + 无 blocking' },
    { id: 2, name: '断点+备料', icon: '↻', color: 'blue', sub: '输入就绪' },
    { id: 3, name: '任务包+确认', icon: '📦', color: 'blue', sub: '8 batch 方案' },
    { id: 4, name: 'Worker 转 SR', icon: '🤖', color: 'cyan', sub: '并发 ×5' },
    { id: 5, name: '合并去重', icon: '🧩', color: 'cyan', sub: 'sys-merged' },
    { id: 6, name: '编号分片', icon: '🗂️', color: 'cyan', sub: '6 类分片' },
    { id: 7, name: '章节生成', icon: '✍️', color: 'cyan', sub: '并发 ×6' },
    { id: 8, name: '装配+质量门', icon: '⚖️', color: 'amber', sub: 'GREEN' },
    { id: 9, name: '收尾+提交', icon: '✅', color: 'green', sub: 'commit' },
  ],
  flowTutor: {
    question: '考官问「sys-analysis 的 Worker 和 Finalizer 是怎么配合的？」怎么答？',
    answer: (
      <span>
        <b>Worker 负责「转」</b>：5 个并发把 8 个 batch 的 PRD 条目转成 SR，每个自检自修复后输出；
        <b>Finalizer 负责「收」</b>：串行 4 子阶段（合并 → 分片 → 章节 ×6 并发 → 装配 + 质量门），最后产出 374 条 SR 的规格书。
        一个管广（并行覆盖），一个管深（串行保证质量），这就是「分工协同」。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'prd-trainees-2026.md', role: 'PRD（373 条：F219 + NFR154）—— 转 SR 的来源' },
      { name: 'parsed/sys/', role: '芯片 DS / 架构基线参考文档' },
      { name: 'clq-sys-matrix', role: '系统级澄清矩阵（无 blocking 才能进）' },
    ],
    inputKeyline: '最关键输入是 <Hl>PRD 规格书</Hl>——gate 校验它存在 + 无 blocking CLQ。',
    outputs: [
      { name: 'sys-req-trainees-2026.md', role: '系统需求规格书（374 条：F220/P48/H51/M23/T18/R14）' },
      { name: 'sys-merged.yaml', role: '合并底稿（去重后）' },
      { name: 'sys-partition-*.yaml', role: '按类分片（6 份）' },
      { name: 'sys-extract-batch*-checked.md', role: '8 份 Worker 抽取稿' },
      { name: 'quality-report-batch*.md', role: '各 batch 质量报告' },
      { name: 'task_sys_analysis.md', role: '任务台账（5 条任务记录）' },
    ],
    outputKeyline: '核心输出链：<Hl>抽取稿 → 合并稿 → 分片 → 章节 → SYS-REQ</Hl>，一步一个文件，全部可追溯。',
    callGraphs: [
      {
        title: '命令级 · sys-analysis 与上下游的关系',
        color: 'cyan',
        from: { id: 'sys', cmd: '/yxspec:sys-analysis', sub: 'SYS.2 · 系统需求分析', desc: '把 PRD 产品需求转成系统需求 SR' },
        tos: [
          { id: 'up-prd', cmd: 'prd-analysis', edge: 'PRD 规格书（373 条）', edgeDesc: '需求源头', desc: '上游：PRD 是唯一的输入源头，gate 校验它存在 + 无 blocking CLQ。' },
          { id: 'down-arch', cmd: 'sys-arch', edge: 'SYS-REQ（374 条 SR）', edgeDesc: '架构设计输入', desc: '下游：系统架构设计以 SR 为输入，设计 14 个子系统。' },
          { id: 'down-hwe', cmd: 'hwe-analysis', edge: 'SR 中硬件类（H51）', edgeDesc: '硬件需求', desc: '旁支：硬件类 SR 供硬件需求分析参考（与软件需求并行）。', dashed: true },
          { id: 'side-review', cmd: 'yxspec:review sys_analysis', edge: '审查报告', edgeDesc: 'AI 预审 + 人工双签', desc: '阶段审查：25 项 CHK-SR 检查，approved 双签放行。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个 Phase 干活',
        color: 'blue',
        from: { id: 'orch', cmd: '编排器（命令）', sub: '2 Phase 推进', desc: '读 Agent 定义 → spawn → 读质量门结果 → 判定' },
        tos: [
          { id: 'worker', cmd: 'yxspec-sys-analysis-worker', edge: 'Phase 1 · 转 SR ×8 batch', edgeDesc: 'sliding-window 并发 5', desc: '每个 batch 把 PRD 条目转成 SR，自检自修复，输出 checked 稿 + 质量报告。' },
          { id: 'finalizer', cmd: 'yxspec-sys-analysis-finalizer', edge: 'Phase 2 · 收编 4 子阶段', edgeDesc: '4a 合并 → 4b 分片 → 4c 章节 ×6 → 4d 装配', desc: '串行收编：合并去重 → 编号分片 → 章节生成 → 装配 + 质量门 GREEN。' },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（Worker 转 + Finalizer 收）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:sys-analysis' },
      { seg: 'input', label: 'PRD (373 条)' },
      { seg: 'script', label: 'gate' },
      { seg: 'worker', label: 'Worker ×5 (8 batch)' },
      { seg: 'script', label: 'binding-check' },
      { seg: 'output', label: 'sys-extract-batch*-checked.md ×8' },
      { seg: 'worker', label: 'Finalizer 4a 合并' },
      { seg: 'output', label: 'sys-merged.yaml' },
      { seg: 'worker', label: '4b 分片' },
      { seg: 'output', label: 'sys-partition-*.yaml ×6' },
      { seg: 'worker', label: '4c 章节 ×6' },
      { seg: 'worker', label: '4d 装配 + 质量门' },
      { seg: 'output', label: 'sys-req-trainees-2026.md (374 SR)' },
    ],
    pipeKeyline: '蓝色=脚本 · 琥珀=Worker（AI）· 绿色=产物——一眼看清「脚本门控 + AI 干活」的分工。',
    qualityGates: [
      { code: '外门', name: 'batch 外门', phase: 'Phase 1', check: '8 batch 全过外门 PASS', outcome: 'pass' },
      { code: 'A.3', name: '装配质量门', phase: 'Phase 2d', check: '编号连续 / 覆盖率 / 颗粒度 / 可推导性', outcome: 'GREEN' },
    ],
    gateNote: '对比 prd-analysis：PRD 是 4 道门（EQ/MQ/GQ/RQ）覆盖 5 个 Phase；sys-analysis 是「8 batch 外门 + 装配 A.3 门」两道，因为 SR 转换相对单纯，门控聚焦在装配质量。',
    failures: [
      { fault: 'gate passed=false', action: 'PRD 缺失或 blocking CLQ → 回上游补' },
      { fault: 'batch failed (retries<2)', action: '重 spawn 该 Worker' },
      { fault: 'batch failed (retries≥2)', action: '标记 failed 并继续（不阻塞全流程）' },
      { fault: 'binding 过期', action: '输出 WARN，质量门降级 YELLOW，不阻塞' },
      { fault: '质量门 RED', action: '回退修复（≤3 轮）' },
    ],
  },
  ioTutor: {
    question: '答辩时 sys-analysis 的调用关系怎么讲？',
    answer: (
      <span>
        「sys-analysis 消费 PRD（373 条），命令推进 2 个 Phase：<b>Phase 1</b> 5 个 Worker 并发把 8 个 batch 转成 SR（自检自修复）；
        <b>Phase 2</b> Finalizer 串行 4 子阶段收编（合并 → 分片 → 章节 ×6 → 装配 + 质量门 GREEN），产出 sys-req-*.md（374 条）给下游 sys-arch。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sys-req-trainees-2026.md', kind: 'cyan', what: '374 条 SR：F220/P48/H51/M23/T18/R14，每条 derived_from PRD', who: 'sys-arch 架构设计输入——系统级源头' },
    { name: 'sys-merged.yaml', kind: 'cyan', what: '合并底稿：8 份抽取稿去重后的统一稿', who: '分片阶段的输入' },
    { name: 'sys-partition-*.yaml', kind: 'amber', what: '按类分片：6 份（F/P/H/M/T/R）', who: '章节生成阶段的输入' },
    { name: 'sys-extract-batch*-checked.md', kind: 'amber', what: '8 份 Worker 抽取稿（自检后）', who: '合并阶段的输入' },
    { name: 'quality-report-batch*.md', kind: 'amber', what: '各 batch 质量报告', who: '质量门 + 追溯' },
    { name: 'task_sys_analysis.md', kind: 'green', what: '任务台账：5 条任务记录', who: '门控放行 + 追溯证据链' },
  ],
  artifactsChain: '一句话串起来：<Hl>抽取稿（Worker 转）→ 合并稿（去重）→ 分片（6 类）→ 章节（并行生成）→ SYS-REQ（374 条）</Hl>。',
  samplesTitle: 'SR 真实样例（点开看字段）',
  samples: [
    {
      id: 'SR-F-001', badges: [{ kind: 'cyan', text: '功能 F' }], meta: 'F220 之一',
      title: '系统应支持经 BLE 组网向蓝牙中控下发控车指令集（设防/撤防/启停/座桶/寻车/静音/强锁）',
      fields: [
        { k: '来源', v: 'REQ-F-020019（PRD 控车指令集条目）' },
        { k: '分类', v: 'F（功能）· 编号 SYS-F-020019' },
        { k: '可验证', v: 'TSP/APP 发起控车请求，TBOX 经 BLE 0x30F0 IND 下发 0x01~0x0A 指令集，蓝牙中控执行对应动作' },
      ],
    },
    {
      id: 'SR-F-002', badges: [{ kind: 'cyan', text: '功能 F' }], meta: 'F220 之一',
      title: '系统应支持低功耗电源管理：休眠待机电流 ≤3mA（设防 + 无振动 N 分钟进入）',
      fields: [
        { k: '来源', v: 'REQ-F-050003（PRD 低功耗电源管理条目 + CLQ-0001 答案）' },
        { k: '分类', v: 'F（功能）· 编号 SYS-F-050003' },
        { k: '可验证', v: '设防 + 无振动 N 分钟后测量休眠待机电流 ≤3mA（SM-02 SLEEP 模式）' },
      ],
    },
    {
      id: 'SR-F-003', badges: [{ kind: 'cyan', text: '功能 F' }], meta: 'F220 之一',
      title: '系统应满足 GB_17761-2024 北斗定位功能异常自检要求',
      fields: [
        { k: '来源', v: 'REQ-F-040011（PRD 北斗定位自检条目，源 02法规要求 GB_17761-2024）' },
        { k: '分类', v: 'F（功能）· 编号 SYS-F-040011' },
        { k: '可验证', v: '模拟北斗模块故障/无法采集卫星信号，可检出异常并置位异常状态标志' },
      ],
    },
  ],
  samplesNote: '每条 SR 都 derived_from PRD 条目——追溯链 SOR → PRD → SR 在此闭合。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SYS.2 · 系统需求',
    title: '门控 · 追溯 · AI 协同（sys-analysis 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'prd-analysis 怎么表现', 'sys-analysis 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '5 Phase 各带 EQ/MQ/GQ/RQ 四道门', '2 Phase：8 batch 外门 + 装配 A.3 门（GREEN）'],
        ['<Badge kind="green">追溯</Badge>', '每条 PRD 需求 derived_from 上游文档', '每条 SR derived_from PRD 条目——SOR→PRD→SR 闭合'],
        ['<Badge kind="blue">AI 协同</Badge>', '5 类 Agent 接力（Plan/Extract/Merge/Generate/Review）', '2 类 Agent：Worker 并行转 + Finalizer 串行收编'],
      ],
    },
    sections: [
      {
        title: '追溯链：SOR → PRD → SR 闭合',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'SOR' },
          { kind: 'output', label: 'init 解析' },
          { kind: 'output', label: 'clarify 澄清' },
          { kind: 'output', label: 'PRD (373 条)' },
          { kind: 'output', label: 'SR (374 条)' },
        ],
        keyline: '每一跳都有 derived_from：SR ← PRD ← 澄清答案/上游文档 ← SOR。全流程追溯链在此闭合到系统级。',
      },
      {
        title: 'AI 协同：Worker 转 + Finalizer 收',
        type: 'table',
        cols: ['Agent', 'Phase', '干什么', '并发'],
        rows: [
          ['<code>yxspec-sys-analysis-worker</code>', '1', '把 PRD 条目转成 SR，自检自修复', '×5 滑动窗口（8 batch）'],
          ['<code>yxspec-sys-analysis-finalizer</code>', '2', '合并去重 → 分片 → 章节 → 装配 + 质量门', '4 子阶段串行，4c 章节 ×6'],
        ],
        keyline: '「Worker 管广（并行覆盖）、Finalizer 管深（串行保质量）」——这是 SYS.2 的协同分工。',
      },
      {
        title: 'review sys_analysis 的 25 项检查',
        type: 'ul',
        items: [
          '审查依据：review-sys_analysis.yaml（25 项 CHK-SR + CHK-COMMON-TBD-001）',
          '审查方式：AI 预审 + 人工确认（技术 + 质量双签）',
          '真实结果：approved（V1.0 AI 审 → V1.1 人工确认闭环 conditional→approved，DEV-001 接受）',
          '双签放行条件 4/4 满足',
        ],
        keyline: '阶段审查（review）是每个阶段产物进下游前的「关卡」——这就是 SUP.1 过程域。',
      },
    ],
  },
};

export default sysChapter;
