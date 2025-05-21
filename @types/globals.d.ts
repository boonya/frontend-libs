declare global {
  const NODE_ENV: 'production' | 'development' | 'test';

  /**
   * A really nice little type helper if you are trying to debug some
   * really complicated inheritance based inference.
   *
   * @see: https://www.youtube.com/watch?v=2lCCKiWGlC0&ab_channel=MattPocock
   */
  type Prettify<T> = {[K in keyof T]: T[K]} & {};

  /**
   * A type helper to declare not empty generic array.
   */
  type NonEmptyArray<T> = [T, ...T[]];
}
