/**
 * yxspec-tutor · sqt-case-design 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/sqt-case-design.md + project/tasks/task_sqt_case_design_func.md
 * 真实运行：2026-07-29~30（--fresh 模式，FUNC 12 域 428 TC 转正）
 */

const caseChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:sqt-case-design · SYS.5 BP3 · 测试用例设计',
    oneLiner:
      '基于 SQT-TR + SYS-ARCH + SQT-TP 生成 BDD 结构化测试用例（SQT-TC）：三分法分组（FUNC/NFR/IF）→ Briefing Pack → 批次 spawn case-worker → 合并产出。FUNC 12 域 428 TC，覆盖率 100%。',
    analogy:
      '把 sqt-case-design 想象成「按考点出题」：考点清单（TR）到手，开始出题——先分科目（FUNC/NFR/IF 三分法），每科给考生发考纲简报（Briefing Pack），然后一批批老师出题（spawn case-worker，一次 5 个并发），出完按标准答案格式验收（Gherkin 五步法/六步法），最后汇总成试卷册（主索引）并核对覆盖率。',
    memoryLine: '记住：<Hl>case-design = 按 TR 出 BDD 用例</Hl>——FUNC 12 域 428 TC 覆盖率 100%。',
    purpose: {
      oneLiner:
        '9 步：Gate 6 项 → 加载 TR 三分法分组 → SYS-ARCH → TP+Step Capability → Briefing Pack 生成 → 批次 spawn case-worker（FUNC 按功能域分节，滑动窗口并发≤5）→ 收集输出 → 主索引聚合 → 报文完整性门控 + 覆盖率验证；用例 BDD 结构化（Scenario Outline + Examples，五步法/穿透六步法）。',
      input: {
        title: '6 项 Gate（本工程）',
        items: [
          'Gate 0：spec_id（trainees-2026）',
          'Gate 1：sqt-tp-*.md 存在',
          'Gate 2：sqt-tr-func-*.md 存在（12 域 ×470 TR）',
          'Gate 3：sys-arch-*.md 存在',
          'Gate 4：review-sqt_strategy verdict=approved（双签）',
          'Gate 5：review-sqt_tr verdict=approved（双签）',
        ],
        note: 'Gate 6 IF 协议 references 本窗口 SKIP（--top=FUNC）',
      },
      processTitle: '9 步',
      process: [
        '① 规划：task 文件 + --fresh 归档旧 DRAFT',
        '② 加载测试需求：SQT-TR 三分法分组（FUNC 12 域 / NFR 8 子类 / IF 3 协议）',
        '③ 加载系统架构：子系统/接口/状态机',
        '④ 加载测试策略 + Step Capability：TP §11.2 生成模型 + step_capability.md',
        '⑤ 生成 Briefing Pack：每域一份（TR 切片 + 策略约束）',
        '⑥ 派发 Worker：批次 spawn yxspec-sqt-case-worker（并发≤5，FUNC 按域）',
        '⑦ 收集 Worker 输出：self_check 校验',
        '⑧ 生成主汇总索引 + 数据修正',
        '⑨ 覆盖率验证：12/12 域 100% + 报文完整性门控',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'sqt-tc-trainees-2026.md + 分域文件', what: 'BDD 结构化用例（FUNC 428 / NFR 36 / IF 80 = 544 TC）', consumer: '脚本生成输入' },
        { name: 'task_sqt_case_design_*.md', what: '任务台账（FUNC/IF/NFR 分窗口）', consumer: '门控 + 追溯' },
      ],
      value: [
        'FUNC 12 域 428 TC 覆盖率 100%（12/12 域）',
        'BDD 结构化：Scenario Outline + Examples（单 cmd_id 字面值抽槽上提）',
        '--fresh 模式：旧 DRAFT 归档隔离，只据当前 TR 全新生成',
      ],
      boundary: [
        '不翻译脚本 —— 那是 sqt-script-gen 的事',
        '不跑测试 —— 那是 sqt-auto-test 的事',
        'case-design 只回答「每考点出哪些用例、格式怎么定」',
      ],
      example:
        'IF 穿透六步法（激励通道≠观测通道）：A 通道注入 SIF 帧 → B 通道拉取 DUT 产物 → observe_field 判据 == 注入值。',
    },
    rolesTitle: '谁在干活？（命令 / Worker / 模板）',
    roles: [
      { kind: 'blue', role: '用例编排队长', who: '/yxspec:sqt-case-design 命令', does: 'Gate → Briefing Pack → 派发 → 聚合' },
      { kind: 'cyan', role: 'case-worker', who: 'yxspec-sqt-case-worker（并发≤5）', does: '按 Briefing Pack 生成 BDD 用例 + self_check' },
      { kind: 'amber', role: 'Gherkin 模板', who: 'worker §C.2 五步法 / §C.3 穿透六步法', does: '结构形态硬约束（禁止裸 Scenario）' },
    ],
    whyTitle: '为什么用例要 BDD 结构化？',
    whyShell: [
      '为什么 Scenario Outline + Examples？—— 字面值抽槽可参数化，单 cmd_id 一行 Examples 全覆盖',
      '为什么五步法/六步法？—— 显式 send/wait/解析，不依赖框架补 cmd（严格契约模式）',
      '为什么 test oracle 锚定 DUT？—— 判据必须来自 DUT 产物字段，防自证',
    ],
    whyMemory: '记住 <Hl>「BDD 结构化 + oracle 锚定 DUT」</Hl>——428 TC 覆盖率 100%。',
    instance: {
      stats: [
        { num: '428', label: 'FUNC TC', desc: '12 域（sif/ble/daq/gps/alm…）', kind: 'cyan' },
        { num: '100%', label: '覆盖率', desc: '12/12 域', kind: 'green' },
        { num: '3', label: '批次', desc: 'B1 5 大域 + B2 5 中域 + B3 2 小域', kind: 'cyan' },
        { num: '8h+', label: '总耗时', desc: '17:16 → 22:35', kind: 'amber' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>428 TC、覆盖率 100%</Hl>。答辩时说「FUNC 12 域 428 用例全生成，覆盖率 100%」就是一句话结论。',
    },
    downstream: ['TC → 脚本翻译', '主索引 → 追溯', '覆盖率 → 质量门'],
    downstreamLine: '一句话：<Hl>用例设计是「按考点出题」</Hl>——题出全才能考。',
    ironRules: [
      '<b>BDD 原子化</b> —— 单 Scenario 单业务功能点，多外设长链按业务时序展开',
      '<b>禁止裸 Scenario</b> —— 字面值抽槽上提 Examples',
      '<b>oracle 锚定 DUT</b> —— 判据来自 DUT 产物字段（SQT-TP §6.3.8）',
      '<b>负向用例隔离</b> —— 负向/正向用例不混同 Scenario',
    ],
    tutor: {
      question: '考官问「用例设计的 Briefing Pack 和 Worker 派发怎么配合？」怎么答？',
      answer: (
        <span>
          <b>Briefing Pack</b> 是每域的「考纲简报」：TR 切片 + 策略约束（层级/武器/oracle/观测映射），
          worker 自包含执行（不需回读命令文件）。<b>派发</b>按功能域分节、滑动窗口并发≤5：
          本工程 B1 批次 5 大域（sif/ble/daq/gps/alm，1h45m）→ B2 批次 5 中域（含重试，2h53m）→
          B3 批次 2 小域（base/led，分类器不可用降级手动生成 2h13m）。
          <b>聚合</b>后主索引 + 覆盖率 12/12 域 100%。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '9 步 · 出题流水线',
  flowTitle: '执行流程：6 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: '规划 + 加载', label: 'Step 1-4 规划 + 三源加载',
      action: 'task 文件 + --fresh 归档（13 旧 DRAFT 移入 .fresh-archive）+ Gate 6 项 + TR 三分法分组 + SYS-ARCH + TP+Step Capability',
      post: '输入就绪 + 归档完成', edge: '输入→简报',
      why: '--fresh 隔离旧产物，只据当前 TR 生成',
      badges: [{ kind: 'green', text: '6 Gate' }],
    },
    {
      id: 1, name: 'Briefing Pack', label: 'Step 5 生成 Briefing Pack',
      action: '12 域每域一份 brief（TR 切片 + 层级/武器/oracle 约束 + 观测映射行）',
      post: '12 brief 生成', edge: '简报→派发',
      why: 'worker 自包含执行，不需回读命令文件',
    },
    {
      id: 2, name: '派发 Worker', label: 'Step 6 批次派发（并发≤5）',
      action: 'B1 5 大域（sif/ble/daq/gps/alm，1h45m）→ B2 5 中域（pwr/tsp/sec/cfg/ctrl 含重试，2h53m）→ B3 2 小域（base/led 降级手动，2h13m）',
      post: '各域 TC 文件 + self_check', edge: '派发→收集',
      why: '滑动窗口并发，大域先行小域殿后',
      badges: [{ kind: 'amber', text: '3 批次' }],
    },
    {
      id: 3, name: '聚合', label: 'Step 8 主索引聚合 + 数据修正',
      action: '生成主汇总索引文件 + §3.4/§7 一致性数据修正',
      post: '主索引 + 修正', edge: '聚合→门控',
      why: '分域文件汇总成册',
    },
    {
      id: 4, name: '覆盖率验证', label: 'Step 9 + 8.5 覆盖率 + 报文门控',
      action: '覆盖率 100%（12/12 域）+ 报文完整性确定性校验（Gherkin 结构/字段断言/silent-pass 兜底）',
      post: '覆盖率 100% + 门控过', edge: '门控→完成',
      why: '漏域/漏报文即不合格',
      badges: [{ kind: 'green', text: '100%' }],
    },
    {
      id: 5, name: '转正提交', label: 'FUNC 转正 + 提交',
      action: 'FUNC 12 域 428 TC 转正（status=draft）+ git commit',
      post: '428 TC + completed', edge: '建议 review',
      why: '全链成果留档可追溯',
    },
  ],
  flowNodes: [
    { id: 0, name: '规划加载', icon: '🗂️', color: 'blue', sub: '6 Gate' },
    { id: 1, name: 'Briefing', icon: '📋', color: 'cyan', sub: '12 brief' },
    { id: 2, name: '派发 Worker', icon: '🤖', color: 'amber', sub: '并发≤5' },
    { id: 3, name: '聚合', icon: '📚', color: 'cyan', sub: '主索引' },
    { id: 4, name: '覆盖率', icon: '📊', color: 'green', sub: '100%' },
    { id: 5, name: '转正提交', icon: '✅', color: 'green', sub: '428 TC' },
  ],
  flowTutor: {
    question: '考官问「IF 穿透六步法和五步法什么区别？」怎么答？',
    answer: (
      <span>
        <b>五步法</b>适配「DUT 自己是上报方」的拓扑（MQTT 下行→上报）：前置 → 显式 send cmd →
        链路确认 → 显式 wait msg_type → 协议解析 + 字段断言。
        <b>穿透六步法</b>适配「激励通道 ≠ 观测通道」的穿透型拓扑（SIF/一线通 BMS、BLE 中控）：
        A 通道注入已知报文 → B 通道主动拉取/等待 DUT 产物 → observe_field == 注入值。
        共同点：<b>判据都锚定 DUT 产物字段</b>，且都强制 Scenario Outline + Examples。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: 'SQT-TR', role: '三分法分组（FUNC 470 / NFR / IF）' },
      { name: 'SYS-ARCH', role: '子系统/接口/状态机' },
      { name: 'SQT-TP', role: '§11.2 用例生成模型 + §6.3.8 oracle' },
      { name: 'step_capability.md', role: 'Step 能力清单（362 step）' },
    ],
    inputKeyline: '最关键输入是 <Hl>TR + TP 生成模型</Hl>——用例内容和格式的双重来源。',
    outputs: [
      { name: 'sqt-tc-*.md', role: 'BDD 用例（FUNC 428 / NFR 36 / IF 80）' },
      { name: '主汇总索引', role: '全用例聚合（可追溯）' },
      { name: 'task 台账', role: '任务文件（FUNC/IF/NFR 窗口）' },
    ],
    callGraphs: [
      {
        title: '命令级 · sqt-case-design 与上下游的关系',
        color: 'cyan',
        from: { id: 'tc', cmd: '/yxspec:sqt-case-design', sub: 'SYS.5 BP3 · 用例设计', desc: '按考点出题' },
        tos: [
          { id: 'up-tr', cmd: 'sqt-tr-analysis', edge: 'TR 输入', edgeDesc: '三分法分组', desc: '上游：TR 是出题依据。' },
          { id: 'down-sg', cmd: 'sqt-script-gen', edge: 'BDD 用例', edgeDesc: '翻译 Behave', desc: '下游：TC 翻译为脚本。' },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:sqt-case-design' },
      { seg: 'input', label: 'TR + 架构 + TP' },
      { seg: 'worker', label: 'Briefing ×12' },
      { seg: 'worker', label: 'Worker ×12 域' },
      { seg: 'output', label: '544 TC + 索引' },
    ],
    qualityGates: [
      { code: 'Gate', name: '6 项 Gate', phase: '前置', check: 'spec/TP/TR/架构/双 review approved', outcome: '全 PASS' },
      { code: 'COV', name: '覆盖率', phase: '执行', check: '12/12 域 100%', outcome: '100%' },
      { code: 'MSG', name: '报文完整性门控', phase: '收尾', check: 'Gherkin 结构/字段断言/silent-pass 兜底', outcome: '过' },
    ],
    failures: [
      { fault: '分类器不可用', action: '降级手动生成（base/led B3 批次）' },
      { fault: 'Worker 失败', action: '重试（B2 批次含重试）' },
      { fault: '覆盖缺失域', action: '补生成至 12/12 域' },
    ],
  },
  ioTutor: {
    question: '答辩时 sqt-case-design 怎么讲？',
    answer: (
      <span>
        「case-design 基于 TR 出 BDD 用例：6 Gate（含双 review approved）→ Briefing Pack 12 份 →
        3 批次 spawn case-worker（并发≤5，大域先行）→ 主索引聚合 →
        <b>覆盖率 100%（12/12 域）</b> + 报文完整性门控。
        本工程 FUNC 12 域 <b>428 TC</b>（全链 544 = 428F + 36N + 80IF）全生成。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sqt-tc-trainees-2026.md', kind: 'green', what: 'FUNC 用例主文件（12 域 428 TC）', who: '脚本翻译输入' },
    { name: 'sqt-tc-if-trainees-2026.md', kind: 'cyan', what: 'IF 用例（3 协议 80 TC）', who: 'cmd_id 全覆盖' },
    { name: 'sqt-tc-nfr-trainees-2026.md', kind: 'amber', what: 'NFR 用例（36 TC）', who: '8 子类' },
    { name: 'task_sqt_case_design_*.md', kind: 'cyan', what: '任务台账（FUNC/IF/NFR 分窗口）', who: '门控 + 追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>TR → Briefing ×12 → Worker 并发 → 544 TC → 覆盖率 100%</Hl>。',
  samplesTitle: '真实用例样例（点开看字段）',
  samples: [
    {
      id: '五步法', badges: [{ kind: 'cyan', text: 'FUNC/IF 通用' }], meta: 'Gherkin 结构',
      title: '标准五步法（DUT 自上报拓扑）',
      fields: [
        { k: '①', v: '前置（DUT 在线 + 环境就绪）' },
        { k: '②③', v: '显式 send cmd → 链路确认' },
        { k: '④⑤', v: '显式 wait msg_type → 协议解析 + 字段断言' },
      ],
    },
    {
      id: '六步法', badges: [{ kind: 'amber', text: '穿透型' }], meta: 'IF 专属',
      title: '穿透六步法（激励≠观测通道）',
      fields: [
        { k: '①②', v: 'A 通道注入已知报文（inject_frame 完整合法帧）' },
        { k: '④⑤', v: 'B 通道拉取 DUT 产物（trigger_cmd/等 Notify/读状态）' },
        { k: '⑥', v: '判据 = DUT 侧 observe_field == 注入值（强制）' },
      ],
    },
  ],
  samplesNote: '两类 Gherkin 模板覆盖全部拓扑——判据统一锚定 DUT 产物字段。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SYS.5 BP3 · 用例设计',
    title: '门控 · 追溯 · AI 协同（sqt-case-design 版）',
    sub: '按考点出题——BDD 结构化。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '6 Gate + 覆盖率 100% + 报文完整性门控'],
        ['<Badge kind="green">追溯</Badge>', 'TC-ID 编号（{类别}-{FD}-{SEQ:3}）+ TR 回链 + 主索引'],
        ['<Badge kind="blue">AI 协同</Badge>', 'Worker 生成（AI）+ 门控校验（确定性）'],
      ],
    },
    sections: [
      {
        title: 'BDD 原子化判定准则',
        type: 'ul',
        items: [
          '单 Scenario 单业务功能点——Step 数不设硬上限，长链按业务时序展开',
          '负向/正向用例隔离 + 同 msg_type 并发隔离 + 设备去重/抑制窗口规避',
          '负向无上报断言形态——"无上报"也要有确定断言',
          '字面值抽槽上提 Examples——禁止裸 Scenario 内联字面值',
        ],
        keyline: '「一条用例一个功能点」——原子化保证可定位、可追溯。',
      },
      {
        title: '--fresh 模式（先破后立）',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: '旧 DRAFT 归档' },
          { kind: 'output', label: 'mv 至 .fresh-archive/20260729-171143/' },
          { kind: 'output', label: '禁读旧产物/git 历史' },
          { kind: 'output', label: '只据当前 TR + TP 全新生成' },
          { kind: 'output', label: '13 旧 DRAFT 归档留后悔药' },
        ],
        keyline: '「先破后立」——隔离归档比口头要求可靠，且可随时还原。',
      },
    ],
  },
};

export default caseChapter;
