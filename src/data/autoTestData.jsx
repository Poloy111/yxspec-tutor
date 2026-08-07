/**
 * yxspec-tutor · sqt-auto-test 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/sqt-auto-test.md + project/tests/auto_test/logs/index.json
 * 真实运行：2026-08-03 ~ 08-05 多轮迭代（116 用例，7 轮收敛 55.2%→100%）
 */

const autoTestChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:sqt-auto-test · SYS.5/SUP.8 · 自动化测试 + 缺陷报告',
    oneLiner:
      '跑 Behave 自动化测试（设备 profile 注入 + 多模式：标准/并行/长稳）→ 失败用例批量生成缺陷报告（defect-report skill）→ 修复→刷写→回归闭环。本工程多轮迭代 7 轮：R1 55.2% → R7 100%（116/116，124 台架 08-05）。',
    analogy:
      '把 sqt-auto-test 想象成「机器阅卷 + 错题本」：答题卡（Behave 脚本）放进机器自动阅卷（behave 执行），出的每道错题（失败用例）自动生成错题档案（defect-report），错题本汇总成「试卷分析」（SQT-DR 缺陷闭环报告）交给开发改错，改完重考（修复→刷写→回归）看分数涨没涨。本工程 7 轮收敛：从 R1 的 55.2% 考到 R7 的 100%。',
    memoryLine: '记住：<Hl>auto-test = 机器阅卷 + 错题闭环</Hl>——116 用例通过率 55.2%→100%。',
    purpose: {
      oneLiner:
        '6 步：Step 0 设备 profile 解析 + 环境变量注入 → Step 1 跑 behave（--parallel 并行 / --soak 长稳）→ Step 1.5 post-run 健康检查 → Step 2 失败用例调 defect-report skill 批量生成缺陷报告 → Step 3 自动提交 → Step 4 汇总输出；Step 5 可选：修复→远程刷写→回归闭环。',
      input: {
        title: '3 类输入',
        items: [
          '设备 profile（IMEI/ProductKey/MCP Host）——Step 0 解析注入',
          'Behave feature 脚本（released/ 冻结产物）',
          '测试环境（MCP 服务端口 10000，9 服务）',
        ],
        note: '本工程最新：IMEI 868471086583428（R7 08-05_144916 轮），MCP Host 172.16.90.128',
      },
      processTitle: '6 步（含可选 Step 5）',
      process: [
        '① Step 0：设备 profile 解析 + 环境变量注入',
        '② Step 1：跑 behave（标准模式；--parallel 并行；--soak 长稳分支）',
        '③ Step 1.5：post-run 健康检查（P2.3 命令侧）',
        '④ Step 2：失败用例 → defect-report skill 批量生成结构化缺陷报告',
        '⑤ Step 3-4：自动提交 + 汇总输出',
        '⑥ Step 5（可选）：修复 → 远程刷写 → 回归闭环',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'TEST_REPORT.md', what: '测试报告（总/通过/失败/错误/跳过 + 逐用例详情）', consumer: '缺陷分析 + 质量门' },
        { name: 'defect-reports/{imei}_{ts}/def-*/report.md', what: '失败用例结构化缺陷报告（批量）', consumer: 'sqt-defect-feedback 输入' },
      ],
      value: [
        '116 用例 7 轮迭代：R1 55.2% → R6 81.9%（08-04，21 DEF）→ R7 100%（08-05，116/116）',
        'IF 接口域缺陷从 08-03 133 个收敛到 08-04 21 个 → 08-05 6 个（修复→回归效果显著）',
        '失败用例自动生成结构化缺陷报告——不手工写',
      ],
      boundary: [
        '不生成用例 —— 那是 sqt-case-design 的事',
        '不翻译脚本 —— 那是 sqt-script-gen 的事',
        'auto-test 只回答「脚本跑起来结果如何、失败怎么记」',
      ],
      example:
        'IF 接口域 BLE-008 参数化 @1.2：字段 acc_on expected=True actual=False → 自动生成 def-2026-0183 缺陷报告（协议/字段问题）。',
    },
    rolesTitle: '谁在干活？（命令 / 设备 / 报告 skill）',
    roles: [
      { kind: 'blue', role: '测试执行队长', who: '/yxspec:sqt-auto-test 命令', does: 'profile 注入 → behave 执行 → 报告生成 → 提交' },
      { kind: 'cyan', role: 'behave', who: 'released/ 冻结 feature + step 库', does: 'BDD 脚本执行（参数化展开）' },
      { kind: 'amber', role: 'defect-report skill', who: '失败用例批量', does: '生成结构化缺陷报告（摘要/环境/复现/定位）' },
      { kind: 'green', role: '设备', who: '真机（IMEI 868471086583428）', does: 'DUT 应答与上报（MQTT/BLE/SIF）' },
    ],
    whyTitle: '为什么要自动化测试？',
    whyShell: [
      '为什么设备 profile 注入？—— 每台设备参数不同，注入后脚本与设备解耦',
      '为什么失败自动生成报告？—— 结构化缺陷报告是修复的输入，手写不可复用',
      '为什么多轮迭代？—— 修复→刷写→回归，通过率爬升是质量证据',
    ],
    whyMemory: '记住 <Hl>「机器阅卷 + 错题自动归档」</Hl>——失败即生成缺陷报告。',
    instance: {
      stats: [
        { num: '116', label: '总用例', desc: 'BLE/MQTT/SIF 协议域', kind: 'cyan' },
        { num: '100%', label: '最新通过率', desc: '116/116（08-05，124 台架）', kind: 'green' },
        { num: '0', label: '最新失败', desc: 'R7 116/116 全通过（缺陷 133→21→6→0 收敛）', kind: 'green' },
        { num: '8~12m', label: '单轮耗时', desc: '标准模式一轮', kind: 'cyan' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>116 用例、通过率 55.2%→100%</Hl>。答辩时说「自动化测试 7 轮迭代，通过率从 R1 的 55.2% 收敛到 R7 的 100%」就是一句话结论。',
    },
    downstream: ['TEST_REPORT → 质量门', 'defect-reports → DR 闭环', '回归 → 修复验证'],
    downstreamLine: '一句话：<Hl>自动化测试是「机器阅卷」</Hl>——跑得快、记得准、可回归。',
    ironRules: [
      '<b>失败必归档</b> —— 每个失败用例生成结构化缺陷报告',
      '<b>设备 profile 先行</b> —— Step 0 解析注入，不硬编码设备参数',
      '<b>post-run 健康检查</b> —— 跑完先查环境健康再分析结果',
      '<b>修复→刷写→回归</b> —— 闭环才算修好',
    ],
    tutor: {
      question: '考官问「自动化测试发现缺陷后怎么闭环？通过率怎么爬升的？」怎么答？',
      answer: (
        <span>
          闭环链路：<b>behave 失败 → defect-report 批量生成结构化缺陷报告（含摘要/环境/复现步骤/初步定位）→
          sqt-defect-feedback 汇总成 SQT-DR 缺陷闭环报告（fix-group 分组 + CI 回归计划）→
          开发修复 → 远程刷写 → 回归重跑</b>。
          本工程证据：08-03 BLE 缺陷 133 个 → 08-04 收敛 21 个 → 08-05 最新 6 个，
          通过率从 R1 的 <b>55.2%</b> 收敛到 R7 的 <b>100%（116/116）</b>——多轮迭代数据是闭环效果的硬证据。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '6 步 · 阅卷流水线',
  flowTitle: '执行流程：5 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'Step 0', label: '设备 profile 解析 + 环境注入',
      action: '解析设备 profile（IMEI 868471086584343 / ProductKey YX_C25 / MCP Host 172.16.90.128）+ 环境变量注入',
      post: '设备 profile 解析（IMEI/PK/Host）+ 环境注入就绪', edge: '环境→执行',
      why: '脚本与设备解耦，参数化注入',
      badges: [{ kind: 'green', text: '注入' }],
    },
    {
      id: 1, name: 'Step 1', label: '跑 behave（标准/并行/长稳）',
      action: '执行 released/ 冻结 feature（116 用例参数化展开）；--parallel 并行分支 / --soak 长稳分支',
      post: 'behave 结果（116 用例 PASS/FAIL）', edge: '执行→健康',
      why: '三种模式覆盖常规/提速/长稳',
    },
    {
      id: 2, name: 'Step 1.5', label: 'post-run 健康检查',
      action: 'P2.3 命令侧健康检查（环境是否正常，防止误报失败）',
      post: 'P2.3 健康确认（环境正常，无误报）', edge: '健康→报告',
      why: '环境故障与用例失败要区分',
    },
    {
      id: 3, name: 'Step 2', label: '失败用例 → defect-report 批量',
      action: '每个失败用例调用 defect-report skill 生成结构化缺陷报告（摘要/环境/复现步骤/证据/初步定位）',
      post: 'def-*/report.md 批量', edge: '报告→提交',
      why: '结构化缺陷报告是修复的输入',
      badges: [{ kind: 'amber', text: '批量' }],
    },
    {
      id: 4, name: 'Step 3-5', label: '提交 + 汇总 + 回归闭环',
      action: 'Step 3 自动提交 + Step 4 汇总输出；Step 5 可选：修复 → 远程刷写（TL OTA）→ 回归重跑',
      post: 'TEST_REPORT + 回归数据', edge: '闭环',
      why: '修复→刷写→回归，通过率爬升是证据',
      badges: [{ kind: 'green', text: '55.2%→100%' }],
    },
  ],
  flowNodes: [
    { id: 0, name: 'profile 注入', icon: '🖥️', color: 'blue', sub: '设备解耦' },
    { id: 1, name: 'behave 执行', icon: '🤖', color: 'cyan', sub: '116 用例' },
    { id: 2, name: '健康检查', icon: '🩺', color: 'cyan', sub: 'P2.3' },
    { id: 3, name: '缺陷报告', icon: '📋', color: 'amber', sub: '批量' },
    { id: 4, name: '回归闭环', icon: '✅', color: 'green', sub: 'R7 100%' },
  ],
  flowTutor: {
    question: '考官问「behave 的三种执行模式分别什么时候用？」怎么答？',
    answer: (
      <span>
        <b>标准模式（默认）</b>：全量 116 用例一轮跑完（8~12 分钟），常规回归；
        <b>--parallel 并行模式</b>：跳过 Step 0/1/1.5 直接并行执行，提速（多设备/多通道）；
        <b>--soak 长稳模式</b>：跳过 behave 逻辑走长稳分支——测持续运行稳定性（如 12 小时不掉线）。
        本工程常规回归走标准模式，多轮迭代快速验证走并行。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: '设备 profile', role: 'IMEI/ProductKey/MCP Host（Step 0 解析）' },
      { name: 'Behave feature', role: 'released/ 冻结脚本（116 用例）' },
      { name: '测试环境', role: 'MCP 服务（端口 10000，9 服务）' },
    ],
    inputKeyline: '最关键输入是 <Hl>设备 profile + feature 脚本</Hl>——执行对象与环境参数。',
    outputs: [
      { name: 'TEST_REPORT.md', role: '测试报告（116 用例逐条 PASS/FAIL）' },
      { name: 'defect-reports/*/def-*/report.md', role: '失败用例结构化缺陷报告' },
    ],
    callGraphs: [
      {
        title: '命令级 · sqt-auto-test 与上下游的关系',
        color: 'cyan',
        from: { id: 'at', cmd: '/yxspec:sqt-auto-test', sub: 'SYS.5/SUP.8 · 自动化测试', desc: '机器阅卷' },
        tos: [
          { id: 'up-sg', cmd: 'sqt-script-gen', edge: 'feature 脚本', edgeDesc: '冻结产物', desc: '上游：脚本生成冻结后执行。' },
          { id: 'down-df', cmd: 'sqt-defect-feedback', edge: 'defect-reports', edgeDesc: 'DR 闭环输入', desc: '下游：缺陷报告汇总成 DR。' },
          { id: 'side-ota', cmd: 'TL OTA 刷写', edge: '修复后刷写', edgeDesc: 'Step 5 回归', desc: '协作：修复固件远程刷写后回归。', dashed: true },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:sqt-auto-test' },
      { seg: 'input', label: 'profile + feature' },
      { seg: 'worker', label: 'behave 116' },
      { seg: 'worker', label: 'defect ×N' },
      { seg: 'output', label: 'TEST_REPORT (R7 116/116)' },
      { seg: 'output', label: 'sqt-dr-*/* 缺陷报告' },
    ],
    qualityGates: [
      { code: 'H', name: 'post-run 健康', phase: '执行', check: 'P2.3 环境健康（防误报）', outcome: '过' },
      { code: 'DEF', name: '失败必归档', phase: '执行', check: '每个失败用例生成缺陷报告', outcome: '6/6' },
      { code: 'REG', name: '回归', phase: '收尾', check: '修复→刷写→重跑，通过率爬升', outcome: '100%' },
    ],
    failures: [
      { fault: 'Service Discovery 未执行', action: 'BLE 前置鉴权失败 → 修复后回归（08-04 大量此类）' },
      { fault: '字段断言不符', action: 'acc_on expected=True actual=False → 缺陷报告归档' },
      { fault: '帧捕获超时', action: '8s 未捕获 0x30F0 上行帧 → 缺陷报告归档' },
    ],
  },
  ioTutor: {
    question: '答辩时 sqt-auto-test 怎么讲？',
    answer: (
      <span>
        「auto-test 跑 Behave 自动化测试：设备 profile 注入 → 116 用例执行（标准/并行/长稳三模式）→
        post-run 健康检查 → 失败用例批量生成结构化缺陷报告 → 自动提交。
        <b>修复→远程刷写→回归闭环</b>：通过率从 R1 的 <b>55.2%</b> 收敛到 R7 的 <b>100%（116/116）</b>，
        失败用例从 133 收敛到 6——多轮迭代是闭环效果的硬证据。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'logs/2026-08-05_144916/TEST_REPORT.md', kind: 'green', what: '最新测试报告（116/116 通过，R7，08-05_144916 轮）', who: '质量证据' },
    { name: 'logs/index.json', kind: 'cyan', what: '多轮运行索引（08-03~08-05 全部 run）', who: '迭代追溯' },
    { name: 'defect-reports/{imei}_{ts}/def-*/report.md', kind: 'amber', what: '失败用例结构化缺陷报告', who: 'DR 闭环输入' },
    { name: 'released/Finsh_IF_V1.1/', kind: 'cyan', what: '冻结 feature + step 库（执行输入）', who: '可复跑' },
  ],
  artifactsChain: '一句话串起来：<Hl>profile → behave 116 → 失败即归档 → TEST_REPORT → 修复回归</Hl>。',
  samplesTitle: '真实测试样例（点开看字段）',
  samples: [
    {
      id: 'PASS', badges: [{ kind: 'green', text: 'PASS' }], meta: 'BLE 域',
      title: '0x3021 正确密钥鉴权 DUT 回 RSP auth_result=0x00',
      fields: [
        { k: '用例', v: 'SQT-TC-2026-001-TC-IF-BLE-001' },
        { k: '验证', v: '鉴权回包 auth_result=0x00（08-05 通过）' },
      ],
    },
    {
      id: 'FAIL', badges: [{ kind: 'amber', text: 'FAIL' }], meta: 'BLE 域',
      title: '0x30F0 设防控车命令 DUT 经 BLE 转发上行帧',
      fields: [
        { k: '用例', v: 'SQT-TC-2026-001-TC-IF-BLE-005' },
        { k: '现象', v: '8s 内未捕获 DUT 0x30F0 上行帧（操作码 0x01）；命中帧=无' },
        { k: '去向', v: '自动生成缺陷报告归档 → DR 闭环' },
      ],
    },
  ],
  samplesNote: 'PASS 留证、FAIL 归档——每个失败用例都有结构化报告可追踪。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SYS.5/SUP.8 · 自动化测试',
    title: '门控 · 追溯 · AI 协同（sqt-auto-test 版）',
    sub: '机器阅卷——失败即归档。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', 'post-run 健康检查 + 失败必归档'],
        ['<Badge kind="green">追溯</Badge>', 'TEST_REPORT 逐用例 + defect-reports 结构化 + index 多轮'],
        ['<Badge kind="blue">AI 协同</Badge>', 'behave 确定性执行 + defect-report skill 批量生成'],
      ],
    },
    sections: [
      {
        title: '失败归档链路（测试→缺陷报告）',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'behave 失败用例' },
          { kind: 'output', label: 'defect-report skill 调用' },
          { kind: 'output', label: '结构化报告（摘要/环境/复现/证据/定位）' },
          { kind: 'output', label: 'def-2026-XXXX/report.md 落盘' },
          { kind: 'output', label: 'sqt-defect-feedback 汇总 SQT-DR' },
        ],
        keyline: '「失败不是终点，是修复的起点」——结构化归档让每个失败可追溯可修复。',
      },
      {
        title: '多轮迭代回归（数据证据）',
        type: 'ul',
        items: [
          '08-03：BLE 174 用例 41 通过（133 失败）——基线很差',
          'R1 07-31：55.2% ——首轮基线',
          'R7 08-05：116/116 全通过（124 台架）——21 DEF 闭环后收敛',
          '结论：修复→刷写→回归每轮都有量化进步',
        ],
        keyline: '「通过率爬升曲线」是自动化测试闭环效果的最硬证据。',
      },
    ],
  },
};

export default autoTestChapter;
