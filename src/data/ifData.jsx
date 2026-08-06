/**
 * yxspec-tutor · swe-arch-if 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/swe-arch-if-v2.md（SWE.3 薄编排，4 skill 串联）
 * 真实产物：project/specs/sw-arch/sw-if/（19 个 IF-MOD + INDEX + registry）+ sw-shared-types.md
 * 真实运行：2026-07-29 14:16 → 16:34（1h 35m 主会话 + 中断接续）
 */

const ifChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-arch-if-v2 · SWE.3 · 软件接口规范',
    oneLiner:
      '给 19 个需要编码的模块（evolve 16 + new 3）定义「对外门面」——每个模块的 public API（API001~1900）、模块间的 37 条接口拓扑、96 个共享类型，全部登记进契约注册表。',
    analogy:
      '把 swe-arch-if 想象成「小区物业的接口规范书」：swe-arch 定了 57 栋楼的布局（模块分工），swe-arch-if 给每栋楼定「门口长什么样」——对外公开几个门（public API）、门牌号怎么编（api-id）、楼与楼之间走哪条路（接口拓扑）、公共设施怎么共用（共享类型）。retain 的老楼（38 个）不重新定义，索引里引用旧图纸就行。',
    memoryLine: '记住：<Hl>swe-arch-if = 给 19 个模块定义「对外门面」</Hl>——public API + 37 边拓扑 + 96 共享类型，登记进 registry。',
    purpose: {
      oneLiner:
        '按 4 个 skill 串联（plan → ifmod → index-types → registry）生成接口规范：19 个 IF-MOD（含 API001~1900 编号）、IF-INDEX（五层索引 + 拓扑 37 边）、sw-shared-types（96 类型）、sw-contract-registry（validation.status=pass）。',
      input: {
        title: '3 类输入',
        items: [
          'sw-arch-if-contract.json —— 跨模块契约（37 依赖，freeze.confirmed=true）',
          'sw-arch-*.md + modules.json —— 架构文档与模块清单（57 模块）',
          '基线既有 API（IF-INDEX §1.1 基线统计）',
        ],
        note: '前置门禁：gate_arch_if_v2.py --gate if-plan（rc=0 且 contract freeze.confirmed）',
      },
      processTitle: '4 阶段串联（门禁把关）',
      process: [
        '① plan：19 模块 brief 生成 + 分批 spawn IF-Plan Worker（≤5）+ plan_shard_merge → sw-if-plan.json（19 模块 / 294 primary SWR（SWR 全集 420 条））',
        '② ifmod：delta=changed 集为空 → 不 spawn Worker，模板化生成 19 个说明型 IF-MOD（不生造 API）',
        '③ index-types：api-id 规划（API001~1900）+ 机械聚合 IF-INDEX + AI 补拓扑 + 共享类型分类 → IG1~IG7 校验',
        '④ registry：5 源门控 + contract-registry-build + validation 三项 + integrity-check',
      ],
      outputsTitle: '4 样（编码契约的接口层）',
      outputs: [
        { name: 'sw-if-plan.json', what: '接口规划（19 模块 / 294 primary SWR（SWR 全集 420 条））', consumer: '编码计划准备阶段' },
        { name: 'sw-if-*-if-mod-*.md ×19', what: '各模块 IF-MOD（说明型，public API 描述）', consumer: '编码 Worker 的接口依据' },
        { name: 'sw-if-*-index.md + sw-shared-types.md', what: '接口索引（五层 + 拓扑 37 边）+ 共享类型 96 个', consumer: '接口检索 + 公共类型定义' },
        { name: 'sw-contract-registry-*.json', what: '契约注册表（16 键：module_catalog/swr_ownership/dsc/msgbus/interface 25 模块/shared_type）', consumer: 'swe-coding-plan 的门禁输入' },
      ],
      value: [
        '19 个模块接口全部登记——编码时「接口有据可查」',
        'delta=changed 为空 → 模板化生成不生造 API——诚实记录，不编接口',
        'registry validation.status=pass——下游编码计划的硬门禁',
      ],
      boundary: [
        '不管「模块内部怎么实现」——那是编码的事',
        '不管「每个模块的编码计划」——那是 swe-coding-plan 的事',
        'SW-IF 只描述模块对外 public API；retain 模块在 INDEX 引用基线',
      ],
      example:
        'SWR「TSP 通信」→ MOD-001 IF-MOD 定义 public API（连接/收发/心跳），API 编号 API001 起；模块间拓扑 37 边登记进 INDEX §1.3。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '接口架构师', who: '/yxspec:swe-arch-if-v2 命令（薄编排）', does: '4 阶段串联：每阶段先跑门禁脚本，加载对应 skill 执行' },
      { kind: 'cyan', role: '4 个 skill', who: 'plan / ifmod / index-types / registry', does: '接口规划、IF-MOD 生成、索引与类型、注册表' },
      { kind: 'amber', role: '门禁脚本', who: 'gate_arch_if_v2.py --gate <stage>', does: '4 个门禁点：if-plan/ifmod/index-types/registry，rc=0 放行 rc=2 停' },
    ],
    whyTitle: '为什么要这样分工？（为什么 delta=none 走模板化）',
    whyShell: [
      '为什么 4 阶段门禁串联？—— plan → ifmod → 索引 → 注册表有依赖，门禁保证顺序',
      '为什么 delta=none 不 spawn Worker？—— 契约变更集为空，模板化生成说明型 IF-MOD，不生造 API（诚实记录）',
      '为什么 retain 模块不定义接口？—— 老模块接口已在基线，INDEX 引用即可，避免重复劳动',
    ],
    whyMemory: '记住 <Hl>「4 阶段门禁 + delta=none 模板化」</Hl>——接口不编造，有变更才定义。',
    instance: {
      stats: [
        { num: '1h 35m', label: '主会话耗时', desc: '14:56 → 16:34（前序会话中断接续）', kind: 'cyan' },
        { num: '19', label: '个模块 IF-MOD', desc: 'evolve 16 + new 3', kind: 'cyan' },
        { num: '294', label: '条 primary SWR', desc: '接口规划依据（SWR 全集 420）', kind: 'cyan' },
        { num: '37', label: '条接口拓扑', desc: 'INDEX §1.3（模块间边）', kind: 'cyan' },
        { num: 'pass', label: 'registry 校验', desc: '16 键 0 errors', kind: 'green' },
      ],
      memoryLine: '记住这 4 个数字：<Hl>1h35m、19 模块、37 边拓扑、96 共享类型</Hl>。答辩时说「delta=none 模板化不生造 API，registry pass」就是一句话结论。',
    },
    downstream: ['registry → swe-coding-plan', 'IF-MOD → 编码 Worker', 'shared-types → 公共定义'],
    downstreamLine: '一句话：<Hl>SW-IF 是「编码契约的接口层」</Hl>——swe-coding-plan 的 prepare 门禁就是 registry validation.status=pass。',
    ironRules: [
      '<b>门禁先行</b> —— 4 个门禁点 rc=2 即停',
      '<b>只写 sw-if/ 新布局</b> —— 禁止旧布局 project/specs/sw-if-*',
      '<b>SW-IF 只描述 public API</b> —— 内部实现/调用他模块 API 不进 IF-MOD',
      '<b>仅处理 evolve+new</b> —— retain 在 INDEX 引用基线',
      '<b>不生造 API</b> —— delta=changed 为空走模板化，如实记录',
    ],
    tutor: {
      question: '考官问「swe-arch-if 和 swe-arch 的分工区别？」怎么答？',
      answer: (
        <span>
          <b>swe-arch 回答「模块怎么分」</b>（57 模块 + 跨模块契约 37 依赖）；
          <b>swe-arch-if 回答「接口长什么样」</b>（19 个 evolve+new 模块的 public API + 编号 API001~1900 + 共享类型 96 个 + 契约注册表）。
          swe-arch 出「分工图」，swe-arch-if 出「门面规范」——swe-arch-if 只处理 evolve+new，retain 模块在 INDEX 引用基线。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '4 阶段串联 · 每阶段门禁把关 · delta 驱动决策',
  flowTitle: '执行流程：5 步互动流程图',
  flowSub: '从上到下是真实执行顺序，<b>每阶段前必须跑门禁脚本（rc=2 即停）</b>。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'IF-GATE', label: '前置门禁 + 核验',
      action: 'gate_arch_if_v2.py --gate if-plan（rc=0）+ 前置产物核验：contract freeze.confirmed=true @13:41:23 + 57 模块齐全',
      post: 'rc=0 + 前置齐全', edge: '门禁通过',
      why: '契约未冻结不进 plan，防接口与架构打架',
    },
    {
      id: 1, name: 'IF-LOAD', label: '契约加载 + 分片规划（1h 3m）',
      action: 'Gate Check + 19 个 evolve/new 模块 brief 生成 + 分批 spawn IF-Plan Worker（≤5）+ plan_shard_merge',
      post: 'sw-if-plan.json（19 模块 / 294 primary SWR（SWR 全集 420 条） / 0 new 决策）', edge: '接口规划稿',
      why: '先规划再定义，分片并行提速度',
      badges: [{ kind: 'cyan', text: '并发 ≤5' }],
    },
    {
      id: 2, name: 'IF-MOD-ALL', label: 'IF-MOD 生成（6m 43s）',
      action: 'delta=changed 集为空（全 delta=none）→ 不 spawn Worker，编排器模板化生成说明型 IF-MOD（generated_by=sw-if-template）',
      post: '19 个 IF-MOD（无 AI_FILL / header 去前缀）', edge: '19 份接口稿',
      why: '契约无变更 → 不生造 API，模板化如实记录',
      badges: [{ kind: 'amber', text: 'delta=none' }],
    },
    {
      id: 3, name: 'IF-INDEX', label: 'IF-INDEX + 公共类型（9m 59s）',
      action: 'api-id-plan（API001~1900）+ 机械聚合 + AI 补 §1.3 拓扑 + shared-types 分类/渲染 + IG1~IG7',
      post: 'IF-INDEX + sw-shared-types.md（96 类型）', edge: '索引 + 类型',
      why: '接口要能检索，公共类型要统一定义',
      badges: [{ kind: 'green', text: 'IG 通过' }],
    },
    {
      id: 4, name: 'IF-REGISTRY', label: '契约注册表 + 收尾（3m 46s）',
      action: '5 源门控 + contract-registry-build + validation 三项 + session-close + integrity-check + layout full',
      post: 'sw-contract-registry（16 键 / validation.status=pass / 0 errors）', edge: '注册表 → 编码计划',
      why: '注册表是下游编码计划的硬门禁输入',
      badges: [{ kind: 'green', text: 'integrity pass' }],
    },
  ],
  flowNodes: [
    { id: 0, name: '门禁', icon: '🔒', color: 'amber', sub: 'rc=0' },
    { id: 1, name: '接口规划', icon: '🗺️', color: 'cyan', sub: '19 模块 294 SWR' },
    { id: 2, name: 'IF-MOD', icon: '📄', color: 'cyan', sub: '模板化 ×19' },
    { id: 3, name: '索引+类型', icon: '📇', color: 'cyan', sub: '91 类型' },
    { id: 4, name: '注册表', icon: '🗃️', color: 'green', sub: '16 键 pass' },
  ],
  flowTutor: {
    question: '考官问「IF-INDEX 的 IG1~IG7 校验是什么？真实结果如何？」怎么答？',
    answer: (
      <span>
        IG1~IG7 是索引与类型的校验组。真实结果：<b>IG1/2/5/6/7 PASS</b>；<b>IG3 空表</b>（§1.2 接口变更 0 条）+ <b>IG4 zone-assert</b>
        （schema 口径工具 bug）两处<b>零阻塞 UF</b>→ 记入 .spawn/uf-if-index-types.json，如实记录不阻塞放行。
        这体现「零阻塞 UF 机制」——工具缺陷 vs 产物缺陷分开记档。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。下方调用图分两层：命令级 / Agent 级。',
  io: {
    inputs: [
      { name: 'sw-arch-if-contract.json', role: '跨模块契约（37 依赖，freeze.confirmed=true）' },
      { name: 'sw-arch-*.md + modules.json', role: '架构文档 + 模块清单（57 模块）' },
      { name: '基线既有 API', role: '既有 API 清单 + non_public 覆盖表 + 共享类型候选' },
    ],
    inputKeyline: '最关键输入是 <Hl>契约（freeze.confirmed）</Hl>——契约未冻结，接口定义无依据。',
    outputs: [
      { name: 'sw-if-plan.json', role: '接口规划（19 模块 / 294 primary SWR（SWR 全集 420 条））' },
      { name: 'sw-if-*-if-mod-*.md', role: '19 个模块 IF-MOD（说明型 public API）' },
      { name: 'sw-if-*-index.md', role: 'IF-INDEX（§1 基线/变更/拓扑 37 边 + §2 五层索引）' },
      { name: 'sw-shared-types.md', role: '共享类型（96：14 new / 81 existing / 1 gap）' },
      { name: 'sw-contract-registry-*.json', role: '契约注册表（16 键 / validation.status=pass）' },
    ],
    outputKeyline: '核心输出链：<Hl>plan → IF-MOD ×19 → INDEX + shared-types → registry</Hl>，一步一个文件全部可验证。',
    callGraphs: [
      {
        title: '命令级 · swe-arch-if 与上下游的关系',
        color: 'cyan',
        from: { id: 'if', cmd: '/yxspec:swe-arch-if-v2', sub: 'SWE.3 · 软件接口规范', desc: '定义模块对外 public API' },
        tos: [
          { id: 'up-arch', cmd: 'swe-arch-v2', edge: '契约 + 架构', edgeDesc: 'freeze.confirmed', desc: '上游：跨模块契约（37 依赖）已冻结，是接口定义的依据。' },
          { id: 'down-plan', cmd: 'swe-coding-plan-v2', edge: 'registry（pass）', edgeDesc: 'prepare 硬门禁', desc: '下游：编码计划 prepare 门禁 = registry validation.status=pass。' },
          { id: 'side-review', cmd: 'review swe_arch（V1.1 补审）', edge: 'SWE.2+SWE.3 全量放行', edgeDesc: 'SW-IF 无独立 review', desc: 'SW-IF（SWE.3）无独立 review：契约已在 swe-arch-v2 冻结，接口部分随 review swe_arch V1.1（2026-07-29 17:08）补审放行，进编码计划。', dashed: true },
        ],
      },
      {
        title: 'Agent 级 · 谁在哪个阶段干活',
        color: 'blue',
        from: { id: 'orch', cmd: '编排器（薄编排）', sub: '4 阶段串联', desc: '每阶段先跑门禁脚本，加载 skill 执行' },
        tos: [
          { id: 'gate', cmd: 'gate_arch_if_v2.py', edge: '4 个门禁点', edgeDesc: 'rc=0 放行 rc=2 停', desc: 'if-plan/ifmod/index-types/registry 每阶段前置检查。' },
          { id: 'skill', cmd: '4 个 skill', edge: 'plan→ifmod→index-types→registry', edgeDesc: '顺序执行', desc: '接口规划、IF-MOD 生成、索引与共享类型、注册表构建。' },
          { id: 'tpl', cmd: '模板化生成', edge: 'delta=none 时', edgeDesc: 'sw-if-template', desc: '契约无变更 → 编排器模板化生成说明型 IF-MOD，不 spawn Worker。', dashed: true },
        ],
      },
    ],
    callKeyline: '两种颜色：<Hl>青 = 命令级</Hl>（上下游关系）· <Hl>深蓝 = Agent 级</Hl>（门禁 + skill + 模板化兜底）。点击任意节点看「为什么调它」。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-arch-if-v2' },
      { seg: 'input', label: '契约 37 依赖' },
      { seg: 'script', label: 'gate if-plan' },
      { seg: 'worker', label: 'plan 分批 ≤5' },
      { seg: 'script', label: 'gate ifmod' },
      { seg: 'worker', label: 'IF-MOD ×19（模板化）' },
      { seg: 'worker', label: 'INDEX + types' },
      { seg: 'worker', label: 'registry' },
      { seg: 'output', label: 'registry pass' },
    ],
    pipeKeyline: '蓝色=脚本门禁 · 琥珀=skill/Worker · 绿色=产物——接口定义全链门禁把关。',
    qualityGates: [
      { code: 'gate', name: '4 个门禁点', phase: '各阶段前置', check: 'if-plan/ifmod/index-types/registry 每阶段 rc=0', outcome: 'rc=0' },
      { code: 'IG1~IG7', name: '索引校验', phase: '阶段3', check: '索引/类型一致性；IG3 空表 + IG4 zone-assert 零阻塞 UF', outcome: 'IG1/2/5/6/7 PASS' },
      { code: 'validation', name: '注册表校验', phase: '阶段4', check: '5 源门控 + 三项 validation', outcome: 'pass（0 errors）' },
    ],
    gateNote: '对比 swe-arch：SWE.2 有 2 个人工冻结点；SWE.3 无人工冻结点——接口定义以契约冻结为前提，机器门禁把关即可。',
    failures: [
      { fault: 'gate rc=2', action: '按 stderr 提示补齐前置，不硬闯' },
      { fault: 'session 中断', action: '续跑检测：旧会话标 interrupted，新会话接续（真实发生 S141620→S145632）' },
      { fault: 'IG 零阻塞 UF', action: '记入 .spawn/uf-*.json，如实记录不阻塞' },
      { fault: '工具 bug（schema 口径）', action: 'zone-assert 记档，产物不受影响' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-arch-if 的调用关系怎么讲？',
    answer: (
      <span>
        「swe-arch-if 消费冻结后的跨模块契约（37 依赖），<b>4 阶段门禁串联</b>：plan（19 模块 294 SWR）→
        IF-MOD ×19（delta=none 模板化生成，不生造 API）→ INDEX + shared-types（37 边拓扑 + 96 类型）→
        registry（16 键 validation pass），产出 sw-contract-registry 给 swe-coding-plan 当 prepare 硬门禁。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sw-if-plan.json', kind: 'cyan', what: '接口规划：19 模块 / 294 primary SWR（SWR 全集 420 条） / 0 new 决策', who: 'IF-MOD 生成的输入' },
    { name: 'sw-if-*-if-mod-*.md ×19', kind: 'amber', what: '各模块 IF-MOD（说明型：既有 API + non_public 覆盖表）', who: '编码 Worker 的接口依据' },
    { name: 'sw-if-*-index.md', kind: 'amber', what: 'IF-INDEX：§1 基线/变更/拓扑 37 边 + §2 五层索引（api-id API001~1900）', who: '接口检索入口' },
    { name: 'sw-shared-types.md', kind: 'amber', what: '共享类型：96 个（14 new / 81 existing / 1 gap）', who: '公共类型定义' },
    { name: 'sw-contract-registry-*.json', kind: 'green', what: '契约注册表：16 键（module_catalog/swr_ownership/dsc/msgbus/interface 25 模块/shared_type）', who: 'swe-coding-plan 硬门禁' },
    { name: 'task_sw_arch_if.md', kind: 'green', what: '任务台账：IF-GATE~REGISTRY', who: '门控放行 + 证据链' },
  ],
  artifactsChain: '一句话串起来：<Hl>契约 → plan（294 SWR）→ IF-MOD ×19 → INDEX + types（91）→ registry（pass）</Hl>。',
  samplesTitle: '接口产物真实样例（点开看字段）',
  samples: [
    {
      id: 'API001~', badges: [{ kind: 'cyan', text: 'api-id 编号' }], meta: '五层索引之一',
      title: 'API 编号体系：API001~API1900（模块 public API 统一编号）',
      fields: [
        { k: '规划', v: 'api-id-plan 阶段机械分配' },
        { k: '索引', v: 'IF-INDEX §2 五层索引（模块/接口/类型/拓扑/变更）' },
        { k: '原则', v: 'SW-IF 只描述模块对外 public API' },
      ],
    },
    {
      id: '拓扑 37 边', badges: [{ kind: 'blue', text: 'INDEX §1.3' }], meta: '模块间关系',
      title: '接口拓扑：37 条模块间边（谁调谁的接口）',
      fields: [
        { k: '来源', v: '契约 37 依赖（API 31 + MSG 6）' },
        { k: '渲染', v: 'AI 补 §1.3 拓扑（基于 plan-frag 证据）' },
        { k: '用途', v: '编码时知道该调谁的 API' },
      ],
    },
    {
      id: 'shared-types', badges: [{ kind: 'amber', text: '91 类型' }], meta: '公共定义',
      title: '共享类型：14 new / 81 existing / 1 gap',
      fields: [
        { k: '分类', v: 'shared-types-classify（new/existing/gap）' },
        { k: '校验', v: 'validate rc=0' },
        { k: '1 gap', v: '工具口径记录，零阻塞 UF 记档' },
      ],
    },
  ],
  samplesNote: 'IF-MOD 全部 generated_by=sw-if-template（delta=none）——「不生造 API」的机制保证。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SWE.3 · 软件接口',
    title: '门控 · 追溯 · AI 协同（swe-arch-if 版）',
    sub: '同一个框架，每个命令的「机制形态」不一样——对照着看，答辩时就能讲出差异。',
    mechTableTitle: '机制总览（与上游对照）',
    mechTable: {
      cols: ['机制', 'swe-arch 怎么表现', 'swe-arch-if 怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '5 阶段门禁 + 2 人工冻结点', '4 阶段门禁 + IG1~IG7 + registry validation 三项'],
        ['<Badge kind="green">追溯</Badge>', 'SWR→模块映射 100%', '294 primary SWR 进 plan；API001~1900 编号；契约 37 依赖登记'],
        ['<Badge kind="blue">AI 协同</Badge>', '5 skill + 主会话裁决 + 用户冻结', '4 skill + 模板化生成（delta=none）+ 零阻塞 UF 机制'],
      ],
    },
    sections: [
      {
        title: '追溯链：契约 → plan → IF-MOD → registry',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: '契约 37 依赖' },
          { kind: 'output', label: 'plan 294 SWR' },
          { kind: 'output', label: 'IF-MOD ×19' },
          { kind: 'output', label: 'INDEX + types' },
          { kind: 'output', label: 'registry 16 键' },
        ],
        keyline: '每跳可追溯：IF-MOD 基于 plan-frag 证据；registry 5 源门控（arch/contract/modules/INDEX/types）。',
      },
      {
        title: 'AI 协同：门禁 + skill + 零阻塞 UF',
        type: 'table',
        cols: ['角色', '干什么', '为什么'],
        rows: [
          ['<code>gate_arch_if_v2.py</code>', '4 个门禁点前置检查（rc=0/rc=2）', '顺序靠脚本保证'],
          ['<code>4 个 skill</code>', 'plan/ifmod/index-types/registry', '领域规则在 skill 内'],
          ['<code>模板化生成</code>', 'delta=none 时编排器模板化 IF-MOD', '不生造 API，诚实记录'],
          ['<code>零阻塞 UF</code>', 'IG3 空表/IG4 zone-assert 记档', '工具缺陷与产物缺陷分开'],
        ],
        keyline: '「门禁管顺序、skill 管领域、模板管诚实」——SWE.3 的协同分工。',
      },
      {
        title: '真实风险处置：会话中断接续（2 次 session）',
        type: 'ul',
        items: [
          '现象：S20260729-141620 进程重启中断（2h 17m）',
          '处置：新会话 S20260729-145632 接续（1h 35m），旧会话标 interrupted',
          '续跑：基于产物存在性判定重入点（IF-GATE 重核验 + IF-LOAD 续跑）',
          '结果：registry 生成 pass，session close result=ok',
        ],
        keyline: '中断不丢工——续跑检测按产物定位重入点，旧会话如实标 interrupted。',
      },
    ],
  },
};

export default ifChapter;
