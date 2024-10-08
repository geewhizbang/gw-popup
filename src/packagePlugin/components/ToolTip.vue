<template>
  <PopUp mode="tooltip" :props="{ isManual: true }" :id="id">
    <div :class="cssClass">{{ data.toolTipText }}</div>
  </PopUp>
</template>

<script lang="ts">
import { useEventListener } from '@vueuse/core';
import { defineComponent, inject, ref } from 'vue';
import type {
  ToolTipData,
  ToolTipRef,
  PopupManagerType,
} from '../types/popupTypes';
import PopUp from './PopUp.vue';

export default defineComponent({
  name: 'ToolTip',
  components: {
    PopUp,
  },
  setup() {
    const data: ToolTipData = {
      toolTipText: '',
      ready: false,
      tips: [],
      tipIndex: {},
    };

    const callbacks: (() => void)[] = [];

    const popupManager = inject('popupManager') as PopupManagerType;

    return {
      data: ref(data),
      callbacks: ref(callbacks),
      popupManager,
    };
  },
  methods: {
    registerTooltips(refs: ToolTipRef[]) {
      refs.forEach(item => {
        const index = this.data.tipIndex[item.refName]
          ? this.data.tipIndex[item.refName]
          : this.data.tips.length;
        this.data.tipIndex[item.refName] = index;
        const tipItem: ToolTipRef = {
          refName: item.refName,
          ref: item.ref,
          text: item.text,
          direction: item.direction,
        };
        this.data.tips[index] = tipItem;
        const handler = useEventListener(tipItem.ref, 'mouseenter', () => {
          this.show(tipItem.refName);
        });
        this.callbacks[index] = handler;

        const closeHandler = useEventListener(tipItem.ref, 'mouseleave', () => {
          this.hide();
        });
        this.callbacks[index] = closeHandler;
      });
      this.data.ready = true;
    },
    show(refKey: string) {
      const tip = this.data.tips[this.data.tipIndex[refKey]];
      this.data.toolTipText = tip.text;
      this.popupManager.showPopup(this.id, tip.ref, tip.direction);
    },
    hide() {
      this.popupManager.hidePopup(this.id);
    },
  },
  props: {
    id: {
      type: String,
      default: 'ToolTip',
    },
    cssClass: {
      type: String,
      default: 'toolTip',
    },
  },
  mounted() {
    this.popupManager.connectToolTip(this.id, this.registerTooltips);
  },
  beforeUnmount() {
    this.popupManager.disconnectToolTip(this.id);
    this.callbacks.forEach(callback => {
      callback();
    });
    this.callbacks = [];
  },
});
</script>
