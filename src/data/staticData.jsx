/**
 * yxspec-tutor · swe-static-verify 章节数据（通用章节契约结构）
 * 内容来源：project/tests/static/static-verify-index.md（3 次扫描历史）
 * 真实运行：2026-07-03 ×2（fix 模式）+ 2026-08-03（scan-only 补齐 SWE.4）
 */

const staticChapter = {
  /* ---------- 0. 命令总览 ---------- */
  overview: {
    eyebrow: '/yxspec:swe-static-verify · SUP.1 · 静态分析',
    oneLiner:
      '用 Cppcheck 等静态工具扫全量源码——2026-08-03 补齐 SWE.4 的扫描：全量 31 个真问题（error 11 + warn 12 + port 8），本次改动 4 个文件 0 真缺陷，历史 2 轮 fix 模式归零。',
    analogy:
      '把 swe-static-verify 想象成「机器体检医生」：不把代码跑起来，而是逐行「读代码找病灶」——Cppcheck 扫内存泄漏/空指针/数组越界这类静态缺陷，MISRA 规则查编码规范违规。历史做过 2 轮「体检+治疗」（fix 模式），2026-08-03 做了一次「体检」（scan-only）补齐 SWE.4 证据：31 个旧问题如实记录，本次改动 4 个文件干净。',
    memoryLine: '记住：<Hl>static-verify = 代码体检不跑起来</Hl>——Cppcheck 扫缺陷 + MISRA 查规范。',
    purpose: {
      oneLiner:
        '静态扫描全量源码（app_src 全量，未排除平台层/shell）：2026-08-03 轮 31 真问题（error 11 + warn 12 + port 8），本次改动 4 文件 0 真缺陷；历史 fix 轮归零（仅 telnetd 设计性 #error won\'t-fix）。',
      input: {
        title: '2 类输入',
        items: [
          'project/source/app_src 全量源码',
          'Cppcheck + MISRA 规则配置',
        ],
        note: '模式可选：fix（修复模式）/ scan-only（扫描模式，本案例）',
      },
      processTitle: '3 步',
      process: [
        '① 配置：确定源码目录 + 规则（error/warning/portability/style）',
        '② 扫描：Cppcheck 全量扫 + MISRA 规则检查',
        '③ 判定：真问题分类（error/warn/port）→ 修复或记档',
      ],
      outputsTitle: '2 样',
      outputs: [
        { name: 'analysis.xml + html 报告', what: 'Cppcheck 扫描报告（round-1/）', consumer: '缺陷清单 + 修复依据' },
        { name: 'static-verify-index.md', what: '静态分析历史索引（3 次会话）', consumer: '门控证据 + 追溯' },
      ],
      value: [
        '全量扫描不留死角——平台层/shell 也扫（本案例未排除）',
        '31 真问题如实记录 + 本次改动 0 缺陷——新旧分明',
        '1624 style 误报识别为同名文件重复扫描——误报也会排查',
      ],
      boundary: [
        '不管「运行期行为」——那是 verify-pc / 真机验证的事',
        '不管「单元测试」——那是 swe-unit-verify 的事',
        'static-verify 只回答「代码静态看有没有缺陷」',
      ],
      example:
        '本次改动 4 个文件（bms.c / alarm_gb.c / yx_proto_sif.c 等）Cppcheck 0 真缺陷——编码质量门 PASS。',
    },
    rolesTitle: '谁在干活？（命令 / Agent / 脚本）',
    roles: [
      { kind: 'blue', role: '体检医生', who: '/yxspec:swe-static-verify 命令', does: '确定模式（fix/scan-only）→ 扫描 → 判定' },
      { kind: 'amber', role: 'Cppcheck', who: '静态分析工具', does: '扫内存/空指针/越界等静态缺陷 + MISRA 规则' },
    ],
    whyTitle: '为什么要做静态分析？',
    whyShell: [
      '为什么跑起来之前先静态看？—— 内存泄漏/越界这类缺陷运行期难复现，静态扫一次全暴露',
      '为什么 MISRA 规则？—— 车载嵌入式编码规范（MISRA C），行业强制',
      '为什么 style 误报也排查？—— 误报不识别就会污染报告，历史 1624 条是重复扫描所致',
    ],
    whyMemory: '记住 <Hl>「不跑代码也能找病灶」</Hl>——Cppcheck + MISRA 双工具。',
    instance: {
      stats: [
        { num: '3', label: '次扫描', desc: '7-03 ×2 fix + 8-03 scan-only', kind: 'cyan' },
        { num: '31', label: '真问题', desc: 'error 11 + warn 12 + port 8', kind: 'cyan' },
        { num: '0', label: '本次改动缺陷', desc: '4 文件 0 真缺陷', kind: 'green' },
        { num: '1', label: '历史遗留', desc: 'telnetd 设计性 #error（won\'t-fix）', kind: 'amber' },
      ],
      memoryLine: '记住这 2 个数字：<Hl>31 真问题如实记录、本次改动 0 缺陷</Hl>。答辩时说「静态扫描新旧分明，编码质量干净」就是一句话结论。',
    },
    downstream: ['analysis.xml → 缺陷清单', 'index → 门控证据', '修复项 → 编码闭环'],
    downstreamLine: '一句话：<Hl>静态分析是「编码质量的体检报告」</Hl>——扫出问题修掉，记录留档。',
    ironRules: [
      '<b>全量扫描</b> —— 不排除平台层/shell（本案例）',
      '<b>真问题分类</b> —— error/warn/port 分级处理',
      '<b>误报排查</b> —— 1624 style 识别为重复扫描，不误导',
      '<b>设计性 won\'t-fix 记档</b> —— telnetd #error 有理由',
    ],
    tutor: {
      question: '考官问「静态分析的历史三次扫描分别是什么模式？结果如何？」怎么答？',
      answer: (
        <span>
          <b>2026-07-03 两次 fix 模式</b>（error/warning）：扫出问题即修，归零只剩 telnetd 设计性 #error（won\'t-fix 记档）；
          <b>2026-08-03 一次 scan-only</b>（补齐 SWE.4 证据）：全量扫描 31 真问题（error 11 + warn 12 + port 8）如实记录，
          <b>本次改动 4 文件 0 真缺陷</b>——编码质量干净。
        </span>
      ),
    },
  },

  /* ---------- 1. 执行流程 ---------- */
  flowEyebrow: '3 步 · 模式选择 · 分级判定',
  flowTitle: '执行流程：3 步互动流程图',
  flowSub: '从上到下是真实执行顺序。点击任一步展开看细节。',
  flowSteps: [
    {
      id: 0, name: '配置', label: '配置（源码 + 规则 + 模式）',
      action: '确定源码目录（app_src 全量）+ 规则（error/warning/portability/style）+ 模式（fix / scan-only）',
      post: '扫描配置就绪', edge: '配置 → 扫描',
      why: '扫哪里、查什么、修不修，先定清楚',
    },
    {
      id: 1, name: '扫描', label: '扫描（Cppcheck + MISRA）',
      action: 'Cppcheck 全量扫描 + MISRA 规则检查，产出 analysis.xml + html',
      post: 'analysis.xml + html', edge: '扫描报告',
      why: '机器逐行读代码，找内存/空指针/越界',
    },
    {
      id: 2, name: '判定', label: '判定（分级处理）',
      action: '真问题分类（error 11 / warn 12 / port 8）→ 本次改动 4 文件 0 缺陷；历史设计性问题 won\'t-fix 记档',
      post: '判定结论 + index 更新', edge: '结论 → 门控',
      why: '分级处理：能修的修，设计性的记档',
    },
  ],
  flowNodes: [
    { id: 0, name: '配置', icon: '⚙️', color: 'blue', sub: '模式+规则' },
    { id: 1, name: '扫描', icon: '🔬', color: 'cyan', sub: 'Cppcheck+MISRA' },
    { id: 2, name: '判定', icon: '⚖️', color: 'amber', sub: '分级处理' },
  ],
  flowTutor: {
    question: '考官问「fix 模式和 scan-only 模式的区别？」怎么答？',
    answer: (
      <span>
        <b>fix 模式</b>：扫出问题直接修复（历史 7-03 两次，error/warning 归零）；
        <b>scan-only 模式</b>：只扫描不修复，补齐证据链（8-03 一次，31 真问题如实记录 + 本次改动 0 缺陷）。
        scan-only 适合「验证历史改动干净」，fix 适合「全面整改」。
      </span>
    ),
  },

  /* ---------- 2. 输入 / 输出 / 调用关系 ---------- */
  ioSub: '考核①明确要求：分析每个 Command 的输入、输出及调用关系。',
  io: {
    inputs: [
      { name: 'app_src 全量源码', role: '扫描对象（未排除平台层/shell）' },
      { name: 'Cppcheck + MISRA 规则', role: '静态分析工具与规则' },
    ],
    inputKeyline: '最关键输入是 <Hl>源码全量</Hl>——不留死角。',
    outputs: [
      { name: 'analysis.xml + html', role: '扫描报告（round-1/）' },
      { name: 'static-verify-index.md', role: '历史索引（3 次会话结果）' },
      { name: 'c_filelist.txt', role: '扫描文件清单' },
    ],
    outputKeyline: '核心输出链：<Hl>源码 → 扫描 → 报告 → 判定</Hl>。',
    callGraphs: [
      {
        title: '命令级 · swe-static-verify 与上下游的关系',
        color: 'cyan',
        from: { id: 'st', cmd: '/yxspec:swe-static-verify', sub: 'SUP.1 · 静态分析', desc: '代码体检' },
        tos: [
          { id: 'up-do', cmd: 'swe-coding-do', edge: '源码（19 模块）', edgeDesc: '扫描对象', desc: '上游：编码产物是扫描对象。' },
          { id: 'peer-v', cmd: 'unit/IT/verify-pc', edge: '结论并入', edgeDesc: '四路并行', desc: '并行：编码后 static / unit / integration / verify-pc 四类验证并行开展、互不为前置；静态结论并入整体质量证据链，阶段一完成标志为 PC 验证（25/25，M1 合规）。', dashed: true },
        ],
      },
    ],
    callKeyline: '静态分析是支撑过程（SUP.1）——与单元/集成/PC 验证并行，为整体质量证据链提供静态质量证据。',
    pipeline: [
      { seg: 'cmd', label: '/yxspec:swe-static-verify' },
      { seg: 'input', label: 'app_src 全量' },
      { seg: 'worker', label: 'Cppcheck 扫描' },
      { seg: 'script', label: 'MISRA 规则' },
      { seg: 'output', label: 'analysis.xml + misra_runtime.json' },
    ],
    qualityGates: [
      { code: 'error', name: '错误级', phase: '扫描', check: '内存/空指针/越界等（本次 11）', outcome: '本次改动 0' },
      { code: 'warn', name: '警告级', phase: '扫描', check: '潜在问题（本次 12）', outcome: '记档' },
      { code: 'port', name: '移植性', phase: '扫描', check: '平台相关（本次 8）', outcome: '记档' },
    ],
    failures: [
      { fault: 'style 误报', action: '识别为同名文件重复扫描（1624 条）' },
      { fault: '设计性问题', action: 'telnetd #error won\'t-fix 记档' },
    ],
  },
  ioTutor: {
    question: '答辩时 swe-static-verify 怎么讲？',
    answer: (
      <span>
        「static-verify 用 Cppcheck + MISRA 扫 app_src 全量源码（SUP.1 支撑过程），2026-08-03 补齐 SWE.4 证据：
        31 真问题（error 11 + warn 12 + port 8）如实记录，<b>本次改动 4 文件 0 真缺陷</b>；历史 fix 轮已归零。」
      </span>
    ),
  },

  /* ---------- 3. 产物实例 ---------- */
  artifactsSub: '产物文件都在工程里真实存在，答辩时可打开验证。',
  artifacts: [
    { name: 'static-verify-index.md', kind: 'green', what: '3 次扫描历史索引（模式/轮次/结果）', who: '门控证据 + 追溯' },
    { name: 'analysis.xml', kind: 'amber', what: 'Cppcheck 扫描结果（8-03 round-1）', who: '缺陷清单' },
    { name: 'html 报告', kind: 'amber', what: '可视化扫描报告', who: '人工复核' },
    { name: 'misra_runtime.json', kind: 'amber', what: 'MISRA 规则运行结果', who: '规范合规' },
  ],
  artifactsChain: '一句话串起来：<Hl>源码 → Cppcheck 扫描 → analysis.xml → 分级判定 → index 留档</Hl>。',

  /* ---------- 4. 机制 ---------- */
  mechanisms: {
    eyebrow: 'SUP.1 · 静态分析',
    title: '门控 · 追溯 · AI 协同（swe-static-verify 版）',
    sub: '支撑过程（SUP.1）——为编码质量提供独立证据。',
    mechTableTitle: '机制总览',
    mechTable: {
      cols: ['机制', '怎么表现'],
      rows: [
        ['<Badge kind="cyan">门控</Badge>', '扫描结果分级：error 必须清 / warn 记档 / port 记档'],
        ['<Badge kind="green">追溯</Badge>', '3 次扫描全部入 index，可回溯'],
        ['<Badge kind="blue">AI 协同</Badge>', 'Cppcheck 机器扫描（确定性）+ 人工判定设计性问题'],
      ],
    },
    sections: [
      {
        title: '3 次扫描历史（真实）',
        type: 'table',
        cols: ['时间', '模式', '轮次', '结果'],
        rows: [
          ['2026-07-03 13:32', 'fix(error,warning)', '2', '1 遗留（telnetd #error）'],
          ['2026-07-03 17:40', 'fix(error,warning)', '1（卡死）', '1 遗留（won\'t-fix）'],
          ['2026-08-03 11:19', 'scan-only（补齐 SWE.4）', '1', '31 真问题记档；本次改动 4 文件 0 缺陷'],
        ],
        keyline: '「本次改动 0 真缺陷」是编码质量的硬证据。',
      },
    ],
  },
};

export default staticChapter;
