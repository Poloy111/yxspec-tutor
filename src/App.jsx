import { useState } from 'react';
import { stages } from './data/yxspecData';
import { chapters, CHAPTER_KEYS } from './data/chapterRegistry';
import {
  DirectoryView,
  CommandOverviewView,
  FlowView,
  IoView,
  ArtifactsView,
  MechanismsView,
  DefenseView,
} from './components/views';
import {
  ClarifyOverviewView,
  ClarifyFlowView,
  ClarifyIoView,
  ClarifyArtifactsView,
  ClarifyMechanismsView,
} from './components/clarifyViews';
import {
  ChapterOverview,
  ChapterFlow,
  ChapterIo,
  ChapterArtifacts,
  ChapterMechanisms,
} from './components/ChapterViews';
import './index.css';

/* 章节子项模板：每章 5 个视图（0-4），key 以章节名开头 */
const CHAPTER_ITEMS = [
  { key: 'overview', label: '命令总览', num: '0' },
  { key: 'flow', label: '执行流程', num: '1' },
  { key: 'io', label: '输入/输出/调用关系', num: '2' },
  { key: 'artifacts', label: '产物实例', num: '3' },
  { key: 'mechanisms', label: '门控/追溯/AI 协同', num: '4' },
];

const NAV_GROUPS = [
  {
    title: '全局视图',
    items: [
      { key: 'dir', label: '工作流节点图', num: '◈' },
      { key: 'defense', label: '答辩要点', num: '★' },
    ],
  },
  {
    title: '/yxspec:init',
    items: [
      { key: 'overview', label: '命令总览', num: '0' },
      { key: 'flow', label: '9 步执行流程', num: '1' },
      { key: 'io', label: '输入/输出/调用关系', num: '2' },
      { key: 'artifacts', label: '产物实例', num: '3' },
      { key: 'mechanisms', label: '门控/追溯/AI 协同', num: '4' },
    ],
  },
  {
    title: '/yxspec:clarify',
    items: [
      { key: 'clarify-overview', label: '命令总览', num: '0' },
      { key: 'clarify-flow', label: '9 步执行流程', num: '1' },
      { key: 'clarify-io', label: '输入/输出/调用关系', num: '2' },
      { key: 'clarify-artifacts', label: '产物实例', num: '3' },
      { key: 'clarify-mechanisms', label: '门控/追溯/AI 协同', num: '4' },
    ],
  },
];

/* 动态生成已构建章节的侧栏分组 */
CHAPTER_KEYS.forEach((ck) => {
  const c = chapters[ck];
  NAV_GROUPS.push({
    title: c.title,
    items: CHAPTER_ITEMS.map((it) => ({ key: `${ck}-${it.key}`, label: it.label, num: it.num })),
  });
});

/* 顶部导航 → 章节默认视图（章节视图 key 统一为 `${章节key}-overview`） */
const stageHome = { init: 'overview', clarify: 'clarify-overview' };
CHAPTER_KEYS.forEach((ck) => { stageHome[ck] = `${ck}-overview`; });
/* STAGE_GROUPS 键名别名：支撑组用 'swe-coding-verify-v2'，章节注册表键为 'swe-coding-verify' */
const STAGE_KEY_ALIAS = { 'swe-coding-verify-v2': 'swe-coding-verify' };
const resolveStageKey = (k) => STAGE_KEY_ALIAS[k] || k;
const stageNavTitle = (k) => {
  const rk = resolveStageKey(k);
  if (CHAPTER_KEYS.includes(rk)) return chapters[rk].title;
  if (k === 'init') return '/yxspec:init';
  if (k === 'clarify') return '/yxspec:clarify';
  return null;
};

const STAGE_GROUPS = [
  { label: '阶段一', keys: ['init', 'clarify', 'prd-analysis', 'sys-analysis', 'sys-arch', 'hwe-analysis', 'swe-analysis', 'swe-arch', 'swe-arch-if', 'swe-coding-plan', 'swe-coding-do', 'swe-coding-verify-pc'] },
  { label: '阶段二', keys: ['sqt-strategy', 'sqt-tr-analysis', 'sqt-case-design', 'sqt-script-gen', 'sqt-auto-test', 'sqt-defect-feedback'] },
  { label: '支撑', keys: ['swe-static-verify', 'swe-unit-verify', 'swe-integration-verify', 'swe-coding-verify-v2'] },
  { label: '治理', keys: ['change', 'feedback', 'review'] },
];

/* ---------- 左侧导航分类（与顶部导航 STAGE_GROUPS 对齐） ---------- */
/* 章节分组 → 所属分类（顶栏 label） */
const categoryOfTitle = (title) => {
  if (title === '全局视图') return '流程总览';
  for (const g of STAGE_GROUPS) {
    for (const k of g.keys) {
      if (stageNavTitle(k) === title) return g.label;
    }
  }
  return '其他';
};
const CATEGORY_ORDER = ['流程总览', '阶段一', '阶段二', '支撑', '治理'];
/* 分类默认展开状态 */
const defaultOpenCats = { '流程总览': true, '阶段一': true };
const NAV_GROUPS_BY_CAT = CATEGORY_ORDER.reduce((acc, c) => { acc[c] = []; return acc; }, {});
NAV_GROUPS.forEach((g) => { NAV_GROUPS_BY_CAT[categoryOfTitle(g.title)].push(g); });

function App() {
  const [view, setView] = useState('dir');
  const [stage, setStage] = useState('init');
  const [navOpen, setNavOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({ '/yxspec:init': true }); // 侧栏分组展开状态
  const [openCats, setOpenCats] = useState(defaultOpenCats); // 侧栏分类展开状态

  const isClarify = view.startsWith('clarify');
  /* 章节匹配：最长 key 优先（避免 swe-arch 误匹配 swe-arch-if） */
  const findChapter = (v) =>
    [...CHAPTER_KEYS].sort((a, b) => b.length - a.length).find((k) => v.startsWith(`${k}-`)) || null;

  const renderChapter = (ck) => {
    const d = chapters[ck].data;
    const sub = view.replace(`${ck}-`, '');
    switch (sub) {
      case 'overview': return <ChapterOverview data={d} />;
      case 'flow': return <ChapterFlow data={d} />;
      case 'io': return <ChapterIo data={d} />;
      case 'artifacts': return <ChapterArtifacts data={d} />;
      case 'mechanisms': return <ChapterMechanisms data={d} />;
      default: return <ChapterOverview data={d} />;
    }
  };

  const renderView = () => {
    const ck = findChapter(view);
    if (ck) {
      return renderChapter(ck);
    }
    switch (view) {
      case 'dir': return <DirectoryView />;
      case 'overview': return <CommandOverviewView />;
      case 'flow': return <FlowView />;
      case 'io': return <IoView />;
      case 'artifacts': return <ArtifactsView />;
      case 'mechanisms': return <MechanismsView />;
      case 'defense': return <DefenseView />;
      case 'clarify-overview': return <ClarifyOverviewView />;
      case 'clarify-flow': return <ClarifyFlowView />;
      case 'clarify-io': return <ClarifyIoView />;
      case 'clarify-artifacts': return <ClarifyArtifactsView />;
      case 'clarify-mechanisms': return <ClarifyMechanismsView />;
      default: return <DirectoryView />;
    }
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="logo">YX</div>
          <span>YXSpec 工作流教学</span>
        </div>
        <div className="spacer" />
        <div className="stage-nav-wrap">
          {navOpen && (
            <nav className="stage-nav" aria-label="阶段切换">
              {STAGE_GROUPS.map((g, gi) => (
                <div key={gi} className="stage-nav-group">
                  <span className="stage-nav-label">{g.label}</span>
                  {g.keys.map((k) => {
                    const s = stages.find((x) => x.key === k);
                    if (!s) return null;
                    const available = s.available || chapters[k]?.available;
                    return (
                      <button
                        key={k}
                        className={stage === k ? 'active' : ''}
                        onClick={() => {
                          if (available) {
                            setStage(k);
                            const hk = stageHome[resolveStageKey(k)];
                            if (hk) {
                              setView(hk);
                              // 自动展开对应侧栏分类 + 分组
                              const gTitle = stageNavTitle(k);
                              if (gTitle) {
                                const cat = categoryOfTitle(gTitle);
                                setOpenCats((oc) => ({ ...oc, [cat]: true }));
                                setOpenGroups((og) => ({ ...og, [gTitle]: true }));
                              }
                            }
                          }
                          else alert(`「${s.label}」章节尚未构建——后续会逐步补充。`);
                        }}
                        title={available ? s.desc : `未构建：${s.desc}`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>
          )}
          <button
            className={`stage-toggle ${navOpen ? 'open' : ''}`}
            onClick={() => setNavOpen(!navOpen)}
            title={navOpen ? '收起流程导航' : '展开流程导航'}
            aria-expanded={navOpen}
          >
            {navOpen ? '收起流程导航 ▲' : '展开流程导航 ▼'}
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          {CATEGORY_ORDER.map((cat) => (
            <div key={cat} className="nav-cat">
              <div
                className="nav-cat-title nav-group-clickable"
                onClick={() => setOpenCats({ ...openCats, [cat]: !openCats[cat] })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenCats({ ...openCats, [cat]: !openCats[cat] }); } }}
              >
                <span>{cat}</span>
                <span className="nav-group-arrow">{openCats[cat] ? '▾' : '▸'}</span>
              </div>
              {openCats[cat] && NAV_GROUPS_BY_CAT[cat].map((g) => (
                <div key={g.title}>
                  <div
                    className="nav-group-title nav-group-clickable"
                    onClick={() => setOpenGroups({ ...openGroups, [g.title]: !openGroups[g.title] })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenGroups({ ...openGroups, [g.title]: !openGroups[g.title] }); } }}
                  >
                    <span>{g.title}</span>
                    <span className="nav-group-arrow">{openGroups[g.title] ? '▾' : '▸'}</span>
                  </div>
                  {openGroups[g.title] && g.items.map((it) => (
                    <button
                      key={it.key}
                      className={`nav-item ${view === it.key ? 'active' : ''}`}
                      onClick={() => setView(it.key)}
                    >
                      <span className="step-num">{it.num}</span>
                      <span>{it.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </aside>

        <main className="main">{renderView()}</main>
      </div>
    </div>
  );
}

export default App;
