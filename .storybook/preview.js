import React from 'react';
import {addParameters, addDecorator} from '@storybook/react';
import {setConsoleOptions} from '@storybook/addon-console';
import {withContexts} from '@storybook/addon-contexts/react';
import {text, withKnobs} from '@storybook/addon-knobs';

import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';

const primary = text('primary', '#008060');
const surface = text('surface', '#111213');
const onSurface = text('onSurface', '#111213');
const interactive = text('interactive', '#2e72d2');
const secondary = text('secondary', '#111213');
const critical = text('critical', '#d82c0d');
const warning = text('warning', '#ffc453');
const highlight = text('highlight', '#5bcdda');
const success = text('success', '#008060');
const decorative = text('decorative', '#ffc96b');

addParameters({
  options: {
    // showRoots: true,
  },
  percy: {
    skip: true,
    widths: [375, 1280],
  },
});

addDecorator(function PaddingDecorator(story) {
  return <div style={{padding: '8px'}}>{story()}</div>;
});

function StrictModeToggle({isStrict = false, children}) {
  const Wrapper = isStrict ? React.StrictMode : React.Fragment;
  return <Wrapper>{children}</Wrapper>;
}

addDecorator(
  withContexts([
    {
      title: 'Strict Mode',
      components: [StrictModeToggle],
      params: [
        {name: 'Disabled', props: {isStrict: false}},
        {name: 'Enabled', default: true, props: {isStrict: true}},
      ],
    },
    {
      title: 'Global Theming',
      components: [AppProvider],
      params: [
        {
          name: 'Disabled',
          default: true,
          props: {i18n: enTranslations},
        },
        {
          name: 'Enabled - Light Mode',
          props: {
            i18n: enTranslations,
            features: {unstableGlobalTheming: true},
            theme: {
              UNSTABLE_colors: {
                primary,
                surface,
                onSurface,
                interactive,
                secondary,
                critical,
                warning,
                highlight,
                success,
                decorative,
              },
              colorScheme: 'light',
            },
          },
        },
        {
          name: 'Enabled - Dark Mode',
          props: {
            i18n: enTranslations,
            features: {unstableGlobalTheming: true},
            theme: {
              UNSTABLE_colors: {
                primary,
                surface,
                onSurface,
                interactive,
                secondary,
                critical,
                warning,
                highlight,
                success,
                decorative,
              },
              colorScheme: 'dark',
            },
          },
        },
      ],
    },
  ]),
);

// addon-console
setConsoleOptions((opts) => {
  // When transpiling TS using isolatedModules, the compiler doesn't strip
  // out exported types as it doesn't know if an item is a type or not.
  // Ignore those warnings as we don't care about them.
  // ignore color because the addon doesn't handle colored logs properly
  opts.panelExclude = [
    ...opts.panelExclude,
    /export .* was not found in/,
    /color: #999933;/,
  ];
  return opts;
});

addDecorator(withKnobs);
