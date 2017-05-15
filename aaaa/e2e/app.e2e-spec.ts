import { AaaaPage } from './app.po';

describe('aaaa App', () => {
  let page: AaaaPage;

  beforeEach(() => {
    page = new AaaaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
