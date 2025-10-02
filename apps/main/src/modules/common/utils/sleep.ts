import { Milliseconds } from '../types';

const ONE_SECOND: Milliseconds = 1000;

/**
 * Sleep for a given duration.
 *
 * @param duration - the duration to sleep for in milliseconds. Default is 1 second.
 */
export async function sleep(
  duration: Milliseconds = ONE_SECOND,
): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}
