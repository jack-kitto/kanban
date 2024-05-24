import type { Preview } from "@storybook/react";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import '../src/styles/globals.css'; // replace with the name of your tailwind css file
import { abort } from "process";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <NextUIProvider>
          <Story />
        </NextUIProvider>
      </div>
    ),
  ],
};

export default preview;
