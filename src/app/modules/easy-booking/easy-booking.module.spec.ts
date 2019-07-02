import { EasyBookingModule } from './easy-booking.module';

describe('EasyBookingModule', () => {
  let easyBookingModule: EasyBookingModule;

  beforeEach(() => {
    easyBookingModule = new EasyBookingModule();
  });

  it('should create an instance', () => {
    expect(easyBookingModule).toBeTruthy();
  });
});
