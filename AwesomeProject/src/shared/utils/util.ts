/**
 * wait for a while
 * @param step milliseconds
 * @param times x times step
 * @returns
 */
export function waitForRandom(step: number, times: number) {
  return new Promise<void>(resolve => {
    const waitFor =
      step * ((Math.floor(Math.random() * 100 * times) % times) + 1);
    setTimeout(() => {
      resolve();
    }, waitFor);
  });
}
