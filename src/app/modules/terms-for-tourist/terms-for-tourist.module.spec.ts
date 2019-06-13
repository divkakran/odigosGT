import { TermsForTouristModule } from './terms-for-tourist.module';

describe('TermsForTouristModule', () => {
  let termsForTouristModule: TermsForTouristModule;

  beforeEach(() => {
    termsForTouristModule = new TermsForTouristModule();
  });

  it('should create an instance', () => {
    expect(termsForTouristModule).toBeTruthy();
  });
});
