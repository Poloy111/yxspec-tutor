/**
 * yxspec-tutor 教学数据
 * 内容来源：yxspec/.claude/commands/yxspec/init.md（V2.0）
 * 真实产物：project/inputs/ 下实际文件（2026-07-28 实跑记录）
 */

/* ---------- 1. init 命令总览 ---------- */
export const initOverview = {
  command: '/yxspec:init',
  stage: 'ACQ.4',
  title: 'SOR 文档解析',
  oneLiner:
    '把上游原始需求文档（SOR，即 Statement of Requirements）扫描、分桶、复制、交给 AI Worker 识别歧义，合并编号，最后生成解析摘要 —— 为下游澄清与需求分析提供结构化输入。',
  // 一句话比喻（给初学者）
  analogy:
    '把 init 想象成一条「自动图书整理流水线」：先盘点仓库里有哪些书（扫描）→ 把书分成几摞（分桶）→ 复印一份到工作台（复制）→ 每个 AI 工人负责一摞，找出书里写得含糊的地方贴便签（歧义识别）→ 把所有便签汇总编号（合并）→ 最后写一份目录清单（摘要）。你只需按下「开始」，流水线自己跑完。',
  // 具体描述：这一阶段到底在干嘛
  purpose: {
    oneLiner:
      '把上游 16 份原始需求文档，变成「后续所有阶段都能用的、且已知 45 处疑点」的结构化输入 —— 这是全流程第 1 步，后面每个阶段（需求/架构/编码/测试）的依据都从这里开始。',
    input: {
      title: '输入：上游甩来的 16 份原始文档（4 类）',
      items: [
        '产品规格书 —— 客户对 TBOX 的功能要求（台铃 C25 4G 智能中控）',
        '法规要求 —— GB_17761-2024 电动自行车新国标等',
        '企业标准 —— 定位终端技术要求 / 线束要求',
        '开发协议 —— MQTT / BLE / BMS 通讯协议、一线通加密算法',
      ],
      note: '问题：格式不一、内容有含糊、前后可能矛盾 —— 不能直接拿去开发',
    },
    process: [
      '① 盘点：把 16 份文档全部扫一遍，登记造册，每个文件算指纹（manifest.json）',
      '② 分组：把文档分成 7 组，每组交给一个 AI 分批精读（bucket_plan.json）',
      '③ 精读找毛病：AI 逐字读，标出所有「没说清楚 / 前后矛盾 / 缺定义」的地方，共 45 处',
      '④ 汇总：把 45 处疑点合成一张清单，从头编号 AMB-001..045（amb_index.json）',
    ],
    outputs: [
      { name: 'amb_index.json', what: '45 条疑点清单（最重要的交接物）', consumer: '下游 clarify 逐条澄清' },
      { name: 'parse-summary.md', what: '解析摘要 —— 记录这次干了什么；下次运行靠它判断文档变了没', consumer: '人看 + 下次 init 的 resume 比对' },
      { name: 'parsed/', what: '干净副本', consumer: 'sys-clarify / sys-analysis 抽取需求' },
    ],
    value: [
      '让下游阶段（需求/架构/编码/测试）拿到「干净且已知疑点」的输入，不用自己再翻原始文档',
      '45 处疑点交给 clarify 逐条澄清 —— 避免「基于错误理解开发」（返工成本最大）',
      '全流程追溯链从这里开始：后面每个产物的 derived_from 都能追到原始文档',
    ],
    boundary: [
      '不管「产品该有哪些功能」—— 那是 prd-analysis 的事',
      '不管「系统怎么设计」—— 那是 sys-arch 的事',
      'init 只做一件事：把原始文档变成「可用且已知疑点」的输入',
    ],
    example:
      '规格书第 4.1 节写「低功耗电源管理：支持」，但没写怎么支持 —— AI 标成 AMB-001。下游 clarify 就要去问客户：低功耗模式是什么？怎么唤醒？要不要测试？',
  },
  positioning: [
    '命令只负责「按顺序喊口令」——先做什么、后做什么、每步做完检查没，它自己不动手',
    '真正干活的是脚本（scan_init.py）——扫描/分桶/复制/编号/写摘要都是它做的，命令只是调它',
    'AI Worker 只做一件事——读文档、找歧义，把结果写成 JSON',
    '一句话：命令是「监工」，脚本是「工人」，AI Worker 是「质检员」',
  ],
  whyShell: [
    '早期版本（V1.x）是「一个 AI 全干」：扫盘、复制、识别、摘要、提交全都一个 agent 做。文件一多（几百个），AI 的上下文窗口就装不下了，直接崩。',
    'V2.0 改成「分工」：确定性的事（复制、编号）交给脚本，AI 只做它擅长的事（找歧义）。这就是为什么要拆开。',
    '这个「监工 - 工人 - 质检员」的分工，就是考核要讲的「AI 协同机制」。',
  ],
  outputs: [
    'project/inputs/parsed/',
    'project/inputs/parse-summary.md',
    'project/inputs/manifest.json',
    'project/tasks/task_init.md',
  ],
  firstPrinciple: [
    'Worker 仅识别歧义 — 复制 / 转换 / 编号 / 提交全部由 scan_init.py + 编排器完成',
    '零臆造 — AMB 必须有具体行/章节定位',
    '只读 raw/ — 全流程 raw/ 永远只读',
    '断点续传 — manifest SHA-256 对比命中则 copy/转换跳过',
    'single-writer parse-summary.md — 仅 scan_init.py gen-summary 可写',
  ],
  // 真实运行实例（来自仓库 task_init.md / manifest.json / parse-summary.md）
  instance: {
    sessionId: 'S20260728-085440',
    date: '2026-07-28 08:54:40 → 09:01:59',
    duration: '7m 19s',
    mode: 'FULL',
    rawFiles: 16,
    buckets: 7,
    nativeBuckets: 6,
    convertBuckets: 0,
    attachmentBuckets: 1,
    workerBuckets: 6,
    ambTotal: 45,
    result: 'ok',
  },
};

/* ---------- 2. 9 步流程契约（L2 核心，硬门控）—— 纯白话版 ---------- */
export const steps = [
  {
    id: 0,
    name: 'session-start',
    label: '会话启动',
    post: '任务台账里有一行：本次解析已开始',
    edge: '任务台账（记录已开）',
    action: '登记这次运行：建一本「任务台账」，给这次解析起编号，以后每一步做了什么、花了多久都记进台账',
    why: '所有步骤的记录都要有个汇总的地方——门控检查靠它放行，答辩靠它证明你每一步都做过',
  },
  {
    id: 1,
    name: 'gate-check',
    label: '门控检查',
    post: '检查通过，台账记下「门控检查 ✅」',
    edge: '门控通过',
    action: '正式开工前的检查：确认原始文档文件夹存在、里面至少有一份文档，才能往下走',
    why: '防止在没东西可解析的情况下空跑，浪费算力',
  },
  {
    id: 2,
    name: 'scan-manifest',
    label: '扫描清单',
    post: '文件清单（16 份文档 + 指纹）',
    edge: '文件清单（16 份文档）',
    action: '把原始文档文件夹里的所有文档扫一遍，每份算一个「指纹」（内容摘要），做成文件清单',
    why: '指纹用来判断文档有没有变——下次再跑时一比对就知道哪些要重新解析',
  },
  {
    id: 3,
    name: 'resume-probe',
    label: '断点续传判定',
    post: '确定本次模式：FULL（全新解析）',
    edge: '模式：FULL 全新解析',
    action: '看看是不是第一次跑：是 → 全量解析；之前跑过 → 只处理变了的文档（增量）',
    why: '文档没变的部分没必要重跑，省时间',
  },
  {
    id: 4,
    name: 'bucket-plan',
    label: '切桶规划',
    post: '分组方案（7 组：6 组 AI 读 + 1 组附件）',
    edge: '分组方案（7 组）',
    action: '把文档分成几组（每组不超过 15 份 / 300KB），方便 AI 分批读',
    why: '文档太多一次读不完，分组并行能快很多',
  },
  {
    id: 5,
    name: 'pre-copy',
    label: '副本复制',
    post: '工作副本就绪',
    edge: '工作副本',
    action: '把文档复制一份到工作区，AI 只读副本——原始文档永远不动',
    why: '原始文档是客户给的，绝不能改；改坏了没法向客户交代',
  },
  {
    id: 6,
    name: 'worker-spawn',
    label: 'Worker 并发派发',
    post: '6 份歧义清单（每组一份）',
    edge: '6 份歧义清单',
    action: '给每组文档派一个 AI「质检员」：逐字读文档，找出所有说得含糊、前后矛盾、缺定义的地方，记成「歧义清单」',
    why: 'AI 一次只能读有限的量，分给多个 AI 并行读，又快又不漏',
  },
  {
    id: 7,
    name: 'ambiguity-merge',
    label: 'AMB 合并编号',
    post: '总歧义清单（45 条，已编号）',
    edge: '总歧义清单（45 条）→ 交给 clarify 澄清',
    action: '把 6 份歧义清单拼成一张总清单，从头到尾编号（第 1 条、第 2 条……）',
    why: '编号是为了下游澄清时能逐条对得上号，不会搞混',
  },
  {
    id: 8,
    name: 'summary-gen',
    label: '摘要生成 + 收尾',
    post: '一页总结 + 全部产物已保存',
    edge: '一页总结 + 已保存',
    action: '把这次解析的成果写成一页总结；检查所有记录完整；然后自动提交保存',
    why: '总结给人看（答辩一页讲完）；保存让下次能接着跑',
  },
];

/* ---------- 3. 输入 / 输出 / 调用关系 ---------- */
export const io = {
  inputs: [
    { name: 'project/inputs/raw/', role: '上游原始 SOR 文档（只读，永不修改）', sample: '01产品需求规格书/02法规要求/03台铃企业标准/04开发协议/09包装' },
    { name: 'project/config/yxspec.json', role: 'SPEC_ID 命名配置（本仓库实际 spec_id=trainees-2026）', sample: 'spec_id: trainees-2026' },
    { name: 'task_init.md（若有）', role: '历史会话/任务文件（断点续传判定依据）', sample: '前次 session 记录' },
    { name: 'bucket_plan.json（若有）', role: '历史切桶计划（resume 计算 impacted_buckets 用）', sample: '7 桶计划' },
  ],
  outputs: [
    { name: 'project/inputs/manifest.json', role: '扫描清单：文件路径 + SHA-256 + 类型 + 解析状态', sample: '16 条 entry' },
    { name: 'project/inputs/bucket_plan.json', role: '切桶计划：7 桶、每桶文件列表、total_size、skip_worker', sample: 'INIT-W01..W06 + attachment' },
    { name: 'project/inputs/parsed/', role: 'raw/ 副本（native + attachment），SHA 一致，只读原则保障', sample: '01~04、09 分区' },
    { name: 'project/inputs/extracted/init/bucket_ambiguity_*.json', role: '每桶歧义识别结果（6 份）', sample: 'bucket_id + ambiguities[]' },
    { name: 'project/inputs/extracted/init/amb_index.json', role: '合并后的全局 AMB 索引（AMB-001..045）', sample: '{count:45, items[]}' },
    { name: 'project/inputs/parse-summary.md', role: '解析摘要（文件映射表 + 桶并发统计 + 统计概览）', sample: 'parse-summary-20260728-090156' },
    { name: 'project/tasks/task_init.md', role: '阶段任务文件：会话日志 + 规划节点 + 任务表 + 规划vs实际', sample: '15 个任务行 + 1 session' },
  ],

  // 调用关系可视化（三张图：命令级 / 脚本级 / Worker 级）
  callGraphs: [
    {
      title: '命令级 · init 完成后调谁',
      color: 'cyan',
      from: { id: 'init', cmd: '/yxspec:init', sub: 'ACQ.4 · SOR 解析', desc: 'init 跑完后，根据结果「建议」下游命令（不自动跳，人决定）' },
      tos: [
        {
          id: 'clarify', cmd: 'clarify', edge: '45 条歧义清单', edgeDesc: '把 45 处「说不清楚」的地方逐条问清楚',
          desc: '读 init 找出的歧义清单，逐条向客户澄清，生成澄清矩阵。',
        },
        {
          id: 'sys', cmd: 'sys-clarify / sys-analysis', edge: '解析好的文档副本', edgeDesc: '用解析好的文档副本抽取系统需求',
          desc: '当文档没有歧义时，直接进系统需求分析：从副本抽取需求。',
        },
        {
          id: 'change', cmd: 'yxspec:change', edge: '文档有更新时（虚线）', edgeDesc: '文档更新过才需要',
          desc: '如果文档后来被更新了，先登记变更，再决定哪些下游要重跑。不自动跳。',
          dashed: true,
        },
      ],
    },
    {
      title: '脚本级 · scan_init.py 内部调用谁',
      color: 'blue',
      from: { id: 'scan', cmd: 'scan_init.py', sub: '12 个子命令入口', desc: '主脚本，负责指挥 4 个工具模块干活' },
      tos: [
        {
          id: 'manifest_io', cmd: 'manifest_io.py', edge: '扫描 + 算指纹', edgeDesc: '算每个文件的指纹',
          desc: '扫描文档目录，给每份文档算指纹（内容摘要），用来判断文档变没变。',
        },
        {
          id: 'planner', cmd: 'bucket_planner.py', edge: '切桶算法', edgeDesc: '把文件分组',
          desc: '把文档分成小组（每组限量），方便 AI 分批读。',
        },
        {
          id: 'merger', cmd: 'amb_merger.py', edge: '合并 + 编号', edgeDesc: '汇总歧义清单',
          desc: '把各组的歧义清单拼成一张总清单，从头编号，并写回工作副本。',
        },
        {
          id: 'xref', cmd: 'xref_scan.py', edge: '跨文档引用预扫', edgeDesc: '查文档互相引用',
          desc: '预扫文档间互相引用的关系，引用密切的文档尽量分到同一组，AI 读起来更连贯。',
        },
      ],
    },
    {
      title: 'Worker 级 · 编排器派谁读文档',
      color: 'amber',
      from: { id: 'orch', cmd: '编排器（主会话）', sub: 'spawn Agent', desc: '为每个桶派一个 AI Worker 读文档找歧义' },
      tos: [
        {
          id: 'native', cmd: 'yxspec-init-native-worker', edge: '普通文档组', edgeDesc: '读普通文档',
          desc: '读普通文档（如 md 格式），负责找歧义，交回「歧义清单」。',
        },
        {
          id: 'convert', cmd: 'yxspec-init-convert-worker', edge: '需转换的文档组（虚线）', edgeDesc: '读需转换的文档（xlsx 等）',
          desc: '读需要转换格式的文档（如表格），先转成可读格式再找歧义。本次没有这类文档。',
          dashed: true,
        },
      ],
    },
  ],
};

/* ---------- 4. 脚本 / Worker 明细 ---------- */
export const components = {
  scripts: [
    { name: 'scan_init.py', role: '12 个子命令入口：9 个流程核心（gate / manifest / resume / plan / copy-native / brief / merge-amb / gen-summary / task）+ 3 个辅助（scan-xrefs 跨文档引用预扫 / gen-scope 范围草稿 / incremental-prep 增量桶准备）', core: true },
    { name: 'manifest_io.py', role: '扫描 + SHA-256 + diff 比对', core: false },
    { name: 'bucket_planner.py', role: '切桶算法：按顶层分区排序 + 贪心装桶（max_files/max_kb）；A2 连通分量优先同桶；attachment 归一桶 INIT-ATT（skip_worker）', core: false },
    { name: 'amb_merger.py', role: 'AMB 合并 + 全局编号 + 副本回写 Clarification Notes + CLQ 查表', core: false },
    { name: 'xref_scan.py', role: '跨文档引用预扫（A2）：构建引用连通分量 + 桶外被引用文档摘要', core: false },
  ],
  workers: [
    { name: 'yxspec-init-native-worker', model: 'sonnet', role: 'native 桶：模式匹配为主，无需深推理；识别歧义输出 bucket_ambiguity_*.json' },
    { name: 'yxspec-init-convert-worker', model: 'sonnet', role: 'convert 桶：调 skill（如 xlsx）+ 简单歧义识别' },
  ],
  retry: '失败 → 同模型 retry 1 次 → 仍失败 → session=gate_failed，人工介入',
  gateTable: [
    { step: 0, name: 'session-start', post: 'task_session_row' },
    { step: 1, name: 'gate-check', post: 'task_row_done:INIT-GATE' },
    { step: 2, name: 'scan-manifest', post: 'manifest_file' },
    { step: 3, name: 'resume-probe', post: 'task_row_done:INIT-RESUME' },
    { step: 4, name: 'bucket-plan', post: 'bucket_plan_file + task_row_done:INIT-PLAN' },
    { step: 5, name: 'pre-copy', post: 'parsed_native_ready + task_row_done:INIT-COPY' },
    { step: 6, name: 'worker-spawn', post: 'bucket_ambiguity_all + task_row_done:INIT-WORKER-ALL' },
    { step: 7, name: 'ambiguity-merge', post: 'amb_index_file + task_row_done:INIT-MERGE' },
    { step: 8, name: 'summary-gen', post: 'parse_summary_file + task_row_done:INIT-SUMMARY' },
  ],
};

/* ---------- 5. 目录结构（考核维度①工程目录框架） ---------- */
export const projectTree = [
  { depth: 0, type: 'dir', name: 'yxsepc_v4_tailg_zhengyonghong/', note: '主仓根（每人一个分支）' },
  { depth: 1, type: 'dir', name: 'yxspec/', note: 'YXSpec 框架仓库（git submodule）' },
  { depth: 2, type: 'dir', name: '.claude/commands/yxspec/', note: '命令入口（init.md / clarify.md / swe-*.md / sqt-*.md…）' },
  { depth: 2, type: 'dir', name: '.claude/agents/', note: 'V3 阶段 agent（yxspec-init-*-worker / yxspec-swe-*…）' },
  { depth: 2, type: 'dir', name: '.claude/skills/', note: '技能插件（init-pipeline / clarify-pipeline / task-file…）' },
  { depth: 2, type: 'dir', name: 'templates/', note: '文档模板（md/init-brief.md.tpl、md/parse-summary.md.tpl…）' },
  { depth: 1, type: 'dir', name: 'project/inputs/raw/', note: '原始 SOR 文档（只读）' },
  { depth: 1, type: 'dir', name: 'project/inputs/parsed/', note: '解析后副本（init 产物）' },
  { depth: 1, type: 'dir', name: 'project/inputs/extracted/', note: 'Pipeline 中间提取物（init/、PRD/、sys/、swe-arch/…）' },
  { depth: 1, type: 'dir', name: 'project/inputs/baselines/', note: '基线绑定文件' },
  { depth: 1, type: 'dir', name: 'project/inputs/clarify/', note: '澄清模板与答案' },
  { depth: 1, type: 'dir', name: 'project/knowledge/', note: '上游源知识库（wiki，索引/综合页）' },
  { depth: 1, type: 'dir', name: 'project/specs/', note: '各阶段规格书产出（prd/ sys/ sw-srs/ sw-arch/ sqt-*/…）' },
  { depth: 1, type: 'dir', name: 'project/traceability/', note: '追溯日志' },
  { depth: 1, type: 'dir', name: 'project/changes/', note: '变更记录' },
  { depth: 1, type: 'dir', name: 'project/config/yxspec.json', note: '项目配置（spec_id）' },
  { depth: 1, type: 'dir', name: 'project/tasks/', note: '各阶段任务文件（task_init.md / task_clarify.md…）' },
  { depth: 1, type: 'dir', name: 'project/source/sdk/', note: '嵌入式 SDK（git submodule）' },
  { depth: 1, type: 'dir', name: 'project/source/app_src/', note: '应用层源码（git submodule）' },
  { depth: 1, type: 'dir', name: 'project/tests/', note: '测试代码与报告' },
  { depth: 1, type: 'dir', name: 'scripts/', note: '流水线脚本' },
  { depth: 1, type: 'dir', name: 'templates/', note: '文档模板' },
];

/* ---------- 6. AMB 真实样例（来自 bucket_ambiguity_init-w01.json） ---------- */
export const ambSamples = [
  {
    id: 'AMB-001',
    local: 'INIT-W01-001',
    bucket: 'INIT-W01',
    src: '01产品需求规格书/客户输入/台铃C25_4G智能中控产品规格书_V1.0.md',
    line: 'L70 · 4.1 第 5 条',
    category: 'incomplete',
    desc: '产品功能表中「低功耗电源管理」支持方式为「支持」，但说明列为空，未描述低功耗模式、唤醒条件、电源管理的测试。',
    impact: '无法据此推导低功耗电源管理相关的系统测试需求。',
  },
  {
    id: 'AMB-002',
    local: 'INIT-W01-002',
    bucket: 'INIT-W01',
    src: '01产品需求规格书/客户输入/台铃C25_4G智能中控产品规格书_V1.0.md',
    line: 'L71 · 4.1 第 6 条',
    category: 'incomplete',
    desc: '产品功能表中「自动自检」支持方式为「支持」，但说明列为空，未描述自检项、自检方法、自检结果上报方式。',
    impact: '无法明确 TBOX 自检范围与自检结果上报机制。',
  },
  {
    id: 'AMB-003',
    local: 'INIT-W01-003',
    bucket: 'INIT-W01',
    src: '01产品需求规格书/客户输入/台铃C25_4G智能中控产品规格书_V1.0.md',
    line: 'L76 · 4.1 第 11 条',
    category: 'incomplete',
    desc: '产品功能表中「中控控制功能」支持方式为「支持」，但说明列为空，未描述中控控制功能的职责与范围。',
    impact: '该功能为 TBOX 核心职责，直接影响系统功能分解。',
  },
  {
    id: 'AMB-045',
    local: 'INIT-W06-005',
    bucket: 'INIT-W06',
    src: '09包装/台铃镭雕要求.md',
    line: 'L25, L34',
    category: 'ambiguous',
    desc: '镭雕区域与包装要求（「老款/新款」「内外包装」）存在多个日期（如 2025-09-01 生效）与适用标准，生效日期与标准适用关系不明确。',
    impact: '无法确定 C25 产品镭雕区域中的日期参数应使用哪一版标准（新旧版本）。',
  },
];

/* ---------- 7. 门控机制 ---------- */
export const gating = {
  rule: '每步进入前必须 scan_init.py gate --step N，rc != 0 立即停步；每步完成后必须 scan_init.py gate --step N --mark-done。',
  ironRules: [
    '每步第一动作必须是 gate --step N；rc != 0 → 停 session（result=gate_failed）',
    '每步最后动作必须是 gate --step N --mark-done；rc != 0 → 回退重做',
    '禁止合并 Step 4~7 为一次 spawn；Step 6 必须逐桶产出 brief + JSON 后才进入 Step 7',
    '派发 Worker 前必须 Read .claude/agents/yxspec-init-{native,convert}-worker.md（_base.md 第 12 条）',
  ],
  failures: [
    { fault: 'gate rc != 0', action: '按输出 missing 字段回到对应 step 补产物；禁跳过' },
    { fault: 'Worker 返回非合法 JSON', action: 'retry 1 次同入参；再失败 row-update failed，列入 unresolved' },
    { fault: 'Worker 触碰 raw/ 文件', action: '系统层不会发生（agent tools 不含 Read raw 限制；通过 brief 指引避免）' },
    { fault: 'convert skill 失败（如 xlsx）', action: 'row-update failed；提示用户人工转换或更新 skill' },
    { fault: 'INCREMENTAL 模式下游 specs/ 已存在', action: 'summary 末尾标 ⚠ 建议手动 /yxspec:change（不自动跳）' },
    { fault: 'AMB 编号断裂', action: 'assign_global_ids 保证连续；如发现断裂检查 bucket_ambiguity_*.json 是否有桶丢失' },
    { fault: 'parsed/ 副本被人工修改', action: 'merge-amb 写入前先 strip 旧 Clarification Notes 段；提示在副本之外编辑' },
  ],
};

/* ---------- 8. 门控/追溯/AI 协同（考核三个机制） ---------- */
export const mechanisms = [
  {
    key: '门控机制 Gate',
    role: '每一步进入前 gate --step N，完成后 --mark-done；rc != 0 立即停步，防跳步、防漏产物',
    example: 'Step 6 若某桶 bucket_ambiguity 未生成，gate --step 6 会报 missing 并阻止进入 Step 7',
  },
  {
    key: '追溯机制 Traceability',
    role: '每任务行含 id / type / module / action / verify / done / started_at / finished_at / duration；session 记录 code_baseline + module_scope + result',
    example: 'task_init.md 中 INIT-GATE → INIT-MANIFEST → … 每个任务行可追溯到 verify 条件与时间戳',
  },
  {
    key: 'AI 协同机制 AI-collaboration',
    role: '编排器（Claude 主会话）负责流程契约与调度；Python 脚本负责确定性操作；AI Worker 负责歧义识别；三者各司其职',
    example: 'scan_init.py 复制/编号（确定性）→ Worker 识别歧义（智能）→ merge-amb 合并编号（确定性）',
  },
];

/* ---------- 9. 答辩要点（考核①流程理解 A 级） ---------- */
export const defensePoints = [
  '完整讲解 YXSpec 工程目录结构，说明各目录、配置文件、过程资产的作用',
  '按工作流顺序依次手动执行各阶段 Command，形成完整执行记录',
  '通过 AI 辅助分析每个 Command 的输入、输出及调用关系',
  '讲清门控（gate --step N）、追溯（任务行 verify/time）、AI 协同（编排器/脚本/Worker 分工）机制',
];
/* ---------- 10. 考核对标 ---------- */
export const examMapping = {
  phase1: '阶段一：按 yxspec 工作流从 yxspec:init 执行到 yxspec:swe-coding-verify-pc，完成 MQTT 功能在 PC 端的验证',
  phase1Steps: [
    '1. yxspec:init → 结构化 PRD',
    '2. yxspec:clarify → CLQ 澄清矩阵',
    '3. yxspec:prd-analysis → PRD 文档',
    '4. yxspec:sys-arch → SYS-ARCH（系统架构设计）',
    '5. yxspec:swe-analysis → SW-SRS（软件需求）',
    '6. yxspec:swe-arch → SW-ARCH（软件架构）',
    '7. yxspec:swe-arch-if → IF-MOD（接口契约）',
    '8. yxspec:swe-coding-plan → swe-coding-do → MQTT 功能源代码',
    '9. yxspec:swe-coding-verify-pc → PC 端验证报告（MQTT 功能通过）',
  ],
  weight1: '① 流程理解 25 分（A 级 22-25）',
  weight2: '② 阶段一 45 分（时间 10 + 实操 35）',
  weight3: '③ 阶段二方案一 SQT 最高 30 分',
  weight4: '④ 阶段二方案二 每条采纳 +5 分',
};

/* ---------- 10b. 全工作流关系图数据 —— 基于真实执行记录 ----------
 * 来源：git log + project/tasks/*.md 会话时间 + project/specs 产物 +
 *       Knowledge/yxspec-summary/考核评审汇报-20260804.md（权威流程链）
 * 结构：一张图，节点 = 命令，边 = 真实依赖关系（实线=实际执行 / 虚线=支撑关系）
 */
export const graphNodes = [
  // 阶段一（cyan）
  { id: 'init', cmd: 'init', label: 'SOR 解析', stage: 'ACQ.4', out: '解析产物（清单/副本/歧义）', real: '', color: 'phase1', icon: '📄', desc: '阶段一第 1 节点：把原始需求文档变成「干净 + 已知疑点」的结构化输入。' },
  { id: 'clarify', cmd: 'clarify', label: '需求澄清', stage: '—', out: 'CLQ 澄清矩阵（45 CLQ）', real: '', color: 'phase1', icon: '❓', desc: '读 init 找出的 45 条歧义，逐条向客户问清楚，生成澄清矩阵。' },
  { id: 'prd-analysis', cmd: 'prd-analysis', label: '产品需求', stage: 'SYS.1', out: 'PRD 文档（373 条）', real: '', color: 'phase1', icon: '📝', desc: '基于澄清闭环 + 解析副本，产出产品需求文档（PRD，373 条）。' },
  { id: 'sys-analysis', cmd: 'sys-analysis', label: '系统需求', stage: 'SYS.2', out: '系统需求（374 条 SR）', real: '', color: 'phase1', icon: '🧩', desc: '把 PRD 的 373 条产品需求转成 374 条系统需求。' },
  { id: 'sys-arch', cmd: 'sys-arch', label: '系统架构', stage: 'SYS.3', out: '系统架构（14 子系统）', real: '', color: 'phase1', icon: '🏗️', desc: '把系统需求设计成架构：14 个子系统、4 层软件；此后向下游分叉为硬件支（HWE.1）与软件支（SWE.1）两条并行链。' },
  { id: 'hwe-analysis', cmd: 'hwe-analysis', label: '硬件分析', stage: 'HWE.1', out: '硬件需求分析', real: '', color: 'phase1', icon: '🔧', desc: '硬件支（HWE.1）：系统架构后与软件需求分析并行开展，做硬件选型/接口/功耗/EMC/散热分析。' },
  { id: 'swe-analysis', cmd: 'swe-analysis', label: '软件需求', stage: 'SWE.1', out: '软件需求（420 条）', real: '', color: 'phase1', icon: '🧠', desc: '软件支（SWE.1）：与硬件分析并行开展，把系统需求细化成 420 条软件需求（功能 356 + 接口 64）。' },
  { id: 'swe-arch', cmd: 'swe-arch', label: '软件架构', stage: 'SWE.2', out: '软件架构（57 模块）', real: '', color: 'phase1', icon: '🗺️', desc: '把软件需求组织成模块：57 个软件模块；架构冻结 + 契约冻结两处须人工确认。' },
  { id: 'swe-arch-if', cmd: 'swe-arch-if', label: '接口契约', stage: 'SWE.3', out: '接口契约（19 份）+ registry', real: '', color: 'phase1', icon: '🔌', desc: '定义模块间怎么调用：19 份接口契约 + 注册表（91 类型）。' },
  { id: 'swe-coding-plan', cmd: 'swe-coding-plan', label: '编码计划', stage: 'SWE.4', out: '编码计划（19 模块）', real: '', color: 'phase1', icon: '📋', desc: '直接承接接口契约，为每个模块制定编码计划：做什么、怎么验证。' },
  { id: 'swe-coding-do', cmd: 'swe-coding-do', label: '编码执行', stage: 'SWE.4', out: '19 模块源码', real: '', color: 'phase1', icon: '💻', desc: '按计划写代码，产出 19 个模块源码（3 个新建：tsp_mqtt / openapi / led）。' },
  { id: 'swe-coding-verify-pc', cmd: 'swe-coding-verify-pc', label: 'PC 验证', stage: 'SWE.4', out: 'PC 验证报告（25/25 全过）', real: '', color: 'phase1', icon: '🖥️', desc: '编码链完成标志：PC 端验证 25/25 全过（G0 编译 / G1 启动 19/19 / S1 看门狗 / M1 MQTT 合规）。' },
  // 阶段二（green）
  { id: 'sqt-strategy', cmd: 'sqt-strategy', label: '测试策略', stage: 'SYS.5', out: '测试策略方案', real: '', color: 'phase2', icon: '🎯', desc: '制定测试策略：测什么、怎么测、分几类（三分法，12 功能域）。' },
  { id: 'sqt-tr-analysis', cmd: 'sqt-tr-analysis', label: '测试需求', stage: 'SYS.5', out: '测试需求（707 条 TR）', real: '', color: 'phase2', icon: '🔎', desc: '从需求推导出要测什么：707 条测试需求（FUNC 570 / NFR 41 / IF 96）。' },
  { id: 'sqt-case-design', cmd: 'sqt-case-design', label: '用例设计', stage: 'SYS.5', out: '测试用例（544 条）', real: '', color: 'phase2', icon: '🧪', desc: '把测试需求写成一条条可执行的用例：544 条。' },
  { id: 'sqt-script-gen', cmd: 'sqt-script-gen', label: '脚本生成', stage: 'SYS.5', out: '自动化脚本（3178 步）', real: '', color: 'phase2', icon: '🤖', desc: '把用例变成能自动跑的脚本：3178 步（17 feature + 16 step 文件）。' },
  { id: 'sqt-auto-test', cmd: 'sqt-auto-test', label: '自动化测试', stage: 'SYS.5', out: '真机测试（7 轮，R7 116/116）', real: '', color: 'phase2', icon: '⚙️', desc: '在真机上自动跑测试，7 轮收敛：R1 55.2% → R7 116/116 全通过。' },
  { id: 'sqt-defect-feedback', cmd: 'sqt-defect-feedback', label: '缺陷闭环', stage: 'SUP.8', out: '缺陷报告（21 DEF 闭环）', real: '', color: 'phase2', icon: '📋', desc: '把测试发现的缺陷登记、反馈给上游修复、验证后关闭：21 条 DEF 实证闭环。' },
  // 验证支撑（blue）——编码后四类验证并行
  { id: 'swe-static-verify', cmd: 'swe-static-verify', label: '静态分析', stage: 'SUP.1', out: '静态分析报告', real: '', color: 'support', icon: '🧹', desc: '与单元/集成/PC 验证并行：Cppcheck + MISRA 扫代码找潜在问题。' },
  { id: 'swe-unit-verify', cmd: 'swe-unit-verify', label: '单元验证', stage: 'SWE.4', out: '单元测试报告', real: '', color: 'support', icon: '🧩', desc: '与静态/集成/PC 验证并行：每个函数单独测，16 模块 56 用例 100%。' },
  { id: 'swe-integration-verify', cmd: 'swe-integration-verify', label: '集成验证', stage: 'SWE.5', out: '集成测试报告', real: '', color: 'support', icon: '🔗', desc: '与静态/单元/PC 验证并行：模块拼起来一起测，11 组 56 用例 100%。' },
  { id: 'swe-coding-verify-v2', cmd: 'swe-coding-verify-v2', label: '设备级验证', stage: 'SWE.4', out: '真机验证报告', real: '', color: 'support', icon: '📡', desc: 'PC 验证放行后烧真机验证：能启动、业务模块全活、持续上报。' },
  // 治理环节（amber）——贯穿全程
  { id: 'change', cmd: 'yxspec:change', label: '变更管理', stage: 'SUP.10', out: '变更记录', real: '', color: 'govern', icon: '🔁', desc: '贯穿全程：文档/需求有更新时登记变更（CR），先做影响分析再决定哪些下游重跑。' },
  { id: 'feedback', cmd: 'yxspec:feedback', label: '上游反馈', stage: 'SUP.8', out: '反馈闭环', real: '', color: 'govern', icon: '📬', desc: '贯穿全程：发现上游文档/流程的问题，登记反馈（UF），跟进到关闭。' },
  { id: 'review', cmd: 'yxspec:review', label: '阶段审查', stage: 'SUP.1', out: '审查报告 + 签核', real: '', color: 'govern', icon: '🛡️', desc: '贯穿全程：每个阶段产物要过审查（AI 预审 + 人双签）才能进下一步；13 个阶段全部 approved。' },
];

export const graphEdges = [
  // 主链（实线 = 实际执行）
  { from: 'init', to: 'clarify', label: 'amb_index.json (45 AMB)' },
  { from: 'init', to: 'prd-analysis', label: 'parsed 副本' },
  { from: 'clarify', to: 'prd-analysis', label: 'CLQ 澄清矩阵 (45 CLQ)' },
  { from: 'prd-analysis', to: 'sys-analysis', label: 'PRD 文档 (373 条)' },
  { from: 'sys-analysis', to: 'sys-arch', label: 'sys-req (374 SR)' },
  // 系统架构后分叉：硬件支（HWE.1）与软件支（SWE.1）并行
  { from: 'sys-arch', to: 'hwe-analysis', label: '硬件需求（并行支）' },
  { from: 'sys-arch', to: 'swe-analysis', label: '软件需求（并行支）' },
  { from: 'hwe-analysis', to: 'swe-analysis', label: '硬件选型参考', dashed: true },
  { from: 'swe-analysis', to: 'swe-arch', label: 'SW-SRS (420 SWR)' },
  { from: 'swe-arch', to: 'swe-arch-if', label: 'SW-ARCH (57 模块)' },
  { from: 'swe-arch-if', to: 'swe-coding-plan', label: 'IF-MOD (19 契约)+registry' },
  { from: 'swe-coding-plan', to: 'swe-coding-do', label: '19 模块 plan' },
  // 编码后四类验证并行（实线 = 同一源码的不同验证链）
  { from: 'swe-coding-do', to: 'swe-coding-verify-pc', label: '源码 → PC 验证' },
  { from: 'swe-coding-do', to: 'swe-static-verify', label: '源码 (Cppcheck)' },
  { from: 'swe-coding-do', to: 'swe-unit-verify', label: '源码 (UT)' },
  { from: 'swe-coding-do', to: 'swe-integration-verify', label: '源码 (IT)' },
  { from: 'swe-coding-verify-pc', to: 'swe-coding-verify-v2', label: 'PC 放行后真机' },
  { from: 'swe-coding-verify-v2', to: 'sqt-auto-test', label: '真机基线', dashed: true },
  { from: 'swe-coding-verify-pc', to: 'sqt-strategy', label: '已发布软件+PC 报告' },
  // SQT 链
  { from: 'sqt-strategy', to: 'sqt-tr-analysis', label: 'SQT-TP（三分法）' },
  { from: 'sqt-tr-analysis', to: 'sqt-case-design', label: '707 TR' },
  { from: 'sqt-case-design', to: 'sqt-script-gen', label: '544 TC' },
  { from: 'sqt-script-gen', to: 'sqt-auto-test', label: 'Behave 脚本 (3178 步)' },
  { from: 'sqt-auto-test', to: 'sqt-defect-feedback', label: '测试结果（R7 116/116）' },
  // 治理（虚线 = 支撑关系，贯穿全程）
  { from: 'sqt-defect-feedback', to: 'feedback', label: '缺陷报告', dashed: true },
  { from: 'prd-analysis', to: 'review', label: '审查', dashed: true },
  { from: 'sys-arch', to: 'review', label: '审查', dashed: true },
  { from: 'swe-arch-if', to: 'review', label: '审查', dashed: true },
  { from: 'swe-coding-verify-pc', to: 'review', label: '审查', dashed: true },
  { from: 'sqt-defect-feedback', to: 'review', label: '缺陷报告审查', dashed: true },
  { from: 'swe-coding-verify-pc', to: 'change', label: '变更建议', dashed: true },
];

export const graphLegend = [
  { color: 'phase1', label: '阶段一主链（12 节点）' },
  { color: 'phase2', label: '阶段二 SQT（6 节点）' },
  { color: 'support', label: '验证支撑（4 节点，与编码并行）' },
  { color: 'govern', label: '治理环节（3 节点，贯穿全程）' },
];

/* ---------- 10c. init 9 步可视化节点（图节点数据） ---------- */
export const initFlowNodes = [
  { id: 0, name: '会话启动', icon: '▶', color: 'blue', real: '登记这次运行' },
  { id: 1, name: '门控检查', icon: '🔒', color: 'amber', real: '确认能开工' },
  { id: 2, name: '扫描清单', icon: '🔍', color: 'cyan', real: '16 份文档登记' },
  { id: 3, name: '断点续传判定', icon: '↻', color: 'cyan', real: '决定全量/增量' },
  { id: 4, name: '切桶规划', icon: '📦', color: 'cyan', real: '分成 7 组' },
  { id: 5, name: '副本复制', icon: '📋', color: 'cyan', real: '复制工作副本' },
  { id: 6, name: 'Worker 并发', icon: '🤖', color: 'amber', real: '6 个 AI 找歧义' },
  { id: 7, name: 'AMB 合并编号', icon: '🏷️', color: 'amber', real: '汇总成 45 条' },
  { id: 8, name: '摘要生成 + 提交', icon: '✅', color: 'green', real: '写总结并保存' },
];

/* ---------- 11. 阶段导航（与关系图 25 节点一一对应，单一数据源） ---------- */
export const stages = [
  // 阶段一（12）
  { key: 'init', label: 'init', name: 'SOR 解析', stage: 'ACQ.4', available: true, desc: '把原始 SOR 文档解析为结构化输入' },
  { key: 'clarify', label: 'clarify', name: '需求澄清', stage: '—', available: true, desc: '对 AMB 歧义进行澄清，生成 CLQ 矩阵（消费 amb_index.json）' },
  { key: 'prd-analysis', label: 'prd-analysis', name: '产品需求', stage: 'SYS.1', available: true, desc: '生成 PRD' },
  { key: 'sys-analysis', label: 'sys-analysis', name: '系统需求', stage: 'SYS.2', available: true, desc: '抽取系统需求（374 SR）' },
  { key: 'sys-arch', label: 'sys-arch', name: '系统架构', stage: 'SYS.3', available: true, desc: '系统架构设计（14 子系统），此后分叉为硬件支与软件支并行' },
  { key: 'hwe-analysis', label: 'hwe-analysis', name: '硬件分析', stage: 'HWE.1', available: true, desc: '硬件需求分析（与软件需求分析并行）' },
  { key: 'swe-analysis', label: 'swe-analysis', name: '软件需求', stage: 'SWE.1', available: true, desc: '软件需求分析（420 SWR，与硬件分析并行）' },
  { key: 'swe-arch', label: 'swe-arch', name: '软件架构', stage: 'SWE.2', available: true, desc: '软件架构设计（57 模块）' },
  { key: 'swe-arch-if', label: 'swe-arch-if', name: '接口契约', stage: 'SWE.3', available: true, desc: '软件接口契约（19 契约）' },
  { key: 'swe-coding-plan', label: 'swe-coding-plan', name: '编码计划', stage: 'SWE.4', available: true, desc: '19 模块编码计划' },
  { key: 'swe-coding-do', label: 'swe-coding-do', name: '编码执行', stage: 'SWE.4', available: true, desc: 'MQTT 源码（19 模块）' },
  { key: 'swe-coding-verify-pc', label: 'verify-pc', name: 'PC 验证', stage: 'SWE.4', available: true, desc: '编码链完成标志（25/25 PASS）' },
  // 阶段二（6）
  { key: 'sqt-strategy', label: 'sqt-strategy', name: '测试策略', stage: 'SYS.5', available: true, desc: 'SQT-TP 测试策略' },
  { key: 'sqt-tr-analysis', label: 'sqt-tr-analysis', name: '测试需求', stage: 'SYS.5', available: true, desc: '测试需求分析' },
  { key: 'sqt-case-design', label: 'sqt-case-design', name: '用例设计', stage: 'SYS.5', available: true, desc: '全域测试用例' },
  { key: 'sqt-script-gen', label: 'sqt-script-gen', name: '脚本生成', stage: 'SYS.5', available: true, desc: 'Behave 测试脚本' },
  { key: 'sqt-auto-test', label: 'sqt-auto-test', name: '自动化测试', stage: 'SYS.5', available: true, desc: 'IF 域自动化测试' },
  { key: 'sqt-defect-feedback', label: 'sqt-defect-feedback', name: '缺陷闭环', stage: 'SUP.8', available: true, desc: '测试/缺陷报告' },
  // 验证支撑（4）
  { key: 'swe-static-verify', label: 'static-verify', name: '静态分析', stage: 'SUP.1', available: true, desc: 'Cppcheck+MISRA（与单元/集成/PC 验证并行）' },
  { key: 'swe-unit-verify', label: 'unit-verify', name: '单元验证', stage: 'SWE.4', available: true, desc: '16 模块 56 用例（与静态/集成/PC 验证并行）' },
  { key: 'swe-integration-verify', label: 'integration-verify', name: '集成验证', stage: 'SWE.5', available: true, desc: '11 组 56 用例（与静态/单元/PC 验证并行）' },
  { key: 'swe-coding-verify-v2', label: 'verify-v2', name: '设备级验证', stage: 'SWE.4', available: true, desc: 'PC 放行后真机启动验证' },
  // 治理环节（3）
  { key: 'change', label: 'change', name: '变更管理', stage: 'SUP.10', available: true, desc: '变更记录（贯穿全程）' },
  { key: 'feedback', label: 'feedback', name: '上游反馈', stage: 'SUP.8', available: true, desc: 'UF 闭环（贯穿全程）' },
  { key: 'review', label: 'review', name: '阶段审查', stage: 'SUP.1', available: true, desc: 'review + 双签（贯穿全程）' },
];

