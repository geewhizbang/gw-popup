import { defineStore } from 'pinia';
import { useEventListener } from '@vueuse/core';
import type { PopupModeKeys } from './GWPopupConfig.ts';
import { getPopupConfig } from './GWPopupConfig.ts';
import type {
  PopupCallbackDict,
  PopupGlobalSettings,
  PopupPropsDefined,
  PopupServiceData,
  ToolTipHandler,
  ToolTipRef,
  PopupRegistration,
  PopupCallbacks,
  PopupStatusDict,
  PopupCallbackHandles,
  PopupStatusKeys,
  PopupWidthHeight,
  PopupCallbackKeys,
  PopupProps,
  PopupDirection,
  PopupDirectionMapItem,
  PopupBoxParams,
  SvgParams,
} from '../types/popupTypes.ts';

export const usePopupStore = defineStore('popup', {
  state: () =>
    ({
      popupIndex: 0,
      status: {} as PopupStatusDict,
      callbacks: {} as PopupCallbackDict,
      callbackHandles: {} as PopupCallbackHandles,
      settings: null as PopupGlobalSettings | null,
      toolTips: {} as { [key: string]: ToolTipHandler },
      globalConfig: getPopupConfig(),
    }) as PopupServiceData,
  actions: {
    mergeConfig(
      mode: PopupModeKeys,
      baseConfig: PopupPropsDefined,
      overrides: PopupProps,
    ): PopupPropsDefined {
      try {
        const modeConfig = this.globalConfig.modes[mode].props;
        if (typeof modeConfig === 'undefined') {
          console.error('Popup Service handled non-existent mode key: ' + mode);
          return baseConfig;
        }
        baseConfig = this.mergeTool(baseConfig, modeConfig);
        if (typeof overrides !== 'undefined') {
          baseConfig = this.mergeTool(baseConfig, overrides);
        }
      } catch (e) {
        console.error(
          'Unexpected error in PopupStore mergeConfig for: ' + mode,
        );
      }
      return baseConfig;
    },
    mergeTool(
      baseConfig: PopupPropsDefined,
      overrides: PopupProps,
    ): PopupPropsDefined {
      const keys = Object.keys(overrides) as (keyof PopupProps)[];
      keys.forEach(key => {
        const newValue = overrides[key];
        if (typeof newValue !== 'undefined') {
          this.setPropValue(key, baseConfig, newValue);
        }
      });
      return baseConfig;
    },
    setPropValue<K extends keyof PopupPropsDefined>(
      key: K,
      config: PopupPropsDefined,
      value: PopupPropsDefined[K],
    ) {
      config[key] = value;
    },
    connectToolTip(id: string, handler: ToolTipHandler) {
      this.toolTips[id] = handler;
    },
    registerToolTips(id: string, refs: ToolTipRef[], index = 5) {
      if (this.toolTips[id]) {
        this.toolTips[id](refs);
      } else {
        if (index > 0) {
          setTimeout(() => this.registerToolTips(id, refs, index - 1), 100);
        } else {
          console.error(`Tooltip handler for id '${id}' not found`);
        }
      }
    },
    disconnectToolTip(id: string) {
      delete this.toolTips[id];
    },
    config(settings: PopupGlobalSettings) {
      this.settings = settings;
    },

    buildArrowBox(params: PopupBoxParams): SvgParams | null {
      const result: SvgParams = {
        width: params.width + 'px',
        height: params.height + 'px',
        viewbox: `0 0 ${params.width} ${params.height}`,
        paths: [],
      };
      //console.time('buildArrowBox');

      const directionMap = this.globalConfig.modes[params.mode].directionMap;
      if (!directionMap) return null;

      const directionSettings = directionMap[params.direction];
      if (!directionSettings) {
        console.error(
          'Popup.vue expected to find a direction map item for:' +
            params.direction,
        );
        return null;
      }

      directionSettings.svgElements.forEach(boxKey => {
        const box = this.globalConfig.svgElements[boxKey];

        const w = directionSettings.switchXY ? params.height : params.width;
        const h = directionSettings.switchXY ? params.width : params.height;
        const startOffsetMapping: { [key: string]: number } = {
          H: params.height,
          W: params.width,
          '-H': -params.height,
          '-W': -params.width,
          '0': 0,
        };

        // Evaluate s on startOffset
        const s = startOffsetMapping[directionSettings.startOffset] ?? 0;

        const ah = directionSettings.switchXY
          ? params.arrowWidth
          : params.arrowHeight;
        const aw = directionSettings.switchXY
          ? params.arrowHeight
          : params.arrowWidth;
        const values = {
          T: params.arrowPosition,
          S: s,
          W: w,
          H: h,
          AW: aw,
          AH: ah,
          R: params.cornerRadius,
        };

        const path = this.processSvgTemplate(
          box.pathTemplate,
          values,
          directionSettings,
        );

        result.paths.push({
          class: boxKey,
          path: path,
          fill: box.fill,
        });
      });
      //console.timeEnd('buildArrowBox');
      return result;
    },

    processSvgTemplate(
      template: string,
      values: { [key: string]: number },
      directionSettings: PopupDirectionMapItem,
    ): string {
      const processedTemplate = template.replace(
        /\{\{(.*?)\}\}/g,
        (_, expr) => {
          try {
            return String(
              Function(
                ...Object.keys(values),
                `return ${expr}`,
              )(...Object.values(values)),
            );
          } catch (e) {
            console.error(`Error processing template expression: ${expr}`, e);
            return 'NaN';
          }
        },
      );

      const commands = processedTemplate
        .trim()
        .split('\n')
        .map(cmd => cmd.trim());

      if (directionSettings.yReverse) {
        commands.forEach((cmd, index) => {
          const parts = cmd.split(/[ ,]/);
          if (parts[0] !== 'M') {
            for (let i = 2; i < parts.length; i += 2) {
              parts[i] = ',' + String(-Number(parts[i]));
            }
          }
          commands[index] = parts.join(' ').split(' ,').join(',');
        });
      }

      if (directionSettings.switchXY) {
        commands.forEach((cmd, index) => {
          const parts = cmd.split(/[ ,]/);
          for (let i = 1; i < parts.length; i += 2) {
            [parts[i], parts[i + 1]] = [parts[i + 1], ',' + parts[i]];
          }
          commands[index] = parts.join(' ').split(' ,').join(',');
        });
      }

      return commands.join(' ');
    },

    percentHeightWidth(percent: number): PopupWidthHeight {
      return {
        height: (percent * window.innerWidth) / 100,
        width: (percent * window.innerHeight) / 100,
      };
    },

    log(label: string, data: object) {
      if (this.settings?.log) {
        console.log(label + ':' + JSON.stringify(data, null, '  '));
      }
    },

    logSimple(message: string) {
      if (this.settings?.log) {
        console.log(message);
      }
    },

    attachEvents(popupId: string, config: PopupRegistration) {
      const showAction = this.callbackHandles[popupId].show;
      if (showAction !== null) {
        showAction();
      }

      this.logSimple('attachEvent: show');
      const showListener = useEventListener(
        config.eventObject,
        config.eventOn,
        () => {
          this.callbacks[popupId].show({ positioner: config.positioner });
          const hideAction = this.callbackHandles[popupId].hide;
          if (hideAction !== null) {
            hideAction();
          }
          this.logSimple('attachEvent: hide');
          const hideListener = useEventListener(
            config.eventObject,
            config.eventOff,
            () => {
              this.callbacks[popupId].hide({ positioner: '' });
            },
          );
          this.callbackHandles[popupId].hide = hideListener;
        },
      );

      this.callbackHandles[popupId].show = showListener;
    },

    attachEvent(
      popupId: string,
      eventObject: HTMLElement | Window,
      eventName: keyof WindowEventMap,
      action: PopupCallbackKeys,
    ) {
      const currentAction = this.callbackHandles[popupId][action];
      if (currentAction !== null && eventName) {
        currentAction();
      }

      this.logSimple('attachEvent: ' + action);
      const listener = useEventListener(eventObject, eventName, () => {
        this.callbacks[popupId][action]({});
      });

      this.callbackHandles[popupId][action] = listener;
    },

    registerPopup(
      popupId: string,
      config: PopupRegistration,
      callbacks: PopupCallbacks,
    ): string {
      if (!popupId) {
        popupId = 'popup_' + this.popupIndex++;
      }
      if (this.callbacks[popupId]) {
        this.logSimple('duplicate popup register, removing prior callback');
        this.destroyPopup(popupId);
        this.logSimple('Popup ' + popupId + ' was re-registered');
      }

      this.callbacks[popupId] = callbacks;
      this.callbackHandles[popupId] = { show: null, hide: null, refresh: null };

      if (config.eventObject && !config.isManual && config.positioner) {
        this.attachEvents(popupId, config);
      }

      this.attachEvent(popupId, window, 'resize', 'refresh');

      this.status[popupId] = {
        isTooltip: config.isTooltip,
        isOpen: false,
      };
      this.logSimple('registered popup: ' + popupId);
      return popupId;
    },

    destroyPopup(id: string) {
      this.logSimple('Destroyed pop up: ' + id);

      try {
        if (this.callbackHandles[id].hide !== null) {
          this.callbackHandles[id].hide();
        }

        if (this.callbackHandles[id].show !== null) {
          this.callbackHandles[id].show();
        }

        if (this.callbackHandles[id].refresh !== null) {
          this.callbackHandles[id].refresh();
        }

        delete this.callbacks[id];
        delete this.callbackHandles[id];
        delete this.status[id];
        this.popupIndex = 0;
      } catch (e) {
        console.error('Error destroying popup ' + id);
      }
    },

    closeOpenTooltips(popupId: string) {
      Object.keys(this.status).forEach((key: string) => {
        if (
          key !== popupId &&
          this.status[key].isOpen &&
          this.status[key].isTooltip
        ) {
          this.logSimple('Tooltip: ' + key + ' autoclosed');
          this.callbacks[key].hide({});
          this.logSimple('autoclosed: ' + key);
          this.status[key].isOpen = false;
        }
      });
    },

    showPopup(
      id: string,
      positioner?: HTMLElement | string,
      direction?: PopupDirection,
    ) {
      setTimeout(() => {
        if (this.callbacks[id]) {
          this.callbacks[id].show({
            positioner: positioner ? positioner : '',
            direction: direction,
          });
          this.status[id].isOpen = true;
        } else {
          console.log('showPopup: Popup ' + id + ' was not found');
        }
      }, 10);
    },

    hidePopup(id: string) {
      if (this.callbacks[id]) {
        this.callbacks[id].hide({});
      } else {
        this.logSimple('hidePopup: Popup ' + id + ' was not found');
      }
    },

    refreshPopup(id: string) {
      const popup = this.callbacks[id];
      if (popup) {
        setTimeout(() => popup.refresh({}), 100);
      }
    },

    setStatus(id: string, state: PopupStatusKeys, status: boolean) {
      if (!this.status[id]) {
        this.status[id] = { isOpen: false, isTooltip: true };
        this.logSimple(
          'PopupStore.setStatus:' + id + ',' + state + ',' + status,
        );
      }
      this.status[id][state] = status;
    },

    reset(): void {
      this.callbacks = {} as PopupCallbackDict;
      this.callbackHandles = {} as PopupCallbackHandles;
      this.status = {} as PopupStatusDict;
      this.popupIndex = 0;
    },
  },
});
