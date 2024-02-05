import { userEvent, within } from '@storybook/testing-library';
import type { Meta, StoryObj } from '@storybook/vue3';

import SelectList from './SelectList.vue';
import SelectRoot from './SelectRoot.vue';
import SelectOption from './SelectOption.vue';

type Product = {
  id: string;
  name: string;
  price: number;
};

const meta: Meta<typeof SelectRoot> = {
  component: SelectRoot,
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div style="display: grid; place-items: center; height: 100vh; width: 100vw; margin: -1rem;" class="d-grid place-item"><div style="max-width: 30rem; width: 100%;"><story /></div></div>',
    }),
  ],
  render: (args) => ({
    components: { SelectRoot, SelectList, SelectOption },
    setup() {
      const products: Product[] = [
        {
          id: 'vf5plo3eudi6e5ss9apsi8x4',
          name: 'Modern Chair',
          price: 12,
        },
        {
          id: 'vf5plo3eudi6e5ss9apsi8x4',
          name: 'Luxury Chair',
          price: 12,
        },
      ];

      return { args, products };
    },
    template:
      '<SelectRoot v-bind="args"><SelectList><SelectOption v-for="product in products" :key="product.id">{{ product.name }}</SelectOption></SelectList></SelectRoot>',
  }),
  args: {
    //👇 The args you need here will depend on your component
  },
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof SelectRoot>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Closed: Story = {};

export const Opened: Story = {
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    await userEvent.tab();

    userEvent.keyboard('{ArrowDown}');
  },
};
