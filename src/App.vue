<template>
  <header>
    <img src="./assets/gwPopupLogo.svg" alt="GW-Popup Logo" />
    <h1>Configurable easy-to-use Vue3 Popup / Tooltip Control (0.0.7 Beta)</h1>
  </header>
  <main>
    <div class="panels">
      <div class="sidePanel">
        <div class="box">
          <h2>GW-Popup avoids the gotchas you get with other controls</h2>
          <h3><IconCheck /><span>It's Configurable</span></h3>
          <div>
            <p>
              It can do tooltips, modal popups, relatively positioned popups,
              child popups, you can display more than one popup at a time, or
              automatically close currently open popups or tooltips.
            </p>
          </div>
          <h3><IconCheck /><span>With no Configuration Hell</span></h3>
          <div>
            <p>
              You can create your own named popup modes in a central
              configuration file. This approach offers several advantages:
            </p>
            <ul>
              <li>
                The application remains uncluttered, avoiding complex instances
                of the control with with multiple properties.
              </li>
              <li>
                If you decide to restyle popups or tooltips, you usually won't
                have to go through the entire application making changes.
              </li>
              <li>
                You can change properties in one central place, and any
                overrides in individual controls will still work as expected and
                won't get mangled by manual editing.
              </li>
            </ul>
          </div>
          <h3>
            <IconCheck /><span>Simple, Clean, Fast Semantic CSS / HTML</span>
          </h3>
          <div>
            <p>
              The CSS and HTML used by all the controls is simple and very
              clean, no complex Bootstrap or Tailwind non-semantic layout to
              deal with. YOU have control over the CSS the way gawd intended
              with meaningful but simple CSS styles and HTML. If you prefer to
              bloat your app with Bootstrap markup, you can still use it.
              Rendered size is 34k, gzipped 10k.
            </p>
          </div>
          <h3><IconCheck /><span>SVG Graphics</span></h3>
          <div>
            <p>
              SVG path templates are used to draw the graphics such as bubble
              outlines or icons. You can create your own SVG templates for these
              graphics, including multiple elements if you wish. Or not, of
              course you can just design your own CSS and HTML.
            </p>
          </div>
          <h3><IconCheck /><span>GW-Popup uses Vue3 Teleport</span></h3>
          <div>
            <p>
              This means that the popup is not rendered in the DOM tree, but is
              teleported to the body of the document.
            </p>
            <ul>
              <li>
                This allows full positioning of the popup independent of the
                container.
              </li>
              <li>
                It can be positioned absolutely with CSS or relatively with a
                Vue3 ref.
              </li>
              <li>
                The contents of the popup rendered as part of the current
                component, so forms and data don't have to be awkwardly passed
                to a separate component.
              </li>
            </ul>
          </div>
          <h3><IconCheck /><span>Written in TypeScript</span></h3>
          <div>
            <p>
              The code is written in TypeScript, so you can catch errors before
              they happen.
            </p>
          </div>
          <h3><IconCheck /><span>GW-Popup is a Native Vue3 Component</span></h3>
          <div>
            <p>
              It is NOT a wrapper for a third party control, does not make
              changes to the DOM independently of Vue3.
            </p>
          </div>
        </div>
      </div>
      <div class="contentPanel">
        <div>
          <h2>Installation and Setup</h2>
          <div class="box">
            <h3>Install the package</h3>
            <p>Install GW-Popup</p>
            <p class="code">npm install gw-popup</p>
            <h3>Load the stylesheet</h3>
            <p>Load the stylesheet in your main.ts or main.js file:</p>
            <p class="code">import 'gw-popup/dist/gw-popup.css';</p>
            <p>Or in index.html:</p>
            <p class="code">
              &lt;link rel="stylesheet" href="gw-popup.css" /&gt;
            </p>
            <h3>Set up Pinia, PopupPlugin, and PopUp, ToolTip components</h3>

            <p>In your main.ts or main.js file:</p>
            <p class="code">
              import { createApp } from 'vue';<br />
              import { createPinia } from 'pinia';<br />
              import { PopUp, ToolTip, PopupPlugin } from 'gw-popup';<br />
              const app = createApp(App);<br />
              app.component('PopUp', PopUp);<br />
              app.component('ToolTip', ToolTip);<br />
              const pinia = createPinia();<br />
              <br />
              app.use(pinia);<br />
              app.use(PopupPlugin);<br />
              <br />
              app.mount('#app');
            </p>
          </div>
        </div>
        <div>
          <h2>Examples</h2>
          <div class="box">
            <h3>Hard coded Individual Tooltips</h3>
            <p>
              A Vue3 slot is used to display the content of the tooltip. The
              toolTip positioner is a ref to the button.
            </p>

            <div class="example">
              <button ref="tipRefManual_e">Direction E</button>
              <PopUp
                mode="tooltip"
                :props="{ positioner: 'tipRefManual_e', direction: 'e' } as PopupProps
                "
                id="toolTip_ec"
              >
                <div class="toolTip">Tooltip Message: Button E</div>
              </PopUp>
            </div>

            <!-- prettier-ignore -->
            <p class="codeBlock">
              &lt;<span class="tag">button</span> <span class="attr">ref</span>=<span class="string">"tipRef_e"</span>&gt;Direction E&lt;/<span class="tag">button</span>&gt;<br>
              &lt;<span class="tag">PopUp</span> <span class="attr">mode</span>=<span class="string">"tooltip"</span><span class="attr">:props</span>=<span class="string">"{positioner: 'tipRef_e', direction:'e'}"</span>&gt;<br>
              &nbsp;&nbsp;&lt;<span class="tag">div</span> <span class="attr">class</span>=<span class="string">"toolTip"</span>&gt;Tooltip Message: e&lt;/<span class="tag">div</span>&gt;<br>
              &lt;/<span class="tag">PopUp</span>&gt;
            </p>
          </div>

          <div class="box">
            <h3>Tooltips example</h3>
            <p>
              Tooltips can also be registered with a script rather than hard
              coded in the template. The advantage of this approach is that you
              can use the same tooltip for multiple buttons. The tooltip can
              even be on a common template, it doesn't need to be part of the
              current component.
            </p>
            <div class="example">
              <div class="separatedButtons">
                <button ref="tipRef_n">Direction n</button>
                <button ref="tipRef_e">Direction e</button>
                <button ref="tipRef_w">Direction w</button>
                <button ref="tipRef_s">Direction s</button>
              </div>
            </div>

            <p>Button Template</p>
            <!-- prettier-ignore -->
            <p class="codeBlock">
              &lt;<span class="tag">div</span>&nbsp;class="example"><br />
              &nbsp;&nbsp; &lt;<span class="tag">div</span>&nbsp;class="separatedButtons"><br />
              &nbsp;&nbsp;&nbsp;&nbsp; &lt;<span
                class="tag">button</span>&nbsp;ref="tipRef_n">Direction&nbsp;n&lt;/button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp; &lt;<span
                class="tag">button</span>&nbsp;ref="tipRef_e">Direction&nbsp;e&lt;/button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp; &lt;<span
                class="tag">button</span>&nbsp;ref="tipRef_w">Direction&nbsp;w&lt;/button&gt;<br />
              &nbsp;&nbsp;&nbsp;&nbsp; &lt;<span
                class="tag">button</span>&nbsp;ref="tipRef_s">Direction&nbsp;s&lt;/button&gt;<br />
              &nbsp;&nbsp;&lt;/<span class="tag">div</span>&gt;<br />
              &lt;/<span class="tag">div</span>&gt;
            </p>

            <p>ToolTip Template (anywhere on the page or a parent component)</p>
            <!-- prettier-ignore -->
            <p class="codeBlock">
              &lt;<span class="tag">ToolTip</span><span class="attr"> mode</span>="tooltip"<span class="attr">
                id</span>="ToolTip"&gt;&lt;/<span class="tag">ToolTip</span>&gt;
            </p>
            <p>Script</p>
            <!-- prettier-ignore -->
            <p class="codeBlock">
              export default defineComponent({<br>
              &nbsp;&nbsp;name: 'PopupDemo',<br>
              &nbsp;&nbsp;components: {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;PopUp,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;IconCheck,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;ToolTip,<br>
              &nbsp;&nbsp;},<br>
              &nbsp;&nbsp;setup() {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;const PopupManager = usePopupManager();<br>
              &nbsp;&nbsp;&nbsp;&nbsp;return {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PopupManager,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;};<br>
              &nbsp;&nbsp;},<br>
              &nbsp;&nbsp;methods: {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;openPopup() {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.PopupManager.showPopup('windowPopupExample');<br>
              &nbsp;&nbsp;&nbsp;&nbsp;},<br>
              &nbsp;&nbsp;&nbsp;&nbsp;getRefKeys(index: number) {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const directions = ['n', 'e', 'w', 's'];<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const tooltipRefs: ToolTipRef[] = [];<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;directions.forEach(direction =&gt; {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const refName = 'tipRef_' + direction;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const refItem = this.$refs[refName];<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (typeof refItem !== 'undefined') {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tooltipRefs.push({<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;refName: refName,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ref: refItem as HTMLElement,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text: 'Tooltip Direction: ' +
              direction,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;direction: direction as
              PopupDirection,<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (tooltipRefs.length === directions.length) {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.PopupManager.registerToolTips('ToolTip',
              tooltipRefs);<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} else {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index++;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (index &lt; 5) {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.$nextTick(() =&gt; {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.getRefKeys(index);<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} else {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.error('Tip refs were not found');<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
              &nbsp;&nbsp;&nbsp;&nbsp;},<br>
              &nbsp;&nbsp;},<br>
              &nbsp;&nbsp;mounted() {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;this.$nextTick(() =&gt; {<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.getRefKeys(0);<br>
              &nbsp;&nbsp;&nbsp;&nbsp;});<br>
              &nbsp;&nbsp;},<br>
              });
            </p>
          </div>
          <div class="box">
            <h3>Centered Modal Popup</h3>
            <p>Click on the button to open a popup</p>
            <div class="example">
              <button v-on:click="popupManager.showPopup('windowPopupExample')">
                Click to see popup
              </button>
            </div>
            <PopUp mode="windowPopup" id="windowPopupExample">
              <div class="gwp-mediumModal">
                <div class="box">
                  <h3>Example of a Modal Popup</h3>
                  <p>
                    This is a modal window popup. Click outside the window to
                    close it. It can be closed with a button as well. This mode
                    doesn't use a ref to position it. CSS markup positions the
                    popup but the size of the wrapper is calculated by the
                    rendered size of the html. If your popup changes size, you
                    may have to refresh it.
                  </p>
                  <p>
                    Note that the popup automatically picks up the background
                    color of the container div that wraps the content, which
                    makes it easy to have different versions of the popup
                    without CSS or configuration hell hassles.
                  </p>
                </div>
              </div>
            </PopUp>

            <h3>Code</h3>
            <!-- prettier-ignore -->
            <p class="codeBlock">
              &lt;<span class="tag">div</span> <span class="attr">class</span>=<span
                class="string">"example"</span>&gt;<br>
              &nbsp;&nbsp;&lt;<span class="tag">button</span> <span class="attr">v-on:click</span>=<span
                class="string">"this.PopupManager.showPopup('windowPopupExample');"</span>&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;Click to see popup<br>
              &nbsp;&nbsp;&lt;/<span class="tag">button</span>&gt;<br>
              &lt;/<span class="tag">div</span>&gt;<br>
              <br>
              &lt;<span class="tag">PopUp</span> <span class="attr">mode</span>=<span
                class="string">"windowPopup"</span> <span class="attr">id</span>=<span
                class="string">"windowPopupExample"</span>&gt;<br>
              &nbsp;&nbsp;&lt;<span class="tag">div</span> <span class="attr">class</span>=<span
                class="string">"gwp-mediumModal"</span>&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">div</span> <span class="attr">class</span>=<span
                class="string">"box"</span>&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">h3</span>&gt;Example of a Modal Popup&lt;/<span
                class="tag">h3</span>&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">p</span>&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is a modal window popup. Click outside the window to
              close it. It<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be closed with a button as well. This mode doesn't use
              a ref to<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;position it. CSS markup positions the popup but the size
              of the wrapper<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is calculated by the rendered size of the html. If your
              popup changes<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size, you may have to refresh it.<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">p</span>&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="tag">p</span>&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note that the popup automatically picks up the background
              color of the<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;container div that wraps the content, which makes it easy
              to have<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;different versions of the popup without CSS or
              configuration hell<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hassles.<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">p</span>&gt;<br>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span class="tag">div</span>&gt;<br>
              &nbsp;&nbsp;&lt;/<span class="tag">div</span>&gt;<br>
              &lt;/<span class="tag">PopUp</span>&gt;
            </p>
          </div>
        </div>
        <div class="box">
          <h2>Popup Props and Custom Configurations</h2>
          <p>
            The PopUp component accepts various props to customize its behavior.
            Here's a list of available props and how to use them:
          </p>

          <ul>
            <li>
              <strong>mode</strong>: String - The mode of the popup (e.g.,
              'tooltip', 'popup', 'windowPopup', 'dialog')
            </li>
            <li>
              <strong>id</strong>: String - Unique identifier for the popup. It
              is optional, but of course if you want to reference the popup
              later, you need an unique id. Otherwise one will automatically be
              generated.
            </li>
            <li>
              <strong>props</strong>: Object - Additional properties for
              fine-tuning the popup behavior
            </li>
            <li>
              <strong>refSource</strong>: Object - Reference to the source
              element (optional)
            </li>
            <li>
              <strong>autoOpen</strong>: Boolean - Whether to open the popup
              automatically (default: false)
            </li>
          </ul>

          <p>Example usage in code:</p>
          <!-- prettier-ignore -->
          <p class="codeBlock">
            &lt;<span class="tag">PopUp</span><br />
            &nbsp;&nbsp;<span class="attr">mode</span>=<span class="string">"tooltip"</span><br />
            &nbsp;&nbsp;<span class="attr">:props</span>=<span class="string">"{positioner: 'tipRef', direction:
              'e'}"</span><br />
            &nbsp;&nbsp;<span class="attr">id</span>=<span class="string">"myTooltip"</span>&gt;<br />
            &nbsp;&nbsp;&lt;<span class="tag">div</span>&gt;Tooltip content&lt;/<span class="tag">div</span>&gt;<br />
            &lt;/<span class="tag">PopUp</span>&gt;
          </p>
          <h3>Creating Custom Modes in GWPopupConfig.ts</h3>
          <p>
            You can create custom modes by modifying the
            <code>GWPopupConfig.ts</code> file. Here's an example of how to add
            a custom mode:
          </p>
          <p class="codeBlock">
            // In GWPopupConfig.ts<br />
            export const DefaultPopupConfig: PopupGlobalSettings = {<br />
            &nbsp;&nbsp;// ... existing config ...<br />
            &nbsp;&nbsp;modes: {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;// ... existing modes ...<br />
            &nbsp;&nbsp;&nbsp;&nbsp;customMode: {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;props: {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isPositioned:
            true,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;class:
            'my-custom-class',<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paddingX: 15,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;paddingY: 15,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arrowOffset: 8,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logging: false,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isManual: false,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;isModal: false,<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;direction: 'n',<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;},<br />
            &nbsp;&nbsp;},<br />
            };
          </p>
          <p>
            After defining a custom mode, you can use it in your Vue components
            like this:
          </p>
          <p class="codeBlock">
            &lt;<span class="tag">PopUp</span>
            <span class="attr">mode</span>=<span class="string"
              >"customMode"</span
            >
            <span class="attr">id</span>=<span class="string"
              >"myCustomPopup"</span
            >&gt;<br />
            &nbsp;&nbsp;&lt;<span class="tag">div</span>&gt;Custom popup
            content&lt;/<span class="tag">div</span>&gt;<br />
            &lt;/<span class="tag">PopUp</span>&gt;
          </p>
        </div>
      </div>
    </div>
    <footer>
      <p>
        <span>Github Link</span>
        <a href="https://github.com/geewhizbang/gwPopup">
          https://github.com/geewhizbang/gwPopup
        </a>
      </p>
      <p>
        <span>Developer</span>
        Geoffrey J. Swenson
        <a href="mailto:geewhizbang@gmail.com">geewhizbang@gmail.com</a>
      </p>
    </footer>
  </main>
  <ToolTip mode="tooltip" id="ToolTip"></ToolTip>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import {
  PopupProps,
  ToolTipRef,
  PopupDirection,
  PopupManagerType,
} from './packagePlugin';
import IconCheck from './icons/IconCheck.vue';

export default defineComponent({
  name: 'App',
  components: {
    IconCheck,
  },
  setup() {
    const popupManager = inject('popupManager') as PopupManagerType;
    if (!popupManager) {
      throw new Error('PopupManager not provided');
    }

    return {
      popupManager: popupManager,
    };
  },
  methods: {
    openPopup() {
      this.popupManager.showPopup('windowPopupExample');
    },
    getRefKeys(index: number) {
      const directions = ['n', 'e', 'w', 's'];
      const tooltipRefs: ToolTipRef[] = [];
      directions.forEach(direction => {
        const refName = 'tipRef_' + direction;
        const refItem = this.$refs[refName];
        if (typeof refItem !== 'undefined') {
          tooltipRefs.push({
            refName: refName,
            ref: refItem as HTMLElement,
            text: 'Tooltip Direction: ' + direction,
            direction: direction as PopupDirection,
          });
        }
      });
      if (tooltipRefs.length === directions.length) {
        this.popupManager.registerToolTips('ToolTip', tooltipRefs);
      } else {
        index++;
        if (index < 5) {
          this.$nextTick(() => {
            this.getRefKeys(index);
          });
        } else {
          console.error('Tip refs were not found');
        }
      }
    },
  },
  mounted() {
    this.getRefKeys(0);
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

$ratioValueScrollerButton: 2;

$colorRed: #bf3333;

$colorIconBgDefault: #e6e6e6;
$colorIconBgActive: #7b9cfb;
$colorIconBgHover: #c0e0c1;
$colorHelpIconBg: #2a0fc0;
$colorHelpIconBgHover: #3820c4;
$colorBgMedium: #bad7e7;
$colorBgLight: #cae8f8;
$colorBgMedium: #4fb89f;
$colorBgMediumDark: #2b846f;
$colorFontMedium: #888888;
$colorFooterBg: #073162;
$colorFooterText: #fff;
$colorRulerBg: white;
$colorRulerTick: #dddddd;
$colorRulerMajor: black;
$colorDrawingBgA: #8fa7bf;
$colorDrawingBgB: #f0f4f7;
$colorDark: #1c2f66;
$colorBgLight: #e0f4ec;
$colorButtonBg: #c2e6e5;
$colorButtonCancelBg: $colorRed;
$colorSelectionBorder: #224f74;

$colorArrow: #159c15;
$colorGreen: #159c15;
$colorButtonBgHover: #acd4d3;
$colorButtonBgSelected: #35bdb8;
$colorGray: #cccccc;
$colorGrayDark: #555555;
$colorGrayLightest: #f4f4fa;
$colorGrayMedDark: #888888;
$colorIndicatorSelected: #17edaa;
$colorIndicatorBorderSelected: #aff1dd;
$colorGrayLight: #e6e6e6;
$colorGrayLighter: #f2f2f2;
$colorBaseLight: #8eafdb;
$colorButton: #82b6d8;
$colorButtonLight: #e1eeef;
$colorButtonLightHover: #fbfbfb;
$colorBase: #5873d2;
$colorGrayMedium: #a2a2a2;
$colorGrayMediumLight: #b3b3b3;
$colorBarBg: #d1f1ec;
$colorHeaderBg: $colorBgLight;
$colorScrollBarBg: #d3e3f3;
$colorActiveTab: #93e9ea;
$colorActiveTabHover: #bdf3f5;
$colorSelectedTab: white;
$colorTabBorderSelected: #189597;
$colorTabBorderActive: #56babc;
$colorText: $colorGrayDark;
$colorDialogBar: #135c5d;
$colorSvgSelect: #93e9ea;
$colorIcon: #863da8;

$sizeFontBase: 14px;
$sizeButtonRadius: 6px;
$sizeA: 2px;
$sizeB: 3px;
$sizeC: 5px;
$sizeD: 7px;
$sizeE: 10px;
$sizeFontSmall: 0.7 * $sizeFontBase;
$sizeFontMed: 0.88 * $sizeFontBase;
$sizeHeaderHeight: 7.3 * $sizeFontBase;
$sizeHeaderSeparation: $sizeFontBase;
$sizeRulerBarWidth: $sizeFontBase * 2;
$sizeFooterHeight: 4 * $sizeFontBase;
$sizeModeBarWidth: 2.8 * $sizeFontBase;
$sizeRulerFont: 0.75 * $sizeFontBase;
$sizeScrollBarWidth: 1.5 * $sizeFontBase;
$sizePadding: 2 * $sizeFontBase;
$sizeIcon: 2 * $sizeFontBase;
$sizeIconRadius: 0.2 * $sizeFontBase;
$sizeToggleButtonLength: 6 * $sizeFontBase;
$sizeToggleButtonHeight: 2 * $sizeFontBase;

$sizePopupArrow: 0.4 * $sizeFontBase;

$vwFontBase: 0.65vw;
$vwPadSmall: 0.2 * $vwFontBase;
$vwPadMedium: 0.8 * $vwFontBase;
$vwValueScrollerWidth: 0.7 * $vwFontBase;
$sizeValueScrollerWidth: $sizeFontBase * 0.7;

$sizeSidePanelMax: 580px;

body {
  margin: 0;
  padding: 0;
  font-size: $sizeFontBase;
  line-height: 1.2 * $sizeFontBase;
  font-family: 'Open Sans', sans-serif;
  overflow: hidden;
}

svg {
  shape-rendering: geometricPrecision;
  text-rendering: geometricPrecision;
  image-rendering: optimizeQuality;
  fill-rule: evenodd;
  clip-rule: evenodd;
}

body * {
  box-sizing: border-box;
}

div,
ul,
li {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

h1 {
  font-size: 1.8 * $sizeFontBase;
  line-height: 2 * $sizeFontBase;
}

h2 {
  font-size: 1.5 * $sizeFontBase;
  line-height: 1.7 * $sizeFontBase;
  padding: 0;
  margin: $sizeD 0 $sizeD 0;

  &:first-child {
    margin-top: 0;
  }
}

h3 {
  font-size: 1.2 * $sizeFontBase;
  line-height: 1.4 * $sizeFontBase;
  padding: 0;
  margin: $sizeC 0 $sizeC 0;

  &:first-child {
    margin-top: 0;
  }
}

.icon {
  width: 1.7 * $sizeFontBase;
  height: 1.7 * $sizeFontBase;
  display: inline-block;

  .fillRed {
    fill: #8b1717;
  }
}

header {
  display: flex;
  flex-direction: row;
  background-color: #def7f7;
  height: $sizeHeaderHeight;

  padding: 0 img {
    height: 95%;
    margin: auto;
    display: block;
  }

  h1 {
    font-size: 2.3 * $sizeFontBase;
    line-height: 2.5 * $sizeFontBase;
    padding: 0;
    margin: 2 * $sizeFontBase 0 0 2 * $sizeD;
    display: block;
    width: auto;
    color: $colorDark;
    letter-spacing: -0.3px;
  }
}

main {
  position: fixed;
  top: $sizeHeaderHeight;
  left: 0;
  right: 0;
  padding: 0;
  margin: 0;
  bottom: $sizeFooterHeight;
}

.panels {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  .sidePanel {
    flex: 0 1 30%;
    min-width: 250px;
    max-width: $sizeSidePanelMax;
    height: 100%;
    background-color: #f2fafc;
    overflow-y: auto;
    padding-right: $sizeFontBase;
  }

  .contentPanel {
    flex: 1;
    width: 100%;
    height: calc(100% - $sizeC);
    margin-top: $sizeC;
    overflow-y: auto;
    padding: 1.2 * $sizeFontBase;

    p {
      margin-left: 1px;
    }

    h2 {
      margin: 0;

      & + .box {
        margin-top: 0;
        padding-top: $sizeD;
      }

      & + .box > h3 {
        margin-top: 0;
      }
    }

    h3 {
      padding: 0;
      margin-top: $sizeE;
    }

    .example {
      padding: 1.5 * $sizeFontBase;
      border-radius: 5px;
      margin-left: $sizeA;
      background-color: #8ac2a3;
    }

    .box {
      padding: $sizeC;
    }
  }
}

.relative {
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
}

.centeredLabel {
  display: block;
  margin: auto;
  width: 100%;
  text-align: center;
}

p {
  margin: $sizeC 0 $sizeD 0;
  padding: 0;
  font-size: $sizeFontBase;
  line-height: 1.45 * $sizeFontBase;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: $sizeFooterHeight - 6px;
  background: $colorFooterBg;
  padding: 1.5 * $sizeE;
  display: flex;
  flex-direction: row;

  p {
    margin: 0 1.5vw 0 0;
    padding: 0;

    span {
      display: inline-block;
      margin-right: $sizeC;
      color: cyan;
    }
  }

  * {
    color: $colorFooterText;
  }
}

.box {
  margin: 0;
  padding: 3 * $sizeD;
  max-width: 680px;

  h2 {
    color: $colorDark;

    > span {
      display: inline-block;
      margin-left: 10px;
    }
  }

  > h3 {
    color: $colorDark;
    font-size: 1.3 * $sizeFontBase;
    margin-bottom: $sizeA;

    span {
      position: relative;
      top: -$sizeC;
      left: $sizeC;
    }
  }

  .code {
    font-family: 'Consolas', 'Courier New', monospace;
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;

    & + h3 {
      padding-top: 2 * $sizeB;
    }
  }

  > div {
    margin-left: 4.15 * $sizeD;
    margin-bottom: $sizeE;

    p {
      margin-top: $sizeC;

      &:first-child {
        margin-top: 0;
        line-height: 1.45 * $sizeFontBase;
      }
    }
  }
}

ul {
  margin-left: 4.15 * $sizeD;

  li {
    line-height: 1.45 * $sizeFontBase;
    margin-top: $sizeC;

    &:first-child {
      margin-top: 0;
    }
  }
}

.margins {
  padding: 10px;
}

.separatedButtons {
  display: flex;
  flex-direction: row;

  > button {
    margin: 0 20px;
    display: block;
    width: 120px;
  }
}

button {
  border: none;
  border-radius: $sizeC;
  padding: $sizeC $sizeE;
  margin: 0;
  display: block;
}

pre {
  background-color: #1e1e1e;
  color: #d4d4d4;
  border-radius: 5px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.codeBlock {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.2;
  display: block;
  background-color: #2d2d32;
  color: #d4d4d4;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;

  .tag {
    color: #569cd6;
  }

  .attr {
    color: #9cdcfe;
  }

  .string {
    color: #ce9178;
  }
}

// Media query for smaller screens
@media (max-width: 768px) {
  .panels {
    flex-direction: column; // Stack panels vertically on smaller screens

    .sidePanel,
    .contentPanel {
      flex: none;
      width: 100%;
      max-width: none;
    }

    .sidePanel {
      height: auto; // Allow height to adjust to content
      max-height: 50vh; // Limit height on small screens
    }
  }
}
</style>
