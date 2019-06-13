import { TermsForGuideModule } from './terms-for-guide.module';

describe('TermsForGuideModule', () => {
  let termsForGuideModule: TermsForGuideModule;

  beforeEach(() => {
    termsForGuideModule = new TermsForGuideModule();
  });

  it('should create an instance', () => {
    expect(termsForGuideModule).toBeTruthy();
  });
});
