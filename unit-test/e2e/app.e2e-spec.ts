import { UnitTestPage } from './app.po';

describe('unit-test App', () => {
  let page: UnitTestPage;

  beforeEach(() => {
    page = new UnitTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
