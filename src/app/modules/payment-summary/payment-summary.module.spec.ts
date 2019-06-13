import { PaymentSummaryModule } from './payment-summary.module';

describe('PaymentSummaryModule', () => {
  let paymentSummaryModule: PaymentSummaryModule;

  beforeEach(() => {
    paymentSummaryModule = new PaymentSummaryModule();
  });

  it('should create an instance', () => {
    expect(paymentSummaryModule).toBeTruthy();
  });
});
