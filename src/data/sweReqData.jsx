/**
 * yxspec-tutor · swe-analysis 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/swe-analysis.md（V2.9 PRD 直达版）
 * 真实产物：project/specs/sw-srs/sw-srs-trainees-2026.md + verify + task_sw_req.md
 * 真实运行：2026-07-28 20:06 → 07-29 09:00（含跨夜）+ commit 358bdaa3
 */

const sweReqChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-analysis · SWE.1 · 软件需求分析（PRD 直达版）',
    oneLiner:
      '把 PRD 的 373 条产品需求，直接分解成 420 条软件需求（SWR：FUN 356 + IF 64）——跳过系统级，PRD 直达软件需求，软件实现的最源头。作为系统架构后的软件支，与硬件分析（HWE.1）并行开展。',
    analogy:
      '把 swe-analysis 想象成「软件需求翻译局」：PRD 是客户语言的需求清单，swe-analysis 用一套高度确定性的流水线（11 步，9 步脚本确定 + 2 步 AI）把每条 PRD 翻成软件团队能直接开工的 SWR——功能类（FUN）管「行为/安全/性能/资源」，接口类（IF）管「协议/报文/接口规约」。翻完有 46 项校验（V1~V35）把关。',
    memoryLine: '记住：<Hl>swe-analysis = PRD 直达软件需求（跳过系统级）</Hl>——420 条 SWR，46 项校验全 PASS。',
    purpose: {
      oneLiner:
        '把 PRD 373 条需求按 17 个域分解成 420 条 SWR（FUN 356 + IF 64）：AI 只做「需求分解」这一件事，其余 9 步全由确定性脚本执行，verify 46 项校验（PRD 覆盖 373/373、orphan 0）。',
      input: {
        title: '4 类输入',
        items: [
          'prd-trainees-2026.md —— PRD（373 条）',
          'swe-swr-config.yaml —— 项目配置（17 域分片方案）',
          'parsed/raw —— 原始文档（事实源）',
          'clq 澄清 —— 无 blocking 状态',
        ],
        note: 'gate 校验：PRD 在 + parsed/raw 非空 + config 在 + 无 blocking CLQ；pre-clarify 存在则自动注入',
      },
      processTitle: '11 步，9 步确定性 + 2 步 AI',
      process: [
        '① 确定性（9 步）：task-init → gate → parse-prd → 锚点预扫 → 分片（config 驱动）→ gen-briefs → merge → verify V1~V35 → finalize',
        '② AI 唯一非确定性点：Step 7 按域 spawn yxspec-swe-analysis Worker（17 域，模型 opus），把 PRD 条目分解为 SWR',
        '③ 收尾：git commit 入库（74 文件），SWFP-FINAL done',
      ],
      outputsTitle: '3 样（软件实现的最源头）',
      outputs: [
        { name: 'sw-srs-trainees-2026.md', what: '软件需求规格书：420 条 SWR（FUN 356 + IF 64），按 §4 FUN / §5 IF 两章组织', consumer: 'swe-arch 架构设计 + 编码' },
        { name: 'verify-sw-srs-trainees-2026.md', what: 'V1~V35 校验报告（49 PASS / 0 FAIL / 3 WARN）', consumer: '质量门 + 追溯' },
        { name: 'task_sw_req.md', what: '任务台账：SWFP-SESSION~FINAL', consumer: '门控放行 + 证据链' },
      ],
      value: [
        'PRD 全覆盖 373/373 + 零 orphan——每条 PRD 都有软件需求承接',
        '证据驱动：每条 SWR 的数字+单位必须带 § 章节号/TBD/链接（V21），反臆造',
        '确定性可复现：相同配置 ⇒ 相同 brief / merge / verify，审计友好',
      ],
      boundary: [
        '不管「软件怎么分成模块」——那是 swe-arch 的事',
        '不管「接口契约怎么定」——那是 swe-arch-if 的事',
        'swe-analysis 只回答「软件要实现什么」，产出需求不产出设计',
      ],
      example:
        'PRD「支持远程控车指令」→ FUN 类 SWR 承载行为与性能（5 秒执行），IF 类 SWR 承载控车协议报文（0x30F0），接口依赖字段指向 IF 条目。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '项目经理', who: '/yxspec:swe-analysis 命令', does: '按 11 步推进，Step 5 用户确认分片，Step 9 后处置 verify 失败' },
      { kind: 'cyan', role: '需求分解员', who: 'yxspec-swe-analysis Worker ×17 域', does: '把 PRD 条目分解为 SWR（唯一非确定性步骤，模型 opus）' },
      { kind: 'amber', role: '流水线脚本', who: 'pipeline.py（gate/parse/anchor/shard/briefs/merge/verify）', does: '9 步 100% 确定性：解析/分片/brief/合并/46 项校验' },
    ],
    whyTitle: '为什么要这样分工？（为什么 AI 只做一件事）',
    whyShell: [
      '为什么 AI 只做「需求分解」？—— 分解是唯一的创造性工作；解析/分片/合并/校验全确定性，可复现可审计',
      '为什么 17 个域并行 spawn？—— 域间无依赖（TSP/蓝牙/一线通/定位…），并发又快又稳',
      '为什么 verify 46 项？—— 覆盖/追溯/反臆造/章节/跳转治理五类，V1~V35 全 PASS 才放行',
    ],
    whyMemory: '记住 <Hl>「9 步确定性 + 1 步 AI + 46 项校验」</Hl>——AI 只翻译，机器来把关。',
    instance: {
      stats: [
        { num: '12h 54m', label: '总耗时', desc: '20:06 → 次 09:00（跨夜）', kind: 'cyan' },
        { num: '420', label: '条 SWR', desc: 'FUN 356 + IF 64', kind: 'cyan' },
        { num: '17', label: '个功能域', desc: '12 功能域 + 5 NFR', kind: 'cyan' },
        { num: '373/373', label: 'PRD 覆盖', desc: 'orphan 0', kind: 'green' },
        { num: '49P/0F', label: 'verify 结果', desc: 'V1~V35 全 PASS（3 WARN advisory）', kind: 'green' },
      ],
      memoryLine: '记住这 4 个数字：<Hl>12h54m、420 条 SWR、17 域、46 项校验 49P/0F</Hl>。答辩时说「PRD 直达、AI 只做分解、V1~V35 全 PASS」就是一句话结论。',
    },
    downstream: ['SW-SRS → swe-arch', 'SWR → swe-arch-if 接口契约', 'verify 报告 → 质量门'],
    downstreamLine: '一句话：<Hl>SW-SRS 是「软件实现的最源头」</Hl>——swe-arch 按 420 条 SWR 做 57 模块的架构设计。',
    ironRules: [
      '<b>PRD 为需求边界</b> —— 原始文档为事实源，不臆造需求',
      '<b>AI 只做需求分解</b> —— 其余 9 步确定性脚本执行',
      '<b>PRD 全覆盖 + 零 orphan</b> —— V19/V20 硬校验',
      '<b>反臆造</b> —— 数字+单位必须带来源（V21），禁「经验值/业界惯例」',
      '<b>verify FAIL 不前进</b> —— 反例黑名单：禁止跳过 verify 直接 commit',
    ],
    tutor: {
      question: '考官问「swe-analysis 和 sys-analysis 的分工区别？」怎么答？',
      answer: (
        <span>
          <b>sys-analysis 是标准路径</b>（PRD → SYS-REQ，374 条 SR，产出系统需求）；
          <b>swe-analysis 是 PRD 直达路径</b>（跳过系统级，373 条 PRD 直接分解为 420 条 SWR）。
          本项目走 PRD 直达：AI 只做「需求分解」一步（17 域并行），其余 9 步 pipeline 脚本确定性执行，verify 46 项校验全 PASS。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '11 步 · 9 步确定性 + 2 步 AI 决策',
  flowTitle: '执行流程：11 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>箭头上的标签 = 传给下一步的产物</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'task-init', label: '会话初始化（建台账）',
      action: '记录 T_START，创建 task_sw_req.md（任务前缀 SWFP-）',
      post: 'task_sw_req.md', edge: '任务台账',
      why: '所有步骤的记录要有汇总的地方',
    },
    {
      id: 1, name: 'gate', label: '门控检查（确定性）',
      action: 'pipeline.py gate：PRD 存在 + parsed/raw 非空 + config 非空 + 无 blocking CLQ；pre-clarify 自动检测注入',
      post: 'SWE-GATE done=true（门控通过）', edge: '门控通过',
      why: '前置不齐，后面全部白跑',
    },
    {
      id: 2, name: 'parse-prd', label: '解析 PRD（确定性）',
      action: '解析出 prd_index.json：PRD 编号 pattern、mtime、entries[]、功能域[]',
      post: 'prd_index.json', edge: 'PRD 索引',
      why: '后续分片/brief/verify 都靠这份索引',
    },
    {
      id: 3, name: 'build-doc-anchor-index', label: '文档锚点预扫（确定性·强烈推荐）',
      action: '预扫每个声明文档的 H1~H4 锚点 → doc_anchor_index.json，激活 brief 速查 + V29 章节真实性校验',
      post: 'doc_anchor_index.json', edge: '锚点索引（11 文档 546 锚点）',
      why: '防漏：Worker 按章节扫，引用章节号可校验真实存在',
    },
    {
      id: 4, name: 'shard-from-config', label: '分片（确定性·config 驱动）',
      action: '分片方案完全来自 $CFG.domains[]（17 域），编排器不做自动分片决策',
      post: 'shard_plan.json', edge: '17 域分片方案',
      why: '相同配置 ⇒ 相同分片，可复现',
    },
    {
      id: 5, name: 'shard-confirm', label: '分片确认（AI 决策点①：用户确认）',
      action: '展示分片摘要（17 域 373 条 PRD），Y 继续 / n 编辑配置重跑 / 调整用 AskUserQuestion',
      post: '分片方案确认（17 域）', edge: '确认分片',
      why: '分片是成本决策，让用户拍板',
      badges: [{ kind: 'amber', text: '用户确认' }],
    },
    {
      id: 6, name: 'gen-briefs', label: '生成任务包（确定性）',
      action: '每个域生成一份 brief：§0 manifest / §1 PRD 表 / §2 文档索引+锚点速查 / §3 ASIL / §4 邻域 / §5 已有 SWR / §6 输出约束',
      post: 'swe-swr-brief-domain-*.md ×17', edge: '17 份 brief',
      why: 'Worker 开跑前拿到完整上下文',
    },
    {
      id: 7, name: 'worker-spawn', label: 'Worker 分解（AI 唯一非确定性点）',
      action: 'gen-worker-prompts 生成 17 条 prompt，逐域 spawn yxspec-swe-analysis（模型 opus）——把 PRD 条目分解为 SWR',
      post: 'swe-swr-partial-domain-*.md ×17', edge: '17 份分解稿',
      why: '分解是唯一的创造性工作，交给 AI；失败只需重跑该域',
      badges: [{ kind: 'cyan', text: '17 并发' }],
    },
    {
      id: 8, name: 'merge', label: '合并 + 编号分配（确定性）',
      action: '拒绝短形式引用 → 加载全部 partial → 类别迁移 → 分配正式编号 SWR-{CAT}-{SEQ:4} → 注入关联需求/协议锚点 → 组装 §4 FUN / §5 IF → RTM + 统计',
      post: 'sw-srs-*.md + id-map + tbd（420 条）', edge: 'SW-SRS 初稿',
      why: '多份 partial 合一份，编号与链接规范化',
      badges: [{ kind: 'cyan', text: 'residual 0' }],
    },
    {
      id: 9, name: 'verify', label: '46 项校验（确定性 V1~V35）',
      action: '结构与完整性/追溯覆盖/反臆造证据/章节归类/输出健康/跳转治理六大类；真实 3 轮：V14 锚点修复 → V27 用户确认降级 critical → 49 PASS / 0 FAIL',
      post: 'verify-*.md（49 PASS）', edge: '校验报告',
      why: '全 PASS 才定稿；FAIL 回对应 Worker 修正，禁止先提交后面再改',
      badges: [{ kind: 'green', text: '49P/0F' }],
    },
    {
      id: 10, name: 'finalize', label: '定稿 + 提交',
      action: 'git commit（74 文件：sw-srs + id-map + verify + extracted + task），SWFP-FINAL done',
      post: 'commit 358bdaa3', edge: 'SW-SRS 入库',
      why: '收尾留档，让下游可以开工',
      badges: [{ kind: 'green', text: 'git commit' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '建台账', icon: '▶', color: 'blue', sub: 'task_sw_req' },
    { id: 1, name: '门控', icon: '🔒', color: 'amber', sub: '前置齐全' },
    { id: 2, name: '解析 PRD', icon: '🔍', color: 'blue', sub: 'prd_index' },
    { id: 3, name: '锚点预扫', icon: '📑', color: 'blue', sub: '11 文档 546 锚点' },
    { id: 4, name: '分片', icon: '🗂️', color: 'blue', sub: '17 域 config 驱动' },
    { id: 5, name: '确认分片', icon: '✋', color: 'amber', sub: '用户确认' },
    { id: 6, name: '生成 brief', icon: '📦', color: 'blue', sub: '17 份' },
    { id: 7, name: 'Worker 分解', icon: '🤖', color: 'cyan', sub: 'AI 唯一一步' },
    { id: 8, name: '合并编号', icon: '🧩', color: 'blue', sub: '420 条 SWR' },
    { id: 9, name: '46 项校验', icon: '⚖️', color: 'amber', sub: '49P/0F' },
    { id: 10, name: '定稿提交', icon: '✅', color: 'green', sub: 'commit' },
  ],
  flowTutor: {
    question: '考官问「verify 的 V1~V35 校验失败怎么处置？」怎么答？',
    answer: (
      <span>
        按失败类型分流：<b>V1~V5 结构类</b>回 Step 7 修正；<b>V19/V20 覆盖类</b>定位缺失 PRD 的域重新 spawn Worker；
        <b>V13~V18 反臆造类</b>回 merge 或重 spawn；<b>V27 章节覆盖</b>可启发式排除章节（pre-clarify 感知）。
        真实跑了 3 轮：V14 锚点修复 → V27 用户确认降级 → 49 PASS / 0 FAIL。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'prd-trainees-2026.md', role: 'PRD（373 条）—— 需求边界' },
      { name: 'swe-swr-config.yaml', role: '项目配置（17 域分片方案 + 约束 + 文档索引）' },
      { name: 'parsed/ + raw/', role: '原始文档（事实源，V18 校验指向真实文件）' },
      { name: 'clq', role: '澄清（无 blocking 状态）' },
    ],
    inputKeyline: '最关键输入是 <Hl>PRD + config</Hl>——PRD 是需求边界，config 决定分片（可复现）。',
    outputs: [
      { name: 'sw-srs-trainees-2026.md', role: '软件需求规格书（420 条：FUN 356 + IF 64）' },
      { name: 'verify-*.md', role: 'V1~V35 校验报告（49 PASS / 0 FAIL / 3 WARN）' },
      { name: 'id-map-*.json', role: '编号映射（temp_id → formal_id）' },
      { name: 'tbd-*.md', role: 'TBD 清单（93 条 + not_impl 3）' },
      { name: 'swe-swr-partial-domain-*.md', role: '17 份 Worker 分解稿（中间产物）' },
      { name: 'task_sw_req.md', role: '任务台账（SWFP-SESSION~FINAL）' },
    ],
    outputKeyline: '核心输出链：<Hl>briefs → partials ×17 → merge → SW-SRS + verify</Hl>，一步一个文件全部可追溯。',
    callGraphs: [
      {
        title: '命令级 · swe-analysis 与上下游的关系',
        color: 'cyan',
        from: { id: 'swe', cmd: '/yxspec:swe-analysis', sub: 'SWE.1 · 软件需求分析（PRD 直达）', desc: '把 PRD 分解成软件需求 SWR' },
        tos: [
          { id: 'up-prd', cmd: 'prd-analysis', edge: 'PRD（373 条）', edgeDesc: '需求边界', desc: '上游：PRD 是需求边界，原始文档是事实源。' },
          { id: 'up-clarify', cmd: 'clarify', edge: 'CLQ 无 blocking', edgeDesc: '前置条件', desc: '协作：blocking CLQ 必须清完才开工。', dashed: true },
          { id: 'down-arch', cmd: 'swe-arch', edge: 'SW-SRS（420 条）', edgeDesc: '架构设计输入', desc: '下游：软件架构按 420 条 SWR 设计 57 模块。' },
          { id: 'down-if', cmd: 'swe-arch-if', edge: 'IF 类 SWR', edgeDesc: '接口契约来源', desc: '旁支：IF 64 条是接口契约的输入。', dashed: true },
          { id: 'side-review', cmd: 'yxspec:review swe_analysis', edge: '审查报告', edgeDesc: '阶段审查', desc: '审查通过才进 swe-arch。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个 Step 干活',
        color: 'blue',
        from: { id: 'orch', cmd: '编排器（命令）', sub: '11 步推进', desc: '9 步调脚本 + Step 5 确认 + Step 7 spawn' },
        tos: [
          { id: 'pipe', cmd: 'pipeline.py', edge: '9 步确定性执行', edgeDesc: 'gate/parse/anchor/shard/briefs/merge/verify', desc: '100% 确定性可复现：解析、分片、brief 生成、合并、46 项校验。' },
          { id: 'worker', cmd: 'yxspec-swe-analysis ×17', edge: 'Step 7 · 需求分解', edgeDesc: '每域一个（模型 opus）', desc: '把 PRD 条目分解为 SWR——唯一的 AI 非确定性步骤。' },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（脚本 9 步 + Worker 1 步）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-analysis' },
      { seg: 'input', label: 'PRD (373 条)' },
      { seg: 'script', label: 'gate' },
      { seg: 'script', label: 'parse' },
      { seg: 'script', label: 'shard ×17' },
      { seg: 'worker', label: 'Worker ×17' },
      { seg: 'script', label: 'merge' },
      { seg: 'script', label: 'verify V1~V35' },
      { seg: 'output', label: 'sw-srs-trainees-2026.md (420 SWR)' },
      { seg: 'output', label: 'verify-trainees-2026.md (52 项)' },
    ],
    pipeKeyline: '蓝色=脚本（9 步）· 琥珀=Worker（AI 1 步）· 绿色=产物——「AI 只翻译，机器来把关」。',
    qualityGates: [
      { code: 'gate', name: '前置门控', phase: 'Step 1', check: 'PRD 在 + parsed/raw 非空 + config 在 + 无 blocking CLQ', outcome: 'pass' },
      { code: 'V1~V35', name: '46 项校验', phase: 'Step 8', check: '覆盖/追溯/反臆造/章节/跳转治理；真实 3 轮修复后 49 PASS / 0 FAIL', outcome: '49P/0F' },
    ],
    gateNote: '对比 sys-analysis：SYS.2 是「Worker 转 + Finalizer 收编」两 Phase；SWE.1 是「9 步确定性 + 1 步 AI」——确定性程度更高，AI 自由度压到最小。',
    failures: [
      { fault: 'gate fail', action: '按提示补全前置条件' },
      { fault: 'parse-prd 0 entries', action: '检查 PRD 编号 pattern，编辑 prd_parser.py' },
      { fault: 'Worker 覆盖不足', action: '拆分该域为子域，编辑 config 重跑 Step 3+' },
      { fault: 'verify V14/V15/V17 fail', action: '修正对应 partial 违规条目，重跑 merge + verify' },
      { fault: 'verify V19 fail（PRD 漏覆盖）', action: '对应域 Worker 漏分解 → 重 spawn' },
      { fault: 'verify V27 fail（章节覆盖 <90%）', action: 'pre-clarify 启发式排除章节；仍 fail 重 spawn Worker' },
      { fault: 'verify V29 fail（章节号不存在）', action: 'fuzzy 父节匹配；仍 fail 回 partial 检查' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-analysis 的调用关系怎么讲？',
    answer: (
      <span>
        「swe-analysis 消费 PRD（373 条）+ config（17 域），<b>9 步脚本确定性执行</b>（gate/parse/锚点/分片/brief/merge/verify），
        <b>1 步 AI 分解</b>（17 域并发 Worker 把 PRD 转成 SWR），产出 sw-srs-*.md（420 条）+ verify 报告（49 PASS / 0 FAIL），给 swe-arch 做架构。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sw-srs-trainees-2026.md', kind: 'cyan', what: '420 条 SWR：FUN 356 + IF 64，每条含 15 字段（上层追溯/需求来源/ASIL…）', who: 'swe-arch + 编码的输入' },
    { name: 'verify-sw-srs-*.md', kind: 'green', what: 'V1~V35 校验报告（49 PASS / 0 FAIL / 3 WARN）', who: '质量门 + 追溯' },
    { name: 'id-map-*.json', kind: 'amber', what: 'temp_id → formal_id 编号映射（merge 确定性产出）', who: '追溯 + 部分重跑' },
    { name: 'tbd-*.md', kind: 'amber', what: 'TBD 清单：93 条待确认 + 3 条 not_impl（PRD 描述与实际不符）', who: '下游澄清' },
    { name: 'swe-swr-brief-domain-*.md', kind: 'amber', what: '17 份 Worker 任务包（PRD 表 + 文档索引 + ASIL + 输出约束）', who: 'Worker 上下文' },
    { name: 'task_sw_req.md', kind: 'green', what: '任务台账：SWFP-SESSION~FINAL（17 Worker 行）', who: '门控放行 + 证据链' },
  ],
  artifactsChain: '一句话串起来：<Hl>briefs（脚本生成）→ partials ×17（AI 分解）→ merge（编号分配）→ SW-SRS + verify（46 项全 PASS）</Hl>。',
  samplesTitle: 'SWR 真实样例（点开看字段）',
  samples: [
    {
      id: 'SWR-FUN-001', badges: [{ kind: 'cyan', text: '功能 FUN' }], meta: 'FUN 356 之一',
      title: '系统应支持接收平台下发的控车指令（上电/熄火/寻车/设防/撤防），5 秒内执行并回执',
      fields: [
        { k: '上层追溯', v: 'REQ-F-000001（PRD 远程控车条目）' },
        { k: '类别', v: 'FUN（功能/性能/安全字段内嵌）' },
        { k: '接口依赖', v: '见 IF 控车协议条目（0x30F0）' },
        { k: '性能字段', v: '5 秒内执行（带 § 章节号引用，V21 校验）' },
      ],
    },
    {
      id: 'SWR-IF-001', badges: [{ kind: 'blue', text: '接口 IF' }], meta: 'IF 64 之一',
      title: '控车指令协议条目：BLE 组网控车报文 0x30F0',
      fields: [
        { k: '上层追溯', v: 'REQ-F-000001 + BLE 协议文档 §x.y' },
        { k: '类别', v: 'IF（接口规约）' },
        { k: '协议交互单元', v: '1 Topic/CMD = 1 条 IF；请求-响应成对合并' },
        { k: '功能描述', v: '非 N/A（V26 校验）' },
      ],
    },
    {
      id: 'SWR-FUN-002', badges: [{ kind: 'amber', text: '性能内嵌' }], meta: '真实处理案例',
      title: 'V21 反臆造示例：休眠功耗 ≤3mA（带来源章节号）',
      fields: [
        { k: '处理前', v: '数字+单位无来源（FAIL）' },
        { k: '处理后', v: '补 § 章节号引用，或标 [TBD-UNRESOLVED]' },
        { k: '规则', v: '任何「数字+单位」必须同字段内含 § / TBD / 链接（V15/V21）' },
      ],
    },
  ],
  samplesNote: '每条 SWR 都含「上层追溯」指向 PRD-ID——V19 前向覆盖 + V20 零 orphan 双校验。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.1 · 软件需求',
    title: '门控 · 追溯 · AI 协同（swe-analysis 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'sys-arch 怎么表现', 'swe-analysis 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', 'Worker 内嵌 AQ 门 29 项 + 外置取证', 'gate 前置门 + verify 46 项（V1~V35）硬校验'],
        ['<Badge kind="green">追溯</Badge>', 'SR 分配到子系统（§7 矩阵）', 'PRD 全覆盖 373/373 + 零 orphan（V19/V20）+ 编号映射 id-map'],
        ['<Badge kind="blue">AI 协同</Badge>', '单 Worker 全包 + 脚本门控', '9 步确定性脚本 + 1 步 AI（17 域并发分解）——AI 自由度压到最小'],
      ],
    },
    sections: [
      {
        title: '追溯链：PRD → SWR →（下游架构）',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'PRD (373 条)' },
          { kind: 'output', label: 'briefs ×17' },
          { kind: 'output', label: 'partials ×17' },
          { kind: 'output', label: 'SWR (420 条)' },
          { kind: 'output', label: 'swe-arch' },
        ],
        keyline: '每跳可追溯：SWR「上层追溯」指向 PRD-ID（V19 前向覆盖 + V20 零 orphan）；编号映射 id-map 全程可查。',
      },
      {
        title: 'AI 协同：确定性为主、AI 为辅',
        type: 'table',
        cols: ['角色', '干什么', '确定性'],
        rows: [
          ['<code>pipeline.py</code>', 'gate/parse/锚点/分片/brief/merge/verify（9 步）', '100% 确定性可复现'],
          ['<code>yxspec-swe-analysis ×17</code>', '把 PRD 条目分解为 SWR', '唯一非确定性步骤'],
          ['<code>用户</code>', 'Step 5 确认分片 + Step 9 后处置 verify 失败', '人工决策点 2 处'],
        ],
        keyline: '「相同配置 ⇒ 相同输出」——确定性是可审计的基础，AI 只做翻译。',
      },
      {
        title: 'verify 46 项校验的六大类',
        type: 'ul',
        items: [
          '结构与完整性：V1/V1b/V2/V3/V4/V5（类别/编号/字段）',
          '追溯与覆盖：V7/V19/V20/V22/V27（PRD 全覆盖 + 零 orphan）',
          '反臆造与证据：V14/V15/V18/V21/V28（数字+单位必须带来源）',
          '章节与归类：V10/V12/V13/V16/V17/V25/V26',
          '输出健康：V23/V24（RTM 完整性）',
          '跳转治理：V30~V35（body 自包含，禁跨 SWR 跳转）',
        ],
        keyline: '46 项不是摆设：真实 3 轮修复（V14 锚点 → V27 降级 → 全 PASS）才放行。',
      },
    ],
  },
};

export default sweReqChapter;
