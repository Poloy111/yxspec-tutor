/**
 * yxspec-tutor · feedback 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/feedback.md + project/feedback/UF-*.md（真实 7 条）
 * 真实运行：2026-07-29 15:34 → 22:13（UF-001~007 全部 closed）
 */

const feedbackChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:feedback · 上游反馈闭环（UF）',
    oneLiner:
      '下游发现上游产物写错/漏写/矛盾 → 登记 UF → 派发上游 scoped 修复 → 真实证据验证闭环。本工程真实闭环 7 条 UF（2026-07-29 一天内 open→closed 全闭环）。',
    analogy:
      '把 feedback 想象成「质量问题上报系统」：装配线上发现零件图纸有问题——先报障（UF 登记，open），再派回图纸设计部门修（fix，按单只改这张图，scoped），修完下游复验（verify，重跑或核对产物），验收过才算关单（closed）。全程四态流转，不许跳过。',
    memoryLine: '记住：<Hl>feedback = 上游问题上报 + 四态闭环</Hl>——7 条 UF 一天全闭环。',
    purpose: {
      oneLiner:
        '任意下游阶段发现根因属于上游产物时：create 登记 UF（open）→ fix 派发责任上游 scoped 修复（fixed）→ verify 重跑验收/产物判定（closed/verify_failed）→ close；四态状态机 open→fixed→verify_failed→closed，只修 upstream.item_ids 指定条目，禁止全量重生成。',
      input: {
        title: '核心输入（create 参数）',
        items: [
          '--from/--to 阶段 + --severity（blocking/major/minor/advisory）',
          '--issue-type（missing/ambiguous/conflict/trace_gap/contract_gap/stale_input/wrong_level/protocol_gap/other）',
          '--root-cause-layer（artifact 数据产物层 / tooling 生成器层）',
          '--origin-artifact + --upstream-artifact + --evidence',
          '--why-not-local-fix（为什么不能下游私自兜底）',
        ],
        note: 'Gate：from/to/severity/issue-type/title + 证据可定位 + why-not-local-fix',
      },
      processTitle: '4 类动作',
      process: [
        '① create：登记 UF（编号 UF-{YYYYMMDD}-{NNN}，状态 open）',
        '② fix：按 fix 派发表路由上游命令，scoped 修复落 fixed（真实改动文件）',
        '③ verify：重跑验收（路径 A）或产物判定（路径 B）→ closed / verify_failed',
        '④ close：仅允许 fixed→closed，必须有验证通过记录',
      ],
      outputsTitle: '3 样',
      outputs: [
        { name: 'UF-{YYYYMMDD}-{NNN}.md', what: '单条上游反馈闭环记录（frontmatter v1 schema）', consumer: '闭环留档 + 追溯' },
        { name: 'feedback-index.json', what: 'UF 索引（next_action: fix/verify/none）', consumer: '/yxspec:next 扫描阻塞项' },
        { name: 'task_feedback.md', what: 'FB-CREATE/FIX/VERIFY 任务行', consumer: '门控 + 追溯' },
      ],
      value: [
        '7 条 UF 一天全闭环——从登记到验证的全流程跑通',
        '根因分层（artifact vs tooling）——同型缺陷反复出现时修生成器而非打地鼠',
        '执行档默认——fix/verify 真正干活，不纯记账',
      ],
      boundary: [
        '不管「需求范围变化」——那是 /yxspec:change 的事（UF 修复致范围变化时关联 CR）',
        '不自动接 verify —— fix 落 fixed 即停，不自动推进下游',
        '禁止状态：draft/accepted/fixing/rejected/deferred/converted_to_change',
      ],
      example:
        'UF-20260729-001：review sqt_tr 发现 CHK-SQTR-025 OTA/CFG 域划分重叠（根因 TP §11.3 功能域映射表未单列 OTA）——fix 走向 A+B：补 TP 归属说明 + SQT-TR ota→cfg 合并（TR 20→26）→ verify 路径 B 产物判定 → closed。',
    },
    rolesTitle: '谁在干活？（命令 / 上游 / 脚本）',
    roles: [
      { kind: 'blue', role: '反馈管理员', who: '/yxspec:feedback 命令', does: 'create/fix/verify/close 全生命周期' },
      { kind: 'amber', role: '责任上游', who: 'fix 派发表路由（sys-analysis / swe-arch / sqt-strategy…）', does: 'scoped 修复指定条目' },
      { kind: 'cyan', role: '脚本', who: 'scan_feedback.py', does: 'next-id / index / record-fix / record-verify' },
    ],
    whyTitle: '为什么要上游反馈闭环？',
    whyShell: [
      '为什么下游不自己修？—— 根因在上游权威产物，下游兜底会掩盖系统性缺陷',
      '为什么 fix 要 scoped？—— 只改 item_ids 指定条目，禁止全量重生成',
      '为什么必须真实证据才落状态？—— 空转/臆断不闭环，fixed 靠改动文件、closed 靠重跑/核对',
    ],
    whyMemory: '记住 <Hl>「下游发现上游错 → UF 闭环」</Hl>——open→fixed→verify_failed→closed 四态。',
    instance: {
      stats: [
        { num: '7', label: '条 UF', desc: 'UF-20260729-001~007', kind: 'cyan' },
        { num: '100%', label: '闭环率', desc: '7/7 closed', kind: 'green' },
        { num: '4', label: '个状态', desc: 'open/fixed/verify_failed/closed', kind: 'cyan' },
        { num: '2', label: '修复模式', desc: '执行档 + 记账档(record-only)', kind: 'amber' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>7 条 UF 一天全闭环、100% closed</Hl>。答辩时说「上游反馈 7 条 UF 全闭环」就是一句话结论。',
    },
    downstream: ['closed → 解除阻塞', 'index → next 扫描', 'UF → 追溯'],
    downstreamLine: '一句话：<Hl>反馈闭环是「质量问题上报系统」</Hl>——上报→修复→复验→关单。',
    ironRules: [
      '<b>四态状态机</b> —— 仅 open/fixed/verify_failed/closed，禁止链式状态图',
      '<b>scoped 修复</b> —— 只改 upstream.item_ids 指定条目',
      '<b>真实证据才落状态</b> —— fixed 靠真实改动文件，closed 靠真实重跑/产物核对',
      '<b>tooling 层强制人工门</b> —— 根因在生成器时先出修改计划 HALT 等审核',
    ],
    tutor: {
      question: '考官问「UF 状态机怎么流转？verify 怎么验收？」怎么答？',
      answer: (
        <span>
          四态状态机：<b>open → fixed → closed</b>，中间可 <b>fixed → verify_failed → fixed</b> 循环。
          verify 验收两条路径：<b>路径 A 重跑</b>（如 behave 重跑，新报告作证据）或
          <b>路径 B 产物判定</b>（核对 fix.fixed_artifacts 是否满足期望）。
          本工程 UF-001 走路径 B：核对 CHK-SQTR-025 后两偏离项转 pass，result=pass → closed。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '4 态状态机 · 真实证据驱动',
  flowTitle: '执行流程：4 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'create', label: '登记 UF（open）',
      action: 'next-id 生成 UF-{YYYYMMDD}-{NNN} + 确定 root-cause-layer + 渲染模板写入 UF 文件 + 更新索引',
      post: 'UF 文件 status=open', edge: 'open → fix',
      why: '正式落盘，索引 next_action=fix',
      badges: [{ kind: 'cyan', text: 'open' }],
    },
    {
      id: 1, name: 'fix', label: '派发上游修复（fixed）',
      action: '按 fix 派发表路由上游命令 → scoped 只改 item_ids 条目 → 真实改动文件（git diff 确认）→ record-fix 落 fixed',
      post: 'fix.fixed_artifacts 真实改动', edge: 'fixed → verify',
      why: '只修指定条目，禁止全量重生成',
      badges: [{ kind: 'amber', text: 'scoped' }],
    },
    {
      id: 2, name: 'verify', label: '重跑验收（closed/verify_failed）',
      action: '路径 A 重跑 validation_command / 路径 B 产物核对 → record-verify：result=pass 转 closed，fail 转 verify_failed',
      post: 'result=pass + evidence', edge: 'closed 闭环',
      why: '真实重跑或真实产物核对，禁止臆断',
      badges: [{ kind: 'green', text: 'closed' }],
    },
    {
      id: 3, name: 'close', label: '关闭（仅 fixed→closed）',
      action: '必须已有验证通过记录或正文明确关闭原因；不允许 open→closed 或 verify_failed→closed',
      post: 'feedback-index next_action=none', edge: '解除阻塞',
      why: 'close 是状态机最后一步，有验证才放行',
    },
  ],
  flowNodes: [
    { id: 0, name: 'create', icon: '📝', color: 'blue', sub: 'open' },
    { id: 1, name: 'fix', icon: '🔧', color: 'amber', sub: 'scoped' },
    { id: 2, name: 'verify', icon: '🧪', color: 'cyan', sub: '重跑/核对' },
    { id: 3, name: 'close', icon: '✅', color: 'green', sub: '闭环' },
  ],
  flowTutor: {
    question: '考官问「fix 的执行档和记账档有什么区别？」怎么答？',
    answer: (
      <span>
        <b>执行档（默认）</b>：fix 真正派发上游命令做 scoped 修复，拿到真实改动文件后才落 fixed；
        <b>记账档（--record-only）</b>：修复已由人工/外部完成，只补登记（传 --fixed-by-command/--fixed-artifact/--summary）。
        本工程 UF-002~005（车速提示音/温度数据源/停车阈值/主站职责）是<b>人工决策后记账档</b>登记，
        UF-006/007（msgbus 路由契约/PP 持久化映射）是<b>执行档 scoped 补登</b> sw-contract-registry。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: 'feedback_candidate payload', role: 'yxspec-upstream-feedback skill 生成的候选命令' },
      { name: '上游产物', role: 'upstream.artifacts + item_ids（scoped 修复范围）' },
      { name: 'fix 派发表', role: 'upstream.stage → 修复执行命令' },
    ],
    inputKeyline: '最关键输入是 <Hl>fix 派发表 + item_ids</Hl>——决定修什么、怎么修。',
    outputs: [
      { name: 'UF-{YYYYMMDD}-{NNN}.md', role: '闭环记录（frontmatter + 正文 §5 修复/§6 验证）' },
      { name: 'feedback-index.json', role: '索引（next_action: fix/verify/none）' },
      { name: 'task_feedback.md', role: 'FB-CREATE/FIX/VERIFY 任务行' },
    ],
    callGraphs: [
      {
        title: '命令级 · feedback 与上下游的关系',
        color: 'cyan',
        from: { id: 'fb', cmd: '/yxspec:feedback', sub: '上游反馈闭环', desc: 'UF 四态闭环' },
        tos: [
          { id: 'up-skill', cmd: 'yxspec-upstream-feedback skill', edge: '候选 payload', edgeDesc: '先生成候选命令', desc: '上游：skill 先产出 feedback_candidate。' },
          { id: 'up-chg', cmd: '/yxspec:change', edge: '范围变化关联 CR', edgeDesc: 'related_cr_id', desc: '协作：修复致范围变化时关联 CR。' },
          { id: 'down-next', cmd: '/yxspec:next', edge: '扫描阻塞项', edgeDesc: 'closed 解除阻塞', desc: '下游：next 读取 index 扫描阻塞项。' },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:feedback' },
      { seg: 'input', label: '候选 payload' },
      { seg: 'worker', label: 'create UF' },
      { seg: 'worker', label: 'fix scoped' },
      { seg: 'worker', label: 'verify 重跑' },
      { seg: 'output', label: 'closed' },
    ],
    qualityGates: [
      { code: 'Gate', name: 'create Gate', phase: '前置', check: 'from/to/severity/issue-type + 证据 + why-not-local-fix', outcome: '过' },
      { code: 'fix', name: '真实改动', phase: '执行', check: '派发返回真实改动文件才落 fixed', outcome: '过' },
      { code: 'verify', name: '真实证据', phase: '执行', check: '重跑/产物核对才落 closed', outcome: '过' },
    ],
    failures: [
      { fault: '派发空转无改动', action: '保持原状态不流转，报告原因' },
      { fault: '遇分叉无法判定', action: '半停回报（HALF-STOP 格式），用户决策后继续' },
      { fault: '验证失败', action: 'result=fail 转 verify_failed，提示二次 fix' },
    ],
  },
  ioTutor: {
    question: '答辩时 feedback 怎么讲？',
    answer: (
      <span>
        「feedback 是上游反馈闭环：下游发现上游产物错 → create 登记 UF（open）→
        fix 按派发表 scoped 修复（只改 item_ids 条目，真实改动文件才落 fixed）→
        verify 重跑或产物核对（真实证据才落 closed/verify_failed）→ close。
        本工程 7 条 UF 一天全闭环，100% closed，索引 next_action 全部 none。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'UF-20260729-001.md', kind: 'green', what: 'OTA/CFG 域划分重叠（TP §11.3）——执行档闭环', who: 'sqt_tr → sqt_strategy' },
    { name: 'UF-20260729-002~005.md', kind: 'amber', what: '人工决策类（车速提示音/温度源/停车阈值/主站职责）', who: '记账档 --record-only' },
    { name: 'UF-20260729-006~007.md', kind: 'cyan', what: 'msgbus 路由契约 + PP 持久化映射（scoped 补登 registry）', who: '执行档 +49 行' },
    { name: 'feedback-index.json', kind: 'cyan', what: '7 条目索引（next_action 全 none）', who: 'next 扫描' },
  ],
  artifactsChain: '一句话串起来：<Hl>skill 候选 → create open → fix scoped → verify 证据 → closed</Hl>。',
  samplesTitle: '真实 UF 样例（点开看字段）',
  samples: [
    {
      id: 'UF-001', badges: [{ kind: 'green', text: 'closed' }], meta: '执行档',
      title: 'TP §11.3 功能域映射表未单列 OTA 功能域',
      fields: [
        { k: '发现', v: 'review sqt_tr CHK-SQTR-025：OTA/CFG 域划分重叠' },
        { k: '修复', v: '走向 A+B：TP 补归属说明 + SQT-TR ota→cfg 合并（TR 20→26）+ 删独立 ota 文件' },
        { k: '验证', v: '路径 B 产物判定：两偏离项转 pass，result=pass → closed' },
      ],
    },
    {
      id: 'UF-006', badges: [{ kind: 'cyan', text: 'fixed→closed' }], meta: '执行档 scoped',
      title: 'MOD-035 TL_S/CMD 命令分发 msgbus 路由契约缺失',
      fields: [
        { k: '修复', v: 'scoped 补登 sw-contract-registry MSG-007：pub=MOD-001 tsp → sub=MOD-035 system' },
        { k: '受益', v: 'MOD-018 yx_net 同根因一并受益' },
        { k: '验证', v: '路径 B：MSG-007 已登记（fix_source=UF-20260729-006）→ closed' },
      ],
    },
  ],
  samplesNote: '每条 UF 有「发现 → 修复 → 验证 → 闭环」四段记录，验证必须真实证据。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: '上游反馈闭环',
    title: '门控 · 追溯 · AI 协同（feedback 版）',
    sub: '上游质量问题上报与闭环管理。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', 'create/fix/verify 三重 Gate + 状态机前置条件'],
        ['<Badge kind="green">追溯</Badge>', 'UF frontmatter + 正文 §5/§6 修复验证记录 + index 索引'],
        ['<Badge kind="blue">AI 协同</Badge>', 'skill 生成候选（AI）+ 派发修复（执行档）+ 人工决策（记账档）'],
      ],
    },
    sections: [
      {
        title: '根因分层研判（artifact vs tooling）',
        type: 'ul',
        items: [
          'artifact（默认）：单条/局部产物写错，换一次重生成即可纠正 → 派发上游 scoped 重生成',
          'tooling：系统性/复发缺陷，生成逻辑/模板/规则本身错 → 先出修改计划 HALT 等人工审核，批准后才编辑工具文件',
          '复发性测试：删掉坏产物原样重跑，缺陷再现 → tooling 层',
          '拿不准时走 artifact——tooling 爆炸半径大且有强制人工门',
        ],
        keyline: '「把眼光放深点」——同型缺陷反复出现时修生成器，不是打地鼠。',
      },
      {
        title: '四态状态机与阻塞语义',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'open（blocking/major 阻塞下游）' },
          { kind: 'output', label: '→ fix → fixed（阻塞直到验证通过）' },
          { kind: 'output', label: '→ verify pass → closed（解除阻塞）' },
          { kind: 'output', label: '→ verify fail → verify_failed（退回修复）' },
          { kind: 'output', label: '→ fix 二次修复 → fixed（复验）' },
        ],
        keyline: '只有 4 个状态，禁止链式状态图——流转靠真实证据，不靠流程表演。',
      },
    ],
  },
};

export default feedbackChapter;
