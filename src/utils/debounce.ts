function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const fnCall = () => {
      fn.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}

export default debounce;
