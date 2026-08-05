/**
 * yxspec-tutor · sqt-strategy 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/sqt-strategy.md + project/tasks/task_sqt_strategy.md
 * 真实运行：2026-07-29（SQTTP-001~005，completed_with_warnings）
 */

const strategyChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:sqt-strategy · SYS.5 BP1 / MAN.3 · 测试策略方案',
    oneLiner:
      '基于 PRD + 协议 references + SYS-ARCH + 外设能力/映射表构建测试策略方案（SQT-TP）：测试范围、层级分配、方法策略、环境架构、优先级框架、用例生成策略。先行于测试需求分析。',
    analogy:
      '把 sqt-strategy 想象成「考纲编制」：考试前先定考什么（测试范围）、分几个难度级（测试层级）、用什么题型（测试方法）、在哪考（测试环境）、哪些题重点考（优先级）——考纲定了，才能出卷（tr-analysis 拆 TR）、出题（case-design 设计用例）、写答题卡（script-gen 生成脚本）。考纲是后面所有工作的总框架。',
    memoryLine: '记住：<Hl>sqt-strategy = 测试考纲</Hl>——先行定框架，下游全继承。',
    purpose: {
      oneLiner:
        '12 步：规划 → 加载 PRD/协议/架构 → 测试范围 → 覆盖基线预估表（三分法 FUNC/NFR×8/IF）→ 层级分配 → 方法策略 → 环境架构 → 外设能力 → 优先级框架 → 用例生成策略 → 特殊要求 → 产物生成；SQT-TP 为下游提供方法论/环境/域划分框架约束。',
      input: {
        title: '4 项 Gate',
        items: [
          'Gate 0：spec_id 提取（project/config/yxspec.json）',
          'Gate 1：PRD 存在（prd-trainees-2026.md）',
          'Gate 2：SYS-ARCH 存在（sys-arch-trainees-2026.md）',
          'Gate 3：IF 协议输入源（*-parser skill references 优先 + inputs/parsed 备用）',
        ],
        note: '本工程实测 3 个 parser skill：MQTT 44 cmd + BLE 11 + SIF 9 = 64 cmd_id',
      },
      processTitle: '12 步',
      process: [
        '① 规划：生成 task 文件 + Read 模板（sqt-tp.md.tpl）',
        '② 加载：PRD 三列综合提取 + SYS-ARCH 子系统/接口 + 协议 cmd_id 基线',
        '③ 测试范围：被测对象 + 需求覆盖 + 接口范围 + 排除范围',
        '④ 覆盖基线预估表（三分法 FUNC/NFR×8/IF，预估级非逐条）',
        '⑤ 测试层级分配（MIL/SIL/HIL/实车/台架）',
        '⑥ 测试方法策略（FUNC/NFR/IF 三大领域）',
        '⑦ 测试环境架构（三层栈 + Mock-DUT 主从 + 观察者视角）',
        '⑧ 自动化外设能力（peripheral_skill_capability_api.md → §8.5~8.7）',
        '⑨ 需求优先级框架（频率 × 影响范围，域/协议级预标注）',
        '⑩ 测试用例生成策略（正向主武器 + 辅助武器边界/异常）',
        '⑪ 测试特殊要求（功能安全/法规/网络安全/性能/稳定性）',
        '⑫ 生成产物：sqt-tp-{spec_id}.md',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'sqt-tp-trainees-2026.md', what: '测试策略方案规格书（§1~§12）', consumer: '下游 TR/TC/脚本框架约束' },
        { name: 'task_sqt_strategy.md', what: '本阶段任务文件（SQTTP-001~005）', consumer: '门控 + 追溯' },
      ],
      value: [
        '12 功能域 + 14 子系统 + 64 cmd_id 基线全提取',
        '外设能力核对：yx-automcp 9 服务与 §8.6 一致',
        'completed_with_warnings（ASIL-C/D 待澄清 + 环境设备需采购）',
      ],
      boundary: [
        '不逐条生成用例 —— 那是 sqt-case-design 的事',
        '不逐条拆 TR —— 那是 sqt-tr-analysis 的事',
        'sqt-strategy 只回答「考什么、怎么考、在哪考、重点考什么」',
      ],
      example:
        '§11.3 功能域映射表：12 功能域（FD 短码格式 2~5 字符大写英文，如 ALM/BLE/CFG）——下游 TC 子章节锚点与其严格 1:1 对齐。',
    },
    rolesTitle: '谁在干活？（命令 / 模板 / 外设能力）',
    roles: [
      { kind: 'blue', role: '测试策略队长', who: '/yxspec:sqt-strategy 命令', does: '12 步框架构建 + 产物生成' },
      { kind: 'cyan', role: '模板', who: 'sqt-tp.md.tpl（唯一权威）', does: '字段结构约束（禁止省略/简化）' },
      { kind: 'amber', role: '外设能力', who: 'peripheral_skill_capability_api.md + stimulus_observation_map.md', does: '自动化外设选型 + 激励-观测映射' },
      { kind: 'green', role: '协议解析', who: '3 个 *-parser skill（MQTT/BLE/SIF）', does: 'cmd_id 全集（IF 测试主输入源）' },
    ],
    whyTitle: '为什么测试策略先行？',
    whyShell: [
      '为什么先行于 TR？—— 方法论/环境/域划分是框架约束，先定框架下游才有依据',
      '为什么三分法？—— FUNC/NFR×8 子类/IF 覆盖全需求类型，缺失类别视为不合格',
      '为什么观察者视角强制？—— 从外设（Master）视角调用，模拟 DUT 外部交互对象',
    ],
    whyMemory: '记住 <Hl>「考纲先行，下游继承」</Hl>——12 步构建 SQT-TP 总框架。',
    instance: {
      stats: [
        { num: '12', label: '个功能域', desc: 'PRD 219 REQ-F 分组', kind: 'cyan' },
        { num: '64', label: 'cmd_id 基线', desc: 'MQTT 44 + BLE 11 + SIF 9', kind: 'cyan' },
        { num: '9', label: '个外设服务', desc: 'yx-automcp（io_ctl/sif/ble/led…）', kind: 'amber' },
        { num: '13', label: '项完成条件', desc: '全部满足', kind: 'green' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>12 功能域、64 cmd_id 基线</Hl>。答辩时说「测试策略 12 步定框架，三分法全覆盖」就是一句话结论。',
    },
    downstream: ['SQT-TP → TR 拆解', '层级/武器 → 软约束', 'FD 短码 → TC 对齐'],
    downstreamLine: '一句话：<Hl>测试策略是「下游测试工作的宪法」</Hl>——框架约束全链继承。',
    ironRules: [
      '<b>模板为唯一权威</b> —— 字段结构/顺序/名称以模板为准，禁止简化省略',
      '<b>测试层级全覆盖</b> —— FUNC/NFR×8/IF 缺失类别视为不合格',
      '<b>观察者视角强制</b> —— Mock 外设视角为下游强制遵守项',
      '<b>FD 短码一致</b> —— §3.2/§5.2.1/§11.3 三处功能域标识可追溯到同一套短码',
    ],
    tutor: {
      question: '考官问「SQT-TP 的核心产出和下游怎么衔接？」怎么答？',
      answer: (
        <span>
          SQT-TP 是测试考纲：<b>测试范围（§4）+ 层级分配（§5）+ 方法策略（§6）+ 环境架构（§8）+
          优先级框架（§10）+ 用例生成策略（§11）</b>。
          下游衔接：sqt-tr-analysis 在 TP 框架内拆 TR（继承 §5 层级/§6 武器/§11.3 域划分），
          sqt-case-design 按 §11.2 模型生成用例，sqt-script-gen 翻译 Behave 脚本。
          本工程实测：<b>12 功能域 + 64 cmd_id 基线 + 9 外设服务</b>。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '12 步 · 框架先行',
  flowTitle: '执行流程：8 步互动流程图',
  flowSub: '12 步归并为 8 大节点（真实执行顺序）。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: '规划 + 加载', label: 'Step 1-2 规划 + 加载上游',
      action: '生成 task 文件 + Gate 4 项检查 + Read PRD 三列综合提取 + SYS-ARCH 子系统/接口 + 协议 cmd_id 基线',
      post: '任务文件 + 输入源就绪', edge: '输入就绪',
      why: '输入源（PRD/架构/协议）是全部推导的基础',
      badges: [{ kind: 'green', text: '4 Gate 过' }],
    },
    {
      id: 1, name: '测试范围', label: 'Step 3-4 测试范围 + 覆盖基线',
      action: '被测对象（14 子系统）+ 需求覆盖（三分法预估）+ 接口范围 + 排除范围 → §4.2 基线预估表（FUNC/NFR×8/IF 共 10 行）',
      post: '§3 范围 + §4.2 基线表', edge: '范围→层级',
      why: '先划范围，再定怎么测',
    },
    {
      id: 2, name: '层级分配', label: 'Step 5 测试层级分配',
      action: '三大类映射测试层级（MIL/SIL/HIL/实车/台架）→ §5.2.1 FUNC / §5.2.2 NFR×8 / §5.2.3 IF 三张子表',
      post: '§5.2 三子表', edge: '层级→方法',
      why: '层级是下游 TR「测试层级」字段的软约束',
    },
    {
      id: 3, name: '方法策略', label: 'Step 6 测试方法策略',
      action: '三大领域：FUNC（主武器→Logic 结构落地 + oracle 来源 + 台架裁剪）/ NFR×8（采样容差+标准依据）/ IF（PCT 核心 §6.3.0~6.3.8）',
      post: '§6.2.1/6.2.2/6.3', edge: '方法→环境',
      why: '逐条武器由下游 TR 直供，TP 只定方法论决策',
    },
    {
      id: 4, name: '环境架构', label: 'Step 7-8 环境架构 + 外设能力',
      action: '三层栈（引擎/调度/物理/DUT）+ Mock-DUT 主从 + 观察者视角（强制）→ §8.5 拓扑 + §8.6 外设索引 + §8.7 依赖矩阵',
      post: '§8.1~8.7', edge: '环境→优先级',
      why: '外设依赖必须有 API 支撑，无法自动化标注 [需人工介入]',
      badges: [{ kind: 'amber', text: '观察者视角' }],
    },
    {
      id: 5, name: '优先级框架', label: 'Step 9-11 优先级 + 用例策略 + 特殊要求',
      action: '频率×影响范围 P 级矩阵（§10）+ 用例生成模型正向主武器+辅助武器（§11.2）+ FD 映射表（§11.3）+ 特殊要求五类（§12）',
      post: '§10/§11/§12', edge: '框架→产物',
      why: '逐条 TR 优先级移交下游 §4 评定，TP 只给框架',
    },
    {
      id: 6, name: '产物生成', label: 'Step 12 生成 SQT-TP',
      action: '按模板生成 sqt-tp-trainees-2026.md（单次 Write≤50 行，超出 Edit 追加）+ FD 短码三处一致性自检',
      post: 'SQT-TP 文件', edge: '完成条件',
      why: '字段结构以模板为唯一权威',
      badges: [{ kind: 'green', text: '13 项自检' }],
    },
    {
      id: 7, name: '完成条件', label: '13 项完成条件 + 状态',
      action: '测试层级全覆盖 / 方法匹配完整 / 外设可落地 / 优先级框架 / 用例策略 / 特殊要求 / MC/DC 100% → completed_with_warnings',
      post: 'completed_with_warnings', edge: '建议 review',
      why: 'ASIL-C/D 待澄清 + 环境设备需采购 → 记 warnings',
      badges: [{ kind: 'amber', text: 'with_warnings' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '规划加载', icon: '📥', color: 'blue', sub: '4 Gate' },
    { id: 1, name: '测试范围', icon: '🎯', color: 'cyan', sub: '三分法' },
    { id: 2, name: '层级分配', icon: '🏗️', color: 'cyan', sub: 'MIL/SIL/HIL' },
    { id: 3, name: '方法策略', icon: '🧪', color: 'cyan', sub: 'FUNC/NFR/IF' },
    { id: 4, name: '环境外设', icon: '🖥️', color: 'amber', sub: '9 服务' },
    { id: 5, name: '优先级', icon: '⚖️', color: 'cyan', sub: '频率×影响' },
    { id: 6, name: '产物生成', icon: '📄', color: 'cyan', sub: 'SQT-TP' },
    { id: 7, name: '完成条件', icon: '✅', color: 'green', sub: '13 项' },
  ],
  flowTutor: {
    question: '考官问「SQT-TP 的观察者视角原则是什么？为什么强制？」怎么答？',
    answer: (
      <span>
        观察者视角原则：<b>所有外设能力 API 的调用均从外设（Master）视角出发</b>，模拟 DUT 的外部交互对象
        （MQTT=TSP 云平台、Power=车辆电源、DebugLog=调试终端）。
        强制原因：<b>测试观察点必须锚定 DUT</b>——从外部实体视角激励、从 DUT 观测，
        防止用例设计者站在实现视角自证。违反即不合格，是下游 TC 设计/脚本生成的强制遵守项。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: 'PRD', role: '需求三列综合提取（219 REQ-F / 12 功能域）' },
      { name: '协议 references', role: '3 个 parser skill（MQTT 44 + BLE 11 + SIF 9 cmd_id）' },
      { name: 'SYS-ARCH', role: '14 子系统 / 374 SR / EXT-IF 10 + INT-IF 6' },
      { name: '外设能力/映射表', role: 'peripheral_skill_capability_api.md + stimulus_observation_map.md' },
    ],
    inputKeyline: '最关键输入是 <Hl>PRD + 协议 cmd_id 基线</Hl>——范围与基线由此推导。',
    outputs: [
      { name: 'sqt-tp-trainees-2026.md', role: '测试策略方案（§1~§12 框架）' },
      { name: 'task_sqt_strategy.md', role: '任务台账（SQTTP-001~005）' },
    ],
    callGraphs: [
      {
        title: '命令级 · sqt-strategy 与上下游的关系',
        color: 'cyan',
        from: { id: 'tp', cmd: '/yxspec:sqt-strategy', sub: 'SYS.5 BP1 · 测试策略', desc: '测试考纲' },
        tos: [
          { id: 'up-prd', cmd: 'prd-analysis + sys-arch', edge: '需求 + 架构', edgeDesc: '范围/层级/环境来源', desc: '上游：PRD 与架构是推导输入。' },
          { id: 'down-tr', cmd: 'sqt-tr-analysis', edge: '框架约束', edgeDesc: '继承层级/武器/域划分', desc: '下游：在 TP 框架内拆解 TR。' },
          { id: 'down-tc', cmd: 'sqt-case-design', edge: '用例模型', edgeDesc: '§11.2 生成策略', desc: '下游：按 TP 用例生成模型设计。', dashed: true },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:sqt-strategy' },
      { seg: 'input', label: 'PRD + 协议 + 架构' },
      { seg: 'script', label: '4 Gate' },
      { seg: 'worker', label: '范围/层级/方法' },
      { seg: 'worker', label: '环境/优先级/策略' },
      { seg: 'output', label: 'SQT-TP' },
    ],
    qualityGates: [
      { code: 'Gate', name: '4 项 Gate', phase: '前置', check: 'spec_id / PRD / SYS-ARCH / IF 协议源', outcome: '全 PASS' },
      { code: 'CHK', name: '完成条件', phase: '收尾', check: '13 项（层级全覆盖/方法匹配/外设可落地…）', outcome: '全满足' },
    ],
    failures: [
      { fault: 'PRD 缺失', action: '阻塞：先完成需求阶段产出 PRD' },
      { fault: 'IF 无协议输入源', action: '阻塞：提供 parser skill 或执行 init 转换' },
      { fault: 'SYS-ARCH 缺失', action: 'WARNING：基于 PRD 推导' },
    ],
  },
  ioTutor: {
    question: '答辩时 sqt-strategy 怎么讲？',
    answer: (
      <span>
        「sqt-strategy 构建测试策略方案（SQT-TP）：4 Gate 检查后 12 步生成
        <b>测试范围（三分法）+ 层级分配（MIL/SIL/HIL）+ 方法策略 + 环境架构（观察者视角）+ 优先级框架 + 用例生成策略</b>。
        本工程实测：12 功能域 + 64 cmd_id 基线 + 9 外设服务核对，
        13 项完成条件全满足，状态 completed_with_warnings（ASIL 待澄清 + 设备待采购）。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sqt-tp-trainees-2026.md', kind: 'green', what: '测试策略方案（§1~§12，status=draft）', who: '下游框架约束' },
    { name: 'peripheral_skill_capability_api.md', kind: 'amber', what: '外设能力 API（yx-automcp 9 服务）', who: '自动化选型依据' },
    { name: 'stimulus_observation_map.md', kind: 'amber', what: '激励-观测映射表（SIF/BLE 穿透型）', who: 'oracle 归属单一权威' },
    { name: 'task_sqt_strategy.md', kind: 'cyan', what: '任务台账（SQTTP-001~005）', who: '门控 + 追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>PRD+协议+架构 → 范围/层级/方法/环境/优先级 → SQT-TP 框架</Hl>。',
  samplesTitle: '真实策略样例（点开看字段）',
  samples: [
    {
      id: '§11.3', badges: [{ kind: 'cyan', text: 'FD 短码' }], meta: '功能域映射',
      title: '12 功能域映射表（FD 短码格式约束）',
      fields: [
        { k: '格式', v: '2~5 字符大写英文缩写（§0.3）' },
        { k: '锚点', v: 'PRD 功能域分组，禁止硬编码' },
        { k: '对齐', v: '下游 TC 子章节锚点与其严格 1:1' },
      ],
    },
    {
      id: '§8.6', badges: [{ kind: 'amber', text: '9 服务' }], meta: '外设能力',
      title: 'yx-automcp 外设能力索引',
      fields: [
        { k: '服务', v: 'io_ctl/sif/terminal_log/ble/led/tl_mqtt/health_check/tl_ota/llshell' },
        { k: '视角', v: '所有 API 从外设（Master）视角调用' },
        { k: '可行性', v: '无法 API 实现的标注 [需人工介入]/[需新增API]' },
      ],
    },
  ],
  samplesNote: '观察者视角 + FD 短码一致性——TP 的两个强制约束全链生效。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SYS.5 BP1 · 测试策略',
    title: '门控 · 追溯 · AI 协同（sqt-strategy 版）',
    sub: '测试考纲——框架先行。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '4 项 Gate + 13 项完成条件'],
        ['<Badge kind="green">追溯</Badge>', 'PRD/协议/架构 → 各章 → 下游 TR/TC 回链'],
        ['<Badge kind="blue">AI 协同</Badge>', '功能域推导（AI 动态）+ cmd_id 基线（机械）'],
      ],
    },
    sections: [
      {
        title: '三分法分类口径（IF>NFR>FUNC）',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'FUNC（219 REQ-F）' },
          { kind: 'output', label: 'NFR×8 子类（安全/性能/兼容/可靠性…）' },
          { kind: 'output', label: 'IF（64 cmd_id 基线）' },
          { kind: 'output', label: '归类优先级：IF > NFR > FUNC' },
          { kind: 'output', label: '预估基线 vs TR 实数偏差 ≤20% 校验' },
        ],
        keyline: '预估级分类只依赖 §0.1，逐条精确归类由下游 TR 承载——防双源漂移。',
      },
      {
        title: '--fresh 全量重刷模式（先破后立）',
        type: 'ul',
        items: [
          '先破：旧 SQT-TP 主文件 mv 到 project/.fresh-archive/{run_id}/（留后悔药，.gitignore 隔离）',
          '后立：唯一输入 = 当前 PRD + 协议 + SYS-ARCH + 模板，禁读归档区/git 历史',
          '红线：step_capability.md / stimulus_observation_map.md / peripheral_skill_capability_api.md 是跨阶段权威输入，严禁 move',
          '质量门一个不降：层级全覆盖 / 方法匹配 / 范围完整 / 外设可落地 / 观察者视角',
        ],
        keyline: '「AI 看不到历史即无从复用」——隔离归档比口头要求可靠得多。',
      },
    ],
  },
};

export default strategyChapter;
