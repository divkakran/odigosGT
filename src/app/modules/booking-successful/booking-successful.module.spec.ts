import { BookingSuccessfulModule } from './booking-successful.module';

describe('BookingSuccessfulModule', () => {
  let bookingSuccessfulModule: BookingSuccessfulModule;

  beforeEach(() => {
    bookingSuccessfulModule = new BookingSuccessfulModule();
  });

  it('should create an instance', () => {
    expect(bookingSuccessfulModule).toBeTruthy();
  });
});
