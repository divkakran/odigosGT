import { GuideRedirectModule } from './guide-redirect.module';

describe('GuideRedirectModule', () => {
  let guideRedirectModule: GuideRedirectModule;

  beforeEach(() => {
    guideRedirectModule = new GuideRedirectModule();
  });

  it('should create an instance', () => {
    expect(guideRedirectModule).toBeTruthy();
  });
});
