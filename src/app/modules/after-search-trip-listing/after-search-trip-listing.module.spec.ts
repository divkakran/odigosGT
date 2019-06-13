import { AfterSearchTripListingModule } from './after-search-trip-listing.module';

describe('AfterSearchTripListingModule', () => {
  let afterSearchTripListingModule: AfterSearchTripListingModule;

  beforeEach(() => {
    afterSearchTripListingModule = new AfterSearchTripListingModule();
  });

  it('should create an instance', () => {
    expect(afterSearchTripListingModule).toBeTruthy();
  });
});
