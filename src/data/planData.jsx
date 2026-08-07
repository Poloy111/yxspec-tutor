/**
 * yxspec-tutor · swe-coding-plan 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/swe-coding-plan-v2.md（薄编排，3 skill 串联）
 * 真实产物：coding-plan-index.md + 19 个 coding-plan-mod-*.md + 决议落盘
 * 真实运行：2026-07-29 17:41 → 21:55（4h 14m，S20260729-174129）
 */

const planChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-coding-plan-v2 · SWE.4 · 编码计划生成',
    oneLiner:
      '给 19 个要编码的模块（evolve 16 + new 3）逐一出「施工方案」——每个模块的编码计划（coding-plan-mod-*.md），决议 86 条 advisory 自动闭合，为编码执行做准备。',
    analogy:
      '把 swe-coding-plan 想象成「施工队的排期表」：swe-arch-if 定了每栋楼的门口长什么样（接口规范），swe-coding-plan 给每栋楼排出「施工计划书」——活儿分几步（编码步骤）、用什么材料（repo-interfaces）、哪里有问题先解决（决议闭合）。19 份计划书生成完，施工队（编码 Worker）就能按计划开工。',
    memoryLine: '记住：<Hl>swe-coding-plan = 19 份模块编码计划书</Hl>——index 索引 + 决议闭合，为编码执行铺路。',
    purpose: {
      oneLiner:
        '3 阶段串联生成编码计划：prepare（INDEX + 19 params）→ spawn（滑窗 ≤5 生成 19 份 plan）→ resolve（决议闭合 + UF 候选），19/19 模块 planned 全闭环。',
      input: {
        title: '2 类输入',
        items: [
          'sw-contract-registry-*.json —— 契约注册表（validation.status=pass）',
          'sw-arch 架构 + sw-srs 需求（prepare 校验 0 drift）',
        ],
        note: '前置门禁：gate_coding_plan_v2.py --gate prepare（rc=0 且 registry status=pass）',
      },
      processTitle: '3 阶段串联 + 续跑检测',
      process: [
        '① prepare：gate_check → list-modules + extract-common → registry 一致性 → scope + contract-slice ×19 → check_params_schema → init_index',
        '② spawn：滑窗 ≤5 spawn Worker 生成 coding-plan-mod-*.md（19 模块）',
        '③ resolve：决议闭合（advisory 自动 + blocking default 自动）+ UF 候选登记',
        '④ 完成报告：模块摘要 + 决议 + UF 候选 + 建议 review swe_coding_plan',
      ],
      outputsTitle: '3 样（编码执行的施工图）',
      outputs: [
        { name: 'coding-plan-index.md', what: '计划索引（19 planned / 0 blocked，schema coding-plan-index/v2）', consumer: '编码执行 + 进度追踪' },
        { name: 'coding-plan-mod-*.md ×19', what: '各模块编码计划（含 repo-interfaces、编码步骤、决议）', consumer: 'yxspec-coding-worker 执行依据' },
        { name: '决议落盘', what: '86 advisory 自动决议 + 2 blocking accept_default + 6 no_default 保留', consumer: 'do gate 拦截依据' },
      ],
      value: [
        '19/19 模块计划全闭环——编码执行有图可依',
        '决议机制：advisory 自动闭合、blocking 有 default 自动、无 default 保留给 do gate 拦',
        '幂等续跑：INDEX 已 done 模块不重跑，中断可恢复',
      ],
      boundary: [
        '不管「模块实际编码」——那是 swe-coding-do 的事',
        '不管「代码验证」——那是 verify 的事',
        'swe-coding-plan 只回答「怎么排施工计划」，不施工',
      ],
      example:
        'MOD-006 出现 unresolved U-002 → 有 default 自动闭合（accept_default）；MOD-014 的 U-007 无 default → 保留给 do gate 拦截。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '薄编排者', who: '/yxspec:swe-coding-plan-v2 命令', does: '续跑检测 + 按序 spawn 3 个阶段 skill + 各阶段跑前置门禁 + 完成报告' },
      { kind: 'cyan', role: '3 个 skill', who: 'prepare / spawn / resolve', does: 'INDEX 生成、模块计划生成（滑窗 ≤5）、决议闭合' },
      { kind: 'amber', role: '门禁脚本', who: 'gate_coding_plan_v2.py --gate <stage>', does: '3 个门禁点：prepare/spawn/resolve，rc=0 放行 rc=2 停' },
    ],
    whyTitle: '为什么要这样分工？（为什么滑窗 ≤5 + 决议分级）',
    whyShell: [
      '为什么 spawn 滑窗 ≤5？—— 一次最多 5 个 Worker 并行，控制上下文与资源',
      '为什么决议分级？—— advisory 自动闭合省时间；blocking 有 default 自动；无 default 必须留给 do gate 拦（防止带病编码）',
      '为什么续跑检测用产物存在性？—— 不依赖 last_run_state.json（核实从未落盘），按 INDEX 状态定位重入点',
    ],
    whyMemory: '记住 <Hl>「3 阶段门禁 + 滑窗 ≤5 + 决议分级」</Hl>——计划要排全，问题要分级。',
    instance: {
      stats: [
        { num: '4h 14m', label: '总耗时', desc: '17:41 → 21:55', kind: 'cyan' },
        { num: '19', label: '份模块计划', desc: 'evolve 16 + new 3（mixed 17/pp_user 1/plain_logic 1）', kind: 'cyan' },
        { num: '86', label: '条 advisory 决议', desc: '自动闭合', kind: 'green' },
        { num: '2+6', label: 'blocking 处置', desc: '2 条 accept_default + 6 条 no_default 保留', kind: 'amber' },
        { num: '19/19', label: '计划全闭环', desc: '0 blocked', kind: 'green' },
      ],
      memoryLine: '记住这 4 个数字：<Hl>4h14m、19 份计划、86 决议自动闭合、19/19 全闭环</Hl>。答辩时说「决议分级闭环、0 blocked」就是一句话结论。',
    },
    downstream: ['coding-plan-mod-*.md → swe-coding-do', '决议 → do gate 拦截', 'INDEX → 进度追踪'],
    downstreamLine: '一句话：<Hl>编码计划是「施工队的排期表」</Hl>——19 份计划书就绪，编码执行按图开工。',
    ironRules: [
      '<b>门禁先行</b> —— 3 个门禁点 rc=2 即停',
      '<b>禁止跳步/并行</b> —— prepare → spawn → resolve 严格顺序',
      '<b>幂等续跑</b> —— INDEX 已 done 模块不重跑，params/decision 不重生成',
      '<b>无 default blocking 不自动放行</b> —— 留给 do gate 拦',
      '<b>不自动执行下一步</b> —— 完成报告建议 review，不自动跑 do',
    ],
    tutor: {
      question: '考官问「swe-coding-plan 和 swe-arch-if 的分工区别？」怎么答？',
      answer: (
        <span>
          <b>swe-arch-if 定义「接口长什么样」</b>（19 模块 public API + registry）；
          <b>swe-coding-plan 排出「施工计划」</b>（19 份 coding-plan-mod-*.md + 决议闭合）。
          编码计划以 registry pass 为硬门禁（prepare gate），产出后编码 Worker 按计划执行。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '3 阶段 + 完成报告 · 滑窗 ≤5 · 决议分级',
  flowTitle: '执行流程：5 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>每阶段前必须跑门禁脚本（rc=2 即停）</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'CP-GATE', label: '前置门禁（2m 18s）',
      action: 'gate_coding_plan_v2.py --gate prepare（rc=0）+ plan_gate.json status=pass（arch/srs/index/registry 全 ok，0 drift）',
      post: 'rc=0 + status=pass', edge: '门禁通过',
      why: 'registry 未 pass 不进 prepare（提示先跑 swe-arch-if）',
    },
    {
      id: 1, name: 'CP-PREPARE', label: 'prepare（5m 23s）',
      action: '步骤 1~5：gate_check → list-modules + extract-common → registry 一致性 → scope + contract-slice ×19 → check_params_schema → init_index',
      post: 'coding-plan-index.md（19 planned/0 blocked）+ 19 params schema 通过', edge: 'INDEX + params',
      why: '先建索引与参数，再生成计划',
    },
    {
      id: 2, name: 'CP-SPAWN', label: 'spawn 模块计划（3h 38m）',
      action: '步骤 6~9：滑窗 ≤5 spawn Worker 生成 coding-plan-mod-*.md（19 模块，opus）',
      post: '19 份 plan 落盘 + validation=ok', edge: '19 份计划书',
      why: '滑窗控制资源，逐批生成',
      badges: [{ kind: 'cyan', text: '滑窗 ≤5' }],
    },
    {
      id: 3, name: 'CP-RESOLVE', label: 'resolve 决议闭合（7m）',
      action: '步骤 10~13：决议闭合 + UF 候选登记：86 条 advisory 自动；2 条 blocking accept_default；6 条 no_default 保留',
      post: '决议落盘 + UF 候选', edge: '决议闭合',
      why: '问题分级处理：能自动的自动，不能的留给 do gate',
      badges: [{ kind: 'amber', text: '分级' }],
    },
    {
      id: 4, name: 'CP-REPORT', label: '完成报告（13m）',
      action: '步骤 14：模块摘要（19/19）+ 决议 + UF 候选 + 更新断点接力单；建议 review swe_coding_plan',
      post: '报告 + 建议', edge: '计划闭环 → 审查',
      why: '阶段全闭环，明确下一步',
      badges: [{ kind: 'green', text: '闭环' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '门禁', icon: '🔒', color: 'amber', sub: 'rc=0' },
    { id: 1, name: 'prepare', icon: '🗂️', color: 'blue', sub: 'INDEX + params' },
    { id: 2, name: 'spawn', icon: '🤖', color: 'cyan', sub: '滑窗 ≤5 ×19' },
    { id: 3, name: 'resolve', icon: '⚖️', color: 'cyan', sub: '决议闭合' },
    { id: 4, name: '报告', icon: '✅', color: 'green', sub: '19/19 闭环' },
  ],
  flowTutor: {
    question: '考官问「coding-plan 的决议机制怎么分级？」怎么答？',
    answer: (
      <span>
        <b>三级：</b>① <b>advisory 自动 accept</b>（真实 86 条）；② <b>blocking 有 default 自动闭合</b>（真实 2 条 accept_default，MOD-006.U-002 / MOD-015.U-001）；
        ③ <b>blocking 无 default 保留</b>（真实 6 条，如 MOD-014.U-007）——留给 <b>do gate 拦截</b>，防止带病编码。
        决议落盘提交（b70882723），全流程可追溯。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'sw-contract-registry-*.json', role: '契约注册表（validation.status=pass）—— prepare 硬门禁' },
      { name: 'sw-arch-*.md + sw-srs-*.md', role: '架构 + 需求（prepare 校验 0 drift）' },
      { name: 'coding-plan-index.md', role: '计划索引（续跑检测依据）' },
    ],
    inputKeyline: '最关键输入是 <Hl>registry（pass）</Hl>——registry 不通过，prepare 门禁直接 rc=2。',
    outputs: [
      { name: 'coding-plan-index.md', role: '计划索引（19 planned / 0 blocked）' },
      { name: 'coding-plan-mod-*.md ×19', role: '各模块编码计划（repo-interfaces + 编码步骤 + 决议）' },
      { name: '.spawn/*.params.json', role: 'Worker 参数（阶段1产物）' },
      { name: '决议落盘', role: '86 advisory + 2 blocking + 6 no_default 保留' },
    ],
    outputKeyline: '核心输出链：<Hl>INDEX → params → 19 份 plan → 决议</Hl>，全部可追溯可重跑。',
    callGraphs: [
      {
        title: '命令级 · swe-coding-plan 与上下游的关系',
        color: 'cyan',
        from: { id: 'plan', cmd: '/yxspec:swe-coding-plan-v2', sub: 'SWE.4 · 编码计划生成', desc: '排出 19 个模块的编码计划' },
        tos: [
          { id: 'up-if', cmd: 'swe-arch-if-v2', edge: 'registry（pass）', edgeDesc: 'prepare 硬门禁', desc: '上游：契约注册表 validation.status=pass 才能进 prepare。' },
          { id: 'down-do', cmd: 'swe-coding-do-v2', edge: 'coding-plan-mod-*.md', edgeDesc: '编码执行依据', desc: '下游：编码执行按 19 份计划施工。' },
          { id: 'side-review', cmd: 'yxspec:review swe_coding_plan', edge: '审查报告', edgeDesc: '软建议不阻断 do', desc: '审查建议，不自动执行。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个阶段干活',
        color: 'blue',
        from: { id: 'orch', cmd: '编排器（薄编排）', sub: '3 阶段 + 报告', desc: '续跑检测 → 按序 spawn skill → 门禁 → 报告' },
        tos: [
          { id: 'gate', cmd: 'gate_coding_plan_v2.py', edge: '3 个门禁点', edgeDesc: 'rc=0 放行 rc=2 停', desc: 'prepare/spawn/resolve 每阶段前置检查。' },
          { id: 'skill', cmd: '3 个 skill', edge: 'prepare→spawn→resolve', edgeDesc: '严格顺序禁止跳步', desc: 'INDEX 生成、模块计划生成（滑窗 ≤5）、决议闭合。' },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（门禁 + skill）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-coding-plan-v2' },
      { seg: 'input', label: 'registry pass' },
      { seg: 'script', label: 'gate prepare' },
      { seg: 'worker', label: 'prepare INDEX' },
      { seg: 'worker', label: 'spawn ≤5 ×19' },
      { seg: 'output', label: 'coding-plan-mod-*.md ×19' },
      { seg: 'worker', label: 'resolve 决议' },
      { seg: 'output', label: 'coding-plan-index.md + 决议记录' },
    ],
    pipeKeyline: '蓝色=脚本门禁 · 琥珀=skill/Worker · 绿色=产物——计划生成全链门禁把关。',
    qualityGates: [
      { code: 'gate', name: '3 个门禁点', phase: '各阶段前置', check: 'prepare/spawn/resolve 每阶段 rc=0', outcome: 'rc=0' },
      { code: 'status', name: 'plan_gate 校验', phase: 'prepare', check: 'arch/srs/index/registry 全 ok，0 drift', outcome: 'pass' },
      { code: 'schema', name: 'params schema', phase: 'prepare', check: '19 模块 params schema 校验', outcome: '19ok/0blocked' },
    ],
    gateNote: '对比 swe-arch-if：SWE.3 是「4 阶段门禁 + registry validation」；SWE.4 是「3 阶段门禁 + 决议分级」——计划阶段的关卡在「决议能不能自动闭合」。',
    failures: [
      { fault: 'gate rc=2', action: '按 stderr 提示补齐前置（registry 未 pass → 先跑 swe-arch-if）' },
      { fault: 'spawn 中断', action: '续跑检测：INDEX 已 done 模块不重跑（幂等）' },
      { fault: 'blocking 无 default', action: '保留给 do gate 拦，不自动放行' },
      { fault: 'plan 文件缺失', action: 'INDEX 中 planned/failed 模块重入阶段 2' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-coding-plan 的调用关系怎么讲？',
    answer: (
      <span>
        「swe-coding-plan 以 <b>registry pass 为硬门禁</b>（prepare gate），3 阶段串联：prepare（INDEX + 19 params schema）→
        spawn（滑窗 ≤5 生成 19 份 coding-plan-mod-*.md）→ resolve（86 advisory 自动闭合 + 2 accept_default + 6 no_default 保留），
        产出 19 份计划给 swe-coding-do 按图施工。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'coding-plan-index.md', kind: 'cyan', what: '计划索引：19 planned / 0 blocked（schema coding-plan-index/v2）', who: '编码执行 + 进度追踪' },
    { name: 'coding-plan-mod-*.md ×19', kind: 'amber', what: '各模块编码计划（repo-interfaces + 编码步骤 + 决议）', who: 'yxspec-coding-worker 执行依据' },
    { name: '.spawn/*.params.json', kind: 'amber', what: 'Worker 参数（19 份，schema 校验通过）', who: 'spawn 阶段输入' },
    { name: '决议记录', kind: 'green', what: '86 advisory 自动 + 2 accept_default + 6 no_default（commit b70882723）', who: 'do gate 拦截依据' },
    { name: 'MOD-017 修正', kind: 'green', what: '误标 yx_power → gnss 修正（commit 9d1e1fd6d）', who: '计划质量' },
    { name: 'task_swe_coding_plan.md', kind: 'green', what: '任务台账：CP-GATE~REPORT', who: '门控放行 + 证据链' },
  ],
  artifactsChain: '一句话串起来：<Hl>registry（pass）→ INDEX + params → 19 份 plan → 决议闭合 → do 按图施工</Hl>。',
  samplesTitle: '计划产物真实样例（点开看字段）',
  samples: [
    {
      id: 'MOD-006', badges: [{ kind: 'cyan', text: 'accept_default' }], meta: 'blocking 处置样例',
      title: 'MOD-006 决议：U-002 有 default 自动闭合',
      fields: [
        { k: '问题', v: 'U-002（blocking 级 unresolved）' },
        { k: '处置', v: 'accept_default（有默认方案，自动闭合）' },
        { k: '对照', v: 'U-003 无 default → 保留给 do gate 拦' },
      ],
    },
    {
      id: 'MOD-017', badges: [{ kind: 'amber', text: '修正案例' }], meta: '计划质量',
      title: 'MOD-017 修正：误标 yx_power → gnss（commit 9d1e1fd6d）',
      fields: [
        { k: '错误', v: '模块归属误标（yx_power）' },
        { k: '修正', v: '改为 gnss（真实归属）' },
        { k: '意义', v: '计划错误在施工前修正，避免编码做错模块' },
      ],
    },
    {
      id: 'MOD-014', badges: [{ kind: 'amber', text: 'no_default 样例' }], meta: '6 条保留之一',
      title: 'MOD-014 U-007：无 default → 保留给 do gate',
      fields: [
        { k: '问题', v: 'U-007（blocking 级，无默认方案）' },
        { k: '处置', v: '不自动放行，留给 swe-coding-do 的 gate 拦截' },
        { k: '意义', v: '防止带病编码——问题未决不施工' },
      ],
    },
  ],
  samplesNote: '决议分级是「防带病编码」的机制——能自动的自动，不能的留闸。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.4 · 编码计划',
    title: '门控 · 追溯 · AI 协同（swe-coding-plan 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'swe-arch-if 怎么表现', 'swe-coding-plan 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '4 阶段门禁 + IG 校验', '3 阶段门禁 + plan_gate status=pass + params schema'],
        ['<Badge kind="green">追溯</Badge>', '294 primary SWR + API 编号', '19 模块计划 → repo-interfaces + 决议逐条落盘（commit 可查）'],
        ['<Badge kind="blue">AI 协同</Badge>', '4 skill + 模板化兜底', '3 skill + 滑窗 ≤5 + 决议分级（advisory 自动/blocking 分级）'],
      ],
    },
    sections: [
      {
        title: '追溯链：registry → INDEX → 19 plan → 决议',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'registry pass' },
          { kind: 'output', label: 'INDEX' },
          { kind: 'output', label: 'params ×19' },
          { kind: 'output', label: 'plan ×19' },
          { kind: 'output', label: '决议落盘' },
        ],
        keyline: '每跳可追溯：plan frontmatter status 权威（INDEX + plan 文件双记录）；决议逐条落盘提交。',
      },
      {
        title: 'AI 协同：滑窗 + 决议分级',
        type: 'table',
        cols: ['角色', '干什么', '为什么'],
        rows: [
          ['<code>gate_coding_plan_v2.py</code>', '3 个门禁点（rc=0/rc=2）', '顺序靠脚本保证'],
          ['<code>3 个 skill</code>', 'prepare/spawn/resolve', '领域规则在 skill 内'],
          ['<code>spawn 滑窗 ≤5</code>', '控制并发 Worker 数', '上下文与资源可控'],
          ['<code>决议分级</code>', 'advisory 自动 / blocking 分级', '能自动的自动，不能的留闸'],
        ],
        keyline: '「门禁管顺序、滑窗管资源、决议管风险」——SWE.4 的协同分工。',
      },
      {
        title: '真实决议结果（S20260729-174129）',
        type: 'ul',
        items: [
          'advisory 86 条 → 自动决议（不打扰人工）',
          'blocking 2 条 → accept_default（MOD-006.U-002 / MOD-015.U-001，有默认方案）',
          'no_default 6 条保留（006.U-003 / 009.U-001 / 011.U-001 / 014.U-007 / 035.U-002/U-003）',
          'UF 候选：自动放行项 + 保留 blocking + 失败模块上游关涉项 → upstream-feedback skill',
        ],
        keyline: '决议不是拍脑袋：每条都落盘提交（b70882723），do gate 有据可拦。',
      },
    ],
  },
};

export default planChapter;
