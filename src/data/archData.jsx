/**
 * yxspec-tutor · sys-arch 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/sys-arch.md
 * 真实产物：project/specs/sys/sys-arch-trainees-2026.md（1326 行）+ task_sys_arch.md
 * 真实运行：2026-07-28 20:10 → 21:32（SA-001~SA-004）+ 07-30 审查闭环 SA-005
 */

const archChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:sys-arch · SYS.3 · 系统架构设计',
    oneLiner:
      '拿着 374 条系统需求（SR），设计出系统的「骨架」——14 个子系统怎么分、软硬件怎么分层、芯片怎么选、接口怎么定义、每条 SR 分给谁。',
    analogy:
      '把 sys-arch 想象成「画房屋结构图」：sys-analysis 给了你需求清单（几房几厅、要通水通电），sys-arch 就是建筑师把需求落成图纸——墙怎么砌（子系统划分）、水电怎么走（接口设计）、用什么样的材料（芯片选型）、每一间房住什么（SR 分配到子系统）。后面的软硬件设计都按这张图纸施工。',
    memoryLine: '记住：<Hl>sys-arch = 用 374 条 SR 画出系统的骨架</Hl>——14 个子系统、23 个 SW 模块，100% SR 分配。',
    purpose: {
      oneLiner:
        '把系统需求转成系统架构：14 个子系统（SS-TSP/SS-BLE/SS-SIF/SS-GNSS/SS-PWR 等）、软件分层（23-10-20-1）、芯片选型（ML307C/AB2026B3/AT9850B）、接口定义（EXT 10/INT 6/HSI 20），374 条 SR 100% 分配到子系统。',
      input: {
        title: '3 类 + 2 类参考',
        items: [
          'sys-req-trainees-2026.md —— 系统需求（374 条 SR）',
          'review-sys_analysis —— 阶段审查放行结论',
          'CLQ 决策 / 基线：answered-decisions.md（45 条）+ baselines/',
          '锚点模板 tbox-anchor-template.yaml —— 子系统划分依据',
          'arch 模板 sys-arch.md.tpl —— §1~§8 结构',
        ],
        note: 'gate 校验：SYS-REQ 存在 + review 已通过 + 无 blocking CLQ；binding 缺失仅警告',
      },
      processTitle: '2 步，单 Worker 全包',
      process: [
        '① 门控 + 备料：gate 检查上游齐全，读 SR 统计（374 条/6 类），构造 briefing pack（I1~I9）',
        '② 单 Worker 一次 spawn：加载全部输入 → SR 分类与子系统分配规划 → 生成 §1~§8 全部章节 → 质量门自检（RULE-001~006 + ASPICE BP3/4/5/7/8）→ 输出 sys-arch-*.md',
      ],
      outputsTitle: '2 样（架构图就是核心产物）',
      outputs: [
        { name: 'sys-arch-trainees-2026.md', what: '系统架构设计文档：§1~§8 + 质量门报告（1326 行）', consumer: 'swe-analysis 软件需求分解 + hwe-analysis' },
        { name: 'task_sys_arch.md', what: '任务台账：SA-001~SA-005', consumer: '门控放行 + 证据链' },
      ],
      value: [
        '「怎么设计」的第一次落笔——从需求到设计的跨越，架构是后续软硬件的总蓝图',
        '14 个子系统 + 100% SR 分配：每条 SR 都有归属，设计可追溯',
        '质量门 29 项（AQ-01~29）自检 + 编排外置取证双重把关，架构质量可信',
      ],
      boundary: [
        '不管「软件内部怎么分模块」——那是 swe-analysis / swe-arch 的事',
        '不管「硬件怎么选型细算」——那是 hwe-analysis 的事',
        'sys-arch 只回答「系统怎么组成」，给出骨架与分工',
      ],
      example:
        'SR 里「系统应支持 4G 公网接入与 MQTT 长连接」→ SS-TSP 子系统接管，分配给 MOD-001/tsp、MOD-018/yx_net 等 SW 模块，芯片选 ML307C（4G Cat.1 集成 OpenCPU）。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '项目经理', who: '/yxspec:sys-arch 命令', does: '门控 → 备料 → 构造 briefing pack → spawn ×1 → 读质量门判定 → 收尾提交' },
      { kind: 'cyan', role: '总设计师', who: 'yxspec-sys-arch-worker ×1', does: '一次 spawn 完成全部：子系统划分/硬件架构/接口/状态机/资源预算/SR 分配/质量门自检' },
      { kind: 'amber', role: '质检脚本', who: 'scan_sys.py gate / binding-check', does: 'Step 1 上游前置检查 + Step 4 binding 时效性检测' },
    ],
    whyTitle: '为什么要这样分工？（为什么单 Worker 全包）',
    whyShell: [
      '为什么 1 个 Worker 干完 §1~§8？—— 架构各章节强耦合（子系统划分决定接口，接口决定资源预算），一个 Worker 全盘思考比切碎更一致',
      '为什么质量门内嵌在 Worker？—— 架构设计是「一次性创造」，生成时自检（RULE-001~006 + ASPICE BP）比事后抽检更及时',
      '为什么编排器还要外置取证？—— 不全信 Worker 自报（SYS.2 教训），独立脚本核验 §7 分配一致性，实测无偏离',
    ],
    whyMemory: '记住 <Hl>「单 Worker 全包 + 质量门内嵌 + 外置取证」</Hl>——创造要一致，验证要独立。',
    instance: {
      stats: [
        { num: '1h 12m', label: '主流程耗时', desc: '20:10 → 21:32（SA-001~004）', kind: 'cyan' },
        { num: '14', label: '个子系统', desc: 'SS-TSP/BLE/SIF/GNSS/PWR…', kind: 'cyan' },
        { num: '374', label: '条 SR 全部分配', desc: '100% 分配率（外置取证一致）', kind: 'cyan' },
        { num: '23-10-20-1', label: 'SW 分层模块数', desc: '应用 23 / 中间件 10 / 驱动 20 / 引导 1', kind: 'cyan' },
        { num: 'completed_with_warnings', label: '质量门综合评级', desc: 'AQ-00 WARN + AQ-14 WARN，blocking 全 PASS', kind: 'amber' },
      ],
      memoryLine: '记住这 4 个数字：<Hl>1 小时 12 分、14 个子系统、23 个 SW 模块、374 条 SR 100% 分配</Hl>。答辩时说「架构一次生成、外置取证无偏离、conditional 审查闭环」就是一句话结论。',
    },
    downstream: ['sys-arch-*.md → swe-analysis', 'SYS-IF 接口定义 → hwe-analysis', 'SR 分配表 → 软硬件分工'],
    downstreamLine: '一句话：<Hl>架构图是「软硬件分工的总蓝图」</Hl>——swe-analysis 按子系统拆软件需求，hwe-analysis 按架构做硬件分析。',
    ironRules: [
      '<b>上游不齐不开工</b> —— gate 校验 SYS-REQ + review 通过 + 无 blocking CLQ',
      '<b>不臆造参数</b> —— binding 缺失回退直查 baselines/，芯片参数标来源或 [TBD-HUMAN-REVIEW]',
      '<b>SR 必须 100% 分配</b> —— §7 需求分配矩阵逐条可查，孤儿 SYS-IF 为 0',
      '<b>质量门 GREEN/YELLOW 放行</b> —— RED 回退修复 ≤3 轮，escalated 停',
      '<b>编排外置取证</b> —— 不信生成期自报，独立脚本核验后进 review',
    ],
    tutor: {
      question: '考官问「sys-arch 一个 Worker 怎么保证 8 个章节的一致性？」怎么答？',
      answer: (
        <span>
          <b>三个机制：</b>① 单 Worker 全包——子系统划分/接口/资源预算强耦合，一个上下文里思考天然一致；
          ② <b>质量门内嵌自检</b>——RULE-001~006 + ASPICE BP3/4/5/7/8，生成时即校验；
          ③ <b>编排外置取证</b>——独立脚本核验 §7 唯一 SR-ID 374 条、与预分配表 0 缺 0 多、SYS-IF 孤儿 0，实测全 PASS。
          自报 + 外证双轨，架构质量可信。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '9 Step 编排 + 单 Worker 全包 · 质量门内嵌',
  flowTitle: '执行流程：10 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>箭头上的标签 = 传给下一步的产物</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'session-open', label: '会话启动',
      action: '建任务台账（task_sys_arch.md），记录 session_id',
      post: 'task_sys_arch.md', edge: '任务台账（记录已开）',
      why: '所有步骤的记录要有汇总的地方',
    },
    {
      id: 1, name: 'gate-check', label: '门控检查',
      action: 'scan_sys.py gate：SYS-REQ 存在 + review-sys_analysis 通过 + 无 blocking CLQ + binding 状态（缺失仅警告）',
      post: 'passed=true', edge: '门控通过',
      why: '上游不在或未放行，开工就是白干',
    },
    {
      id: 2, name: 'checkpoint', label: '断点检查',
      action: '读任务文件：有未完成任务 → 询问续传；无 → 全新执行',
      post: '断点决策', edge: '续传 or 新跑',
      why: '跑一半能接着跑，不重复劳动',
    },
    {
      id: 3, name: 'prepare', label: '备料',
      action: '读配置拿 spec_id；统计 SR 总数/分类；确认 CLQ Matrix、基线、Binding 文件',
      post: '输入清单就绪', edge: 'SR + CLQ + 基线',
      why: '先把输入备齐，Worker 开跑时不用等',
    },
    {
      id: 4, name: 'brief-gen', label: '构造任务包',
      action: '为 Worker 构造 briefing pack（对齐 I1~I9）：sys_req_path / clq_matrix / anchor_template / baseline_binding / baselines_dir / arch_template',
      post: 'briefing pack（I1~I9）', edge: '任务包 → Worker',
      why: 'Worker 需要一份完整的输入清单才能一次干完全部章节',
      badges: [{ kind: 'amber', text: 'I1~I9' }],
    },
    {
      id: 5, name: 'user-confirm', label: '用户确认',
      action: '展示工作流概览：Worker ×1、输入 N 条 SR、CLQ 已回答/总数、Binding 状态、重试上限 ≤3 轮，等确认',
      post: '用户确认', edge: '确认开工',
      why: '开工前让用户看清输入与风险（含降级项）',
      badges: [{ kind: 'amber', text: '用户确认' }],
    },
    {
      id: 6, name: 'worker-spawn', label: 'Worker 生成架构（×1 全包）',
      action: 'spawn yxspec-sys-arch-worker ×1：加载全部输入 → SR 分类与子系统分配规划 → 生成 §1~§8 → 质量门自检（RULE-001~006 + ASPICE BP3/4/5/7/8）→ 输出 sys-arch-*.md',
      post: 'sys-arch-trainees-2026.md（1326 行 + 质量门报告）', edge: '架构稿 → 判定',
      why: '架构各章节强耦合，一个 Worker 全盘思考保证一致性',
      badges: [{ kind: 'cyan', text: '×1 全包' }],
    },
    {
      id: 7, name: 'merge/verify', label: '判定 + 外置取证',
      action: '读质量门报告：GREEN→放行 / YELLOW→记录警告放行 / RED→回退修复 ≤3 轮；独立脚本核验 §7 分配一致性（不全信自报）',
      post: '判定通过 + 取证无偏离', edge: '架构稿 → review',
      why: '自报 + 外证双轨，防止 Worker 自我美化',
      badges: [{ kind: 'amber', text: '外置取证' }],
    },
    {
      id: 8, name: 'finalize', label: '收尾 + 提交',
      action: '更新任务台账（完成 + 统计摘要），git add + commit（submodule 走 submodule-aware-commit）',
      post: 'done + commit', edge: '架构稿入库',
      why: '收尾留档，让下游知道可以开工',
      badges: [{ kind: 'green', text: 'git commit' }],
    },
    {
      id: 9, name: 'suggest-next', label: '建议下一步',
      action: '建议 review sys_arch 或 swe-analysis',
      post: '建议输出', edge: 'SYS-ARCH → 审查 / 软件需求',
      why: '流程不自动跳下游，由审查关卡把关',
      badges: [{ kind: 'green', text: 'review' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '会话启动', icon: '▶', color: 'blue', sub: '建台账' },
    { id: 1, name: '门控检查', icon: '🔒', color: 'amber', sub: '上游齐全' },
    { id: 2, name: '断点检查', icon: '↻', color: 'blue', sub: '续传 or 新跑' },
    { id: 3, name: '备料', icon: '📥', color: 'blue', sub: 'SR+CLQ+基线' },
    { id: 4, name: '任务包', icon: '📦', color: 'blue', sub: 'I1~I9' },
    { id: 5, name: '用户确认', icon: '✋', color: 'amber', sub: '确认开工' },
    { id: 6, name: 'Worker 全包', icon: '🤖', color: 'cyan', sub: '§1~§8 ×1' },
    { id: 7, name: '外置取证', icon: '🔍', color: 'amber', sub: '核验分配' },
    { id: 8, name: '收尾提交', icon: '✅', color: 'green', sub: 'commit' },
    { id: 9, name: '建议下一步', icon: '➡', color: 'green', sub: 'review' },
  ],
  flowTutor: {
    question: '考官问「sys-arch 的质量门和编排器是什么关系？」怎么答？',
    answer: (
      <span>
        质量门<b>内嵌在 Worker</b>（生成时自检 RULE-001~006 + ASPICE BP3/4/5/7/8），编排器<b>负责判定</b>：
        GREEN/YELLOW 放行、RED 回退 ≤3 轮、escalated 停。真实运行是 <b>completed_with_warnings</b>——
        AQ-00（binding 缺失）与 AQ-14（HSI 20 {'<'} 门控阈值 37.4）两处 WARN 均为降级所致，blocking 全 PASS，如实记录不凑数。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'sys-req-trainees-2026.md', role: '系统需求（374 条 SR：F220/P48/H51/M23/T18/R14）—— 架构设计的输入' },
      { name: 'review-sys_analysis', role: '阶段审查放行结论（conditional 已放行）' },
      { name: 'answered-decisions.md', role: '45 条已澄清决策（CLQ-MATRIX 缺失时的等价输入）' },
      { name: 'baselines/', role: '芯片规格书 / 通讯协议 / SW-ARCH 基线 / 资源分配表' },
      { name: 'tbox-anchor-template.yaml', role: '锚点模板（子系统划分依据 I3）' },
    ],
    inputKeyline: '最关键输入是 <Hl>SYS-REQ 规格书</Hl>——gate 校验它存在 + review 已通过。',
    outputs: [
      { name: 'sys-arch-trainees-2026.md', role: '系统架构设计文档（§1~§8 + 质量门报告，1326 行）' },
      { name: 'task_sys_arch.md', role: '任务台账（SA-001~SA-005）' },
    ],
    outputKeyline: '核心输出是 <Hl>架构稿（§1~§8）</Hl>——14 子系统 / SW 23-10-20-1 / EXT 10·INT 6·HSI 20 / 374 SR 100% 分配。',
    callGraphs: [
      {
        title: '命令级 · sys-arch 与上下游的关系',
        color: 'cyan',
        from: { id: 'arch', cmd: '/yxspec:sys-arch', sub: 'SYS.3 · 系统架构设计', desc: '用 SR 设计出系统的骨架' },
        tos: [
          { id: 'up-sys', cmd: 'sys-analysis', edge: 'SYS-REQ（374 条 SR）', edgeDesc: '架构设计输入', desc: '上游：系统需求是唯一的输入源头，gate 校验存在 + review 放行。' },
          { id: 'down-swe', cmd: 'swe-analysis', edge: '子系统/模块划分', edgeDesc: '软件需求分解依据', desc: '下游：软件需求分析按子系统拆解软件需求（MOD 分配表）。' },
          { id: 'down-hwe', cmd: 'hwe-analysis', edge: '硬件架构 + SYS-IF', edgeDesc: '硬件分析参考', desc: '旁支：硬件架构与接口定义供硬件需求分析参考。', dashed: true },
          { id: 'side-review', cmd: 'yxspec:review sys_arch', edge: '审查报告', edgeDesc: 'AI 预审 + 人工双签', desc: '阶段审查：DEV-001 接受闭合 + 双签放行。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个 Step 干活',
        color: 'blue',
        from: { id: 'orch', cmd: '编排器（命令）', sub: '9 Step 推进', desc: '门控 → 备料 → 构造任务包 → spawn → 判定 → 收尾' },
        tos: [
          { id: 'worker', cmd: 'yxspec-sys-arch-worker', edge: 'Step 6 · 生成 §1~§8', edgeDesc: '×1 单次 spawn 全包', desc: '加载全部输入（I1~I9）→ SR 分类与子系统分配 → 生成全部章节 → 质量门自检（RULE-001~006 + ASPICE BP）。' },
          { id: 'script', cmd: 'scan_sys.py', edge: 'Step 1/4 · gate + binding-check', edgeDesc: '确定性脚本', desc: '上游前置条件检查 + binding 时效性检测（脚本判决，不靠 AI）。' },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（Worker 全包 + 脚本门控）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:sys-arch' },
      { seg: 'input', label: 'SYS-REQ (374 SR)' },
      { seg: 'script', label: 'gate' },
      { seg: 'worker', label: 'Worker ×1 (§1~§8)' },
      { seg: 'script', label: '外置取证' },
      { seg: 'output', label: 'sys-arch-*.md' },
      { seg: 'output', label: '→ review sys_arch' },
    ],
    pipeKeyline: '蓝色=脚本 · 琥珀=Worker（AI）· 绿色=产物——脚本门控 + AI 全包 + 外证收口。',
    qualityGates: [
      { code: 'AQ-00', name: '数据源质量门', phase: '生成期', check: 'Binding 可用性前置（缺失 → WARN 降级）', outcome: 'WARN' },
      { code: 'AQ-01~29', name: '标准质量门', phase: '生成期', check: 'RULE-001~006 + ASPICE BP3/4/5/7/8：章节齐全/分配一致/接口引用/成本合规…', outcome: 'blocking 全 PASS' },
      { code: '综合', name: '综合评级', phase: '生成期', check: 'AQ-00 WARN + AQ-14 WARN（HSI 20 < 37.4），非阻塞', outcome: 'completed_with_warnings' },
    ],
    gateNote: '对比 sys-analysis：SYS.2 是「8 batch 外门 + 装配 A.3 门」两道；SYS.3 是「Worker 内嵌 AQ 质量门 29 项 + 编排外置取证」——因为架构是单次创造，门控融进生成过程。',
    failures: [
      { fault: 'gate passed=false', action: '上游缺失 → 回上游补（本次 3 项降级：CLQ-MATRIX/BINDING/RESOURCE-TABLE，均记档不阻塞）' },
      { fault: '质量门 RED', action: '回退修复（≤3 轮）' },
      { fault: 'Worker escalated', action: '停止，输出人工介入点' },
      { fault: '外置取证偏离', action: '回到 Worker 修复（本次 0 偏离）' },
    ],
  },
  ioTutor: {
    question: '答辩时 sys-arch 的调用关系怎么讲？',
    answer: (
      <span>
        「sys-arch 消费 SYS-REQ（374 条 SR），编排器 9 Step 推进：门控 → 备料 → 构造 briefing pack → <b>单 Worker 一次 spawn 完成 §1~§8</b>
        （子系统划分/硬件架构/接口/状态机/资源预算/SR 分配 + 质量门自检），编排器外置取证后放行，产出 sys-arch-*.md（14 子系统、SR 100% 分配）给 swe-analysis 与 hwe-analysis。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sys-arch-trainees-2026.md', kind: 'cyan', what: '§1~§8：子系统划分/硬件架构/接口/状态机/需求分配矩阵 + 质量门报告（1326 行）', who: 'swe-analysis + hwe-analysis 的输入' },
    { name: '§3 子系统划分', kind: 'amber', what: '14 个子系统 + 每子系统职责/覆盖 SR 范围/HW 组件/SW 模块', who: '软硬件分工依据' },
    { name: '§5 系统接口', kind: 'amber', what: 'EXT 10 + INT 6 + HSI 20（含 SYS-IF 21 条被 verifies 引用）', who: 'swe-arch-if 接口规范上游' },
    { name: '§7 需求分配矩阵', kind: 'amber', what: '374 条 SR → 14 子系统逐条分配 + 覆盖率 100%', who: '追溯与验证依据' },
    { name: '附录 AQ 质量门', kind: 'green', what: 'AQ-00~29 全量自检报告（综合 completed_with_warnings）', who: '放行决策 + 证据' },
    { name: 'task_sys_arch.md', kind: 'green', what: '任务台账：SA-001~SA-005', who: '门控放行 + 追溯证据链' },
  ],
  artifactsChain: '一句话串起来：<Hl>SR（输入）→ Worker 全包生成 §1~§8 → 质量门自检 + 外置取证 → 架构稿（14 子系统 / SR 100% 分配）</Hl>。',
  samplesTitle: '子系统划分真实样例（点开看字段）',
  samples: [
    {
      id: 'SS-TSP', badges: [{ kind: 'cyan', text: 'protocol 子系统' }], meta: '14 子系统之一',
      title: 'TSP 平台通信子系统：4G 公网接入 + MQTT 长连接 + 心跳保活',
      fields: [
        { k: '覆盖 SR', v: 'SYS-F-010001~010010（10 条）' },
        { k: 'HW 组件', v: 'ML307C-DC-CN（4G）+ 贴片 SIM' },
        { k: 'SW 模块', v: 'MOD-001/tsp、MOD-018/yx_net、MOD-027/yx_gsm、MOD-043/yx_ia_gprs、MOD-048/yx_ia_mqtt' },
        { k: '来源', v: '[I3 锚点 FC-01] + [I1 sys-req §3.1]' },
      ],
    },
    {
      id: 'SS-SIF', badges: [{ kind: 'blue', text: '一线通子系统' }], meta: '14 子系统之一',
      title: '一线通通信子系统：SIF 单线半双工 + BMS 数据采集 + XOR+CRC-8 加密',
      fields: [
        { k: '覆盖 SR', v: 'SYS-F-030001~030046（46 条）' },
        { k: 'HW 组件', v: 'ML307C（SIF GPIO）+ 连接器 Pin1（一线通 5V）' },
        { k: 'SW 模块', v: 'MOD-005/bms、MOD-014/yx_proto_sif、MOD-024/comm_sif、MOD-051/yx_ia_sif' },
        { k: '来源', v: '[I3 锚点 FC-03] + [I1 sys-req §3.3]' },
      ],
    },
    {
      id: 'SS-PWR', badges: [{ kind: 'amber', text: 'system_service 子系统' }], meta: '14 子系统之一',
      title: '电源管理子系统：宽压 12-120V + 内置电池充放电 + 低功耗休眠/唤醒',
      fields: [
        { k: '覆盖 SR', v: 'SYS-F-050001~SYS-P-00046' },
        { k: 'HW 组件', v: 'OC5807（DC-DC）+ 内置电池 150mAh + ML307C（ADC）' },
        { k: 'SW 模块', v: 'MOD-020/yx_power、MOD-033/yx_pe_io、MOD-037/yx_ia_adc、MOD-050/yx_ia_power' },
        { k: '来源', v: '[I3 锚点 FC-05 system_service] + [I1 sys-req §3.5/§4]' },
      ],
    },
  ],
  samplesNote: '每个子系统都带来源标注（锚点 + SR 出处）——SR → 子系统 → SW 模块的追溯在此闭合。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SYS.3 · 系统架构',
    title: '门控 · 追溯 · AI 协同（sys-arch 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'sys-analysis 怎么表现', 'sys-arch 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '8 batch 外门 + 装配 A.3 门', 'Worker 内嵌 AQ 质量门 29 项（AQ-00~29）+ 编排外置取证'],
        ['<Badge kind="green">追溯</Badge>', '每条 SR derived_from PRD 条目', '每条 SR 分配到子系统（§7 矩阵 100%）+ 子系统来源标注（锚点+SR）'],
        ['<Badge kind="blue">AI 协同</Badge>', 'Worker 并行转 + Finalizer 串行收编', '单 Worker 全包（强耦合一次思考）+ 脚本门控 + 外证收口'],
      ],
    },
    sections: [
      {
        title: '追溯链：SR → 子系统 → SW 模块 → 需求分配矩阵',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'SR (374 条)' },
          { kind: 'output', label: '子系统划分' },
          { kind: 'output', label: '§7 分配矩阵' },
          { kind: 'output', label: 'SW 模块' },
          { kind: 'output', label: 'SYS-IF 接口' },
        ],
        keyline: '每一跳都有来源标注：子系统 ← 锚点 + SR 出处；SR 分配 100% 覆盖；SYS-IF 孤儿 0。',
      },
      {
        title: 'AI 协同：单 Worker 全包 + 编排外置取证',
        type: 'table',
        cols: ['角色', '干什么', '为什么'],
        rows: [
          ['<code>yxspec-sys-arch-worker</code>', '一次 spawn 生成 §1~§8 + 质量门自检（RULE-001~006 + ASPICE BP3/4/5/7/8）', '架构章节强耦合，全盘思考保证一致'],
          ['<code>scan_sys.py</code>', 'gate / binding-check（确定性脚本）', '门控不靠 AI 拍脑袋，脚本判决'],
          ['<code>编排器外置取证</code>', '独立脚本核验 §7 分配（SR 数/子系统/接口引用）', '不全信自报（SYS.2 教训），双轨验证'],
        ],
        keyline: '「AI 创造 + 脚本门控 + 外证收口」——创造要一致，验证要独立。',
      },
      {
        title: '降级处置：3 项记档不阻塞（真实发生）',
        type: 'ul',
        items: [
          '[CLQ-MATRIX-MISSING] —— clq-sys-matrix 缺失，用 answered-decisions.md（45 条）作 I2 等价输入',
          '[BINDING-MISSING] —— sys-baseline-binding.md 缺失，Worker 直查 baselines/，不臆造参数',
          '[RESOURCE-TABLE-XLSX] —— 资源分配表仅 xlsx 未解析，芯片级引脚标 [TBD-HUMAN-REVIEW]',
          '降级致 AQ-00/HSI WARN（HSI 20 < 37.4），综合 completed_with_warnings 可放行（同 SYS.2 YELLOW 范式）',
        ],
        keyline: '降级不是作弊：如实记录 + 等价输入 + 标注待确认——这是「诚实降级」的样本。',
      },
    ],
  },
};

export default archChapter;
