/**
 * yxspec-tutor · swe-coding-do 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/swe-coding-do-v2.md（薄编排，3 阶段 skill）
 * 真实产物：project/tasks/coding-do/（19 份 coding-result + final-report + build_result）
 * 真实运行：2026-07-30（--all 全量执行，final-report 16:49 生成）
 */

const doChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-coding-do-v2 · SWE.4 · 编码执行',
    oneLiner:
      '按 19 份编码计划施工——12 个模块完整编码 done、6 个带阻塞完成、1 个阻塞（MOD-009），216 个 TASK 中 190 done / 26 blocked（12% 阻塞率），编译因无 ARM 工具链零阻塞跳过。',
    analogy:
      '把 swe-coding-do 想象成「施工队进场」：swe-coding-plan 排好了 19 栋楼的施工计划书，swe-coding-do 就是施工队按计划开工——大部分楼按计划盖完（12 个 done），有些楼部分施工完成（6 个带阻塞，几个 TASK 因为设计问题没定先留着），一栋楼因为计划本身画错了停工（MOD-009 归属误判，等 change 流程修正）。盖完的楼要过质检（编译），但本项目工地没有质检仪器（无 ARM 工具链），质检延后到下游补。',
    memoryLine: '记住：<Hl>swe-coding-do = 按计划施工 19 个模块</Hl>——190/216 TASK 完成，12% 阻塞率。',
    purpose: {
      oneLiner:
        '3 阶段串联执行编码：freeze（接口冻结，前序已冻结 19 模块 skipped）→ spawn（滑窗 ≤5 编码 Worker）→ build（编译验证），产出 19 份 coding-result + final-report。',
      input: {
        title: '2 类输入',
        items: [
          'coding-plan-mod-*.md —— 19 份编码计划（含决议）',
          'sw-if 接口规范 + shared_types_indexed=79',
        ],
        note: '前置门禁：gate_coding_do_v2.py --gate freeze（rc=0）',
      },
      processTitle: '3 阶段串联（滑窗 ≤5）',
      process: [
        '① freeze：接口冻结（19 模块前序已冻结，skipped；0 新 stub）',
        '② spawn：滑窗 ≤5 spawn 编码 Worker 按计划施工（含 8/9/9.5 步：编码/自检/rebake）',
        '③ build：编译验证（本环境无 ARM 交叉工具链 → toolchain_error 零阻塞跳过，待下游补验）',
        '④ 确认报告：输出 final-report（12 done / 6 done_with_blocked / 1 blocked），建议下一步进入验证阶段——static/unit/integration/verify-pc 四类并行，PC 验证（verify-pc）为阶段一完成标志',
      ],
      outputsTitle: '3 样（代码入库 + 报告）',
      outputs: [
        { name: 'coding-result-MOD-*.md ×19', what: '各模块编码结果（TASK 完成/阻塞明细）', consumer: '编码验证 + 追溯' },
        { name: 'coding-do-final-report.md', what: '编码执行最终报告（12 done / 6 done_with_blocked / 1 blocked）', consumer: '门控放行 + 证据链' },
        { name: '源码变更', what: '19 模块源码（如 bms diff 558 行、tsp_mqtt 25 函数）', consumer: '编译 + 验证 + 发布' },
      ],
      value: [
        '216 TASK 中 190 完成——编码按计划推进可量化',
        '26 个 blocked 全部记档原因（协议归属错配/未决议 U 编号）——不掩盖问题',
        '编译未验证如实记录（toolchain_error 零阻塞跳过）——诚实报告不凑数',
      ],
      boundary: [
        '不管「代码怎么验证」——那是 swe-coding-verify-pc / unit-verify 的事',
        '不管「静态分析」——那是 swe-static-verify 的事',
        'swe-coding-do 只回答「按计划施工完成没有」',
      ],
      example:
        'MOD-002（eb_link）基线是国标 TCP，计划把 TL_A MQTT 归给它 → 施工时发现归属错配 → 19 TASK blocked 记档 → 后经 CR-20260730-006 修正 transferred。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '施工队长', who: '/yxspec:swe-coding-do-v2 命令（薄编排）', does: '续跑检测 + 3 阶段门禁 + 按序调 skill + 确认报告' },
      { kind: 'cyan', role: '编码 Worker', who: 'yxspec-coding-worker（滑窗 ≤5）', does: '按 coding-plan-mod-*.md 施工（编码 + 自检 + rebake ≤1 轮）' },
      { kind: 'amber', role: '门禁脚本', who: 'gate_coding_do_v2.py --gate <stage>', does: '3 个门禁点：freeze/spawn/build，rc=0 放行 rc=2 停' },
      { kind: 'green', role: '人工介入', who: 'blocked 模块', does: 'MOD-009 blocked（0/3 TASK）→ /yxspec:change 修正归属' },
    ],
    whyTitle: '为什么要这样分工？（为什么 blocked 不硬编码）',
    whyShell: [
      '为什么 blocked TASK 跳过不硬编码？—— 未决议的问题硬写代码就是带病施工，记档留给 change 流程',
      '为什么编译未验证要如实记录？—— 无 ARM 工具链是环境限制，不是代码问题，零阻塞跳过由下游补验',
      '为什么 rebake 最多一轮？—— 自动化修复有界，防止死循环消耗',
    ],
    whyMemory: '记住 <Hl>「滑窗施工 + 阻塞记档 + 诚实报告」</Hl>——能施工的施工，不能的记档不硬来。',
    instance: {
      stats: [
        { num: '12+6+1', label: '模块结果', desc: '12 done / 6 done_with_blocked / 1 blocked（MOD-009）', kind: 'cyan' },
        { num: '190/216', label: 'TASK 完成', desc: '26 blocked（12% 阻塞率）', kind: 'cyan' },
        { num: '0', label: '编码失败', desc: 'review 门拦截 0 / rebake 0', kind: 'green' },
        { num: 'toolchain_error', label: '编译结果', desc: '无 ARM 工具链 → 零阻塞跳过待补验', kind: 'amber' },
        { num: '79', label: 'shared types', desc: 'freeze 阶段（0 新 stub）', kind: 'cyan' },
      ],
      memoryLine: '记住这 3 个数字：<Hl>12 done、190/216 TASK、12% 阻塞率</Hl>。答辩时说「阻塞全部记档归因、编译未验证如实报告」就是一句话结论。',
    },
    downstream: ['coding-result → verify-pc', '源码 → 编译验证', 'blocked 清单 → change 流程'],
    downstreamLine: '一句话：<Hl>编码结果是「验证的输入」</Hl>——verify-pc 按 19 模块逐组验证，blocked 进 change 修正。',
    ironRules: [
      '<b>门禁先行</b> —— 3 个门禁点 rc=2 即停',
      '<b>禁止跳步/并行</b> —— freeze → spawn → build 严格顺序',
      '<b>幂等续跑</b> —— done 模块不重跑，freeze stub 已存在则跳过',
      '<b>blocked 不硬编码</b> —— 未决议 TASK 记档跳过，留给 change/决议',
      '<b>rebake ≤1 轮</b> —— 自动化修复有界',
    ],
    tutor: {
      question: '考官问「MOD-009 为什么 blocked？后来怎么处理的？」怎么答？',
      answer: (
        <span>
          <b>原因</b>：plan 阶段归属误判——TL_A/TEST_TEMP 的 MQTT 协议被归给 MOD-009（its），实际应归 tsp_mqtt；0/3 TASK 全 blocked，源码零改动。
          <b>处理</b>：经 /yxspec:change 流程 CR-20260730-006 修正：0 有效 TASK → status=not_applicable；
          同时 MOD-002 的 19 TASK 协议归属错配 transferred 到 tsp_mqtt。
          这体现「<b>计划错误施工前拦下</b>」——blocked 记档不是失败，是防错机制。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '3 阶段 + 确认报告 · 滑窗 ≤5 · 阻塞记档',
  flowTitle: '执行流程：5 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>每阶段前必须跑门禁脚本（rc=2 即停）</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: '续跑检测', label: '续跑检测（产物存在性判定）',
      action: 'freeze_result.json 不存在 → 全新；存在且 INDEX 有候选 → 阶段 2 重入；候选清零无 build 报告 → 阶段 3 重入',
      post: '重入点判定（依据 freeze_result.json / INDEX / build 报告）', edge: '定位续跑入口',
      why: '中断不丢工，按产物定位重入点',
    },
    {
      id: 1, name: 'freeze', label: '接口冻结（阶段 1）',
      action: 'gate --gate freeze → swe-coding-do-v2-freeze：19 模块前序已冻结 → skipped；shared_types_indexed=79，0 新 stub',
      post: 'freeze_result.json', edge: '接口冻结确认',
      why: '接口未冻结不施工，防编码与接口打架',
    },
    {
      id: 2, name: 'spawn', label: '编码施工（阶段 2，滑窗 ≤5）',
      action: 'gate --gate spawn → swe-coding-do-v2-spawn：滑窗 ≤5 spawn 编码 Worker 按计划施工（编码/自检/rebake ≤1 轮）',
      post: 'coding-result-MOD-*.md ×19', edge: '19 份编码结果',
      why: '滑窗控资源，按计划施工',
      badges: [{ kind: 'cyan', text: '滑窗 ≤5' }],
    },
    {
      id: 3, name: 'build', label: '编译验证（阶段 3）',
      action: 'gate --gate build → swe-coding-do-v2-build：本环境无 ARM 交叉工具链 → toolchain_error（exit_code=2）零阻塞跳过',
      post: 'build_result.json（toolchain_error）', edge: '编译结果（待补验）',
      why: '编译是质量门，但环境限制如实记录不造假',
      badges: [{ kind: 'amber', text: '零阻塞跳过' }],
    },
    {
      id: 4, name: '确认报告', label: '确认报告（步骤 11.7）',
      action: '输出 final-report：12 done / 6 done_with_blocked / 1 blocked；建议下一步 swe-coding-verify-pc-v2（PC 端编码验证，与 static/unit/IT 四路并行，不自动执行）',
      post: 'coding-do-final-report.md', edge: '报告 → 下游验证',
      why: '收尾留档，明确下一步',
      badges: [{ kind: 'green', text: '不自动执行' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '续跑检测', icon: '↻', color: 'blue', sub: '定位重入点' },
    { id: 1, name: 'freeze', icon: '❄', color: 'amber', sub: '19 模块 skipped' },
    { id: 2, name: 'spawn 施工', icon: '🛠️', color: 'cyan', sub: '滑窗 ≤5' },
    { id: 3, name: 'build', icon: '⚙️', color: 'amber', sub: 'toolchain_error' },
    { id: 4, name: '确认报告', icon: '✅', color: 'green', sub: '12+6+1' },
  ],
  flowTutor: {
    question: '考官问「swe-coding-do 怎么处理 blocked TASK？为什么？」怎么答？',
    answer: (
      <span>
        26 个 blocked TASK <b>记档跳过，不硬编码</b>：如 MOD-002 的 19 TASK 协议归属错配（TL_A MQTT 应归 tsp_mqtt 非 eb_link）、
        MOD-006 TASK-010 超速提示音归属未决（[U-003]）。原因：<b>未决议的问题硬写代码就是带病施工</b>——
        记档后经 /yxspec:change 流程修正（CR-20260730-006 实际修正了 MOD-002/009）。
        12% 阻塞率如实报告，这就是「诚实施工」。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'coding-plan-mod-*.md ×19', role: '编码计划（含 TASK 分解与决议）' },
      { name: 'coding-plan-index.md', role: '计划索引（状态权威）' },
      { name: 'sw-if 接口规范', role: '接口定义（shared_types_indexed=79）' },
    ],
    inputKeyline: '最关键输入是 <Hl>19 份编码计划</Hl>——施工按计划，计划错误施工前拦下。',
    outputs: [
      { name: 'coding-result-MOD-*.md ×19', role: '各模块编码结果（TASK done/blocked 明细）' },
      { name: 'coding-do-final-report.md', role: '最终报告（12+6+1 模块结果 + 阻塞统计）' },
      { name: 'build_result.json', role: '编译结果（toolchain_error，待下游补验）' },
      { name: '源码变更', role: '19 模块源码（bms diff 558 行等）' },
    ],
    outputKeyline: '核心输出链：<Hl>freeze（接口确认）→ spawn（编码结果 ×19）→ build（编译结果）→ final-report</Hl>。',
    callGraphs: [
      {
        title: '命令级 · swe-coding-do 与上下游的关系',
        color: 'cyan',
        from: { id: 'do', cmd: '/yxspec:swe-coding-do-v2', sub: 'SWE.4 · 编码执行', desc: '按计划施工 19 个模块' },
        tos: [
          { id: 'up-plan', cmd: 'swe-coding-plan-v2', edge: 'coding-plan-mod-*.md', edgeDesc: '施工依据', desc: '上游：19 份编码计划是施工的唯一依据。' },
          { id: 'down-vpc', cmd: 'swe-coding-verify-pc', edge: '源码 + coding-result', edgeDesc: '验证输入', desc: '下游：PC 端验证按 19 模块逐组验证（G0/G1/S1/M1）。' },
          { id: 'down-v', cmd: 'static/unit/IT/verify-pc', edge: '四类并行', edgeDesc: '编码后验证', desc: '下游：编码后 static / unit / integration / verify-pc 四类验证并行开展，PC 验证（25/25，M1 合规）为阶段一完成标志。', dashed: true },
          { id: 'side-change', cmd: 'yxspec:change', edge: 'blocked 修正', edgeDesc: 'CR 变更', desc: '协作：blocked TASK 经变更流程修正归属（CR-20260730-006）。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个阶段干活',
        color: 'blue',
        from: { id: 'orch', cmd: '编排器（薄编排）', sub: '3 阶段 + 报告', desc: '续跑检测 → 按序调 skill → 门禁 → 报告' },
        tos: [
          { id: 'gate', cmd: 'gate_coding_do_v2.py', edge: '3 个门禁点', edgeDesc: 'rc=0 放行 rc=2 停', desc: 'freeze/spawn/build 每阶段前置检查。' },
          { id: 'worker', cmd: 'yxspec-coding-worker', edge: 'spawn 滑窗 ≤5', edgeDesc: '按计划施工', desc: '编码 + 自检 + rebake（≤1 轮）。' },
          { id: 'human', cmd: '人工介入', edge: 'blocked 模块', edgeDesc: 'MOD-009 等', desc: '计划错误 → change 流程修正，不硬编码。', dashed: true },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（门禁 + Worker + 人工）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-coding-do-v2' },
      { seg: 'input', label: '19 plan' },
      { seg: 'script', label: 'gate freeze' },
      { seg: 'worker', label: 'freeze（skipped）' },
      { seg: 'worker', label: 'spawn ≤5' },
      { seg: 'output', label: 'coding-checkpoint-MOD-*.md ×19' },
      { seg: 'worker', label: 'build' },
      { seg: 'output', label: 'build_result.json (toolchain_error)' },
      { seg: 'output', label: 'final-report' },
    ],
    pipeKeyline: '蓝色=脚本门禁 · 琥珀=Worker · 绿色=产物——「施工按计划，问题记档走变更」。',
    qualityGates: [
      { code: 'gate', name: '3 个门禁点', phase: '各阶段前置', check: 'freeze/spawn/build 每阶段 rc=0', outcome: 'rc=0' },
      { code: 'build', name: '编译验证', phase: '阶段3', check: '本环境无 ARM 交叉工具链 → toolchain_error', outcome: '零阻塞跳过' },
    ],
    gateNote: '对比 swe-coding-plan：SWE.4 计划阶段是「决议分级」；执行阶段是「阻塞记档」——施工阶段的问题交给 change 流程，不在编码里硬来。',
    failures: [
      { fault: 'gate rc=2', action: '按 stderr 提示补齐前置（先跑 swe-coding-plan-v2）' },
      { fault: 'TASK blocked（未决议）', action: '记档跳过，留给 change/决议（26 条真实案例）' },
      { fault: '编译 toolchain_error', action: '如实记录零阻塞跳过，下游 swe-coding-verify-v2 / swe-static-verify 补验' },
      { fault: '自动 rebake', action: '≤1 轮，防死循环' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-coding-do 的调用关系怎么讲？',
    answer: (
      <span>
        「swe-coding-do 消费 19 份编码计划，<b>3 阶段门禁串联</b>：freeze（接口冻结，前序已冻结 skipped）→
        spawn（滑窗 ≤5 编码 Worker 施工）→ build（编译验证，本环境 toolchain_error 零阻塞跳过），
        产出 19 份 coding-result + final-report（12 done / 6 done_with_blocked / 1 blocked），
        给 swe-coding-verify-pc 验证、blocked 走 change 修正。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'coding-result-MOD-*.md ×19', kind: 'cyan', what: '各模块编码结果（TASK done/blocked 明细 + diff 行数）', who: '验证输入 + 追溯' },
    { name: 'coding-do-final-report.md', kind: 'green', what: '最终报告：12 done / 6 done_with_blocked / 1 blocked + 阻塞统计', who: '门控放行 + 证据链' },
    { name: 'build_result.json', kind: 'amber', what: '编译结果（toolchain_error exit_code=2，待补验）', who: '下游验证' },
    { name: 'blocked-resolution-report.md', kind: 'amber', what: '阻塞清单（26 TASK 归因：归属错配/未决议 U 编号）', who: 'change 流程' },
    { name: 'coding-checkpoint-MOD-*.md', kind: 'amber', what: '模块检查点（9 个模块：MOD-001/002/004/008/011/015/017/024/035）', who: '中途状态记录' },
    { name: 'review-swe_coding-2026-001.md', kind: 'green', what: '阶段审查报告（signoff 双签）', who: '放行 + 追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>19 plan → freeze → 编码结果 ×19 → build（跳过）→ final-report → verify-pc + change</Hl>。',
  samplesTitle: '编码结果真实样例（点开看字段）',
  samples: [
    {
      id: 'MOD-005', badges: [{ kind: 'cyan', text: 'done' }], meta: '12 个 done 之一',
      title: 'bms 模块：电池管理全量完成（diff 558 行）',
      fields: [
        { k: 'TASK', v: '29/29 done' },
        { k: '内容', v: 'BMS 数据采集 + TLV 上报 + 一线通协议' },
        { k: '证据', v: 'diff 558 行（git 可查）' },
      ],
    },
    {
      id: 'MOD-002', badges: [{ kind: 'amber', text: 'blocked→修正' }], meta: 'CR 修正案例',
      title: 'eb_link 模块：19 TASK 协议归属错配 → CR-20260730-006 修正',
      fields: [
        { k: '问题', v: 'TL_A MQTT 协议被归给 eb_link（应归 tsp_mqtt）' },
        { k: '处置', v: '3 TASK done / 19 transferred → status=done（经 change 流程）' },
        { k: '教训', v: '计划归属误判在施工中暴露，走变更修正不硬写' },
      ],
    },
    {
      id: 'MOD-004', badges: [{ kind: 'cyan', text: 'done' }], meta: '12 个 done 之一',
      title: 'tsp_mqtt 模块：new 模块台铃 TL_A MQTT 链路（25 函数 + 装配）',
      fields: [
        { k: 'TASK', v: '8/8 done' },
        { k: '内容', v: 'TL_A MQTT 链路（LOGIN/GPS/STATUS/GB_ALARM 上报）' },
        { k: '证据', v: '25 函数 + 装配（后续 verify-pc M1 25 用例全 PASS）' },
      ],
    },
  ],
  samplesNote: '「done」有 diff 证据、「blocked」有归因记录——编码结果全部可查。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.4 · 编码执行',
    title: '门控 · 追溯 · AI 协同（swe-coding-do 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'swe-coding-plan 怎么表现', 'swe-coding-do 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '3 阶段门禁 + plan_gate status', '3 阶段门禁 + build 编译验证（工具链缺失如实记录）'],
        ['<Badge kind="green">追溯</Badge>', '计划逐条落盘', 'TASK 逐条 done/blocked 记档 + diff 证据 + 阻塞归因'],
        ['<Badge kind="blue">AI 协同</Badge>', '3 skill + 滑窗 ≤5 + 决议分级', '3 skill + 滑窗 ≤5 + 阻塞记档走 change'],
      ],
    },
    sections: [
      {
        title: '追溯链：plan → TASK → 源码 → result',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: '19 plan' },
          { kind: 'output', label: '216 TASK' },
          { kind: 'output', label: '源码 diff' },
          { kind: 'output', label: 'coding-result ×19' },
          { kind: 'output', label: 'final-report' },
        ],
        keyline: '每跳可追溯：TASK 逐条有 done/blocked 状态 + 原因；源码 diff 行数可查；result 落盘可复验。',
      },
      {
        title: 'AI 协同：滑窗施工 + 人工接棒',
        type: 'table',
        cols: ['角色', '干什么', '为什么'],
        rows: [
          ['<code>gate_coding_do_v2.py</code>', '3 个门禁点（rc=0/rc=2）', '顺序靠脚本保证'],
          ['<code>yxspec-coding-worker</code>', '按 plan 施工（编码/自检/rebake ≤1 轮）', '滑窗 ≤5 控资源'],
          ['<code>人工介入</code>', 'blocked 模块走 change 流程', '计划错误不在编码里硬来'],
          ['<code>build 脚本</code>', '编译验证', '环境缺失如实记录零阻塞跳过'],
        ],
        keyline: '「Worker 施工、脚本门禁、人工兜底」——SWE.4 执行的协同分工。',
      },
      {
        title: '26 个 blocked TASK 的归因分布（真实）',
        type: 'ul',
        items: [
          'MOD-002 ×19：协议归属错配（TL_A MQTT 归 tsp_mqtt 非 eb_link）→ CR-20260730-006 transferred',
          'MOD-006 ×1：TASK-010 [U-003] 超速提示音发声主体归属未决',
          'MOD-009 ×3：plan 归属误判（0/3 全 blocked）→ CR 后 not_applicable',
          'MOD-011 ×1：TASK-006 [U-001] 未决议；MOD-014 ×1、MOD-015 ×1、MOD-035 ×1 同理',
        ],
        keyline: '阻塞率 12% 如实报告——每个 blocked 都有归因与处置路径，这是「诚实施工」。',
      },
    ],
  },
};

export default doChapter;
