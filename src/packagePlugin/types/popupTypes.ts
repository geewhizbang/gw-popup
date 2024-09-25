import { type Fn } from '@vueuse/core';
import { type PopupModeKeys } from '../../pinia/GWPopupConfig';

export type PopupCallbackKeys = 'show' | 'hide' | 'refresh';

export interface PopupShowParams {
  positioner?: HTMLElement | string;
  direction?: PopupDirection;
}

export type PopupCallbacks = {
  [key in PopupCallbackKeys]: (params: PopupShowParams) => {};
};

export interface PopupCallbackDict {
  [key: string]: PopupCallbacks;
}

export interface PopupWidthHeight {
  height: number;
  width: number;
}

export type PopupStatusKeys = 'isTooltip' | 'isOpen';
export interface PopupStatus {
  isTooltip: boolean;
  isOpen: boolean;
}

export interface PopupStatusDict {
  [key: string]: PopupStatus;
}

export type PopupcallbackHandlesKeys = 'show' | 'hide' | 'refresh';

export interface PopupCallbackHandles {
  [key: string]: {
    show: Fn | any;
    hide: Fn | any;
    refresh: Fn | any;
  };
}

export interface PopupServiceData {
  popupIndex: number;
  status: PopupStatusDict;
  log: boolean;
  callbacks: PopupCallbackDict;
  callbackHandles: PopupCallbackHandles;
  settings: PopupGlobalSettings | null;
  toolTips: { [key: string]: ToolTipHandler };
}

export interface PopupRegistration {
  isTooltip: boolean;
  isModal: boolean;
  isManual: boolean;
  positioner: string;
  eventObject: HTMLElement | null;
  eventOn: keyof WindowEventMap;
  eventOff: keyof WindowEventMap;
}

export type PopupDirection = 'n' | 'e' | 'w' | 's';
export type PopupPositionType = 'min' | 'center' | 'max';

export interface PopupPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export type SvgDataKeys = 'M' | 'c' | 'l' | 'A' | 'z' | 'Q';
export type SvgXYPair = string[];

export interface SvgPathData {
  s: SvgDataKeys;
  v: (string | SvgXYPair)[];
}

export type SvgPathDataArray = SvgPathData[];

export interface SvgData {
  fill?: string;
  svg: SvgPathDataArray;
}

export type SvgParams = {
  width: string;
  height: string;
  viewbox: string;
  paths: { class: string; path: string; fill?: string }[];
};

export interface PopupBoxParams {
  arrowHeight: number;
  arrowWidth: number;
  arrowPosition: number;
  height: number;
  width: number;
  cornerRadius: number;
  mode: PopupModeKeys;
  direction: PopupDirection;
}

export interface PopupProps {
  arrowDistance?: number;
  arrowHeight?: number;
  arrowOffset?: number;
  arrowPosition?: PopupPositionType;
  arrowWidth?: number;
  class?: string;
  cornerRadius?: number;
  debugMode?: boolean;
  direction?: PopupDirection;
  eventOff?: keyof HTMLElementEventMap;
  eventOn?: keyof HTMLElementEventMap;
  isManual?: boolean;
  isModal?: boolean;
  isPositioned?: boolean;
  isTooltip?: boolean;
  logging?: boolean;
  paddingX?: number;
  paddingY?: number;
  popupOffset?: number;
  popupPosition?: PopupPositionType;
  positioner?: string;
  shiftX?: number;
  shiftY?: number;
  zIndex?: number;
}

export interface PopupPropsDefined {
  arrowDistance: number;
  arrowHeight: number;
  arrowOffset: number;
  arrowPosition: PopupPositionType;
  arrowWidth: number;
  class: string;
  cornerRadius: number;
  debugMode: boolean;
  direction: PopupDirection;
  eventOff: keyof HTMLElementEventMap;
  eventOn: keyof HTMLElementEventMap;
  isManual: boolean;
  isModal: boolean;
  isPositioned: boolean;
  isTooltip: boolean;
  logging: boolean;
  paddingX: number;
  paddingY: number;
  popupOffset: number;
  popupPosition: PopupPositionType;
  positioner: string;
  shiftX: number;
  shiftY: number;
  zIndex: number;
}

export interface PopupDirectionMapItem {
  yReverse: boolean;
  switchXY: boolean;
  svgElements: string[];
  startOffset: 'H' | 'W' | '-H' | '-W' | '0';
}

export type PopupDirectionMap = {
  [key in PopupDirection]: PopupDirectionMapItem;
};

export interface PopupGlobalSettings {
  log: boolean;
  debugMode: boolean;
  modes: {
    [key in PopupModeKeys]: {
      props: PopupProps;
      directionMap?: PopupDirectionMap;
    };
  };
  svgElements: {
    [key: string]: {
      fill?: string;
      pathTemplate: string;
    };
  };
}

export interface ToolTipRef {
  refName: string;
  ref: HTMLElement;
  text: string;
  direction?: PopupDirection;
}

export type ToolTipHandler = (refs: ToolTipRef[]) => void;

export interface PopupServiceData {
  popupIndex: number;
  status: PopupStatusDict;
  callbacks: PopupCallbackDict;
  callbackHandles: PopupCallbackHandles;
  settings: PopupGlobalSettings | null;
  toolTips: { [key: string]: ToolTipHandler };
  globalConfig: PopupGlobalSettings;
}

export interface PopupShift {
  left: number;
  top: number;
}

export interface PopupData {
  backgroundFill: string;
  popupPosition: PopupPosition;
  showRequested: boolean;
  hideRequested: boolean;
  isDisplayed: boolean;
  isInit: boolean;
  popupId: string;
  retries: 0;
  positioner: HTMLElement | null;
  svgParams: SvgParams | null;
}

export interface PopupRects {
  positioner: DOMRect;
  content: DOMRect;
  window: PopupWidthHeight;
}

export interface ToolTipData {
  toolTipText: string;
  ready: boolean;
  tips: ToolTipRef[];
  tipIndex: { [key: string]: number };
}
