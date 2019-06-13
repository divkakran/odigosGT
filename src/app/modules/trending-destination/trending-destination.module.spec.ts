import { TrendingDestinationModule } from './trending-destination.module';

describe('TrendingDestinationModule', () => {
  let trendingDestinationModule: TrendingDestinationModule;

  beforeEach(() => {
    trendingDestinationModule = new TrendingDestinationModule();
  });

  it('should create an instance', () => {
    expect(trendingDestinationModule).toBeTruthy();
  });
});
