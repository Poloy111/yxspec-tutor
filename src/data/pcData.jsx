/**
 * yxspec-tutor · swe-coding-verify-pc 章节数据（通用章节契约结构）
 * 内容来源：project/tasks/task_swe_coding_verify_pc.md + coding-verify-pc-report.md
 * 真实产物：project/tasks/coding-verify-pc/coding-verify-pc-report.md（G0/G1/S1/M1 全通过）
 * 真实运行：2026-07-30 21:28 → 07-31 09:53（跨会话累计约 2.5h）
 */

const pcChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-coding-verify-pc-v2 · SWE.4 · PC 端编码验证',
    oneLiner:
      '在 PC 上把编码后的固件「跑起来验证」——G0 编译、G1 启动（19 模块）、S1 看门狗、M1 MQTT 协议合规（25 用例全 PASS），验证结果 passed。',
    analogy:
      '把 swe-coding-verify-pc 想象成「出厂前的台架测试」：没有真车（真机），就在台架上（PC twin）把发动机（固件）点着——先确认能点着（G0 编译），再看 19 个部件都启动了（G1 启动），接着连续跑 9 分钟看稳不稳（S1 看门狗），最后接上电台（MQTT broker）实测通信协议合不合规（M1 25 用例全 PASS）。测完出报告：passed。',
    memoryLine: '记住：<Hl>verify-pc = PC 台架四组验证</Hl>——G0 编译 / G1 启动 / S1 稳定 / M1 协议，全 PASS。',
    purpose: {
      oneLiner:
        'PC twin 平台四组验证：G0 编译（0 error）+ G1 启动（19 模块 init 全命中）+ S1 看门狗（stable）+ M1 MQTT 合规（25/25 PASS），result=passed，17 模块 mark-verified。',
      input: {
        title: '3 类输入',
        items: [
          '源码（19 模块）+ coding-result',
          'coding-plan-index.md（19 模块编码计划）',
          'MQTT 配置（IMEI 860000000007999 + broker tcp://59.61.82.171:1883）',
        ],
        note: '前置门控 4 项：8 节点产物齐全 + plan gate + 源码可编译 + MQTT 配置预检',
      },
      processTitle: '4 组验证（G0→G1→S1→M1）',
      process: [
        '① G0 编译：make win 全量编译（MSYS2 UCRT64 gcc 16.1.0）→ 0 error，产物 yx_eb_tbox.exe',
        '② G1 启动：PC twin 启动 + 19 模块初始化序列验证（fw main start → func mod init ×38）',
        '③ S1 看门狗：进程级存活 + crash-check（两轮 twin 各 >9min，fatal_hits=0）',
        '④ M1 MQTT 合规：pytest 25 用例（LOGIN/GPS/GB_ALARM/CMD 回包/时钟/参数读写），25 全 PASS',
      ],
      outputsTitle: '3 样（验证结论 + 证据）',
      outputs: [
        { name: 'coding-verify-pc-report.md', what: '验证报告：G0/G1/S1/M1 结果汇总（passed）', consumer: '门控放行 + 追溯' },
        { name: 'mqtt/mqtt-check-allpass.md', what: 'M1 全量报告（25 PASS）+ 控车专项（13 PASS）', consumer: '协议合规证据' },
        { name: '17 模块 verified', what: '17 模块 mark-verified（MOD-002/009 编码态 partial 列人工介入点）', consumer: '编码验证状态' },
      ],
      value: [
        '四组验证覆盖编译/启动/稳定/协议——PC 端能验的验到底',
        'M1 协议合规 25/25 全 PASS——与真实 broker 实测，非模拟',
        '7 控车 CMD 判 out_of_pc_scope 如实记录——验不了的不硬凑',
      ],
      boundary: [
        '不管「真机启动验证」——那是 coding-verify（真机）的事',
        '不管「静态分析」——那是 swe-static-verify 的事',
        'verify-pc 只回答「PC 上能编译/启动/稳定/协议合规吗」',
      ],
      example:
        'M1 的 TC-TSK-001 LOGIN：353B 二进制报文发到真实 broker，9 字段（dayTime/sw_ver/iccid/imsi…）全合规 → PASS；控车 CMD（设防/撤防）因 PC 无 RS485 真控制器 → 首轮 out_of_pc_scope，用 stub 模拟后闭环。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '验证队长', who: '/yxspec:swe-coding-verify-pc-v2 命令', does: '4 门控 + 3 阶段（Plan/RUN/Report）+ fix loop 判定' },
      { kind: 'cyan', role: 'PC twin', who: 'yx_eb_tbox.exe（PC 编译产物）', does: '在 PC 上模拟固件运行（fw main start → 模块 init ×38）' },
      { kind: 'amber', role: '验证脚本', who: 'pc_build_check + crash-check + run_mqtt_check.sh + pytest', does: 'G0 编译 / S1 看门狗 / M1 协议合规（25 用例）' },
    ],
    whyTitle: '为什么要这样分工？（为什么 PC 验证先行）',
    whyShell: [
      '为什么真机前先 PC 验证？—— PC 编译/启动/协议验证快且可重复，真机成本高留到下游',
      '为什么 G0 编译用 MSYS2 而非 ARM 工具链？—— PC twin 用宿主 gcc 编译验证逻辑正确性，ARM 交叉编译待真机链路',
      '为什么 M1 接真实 broker？—— 协议合规要真发真收，模拟 broker 验不出时序问题',
    ],
    whyMemory: '记住 <Hl>「PC twin 四组验证：编译→启动→稳定→协议」</Hl>——先台架后真机。',
    instance: {
      stats: [
        { num: '2.5h', label: '总耗时', desc: '跨两会话累计', kind: 'cyan' },
        { num: '19+1', label: 'G1 启动', desc: '19 模块 init 全命中 + fw main start', kind: 'cyan' },
        { num: '25/25', label: 'M1 MQTT', desc: '0 skip / 0 fail / 0 范围外', kind: 'green' },
        { num: '0', label: 'G0 错误', desc: 'make win 0 error', kind: 'green' },
        { num: 'passed', label: '最终结论', desc: '17 模块 verified', kind: 'green' },
      ],
      memoryLine: '记住这 3 个数字：<Hl>G0 零错误、G1 19 模块全启动、M1 25/25 全 PASS</Hl>。答辩时说「PC 台架四组验证全过，17 模块 verified」就是一句话结论。',
    },
    downstream: ['report → 门控放行', 'M1 证据 → 协议合规', '17 verified → 集成验证'],
    downstreamLine: '一句话：<Hl>PC 验证是「真机前的台架」</Hl>——验过的模块才进后续集成验证。',
    ironRules: [
      '<b>4 门控先行</b> —— 8 节点齐全 + plan gate + 可编译 + MQTT 预检',
      '<b>fix loop 判定严格</b> —— M1 失配先根因判定（out_of_pc_scope 不进 fix）',
      '<b>如实报告</b> —— 7 控车 CMD out_of_pc_scope 不硬凑',
      '<b>协议合规用真实 broker</b> —— 不模拟验收',
      '<b>MOD-002/009 人工介入点</b> —— 编码态 partial_done 如实标注',
    ],
    tutor: {
      question: '考官问「M1 MQTT 合规怎么验？控车命令为什么 out_of_pc_scope？」怎么答？',
      answer: (
        <span>
          M1 用 pytest 25 用例接<b>真实 broker</b>（tcp://59.61.82.171:1883）逐项验证：LOGIN 9 字段、GPS 13 字段、GB_ALARM 19 字段、
          CMD 0x0A0E 回包延迟 &lt;15s、时钟漂移 ≤5s 等——25 全 PASS。
          7 个<b>控车 CMD</b>（设防/撤防/上电/下电）依赖 RS485 真控制器，PC 无真硬件 → 首轮 out_of_pc_scope；
          后用 <b>stub 模拟 RS485 控制器应答</b>闭环验证（vcs link up → ctl_over → STATUS 回执）。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '4 门控 + 3 阶段（Plan → RUN 四组 → Report）+ fix loop',
  flowTitle: '执行流程：8 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>G0→G1→S1→M1 按序验证</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'PCVP-GATE', label: '前置门控（12m 25s）',
      action: '4 门控：8 节点产物齐全性 + gate_coding_verify_v2 --gate plan + 源码可编译性 + MQTT 配置预检；修复 coding-plan-index.md YAML 坏引号',
      post: '4 门控全通过', edge: '门控通过',
      why: '产物/计划/源码/配置不齐不开验',
    },
    {
      id: 1, name: 'PCVP-PLAN', label: '阶段1 Plan（48s）',
      action: '派生 G1 启动组关键词（19 模块源码 YX_LOGI [INF] 抽取，177 个去重）+ M1 前置 IMEI 占用判定（idle 放行）',
      post: 'g1_keywords.txt + IMEI 判定', edge: '验证计划',
      why: '先定「怎么算启动成功」，IMEI 被占先清',
    },
    {
      id: 2, name: 'PCVP-RUN-G0', label: 'G0 编译（26m 46s）',
      action: 'pc_build_check --platform win（MSYS2 UCRT64 gcc 16.1.0）：make win 全量编译 0 error（34 warning 第三方 letter-shell）',
      post: '_build/yx_eb_tbox.exe（PE32+ x86-64）', edge: '可编译 → G1',
      why: '编译不过后面全免谈',
      badges: [{ kind: 'green', text: '0 error' }],
    },
    {
      id: 3, name: 'PCVP-RUN-G1', label: 'G1 启动（39s）',
      action: 'PC twin 启动 + 模块初始化序列验证：fw main start → func mod init ×38 → 19 模块 init/start 日志全命中',
      post: '19 模块 init 全命中', edge: '启动 OK → S1',
      why: '模块都能启动，业务才可能工作',
      badges: [{ kind: 'green', text: '19/19' }],
    },
    {
      id: 4, name: 'PCVP-RUN-S1', label: 'S1 看门狗（11m 39s）',
      action: '进程级存活 + crash-check：两轮 twin 各 >9min 在线，verdict=stable，fatal_hits=0；主循环/定时器/心跳/RS485 轮询正常',
      post: 'verdict=stable', edge: '稳定 → M1',
      why: '能启动还要能稳定跑，防闪退',
      badges: [{ kind: 'green', text: 'stable' }],
    },
    {
      id: 5, name: 'PCVP-RUN-M1', label: 'M1 MQTT 合规（18m 49s）',
      action: 'run_mqtt_check.sh：pytest 25 用例接真实 broker（LOGIN/GPS/GB_ALARM/CMD 回包/时钟/参数读写 字段级）',
      post: '25 PASS / 0 范围外', edge: '协议合规 → Report',
      why: '协议不合规，业务上了线也不通',
      badges: [{ kind: 'green', text: '25/25' }],
    },
    {
      id: 6, name: 'PCVP-FIXLOOP', label: 'fix loop（0 轮）',
      action: '编译/运行失败修复循环：G0/G1/S1 首轮全通过未触发；M1 失配根因判定 out_of_pc_scope（非 PC 兼容缺陷）不进 fix',
      post: 'fix loop 0 轮触发（首轮全通过）', edge: '无需修复',
      why: '先判根因再决定是否修，避免瞎改',
    },
    {
      id: 7, name: 'PCVP-REPORT', label: '阶段3 Report（8m 5s）',
      action: 'mark-verified（17 模块）+ coding-verify-pc-report.md 渲染 + 追溯链核查（8 节点完整）',
      post: 'report（passed）+ 17 verified', edge: '验证闭环',
      why: '验证结论落盘，可追溯',
      badges: [{ kind: 'green', text: 'passed' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '门控', icon: '🔒', color: 'amber', sub: '4 项' },
    { id: 1, name: 'Plan', icon: '📋', color: 'blue', sub: '关键词+IMEI' },
    { id: 2, name: 'G0 编译', icon: '⚙️', color: 'cyan', sub: '0 error' },
    { id: 3, name: 'G1 启动', icon: '🚀', color: 'cyan', sub: '19/19' },
    { id: 4, name: 'S1 稳定', icon: '🛡️', color: 'cyan', sub: '>9min' },
    { id: 5, name: 'M1 协议', icon: '📡', color: 'cyan', sub: '25/25' },
    { id: 6, name: 'fix loop', icon: '🔧', color: 'amber', sub: '0 轮' },
    { id: 7, name: 'Report', icon: '✅', color: 'green', sub: 'passed' },
  ],
  flowTutor: {
    question: '考官问「G0/G1/S1/M1 四组验证分别验什么？为什么要这个顺序？」怎么答？',
    answer: (
      <span>
        <b>G0 编译</b>（能不能编）：make win 0 error，产物 exe；
        <b>G1 启动</b>（能不能跑）：19 模块 init 全命中；
        <b>S1 稳定</b>（稳不稳）：两轮 &gt;9min 在线，fatal 0；
        <b>M1 协议</b>（通不通）：25 用例接真实 broker 全 PASS。
        顺序是<b>依赖递进</b>——编译不过谈不了启动，启动不了谈不了稳定，不稳定谈不了协议。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: '源码（19 模块）', role: '编码产物（来自 swe-coding-do）' },
      { name: 'coding-plan-index.md', role: '编码计划（19 模块状态）' },
      { name: 'MQTT 配置', role: 'IMEI 860000000007999 + broker tcp://59.61.82.171:1883 + base-url' },
    ],
    inputKeyline: '最关键输入是 <Hl>源码 + MQTT 配置</Hl>——源码可编译、配置预检通过才开验。',
    outputs: [
      { name: 'coding-verify-pc-report.md', role: '验证报告（G0/G1/S1/M1 汇总，result=passed）' },
      { name: 'mqtt/mqtt-check-allpass.md + ctrl.md', role: 'M1 全量（25 PASS）+ 控车专项（13 PASS）' },
      { name: 'g1_keywords.txt', role: '177 个 G1 启动关键词（去重）' },
      { name: '17 模块 verified', role: 'mark-verified（MOD-002/009 人工介入点）' },
    ],
    outputKeyline: '核心输出链：<Hl>G0 通过 → G1 通过 → S1 通过 → M1 通过 → Report（passed）</Hl>。',
    callGraphs: [
      {
        title: '命令级 · swe-coding-verify-pc 与上下游的关系',
        color: 'cyan',
        from: { id: 'vpc', cmd: '/yxspec:swe-coding-verify-pc-v2', sub: 'SWE.4 · PC 端编码验证', desc: 'PC 台架四组验证' },
        tos: [
          { id: 'up-do', cmd: 'swe-coding-do-v2', edge: '源码 + coding-result', edgeDesc: '验证对象', desc: '上游：19 模块编码产物是验证对象。' },
          { id: 'down-it', cmd: 'swe-integration-verify', edge: '17 verified', edgeDesc: '集成验证输入', desc: '下游：集成验证承接已 verified 模块。', dashed: true },
          { id: 'side-static', cmd: 'swe-static-verify', edge: '补验编译', edgeDesc: 'ARM 工具链', desc: '协作：真机编译由静态/真机链路补验。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个阶段干活',
        color: 'blue',
        from: { id: 'orch', cmd: '验证编排器', sub: '3 阶段推进', desc: 'Plan → RUN 四组 → Report' },
        tos: [
          { id: 'twin', cmd: 'PC twin（yx_eb_tbox.exe）', edge: 'G1/S1 · 运行验证', edgeDesc: 'fw main start → init ×38', desc: 'PC 上模拟固件运行，验证启动序列与稳定性。' },
          { id: 'scripts', cmd: '验证脚本组', edge: 'G0/S1/M1', edgeDesc: 'pc_build_check / crash-check / pytest', desc: '编译检查、看门狗、协议合规 25 用例。' },
          { id: 'broker', cmd: '真实 MQTT broker', edge: 'M1 · 协议实测', edgeDesc: 'tcp://59.61.82.171:1883', desc: '接真实 broker 验协议合规，非模拟。', dashed: true },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（twin + 脚本 + broker）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-coding-verify-pc-v2' },
      { seg: 'input', label: '源码 + MQTT 配置' },
      { seg: 'script', label: '4 门控' },
      { seg: 'worker', label: 'G0 编译' },
      { seg: 'worker', label: 'G1 启动' },
      { seg: 'worker', label: 'S1 看门狗' },
      { seg: 'worker', label: 'M1 协议 25 用例' },
      { seg: 'output', label: 'coding-verify-pc-report.md (passed)' },
    ],
    pipeKeyline: '蓝色=脚本门控 · 琥珀=验证组 · 绿色=产物——「先门控后验证，G0→M1 依赖递进」。',
    qualityGates: [
      { code: 'G0', name: '编译', phase: 'RUN', check: 'make win 0 error + 产物生成', outcome: 'pass' },
      { code: 'G1', name: '启动', phase: 'RUN', check: '19 模块 init/start 日志全命中', outcome: '19/19' },
      { code: 'S1', name: '看门狗', phase: 'RUN', check: '>9min 在线 + crash-check stable + fatal 0', outcome: 'stable' },
      { code: 'M1', name: 'MQTT 合规', phase: 'RUN', check: '25 用例字段级全 PASS', outcome: '25/25' },
    ],
    gateNote: '对比 swe-coding-do：执行阶段编译是 toolchain_error 跳过；verify-pc 用 PC 工具链补上了编译/启动/协议验证——验证链在此闭合。',
    failures: [
      { fault: '4 门控不通过', action: '补齐产物/修复 YAML/配置预检（真实：修复 coding-plan-index.md 坏引号）' },
      { fault: 'M1 失配', action: '先根因判定：out_of_pc_scope 不进 fix（7 控车 CMD 真实案例）' },
      { fault: 'RS485 无真控制器', action: 'stub 模拟 RS485 控制器应答（vcs link up 闭环）' },
      { fault: '编译失败', action: 'fix loop 修复循环（本案例 0 轮触发）' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-coding-verify-pc 的调用关系怎么讲？',
    answer: (
      <span>
        「verify-pc 消费 19 模块源码 + MQTT 配置，<b>4 门控 + 3 阶段</b>：Plan（关键词 + IMEI 判定）→
        RUN 四组（G0 编译 0 error → G1 启动 19/19 → S1 看门狗 stable → M1 协议 25/25 接真实 broker）→
        Report（passed，17 模块 verified），产出验证报告给集成验证，M1 证据留协议合规。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'coding-verify-pc-report.md', kind: 'green', what: '验证报告：G0/G1/S1/M1 结果汇总（result=passed）', who: '门控放行 + 追溯' },
    { name: 'mqtt/mqtt-check-allpass.md', kind: 'cyan', what: 'M1 全量 25 PASS（LOGIN 9 字段/GPS 13/GB_ALARM 19 等）', who: '协议合规证据' },
    { name: 'mqtt/mqtt-check-ctrl.md', kind: 'cyan', what: '控车专项 13 PASS（5 查询 + 7 控车 + MUTE_ARM）', who: '控车合规证据' },
    { name: 'mqtt/result_allpass.json', kind: 'amber', what: 'pytest 原始输出（23 passed + 2 skipped→功能覆盖判 PASS）', who: '原始证据' },
    { name: 'g1_keywords.txt', kind: 'amber', what: '177 个 G1 启动关键词（19 模块 YX_LOGI 抽取去重）', who: 'G1 判定依据' },
    { name: 'run.log / run_final.log', kind: 'amber', what: 'twin 运行日志（S1 看门狗证据）', who: '稳定性证据' },
  ],
  artifactsChain: '一句话串起来：<Hl>源码 + 配置 → G0 → G1 → S1 → M1 → report（passed）+ 17 verified</Hl>。',
  samplesTitle: 'M1 用例真实样例（点开看字段）',
  samples: [
    {
      id: 'TC-TSK-001', badges: [{ kind: 'cyan', text: 'PASS 9/9' }], meta: '25 用例之一',
      title: 'LOGIN 报文合规：353B 二进制（V1.0.63 §3.9）',
      fields: [
        { k: 'Topic', v: 'TL_A/LOGIN/YX_C25/860000000007999' },
        { k: '校验', v: 'dayTime/sw_ver/iccid/imsi 等 9 字段全合规' },
        { k: 'ble_mac', v: '02:00:59:58:4D:01（非全0，UAA 位合规）' },
      ],
    },
    {
      id: 'TC-TSK-004B', badges: [{ kind: 'blue', text: 'PASS 19/19' }], meta: '25 用例之一',
      title: 'GB_ALARM 国标动态检测包合规：31B（§4.1）',
      fields: [
        { k: 'Topic', v: 'TL_A/GB_ALARM/...' },
        { k: '校验', v: '报警状态/定位/电量/信号 19 字段全合规' },
        { k: '来源', v: 'GB_17761-2024 北斗定位异常自检联动' },
      ],
    },
    {
      id: 'TC-TSK-005-ARM', badges: [{ kind: 'green', text: 'PASS' }], meta: '控车专项',
      title: 'CMD 0x0A02 设防 → STATUS 回包（stub 闭环）',
      fields: [
        { k: '链路', v: 'stub 模拟 RS485 控制器应答 → vcs link up → ctl_over(TRUE) → STATUS 回执' },
        { k: '对照', v: 'DISARM 0x0A03 / POWER_ON 0x0A04 / POWER_OFF 0x0A05 / MUTE_ARM 0x0A08 同法验证' },
        { k: '意义', v: 'PC 无真控制器，stub 闭环补上控车验证' },
      ],
    },
  ],
  samplesNote: '每项 PASS 都有字段级校验证据——「PASS」不是结论，是逐字段验出来的。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.4 · PC 验证',
    title: '门控 · 追溯 · AI 协同（swe-coding-verify-pc 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'swe-coding-do 怎么表现', 'swe-coding-verify-pc 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '3 阶段门禁 + build 编译', '4 门控 + G0/G1/S1/M1 四组验证门'],
        ['<Badge kind="green">追溯</Badge>', 'TASK 逐条记档', '19 模块 verified 状态 + M1 用例逐项证据（pytest 原始输出）'],
        ['<Badge kind="blue">AI 协同</Badge>', 'Worker 施工 + 人工兜底', 'PC twin 运行 + 脚本验证 + stub 闭环 + 人工根因判定'],
      ],
    },
    sections: [
      {
        title: '追溯链：源码 → 四组验证 → verified',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: '19 模块源码' },
          { kind: 'output', label: 'G0 编译' },
          { kind: 'output', label: 'G1 启动' },
          { kind: 'output', label: 'S1 稳定' },
          { kind: 'output', label: 'M1 协议 25/25' },
          { kind: 'output', label: '17 verified' },
        ],
        keyline: '每跳可验证：G1 关键词 177 条命中日志；M1 逐用例 pytest 原始输出可复跑。',
      },
      {
        title: 'AI 协同：twin + 脚本 + stub 闭环',
        type: 'table',
        cols: ['角色', '干什么', '为什么'],
        rows: [
          ['<code>PC twin</code>', '模拟固件运行（fw main start → init ×38）', 'PC 上可重复验证'],
          ['<code>验证脚本组</code>', 'G0/S1/M1（pc_build_check/crash-check/pytest）', '确定性验证不靠人眼'],
          ['<code>stub 模拟</code>', 'RS485 控制器应答闭环', 'PC 无真硬件也能验控车'],
          ['<code>人工根因判定</code>', 'M1 失配先判 out_of_pc_scope 与否', '不瞎修，先判范围'],
        ],
        keyline: '「twin 跑、脚本验、stub 补、人判因」——SWE.4 PC 验证的协同分工。',
      },
      {
        title: '真实结果与边界（诚实报告）',
        type: 'ul',
        items: [
          'M1 首轮 80 项 73pass / 7 oops / 3 skip → 根因判定 out_of_pc_scope → 收官复验 41 项全 pass',
          '7 控车 CMD 首轮 out_of_pc_scope → stub 闭环后 13 PASS（控车专项）',
          'BLE MAC 排除（PC 无 BLE 硬件）；TC-TSK-008 驻车周期经功能覆盖判定计入 PASS',
          'MOD-002/009 编码态 partial_done 如实列人工介入点（不虚标 verified）',
        ],
        keyline: '「验不了的如实标范围外」——诚实报告比凑数通过更有说服力。',
      },
    ],
  },
};

export default pcChapter;
