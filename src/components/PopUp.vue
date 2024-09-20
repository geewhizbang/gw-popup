<template>
  <teleport to="body">
    <div
      class="gw-popup"
      :class="config.class"
      v-if="config.isPositioned || data.isDisplayed"
    >
      <div class="popupContainer">
        <div class="popupElements" :style="styles.element">
          <template v-if="data.svgParams !== null">
            <template
              v-for="(path, index) in data.svgParams.paths"
              :key="path.class"
            >
              <svg
                xml:space="preserve"
                :width="data.svgParams.width"
                :height="data.svgParams.height"
                :viewBox="data.svgParams.viewbox"
              >
                <path
                  class="popupPath"
                  :class="path.class"
                  :fill="getFill(index)"
                  :d="path.path"
                />
              </svg>
            </template>
          </template>
          <div
            v-if="config.isModal && data.isDisplayed"
            class="modalBackground"
            v-on:click="forceHide()"
          ></div>
          <div class="popupContent" ref="popupContent" :style="styles.content">
            <slot ref="content"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { useEventListener } from '@vueuse/core';
import { defineComponent, ref, type PropType, type StyleValue } from 'vue';
import { usePopupStore } from '../pinia/PopupStore.ts';

import type {
  PopupCallbacks,
  PopupDirection,
  PopupProps,
  PopupPropsDefined,
  PopupRegistration,
  PopupShowParams,
  PopupData,
  PopupPosition,
  PopupShift,
  PopupRects,
  SvgParams,
} from '../types/popupTypes.ts';

import type { PopupModeKeys } from '../pinia/GWPopupConfig.ts';

export default defineComponent({
  name: 'PopUp',
  setup(props) {
    const svgParams: SvgParams | null = null;

    const popupPosition: PopupPosition = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };

    const contentStyle: StyleValue = {};
    const elementStyle: StyleValue = {};

    const data = {
      backgroundFill: 'transparent',
      popupPosition: popupPosition,
      showRequested: false,
      hideRequested: false,
      isDisplayed: false,
      isInit: false,
      popupId: '',
      retries: 0,
      positioner: null,
      svgParams: svgParams,
    } as PopupData;

    const shifts: { [key: string]: PopupShift } = {
      current: {
        left: 0,
        top: 0,
      },
      original: {
        left: 0,
        top: 0,
      },
    };

    const propDefaults = {
      arrowDistance: 2,
      arrowHeight: 7,
      arrowOffset: 12,
      arrowPosition: 'center',
      arrowWidth: 9,
      class: '',
      cornerRadius: 3,
      debugMode: false,
      direction: 'e',
      eventOff: 'mouseleave',
      eventOn: 'mouseenter',
      isManual: false,
      isModal: false,
      isPositioned: true,
      isTooltip: true,
      logging: false,
      paddingX: 6,
      paddingY: 2,
      popupOffset: 0,
      popupPosition: 'center',
      positioner: '',
      shiftX: 0,
      shiftY: 0,
      zIndex: 100,
    } as PopupPropsDefined;

    data.popupId = props.id;
    const popupStore = usePopupStore();
    const config = popupStore.mergeConfig(
      props.mode,
      propDefaults,
      props.props,
    );

    return {
      data: ref(data),
      shifts: ref(shifts),
      styles: ref({
        content: contentStyle,
        element: elementStyle,
      }),
      config: config,
      closeHandle: () => {},
      popupStore,
    };
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    mode: {
      type: String as PropType<PopupModeKeys>,
      required: true,
    },
    props: {
      type: Object as PropType<PopupProps>,
      default: () => {},
    },
    refSource: {
      type: Object,
      default: null,
    },
    autoOpen: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getFill(index: number): string | undefined {
      return this.data.svgParams?.paths[index].fill === 'backgroundColor'
        ? this.data.backgroundFill
        : this.data.svgParams?.paths[index].fill;
    },
    forceHide() {
      if (this.data.isDisplayed && !this.config.isModal) {
        this.styles.element = { top: '-3000px', left: '-3000px' };
      }
      this.data.hideRequested = false;
      this.data.showRequested = false;
      this.data.isDisplayed = false;

      this.popupStore.setStatus(this.data.popupId, 'isOpen', false);
      this.closeHandle();
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    refresh(_dummy: PopupShowParams) {
      if (this.data.isDisplayed && this.data.positioner) {
        this.show({ positioner: this.data.positioner });
      }
    },

    log(message: string) {
      if (this.config.logging === true) {
        console.log(message);
      }
    },

    show(params: PopupShowParams) {
      this.log('show: ' + this.data.popupId);
      let positionerTemp: HTMLElement | null = null;

      if (this.config.isPositioned) {
        const positioner = params.positioner;
        if (typeof positioner === 'string') {
          positionerTemp = this.$parent?.$refs[positioner] as HTMLElement;
          if (typeof positionerTemp !== 'undefined') {
            this.data.positioner = positionerTemp;
          } else {
            positionerTemp = this.$parent?.$parent?.$refs[
              positioner
            ] as HTMLElement;
          }
        } else {
          positionerTemp = positioner as HTMLElement;
        }
        if (!positionerTemp) {
          this.log('Popup.vue could not find positioner for id: ' + this.id);
        }

        let positionerRef = positionerTemp as HTMLElement;

        if (this.data.showRequested) {
          this.data.hideRequested = false;
        }
        this.data.showRequested = true;

        const delay = setTimeout(() => {
          this.data.showRequested = false;
          if (this.data.hideRequested) {
            this.hide({});
            this.log('hide requested');
          }
          clearTimeout(delay);
        }, 200);
        this.data.isDisplayed = true;

        this.popupStore.closeOpenTooltips(this.data.popupId);

        let rects: PopupRects;

        const popupContent = this.$refs.popupContent as HTMLElement;
        let children: HTMLCollection = popupContent.children;

        if (typeof children === 'undefined') {
          return;
          //exit, the popup content has been destroyed.
        } else {
          children = popupContent.children;
        }

        try {
          rects = {
            positioner: positionerRef.getBoundingClientRect(),
            content: children[0].getBoundingClientRect(),
            window: this.popupStore.percentHeightWidth(100),
          };
        } catch (e) {
          this.log(
            'the content or positioner probably no longer rendered, so close:\n' +
              e,
          );
          this.hide({});
          return;
        }

        if (rects.positioner.top > 20000) {
          const timeout = setTimeout(() => {
            this.data.retries++;
            if (this.data.retries > 1) {
              this.log('we are hosed on popup retries');
            } else {
              this.show({ positioner: this.data.positioner as HTMLElement });
            }
            [];
            clearTimeout(timeout);
          }, 100);
        }
        let shiftPosition = { left: 0, top: 0 } as PopupShift;

        this.data.retries = 0;
        const popupElement = popupContent.children[0] as HTMLElement;
        this.data.backgroundFill =
          window.getComputedStyle(popupElement).backgroundColor;

        let direction = this.config.direction;
        if (
          params.direction !== null &&
          typeof params.direction !== 'undefined'
        ) {
          direction = params.direction as PopupDirection;
        }

        if (!this.data.isInit) {
          this.shifts.original.left = 0;
          this.shifts.original.top = 0;
          this.shifts.current.left = this.config.shiftX;
          this.shifts.current.top = this.config.shiftY;
          this.data.isInit = true;
        } else {
          shiftPosition = {
            left: this.shifts.current.left,
            top: this.shifts.current.top,
          };
        }
        let offPage = false;
        let style = {} as PopupPosition;
        let contentStyle = { top: 0, left: 0 };
        let iterator = 0;

        do {
          offPage = false;
          this.log('Direction: ' + this.config.direction);
          switch (direction) {
            case 'n':
              style = {
                left: this.getPos(rects, direction),
                top:
                  rects.positioner.top -
                  this.config.arrowDistance -
                  (rects.content.height +
                    2 * this.config.paddingY +
                    this.config.arrowHeight),
                width: rects.content.width + 2 * this.config.paddingX,
                height:
                  rects.content.height +
                  2 * this.config.paddingY +
                  this.config.arrowHeight,
              };
              contentStyle.left = this.config.paddingX;
              contentStyle.top = this.config.paddingY;
              break;
            case 'e':
              style = {
                left: rects.positioner.right + this.config.arrowDistance,
                top: this.getPos(rects, direction),
                width:
                  rects.content.width +
                  this.config.arrowWidth +
                  2 * this.config.paddingX,
                height: rects.content.height + 2 * this.config.paddingY,
              };
              contentStyle.left =
                this.config.arrowHeight + this.config.paddingX;
              contentStyle.top = this.config.paddingY;
              break;
            case 's':
              style = {
                left: this.getPos(rects, direction),
                top: rects.positioner.top + rects.positioner.height,
                width: rects.content.width + 2 * this.config.paddingX,
                height:
                  rects.content.height +
                  2 * this.config.paddingY +
                  this.config.arrowHeight,
              };
              contentStyle.left = this.config.paddingX;
              contentStyle.top = this.config.paddingY + this.config.arrowHeight;
              break;
            case 'w':
              style = {
                left:
                  rects.positioner.left -
                  rects.content.width -
                  2 * this.config.paddingX -
                  this.config.arrowDistance -
                  this.config.arrowHeight,
                top: this.getPos(rects, direction),
                width:
                  rects.content.width +
                  2 * this.config.paddingX +
                  this.config.arrowHeight,
                height: rects.content.height + 2 * this.config.paddingY,
              };
              contentStyle.left = this.config.paddingX;
              contentStyle.top = this.config.paddingY;
              break;
          }

          if (style.top + style.height > rects.window.height) {
            shiftPosition.top =
              shiftPosition.top -
              (rects.window.height - (style.top + style.height)) +
              this.popupStore.percentHeightWidth(10)['height'];
            offPage = true;
          }
          const isCentered = direction === 'e' || direction === 'w';
          if (
            style.top + style.height <
            rects.positioner.top -
              (isCentered
                ? rects.positioner.height / 2
                : this.popupStore.percentHeightWidth(10)['height'])
          ) {
            shiftPosition = {
              top: this.shifts.original.top,
              left: this.shifts.original.left,
            };
            offPage = true;
          }

          if (offPage) {
            this.shifts.current.left = shiftPosition.left;
            this.shifts.current.top = shiftPosition.top;
          }
          iterator++;
        } while (offPage && iterator < 2); // if we had problems try again with corrected shiftPosition

        let styleValue: StyleValue = {
          width: style.width + 'px',
          height: style.height + 'px',
          top: style.top + 'px',
          left: style.left + 'px',
          zIndex: this.config.zIndex,
        };

        this.data.popupPosition = style;
        let arrowPosition = 0;

        let calcDim: keyof DOMRect = 'height';
        switch (direction) {
          case 'n':
          case 's':
            calcDim = 'width';
            break;
        }

        switch (this.config.arrowPosition) {
          case 'min':
            arrowPosition = this.config.arrowDistance;
            break;
          case 'center':
            arrowPosition = style[calcDim] / 2;
            break;
          case 'max':
            arrowPosition = style[calcDim] - this.config.arrowDistance;
            break;
        }

        this.data.svgParams = this.popupStore.buildArrowBox({
          mode: this.mode,
          arrowHeight: this.config.arrowHeight,
          arrowWidth: this.config.arrowWidth,
          arrowPosition: arrowPosition,
          height: style.height,
          width: style.width,
          cornerRadius: this.config.cornerRadius,
          direction: direction,
        });

        this.styles.element = styleValue;
        this.styles.content = {
          left: contentStyle.left + 'px',
          top: contentStyle.top + 'px',
        };

        if (this.config.isTooltip) {
          this.closeHandle = useEventListener(
            window,
            'mouseMove',
            (event: MouseEvent) => {
              if (
                Math.abs(event.clientX - style.left) > 200 ||
                Math.abs(event.clientY - style.top) > 200
              ) {
                this.forceHide();
                this.log('force hidden');
              }
            },
          );
        }
      } else {
        this.styles.element = {};
        this.data.isDisplayed = true;
        this.$nextTick(() => {
          const popupContent = this.$refs.popupContent as HTMLElement;
          let children: HTMLCollection = popupContent.children;

          if (typeof children === 'undefined') {
            return;
            //exit, the popup content has been destroyed.
          } else {
            children = popupContent.children;
          }

          const contentRect = children[0].getBoundingClientRect();

          this.styles.content = {
            width: contentRect.width + 2 * this.config.paddingX + 'px',
            height: contentRect.height + 2 * this.config.paddingY + 'px',
            background: window.getComputedStyle(children[0]).backgroundColor,
            padding:
              this.config.paddingY + 'px ' + (this.config.paddingX + 'px'),
          };
        });
      }
    },

    getPos(rects: PopupRects, direction: PopupDirection): number {
      const isNoS = ['n', 's'].indexOf(direction) > -1;
      let size: keyof DOMRect = isNoS ? 'width' : 'height';
      let padSize = this.config[isNoS ? 'paddingX' : 'paddingY'];
      const positioner = rects.positioner;
      const content = rects.content;
      let result = positioner[isNoS ? 'x' : 'y'];

      switch (this.config.popupPosition) {
        case 'max':
          result =
            result +
            positioner[size] +
            this.config.popupOffset -
            content[size] -
            padSize;
          break;
        case 'center':
          result =
            result + (positioner[size] - content[size] - padSize * 2) / 2;
          break;
        case 'min':
          result = result - padSize - this.config.popupOffset;
          break;
      }
      return result;
    },

    hide(_dummy: PopupShowParams) {
      this.log('hide: ' + this.data.popupId);

      if (!this.config.isPositioned) {
        this.data.isDisplayed = false;
        return;
      }

      if (!this.data.isDisplayed) {
        return;
      }

      if (this.data.showRequested) {
        this.data.hideRequested = true;
        return;
      }

      const delay = setTimeout(() => {
        if (!this.data.showRequested) {
          let style = this.data.popupPosition;
          style.top = this.config.debugMode ? 300 : -3000;
          style.left = this.config.debugMode ? 300 : -3000;
          let styleValue: StyleValue = {
            width: style.width + 'px',
            height: style.height + 'px',
            top: style.top + 'px',
            left: style.left + 'px',
            zIndex: this.config.zIndex,
          };
          this.styles.element = styleValue;
          this.data.isDisplayed = false;
          this.popupStore.setStatus(this.data.popupId, 'isOpen', false);
          this.closeHandle();
        } else {
          clearTimeout(delay);
          this.data.hideRequested = false;
        }
      }, 2000);

      this.data.hideRequested = true;
    },
    startUp(tries: number) {
      const methods = {
        show: this.show,
        hide: this.hide,
        refresh: this.refresh,
      } as PopupCallbacks;

      let positioner: HTMLElement | null = null;
      let positionerRef: any | null = null;
      if (!this.config.isManual) {
        let tryRect: DOMRect | null = null;
        if (
          typeof this.$parent?.$refs[this.config.positioner] !== 'undefined'
        ) {
          positionerRef = this.$parent?.$refs[this.config.positioner];
          if (positionerRef) {
            positioner = positionerRef as HTMLElement;
          }
          if (positioner !== null) {
            tryRect = positioner.getBoundingClientRect() as DOMRect;
          }
        }
        if (tryRect === null) {
          tries++;
          if (tries < 11) {
            setTimeout(() => {
              this.startUp(tries);
            }, 20);
          } else {
            this.log('PopUp.vue could not find ref: ' + this.config.positioner);
          }
          return;
        } else {
          this.log(
            'Popup found positioner: ' +
              this.config.positioner +
              ' on try ' +
              tries,
          );
        }
      }

      const popupConfig: PopupRegistration = {
        isTooltip: this.config.isTooltip,
        isModal: this.config.isModal,
        isManual: this.config.isManual,
        positioner: this.config.positioner,
        eventObject: positioner,
        eventOn: this.config.eventOn as keyof WindowEventMap,
        eventOff: this.config.eventOff as keyof WindowEventMap,
      };

      //if id is provided, it uses the popup id, or the service creates one. Ids have to be unique or events overwrite each other.
      this.data.popupId = this.popupStore.registerPopup(
        this.id,
        popupConfig,
        methods,
      );
      this.popupStore.setStatus(this.data.popupId, 'isOpen', false);

      if (this.autoOpen) {
        this.show({ positioner: this.config.positioner });
      }
    },
  },
  mounted() {
    this.$nextTick(() => this.startUp(1));
  },
  beforeUnmount() {
    this.popupStore.destroyPopup(this.data.popupId);
    this.closeHandle();
  },
});
</script>

<style lang="scss">
@import '../styles/_gwPopup.scss';
</style>
