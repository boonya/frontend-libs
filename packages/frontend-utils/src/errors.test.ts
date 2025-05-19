import {ExtendableError} from '.';

describe('ExtendableError', () => {
  it('should instantiate valid error object.', () => {
    class MyCustomError extends ExtendableError {}
    const error = new MyCustomError('An instance of extendable error.', {
      cause: 'The cause value',
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('MyCustomError');
    expect(error.message).toBe('An instance of extendable error.');
    expect(error.cause).toBe('The cause value');
  });
});
