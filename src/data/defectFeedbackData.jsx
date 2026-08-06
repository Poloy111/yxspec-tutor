/**
 * yxspec-tutor · sqt-defect-feedback 章节数据（通用章节契约结构）
 * 内容来源：yxspec/.claude/commands/yxspec/sqt-defect-feedback.md + project/specs/sqt-dr/sqt-dr-*.md
 * 真实运行：2026-08-03 ~ 08-04（SQT-DR 批次报告，21 def fix-group 分组）
 */

const defectFeedbackChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:sqt-defect-feedback · SUP.8 · 缺陷反馈闭环',
    oneLiner:
      '把自动化测试的 defect-reports 汇总成缺陷闭环报告（SQT-DR）：批次概览 → fix-group 开发定位分组 → 缺陷密度分析 → 需求影响 → 追溯矩阵 → CI 回归计划 → KPI → 推荐修复命令。本工程 21 def 分 3 个 fix-group。',
    analogy:
      '把 sqt-defect-feedback 想象成「试卷分析报告」：机器阅完卷（auto-test），把所有错题集中分析——错的题归成几类（fix-group：BMS 解析类/设防状态类/协议逻辑类）、每题标出错在哪一章哪一节（target_root_cause）、排优先级（P2/P3）、定复习计划（CI 回归计划）、算及格率（KPI）。开发拿着这份报告按类修错，修完复测。',
    memoryLine: '记住：<Hl>defect-feedback = 错题试卷分析</Hl>——21 def 分 3 组 + CI 回归计划。',
    purpose: {
      oneLiner:
        'Step 1 脚本生成 SQT-DR（批次概览/fix-group/密度/需求影响/追溯/CI 回归/KPI/推荐修复）→ Step 2 AI 审核 + 补充 + Validate；缺陷生命周期状态机：open → fixing → fixed → verify_failed → closed（含 expected 关闭路径）。',
      input: {
        title: '4 类输入（Gate）',
        items: [
          'defect-reports/*/def-*/report.md（结构化缺陷报告）',
          'SQT-TC（用例定义，追溯依据）',
          'SQT-TP（测试策略，分类口径）',
          'SYS-REQ（需求影响映射）',
        ],
        note: '本工程：sqt_tc=1 / sqt_tp=1 / sys_req=1 全就绪',
      },
      processTitle: '2 步',
      process: [
        '① Step 1：脚本生成 SQT-DR（8 章结构：批次概览/开发定位视图/密度/需求影响/追溯矩阵/CI 回归计划/KPI/下一步推荐修复命令）',
        '② Step 2：AI 审核 + 补充 + Validate（分类口径/路由/证据完整性校验）',
      ],
      outputsTitle: '1 样主产物',
      outputs: [
        { name: 'sqt-dr-{spec_id}.md', what: '缺陷闭环报告（fix-group 分组 + CI 回归计划 + KPI）', consumer: '开发修复 + 回归跟踪' },
        { name: 'review-sqt_defect_feedback-*.md', what: '审查报告（人工双签）', consumer: '质量门' },
      ],
      value: [
        '21 def 按失败模式分 3 个 fix-group——修复有据可依',
        '每个 def 有 target_root_cause + 建议定位链路 + 回归 TC——修复可执行',
        'CI 回归计划写入 §6——修完自动回归验证',
      ],
      boundary: [
        '不直接修代码 —— 那是开发/上游反馈的事',
        '不跑测试 —— 那是 sqt-auto-test 的事',
        'defect-feedback 只回答「缺陷怎么归类、怎么排优先级、怎么回归」',
      ],
      example:
        'fix-grp-001 BMS/SIF 解析异常：10 个 def（0x31F4/0x0A14/0x01/0x0A/0x3A/校验和）→ 建议定位链路 SIF 解析→BMS 模型→MQTT 组包 → P2-High。',
    },
    rolesTitle: '谁在干活？（命令 / 脚本 / 状态机）',
    roles: [
      { kind: 'blue', role: '缺陷闭环队长', who: '/yxspec:sqt-defect-feedback 命令', does: 'Gate → 生成 SQT-DR → AI 审核 Validate' },
      { kind: 'cyan', role: '生成脚本', who: 'SQT-DR 生成工具', does: '8 章结构确定性生成（分类/路由/密度/KPI）' },
      { kind: 'amber', role: '生命周期状态机', who: 'open→fixing→fixed→verify_failed→closed', does: '缺陷状态流转 + 证据要求' },
    ],
    whyTitle: '为什么缺陷要分组闭环？',
    whyShell: [
      '为什么 fix-group 分组？—— 同失败模式归一组，开发按组修复效率最高',
      '为什么 CI 回归计划？—— 修完自动回归，闭环才算完成',
      '为什么 target_root_cause？—— 每个缺陷给定位方向，不盲目排错',
    ],
    whyMemory: '记住 <Hl>「按失败模式分组 + CI 回归计划」</Hl>——21 def 分 3 组。',
    instance: {
      stats: [
        { num: '21', label: '个 DEF 闭环', desc: 'R6 检出 21 条，R7 116/116 全通过后全部 verified', kind: 'cyan' },
        { num: '3', label: '个 fix-group', desc: 'BMS 解析/设防状态/协议逻辑', kind: 'amber' },
        { num: 'P2', label: '主流优先级', desc: 'P2-High（Major 为主）', kind: 'amber' },
        { num: 'verified', label: '状态', desc: '21 DEF 全部 verified 闭环（REVIEW-2026-003 approved，08-05 实证）', kind: 'green' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>21 def、3 个 fix-group</Hl>。答辩时说「缺陷按失败模式分组 + CI 回归计划」就是一句话结论。',
    },
    downstream: ['fix-group → 开发修复', 'CI 回归 → 复测验证', 'KPI → 质量度量'],
    downstreamLine: '一句话：<Hl>缺陷闭环是「错题试卷分析」</Hl>——分类清楚才能高效修复。',
    ironRules: [
      '<b>分类口径单一权威</b> —— responsibility_class / next_action / target_root_cause 取值域以本命令为准',
      '<b>路由判定序</b> —— route_precedence 决定缺陷去向（本地修复/上游反馈/预期失败）',
      '<b>证据要求</b> —— 状态流转必须带证据（fixed 靠修复记录、closed 靠复测通过）',
      '<b>预期失败隔离</b> —— @known-fail 不进阻塞修复',
    ],
    tutor: {
      question: '考官问「缺陷生命周期状态机怎么流转？和 upstream feedback 什么关系？」怎么答？',
      answer: (
        <span>
          状态机：<b>open → fixing → fixed → verify_failed → closed</b>（verify 失败退回 fixing 复修），
          另含 <b>expected 关闭路径</b>（@known-fail 预期失败直接关）。
          与 upstream feedback 的关系：<b>路由判定序</b>决定缺陷去向——本地编码可修的走 fix-group
          本地修复；根因在上游产物的走 <b>上游反馈联动</b>（生成 UF 候选）；预期失败走 known-fail。
          本工程 21 def 全路由到本地编码修复（3 个 fix-group），建议定位链路已给出。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '2 步 · 缺陷闭环',
  flowTitle: '执行流程：4 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: 'Gate', label: '门控检查（4 类输入）',
      action: '检查 defect-reports / sqt-tc / sqt-tp / sys-req 输入完整可读',
      post: '输入就绪（文档计数写入元数据）', edge: '输入→生成',
      why: '输入不完整不生成报告',
      badges: [{ kind: 'green', text: '4 类输入' }],
    },
    {
      id: 1, name: 'Step 1', label: '脚本生成 SQT-DR',
      action: '确定性生成 8 章：批次概览（116/95/21）→ fix-group 开发定位（3 组）→ 缺陷密度 → 需求影响 → 追溯矩阵 → CI 回归计划 → KPI 汇总 → 推荐修复命令',
      post: 'sqt-dr-trainees-2026.md', edge: '生成→审核',
      why: '结构冻结逐字不跑偏（章节锚点禁改）',
      badges: [{ kind: 'cyan', text: '8 章' }],
    },
    {
      id: 2, name: 'Step 2', label: 'AI 审核 + 补充 + Validate',
      action: 'AI 复核分类口径（responsibility_class/next_action/target_root_cause 取值域）+ 路由判定序 + 证据完整性 → Validate 通过',
      post: 'draft 报告', edge: '审核→评审',
      why: '机械生成 + AI 审核双保险',
    },
    {
      id: 3, name: '评审', label: 'review 评审（人工双签）',
      action: 'review-sqt_defect_feedback-*.md（本工程 002 号报告评审）→ 人工确认后放行修复',
      post: 'approved', edge: '修复启动',
      why: '缺陷报告是修复依据，需人工确认',
      badges: [{ kind: 'green', text: '双签' }],
    },
  ],
  flowNodes: [
    { id: 0, name: 'Gate', icon: '🚪', color: 'blue', sub: '4 类输入' },
    { id: 1, name: '生成 SQT-DR', icon: '📊', color: 'cyan', sub: '8 章' },
    { id: 2, name: 'AI 审核', icon: '🔍', color: 'amber', sub: 'Validate' },
    { id: 3, name: '评审放行', icon: '✅', color: 'green', sub: '双签' },
  ],
  flowTutor: {
    question: '考官问「fix-group 怎么分的？每组怎么给修复方向？」怎么答？',
    answer: (
      <span>
        fix-group 按<b>失败模式</b>分组：本工程 21 def 分 3 组——
        <b>fix-grp-001 BMS/SIF 数据解析或换算异常</b>（10 def：0x31F4/0x0A14/0x01/0x0A/0x3A/校验和畸形帧），
        <b>fix-grp-002 设防/撤防状态上报不一致</b>（4 def：0x30F0/0x31F0 STATUS guarded），
        <b>fix-grp-003 协议/业务逻辑异常</b>（7 def）。
        每组给<b>建议定位链路</b>（如 SIF 解析→BMS 模型→MQTT 组包）+ 推荐处理 + <b>回归 TC 清单</b>——修复可执行可验证。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: 'defect-reports/*/def-*/report.md', role: '结构化缺陷报告（失败用例批量）' },
      { name: 'SQT-TC', role: '用例定义（追溯依据）' },
      { name: 'SQT-TP', role: '测试策略（分类口径）' },
      { name: 'SYS-REQ', role: '需求影响映射' },
    ],
    inputKeyline: '最关键输入是 <Hl>defect-reports</Hl>——缺陷来源单一入口。',
    outputs: [
      { name: 'sqt-dr-{spec_id}.md', role: '缺陷闭环报告（8 章）' },
      { name: 'review-sqt_defect_feedback-*.md', role: '审查报告（人工双签）' },
    ],
    callGraphs: [
      {
        title: '命令级 · sqt-defect-feedback 与上下游的关系',
        color: 'cyan',
        from: { id: 'df', cmd: '/yxspec:sqt-defect-feedback', sub: 'SUP.8 · 缺陷闭环', desc: '错题分析' },
        tos: [
          { id: 'up-at', cmd: 'sqt-auto-test', edge: 'defect-reports', edgeDesc: '失败批量归档', desc: '上游：自动化测试产出缺陷报告。' },
          { id: 'down-fb', cmd: 'feedback', edge: '上游反馈联动', edgeDesc: '根因在上游时', desc: '协作：根因在上游产物的缺陷生成 UF。', dashed: true },
          { id: 'side-fix', cmd: '开发修复', edge: 'fix-group', edgeDesc: '本地编码修复', desc: '下游：按 fix-group 修复 + CI 回归。' },
        ],
      },
    ],
    pipeline: [
      { seg: 'cmd', label: '/yxspec:sqt-defect-feedback' },
      { seg: 'input', label: 'defect-reports' },
      { seg: 'script', label: 'SQT-DR 生成' },
      { seg: 'worker', label: 'AI 审核' },
      { seg: 'output', label: 'DR + 回归计划' },
    ],
    qualityGates: [
      { code: 'Gate', name: '4 类输入', phase: '前置', check: 'defect-reports/TC/TP/SYS-REQ 可读', outcome: '过' },
      { code: 'VAL', name: 'Validate', phase: '收尾', check: '分类口径/路由/证据完整性', outcome: '过' },
    ],
    failures: [
      { fault: '分类口径越界', action: 'AI 审核纠正为取值域内' },
      { fault: '证据不足', action: '标记待补证据，不臆断状态' },
      { fault: '路由错误', action: '按路由判定序纠正（本地/上游/预期）' },
    ],
  },
  ioTutor: {
    question: '答辩时 sqt-defect-feedback 怎么讲？',
    answer: (
      <span>
        「defect-feedback 把自动化测试的缺陷报告汇总成 <b>SQT-DR 缺陷闭环报告</b>：
        批次概览（116/95/21）→ <b>fix-group 按失败模式分组</b>（3 组：BMS 解析/设防状态/协议逻辑）→
        每个 def 标 <b>target_root_cause + 建议定位链路 + 回归 TC</b> →
        <b>CI 回归计划</b> + KPI 汇总。缺陷状态机 open→fixing→fixed→verify_failed→closed，
        根因在上游时走上游反馈联动。评审双签后开发按组修复。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'sqt-dr-trainees-2026.md', kind: 'green', what: '缺陷闭环报告（21 def / 3 fix-group / CI 回归）', who: '开发修复依据' },
    { name: 'sqt-dr-trainees-2026-ble.md', kind: 'cyan', what: 'BLE 批次报告（133 def 基线）', who: '收敛对照' },
    { name: 'review-sqt_defect_feedback-2026-002.md', kind: 'amber', what: '缺陷报告评审（双签）', who: '质量门' },
    { name: 'task_sqt_defect_feedback.md', kind: 'cyan', what: '任务台账（SQT-DF-001~002）', who: '门控 + 追溯' },
  ],
  artifactsChain: '一句话串起来：<Hl>defect-reports → fix-group 分组 → DR 8 章 → CI 回归计划 → 双签修复</Hl>。',
  samplesTitle: '真实缺陷样例（点开看字段）',
  samples: [
    {
      id: 'def-0187', badges: [{ kind: 'amber', text: 'P2-High' }], meta: 'fix-grp-001',
      title: '0x31F4 推控制器状态 穿透 0B08 CTRINFO speed=30.0',
      fields: [
        { k: 'TC', v: 'SQT-TC-2026-001-TC-IF-BLE-012' },
        { k: '根因', v: '协议/字段问题（BMS/SIF 解析或换算异常）' },
        { k: '建议', v: 'SIF 解析 → BMS 模型 → MQTT 组包链路检查' },
      ],
    },
    {
      id: 'def-0182', badges: [{ kind: 'cyan', text: 'P2-High' }], meta: 'fix-grp-002',
      title: '0x31F0 推设防状态 穿透 MQTT STATUS guarded=True',
      fields: [
        { k: 'TC', v: 'SQT-TC-2026-001-TC-IF-BLE-008' },
        { k: '现象', v: '设防状态上报不一致（guarded 状态更新问题）' },
        { k: '建议', v: '检查 guarded 状态更新、缓存刷新和 STATUS payload 字段来源' },
      ],
    },
  ],
  samplesNote: '每个 def 有「TC 溯源 + 根因分类 + 定位链路 + 回归 TC」——修复有据可依。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SUP.8 · 缺陷闭环',
    title: '门控 · 追溯 · AI 协同（sqt-defect-feedback 版）',
    sub: '错题试卷分析——分类清楚才能高效修复。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '4 类输入 Gate + Validate 校验'],
        ['<Badge kind="green">追溯</Badge>', 'def → TC → fix-group → 回归 TC 全链可追溯'],
        ['<Badge kind="blue">AI 协同</Badge>', '脚本确定性生成 + AI 审核补充'],
      ],
    },
    sections: [
      {
        title: '缺陷分类与路由（取值域唯一权威）',
        type: 'pipe',
        items: [
          { kind: 'cmd', label: 'responsibility_class' },
          { kind: 'output', label: '编码修复 / 测试问题 / 需求问题 / 预期失败' },
          { kind: 'output', label: 'next_action' },
          { kind: 'output', label: '本地编码修复 / 上游反馈 / 复测补证据' },
          { kind: 'output', label: 'target_root_cause' },
          { kind: 'output', label: '协议/字段问题 · 状态更新问题 · 组包问题…' },
        ],
        keyline: '「取值域唯一权威」——AI 审核不越界、不臆造新分类。',
      },
      {
        title: 'CI 回归计划（§6）',
        type: 'ul',
        items: [
          '每个 fix-group 绑定回归 TC 清单（如 fix-grp-001 → 6 个 TC）',
          '完成条件：同组 DEF 对应 TC 全部复测通过',
          'CI 回归计划状态更新为 active/verified 才算闭环',
          'KPI 汇总（§7）：def 总数/关闭率/密度——质量度量',
        ],
        keyline: '「修完复测通过才算闭环」——CI 回归计划是闭环的执行抓手。',
      },
    ],
  },
};

export default defectFeedbackChapter;
