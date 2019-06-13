import { BlogRedirectionModule } from './blog-redirection.module';

describe('BlogRedirectionModule', () => {
  let blogRedirectionModule: BlogRedirectionModule;

  beforeEach(() => {
    blogRedirectionModule = new BlogRedirectionModule();
  });

  it('should create an instance', () => {
    expect(blogRedirectionModule).toBeTruthy();
  });
});
