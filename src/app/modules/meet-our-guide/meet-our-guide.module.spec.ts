import { MeetOurGuideModule } from './meet-our-guide.module';

describe('MeetOurGuideModule', () => {
  let meetOurGuideModule: MeetOurGuideModule;

  beforeEach(() => {
    meetOurGuideModule = new MeetOurGuideModule();
  });

  it('should create an instance', () => {
    expect(meetOurGuideModule).toBeTruthy();
  });
});
