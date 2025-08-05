import Query from './query';

const sumFn = async (...args: number[]) => args.reduce((a, b) => a + b, 0);

describe('constructor', () => {
  it('should instantiate valid query object.', () => {
    const queryInstance = new Query(sumFn, ['base']);

    expect(queryInstance).toEqual({
      baseKey: ['base'],
      queryFn: sumFn,
      getKey: expect.any(Function),
      create: expect.any(Function),
    });
  });
});

describe('getKey', () => {
  it('should return a combination of baseKey and arguments.', () => {
    const queryInstance = new Query(sumFn, ['sum']);

    const actual = queryInstance.getKey(2, 3);
    expect(actual).toEqual(['sum', '2', '3']);
  });

  it.each([
    {params: [], expected: ['base']},
    {params: [1], expected: ['base', '1']},
    {params: [1, 2], expected: ['base', '1', '2']},
    {params: [1, 2, 3], expected: ['base', '1', '2', '3']},
  ])('should return $expected when called with $params', ({params, expected}) => {
    const queryInstance = new Query(jest.fn(), ['base']);
    const actual = queryInstance.getKey(...params);
    expect(actual).toEqual(expected);
  });
});

describe('create', () => {
  it('should return a query object.', () => {
    const queryInstance = new Query(sumFn, ['sum']);

    const query = queryInstance.create(2, 3);
    expect(query).toEqual({
      queryKey: ['sum', '2', '3'],
      queryFn: expect.any(Function),
    });
  });

  it.each([
    {params: [], expected: 0},
    {params: [1], expected: 1},
    {params: [1, 2], expected: 3},
    {params: [1, 2, 3], expected: 6},
    {params: [1, 2, 3, 4], expected: 10},
  ])('should return $expected when called with $params', ({params, expected}) => {
    const sum = new Query(sumFn, ['sum']);

    const query = sum.create(...params).queryFn();
    expect(query).resolves.toBe(expected);
  });
});
