type QueryKey = [string, ...string[]];

export default class Query<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  QueryFn extends (...params: any[] | never) => any,
  Key extends QueryKey = QueryKey,
  Params extends unknown[] | never = Parameters<QueryFn>,
  Data = ReturnType<QueryFn>,
> {
  public queryFn: QueryFn;
  public baseKey: Key;

  constructor(queryFn: QueryFn, baseKey: Readonly<Key>) {
    this.baseKey = baseKey;
    this.queryFn = queryFn;
  }

  public getKey = (...params: Params) => {
    return [...this.baseKey, ...params.map(String)] as const;
  };

  public create = (...params: Params) => {
    return {
      queryKey: this.getKey(...params),
      queryFn: () => this.queryFn(...params) as Data,
    };
  };
}
