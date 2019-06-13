import { EnquiryModule } from './enquiry.module';

describe('EnquiryModule', () => {
  let enquiryModule: EnquiryModule;

  beforeEach(() => {
    enquiryModule = new EnquiryModule();
  });

  it('should create an instance', () => {
    expect(enquiryModule).toBeTruthy();
  });
});
