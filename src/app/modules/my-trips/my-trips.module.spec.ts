import { MyTripsModule } from './my-trips.module';

describe('MyTripsModule', () => {
  let myTripsModule: MyTripsModule;

  beforeEach(() => {
    myTripsModule = new MyTripsModule();
  });

  it('should create an instance', () => {
    expect(myTripsModule).toBeTruthy();
  });
});
