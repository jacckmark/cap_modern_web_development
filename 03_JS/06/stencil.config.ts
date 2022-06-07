import { Config } from '@stencil/core';
import {sass} from '@stencil/sass';
import {angularOutputTarget, ValueAccessorConfig} from "@stencil/angular-output-target";
import {reactOutputTarget} from "@stencil/react-output-target";

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['toggle-button'],
    event: 'stateHasBeenChanged',
    targetAttr: 'checked',
    type: 'boolean',
  }
  ];

export const config: Config = {
  namespace: 'togglebutton',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@capgemini/core',
      directivesProxyFile: '../toggle_button_stenciljs-angular/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings
    }),
    reactOutputTarget({
      componentCorePackage: '@softbits/core',
      proxiesFile: '../toggle_button_stenciljs-react/src/components.ts'
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      baseUrl: 'http://localhost:3000',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    sass()
  ]
};
