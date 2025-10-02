/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function getErrorMessage(error: any): string {
  return (
    error?.response?.data?.message ||
    error?.message ||
    error?.error?.message ||
    error
  );
}
