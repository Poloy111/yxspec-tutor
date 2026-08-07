/**
 * yxspec-tutor · change 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/change.md + project/changes/CR-*.md（真实 6 条）
 * 真实运行：2026-07-30 CR-001~006（MOD-006 车速提示音决议 → MOD-002/009 协议归属错配修正）
 */

const changeChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:change · SUP.10 · 变更管理',
    oneLiner:
      '接收变更请求 → 影响分析 → stale 标记 → 下游任务状态更新 → 生成变更记录（CR）。本工程真实闭环 6 条 CR：从 MOD-006 车速提示音归属决议到 MOD-002/009 协议归属错配修正。',
    analogy:
      '把 change 想象成「工程变更单」：客户说"这堵墙要加一扇窗"——先登记变更单（CR-XXX），再算影响（承重墙？管线经过？），把被影响的图纸标记为过期（stale），最后给出重做建议。不是当场砸墙，而是把"哪些图纸作废、哪些要重做"理清楚，等确认后再动工。',
    memoryLine: '记住：<Hl>change = 变更登记 + 影响分析 + stale 标记</Hl>——6 条 CR 真实闭环。',
    purpose: {
      oneLiner:
        '接收变更请求 → Step3 影响分析（顺追溯链向下传播，直接+间接产物）→ Step4 受影响产物标记 stale → Step5 生成 CR 记录 → Step6 质量校验；与 feedback 严格分工：范围变化走 change，产物错误走 feedback。',
      input: {
        title: '1 项 Gate',
        items: [
          '用户明确提出变更请求（描述变更内容和原因）',
          '变更来源：客户需求变更 / 内部优化 / 缺陷修复',
        ],
        note: '任意阶段均可执行，无固定前序',
      },
      processTitle: '6 步',
      process: [
        '① 规划：生成 task_change.md 任务文件',
        '② 接收变更：变更来源 + 内容 + 影响产物 ID/模块',
        '③ 影响分析：顺追溯链向下传播，直接+间接产物',
        '④ 标记 stale：受影响产物状态过期 + 下游任务状态更新',
        '⑤ 生成产物：按模板生成 CR .md（CR-{YYYYMMDD}-{NNN}）',
        '⑥ 质量校验：影响分析完整 / stale 齐全 / 重新执行建议已生成',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'cr-{yyyymmdd}-{nnn}.md', what: '变更记录（Markdown，含影响分析 + stale 清单）', consumer: '变更留档 + 追溯' },
        { name: 'task_change.md', what: '本阶段任务文件', consumer: '门控 + 追溯' },
      ],
      value: [
        '变更可追溯——每条 CR 记录影响分析与 stale 清单',
        '自动更新下游状态——受影响产物标记 stale，不静默过期',
        '6 条 CR 真实闭环——从决议到归属错配修正',
      ],
      boundary: [
        '不管「产物写错/漏写」——那是 /yxspec:feedback 的事',
        '不管「实际修改」——change 只标记 stale 和生成建议，修改需确认后在各阶段执行',
        '禁止把范围变化塞入 UF 绕过 SUP.10',
      ],
      example:
        'CR-20260730-006：plan 阶段将 TL_A MQTT 组包功能错误分配给 eb_link（0x2323 国标 TCP）——影响分析后 19 TASK 标记 reassigned_to tsp_mqtt，编码完成率 88%→100%。',
    },
    rolesTitle: '谁在干活？（命令 / 请求人 / 脚本）',
    roles: [
      { kind: 'blue', role: '变更管理员', who: '/yxspec:change 命令', does: '接收 → 影响分析 → stale → CR 生成 → 校验' },
      { kind: 'amber', role: '变更请求人', who: '用户（客户/内部/缺陷修复）', does: '提出变更内容与原因，确认后放行' },
      { kind: 'cyan', role: '追溯链', who: 'CR → stale 产物 → 下游任务', does: '影响范围自动传播（直接+间接）' },
    ],
    whyTitle: '为什么要变更管理？',
    whyShell: [
      '为什么不能直接改？—— 需求变化影响下游所有产物，必须理清影响范围再动',
      '为什么标记 stale 而不是删除？—— 保留旧版可追溯，状态过期即"需重做"',
      '为什么和 feedback 分家？—— 范围变化 vs 产物错误，两个不同治理通道',
    ],
    whyMemory: '记住 <Hl>「范围变化走 change，产物错误走 feedback」</Hl>——两条通道不混淆。',
    instance: {
      stats: [
        { num: '6', label: '条 CR', desc: 'CR-20260730-001~006', kind: 'cyan' },
        { num: '2', label: '类变更', desc: '决议 decision + 归属修正', kind: 'amber' },
        { num: '19+3', label: 'TASK 重分配', desc: 'MOD-002 19 + MOD-009 3', kind: 'amber' },
        { num: '100%', label: '完成率恢复', desc: '190/216 → 全解除', kind: 'green' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>6 条 CR、2 类变更</Hl>。答辩时说「变更管理 6 条 CR 闭环，影响分析+stale 标记」就是一句话结论。',
    },
    downstream: ['CR → 变更留档', 'stale → 下游重做', '重新执行建议 → 各阶段'],
    downstreamLine: '一句话：<Hl>变更管理是「改之前先算影响」</Hl>——stale 标记让影响透明。',
    ironRules: [
      '<b>不自动执行修改</b> —— 仅标记 stale 和生成建议，实际修改需用户确认',
      '<b>影响分析必须完整</b> —— 直接 + 间接产物都要列',
      '<b>UF 关联</b> —— 变更由 UF 修复引发时，CR 记 related_feedback[]，UF 回填 related_cr_id',
      '<b>CR 编号规范</b> —— CR-{YYYYMMDD}-{NNN}，当日从 001 开始',
    ],
    tutor: {
      question: '考官问「change 和 feedback 什么关系？什么时候走 change？」怎么答？',
      answer: (
        <span>
          边界一句话：<b>客户/SOR/需求范围变化 → change</b>；<b>下游发现上游产物写错/漏写/矛盾 → feedback</b>；
          <b>UF 修复导致需求范围变化 → change + UF 关联 CR</b>（UF 的 fix.related_cr_id 回填）。
          本工程真实案例：CR-20260730-006 是 plan 阶段把 TL_A MQTT 组包功能错配给 eb_link（0x2323 国标 TCP 模块），
          影响分析后 19 TASK 重分配 tsp_mqtt，<b>stale 标记 + 重新执行建议</b>闭环。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '6 步 · 变更生命周期',
  flowTitle: '执行流程：6 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: '规划', label: 'Step 1 规划',
      action: '生成 project/tasks/task_change.md 任务文件 + Read 模板（change-request.md.tpl）',
      post: 'task_change.md', edge: '任务就绪',
      why: '先建任务台账，再接收变更',
    },
    {
      id: 1, name: '接收变更', label: 'Step 2 接收变更',
      action: '记录变更来源（客户需求变更/内部优化/缺陷修复）+ 变更内容描述 + 影响的产物 ID 或模块',
      post: 'task_change.md（变更描述落账）', edge: '登记',
      why: '变更内容与范围先定性',
    },
    {
      id: 2, name: '影响分析', label: 'Step 3 影响分析',
      action: '顺追溯链向下传播：列出直接影响产物 + 间接下游产物 + 评估影响范围',
      post: '影响清单（直接 + 间接产物）', edge: '影响→stale',
      why: '追溯链是影响传播的地图——CR→SR→SWR→SW-ARCH（57 模块）→IF 契约（19 份）→编码计划→源码→测试（SWE.3 详设已废弃，编码契约由编码计划承接）',
    },
    {
      id: 3, name: '标记 stale', label: 'Step 4 标记 stale',
      action: '受影响产物标记 stale（状态过期）+ 更新下游阶段任务状态（已完成→需重做）',
      post: 'stale 条目清单', edge: '状态同步',
      why: '不静默过期——状态显式标记需重做',
    },
    {
      id: 4, name: '生成 CR', label: 'Step 5 生成产物',
      action: '按模板生成 cr-{yyyymmdd}-{nnn}.md（CR-{YYYYMMDD}-{NNN} 编号，单次 Write ≤50 行）',
      post: 'CR .md 文件', edge: '变更记录',
      why: '变更留档可追溯',
    },
    {
      id: 5, name: '质量校验', label: 'Step 6 质量校验',
      action: '检查影响分析完整（直接+间接）/ 受影响条目均已 stale / 重新执行建议已生成',
      post: 'task_change.md（6 项完成条件全过）', edge: '闭环',
      why: '校验不通过不得视为完成',
      badges: [{ kind: 'green', text: '6 项完成条件' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '规划', icon: '📋', color: 'blue', sub: 'task 台账' },
    { id: 1, name: '接收变更', icon: '📥', color: 'cyan', sub: '来源+内容' },
    { id: 2, name: '影响分析', icon: '🔍', color: 'amber', sub: '直接+间接' },
    { id: 3, name: '标记 stale', icon: '🚩', color: 'amber', sub: '状态过期' },
    { id: 4, name: '生成 CR', icon: '📄', color: 'cyan', sub: 'CR-NNN' },
    { id: 5, name: '质量校验', icon: '✅', color: 'green', sub: '6 项全过' },
  ],
  flowTutor: {
    question: '考官问「stale 标记之后发生了什么？变更怎么闭环？」怎么答？',
    answer: (
      <span>
        标记 stale 后：受影响产物状态从「已完成」变「需重做」，下游任务状态同步更新，
        CR 中给出<b>重新执行建议</b>（如"重新执行 /yxspec:sys-analysis"）。
        本工程案例 CR-20260730-006：影响分析发现 MOD-002 22 TASK 中 19 个是协议归属错配，
        标记 reassigned_to tsp_mqtt 后编码完成率 88% → 100%。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: '变更请求', role: '用户（来源/内容/影响范围）' },
      { name: '追溯链', role: 'CR → 产物 → 下游任务（影响传播地图）' },
      { name: 'change-request.md.tpl', role: '模板（结构约束）' },
    ],
    inputKeyline: '最关键输入是 <Hl>变更请求 + 追溯链</Hl>——影响分析依赖追溯链。',
    outputs: [
      { name: 'cr-{yyyymmdd}-{nnn}.md', role: '变更记录（影响分析 + stale 清单 + 重新执行建议）' },
      { name: 'task_change.md', role: '本阶段任务文件' },
    ],
    callGraphs: [
      {
        title: '命令级 · change 与上下游的关系',
        color: 'cyan',
        from: { id: 'ch', cmd: '/yxspec:change', sub: 'SUP.10 · 变更管理', desc: '变更登记 + 影响分析' },
        tos: [
          { id: 'up-fb', cmd: 'feedback', edge: 'UF 修复致范围变化', edgeDesc: 'related_cr_id 关联', desc: '协作：UF 修复引发范围变化时，change 生成 CR 并在 UF fix.related_cr_id 关联。' },
          { id: 'down-next', cmd: '/yxspec:next', edge: '重新执行建议', edgeDesc: '确认需重做阶段', desc: '下游：next 查看需重做的阶段建议。' },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:change' },
      { seg: 'input', label: '变更请求' },
      { seg: 'script', label: '影响分析' },
      { seg: 'worker', label: '标记 stale' },
      { seg: 'output', label: 'stale 清单' },
      { seg: 'worker', label: '生成 CR' },
      { seg: 'output', label: 'CR-{YYYYMMDD}-{NNN}.md' },
      { seg: 'output', label: '重新执行建议' },
    ],
    qualityGates: [
      { code: 'Gate', name: '变更请求', phase: '前置', check: '用户明确提出（内容+原因）', outcome: '过' },
      { code: 'CHK', name: '质量校验', phase: '收尾', check: '影响完整 / stale 齐全 / 建议生成', outcome: '6 项全过' },
    ],
    failures: [
      { fault: '影响分析不完整', action: '补全直接+间接产物（追溯链传播）' },
      { fault: 'stale 遗漏', action: '受影响条目逐一标记' },
      { fault: '范围变化误走 feedback', action: '纠正为 change 生成 CR，UF 回填 related_cr_id' },
    ],
  },
  ioTutor: {
    question: '答辩时 change 怎么讲？',
    answer: (
      <span>
        「change 是 SUP.10 变更管理：接收变更请求 → 影响分析（顺追溯链传播，直接+间接产物）→
        受影响产物标记 stale → 下游任务状态更新 → 生成 CR 记录。与 feedback 分工明确：
        <b>范围变化走 change、产物错误走 feedback</b>。本工程 6 条 CR 真实闭环（如 MOD-002/009 协议归属错配修正）。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'CR-20260730-001.md', kind: 'amber', what: 'MOD-006 车速提示音归属决议（decision 类）', who: '变更决议留档' },
    { name: 'CR-20260730-006.md', kind: 'green', what: 'MOD-002/009 协议归属错配修正（plan_attribution_fix）', who: '编码完成率 88%→100%' },
    { name: 'cr-*.md frontmatter', kind: 'cyan', what: 'change_id/type/status/affected_modules/related_feedback', who: '机读 + 追溯' },
    { name: 'task_change.md', kind: 'cyan', what: '本阶段任务文件', who: '门控 + 追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>变更请求 → 影响分析 → stale → CR 记录 → 重新执行建议</Hl>。',
  samplesTitle: '真实 CR 样例（点开看字段）',
  samples: [
    {
      id: 'CR-001', badges: [{ kind: 'amber', text: 'decision' }], meta: '决议类',
      title: 'MOD-006 车速提示音发声主体归属决议',
      fields: [
        { k: '原议题', v: 'SWR-FUN-0156/0157 发声主体归属待确认（TBOX/中控集成）' },
        { k: '决议', v: 'TBOX 承载时 22km/h 触发 vcs_speed_beep_trigger；中控承载时仅提供车速判据接口' },
        { k: '影响', v: 'MOD-006 TASK-010 解除阻塞：blocked → pending' },
      ],
    },
    {
      id: 'CR-006', badges: [{ kind: 'green', text: 'plan_attribution_fix' }], meta: '修正类',
      title: 'MOD-002/009 协议归属错配修正',
      fields: [
        { k: '错配', v: 'TL_A MQTT 组包 19 TASK 误归 eb_link（0x2323 国标 TCP）；温度上报 3 TASK 误归 its' },
        { k: '修正', v: '19+3 TASK 标记 reassigned_to tsp_mqtt(MOD-004)+业务模块' },
        { k: '验证', v: '编码完成率 190/216=88% → 归属修正后全解除' },
      ],
    },
  ],
  samplesNote: 'CR 影响分析「直接+间接产物」双清单——追溯链传播不遗漏。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SUP.10 · 变更管理',
    title: '门控 · 追溯 · AI 协同（change 版）',
    sub: '变更生命周期管理——改之前先算影响。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '变更请求 Gate + 6 项完成条件'],
        ['<Badge kind="green">追溯</Badge>', 'CR→stale 产物→下游任务，影响链可回溯'],
        ['<Badge kind="blue">AI 协同</Badge>', '影响分析（AI 顺追溯链）+ stale 标记（机械）'],
      ],
    },
    sections: [
      {
        title: '与 feedback 的边界（真实案例）',
        type: 'ul',
        items: [
          '客户/SOR/需求范围变化 → /yxspec:change（SUP.10 影响分析 + stale + 重做建议）',
          '下游发现上游产物写错/漏写/矛盾/不可追溯 → /yxspec:feedback（UF open→fixed→verify_failed→closed）',
          'UF 修复导致需求范围变化 → change + UF 关联 CR（fix.related_cr_id 回填）',
          'CR-20260730-006 关联 UF-MOD002-PROTO / UF-MOD009-01——两通道互锁',
        ],
        keyline: '「范围变化 vs 产物错误」——两个治理通道，change 管范围，feedback 管质量。',
      },
      {
        title: 'stale 标记的追溯链传播',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'CR-{YYYYMMDD}-{NNN}' },
          { kind: 'output', label: '[stale] SR-0008（上游 PRD 已变更）' },
          { kind: 'output', label: '[stale] SWR-FUN-0012' },
          { kind: 'output', label: '[stale] SW-ARCH-MOD003（MOD-003 架构/编码契约——详设已废弃，编码契约由编码计划承接）' },
          { kind: 'output', label: '[stale] 源码 + UT 用例' },
          { kind: 'output', label: '影响范围：N 个产物需更新' },
        ],
        keyline: '一条变更沿追溯链逐级击穿——每个被影响的产物都显式标记，不静默过期。',
      },
    ],
  },
};

export default changeChapter;
