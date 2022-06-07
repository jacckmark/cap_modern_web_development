import {newE2EPage} from '@stencil/core/testing';

describe('toggle-button', () => {
  let page;
  let toggle;

  it('should render a turned on toggle-button after click', async () => {
    page = await newE2EPage();
    await page.setContent(`<toggle-button></toggle-button>`);
    toggle = await page.find('toggle-button');
    await toggle.click();
    await page.compareScreenshot('test3');
    expect(toggle).toHaveClass('toggle-on');
  });

  it('should render a turned off toggle-button after click', async () => {
    page = await newE2EPage();
    await page.setContent(`<toggle-button checked></toggle-button>`);
    toggle = await page.find('toggle-button');
    await toggle.click();
    await page.compareScreenshot('test4');
    expect(toggle).not.toHaveClass('toggle-on');
  });
});
