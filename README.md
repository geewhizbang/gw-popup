# GW-Popup Vue3 Component

This project provides an installable Vue3 Popup component, compatible with Vite and Vue3. It also includes a demo app to help you get started.

## Installation

Install the package along with its peer dependencies:

```bash
npm install gw-popup pinia vueuse
```

If you already have pinia and vueuse installed, you can just install the package:

````bash
npm install gw-popup

## Setting up Pinia

To set up Pinia, you need to import the package and create a Pinia instance in your main file main.ts or main.js:

```typescript
import { createPinia } from 'pinia';

const pinia = createPinia();
app.use(pinia);
````

## Setting up vueUse

You shouldn't need to do anything to set up vueUse, but you need to make sure you have it installed.

## Note on Pinia

This package uses Pinia for state management. Make sure to set up Pinia in your main file as shown in the installation instructions above.

## Note on VueUse

This package uses VueUse for event listening. Make sure you have it installed.

## Usage

Here's a basic example of how to use the Popup component in your Vue files:

```vue
<template>
  <div>
    <button @click="showPopup">Show Popup</button>
    <GWPopup mode="tooltip" id="myPopup">
      <!-- Popup content -->
    </GWPopup>
  </div>
</template>

<script>
export default {
  setup() {
    const PopupManager = usePopupManager();

    const showPopup = () => {
      PopupManager.showPopup('myPopup');
    };

    return { showPopup };
  },
};
</script>
```

## License and Usage Terms

This project is licensed under the MIT License with the following additional clause:

While this software is free to use for non-commercial and educational purposes, we kindly request that users make a fair contribution for commercial use. This contribution helps support the ongoing development and maintenance of this project.

For commercial use:

1. Please contact Geoffrey Swenson at geewhizbang@gmail.com to discuss licensing terms.
2. The suggested contribution is $20 USD to $200 USD based on the scale of usage.

By using this software in a commercial context, you agree to make a good faith effort to contribute to its development.

See the [LICENSE](LICENSE) file for the full MIT License text.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you find this project helpful, please consider supporting its development:

- [Link to your preferred payment method or platform]
- Star the repository
- Spread the word about the project

Your support helps ensure the continued development and maintenance of this open-source tool.
