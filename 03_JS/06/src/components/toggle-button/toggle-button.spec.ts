import {newSpecPage} from '@stencil/core/testing';
import {ToggleButton} from './toggle-button';

it('should render turned off toggle-button component', async () => {
  const page = await newSpecPage({
    components: [ToggleButton],
    html: `<toggle-button></toggle-button>`,
  });
  expect(page.root).toEqualHtml(`
    <toggle-button>
    <mock:shadow-root>
         <div class="switch">
          <div class="round slider"></div>
         </div>
       </mock:shadow-root>
    </toggle-button>
  `);
});

it('should render turned on toggle-button component', async () => {
  const page = await newSpecPage({
    components: [ToggleButton],
    html: `<toggle-button checked></toggle-button>`,
  });
  expect(page.root).toEqualHtml(`
    <toggle-button checked class="toggle-on">
    <mock:shadow-root>
         <div class="switch">
          <div class="round slider"></div>
         </div>
       </mock:shadow-root>
    </toggle-button>
  `);
});
