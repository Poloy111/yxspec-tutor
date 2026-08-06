/**
 * yxspec-tutor · swe-integration-verify 章节数据（通用章节契约结构）
 * 内容来源：project/tasks/task_sw_it.md（IT-001~004）
 * 真实运行：2026-07-31 09:05 → 09:40（35 分钟）
 */

const itChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-integration-verify · SWE.5 · 集成验证',
    oneLiner:
      '模块组装后的集成测试——基于架构分层 + 接口拓扑推导 11 个测试分组（L1×6 + L2×3 + L3×2），56 用例（iface/sigflow/fault/e2e 四类）全部通过。与静态分析 / 单元验证 / PC 验证并行开展，四路验证互为证据。',
    analogy:
      '把 swe-integration-verify 想象成「部件组装后的整机质检」：编码完成即与单元验证 / 静态分析 / PC 验证并行开工（互不等待）——按架构分层（L1 底层→L2 中间→L3 应用）把模块组装起来测「接口对不对、信号流不流、故障怎么走、端到端通不通」。11 个组装组 56 用例全过，4.49 秒。',
    memoryLine: '记住：<Hl>integration-verify = 模块组装后的集成测试</Hl>——11 组 56 用例全 PASS。',
    purpose: {
      oneLiner:
        '基于 SW-ARCH §3 分层 + SW-IF-index §1.3 拓扑（37 条依赖边）推导 11 组（L1×6 + L2×3 + L3×2），生成四类用例（iface/sigflow/fault/e2e）56 个，全部通过（4.49s）。',
      input: {
        title: '6 类输入（Gate）',
        items: [
          'SW-ARCH（sw-arch-trainees-2026.md）',
          'SW-IF（19 模块 IF + index，拓扑 37 边）',
          'review swe_coding（approved，zhengyonghong 双签）',
          '测试框架（Unity+CMock+CMake + Fake DSC/msg）',
          'AL 层（Windows MSYS2 UCRT64 + win/stub）',
          '工具链（GCC 16.1.0 / CMake 4.4.0 / Ruby 3.4.9）',
        ],
        note: '6 项 Gate Check 全过',
      },
      processTitle: '4 步',
      process: [
        '① 基础设施：Fake DSC/msg + stub_modules + stub_it + CMakeLists',
        '② 分组推导：L1×6 + L2×3 + L3×2 = 11 组（基于分层 + 拓扑）',
        '③ 测试代码生成：11 个 test_it_l*.c（四类用例）',
        '④ 编译运行 + 修复：3 轮修复（签名冲突/Mock 去重/DSC 容量）→ 11/11 PASS',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'ts-it-2026-001.md', what: '集成测试规格（11 组 56 用例）', consumer: '测试证据 + 追溯' },
        { name: 'it-grouping-proposal.md', what: '分组推导方案（L1×6/L2×3/L3×2）', consumer: '分组依据' },
      ],
      value: [
        '分组推导基于架构证据（分层 + 37 边拓扑）——不是拍脑袋',
        '四类用例覆盖（接口/信号流/故障/端到端）——维度全',
        '3 轮修复后 11/11 全过——集成问题暴露在测试中',
      ],
      boundary: [
        '不管「函数级正确性」——那是单元验证的事',
        '不管「PC 整机」——那是 verify-pc 的事',
        'integration-verify 只回答「模块组装后协作对吗」',
      ],
      example:
        'L1 组测底层模块接口；L2 测中间层与底层信号流；L3 测应用层端到端（如控车指令从消息总线到 VCS 处理）。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 框架）',
    roles: [
      { kind: 'blue', role: '集成测试队长', who: '/yxspec:swe-integration-verify 命令', does: '6 Gate → 分组推导 → 用例生成 → 编译运行' },
      { kind: 'cyan', role: '测试框架', who: 'Unity + CMock + Fake DSC/msg', does: '断言/模拟/总线模拟（Fake 消息总线）' },
    ],
    whyTitle: '为什么要这样分工？',
    whyShell: [
      '为什么按架构分层分组？—— 模块有依赖层（L1 底层被 L2 依赖），按层组装测最有意义',
      '为什么四类用例？—— iface 接口对、sigflow 信号流、fault 故障路径、e2e 端到端——维度互补',
      '为什么 3 轮修复？—— 签名冲突/Mock 去重/DSC 容量——集成期问题典型三类',
    ],
    whyMemory: '记住 <Hl>「分层推导分组 + 四类用例」</Hl>——集成测试基于架构证据。',
    instance: {
      stats: [
        { num: '35m', label: '总耗时', desc: '09:05 → 09:40', kind: 'cyan' },
        { num: '11', label: '个分组', desc: 'L1×6 + L2×3 + L3×2', kind: 'cyan' },
        { num: '56', label: '个用例', desc: '四类覆盖', kind: 'cyan' },
        { num: '100%', label: '通过率', desc: '56/56，0 失败', kind: 'green' },
        { num: '3', label: '修复轮次', desc: '签名/Mock/DSC', kind: 'amber' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>11 组 56 用例 100% PASS</Hl>。答辩时说「分组基于架构分层与 37 边拓扑推导」就是一句话结论。',
    },
    downstream: ['ts-it → 测试证据', '56 PASS → 质量门', '11 组 → 追溯'],
    downstreamLine: '一句话：<Hl>集成验证是「模块组装后的质检」</Hl>——组装对才能上整机。',
    ironRules: [
      '<b>6 项 Gate 先过</b> —— 架构/接口/审查/框架/AL 层/工具链',
      '<b>分组有架构依据</b> —— 分层 + 拓扑推导，不拍脑袋',
      '<b>建议 review 不自动</b> —— 完成后建议 review swe_integration_verify',
    ],
    tutor: {
      question: '考官问「集成测试的 11 个分组怎么推导出来的？」怎么答？',
      answer: (
        <span>
          基于<b>两个架构证据</b>：SW-ARCH §3 分层（L1 底层/L2 中间/L3 应用）+ SW-IF-index §1.3 拓扑（37 条依赖边）。
          推导出 L1×6 + L2×3 + L3×2 = 11 组，覆盖全部 16 模块。
          每组按依赖关系组装，生成四类用例（iface/sigflow/fault/e2e）56 个——分组不是拍脑袋，是架构推导。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '4 步 · 分组基于架构证据',
  flowTitle: '执行流程：4 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'IT-001', label: '基础设施搭建（10m）',
      action: 'Fake DSC/msg + stub_modules + stub_it + CMakeLists（6 Gate 全过后）',
      post: 'cmake configure 成功', edge: '框架就绪',
      why: '消息总线（DSC）用 Fake 模拟，模块才能独立组装',
    },
    {
      id: 1, name: 'IT-002', label: '分组推导（5m）',
      action: '基于 SW-ARCH §3 分层 + SW-IF-index §1.3 拓扑（37 边）推导 L1×6 + L2×3 + L3×2 = 11 组',
      post: 'it-grouping-proposal.md（覆盖 16 模块）', edge: '分组方案',
      why: '按依赖层组装，测最有意义的组合',
    },
    {
      id: 2, name: 'IT-003', label: '用例生成（10m）',
      action: '生成 11 个 test_it_l1_001~l3_002.c，四类用例：iface/sigflow/fault/e2e',
      post: '11 个 .c 文件', edge: '测试代码',
      why: '四类维度互补，覆盖接口/信号/故障/端到端',
    },
    {
      id: 3, name: 'IT-004', label: '编译运行 + 修复（10m 6s）',
      action: '3 轮修复：签名冲突 → Mock 去重 → DSC 容量；ctest -L integration',
      post: '11/11 PASS（56 用例）', edge: '测试结论',
      why: '集成期问题（签名/Mock/容量）在测试中暴露修复',
      badges: [{ kind: 'amber', text: '3 轮修复' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '基础设施', icon: '🏗️', color: 'blue', sub: 'Fake DSC' },
    { id: 1, name: '分组推导', icon: '🗂️', color: 'cyan', sub: '11 组' },
    { id: 2, name: '用例生成', icon: '✍️', color: 'cyan', sub: '四类' },
    { id: 3, name: '运行修复', icon: '✅', color: 'green', sub: '56/56' },
  ],
  flowTutor: {
    question: '考官问「集成测试的 3 轮修复分别修了什么？」怎么答？',
    answer: (
      <span>
        <b>① 签名冲突</b>：模块接口签名与 mock 定义不一致；<b>② Mock 去重</b>：多个 mock 重复定义；
        <b>③ DSC 容量</b>：Fake 消息总线容量不足。三类都是<b>集成期典型问题</b>——
        单个模块测不出、组装起来才暴露，这正是集成测试的价值。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: 'SW-ARCH + SW-IF', role: '架构分层 + 接口拓扑（37 边）' },
      { name: 'review swe_coding', role: '编码审查（approved 双签）' },
      { name: '测试框架', role: 'Unity+CMock+CMake + Fake DSC/msg' },
      { name: 'AL 层', role: 'Windows MSYS2 + win/stub' },
    ],
    inputKeyline: '最关键输入是 <Hl>架构 + 接口拓扑</Hl>——分组推导的证据来源。',
    outputs: [
      { name: 'ts-it-2026-001.md', role: '集成测试规格（11 组 56 用例）' },
      { name: 'it-grouping-proposal.md', role: '分组推导方案' },
      { name: '11 个 test_it_l*.c', role: '测试代码' },
    ],
    callGraphs: [
      {
        title: '命令级 · swe-integration-verify 与上下游的关系',
        color: 'cyan',
        from: { id: 'it', cmd: '/yxspec:swe-integration-verify', sub: 'SWE.5 · 集成验证', desc: '模块组装质检' },
        tos: [
          { id: 'up-code', cmd: 'swe-coding-do', edge: '编码完成源码', edgeDesc: '验证对象', desc: '上游：验证对象是编码完成的源码；与单元验证/静态分析/PC 验证并行执行，不以单元验证完成为前置。' },
          { id: 'up-arch', cmd: 'swe-arch', edge: '架构 + 模块拓扑', edgeDesc: '分组依据', desc: '上游：集成分组按架构的模块依赖拓扑推导（it-grouping-proposal）。', dashed: true },
          { id: 'down-vpc', cmd: 'verify-pc', edge: '集成结论', edgeDesc: '整机验证参考', desc: '旁支：PC 整机验证参考集成结果，两者互为证据。', dashed: true },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-integration-verify' },
      { seg: 'input', label: '架构 + 拓扑' },
      { seg: 'script', label: '6 Gate' },
      { seg: 'worker', label: '分组 ×11' },
      { seg: 'worker', label: '用例 ×56' },
      { seg: 'output', label: '11/11 PASS' },
    ],
    qualityGates: [
      { code: 'Gate', name: '6 项 Gate', phase: '前置', check: '架构/接口/审查/框架/AL/工具链', outcome: '全过' },
      { code: 'PASS', name: '用例结果', phase: '执行', check: '56/56（3 轮修复后）', outcome: '100%' },
    ],
    failures: [
      { fault: '签名冲突', action: '对齐 mock 定义（第 1 轮）' },
      { fault: 'Mock 去重', action: '合并重复 mock（第 2 轮）' },
      { fault: 'DSC 容量', action: '扩容 Fake 总线（第 3 轮）' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-integration-verify 怎么讲？',
    answer: (
      <span>
        「integration-verify 基于架构分层 + 37 边拓扑推导 11 组（L1×6/L2×3/L3×2），生成四类用例（iface/sigflow/fault/e2e）56 个，
        3 轮修复（签名/Mock/DSC）后 <b>56/56 全 PASS</b>（4.49s），产出 ts-it 规格——组装对才能上整机。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'ts-it-2026-001.md', kind: 'cyan', what: '集成测试规格（11 组 56 用例）', who: '测试证据' },
    { name: 'it-grouping-proposal.md', kind: 'amber', what: '分组推导方案（L1×6/L2×3/L3×2）', who: '分组依据' },
    { name: 'test_it_l*.c ×11', kind: 'amber', what: '测试代码（四类用例）', who: '可复跑' },
    { name: 'task_sw_it.md', kind: 'green', what: '任务台账（IT-001~004）', who: '门控 + 追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>架构分层 + 拓扑 → 11 组 → 56 用例 → 3 轮修复 → 100% PASS</Hl>。',
  samplesTitle: '用例分类真实样例（点开看字段）',
  samples: [
    {
      id: 'iface', badges: [{ kind: 'cyan', text: '接口类' }], meta: '四类之一',
      title: '模块间接口调用正确性（签名/参数/返回）',
      fields: [
        { k: '对象', v: 'L1 底层模块对外接口' },
        { k: '验证', v: '调用签名一致、参数传递正确' },
      ],
    },
    {
      id: 'sigflow', badges: [{ kind: 'blue', text: '信号流类' }], meta: '四类之一',
      title: '消息总线信号流（DSC 订阅/发布链路）',
      fields: [
        { k: '对象', v: 'L2 中间层 ↔ L1 底层' },
        { k: '验证', v: 'Fake DSC 消息订阅发布全链路' },
      ],
    },
    {
      id: 'e2e', badges: [{ kind: 'amber', text: '端到端类' }], meta: '四类之一',
      title: '端到端业务链路（控车指令全流程）',
      fields: [
        { k: '对象', v: 'L3 应用层' },
        { k: '验证', v: '指令从消息总线到处理模块全链路' },
      ],
    },
  ],
  samplesNote: '四类用例互补——接口对、信号流、故障路径、端到端全覆盖。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.5 · 集成验证',
    title: '门控 · 追溯 · AI 协同（swe-integration-verify 版）',
    sub: '模块组装级质量门。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '6 项 Gate + 56/56 全过才放行'],
        ['<Badge kind="green">追溯</Badge>', '分组推导有架构证据（分层 + 37 边拓扑）'],
        ['<Badge kind="blue">AI 协同</Badge>', '分组推导（AI 基于架构）+ 框架确定性执行'],
      ],
    },
    sections: [
      {
        title: '分组推导逻辑（架构证据）',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'SW-ARCH §3 分层' },
          { kind: 'output', label: 'L1×6 + L2×3 + L3×2' },
          { kind: 'output', label: 'SW-IF §1.3 拓扑 37 边' },
          { kind: 'output', label: '11 组覆盖 16 模块' },
          { kind: 'output', label: '56 用例 100%' },
        ],
        keyline: '分组不是拍脑袋——分层决定「按什么顺序组装」，拓扑决定「哪些模块要一起测」。',
      },
      {
        title: '集成期三类典型问题（3 轮修复）',
        type: 'ul',
        items: [
          '签名冲突：模块接口签名 vs mock 定义不一致',
          'Mock 去重：多个 mock 重复定义（模块间 mock 冲突）',
          'DSC 容量：Fake 消息总线容量不足',
          '结论：单个模块测不出、组装才暴露——集成测试的价值所在',
        ],
        keyline: '「单测绿 ≠ 集成绿」——组装期问题必须组装期测。',
      },
    ],
  },
};

export default itChapter;
