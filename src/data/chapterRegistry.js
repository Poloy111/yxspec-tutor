/**
 * 章节注册器 —— 每个流程章节只需在 chapters 数组加一行
 * key: 章节标识（侧栏/顶部导航用）
 * title: 侧栏分组标题
 * navLabel: 顶部导航按钮文字
 * available: 是否已构建
 * data: 章节数据（ChapterViews 通用契约）
 * home: 章节默认视图 key
 */
import prdChapter from '../data/prdData.jsx';
import sysChapter from '../data/sysData.jsx';
import archChapter from '../data/archData.jsx';
import hweChapter from '../data/hweData.jsx';
import sweReqChapter from '../data/sweReqData.jsx';
import swArchChapter from '../data/swArchData.jsx';
import ifChapter from '../data/ifData.jsx';
import planChapter from '../data/planData.jsx';
import doChapter from '../data/doData.jsx';
import pcChapter from '../data/pcData.jsx';
import staticChapter from '../data/staticData.jsx';
import utChapter from '../data/utData.jsx';
import itChapter from '../data/itData.jsx';
import verifyChapter from '../data/verifyData.jsx';
import changeChapter from '../data/changeData.jsx';
import feedbackChapter from '../data/feedbackData.jsx';
import reviewChapter from '../data/reviewData.jsx';
import strategyChapter from '../data/strategyData.jsx';
import trChapter from '../data/trData.jsx';
import caseChapter from '../data/caseData.jsx';
import scriptGenChapter from '../data/scriptGenData.jsx';
import autoTestChapter from '../data/autoTestData.jsx';
import defectFeedbackChapter from '../data/defectFeedbackData.jsx';

export const CHAPTER_KEYS = [
  'prd-analysis', 'sys-analysis', 'sys-arch', 'hwe-analysis',
  'swe-analysis', 'swe-arch', 'swe-arch-if', 'swe-coding-plan',
  'swe-coding-do', 'swe-coding-verify-pc',
  'swe-static-verify', 'swe-unit-verify', 'swe-integration-verify', 'swe-coding-verify',
  'change', 'feedback', 'review',
  'sqt-strategy', 'sqt-tr-analysis', 'sqt-case-design', 'sqt-script-gen',
  'sqt-auto-test', 'sqt-defect-feedback',
];

export const chapters = {
  'prd-analysis': {
    key: 'prd-analysis',
    title: '/yxspec:prd-analysis',
    navLabel: 'prd-analysis',
    stage: 'SYS.1',
    available: true,
    data: prdChapter,
    home: 'prd-overview',
  },
  'sys-analysis': {
    key: 'sys-analysis',
    title: '/yxspec:sys-analysis',
    navLabel: 'sys-analysis',
    stage: 'SYS.2',
    available: true,
    data: sysChapter,
    home: 'sys-overview',
  },
  'sys-arch': {
    key: 'sys-arch',
    title: '/yxspec:sys-arch',
    navLabel: 'sys-arch',
    stage: 'SYS.3',
    available: true,
    data: archChapter,
    home: 'arch-overview',
  },
  'hwe-analysis': {
    key: 'hwe-analysis',
    title: '/yxspec:hwe-analysis',
    navLabel: 'hwe-analysis',
    stage: 'HWE.1',
    available: true,
    data: hweChapter,
    home: 'hwe-overview',
  },
  'swe-analysis': {
    key: 'swe-analysis',
    title: '/yxspec:swe-analysis',
    navLabel: 'swe-analysis',
    stage: 'SWE.1',
    available: true,
    data: sweReqChapter,
    home: 'swe-analysis-overview',
  },
  'swe-arch': {
    key: 'swe-arch',
    title: '/yxspec:swe-arch-v2',
    navLabel: 'swe-arch',
    stage: 'SWE.2',
    available: true,
    data: swArchChapter,
    home: 'swe-arch-overview',
  },
  'swe-arch-if': {
    key: 'swe-arch-if',
    title: '/yxspec:swe-arch-if-v2',
    navLabel: 'swe-arch-if',
    stage: 'SWE.3',
    available: true,
    data: ifChapter,
    home: 'swe-arch-if-overview',
  },
  'swe-coding-plan': {
    key: 'swe-coding-plan',
    title: '/yxspec:swe-coding-plan-v2',
    navLabel: 'swe-coding-plan',
    stage: 'SWE.4',
    available: true,
    data: planChapter,
    home: 'swe-coding-plan-overview',
  },
  'swe-coding-do': {
    key: 'swe-coding-do',
    title: '/yxspec:swe-coding-do-v2',
    navLabel: 'swe-coding-do',
    stage: 'SWE.4',
    available: true,
    data: doChapter,
    home: 'swe-coding-do-overview',
  },
  'swe-coding-verify-pc': {
    key: 'swe-coding-verify-pc',
    title: '/yxspec:swe-coding-verify-pc-v2',
    navLabel: 'verify-pc',
    stage: 'SWE.4',
    available: true,
    data: pcChapter,
    home: 'swe-coding-verify-pc-overview',
  },
  'swe-static-verify': {
    key: 'swe-static-verify',
    title: '/yxspec:swe-static-verify',
    navLabel: 'static-verify',
    stage: 'SUP.1',
    available: true,
    data: staticChapter,
    home: 'swe-static-verify-overview',
  },
  'swe-unit-verify': {
    key: 'swe-unit-verify',
    title: '/yxspec:swe-unit-verify',
    navLabel: 'unit-verify',
    stage: 'SWE.4',
    available: true,
    data: utChapter,
    home: 'swe-unit-verify-overview',
  },
  'swe-integration-verify': {
    key: 'swe-integration-verify',
    title: '/yxspec:swe-integration-verify',
    navLabel: 'integration-verify',
    stage: 'SWE.5',
    available: true,
    data: itChapter,
    home: 'swe-integration-verify-overview',
  },
  'swe-coding-verify': {
    key: 'swe-coding-verify',
    title: '/yxspec:swe-coding-verify-v2',
    navLabel: 'verify-v2',
    stage: 'SWE.4',
    available: true,
    data: verifyChapter,
    home: 'swe-coding-verify-overview',
  },
  change: {
    key: 'change',
    title: '/yxspec:change',
    navLabel: 'change',
    stage: 'SUP.10',
    available: true,
    data: changeChapter,
    home: 'change-overview',
  },
  feedback: {
    key: 'feedback',
    title: '/yxspec:feedback',
    navLabel: 'feedback',
    stage: 'SUP.8',
    available: true,
    data: feedbackChapter,
    home: 'feedback-overview',
  },
  review: {
    key: 'review',
    title: '/yxspec:review',
    navLabel: 'review',
    stage: 'SUP.1',
    available: true,
    data: reviewChapter,
    home: 'review-overview',
  },
  'sqt-strategy': {
    key: 'sqt-strategy',
    title: '/yxspec:sqt-strategy',
    navLabel: 'sqt-strategy',
    stage: 'SYS.5',
    available: true,
    data: strategyChapter,
    home: 'sqt-strategy-overview',
  },
  'sqt-tr-analysis': {
    key: 'sqt-tr-analysis',
    title: '/yxspec:sqt-tr-analysis',
    navLabel: 'sqt-tr-analysis',
    stage: 'SYS.5',
    available: true,
    data: trChapter,
    home: 'sqt-tr-analysis-overview',
  },
  'sqt-case-design': {
    key: 'sqt-case-design',
    title: '/yxspec:sqt-case-design',
    navLabel: 'sqt-case-design',
    stage: 'SYS.5',
    available: true,
    data: caseChapter,
    home: 'sqt-case-design-overview',
  },
  'sqt-script-gen': {
    key: 'sqt-script-gen',
    title: '/yxspec:sqt-script-gen',
    navLabel: 'sqt-script-gen',
    stage: 'SYS.5',
    available: true,
    data: scriptGenChapter,
    home: 'sqt-script-gen-overview',
  },
  'sqt-auto-test': {
    key: 'sqt-auto-test',
    title: '/yxspec:sqt-auto-test',
    navLabel: 'sqt-auto-test',
    stage: 'SYS.5',
    available: true,
    data: autoTestChapter,
    home: 'sqt-auto-test-overview',
  },
  'sqt-defect-feedback': {
    key: 'sqt-defect-feedback',
    title: '/yxspec:sqt-defect-feedback',
    navLabel: 'sqt-defect-feedback',
    stage: 'SUP.8',
    available: true,
    data: defectFeedbackChapter,
    home: 'sqt-defect-feedback-overview',
  },
};
