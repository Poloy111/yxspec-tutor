/**
 * yxspec-tutor · swe-arch 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/swe-arch-v2.md（SWE.2 薄编排，5 skill 串联）
 * 真实产物：project/specs/sw-arch/sw-arch-trainees-2026.md（1501 行）+ mod-swr-mapping.json
 * 真实运行：2026-07-29 10:38 → 14:10（3h 30m 51s，S20260729-103934）
 */

const swArchChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-arch-v2 · SWE.2 · 软件架构设计',
    oneLiner:
      '拿 420 条软件需求（SWR），设计出软件团队的「分工图」——57 个模块怎么来（54 基线 + 3 新增）、每条 SWR 分给谁（mapping）、模块间怎么协作（跨模块契约）。',
    analogy:
      '把 swe-arch 想象成「软件施工队的分工大会」：swe-analysis 给了需求清单（420 条 SWR），swe-arch 决定「活儿怎么分」——已有 54 个模块怎么复用（evolve 16/retain 38）、缺什么补什么（new 3）、每条需求指派给哪个模块（SWR→模块映射）、模块之间怎么配合（37 条跨模块契约）。两个「冻结点」（架构冻结 + 契约冻结）必须用户确认才放行。',
    memoryLine: '记住：<Hl>swe-arch = 用 420 条 SWR 排出 57 个模块的分工图</Hl>——mapping + 契约 + 双冻结。',
    purpose: {
      oneLiner:
        '把 SWR 映射到软件模块并设计架构：57 模块（evolve 16 / retain 38 / new 3）、420 条 SWR 全映射、37 条跨模块依赖（API 31 + MSG 6）、两个冻结点（freeze + contract_freeze）用户确认后出 sw-arch 文档（§1~§9，1501 行）。',
      input: {
        title: '4 类输入',
        items: [
          'sw-srs-trainees-2026.md —— 软件需求（420 条 SWR）',
          '基线：54 个基线模块 + code-inventory 66 条',
          '架构基线 §7.3 依赖 + §8 交互 + §9 状态机（继承）',
          'CLQ 无 blocking',
        ],
        note: '前置门禁：gate_arch_v2.py --gate mapping（4 项 rc=0）',
      },
      processTitle: '5 阶段串联（每步前置门禁把关）',
      process: [
        '① mapping：SWR→模块映射（5 片并行 + 主会话裁决）',
        '② impl-judge：实现度精判（existing/partial/new/unknown）',
        '③ freeze 冻结点1：架构预览 + 质量决策 C1~C5，用户确认',
        '④ contract 冻结点2：跨模块契约 + 契约冻结，用户确认',
        '⑤ docgen：生成 sw-arch 文档 + 三方一致性 + integrity-check',
      ],
      outputsTitle: '4 样（编码的开工图）',
      outputs: [
        { name: 'sw-arch-trainees-2026.md', what: '软件架构文档：§1~§9（1501 行，C1~C4 全 PASS）', consumer: 'swe-arch-if 契约 + 编码' },
        { name: 'mod-swr-mapping.json', what: 'SWR→模块映射（57 模块 / 420 SWR）', consumer: '编码计划 + 追溯' },
        { name: 'sw-arch-if-contract.json', what: '跨模块契约（37 依赖：API 31 + MSG 6）', consumer: 'swe-arch-if 接口规范' },
        { name: 'task_sw_arch.md', what: '任务台账：ARCH-GATE~DESIGN', consumer: '门控放行 + 证据链' },
      ],
      value: [
        'SWR→模块 100% 映射——每条需求都有归属，编码分工可追溯',
        '实现度精判（impl-recall 64 候选 + 源码精判）——已有代码不重复造轮子',
        '双冻结用户确认——架构与契约是编码的地基，地基必须人拍板',
      ],
      boundary: [
        '不管「接口契约的字段级定义」——那是 swe-arch-if 的事',
        '不管「每个模块怎么编码」——那是 swe-coding-plan 的事',
        'swe-arch 只回答「模块怎么分、需求怎么派、依赖怎么定」',
      ],
      example:
        'SWR「TSP 平台通信」→ 映射给 MOD-001/tsp（evolve）；「BLE 组网」→ MOD-008/bt_app（evolve）+ MOD-019/m2m（retain）；缺「openapi」→ 裁决 MOD-015（new）。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '架构师', who: '/yxspec:swe-arch-v2 命令（薄编排）', does: '5 阶段串联：每阶段先跑门禁脚本（rc=2 即停），加载对应 skill 执行' },
      { kind: 'cyan', role: '5 个 skill', who: 'mapping / impl-judge / freeze / contract / docgen', does: '各自完成映射、精判、冻结、契约、文档生成' },
      { kind: 'amber', role: '门禁脚本', who: 'gate_arch_v2.py --gate <stage>', does: '5 个门禁点：mapping/impl-judge/freeze/contract/docgen，rc=0 放行 rc=2 停' },
      { kind: 'green', role: '用户', who: '2 个冻结点', does: 'freeze 架构 + contract 契约冻结，必须主会话确认，禁止委派 subagent' },
    ],
    whyTitle: '为什么要这样分工？（为什么 5 阶段 + 2 冻结点）',
    whyShell: [
      '为什么 5 阶段串联？—— mapping → 精判 → 冻结 → 契约 → 文档有严格依赖，门禁脚本保证顺序不乱',
      '为什么 2 个冻结点必须人工确认？—— 架构与契约是编码地基，地基错了后面全错，必须人拍板',
      '为什么 impl-judge 要源码精判？—— 现有代码 54 模块，分清 existing/partial/new 才能决定 evolve/retain，避免重复造轮子',
    ],
    whyMemory: '记住 <Hl>「5 阶段门禁串联 + 2 冻结点人工确认」</Hl>——顺序靠脚本，地基靠人拍。',
    instance: {
      stats: [
        { num: '3h 31m', label: '总耗时', desc: '10:38 → 14:10', kind: 'cyan' },
        { num: '57', label: '个模块', desc: '54 基线 + 3 新增', kind: 'cyan' },
        { num: '420', label: '条 SWR 全映射', desc: 'mapping rc=0', kind: 'cyan' },
        { num: '37', label: '条跨模块依赖', desc: 'API 31 + MSG 6（25 继承 + 12 新增）', kind: 'cyan' },
        { num: 'confirmed', label: '双冻结', desc: 'freeze @13:28 + contract @13:41', kind: 'green' },
      ],
      memoryLine: '记住这 4 个数字：<Hl>3h31m、57 模块、420 SWR 全映射、37 依赖</Hl>。答辩时说「双冻结用户确认、三方一致性 PASS」就是一句话结论。',
    },
    downstream: ['sw-arch-*.md → swe-arch-if', 'mod-swr-mapping.json → 编码计划', '契约 → 接口规范'],
    downstreamLine: '一句话：<Hl>SW-ARCH 是「编码的开工图」</Hl>——swe-arch-if 按它定契约，编码按它分工。',
    ironRules: [
      '<b>门禁先行</b> —— 每阶段先跑 gate_arch_v2.py，rc=2 即停',
      '<b>冻结必人工</b> —— 2 个冻结点主会话确认，禁止委派/自动跳过',
      '<b>不摧毁冻结映射</b> —— preview 不得含 freeze_status: confirmed（防重跑毁约）',
      '<b>三方一致性</b> —— sw-arch/contract/modules 三个文件互相一致 + integrity-check',
      '<b>任务文件同 v1</b> —— task_sw_arch.md，任务行 ID 沿用 v1 前缀 ARCH-',
    ],
    tutor: {
      question: '考官问「swe-arch 的两个冻结点是什么？为什么必须人工？」怎么答？',
      answer: (
        <span>
          <b>冻结点1（freeze）</b>：架构预览 + 质量决策 C1~C5，用户确认后 `freeze_status: confirmed`；
          <b>冻结点2（contract）</b>：跨模块契约（37 依赖），用户确认后 `contract_freeze_status: confirmed`。
          因为<b>架构与契约是编码的地基</b>——地基错了后面全错，所以必须人工拍板，禁止委派 subagent、禁止自动跳过。真实运行两个冻结都 confirmed（@13:28 / @13:41）。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '5 阶段串联 · 每阶段门禁把关 · 2 冻结点人工确认',
  flowTitle: '执行流程：8 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>每阶段前必须跑门禁脚本（rc=2 即停）</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'ARCH-GATE', label: '前置门禁 + 门控检查',
      action: 'gate_arch_v2.py --gate mapping（4 项 rc=0）+ session-open/layout-check/CLQ 检查（无 blocking）',
      post: '4 项 rc=0', edge: '门禁通过',
      why: '前置不齐不进入 mapping，防止摧毁已冻结映射',
    },
    {
      id: 1, name: 'ARCH-BASELINE', label: '基线/代码清单（1m 26s）',
      action: 'parse-baseline-modules（54 模块）+ code-inventory（66 条）：基线 APP13/SRV20/HAL_DRV20/BSP1',
      post: 'baseline-modules.json + code-inventory', edge: '基线清单',
      why: '先摸清已有代码，才能决定 evolve/retain/new',
    },
    {
      id: 2, name: 'ARCH-MAPPING', label: 'SWR→模块映射（36m，opus×5）',
      action: 'skeleton（420 跳 3）+ 5 片并行 worker（417 条）+ merge + 主会话裁决 proposal：openapi→MOD-015/led→MOD-016（新）、emc/harness 驳回',
      post: 'mod-swr-mapping.json（57 模块 / 420 SWR）', edge: '映射稿',
      why: '每条 SWR 都要有归属，裁决不一致项',
      badges: [{ kind: 'cyan', text: '并发 ×5' }],
    },
    {
      id: 3, name: 'ARCH-MOD-ACTION', label: 'module_action 回填（2m 49s）',
      action: 'mapping-validate --fix 自动回填 retain→evolve：evolve 16 / retain 38 / new 3（分布 APP225/SRV69/NULL126）',
      post: 'module_action 齐全', edge: '动作标记',
      why: '模块动作（evolve/retain/new）决定编码计划工作量',
    },
    {
      id: 4, name: 'ARCH-IMPL', label: '实现度精判（57m，opus 主会话）',
      action: 'impl-recall（64 候选）+ analyze（existing 59/partial 97/new 132/unknown 132）+ C2 分流 11 模块 58 SWR + 主会话逐模块精判（bms 实测 0x01/0x3A/0x3B/0x3C 已实现）',
      post: 'impl_status 全 SWR 有值', edge: '精判结果',
      why: '分清已有/部分/新写，避免重复造轮子',
      badges: [{ kind: 'amber', text: '分类器中断降级' }],
    },
    {
      id: 5, name: 'ARCH-PREVIEW', label: '架构预览 + 冻结点1（50m 52s）',
      action: 'quality_decisions C1~C5（19 模块）+ 预览渲染 + 契约预扫（26 API/58 msg）+ 用户确认冻结',
      post: 'freeze_status: confirmed @13:28:38', edge: '架构冻结',
      why: '架构是编码地基，必须人拍板',
      badges: [{ kind: 'green', text: '用户确认 ❄' }],
    },
    {
      id: 6, name: 'ARCH-CONTRACT', label: '跨模块契约 + 冻结点2（19m 33s）',
      action: '继承基线 §7.3（25 依赖）+ §8 交互 + §9 状态机 + 新增 6 依赖（有源码证据）+ 6 DSC + 2 业务状态机 + 7 架构特性 + 用户确认契约冻结',
      post: 'contract_freeze_status: confirmed @13:41:23', edge: '契约冻结',
      why: '模块间怎么配合，先定死再分工',
      badges: [{ kind: 'green', text: '用户确认 ❄' }],
    },
    {
      id: 7, name: 'ARCH-DESIGN', label: '文档生成 + 三方一致性（2m 25s）',
      action: 'gen_sw_arch（§1~§9，1501 行，C1~C4 全 PASS）+ if-contract-build（57 模块/37 依赖）+ list-modules + 三方一致性 + integrity-check',
      post: 'sw-arch-*.md + contract.json + modules.json', edge: '架构文档入库',
      why: '文档是编码的开工图，三方一致保证不打架',
      badges: [{ kind: 'green', text: 'integrity-check rc=0' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '门禁', icon: '🔒', color: 'amber', sub: 'rc=0' },
    { id: 1, name: '基线清单', icon: '📋', color: 'blue', sub: '54 模块 66 条' },
    { id: 2, name: 'SWR→模块', icon: '🗺️', color: 'cyan', sub: 'mapping ×5' },
    { id: 3, name: '动作回填', icon: '🏷️', color: 'blue', sub: 'e16/r38/n3' },
    { id: 4, name: '实现度精判', icon: '🔍', color: 'cyan', sub: 'e/p/n/u' },
    { id: 5, name: '冻结1', icon: '❄', color: 'green', sub: '用户确认' },
    { id: 6, name: '冻结2', icon: '❄', color: 'green', sub: '契约确认' },
    { id: 7, name: '文档生成', icon: '📄', color: 'cyan', sub: '1501 行' },
  ],
  flowTutor: {
    question: '考官问「swe-arch 的实现度精判（impl-judge）为什么重要？」怎么答？',
    answer: (
      <span>
        因为项目已有 54 个基线模块、66 条代码清单——<b>不精判就不知道哪些代码能复用</b>。
        真实做法：impl-recall 64 候选 → analyze 分四类（existing 59/partial 97/new 132/unknown 132）→ 主会话逐模块源码精判
        （如 bms 模块实测 0x01/0x3A/0x3B/0x3C 已在 yx_proto_sif.c 实现）。
        <b>精判决定 module_action（evolve/retain/new）</b>，直接决定编码计划的工作量，避免重复造轮子。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'sw-srs-trainees-2026.md', role: '软件需求（420 条 SWR）—— 映射来源' },
      { name: '基线模块', role: '54 个基线模块 + code-inventory 66 条（APP13/SRV20/HAL_DRV20/BSP1）' },
      { name: '架构基线 §7.3/§8/§9', role: '依赖/交互/状态机（继承 25 依赖）' },
      { name: 'CLQ', role: '无 blocking 状态' },
    ],
    inputKeyline: '最关键输入是 <Hl>SW-SRS + 基线</Hl>——需求要派发，已有代码要盘点。',
    outputs: [
      { name: 'sw-arch-trainees-2026.md', role: '软件架构文档（§1~§9，1501 行）' },
      { name: 'mod-swr-mapping.json', role: 'SWR→模块映射（57 模块 / 420 SWR + module_action）' },
      { name: 'sw-arch-if-contract.json', role: '跨模块契约（37 依赖：API 31 + MSG 6）' },
      { name: 'sw-arch-modules.json', role: '模块清单（全量）' },
      { name: 'task_sw_arch.md', role: '任务台账（ARCH-GATE~DESIGN 9 行）' },
    ],
    outputKeyline: '核心输出链：<Hl>mapping → 精判 → 冻结 → 契约 → 文档</Hl>，每步交付物独立可验证。',
    callGraphs: [
      {
        title: '命令级 · swe-arch 与上下游的关系',
        color: 'cyan',
        from: { id: 'swarch', cmd: '/yxspec:swe-arch-v2', sub: 'SWE.2 · 软件架构设计', desc: '把 SWR 映射到模块并设计架构' },
        tos: [
          { id: 'up-swe', cmd: 'swe-analysis', edge: 'SW-SRS（420 条）', edgeDesc: '架构设计输入', desc: '上游：420 条 SWR 是映射来源（review 通过后进入）。' },
          { id: 'down-if', cmd: 'swe-arch-if-v2', edge: 'sw-arch + 契约', edgeDesc: '接口契约输入', desc: '下游：接口规范按架构与契约定义字段级接口。' },
          { id: 'down-plan', cmd: 'swe-coding-plan', edge: 'mapping + modules', edgeDesc: '编码计划依据', desc: '下游：19 模块编码计划按映射与模块清单排产。', dashed: true },
          { id: 'side-review', cmd: 'yxspec:review swe_arch', edge: '审查报告', edgeDesc: '阶段审查', desc: '阶段审查通过后进 swe-arch-if。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个阶段干活',
        color: 'blue',
        from: { id: 'orch', cmd: '编排器（薄编排）', sub: '5 阶段串联', desc: '每阶段先跑门禁脚本，加载 skill 执行' },
        tos: [
          { id: 'gate', cmd: 'gate_arch_v2.py', edge: '5 个门禁点', edgeDesc: 'rc=0 放行 rc=2 停', desc: 'mapping/impl-judge/freeze/contract/docgen 每阶段前置检查。' },
          { id: 'skill', cmd: '5 个 skill', edge: 'mapping→impl-judge→freeze→contract→docgen', edgeDesc: '顺序执行', desc: '各自完成映射、精判、冻结、契约、文档生成。' },
          { id: 'user', cmd: '用户', edge: '2 个冻结点', edgeDesc: '必须主会话确认', desc: 'freeze + contract 冻结人工拍板，禁止委派 subagent。', dashed: true },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（门禁 + skill + 用户）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-arch-v2' },
      { seg: 'input', label: 'SW-SRS (420)' },
      { seg: 'script', label: 'gate mapping' },
      { seg: 'worker', label: 'mapping ×5' },
      { seg: 'script', label: 'gate impl-judge' },
      { seg: 'worker', label: '精判' },
      { seg: 'worker', label: '冻结1 ❄' },
      { seg: 'worker', label: '契约+冻结2 ❄' },
      { seg: 'worker', label: 'docgen' },
      { seg: 'output', label: 'sw-arch-*.md' },
    ],
    pipeKeyline: '蓝色=脚本门禁 · 琥珀=skill/Worker · 绿色=产物——「顺序靠脚本，地基靠人拍」。',
    qualityGates: [
      { code: 'gate', name: '5 个门禁点', phase: '各阶段前置', check: 'mapping/impl-judge/freeze/contract/docgen 每阶段 rc=0 放行', outcome: '4 项 rc=0' },
      { code: 'freeze', name: '冻结点1', phase: '阶段3', check: 'freeze_status: confirmed（用户确认）', outcome: 'confirmed' },
      { code: 'contract', name: '冻结点2', phase: '阶段4', check: 'contract_freeze_status: confirmed（用户确认）', outcome: 'confirmed' },
      { code: 'integrity', name: '三方一致性', phase: '阶段5', check: 'sw-arch/contract/modules 一致 + integrity-check', outcome: 'rc=0' },
    ],
    gateNote: '对比 swe-analysis：SWE.1 是「9 步确定性 + 1 步 AI」；SWE.2 是「5 阶段门禁串联 + 2 冻结点人工」——SWE.2 的关卡在「人」不在「脚本」。',
    failures: [
      { fault: 'gate rc=2', action: '按 stderr 提示补齐前置产物，不硬闯' },
      { fault: 'mapping 冲突 unresolved', action: '主会话裁决（openapi→MOD-015 等）' },
      { fault: '分类器中断', action: '主会话读窗口 + Grep 源码逐模块精判（真实发生）' },
      { fault: 'preview 含 confirmed', action: '禁止重跑毁约，冻结后不可变' },
      { fault: '三方不一致', action: '回 docgen 修复重跑' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-arch 的调用关系怎么讲？',
    answer: (
      <span>
        「swe-arch 消费 SW-SRS（420 条），<b>5 阶段门禁串联</b>：mapping（57 模块）→ impl-judge（精判）→ 冻结1（用户确认）→
        契约 + 冻结2（37 依赖，用户确认）→ docgen（1501 行文档 + 三方一致性），产出 sw-arch-*.md + mapping + contract，
        给 swe-arch-if 定契约、编码计划排产。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sw-arch-trainees-2026.md', kind: 'cyan', what: '软件架构文档：§1~§9（1501 行，C1~C4 全 PASS）', who: 'swe-arch-if + 编码的输入' },
    { name: 'mod-swr-mapping.json', kind: 'amber', what: 'SWR→模块映射：57 模块 / 420 SWR + module_action（e16/r38/n3）', who: '编码计划 + 追溯' },
    { name: 'sw-arch-if-contract.json', kind: 'amber', what: '跨模块契约：37 依赖（API 31 + MSG 6）', who: 'swe-arch-if 接口规范' },
    { name: 'sw-arch-modules.json', kind: 'amber', what: '模块清单（全量 57）', who: '编码计划排产' },
    { name: 'baseline-modules.json', kind: 'green', what: '基线模块清单（54，补建纳入提交）', who: '基线对照' },
    { name: 'task_sw_arch.md', kind: 'green', what: '任务台账：ARCH-GATE~DESIGN 9 行', who: '门控放行 + 证据链' },
  ],
  artifactsChain: '一句话串起来：<Hl>mapping（SWR 派发）→ 精判（复用决策）→ 冻结（人拍板）→ 契约（配合规则）→ 文档（开工图）</Hl>。',
  samplesTitle: '模块动作真实样例（点开看字段）',
  samples: [
    {
      id: 'MOD-001', badges: [{ kind: 'cyan', text: 'evolve' }], meta: '16 个 evolve 之一',
      title: 'tsp 模块：TSP 平台通信（MQTT 长连接 + 心跳保活）',
      fields: [
        { k: '动作', v: 'evolve（已有实现需演进）' },
        { k: '覆盖 SWR', v: 'TSP 域 SWR（协议类）' },
        { k: '来源', v: 'SS-TSP 子系统 + 基线 §7.3 依赖' },
      ],
    },
    {
      id: 'MOD-015', badges: [{ kind: 'blue', text: 'new' }], meta: '3 个 new 之一',
      title: 'openapi 模块：主会话裁决新增（无基线对应）',
      fields: [
        { k: '动作', v: 'new（新建模块）' },
        { k: '裁决过程', v: 'mapping 阶段主会话裁决：openapi → MOD-015（新）' },
        { k: '原因', v: '基线 54 模块无对应，需求必须有人接' },
      ],
    },
    {
      id: 'MOD-016', badges: [{ kind: 'amber', text: 'new + 驳回案例' }], meta: '裁决示例',
      title: 'led 模块：新增；emc/harness_nfr 被驳回（硬件域 null）',
      fields: [
        { k: '裁决 1', v: 'led → MOD-016（新）' },
        { k: '裁决 2', v: 'emc / harness_nfr → 驳回（硬件域 null，不派发给软件）' },
        { k: '结果', v: 'SRV 例外授权 5 模块；0203→tsp / 0192→null / 0010→null' },
      ],
    },
  ],
  samplesNote: 'module_action（evolve/retain/new）直接决定编码计划的工作量——这是「不重复造轮子」的证据。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.2 · 软件架构',
    title: '门控 · 追溯 · AI 协同（swe-arch 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'swe-analysis 怎么表现', 'swe-arch 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', 'gate 前置 + verify 46 项', '5 阶段门禁脚本 + 2 冻结点人工确认'],
        ['<Badge kind="green">追溯</Badge>', 'PRD 全覆盖 + 编号映射 id-map', 'SWR→模块映射 100%（mod-swr-mapping.json）+ 源码精判证据'],
        ['<Badge kind="blue">AI 协同</Badge>', '9 步确定性 + 1 步 AI', '5 skill 门禁串联 + 主会话裁决 + 用户 2 冻结点'],
      ],
    },
    sections: [
      {
        title: '追溯链：SWR → 模块 → 契约 → 文档',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'SWR (420 条)' },
          { kind: 'output', label: 'mapping' },
          { kind: 'output', label: '模块 ×57' },
          { kind: 'output', label: '契约 ×37' },
          { kind: 'output', label: 'sw-arch 文档' },
        ],
        keyline: '每跳可追溯：SWR→模块在 mapping.json；模块→契约在 contract.json；三者与文档三方一致性校验。',
      },
      {
        title: 'AI 协同：薄编排 + skill + 人工冻结点',
        type: 'table',
        cols: ['角色', '干什么', '为什么'],
        rows: [
          ['<code>gate_arch_v2.py</code>', '5 个门禁点前置检查（rc=0/rc=2）', '顺序靠脚本保证，防跳阶段'],
          ['<code>5 个 skill</code>', 'mapping/impl-judge/freeze/contract/docgen', '领域规则在 skill 内，命令保持薄'],
          ['<code>用户</code>', '2 个冻结点确认', '地基必须人拍板，禁止委派'],
          ['<code>主会话裁决</code>', 'mapping 冲突裁决 + 精判补判', '分类器中断时人工接棒（真实发生）'],
        ],
        keyline: '「脚本管顺序、skill 管领域、用户管地基」——三层各司其职。',
      },
      {
        title: '真实风险处置：分类器中断降级（57m 精判）',
        type: 'ul',
        items: [
          '现象：impl 分类器中断 → worker 无法继续',
          '处置：主会话读窗口 + Grep 源码逐模块精判（bms 实测 0x01/0x3A/0x3B/0x3C 已实现于 yx_proto_sif.c）',
          '补判：MOD-015/016 补判 6 条；IF-0030/0063 硬件、IF-0057/0060/0061/0062 平台侧归 null',
          '结果：58 条 needs_ai_review 全覆盖，--require-impl-status rc=0',
        ],
        keyline: 'AI 中断不硬等——主会话人工接棒 + 源码取证，这是「编排器兜底」的样本。',
      },
    ],
  },
};

export default swArchChapter;
