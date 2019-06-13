import { GuideInformationModule } from './guide-information.module';

describe('GuideInformationModule', () => {
  let guideInformationModule: GuideInformationModule;

  beforeEach(() => {
    guideInformationModule = new GuideInformationModule();
  });

  it('should create an instance', () => {
    expect(guideInformationModule).toBeTruthy();
  });
});
