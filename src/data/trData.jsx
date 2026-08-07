/**
 * yxspec-tutor · sqt-tr-analysis 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/sqt-tr-analysis.md + project/tasks/task_sqt_tr_analysis.md
 * 真实运行：2026-07-29（TR-001~007，16 文件 DRAFT→draft 转正，completed）
 */

const trChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:sqt-tr-analysis · SYS.5 BP2 · 测试需求分析',
    oneLiner:
      '在 SQT-TP 框架内把需求拆解为可测试需求（TR）：三分法（FUNC 12 域 / NFR 8 子类 / IF 3 协议）逐条拆解，cmd_id 完备性 100% 阻塞门控，车载强制项跨类别 rollup 校验。16 文件全量转正。',
    analogy:
      '把 sqt-tr-analysis 想象成「按考纲出题范围」：考纲（SQT-TP）定了考什么，TR 阶段把每个考点拆成具体的「可测需求条目」——功能题分 12 个知识域出（FUNC）、非功能题分 8 类出（NFR）、接口题按 3 种协议出（IF，每条协议指令都要覆盖）。拆完还要过机械诊断：每条指令都考到（cmd_id 完备性 100%）、离线缓存和生命周期这些「车载强制项」必须达标。',
    memoryLine: '记住：<Hl>tr-analysis = 按考纲拆 TR</Hl>——16 文件转正，IF 完备性 100%。',
    purpose: {
      oneLiner:
        '--all 三分法全量：FUNC 12 域分文件四层覆盖模型 G1~G9 拆解 + NFR 8 子类分节量化 + IF 按协议逐 cmd_id 生成（MQTT/BLE/SIF）；机械诊断 D1~D8 + 车载强制项 D6/D8 rollup；16 文件 DRAFT→draft 转正。',
      input: {
        title: '4 项 Gate',
        items: [
          'Gate 0：spec_id 提取（trainees-2026）',
          'Gate 1：PRD（373 REQ = 219F + 154NFR，12 功能域）',
          'Gate 2：IF 协议输入源（MQTT 44 + BLE 11 + SIF 9 = 64 cmd_id）',
          'Gate 3：SQT-TP 框架（消费 §5.2 层级/§6 武器/§10.4 优先级/§11.3 12 域）',
        ],
        note: '4 项 Gate 全 PASS',
      },
      processTitle: '7 步',
      process: [
        '① 规划与门控：Gate + 加载 PRD 三源 + TP 框架 + 协议基线',
        '② IF 域 TR 生成：按协议分节逐 cmd_id（MQTT/BLE/SIF）',
        '③ NFR 域 TR 生成：8 子类分节量化拆解',
        '④ FUNC 域 TR 生成：12 功能域分文件，四层覆盖模型 G1~G9',
        '⑤ 质量诊断：D1~D8 机械诊断 + D6/D8 跨类别项目级 rollup',
        '⑥ 修复转正：模糊词收紧 + 缺失补全 + DRAFT→draft',
        '⑦ 提交与汇报',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'sqt-tr-{fd}-trainees-2026.md ×15', what: 'TR 文件（12 FUNC + 1 NFR + 2 IF）', consumer: '下游用例设计输入' },
        { name: 'task_sqt_tr_analysis.md', what: '任务台账（TR-001~007）', consumer: '门控 + 追溯' },
      ],
      value: [
        'IF cmd_id 完备性 100%（阻塞门控）：MQTT 51 ≥ 基线 44 / BLE 11 = / SIF 10 ≥ 9',
        '车载强制项 rollup：D6 离线缓存 Σ=5 PASS（≥1）+ D8 生命周期 Σ=15 PASS（≥2）',
        '16 文件机械诊断 0 阻塞缺陷 → 全量转正',
      ],
      boundary: [
        '不生成具体用例 —— 那是 sqt-case-design 的事',
        '不翻译脚本 —— 那是 sqt-script-gen 的事',
        'tr-analysis 只回答「每个考点拆成哪些可测条目」',
      ],
      example:
        'TR-FUNC-LED-005 红灯：DRAFT 期表体缺失（§5 计数=5 但 §4 无数据行）→ 正式执行按 §6 摘要 + PRD REQ-F-110004 补全。',
    },
    rolesTitle: '谁在干活？（命令 / 脚本 / 协议基线）',
    roles: [
      { kind: 'blue', role: 'TR 拆解队长', who: '/yxspec:sqt-tr-analysis 命令', does: 'Gate → 三分法拆解 → 诊断 → 转正' },
      { kind: 'cyan', role: '机械诊断脚本', who: 'scripts（D1~D8/五要素/模糊词/编号/IF 完备性）', does: '确定性质量检查（0 阻塞缺陷）' },
      { kind: 'amber', role: '协议基线', who: '3 parser skill（MQTT/BLE/SIF）', does: 'cmd_id 全集（完备性分母）' },
    ],
    whyTitle: '为什么 TR 要在 TP 框架内拆解？',
    whyShell: [
      '为什么继承 TP 框架？—— 层级/武器/域划分由 TP 定，TR 在框架内取值，防前后矛盾',
      '为什么 cmd_id 完备性是阻塞门控？—— 协议指令漏一条就是漏一个功能点',
      '为什么车载强制项 rollup？—— 离线缓存/生命周期是法规强制项，跨类别汇总才算数',
    ],
    whyMemory: '记住 <Hl>「框架内拆 TR + 完备性门控」</Hl>——IF 完备性 100% 是硬指标。',
    instance: {
      stats: [
        { num: '15', label: '个 TR 文件', desc: '12 FUNC + 1 NFR + 2 IF（OTA 并入 CFG）', kind: 'cyan' },
        { num: '96', label: 'IF TR 数', desc: 'MQTT/BLE/SIF 协议域', kind: 'cyan' },
        { num: '100%', label: 'cmd_id 完备性', desc: 'MQTT 51/BLE 11/SIF 10', kind: 'green' },
        { num: '18m 37s', label: '转正耗时', desc: '14:45 → 15:03', kind: 'cyan' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>16 文件转正、IF 完备性 100%</Hl>。答辩时说「TR 三分法拆解 16 文件，cmd_id 全覆盖」就是一句话结论。',
    },
    downstream: ['TR → TC 设计', 'D6/D8 → 法规强制项', 'TR-FUNC → 12 域用例'],
    downstreamLine: '一句话：<Hl>TR 是「考点清单」</Hl>——拆好考点才能出题。',
    ironRules: [
      '<b>IF 完备性阻塞门控</b> —— cmd_id 覆盖率 100% 是硬指标',
      '<b>框架内取值</b> —— 测试层级/武器继承 TP，不得自行另立',
      '<b>五要素语义</b> —— 结构层 100% 齐全（前置/步骤/输入/预期/依赖）',
      '<b>模糊词零容忍</b> —— "无误/正确/正常" 必须收紧为确定判据',
    ],
    tutor: {
      question: '考官问「TR 的机械诊断 D1~D8 是什么？车载强制项怎么验？」怎么答？',
      answer: (
        <span>
          机械诊断脚本覆盖：<b>D1 量化覆盖率</b>（状态机/枚举态 TR 判定齐全）、
          D2~D5（五要素/模糊词/编号连续性/优先级四要素）、
          <b>D6 离线缓存</b>（跨类别 rollup Σ=5 条 ≥1 PASS）、
          <b>D8 生命周期</b>（Σ=15 条 ≥2 PASS）。
          车载强制项是<b>跨类别项目级 rollup</b>——不是单文件统计，而是汇总全部域后判定，防止打散规避。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '7 步 · 框架内拆解',
  flowTitle: '执行流程：5 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'TR-001', label: '规划与门控（11m 52s）',
      action: 'Gate 4 项检查 + 加载 PRD 三源 + TP 框架消费 + 协议 cmd_id 基线（64）',
      post: '四门控 PASS + 输入就绪（PRD/TP/协议基线）', edge: '输入就绪',
      why: '框架与基线是拆解的前提',
      badges: [{ kind: 'green', text: '4 Gate' }],
    },
    {
      id: 1, name: 'TR-002~004', label: '三分法拆解',
      action: 'IF 按协议逐 cmd_id（MQTT 扩展 20 条续接 + BLE + SIF）+ NFR 8 子类量化 + FUNC 12 域四层覆盖模型 G1~G9',
      post: '16 个 TR 文件（sqt-tr-func-*×12 + nfr + if×2，DRAFT）', edge: '拆解完成',
      why: 'IF 完备性 100% 是阻塞门控',
    },
    {
      id: 2, name: 'TR-005', label: '质量诊断（D1~D8）',
      action: '机械诊断：五要素/模糊词/编号/优先级/IF 完备性 + D6 离线缓存 Σ=5 + D8 生命周期 Σ=15 跨类别 rollup',
      post: 'D1~D8 诊断 0 阻塞缺陷', edge: '诊断结论',
      why: '车载强制项跨类别汇总判定',
      badges: [{ kind: 'amber', text: '0 阻塞' }],
    },
    {
      id: 3, name: 'TR-007', label: '修复 + 转正（18m 37s）',
      action: 'led TR-FUNC-LED-005 表体补全 + 5 条模糊词收紧（OTA-013/015、SEC-019、SIF-006/007）+ 16 文件 DRAFT→draft + if-mqtt spec_id 修正',
      post: '16 文件 status=draft', edge: '转正完成',
      why: '机械诊断 0 阻塞才走局部修复而非 --fresh 重刷',
      badges: [{ kind: 'green', text: '转正' }],
    },
    {
      id: 4, name: 'TR-006', label: '提交与汇报',
      action: 'git commit（仅 sqt-tr/ + 任务文件）+ 汇报 8 项',
      post: 'completed', edge: '建议 review',
      why: '遗留结构问题（IF 两文件拆分）交 review 评估',
      badges: [{ kind: 'amber', text: '1 遗留' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '规划门控', icon: '🗂️', color: 'blue', sub: '4 Gate' },
    { id: 1, name: '三分法拆解', icon: '✂️', color: 'cyan', sub: 'FUNC/NFR/IF' },
    { id: 2, name: '质量诊断', icon: '🔍', color: 'amber', sub: 'D1~D8' },
    { id: 3, name: '修复转正', icon: '🔧', color: 'green', sub: '16 文件' },
    { id: 4, name: '提交汇报', icon: '✅', color: 'green', sub: 'completed' },
  ],
  flowTutor: {
    question: '考官问「IF TR 怎么保证协议指令全覆盖？编号怎么续接？」怎么答？',
    answer: (
      <span>
        IF TR 按协议分节逐 cmd_id 生成，<b>cmd_id 完备性 = 已生成 TR 数 / 协议合法 cmd_id 总数</b>，是阻塞门控必须 100%。
        本工程实测：MQTT 51 TR（001~051 连续，≥基线 44）、BLE 11（=基线 11）、SIF 10（≥基线 9 帧型）。
        MQTT 编号从既有 DRAFT 的 001~020 之后 <b>021 续接</b>——引用扩展而非重复生成，避免编号冲突。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: 'PRD', role: 'FUNC/NFR 主输入（373 REQ = 219F + 154NFR）' },
      { name: 'SQT-TP', role: '框架约束（层级/武器/优先级/域划分）' },
      { name: '协议 references', role: 'cmd_id 基线（MQTT 44 + BLE 11 + SIF 9）' },
    ],
    inputKeyline: '最关键输入是 <Hl>TP 框架 + 协议 cmd_id 基线</Hl>——框架内取值 + 完备性分母。',
    outputs: [
      { name: 'sqt-tr-*.md ×15', role: 'TR 文件（12 FUNC + 1 NFR + 2 IF）' },
      { name: 'task_sqt_tr_analysis.md', role: '任务台账' },
    ],
    callGraphs: [
      {
        title: '命令级 · sqt-tr-analysis 与上下游的关系',
        color: 'cyan',
        from: { id: 'tr', cmd: '/yxspec:sqt-tr-analysis', sub: 'SYS.5 BP2 · 测试需求分析', desc: '考点清单' },
        tos: [
          { id: 'up-tp', cmd: 'sqt-strategy', edge: '框架约束', edgeDesc: '继承层级/武器/域划分', desc: '上游：TP 框架内拆解。' },
          { id: 'down-tc', cmd: 'sqt-case-design', edge: 'TR 输入', edgeDesc: '逐条转用例', desc: '下游：TR 是用例设计输入。' },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:sqt-tr-analysis' },
      { seg: 'input', label: 'PRD + TP + 协议' },
      { seg: 'worker', label: 'FUNC ×12 域' },
      { seg: 'output', label: 'sqt-tr-func-*.md ×12' },
      { seg: 'worker', label: 'NFR ×8 子类' },
      { seg: 'output', label: 'sqt-tr-nfr-*.md' },
      { seg: 'worker', label: 'IF ×64 cmd' },
      { seg: 'output', label: 'sqt-tr-if-*.md ×2' },
      { seg: 'output', label: '16 TR 文件 (707 TR)' },
    ],
    qualityGates: [
      { code: 'Gate', name: '4 项 Gate', phase: '前置', check: 'spec_id/PRD/协议源/TP 框架', outcome: '全 PASS' },
      { code: 'D1-D8', name: '机械诊断', phase: '执行', check: '五要素/模糊词/编号/优先级/IF 完备性', outcome: '0 阻塞' },
      { code: 'IF', name: '完备性门控', phase: '执行', check: 'cmd_id 覆盖率 100%（阻塞）', outcome: '100%' },
      { code: 'D6/D8', name: '车载强制项', phase: '执行', check: '离线缓存 ≥1 + 生命周期 ≥2（跨类别 rollup）', outcome: 'Σ=5 / Σ=15' },
    ],
    failures: [
      { fault: 'IF 完备性 < 100%', action: '阻塞：补生成缺失 cmd_id 的 TR' },
      { fault: '模糊词无量化兜底', action: '5 条 WARN 级收紧为确定判据' },
      { fault: '表体缺失（LED-005）', action: '按 §6 摘要 + PRD 补全' },
      { fault: 'if-mqtt spec_id 误写', action: '修正为 sqt-tr-if-mqtt-trainees-2026' },
    ],
  },
  ioTutor: {
    question: '答辩时 sqt-tr-analysis 怎么讲？',
    answer: (
      <span>
        「tr-analysis 在 SQT-TP 框架内三分法拆 TR：<b>FUNC 12 域四层覆盖模型 + NFR 8 子类量化 + IF 按协议逐 cmd_id</b>，
        机械诊断 D1~D8 0 阻塞缺陷，<b>IF 完备性 100%</b>（MQTT 51/BLE 11/SIF 10），
        车载强制项 D6 离线缓存 Σ=5 + D8 生命周期 Σ=15 全 PASS，16 文件 DRAFT→draft 转正。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sqt-tr-func-{fd}-trainees-2026.md ×12', kind: 'cyan', what: 'FUNC 域 TR（alm/base/ble/cfg/ctrl/daq/gps/led/pwr/sec/sif/tsp，OTA 并入 CFG）', who: '12 域 570 TR' },
    { name: 'sqt-tr-nfr-trainees-2026.md', kind: 'amber', what: 'NFR TR（41 TR，8 子类齐全）', who: '量化拆解' },
    { name: 'sqt-tr-if-*.md ×2', kind: 'green', what: 'IF TR（96 TR，cmd_id 基线 64）', who: 'cmd_id 完备性 100%' },
    { name: 'task_sqt_tr_analysis.md', kind: 'cyan', what: '任务台账（TR-001~007）', who: '门控 + 追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>TP 框架 → 三分法拆 TR → D1~D8 诊断 → 修复转正</Hl>。',
  samplesTitle: '真实 TR 样例（点开看字段）',
  samples: [
    {
      id: 'LED-005', badges: [{ kind: 'amber', text: '修复' }], meta: 'FUNC 域',
      title: '红灯 TR 表体补全（DRAFT 期缺失）',
      fields: [
        { k: '缺陷', v: '§5 计数=5/§6 追溯列了 005 但 §4 无数据行' },
        { k: '修复', v: '按 §6 摘要 + PRD REQ-F-110004 补全' },
      ],
    },
    {
      id: 'OTA-013', badges: [{ kind: 'cyan', text: '收紧' }], meta: '模糊词',
      title: '模糊词 TR 收紧为确定判据',
      fields: [
        { k: '原', v: '"无误/正确/正常" 等无量化兜底' },
        { k: '修复', v: 'OTA-013/015、SEC-019、SIF-006/007 补确定判据' },
      ],
    },
  ],
  samplesNote: '模糊词零容忍——TR 必须有确定判据才能转用例。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SYS.5 BP2 · 测试需求分析',
    title: '门控 · 追溯 · AI 协同（sqt-tr-analysis 版）',
    sub: '考点清单——框架内拆解。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '4 Gate + IF 完备性 100% 阻塞门控'],
        ['<Badge kind="green">追溯</Badge>', 'TR 五要素 + 优先级四要素 + TP 回链'],
        ['<Badge kind="blue">AI 协同</Badge>', 'TR 拆解（AI）+ 机械诊断（脚本确定性）'],
      ],
    },
    sections: [
      {
        title: 'IF cmd_id 完备性阻塞门控',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: '协议合法 cmd_id 基线' },
          { kind: 'output', label: 'MQTT 44 → 实测 51 TR' },
          { kind: 'output', label: 'BLE 11 → 实测 11 TR' },
          { kind: 'output', label: 'SIF 9 → 实测 10 TR' },
          { kind: 'output', label: '完备性 = 已生成/基线 = 100%' },
          { kind: 'output', label: '非 100% → 阻塞（补生成）' },
        ],
        keyline: '「协议指令漏一条就是漏一个功能点」——完备性是硬指标不是软目标。',
      },
      {
        title: '车载强制项跨类别 rollup（Step 4.5）',
        type: 'ul',
        items: [
          'D6 离线缓存：跨类别汇总 Σ=5 条（alm=1/daq=4）→ PASS（≥1）',
          'D8 生命周期：Σ=15 条（base3/cfg4/gps1/ota2/pwr1/sif2/tsp2）→ PASS（≥2）',
          '跨类别 rollup 的意义：防单文件打散规避法规强制项',
          'D1 量化覆盖率：脚本数字启发式误判 sec/ota/tsp/sif/led 虚低 → 人工核验抽样后真实 ≥90%',
        ],
        keyline: '「跨类别汇总才算数」——法规强制项不能被拆散躲过。',
      },
    ],
  },
};

export default trChapter;
