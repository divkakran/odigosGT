import { BookingFailureModule } from './booking-failure.module';

describe('BookingFailureModule', () => {
  let bookingFailureModule: BookingFailureModule;

  beforeEach(() => {
    bookingFailureModule = new BookingFailureModule();
  });

  it('should create an instance', () => {
    expect(bookingFailureModule).toBeTruthy();
  });
});
