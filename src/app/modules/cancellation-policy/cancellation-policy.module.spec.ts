import { CancellationPolicyModule } from './cancellation-policy.module';

describe('CancellationPolicyModule', () => {
  let cancellationPolicyModule: CancellationPolicyModule;

  beforeEach(() => {
    cancellationPolicyModule = new CancellationPolicyModule();
  });

  it('should create an instance', () => {
    expect(cancellationPolicyModule).toBeTruthy();
  });
});
