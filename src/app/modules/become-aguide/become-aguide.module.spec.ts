import { BecomeAGuideModule } from './become-aguide.module';

describe('BecomeAGuideModule', () => {
  let becomeAGuideModule: BecomeAGuideModule;

  beforeEach(() => {
    becomeAGuideModule = new BecomeAGuideModule();
  });

  it('should create an instance', () => {
    expect(becomeAGuideModule).toBeTruthy();
  });
});
