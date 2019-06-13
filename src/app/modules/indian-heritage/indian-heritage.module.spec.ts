import { IndianHeritageModule } from './indian-heritage.module';

describe('IndianHeritageModule', () => {
  let indianHeritageModule: IndianHeritageModule;

  beforeEach(() => {
    indianHeritageModule = new IndianHeritageModule();
  });

  it('should create an instance', () => {
    expect(indianHeritageModule).toBeTruthy();
  });
});
