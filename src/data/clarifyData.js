/**
 * yxspec-tutor · clarify 章节教学数据
 * 内容来源：yxspec/.claude/commands/yxspec/clarify.md（V2.1）
 * 真实产物：project/inputs/clarify/ + project/tasks/task_clarify.md + traceability/clarify-log-20260728.md
 * 真实运行：2026-07-28 09:30 → 10:01，两段式共 ~34 分钟
 */

/* ---------- 1. 命令总览 ---------- */
export const clarifyOverview = {
  command: '/yxspec:clarify',
  stage: '辅助过程',
  title: '需求澄清',
  oneLiner:
    '把 init 找出的 45 条歧义变成「答题模板」发出去 → 等客户/负责人填答案 → 把答案写回文档副本，让下游不再被模糊需求卡住。',
  analogy:
    '把它想象成「老师给试卷」：把 45 道没答清楚的题整理成 6 张答题卡（按桶分）→ 发给对应的人填 → 收回答案 → 把正确答案抄回课本（parsed/ 副本）。全程脚本自动，唯一要等的就是填答案的人。',
  purpose: {
    oneLiner:
      '把 init 留下的 45 处「说不清楚」变成 45 条「有答案的澄清记录」（CLQ），让下游需求分析不用再对着含糊的原文猜。',
    input: {
      title: '输入：init 的产出',
      items: [
        'amb_index.json —— 45 条歧义（每条：哪份文档哪一行 + 为什么说不清）',
        '各桶歧义清单 bucket_ambiguity_*.json —— 6 份',
        'parsed/ 干净副本 —— 答案要写回这里',
      ],
      note: '没有 init 的产出，clarify 一步都跑不了（门控直接拦截）',
    },
    process: [
      '① 导入：把 45 条 AMB 登记成 45 条 CLQ，从头编号 CLQ-0001..0045',
      '② 打标：规则引擎自动判「多紧急」（blocking 26 / important 15 / minor 4）和「该问谁」（客户、合规、系统工程师…）',
      '③ 切批：按 init 的 6 个桶，生成 6 张答题模板 + 1 份总索引',
      '④ 停下等答案：把模板发给对应的人填（这是唯一需要人的环节）',
      '⑤ 导入答案：回收模板，把答案登记进索引',
      '⑥ 写回：把答案替换进 parsed/ 副本的对应位置，原文留下「已澄清」标记',
      '⑦ 输出决策清单 + 日志：给下游一个「最高优先级约束」文件 + 一页总结',
    ],
    outputs: [
      { name: 'clq_index.json', what: '45 条澄清记录（问题 + 答案 + 状态）', consumer: '下游需求分析逐条引用' },
      { name: 'answered-decisions.md', what: '澄清决策清单（blocking 置顶）', consumer: 'prd/sys/swe 分析的强制约束' },
      { name: 'parsed/ 已写回', what: '副本原文替换为「已澄清」标记', consumer: '系统需求抽取（不再被含糊卡住）' },
    ],
    value: [
      '下游拿到的是「有答案的文档」—— 需求分析不用猜，直接引用 CLQ 的结论',
      'blocking 的 26 条全部闭环，才能判定「可继续推进」—— 这是下游开工的通行证',
      '每一条答案都追溯回 AMB 和原始文档 —— 全流程追溯链在这里补全一环',
    ],
    boundary: [
      '不管「需求对不对、功能该不该有」—— 那是 prd-analysis / sys-elicitation 的事',
      '不修改原始文档（raw/ 永远只读）—— 只写 parsed/ 副本',
      '默认不派 AI（LLM-free）—— 全部脚本确定性处理；AI 只负责可选的措辞润色',
    ],
    example:
      'init 发现规格书写「低功耗电源管理：支持」但没说怎么支持 → clarify 生成问题「触发条件、唤醒源、功耗指标是什么？」→ 答案填上「ACC OFF 5min 休眠、唤醒源 4 种、休眠 ≤3mA」→ 这条结论写回副本，下游 sys-elicitation 直接引用。',
  },
  positioning: [
    '命令只负责「按顺序喊口令」+「到点停下等人」——前半段跑完自动 STOP，等答案填完再喊后半段',
    '真正干活的是脚本（scan_clarify.py）——导入/打标/切批/导入答案/写回/日志全自动',
    '人（客户/负责人）只做一件事——填答题模板，这是全流程第一个必须人参与的环节',
    '一句话：脚本是「试卷机」，人是「答题人」，命令是「监考老师」（到点收卷、检查有没有答完）',
  ],
  whyShell: [
    '为什么这步需要「停下来等人」？—— 因为答案只有客户知道，AI 猜了不算数，这就是「零臆造」的边界',
    '为什么不用 AI 批量回答？—— 早期版本试过 AI 直接答，但 AI 答错会污染整条需求链，返工成本极高；所以默认 LLM-free，AI 只做润色措辞这种不伤筋骨的活',
    '为什么按桶切批？—— init 按桶读的，问题归属哪桶就找哪桶负责人答，不用一个人答 45 题',
  ],
  instance: {
    duration: '30m 25s + 3m 23s',
    durationNote: '两段式：前半段（生成模板）30m 25s，后半段（导入答案+写回）3m 23s',
    clqTotal: 45,
    blocking: 26,
    important: 15,
    minor: 4,
    buckets: 6,
    answered: 45,
    result: 'ok',
    answeredBy: 'AI 基于源文档应答（用户授权方案 A）',
    next: '/yxspec:sys-elicitation',
  },
  ironRules: [
    'step 5 完成后必须停下等人——禁止命令自己越过 STOP 继续跑',
    'step 6 开始前必须确认至少一份模板填了答案——没答案不许导入',
    'raw/ 永远只读——答案只写回 parsed/ 副本',
    '每步先 gate 后 mark-done，rc != 0 立即停',
  ],
};

/* ---------- 2. 9 步流程（两段式：0-5 前半段 → STOP → 6-8 后半段） ---------- */
export const clarifySteps = [
  {
    id: 0, phase: 'front',
    label: '会话启动', name: 'session-start',
    action: '登记这次澄清：建任务台账，给这次运行起编号',
    post: '任务台账里有一行：本次澄清已开始',
    edge: '任务台账（记录已开）',
    why: '所有步骤的记录要有汇总的地方——门控检查靠它放行',
  },
  {
    id: 1, phase: 'front',
    label: '门控检查', name: 'gate-check',
    action: '确认 init 的产出（amb_index.json）存在——没有就先回去跑 init',
    post: '检查通过，台账记「门控检查 ✅」',
    edge: '门控通过',
    why: '防止在没东西可澄清的情况下空跑',
  },
  {
    id: 2, phase: 'front',
    label: '导入歧义', name: 'ingest',
    action: '把 45 条 AMB 登记成 45 条 CLQ，从头编号 CLQ-0001..0045',
    post: 'clq_index.json（45 条）+ 台账记「导入 ✅」',
    edge: '45 条 CLQ（已编号）',
    why: '编号让后面每条问答都能对得上号，不搞混',
  },
  {
    id: 3, phase: 'front',
    label: '优先级打标', name: 'priority',
    action: '规则引擎自动判断每条「多紧急」+「该问谁」——不用人动脑',
    post: '每条 CLQ 带 severity + audience',
    edge: '分级结果（26 必答 / 15 重要 / 4 次要）',
    why: '先分清轻重，答题人只答 blocking 就能推进，不用每题都等',
  },
  {
    id: 4, phase: 'front',
    label: '切批规划', name: 'plan',
    action: '按 init 的 6 个桶登记答题批次——每桶 1 批',
    post: '批次登记完成',
    edge: '6 个答题批次',
    why: '问题归属哪桶就找哪桶负责人答，分发更精准',
  },
  {
    id: 5, phase: 'front',
    label: '生成答题模板', name: 'gen-template',
    action: '生成 6 张答题卡（每桶一张）+ 1 份总索引，全部自动',
    post: '6 份 clq-batch + 1 份 clq-index',
    edge: '6 张答题卡 → 发出去等人填',
    why: '把「要问什么」固化成可分发、可回收的格式',
  },
  // —— 这里是 STOP：等客户/负责人填答案 ——
  {
    id: 6, phase: 'back',
    label: '导入答案', name: 'import-answers',
    action: '收回答题卡，解析里面的 answer 行，登记进索引',
    post: 'clq_index.json 应答状态刷新',
    edge: '45 条答案（已登记）',
    why: '答案只有客户知道，这一步是「人」与「流程」的交接点',
  },
  {
    id: 7, phase: 'back',
    label: '写回副本', name: 'apply-back',
    action: '把答案替换进 parsed/ 副本的对应位置，原文留「已澄清」标记',
    post: 'parsed/ 副本全部替换完成',
    edge: '已澄清的副本 → 下游抽取',
    why: '下游拿到的副本直接带答案，不用再翻原始文档',
  },
  {
    id: 8, phase: 'back',
    label: '导出决策 + 收尾', name: 'gen-log + finalize',
    action: '导出澄清决策清单（blocking 置顶）；写日志；提交保存',
    post: '决策清单 + 日志 + 提交',
    edge: '决策清单 → 下游需求分析',
    why: '给下游一个「最高优先级约束」文件 + 一页总结，收尾留档',
  },
];

/* ---------- 3. 输入 / 输出 / 调用关系 ---------- */
export const clarifyIo = {
  inputs: [
    { name: 'amb_index.json', role: 'init 的核心产出：45 条歧义（每条含来源、描述、影响、建议提问）' },
    { name: 'bucket_ambiguity_*.json', role: '6 份桶级歧义清单（编号分配的原始依据）' },
    { name: 'parsed/', role: '干净副本 —— 答案要写回这里（raw/ 永不改）' },
  ],
  outputs: [
    { name: 'clq_index.json', role: '主数据：45 条 CLQ，含 severity / audience / status / answer' },
    { name: 'clq-index.md', role: '人类可读索引：分布统计 + 按桶汇总 + 答题状态' },
    { name: 'batches/clq-batch-*.md', role: '6 份答题模板（发给客户/负责人填写）' },
    { name: 'answered-decisions.md', role: '澄清决策清单 —— 下游需求分析的强制约束' },
    { name: 'clarify-log-*.md', role: '最终日志：45 条明细 + 统计' },
    { name: 'parsed/（已写回）', role: '副本中含糊行被替换为 [CLARIFIED: CLQ-xxxx | …]' },
    { name: 'task_clarify.md', role: '任务台账：两段会话 + 8 条任务记录' },
  ],
  callGraphs: [
    {
      title: '命令级 · clarify 与上下游的关系',
      color: 'cyan',
      from: { id: 'clarify', cmd: '/yxspec:clarify', sub: '辅助过程 · 半停止编排', desc: '消化 init 的歧义，产出干净的澄清结论给下游' },
      tos: [
        {
          id: 'up-init', cmd: 'init', edge: '45 条歧义清单', edgeDesc: '读 amb_index.json',
          desc: 'init 是上游生产者：没有它产出的歧义清单，clarify 一步都跑不了（门控直接拦截）。',
        },
        {
          id: 'down-sys', cmd: 'sys-elicitation', edge: '已澄清副本 + 决策清单', edgeDesc: '系统需求抽取',
          desc: '下游消费者：blocking 全部答完 → 建议进入系统需求抽取；未答完 → 继续分发批次循环。',
        },
        {
          id: 'side-change', cmd: 'yxspec:change', edge: '答案引发 SOR 级变更（虚线）', edgeDesc: '答案与原文冲突时',
          desc: '当客户答案导致原始需求级变更时，登记变更再走下游。不自动跳。',
          dashed: true,
        },
      ],
    },
    {
      title: '脚本级 · scan_clarify.py 内部调用谁',
      color: 'blue',
      from: { id: 'scan', cmd: 'scan_clarify.py', sub: '13 个子命令入口', desc: '主脚本：指挥 3 个工具模块 + 规则引擎干活' },
      tos: [
        {
          id: 'priority_rules', cmd: 'priority_rules.py', edge: '规则引擎', edgeDesc: '判定 severity / audience',
          desc: '按 category / 来源分区 / 关键词自动判定每条 CLQ 的紧急程度和该问谁——纯规则，无 AI。',
        },
        {
          id: 'clq_io', cmd: 'clq_io.py', edge: '读写 clq_index.json', edgeDesc: '主数据 IO',
          desc: '负责 clq_index.json 的读写：导入、状态刷新、答案登记。',
        },
        {
          id: 'tpl', cmd: 'clq-batch / clq-index 模板', edge: '模板填充', edgeDesc: '生成答题卡与索引',
          desc: '按 templates/ 下的 md 模板填充生成 6 份答题卡 + 1 份总索引。',
        },
      ],
    },
  ],
  pipeline: [
    { seg: 'cmd', label: '/yxspec:clarify' },
    { seg: 'input', label: 'amb_index.json (45 AMB)' },
    { seg: 'script', label: 'ingest' },
    { seg: 'script', label: 'priority' },
    { seg: 'script', label: 'gen-template' },
    { seg: 'output', label: 'batches/clq-batch-*.md ×6' },
    { seg: 'stop', label: '⏸ 停下等人填' },
    { seg: 'script', label: 'import-answers' },
    { seg: 'script', label: 'apply-back' },
    { seg: 'script', label: 'export-decisions' },
    { seg: 'output', label: 'clq_index.json + answered-decisions.md' },
    { seg: 'script', label: 'gen-log' },
    { seg: 'output', label: 'clq-index.md' },
  ],
  components: {
    scripts: [
      { name: 'scan_clarify.py', role: '13 个子命令：9 个流程核心（gate / ingest / priority / gen-template / refresh-index / import-answers / apply-back / export-decisions / gen-log）+ 2 个可选润色（polish-export / polish-merge）+ task 台账（session-open / close / row-add / row-update / plan-record / integrity-check）', core: true },
      { name: 'priority_rules.py', role: 'severity 规则引擎：按 category / 分区 / 关键词判定 blocking / important / minor', core: false },
      { name: 'clq_io.py', role: 'clq_index.json 主数据读写', core: false },
      { name: 'polish worker（可选）', role: 'sonnet 模型润色问题措辞 —— 默认关闭，只改 suggested_question 一列', core: false },
    ],
  },
  gateTable: [
    { step: 0, name: 'session-start', post: 'task_clarify.md 含 running session', phase: '前半段' },
    { step: 1, name: 'gate-check', post: 'CLARIFY-GATE done=true', phase: '前半段' },
    { step: 2, name: 'ingest', post: 'clq_index.json + CLARIFY-INGEST done=true', phase: '前半段' },
    { step: 3, name: 'priority', post: '所有 CLQ 含 severity + done', phase: '前半段' },
    { step: 4, name: 'plan', post: 'CLARIFY-PLAN done=true', phase: '前半段' },
    { step: 5, name: 'gen-template', post: 'clq-index.md + 每桶 1 份 batch + done', phase: '前半段' },
    { step: 6, name: 'import-answers', post: 'CLARIFY-IMPORT done=true + 索引状态刷新', phase: '后半段' },
    { step: 7, name: 'apply-back', post: 'CLARIFY-APPLY done=true（副本替换完成）', phase: '后半段' },
    { step: 8, name: 'gen-log + finalize', post: 'clarify-log + session 关闭 + git commit', phase: '后半段' },
  ],
  failures: [
    { fault: 'gate rc != 0', action: '按 missing 字段回到对应 step 补产物；禁跳过' },
    { fault: 'import-answers 报错', action: '常因 CLQ-ID 拼写错或模板被改坏；对照 clq_index.json 修正后重跑' },
    { fault: 'apply-back skipped 多', action: 'parsed/ 副本被别的流程改过；提示 diff 或重跑 init' },
    { fault: '用户跳过 STOP 直接 import', action: 'gate --step 6 会检查 step 5 的产物，通不过自动回退' },
    { fault: 'blocking 有未答', action: 'gen-log 不失败但标「可继续推进=false」，提示客户补答' },
  ],
};

/* ---------- 4. 产物实例 ---------- */
export const clarifyArtifacts = [
  { name: 'clq_index.json', kind: 'cyan', what: '45 条澄清记录主数据：问题 + 分级 + 状态 + 答案', who: '下游需求分析逐条引用；脚本读写它' },
  { name: 'clq-index.md', kind: 'cyan', what: '人看的总索引：分布统计 + 按桶汇总 + 答没答', who: '项目成员看「澄清到哪了」，答辩用' },
  { name: 'batches/clq-batch-*.md', kind: 'amber', what: '6 张答题卡：每条 CLQ 一问一答 + 填写约定', who: '发给客户/负责人填 —— 流程的「人」环节' },
  { name: 'answered-decisions.md', kind: 'amber', what: '澄清决策清单（blocking 置顶、按来源分章）', who: 'prd/sys/swe 分析的强制约束 —— 最高优先级' },
  { name: 'parsed/ 已写回', kind: 'green', what: '副本中含糊行替换为 [CLARIFIED: CLQ-xxxx | …]', who: '系统需求抽取 —— 直接读结论不再猜' },
  { name: 'clarify-log-*.md', kind: 'green', what: '最终日志：45 条明细 + 统计 + 下一步建议', who: '留档 + 答辩证据' },
  { name: 'task_clarify.md', kind: 'green', what: '任务台账：2 段会话 + 8 条任务记录', who: '门控放行依据 + 答辩证据链' },
];

/* ---------- 5. CLQ 真实样例（来自 clq_index.json） ---------- */
export const clqSamples = [
  {
    id: 'CLQ-0001',
    fromAmb: 'AMB-001',
    severity: 'blocking',
    audience: '客户/PM',
    question: '低功耗电源管理的触发条件、唤醒源及各级功耗指标分别是什么？',
    answer: '休眠进入=ACC OFF 且无上报任务持续 5min；唤醒源=ACC ON/一线通数据/定时心跳 1h/远程指令；功耗：休眠≤3mA，平均≤45mA，最大 1A@4V',
    confidence: 'medium',
    note: '功耗值来自规格书 §3，时长/唤醒源为推荐值待确认',
  },
  {
    id: 'CLQ-0009',
    fromAmb: 'AMB-009',
    severity: 'blocking',
    audience: '客户/PM',
    question: '蓝灯「慢闪=连接成功/常亮=连接失败」是否为笔误？请确认各状态对应的灯效。',
    answer: '疑似笔误（成功闪烁/失败常亮反直觉），建议改为：常亮=成功，慢闪=连接中，熄灭=未连接/SIM 未识别',
    confidence: 'medium',
    note: '「疑似笔误」属于推断，最终灯效设计意图需客户确认',
  },
  {
    id: 'CLQ-0016',
    fromAmb: 'AMB-016',
    severity: 'blocking',
    audience: '合规/PM',
    question: 'TBOX 通过 4G 下发的远程控车指令（锁车/解锁/设防/寻车等）是否属于法规禁止的「物联网技术」改装？',
    answer: 'C25 出厂原装集成（非售后加装），4G 远程控车不违反 §6.8.2 h)4)（该条针对售后市场非法改装）；边界=仅车主授权指令+机械钥匙优先',
    confidence: 'medium',
    note: '合规边界解读需合规方签字确认',
  },
  {
    id: 'CLQ-0024',
    fromAmb: 'AMB-024',
    severity: 'blocking',
    audience: '客户/系统工程师',
    question: '报警状态码 0x0C 的正式定义是哪一个（密码错误 5 次 or 开机报警）？',
    answer: '协议 V1.0.63 L311 存在笔误：同一码 0x0C 定义两次。建议保留 0x0C=开机报警，密码错误改用未占用码如 0x36',
    confidence: 'medium',
    note: '码值分配需协议方定夺',
  },
  {
    id: 'CLQ-0040',
    fromAmb: 'AMB-040',
    severity: 'blocking',
    audience: '客户/系统工程师',
    question: 'C25 TBOX 的一线通 COM 接口上拉电平应选 5V/2.2K 还是 3.3V/1K？',
    answer: '选 5V/2.2K —— 规格书「双向一线通 5V」+ BMS 协议「建议 5V VCC 上拉」+「VCC=5V, R1=R2=2.2K」三方互证',
    confidence: 'batch_code_wins',
    note: '这个答案是从 3 份文档交叉验证推出来的 —— 置信度最高的一档',
  },
];

/* ---------- 6. 流程总览图节点数据（clarify 9 步两段式可视化） ---------- */
export const clarifyFlowNodes = [
  { id: 0, name: '会话启动', icon: '▶', color: 'blue', real: '登记这次澄清' },
  { id: 1, name: '门控检查', icon: '🔒', color: 'amber', real: '确认 init 产物在' },
  { id: 2, name: '导入歧义', icon: '📥', color: 'cyan', real: '45 AMB → 45 CLQ' },
  { id: 3, name: '优先级打标', icon: '🏷️', color: 'cyan', real: '26 必答 / 15 重要 / 4 次要' },
  { id: 4, name: '切批规划', icon: '📦', color: 'cyan', real: '按 6 桶登记批次' },
  { id: 5, name: '生成答题模板', icon: '📝', color: 'cyan', real: '6 张答题卡 + 1 份索引' },
  { id: 'STOP', name: '停下等人填', icon: '⏸', color: 'stop', real: '唯一需要人的环节' },
  { id: 6, name: '导入答案', icon: '📥', color: 'blue', real: '回收模板登记答案' },
  { id: 7, name: '写回副本', icon: '🔄', color: 'blue', real: 'parsed/ 替换为已澄清' },
  { id: 8, name: '导出决策 + 收尾', icon: '✅', color: 'green', real: '决策清单 + 日志 + 提交' },
];
