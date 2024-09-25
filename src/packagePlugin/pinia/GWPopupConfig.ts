import { type PopupGlobalSettings } from '../types/popupTypes';

// variables:
//    T: position of arrow from corner (x or y)
//    W: width
//    H: height,
//   AW: arrow width,
//   AH: arrow height,
//    R: corner radius,
//

export type PopupModeKeys = 'tooltip' | 'popup' | 'windowPopup' | 'dialog';

export const DefaultPopupConfig: PopupGlobalSettings = {
  log: false,
  debugMode: false,
  modes: {
    dialog: {
      props: {
        isPositioned: false,
        class: 'centered',
        paddingX: 10,
        paddingY: 10,
        arrowOffset: 6,
        logging: false,
        isManual: true,
        isModal: true,
        direction: 'e',
      },
    },
    tooltip: {
      props: {
        isManual: false,
        direction: 'e',
      },
      directionMap: {
        n: {
          yReverse: true,
          switchXY: false,
          svgElements: ['arrowBox'],
          startOffset: 'H',
        },
        e: {
          yReverse: false,
          switchXY: true,
          svgElements: ['arrowBox'],
          startOffset: '0',
        },
        w: {
          yReverse: true,
          switchXY: true,
          svgElements: ['arrowBox'],
          startOffset: 'W',
        },
        s: {
          yReverse: false,
          switchXY: false,
          svgElements: ['arrowBox'],
          startOffset: '0',
        },
      },
    },
    popup: {
      props: {
        isManual: true,
        logging: false,
        isModal: true,
        direction: 'e',
      },
    },
    windowPopup: {
      props: {
        isPositioned: false,
        class: 'centered',
        isManual: true,
        logging: true,
        isModal: true,
      },
    },
  },
  svgElements: {
    arrowBox: {
      fill: 'backgroundColor',
      pathTemplate: `
        M {{T}},{{S}}
        l {{AW/2}},{{AH}}
        l {{W-T-R-AW/2}},0
        q {{R}},0 {{R}},{{R}}
        l 0,{{H-R-R-AH}}
        q 0,{{R}} -{{R}},{{R}}
        l -{{W-R-R}},0
        q -{{R}},0 -{{R}},-{{R}}
        l 0,-{{H-R-R-AH}}
        q 0,-{{R}} {{R}},-{{R}}
        l {{W-T-AW/2-R}},0
        z
      `,
    },
  },
};

let CurrentPopupConfig: PopupGlobalSettings = { ...DefaultPopupConfig };

export function setPopupConfig(config: Partial<PopupGlobalSettings>) {
  CurrentPopupConfig = { ...DefaultPopupConfig, ...config };
}

export function getPopupConfig(): PopupGlobalSettings {
  return CurrentPopupConfig;
}

export default CurrentPopupConfig;
