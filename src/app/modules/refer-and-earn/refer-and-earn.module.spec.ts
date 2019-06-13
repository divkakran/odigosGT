import { ReferAndEarnModule } from './refer-and-earn.module';

describe('ReferAndEarnModule', () => {
  let referAndEarnModule: ReferAndEarnModule;

  beforeEach(() => {
    referAndEarnModule = new ReferAndEarnModule();
  });

  it('should create an instance', () => {
    expect(referAndEarnModule).toBeTruthy();
  });
});
