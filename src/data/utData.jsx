/**
 * yxspec-tutor · swe-unit-verify 章节数据（通用章节契约结构）
 * 内容来源：project/tasks/task_sw_ut.md（UT-001~004）
 * 真实运行：2026-07-30 23:50 → 07-31 00:20（30 分钟）
 */

const utChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-unit-verify · SWE.4 · 单元验证',
    oneLiner:
      '函数级单元测试——Unity + CMock 框架搭好，16 模块 56 用例（led 全量 11 + 15 模块接口 ×3）全部通过，100% PASS。',
    analogy:
      '把 swe-unit-verify 想象成「零件级质检」：整车出厂前每个零件单独测——先搭好质检台（Unity + CMock + CMake），再拿一个代表性零件全测（led 模块 11 用例），最后 15 个模块各抽 3 项通用检查（模块 ID 有效/类型完整/错误码约定）。56 个用例全过，耗时 3.17 秒。',
    memoryLine: '记住：<Hl>unit-verify = 函数级零件质检</Hl>——16 模块 56 用例 100% PASS。',
    purpose: {
      oneLiner:
        '搭建 Unity+CMock+CMake 测试框架，执行 16 模块 56 用例单元测试：led 全量 11 用例（lifecycle + API + 异常）+ 15 模块接口验证 45 用例（模块 ID/类型/错误码），56/56 100% 通过。',
      input: {
        title: '4 类输入（Gate）',
        items: [
          '源码（77 .c files）',
          'SW-ARCH（sw-arch-trainees-2026.md）',
          '测试框架（Unity + CMock + CMake）',
          '工具链（GCC 16.1.0 / CMake 4.4.0 / Ruby 3.4.9 / lcov 1.16）',
        ],
        note: '4 项 Gate Check 全过',
      },
      processTitle: '4 步',
      process: [
        '① 框架搭建：Unity+CMock 下载 + CMakeLists + preprocess 脚本 + stub 文件',
        '② led 全量单测：11 用例（lifecycle + yx_led_set_state API + 异常处理）',
        '③ 15 模块接口验证：×3 用例（模块 ID 有效性 + 类型完整性 + 错误码约定）',
        '④ 汇总：ts-ut-2026-001.md 规格 + 报告生成',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'ts-ut-2026-001.md', what: '单元测试规格（测试需求规格）', consumer: '测试证据 + 追溯' },
        { name: 'task_sw_ut.md', what: '任务台账（UT-001~004）', consumer: '门控放行' },
      ],
      value: [
        '16 模块 56 用例全过——函数级质量有据',
        '框架可复用——Unity+CMock 后续集成测试继续用',
        '3.17s 快——单测快速反馈',
      ],
      boundary: [
        '不管「模块间集成」——那是 swe-integration-verify 的事',
        '不管「PC 整机验证」——那是 verify-pc 的事',
        'unit-verify 只回答「每个函数对吗」',
      ],
      example:
        'led 模块：lifecycle 用例测初始化→设置→销毁全流程；API 用例测 yx_led_set_state 各状态；异常用例测非法参数。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 框架）',
    roles: [
      { kind: 'blue', role: '测试队长', who: '/yxspec:swe-unit-verify 命令', does: 'Gate Check → 框架搭建 → 用例执行 → 汇总' },
      { kind: 'cyan', role: '测试框架', who: 'Unity + CMock + CMake', does: '断言/模拟/构建执行（GCC 16.1.0 编译）' },
    ],
    whyTitle: '为什么要这样分工？',
    whyShell: [
      '为什么选 Unity + CMock？—— 嵌入式 C 单测标准组合，轻量可移植',
      '为什么 led 全量 + 15 模块抽验？—— 全量保深度，抽验保广度',
      '为什么 CMake 组织？—— 框架搭一次，后续集成测试复用',
    ],
    whyMemory: '记住 <Hl>「框架一次搭建，用例全量执行」</Hl>——56 用例 100% PASS。',
    instance: {
      stats: [
        { num: '30m', label: '总耗时', desc: '23:50 → 00:20', kind: 'cyan' },
        { num: '56', label: '个用例', desc: 'led 11 + 接口 45', kind: 'cyan' },
        { num: '100%', label: '通过率', desc: '56/56，0 失败', kind: 'green' },
        { num: '3.17s', label: '执行耗时', desc: '0 编译错误', kind: 'cyan' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>16 模块 56 用例 100% PASS</Hl>。答辩时说「函数级全绿，3.17s 跑完」就是一句话结论。',
    },
    downstream: ['ts-ut → 测试证据', '56 PASS → 质量门', '框架 → 集成测试复用'],
    downstreamLine: '一句话：<Hl>单元验证与静态分析 / 集成验证 / PC 验证并行开展</Hl>——四类验证互为独立证据；集成测试复用本阶段搭建的 Unity+CMock 框架，但不以单元验证完成为前置。',
    ironRules: [
      '<b>4 项 Gate 先过</b> —— 源码/架构/框架/工具链',
      '<b>用例可复跑</b> —— 确定性测试',
      '<b>建议 review 不自动</b> —— 完成后建议 review swe_unit_verify',
    ],
    tutor: {
      question: '考官问「unit-verify 的 56 用例怎么构成？」怎么答？',
      answer: (
        <span>
          <b>led 全量 11 用例</b>：lifecycle（初始化→设置→销毁）+ yx_led_set_state API 各状态 + 异常处理；
          <b>15 模块接口验证 45 用例</b>：每模块 3 用例（模块 ID 有效性 + 类型完整性 + 错误码约定）。
          56/56 100% 通过，3.17s，0 编译错误。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '4 步 · Gate 先行',
  flowTitle: '执行流程：4 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'UT-001', label: '框架搭建（22m）',
      action: 'Unity+CMock 下载 + CMakeLists.txt + preprocess 脚本 + stub 文件',
      post: 'cmake configure + build test_led 成功', edge: '框架就绪',
      why: '先搭质检台，才能测零件',
    },
    {
      id: 1, name: 'UT-002', label: 'led 全量单测（10m）',
      action: '11 用例：lifecycle + yx_led_set_state API + 异常处理',
      post: '11/11 PASS', edge: 'led 通过',
      why: '代表性模块全量测，验证框架可用性',
    },
    {
      id: 2, name: 'UT-003', label: '15 模块接口验证（4m 48s）',
      action: '15 模块 × 3 用例（模块 ID 有效性 + 类型完整性 + 错误码约定）',
      post: '45/45 PASS', edge: '接口全过',
      why: '广度覆盖，每个模块至少验通用契约',
    },
    {
      id: 3, name: 'UT-004', label: '汇总规格 + 报告（12s）',
      action: 'ts-ut-2026-001.md 汇总规格 + task_sw_ut.md 更新',
      post: 'ts-ut-2026-001.md（文件落盘）', edge: '测试证据',
      why: '结论留档可追溯',
    },
  ],
  flowNodes: [
    { id: 0, name: '框架搭建', icon: '🏗️', color: 'blue', sub: '22m' },
    { id: 1, name: 'led 全量', icon: '💡', color: 'cyan', sub: '11/11' },
    { id: 2, name: '15 模块接口', icon: '🔌', color: 'cyan', sub: '45/45' },
    { id: 3, name: '汇总报告', icon: '✅', color: 'green', sub: '56/56' },
  ],
  flowTutor: {
    question: '考官问「单元测试为什么选 Unity + CMock？」怎么答？',
    answer: (
      <span>
        <b>Unity</b> 是轻量 C 断言框架（嵌入式标准）；<b>CMock</b> 做函数级 mock（模拟依赖）；
        <b>CMake</b> 组织构建。组合优势：<b>轻量可移植</b>（嵌入式 C 主流标准）、
        <b>框架一次搭建后续复用</b>（集成测试同框架）、<b>确定性可复跑</b>。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: '源码（77 .c files）', role: '被测对象' },
      { name: 'SW-ARCH', role: '架构（模块清单）' },
      { name: 'Unity + CMock + CMake', role: '测试框架' },
      { name: 'GCC/CMake/Ruby/lcov', role: '工具链' },
    ],
    inputKeyline: '最关键输入是 <Hl>源码 + 框架</Hl>——4 项 Gate 全过才开测。',
    outputs: [
      { name: 'ts-ut-2026-001.md', role: '单元测试规格' },
      { name: '56/56 PASS 结果', role: '测试结论' },
      { name: 'task_sw_ut.md', role: '任务台账' },
    ],
    callGraphs: [
      {
        title: '命令级 · swe-unit-verify 与上下游的关系',
        color: 'cyan',
        from: { id: 'ut', cmd: '/yxspec:swe-unit-verify', sub: 'SWE.4 · 单元验证', desc: '函数级质检' },
        tos: [
          { id: 'up-do', cmd: 'swe-coding-do', edge: '源码（19 模块）', edgeDesc: '被测对象', desc: '上游：编码产物。' },
          { id: 'peer-it', cmd: 'swe-integration-verify', edge: '框架复用', edgeDesc: '四路并行', desc: '并行：编码后 static / unit / integration / verify-pc 四类验证并行开展、互为独立证据；本阶段搭建的 Unity+CMock 框架被集成测试复用，但集成验证不以单元验证完成为前置。' },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-unit-verify' },
      { seg: 'input', label: '77 .c files' },
      { seg: 'script', label: '4 Gate' },
      { seg: 'worker', label: 'led 11 用例' },
      { seg: 'worker', label: '接口 45 用例' },
      { seg: 'output', label: 'test_*.c ×16 + ts-ut-2026-001.md' },
      { seg: 'output', label: '56/56 PASS' },
    ],
    qualityGates: [
      { code: 'Gate', name: '4 项 Gate', phase: '前置', check: '源码/架构/框架/工具链', outcome: '全过' },
      { code: 'PASS', name: '用例结果', phase: '执行', check: '56/56 通过 0 失败', outcome: '100%' },
    ],
    failures: [
      { fault: 'Gate 不通过', action: '补框架/工具链' },
      { fault: '用例失败', action: '修复后重跑（本案例 0 失败）' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-unit-verify 怎么讲？',
    answer: (
      <span>
        「unit-verify 搭 Unity+CMock+CMake 框架（4 Gate 全过），测 16 模块 56 用例：led 全量 11 + 15 模块接口 45，
        <b>56/56 100% 通过</b>（3.17s，0 编译错误），产出 ts-ut 规格；框架复用给集成测试。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'ts-ut-2026-001.md', kind: 'cyan', what: '单元测试规格（16 模块 56 用例定义）', who: '测试证据' },
    { name: 'CMakeLists + stub', kind: 'amber', what: '测试框架（Unity+CMock+CMake）', who: '集成测试复用' },
    { name: 'task_sw_ut.md', kind: 'green', what: '任务台账（UT-001~004）', who: '门控 + 追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>框架搭建 → led 全量 → 15 模块接口 → 56/56 PASS → ts-ut 规格</Hl>。',
  samplesTitle: '用例真实样例（点开看字段）',
  samples: [
    {
      id: 'led 用例', badges: [{ kind: 'cyan', text: '11 用例' }], meta: '全量',
      title: 'MOD-016 led：lifecycle + API + 异常',
      fields: [
        { k: 'lifecycle', v: '初始化 → 设置 → 销毁全流程' },
        { k: 'API', v: 'yx_led_set_state 各状态（红/绿/蓝/灭）' },
        { k: '异常', v: '非法参数/未初始化调用' },
      ],
    },
    {
      id: '接口用例', badges: [{ kind: 'blue', text: '45 用例' }], meta: '15 模块 ×3',
      title: '模块接口验证：ID 有效 + 类型完整 + 错误码约定',
      fields: [
        { k: 'ID 有效性', v: '模块 ID 在注册表内' },
        { k: '类型完整性', v: '接口类型定义齐全' },
        { k: '错误码约定', v: '错误码符合模块约定' },
      ],
    },
  ],
  samplesNote: '「接口契约」在函数级就被验证——错误码约定提前守。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.4 · 单元验证',
    title: '门控 · 追溯 · AI 协同（swe-unit-verify 版）',
    sub: '函数级质量门——零件质检。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '4 项 Gate + 56/56 全过才放行'],
        ['<Badge kind="green">追溯</Badge>', 'ts-ut 规格 + task 台账双留档'],
        ['<Badge kind="blue">AI 协同</Badge>', '框架确定性执行 + 用例设计（人/AI）'],
      ],
    },
    sections: [
      {
        title: '16 模块 56 用例构成',
        type: 'ul',
        items: [
          'MOD-016 led 全量：11 用例（lifecycle/API/异常）',
          '15 模块接口验证：45 用例（ID/类型/错误码 ×3）',
          '执行结果：56/56 PASS，0 失败，3.17s，0 编译错误',
          '建议下一步 review swe_unit_verify（不自动执行）',
        ],
        keyline: '全量保深度、抽验保广度——函数级质量双保险。',
      },
    ],
  },
};

export default utChapter;
