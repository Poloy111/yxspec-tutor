/**
 * yxspec-tutor · swe-coding-verify 章节数据（通用章节契约结构）
 * 内容来源：project/tasks/coding-verify/coding-verify-report.md（设备级验证）
 * 真实运行：2026-08-03 12:06 → 15:36（真机 ML307C ARM）
 */

const verifyChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-coding-verify-v2 · SWE.4 · 设备级编码验证（真机）',
    oneLiner:
      '把代码烧到真机（ML307C ARM）验证——发现并修复 4 个运行期缺陷（含打包链路根因），C4 握手 14/14 pass，G2 运行期业务全活，S1 稳定性通过，result=passed。',
    analogy:
      '把 swe-coding-verify 想象成「整车路试」：PC 台架测过了，真车上路——先确认能打着火（G0 交叉编译 + 烧录），再上路跑（G2 运行期：GPS/报警/通信全活），逐车协议握手（C4 14/14），连续跑 12 分钟不熄火（S1）。路试暴露 4 个问题全修掉：BMS 报文没人解析、报警狂刷 4Hz、通信链路 60 秒误报断线、GPS 绿灯永远不亮——修完重烧再路试，passed。',
    memoryLine: '记住：<Hl>coding-verify = 真机路试</Hl>——4 缺陷闭环 + C4 14/14 + S1 稳定。',
    purpose: {
      oneLiner:
        '真机（ML307C ARM）验证：G0 交叉编译 0 error + G1 启动 + G2 运行期（业务全活）+ C4 握手 14/14 + S1 稳定性；修复 4 个运行期缺陷（含打包链路根因）后 result=passed。',
      input: {
        title: '4 类输入',
        items: [
          '源码 + coding-result（19 模块）',
          'ARM 交叉工具链（D:\\cat1_cross GCC 10.2.1）+ arelease 打包',
          '真机设备（IMEI 868471086636911）',
          '打包脚本 build.py（发现并修复打包链路缺陷）',
        ],
        note: 'G0 是整包编译验证：1 次编译覆盖 19 模块产物',
      },
      processTitle: '6 组验证 + 缺陷修复闭环',
      process: [
        '① G0 编译：ARM 交叉编译 0 error + 固件包生成',
        '② G1 启动：真机启动（fw main start 锚点 + 模块 init/start 日志）',
        '③ G2 运行期：gnss/alarm/comm_sif/m2m 业务持续运行 + broker 持续上报',
        '④ C4 握手：14 个协议模块握手规约验证 14/14',
        '⑤ S1 看门狗：≥12.5 分钟无复位/assert/崩溃',
        '⑥ 缺陷修复闭环：4 个运行期缺陷修复 → 重编 → 重烧 → 真机日志验证',
      ],
      outputsTitle: '3 样',
      outputs: [
        { name: 'coding-verify-report.md', what: '设备级验证报告（G0/G1/G2/C4/S1 结果 + 缺陷闭环）', consumer: '门控放行 + 追溯' },
        { name: 'sequence/MOD-*_handshake.json ×14', what: '14 个协议模块握手规约验证记录', consumer: 'C4 证据' },
        { name: '4 缺陷修复源码', what: 'bms.c / alarm_gb.c / yx_proto_sif.c / gnss 等修复', consumer: '编码闭环' },
      ],
      value: [
        '真机验证发现 PC 无法发现的缺陷——打包链路缺陷（应用 bin 未入烧录包）根因定位',
        '4 个运行期缺陷全部闭环（重编重烧真机日志验证）',
        'C4 握手 14/14 + S1 12.5 分钟稳定——设备级质量证据',
      ],
      boundary: [
        '不管「协议级交互」——M1 未执行，留待 sqt-auto-test 阶段',
        '不管「静态分析」——那是 swe-static-verify 的事',
        'coding-verify 只回答「真机上能不能跑、业务活不活」',
      ],
      example:
        '缺陷1：BMS 帧无解析入口——bms dispatch 日志缺失 → 根因 bms_sif_frame_input 接口不存在 → 修复后 167 次解析持续输出。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 工具链）',
    roles: [
      { kind: 'blue', role: '验证队长', who: '/yxspec:swe-coding-verify-v2 命令', does: '6 组验证推进 + 缺陷修复闭环判定' },
      { kind: 'amber', role: 'ARM 工具链', who: 'D:\\cat1_cross GCC 10.2.1 + arelease', does: '交叉编译 + 固件包生成（ASR1605_SINGLE_SIM_04MB）' },
      { kind: 'cyan', role: '真机', who: 'ML307C 设备（IMEI 868471086636911）', does: '固件运行 + 业务上报（GPS/GB_ALARM）' },
      { kind: 'green', role: 'BSP 工程师', who: '打包链路修复', does: 'build.py _inject_user_app 修复（user_app 未入包根因）' },
    ],
    whyTitle: '为什么要真机验证？',
    whyShell: [
      '为什么 PC 验证后还要真机？—— 打包/烧录/驱动/时序问题 PC 台架发现不了（根因：应用 bin 未入烧录包）',
      '为什么 C4 握手 14 个模块？—— 协议模块逐个握手验证规约实现',
      '为什么 G0 是整包验证？—— 1 次编译覆盖 19 模块产物，非模块级 VP',
    ],
    whyMemory: '记住 <Hl>「PC 台架过 ≠ 真机过」</Hl>——真机暴露 PC 无法发现的打包与运行期缺陷。',
    instance: {
      stats: [
        { num: '3h 30m', label: '总耗时', desc: '12:06 → 15:36', kind: 'cyan' },
        { num: '14/14', label: 'C4 握手', desc: '14 个协议模块', kind: 'green' },
        { num: '4', label: '缺陷闭环', desc: 'BMS/洪泛/保活/GPS 灯', kind: 'amber' },
        { num: '12.5m+', label: 'S1 稳定', desc: '无复位/assert/崩溃', kind: 'green' },
        { num: 'passed', label: '最终结论', desc: 'M1 留待 sqt-auto-test', kind: 'green' },
      ],
      memoryLine: '记住这 3 个数字：<Hl>C4 14/14、4 缺陷闭环、S1 12.5 分钟</Hl>。答辩时说「真机验证闭环 4 缺陷、打包根因定位修复」就是一句话结论。',
    },
    downstream: ['report → 门控放行', '缺陷修复 → 编码闭环', 'C4 证据 → 追溯'],
    downstreamLine: '一句话：<Hl>真机验证是「上市前的路试」</Hl>——PC 台架验不到的，真机验。',
    ironRules: [
      '<b>缺陷必须闭环</b> —— 修复 → 重编 → 重烧 → 真机日志验证',
      '<b>根因定位不猜</b> —— 打包缺陷用固件包二进制级核查定位（9 镜像全不含应用）',
      '<b>验不了如实标</b> —— M1 未执行留待 sqt-auto-test',
      '<b>G0 整包验证</b> —— 1 次编译覆盖 19 模块',
    ],
    tutor: {
      question: '考官问「真机验证发现的最深刻缺陷是什么？根因怎么定位的？」怎么答？',
      answer: (
        <span>
          最深刻的是<b>打包链路缺陷</b>：设备刷了固件但应用不启动（fw main start 无日志）。
          根因定位靠<b>固件包二进制级核查</b>：9 个镜像全部不含应用代码（ML307C_APP.bin 含 fw main start/tsp_mqtt 未打包），
          download.json 只有 erase 无 flash 动作——设备从未烧入应用入口。
          修复：build.py 新增 <b>_inject_user_app()</b> 自动注入 user_app.bin + 补 download.json flash 条目。这证明<b>真机验证能发现 PC 发现不了的问题</b>。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '6 组验证 + 缺陷修复闭环',
  flowTitle: '执行流程：7 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'G0 编译', label: 'G0 交叉编译（整包）',
      action: 'ARM 交叉编译（D:\\cat1_cross GCC 10.2.1 + arelease）0 error，固件包生成',
      post: '固件包（9 镜像）', edge: '固件包 → 烧录',
      why: 'G0 是整包验证，1 次编译覆盖 19 模块',
      badges: [{ kind: 'green', text: '0 error' }],
    },
    {
      id: 1, name: '打包缺陷', label: '打包链路缺陷发现 + 修复',
      action: '设备死寂零日志 → 固件包二进制核查：9 镜像全不含应用代码，download.json 无 flash 动作 → build.py 修复 _inject_user_app()',
      post: 'user_app.bin 入包 + flash 条目', edge: '修复后重烧',
      why: '设备从未烧入应用入口（fw main start），这是 PC 验证发现不了的',
      badges: [{ kind: 'amber', text: '根因定位' }],
    },
    {
      id: 2, name: 'G1 启动', label: 'G1 真机启动',
      action: '打包修复后真机启动成功：fw main start 单次锚点 + 模块 init/start 日志齐备',
      post: '启动成功', edge: '启动 → 运行期',
      why: '应用入口烧入后，验证启动序列',
    },
    {
      id: 3, name: 'G2 运行期', label: 'G2 运行期业务',
      action: 'gnss（fix_state:3×320）/ alarm / comm_sif / m2m / odometer 持续运行，broker 持续上报 GPS/GB_ALARM',
      post: '业务全活', edge: '运行期 → 握手',
      why: '业务模块全活，数据持续上报',
    },
    {
      id: 4, name: 'C4 握手', label: 'C4 协议握手（14/14）',
      action: '14 个协议模块握手规约验证：9 个 wrong_pattern 修复（第 1 轮）+ MOD-003 S2 锚点闭环（第 2 轮）',
      post: '14/14 pass', edge: '握手 → 稳定',
      why: '协议模块逐个验证规约实现',
      badges: [{ kind: 'green', text: '14/14' }],
    },
    {
      id: 5, name: 'S1 看门狗', label: 'S1 稳定性',
      action: '新固件 15:22:12 启动后持续运行 ≥12.5 分钟无复位/assert/崩溃（15:34:47 最新日志仍在输出）',
      post: 'stable', edge: '稳定 → 结论',
      why: '能跑还要能稳',
      badges: [{ kind: 'green', text: '≥12.5m' }],
    },
    {
      id: 6, name: '缺陷闭环', label: '4 缺陷修复闭环',
      action: 'BMS 解析入口 / alarm 洪泛 4Hz→30s / SIF 保活 60s 误报 / GPS 绿灯熄灭——全部修复重编重烧真机日志验证',
      post: '4 缺陷闭环 + passed', edge: '验证结论',
      why: '缺陷必须真机验证闭环才算修好',
      badges: [{ kind: 'green', text: 'passed' }],
    },
  ],
  flowNodes: [
    { id: 0, name: 'G0 编译', icon: '⚙️', color: 'cyan', sub: '整包 0 error' },
    { id: 1, name: '打包修复', icon: '🔧', color: 'amber', sub: '根因定位' },
    { id: 2, name: 'G1 启动', icon: '🚀', color: 'cyan', sub: 'fw main start' },
    { id: 3, name: 'G2 运行期', icon: '📡', color: 'cyan', sub: '业务全活' },
    { id: 4, name: 'C4 握手', icon: '🤝', color: 'cyan', sub: '14/14' },
    { id: 5, name: 'S1 稳定', icon: '🛡️', color: 'cyan', sub: '12.5m+' },
    { id: 6, name: '缺陷闭环', icon: '✅', color: 'green', sub: 'passed' },
  ],
  flowTutor: {
    question: '考官问「C4 握手 14 个模块怎么验？为什么两轮？」怎么答？',
    answer: (
      <span>
        <b>C4 握手</b>对 14 个协议模块逐个验证握手规约（pattern 取自源码日志字面量）：
        <b>第 1 轮</b> 9 个规约 wrong_pattern 修复（pattern 与源码实际日志不符）；
        <b>第 2 轮</b> MOD-003 S2 锚点闭环（env_blocked → 任务无关锚点）。
        两轮后 <b>14/14 pass</b>——握手规约与源码日志逐字对齐。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: '源码 + coding-result', role: '被测对象（19 模块）' },
      { name: 'ARM 工具链', role: 'D:\\cat1_cross + arelease（交叉编译 + 打包）' },
      { name: '真机', role: 'ML307C（IMEI 868471086636911）' },
      { name: 'build.py', role: '打包脚本（发现并修复打包缺陷）' },
    ],
    inputKeyline: '最关键输入是 <Hl>工具链 + 真机</Hl>——交叉编译与烧录是前提。',
    outputs: [
      { name: 'coding-verify-report.md', role: '验证报告（passed + 缺陷闭环）' },
      { name: 'sequence/*_handshake.json ×14', role: 'C4 握手记录' },
      { name: '4 缺陷修复源码', role: 'bms/alarm_gb/yx_proto_sif/gnss 修复' },
    ],
    callGraphs: [
      {
        title: '命令级 · swe-coding-verify 与上下游的关系',
        color: 'cyan',
        from: { id: 'cv', cmd: '/yxspec:swe-coding-verify-v2', sub: 'SWE.4 · 真机验证', desc: '真机路试' },
        tos: [
          { id: 'up-pc', cmd: 'swe-coding-verify-pc', edge: 'PC 验证通过', edgeDesc: '先台架后真机', desc: '上游：PC 台架验证通过才上真机。' },
          { id: 'down-sqt', cmd: 'sqt-auto-test', edge: 'M1 协议留待', edgeDesc: '协议级交互', desc: '下游：M1 协议级交互留待 sqt-auto-test。', dashed: true },
          { id: 'side-static', cmd: 'swe-static-verify', edge: '静态补验', edgeDesc: 'SUP.1', desc: '协作：静态分析补验编译与质量。', dashed: true },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-coding-verify-v2' },
      { seg: 'input', label: '源码 + 工具链' },
      { seg: 'script', label: 'G0 交叉编译' },
      { seg: 'worker', label: 'G1/G2 真机' },
      { seg: 'worker', label: 'C4 握手 14' },
      { seg: 'worker', label: 'S1 稳定' },
      { seg: 'output', label: 'passed + 4 缺陷闭环' },
    ],
    qualityGates: [
      { code: 'G0', name: '编译', phase: '前置', check: 'ARM 交叉编译整包 0 error', outcome: 'pass' },
      { code: 'G1', name: '启动', phase: '执行', check: 'fw main start + 模块 init/start 日志', outcome: 'pass' },
      { code: 'G2', name: '运行期', phase: '执行', check: '业务模块持续运行 + broker 上报', outcome: 'pass' },
      { code: 'C4', name: '握手', phase: '执行', check: '14 协议模块握手规约', outcome: '14/14' },
      { code: 'S1', name: '稳定', phase: '执行', check: '≥12.5 分钟无复位/assert/崩溃', outcome: 'pass' },
    ],
    failures: [
      { fault: '设备死寂零日志', action: '固件包二进制核查 → 打包缺陷根因定位（9 镜像不含应用）' },
      { fault: 'wrong_pattern', action: 'C4 第 1 轮 9 个规约修复' },
      { fault: 'env_blocked 锚点', action: 'C4 第 2 轮 MOD-003 任务无关锚点闭环' },
      { fault: 'M1 协议', action: '未执行，留待 sqt-auto-test' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-coding-verify 怎么讲？',
    answer: (
      <span>
        「coding-verify 把代码烧到真机（ML307C）验证：G0 交叉编译整包 0 error → G1 启动 → G2 运行期业务全活 → C4 握手 14/14 → S1 12.5 分钟稳定；
        发现并闭环 <b>4 个运行期缺陷</b>（含打包链路根因：应用 bin 未入烧录包，build.py 修复），result=passed；M1 协议留待 sqt-auto-test。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'coding-verify-report.md', kind: 'green', what: '设备级验证报告（G0/G1/G2/C4/S1 + 4 缺陷闭环）', who: '门控放行 + 追溯' },
    { name: 'sequence/MOD-*_handshake.json ×14', kind: 'cyan', what: '14 协议模块握手记录（含 wrong_pattern 修复轨迹）', who: 'C4 证据' },
    { name: 'bms.c 修复', kind: 'amber', what: '新增 bms_sif_frame_input()（9 类帧分发）', who: '缺陷 1 闭环' },
    { name: 'alarm_gb.c 修复', kind: 'amber', what: 'GB_BMS_VAL_INVALID 门控 + 30s 周期节流', who: '缺陷 2 闭环' },
    { name: 'yx_proto_sif.c 修复', kind: 'amber', what: 'BMS 帧分流补保活（防 60s 误报断线）', who: '缺陷 3 闭环' },
    { name: 'gnss_dsc_sync 修复', kind: 'amber', what: 'GPS 信号灯调用补全（绿灯复活）', who: '缺陷 4 闭环' },
  ],
  artifactsChain: '一句话串起来：<Hl>编译 → 烧录 → 启动 → 业务 → 握手 → 稳定 → 4 缺陷闭环 → passed</Hl>。',
  samplesTitle: '缺陷闭环真实样例（点开看字段）',
  samples: [
    {
      id: '缺陷 1', badges: [{ kind: 'cyan', text: 'MOD-005' }], meta: 'BMS 解析',
      title: 'BMS 帧无解析入口 → 新增 bms_sif_frame_input()',
      fields: [
        { k: '现象', v: 'bms dispatch 日志缺失，BMS 报文不解析' },
        { k: '根因', v: 'bms_sif_frame_input 接口不存在，SIF 帧分发无处汇聚' },
        { k: '验证', v: '新固件 bms sif frame input ×167、0x01 parsed ×98 持续解析' },
      ],
    },
    {
      id: '缺陷 2', badges: [{ kind: 'amber', text: 'MOD-007' }], meta: '报警洪泛',
      title: 'GB_ALARM 4Hz 洪泛 + BMS 无效值误报 → 30s 周期 + 门控',
      fields: [
        { k: '现象', v: 'GB_ALARM 上报 4Hz（应为 30s）+ alarmflag=0xFFFF 误报' },
        { k: '修复', v: 'gb_alarm_proc 节流 + GB_BMS_VAL_INVALID 门控 0xFFFF' },
        { k: '验证', v: '30s 周期稳定（15:23:12/42/15:24:12 间隔精确）' },
      ],
    },
    {
      id: '缺陷 4', badges: [{ kind: 'green', text: 'MOD-016/017' }], meta: 'GPS 灯',
      title: 'GPS 绿灯永久熄灭 → gnss_dsc_sync() 从未被调用',
      fields: [
        { k: '现象', v: '绿灯永远熄灭（work_state 恒为 ABNORMAL）' },
        { k: '根因', v: 'gnss_dsc_sync() 从未被调用 → DSC gnss_data 死值' },
        { k: '验证', v: '修复后绿灯状态随定位恢复' },
      ],
    },
  ],
  samplesNote: '每个缺陷都有「现象 → 根因 → 修复 → 真机日志验证」四段闭环。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.4 · 真机验证',
    title: '门控 · 追溯 · AI 协同（swe-coding-verify 版）',
    sub: '设备级质量门——真机路试。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', 'G0/G1/G2/C4/S1 五组门 + 缺陷闭环门'],
        ['<Badge kind="green">追溯</Badge>', '缺陷四段闭环（现象/根因/修复/真机验证）+ handshake 逐字对齐'],
        ['<Badge kind="blue">AI 协同</Badge>', '验证编排（AI）+ 工具链确定性 + BSP 人工修复打包'],
      ],
    },
    sections: [
      {
        title: '缺陷闭环四段法（真实案例）',
        type: 'ul',
        items: [
          '现象：真机日志异常（bms dispatch 缺失 / 4Hz 洪泛 / 60s 误报 / 绿灯熄灭）',
          '根因：代码级定位（接口不存在 / 未节流 / 保活路径绕过 / 从未调用）',
          '修复：源码修改（bms.c / alarm_gb.c / yx_proto_sif.c / gnss）',
          '验证：重编 → 重烧 → 真机日志复核（167 次解析 / 30s 周期 / 无误报）',
        ],
        keyline: '「现象→根因→修复→验证」四段闭环——修好不算，真机日志验证才算。',
      },
      {
        title: '打包链路缺陷（最深刻的根因）',
        type: 'ul',
        items: [
          '现象：固件包烧录成功但设备死寂零日志',
          '根因：固件包 9 镜像全部不含应用代码（ML307C_APP.bin 未打包）',
          '证据：download.json 仅有 erase user_app 无对应 flash 动作',
          '修复：build.py 新增 _inject_user_app() 自动注入 + 补 flash 条目（幂等/兼容回退）',
        ],
        keyline: '根因在打包链路不在源码——真机验证才能暴露这类缺陷。',
      },
    ],
  },
};

export default verifyChapter;
