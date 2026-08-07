/**
 * yxspec-tutor · sqt-script-gen 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/sqt-script-gen.md + project/tasks/task_sqt_script_gen.md
 * 真实运行：2026-07-30（SQTSG-001~008，Behave 脚本翻译完成，completed）
 */

const scriptGenChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:sqt-script-gen · SYS.5 BP4 · 测试脚本生成',
    oneLiner:
      '把 SQT-TC BDD 用例翻译为可执行 Behave 脚本：sync_tc.py 翻译（FUNC 12 feature + IF + NFR）+ step_catalogue 提取（362 step）+ gen_code_server 集成（3 阶段 API）+ release 冻结。',
    analogy:
      '把 sqt-script-gen 想象成「答题卡印刷」：试卷（TC 用例）出好了，要印成机读答题卡（Behave 脚本）——先翻译题型（sync_tc.py 把 Gherkin 场景翻成 feature 文件），再准备答题规范手册（step_catalogue 362 个可复用步骤），还要造一台阅卷机接口（gen_code_server 3 阶段 API），最后整批印刷冻结（6 个 release tag）。',
    memoryLine: '记住：<Hl>script-gen = TC 翻译成 Behave 脚本</Hl>——544 TC → feature + 362 step。',
    purpose: {
      oneLiner:
        '8 步：规划 → 加载 544 TC（428 FUNC + 36 NFR + 80 IF）→ FUNC 域翻译 12 feature → IF 域翻译 1 feature（84 Scenario Outline）→ NFR 域翻译 1 feature → step_catalogue 提取 362 entries → gen_code_server 集成（端口 8020）→ release 冻结 6 tag。',
      input: {
        title: '4 项 Gate',
        items: [
          'Gate 0：SQT-TC 产物齐全（544 TC = 428F + 36N + 80IF）',
          'Gate 1：step_capability.md 存在（362 step AUTOGEN）',
          'Gate 2：gen_code 引擎就绪（step_catalogue.yaml + step_descriptions.yaml + domain_rules.yaml）',
          'Gate 3：MCP 服务配置（统一端口 10000，9 服务）',
        ],
        note: '4 项 Gate 全 PASS',
      },
      processTitle: '8 步',
      process: [
        '① 规划：task 文件 + 加载上游',
        '② FUNC 域翻译：sync_tc.py 12 功能域 TC → 12 feature（428 TC）',
        '③ IF 域翻译：3 协议 TC → fc_if_integration.feature（84 Scenario Outline）',
        '④ NFR 域翻译：→ fc_nfr.feature（36 TC）',
        '⑤ step_catalogue 生成：extract_catalogue.py 从 steps/*.py 提取 362 entries',
        '⑥ gen_code_server 集成：端口 8020 + 3 阶段 API',
        '⑦ release 冻结：6 个 release tag 至 released/',
        '⑧ 提交验证',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'features/*.feature', what: 'Behave 脚本（核心翻译 14 = 12 FUNC + IF + NFR；补 mqtt 冒烟/OTA 升级/soak 长稳 = 17 文件）', consumer: 'sqt-auto-test 执行' },
        { name: 'step_catalogue.yaml + gen_code_server', what: 'Step 目录 + 代码生成服务', consumer: '脚本维护 + 生成' },
      ],
      value: [
        '544 TC 全翻译：428 FUNC + 36 NFR + 80 IF 无遗漏',
        '362 step 可复用目录（AUTOGEN 确定性提取）',
        'gen_code_server 3 阶段 API——后续脚本生成自动化基础',
      ],
      boundary: [
        '不执行测试 —— 那是 sqt-auto-test 的事',
        '不生成用例 —— 那是 sqt-case-design 的事',
        'script-gen 只回答「用例怎么变成可跑脚本」',
      ],
      example:
        'FUNC 域 12 feature 文件：每域一个，428 TC 翻译为 Scenario Outline（Examples 参数化保留）。',
    },
    rolesTitle: '谁在干活？（命令 / 翻译工具 / 目录）',
    roles: [
      { kind: 'blue', role: '脚本生成队长', who: '/yxspec:sqt-script-gen 命令', does: '8 步翻译 + 冻结' },
      { kind: 'cyan', role: 'sync_tc.py', who: 'FD_TO_FEATURE 映射（12 FUNC + IF + NFR）', does: 'TC → feature 翻译' },
      { kind: 'amber', role: 'gen_code 引擎', who: 'extract_catalogue.py + gen_code_server.py', does: 'step 提取 + 3 阶段 API 服务' },
    ],
    whyTitle: '为什么脚本要可复用 step 目录？',
    whyShell: [
      '为什么 step_catalogue？—— 362 个可复用步骤，用例翻译不重复造轮子',
      '为什么 gen_code_server？—— 3 阶段 API（解析/生成/校验）为自动化测试铺路',
      '为什么 release 冻结？—— 翻译产物定版，后续改动可追溯',
    ],
    whyMemory: '记住 <Hl>「TC → feature + step 目录」</Hl>——544 TC 全翻译 362 step 可复用。',
    instance: {
      stats: [
        { num: '544', label: 'TC 全翻译', desc: '428F + 36N + 80IF', kind: 'green' },
        { num: '362', label: 'step entries', desc: 'AUTOGEN 提取', kind: 'cyan' },
        { num: '17', label: '个 feature 文件', desc: '核心 14 + 补充 3（mqtt/OTA/soak）', kind: 'cyan' },
        { num: '6', label: 'release tag', desc: 'released/ 冻结', kind: 'amber' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>544 TC 全翻译、362 step 目录</Hl>。答辩时说「用例全部翻译为 Behave 脚本」就是一句话结论。',
    },
    downstream: ['feature → auto-test 执行', 'catalogue → 复用', 'release → 定版'],
    downstreamLine: '一句话：<Hl>脚本生成是「答题卡印刷」</Hl>——印好才能机读。',
    ironRules: [
      '<b>TC 全量翻译</b> —— 544 TC 无遗漏（Gate 0 齐全才开跑）',
      '<b>step 目录 AUTOGEN</b> —— 从 steps/*.py 确定性提取，不手写',
      '<b>release 冻结</b> —— 翻译产物定版 6 tag',
      '<b>参数化保留</b> —— Examples 槽位翻译时保留',
    ],
    tutor: {
      question: '考官问「脚本生成怎么保证和用例一一对应？」怎么答？',
      answer: (
        <span>
          靠 <b>sync_tc.py 的 FD_TO_FEATURE 映射</b>：12 个 FUNC 功能域 + IF + NFR 一一映射到 feature 文件，
          每个 TC 按编号翻译为 Scenario Outline（Examples 参数化保留）。
          本工程实测：<b>544 TC → 14 个核心 feature（12 FUNC + 1 IF + 1 NFR）+ 3 补充（mqtt 冒烟/OTA 升级/soak 长稳）= 17 文件</b>，
          IF 域 84 个 Scenario Outline 覆盖 80 TC（含参数化扩展）。
          配合 step_catalogue 362 entries——翻译时按 step 目录匹配，不重复实现。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '8 步 · 翻译流水线',
  flowTitle: '执行流程：5 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'SQTSG-001', label: '规划 + 加载（1m）',
      action: 'task 文件 + 4 Gate 检查 + 加载 544 TC + step_capability（362 step）',
      post: '任务就绪', edge: '输入就绪',
      why: 'TC 齐全（Gate 0）才开跑',
      badges: [{ kind: 'green', text: '4 Gate' }],
    },
    {
      id: 1, name: 'SQTSG-002', label: 'FUNC 域翻译（59m）',
      action: 'sync_tc.py 12 功能域 428 TC → 12 feature 文件',
      post: '12 feature + 428 Scenario Outline', edge: 'FUNC 完成',
      why: '大域先行，按功能域分文件',
    },
    {
      id: 2, name: 'SQTSG-003~004', label: 'IF + NFR 域翻译（60m）',
      action: '3 协议 80 TC → fc_if_integration.feature（84 Scenario Outline）+ 36 NFR → fc_nfr.feature',
      post: 'IF + NFR feature', edge: '翻译完成',
      why: 'IF 用 Scenario Outline 覆盖协议矩阵',
    },
    {
      id: 3, name: 'SQTSG-005~006', label: 'step 目录 + gen_code（30m）',
      action: 'extract_catalogue.py 从 steps/*.py 提取 362 entries → step_catalogue.yaml + gen_code_server.py（端口 8020，3 阶段 API）',
      post: 'catalogue + server', edge: '工具就绪',
      why: '可复用 step 目录 + 生成服务为后续铺路',
      badges: [{ kind: 'amber', text: '362 entries' }],
    },
    {
      id: 4, name: 'SQTSG-007~008', label: 'release 冻结 + 提交（20m）',
      action: '6 次 release 冻结至 released/ + git commit 验证',
      post: '6 release tag + completed', edge: '建议 review',
      why: '翻译产物定版可追溯',
      badges: [{ kind: 'green', text: '6 tag' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '规划加载', icon: '🗂️', color: 'blue', sub: '4 Gate' },
    { id: 1, name: 'FUNC 翻译', icon: '⚙️', color: 'cyan', sub: '12 feature' },
    { id: 2, name: 'IF/NFR 翻译', icon: '⚙️', color: 'cyan', sub: '2 feature' },
    { id: 3, name: 'step + server', icon: '🔧', color: 'amber', sub: '362 step' },
    { id: 4, name: '冻结提交', icon: '✅', color: 'green', sub: '6 tag' },
  ],
  flowTutor: {
    question: '考官问「gen_code_server 的 3 阶段 API 是什么？为什么重要？」怎么答？',
    answer: (
      <span>
        gen_code_server（端口 8020）提供 <b>3 阶段 API</b>：解析（读 TC/feature 结构）→
        生成（按 step_catalogue 匹配产出脚本）→ 校验（结构/参数校验）。
        重要性：它把「用例 → 脚本」翻译从一次性手工劳动升级为<b>可编程服务</b>——
        后续 sqt-auto-test 或新增用例时可按 API 自动生成，不必每次重跑 sync_tc 全量翻译。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: 'SQT-TC', role: 'BDD 用例（544 = 428F + 36N + 80IF）' },
      { name: 'step_capability.md', role: 'Step 能力清单（362 step AUTOGEN）' },
      { name: 'gen_code 引擎', role: 'sync_tc.py + extract_catalogue.py + gen_code_server.py' },
      { name: 'MCP 服务配置', role: '统一端口 10000，9 服务' },
    ],
    inputKeyline: '最关键输入是 <Hl>TC + step_capability</Hl>——翻译对象与复用目录。',
    outputs: [
      { name: 'features/*.feature ×17', role: 'Behave 脚本（核心 14 + 补充 3）' },
      { name: 'step_catalogue.yaml', role: '362 entries step 目录' },
      { name: 'released/ 6 tag', role: 'release 冻结产物' },
    ],
    callGraphs: [
      {
        title: '命令级 · sqt-script-gen 与上下游的关系',
        color: 'cyan',
        from: { id: 'sg', cmd: '/yxspec:sqt-script-gen', sub: 'SYS.5 BP4 · 脚本生成', desc: '答题卡印刷' },
        tos: [
          { id: 'up-tc', cmd: 'sqt-case-design', edge: 'BDD 用例', edgeDesc: '翻译对象', desc: '上游：TC 是翻译输入。' },
          { id: 'down-at', cmd: 'sqt-auto-test', edge: 'feature 脚本', edgeDesc: '执行输入', desc: '下游：feature 供自动化执行。' },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:sqt-script-gen' },
      { seg: 'input', label: '544 TC' },
      { seg: 'script', label: 'sync_tc.py' },
      { seg: 'worker', label: '17 feature' },
      { seg: 'output', label: 'features/fc_*.feature ×17' },
      { seg: 'output', label: 'step_catalogue.yaml (362)' },
      { seg: 'output', label: '6 release tag' },
    ],
    qualityGates: [
      { code: 'Gate', name: '4 项 Gate', phase: '前置', check: 'TC 齐全/step 存在/引擎就绪/MCP 配置', outcome: '全 PASS' },
      { code: 'TRANS', name: '全量翻译', phase: '执行', check: '544 TC 无遗漏', outcome: '全翻译' },
      { code: 'REL', name: 'release 冻结', phase: '收尾', check: '6 tag 定版', outcome: '完成' },
    ],
    failures: [
      { fault: 'TC 不齐全', action: '阻塞：先补 case-design' },
      { fault: 'step 缺失', action: 'extract_catalogue 重新提取' },
      { fault: '翻译遗漏', action: '按 FD 映射逐 feature 核对' },
    ],
  },
  ioTutor: {
    question: '答辩时 sqt-script-gen 怎么讲？',
    answer: (
      <span>
        「script-gen 把 544 TC 翻译为 Behave 脚本：sync_tc.py 按 FD_TO_FEATURE 映射翻译
        <b>14 个核心 feature</b>（12 FUNC + IF 84 Scenario Outline + NFR）+ 3 补充（mqtt 冒烟/OTA 升级/soak 长稳）= 17 文件，
        extract_catalogue 提取 <b>362 step 目录</b>，gen_code_server（8020）提供 3 阶段 API，
        <b>6 个 release tag 冻结</b>定版——sqt-auto-test 可直接执行。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'features/fc_*.feature ×14', kind: 'green', what: 'Behave 脚本（12 FUNC + IF + NFR）', who: 'auto-test 执行' },
    { name: 'step_catalogue.yaml', kind: 'amber', what: '362 entries step 目录（AUTOGEN）', who: '脚本复用' },
    { name: 'gen_code_server.py', kind: 'cyan', what: '3 阶段 API 服务（端口 8020）', who: '自动生成' },
    { name: 'released/ 6 tag', kind: 'cyan', what: 'release 冻结产物', who: '定版追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>544 TC → sync_tc 翻译 → 14 核心 + 3 补充 = 17 feature + 362 step → 6 release 冻结</Hl>。',
  samplesTitle: '真实翻译样例（点开看字段）',
  samples: [
    {
      id: 'FUNC', badges: [{ kind: 'cyan', text: '12 feature' }], meta: '功能域',
      title: 'FUNC 域 TC → feature（Scenario Outline 保留参数化）',
      fields: [
        { k: '映射', v: 'FD_TO_FEATURE：12 功能域一一对应' },
        { k: '数量', v: '428 TC → 428+ Scenario Outline' },
        { k: '格式', v: 'Examples 槽位保留（cmd_hex/msg_type/断言阈值）' },
      ],
    },
    {
      id: 'IF', badges: [{ kind: 'amber', text: '84 Outline' }], meta: '协议域',
      title: 'IF 域 TC → fc_if_integration.feature',
      fields: [
        { k: '覆盖', v: '3 协议 80 TC' },
        { k: '形态', v: '84 Scenario Outline（参数化扩展）' },
      ],
    },
  ],
  samplesNote: 'Scenario Outline 参数化贯穿翻译——字面值永不内联。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SYS.5 BP4 · 脚本生成',
    title: '门控 · 追溯 · AI 协同（sqt-script-gen 版）',
    sub: '答题卡印刷——TC 到可执行脚本。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '4 Gate + 全量翻译校验'],
        ['<Badge kind="green">追溯</Badge>', 'feature 编号 ↔ TC 编号一一对应 + release tag'],
        ['<Badge kind="blue">AI 协同</Badge>', 'sync_tc 机械翻译（确定性）+ gen_code 服务（可编程）'],
      ],
    },
    sections: [
      {
        title: '翻译工具链（sync_tc + extract_catalogue + gen_code）',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'sync_tc.py' },
          { kind: 'output', label: 'FD_TO_FEATURE 映射翻译' },
          { kind: 'output', label: 'extract_catalogue.py' },
          { kind: 'output', label: '362 step 确定性提取' },
          { kind: 'output', label: 'gen_code_server.py' },
          { kind: 'output', label: '3 阶段 API（解析/生成/校验）' },
        ],
        keyline: '「机械翻译 + 可复用目录 + 可编程服务」——脚本生成三层自动化。',
      },
      {
        title: 'release 冻结语义',
        type: 'ul',
        items: [
          '翻译产物 6 次 release 冻结至 released/',
          '冻结 = 该批次 feature/catalogue 定版，后续改动新 tag 可追溯',
          '与 swe-release 的版本发布不同——这里是测试资产定版',
        ],
        keyline: '「定版才能追责」——脚本资产与代码一样需要版本管理。',
      },
    ],
  },
};

export default scriptGenChapter;
