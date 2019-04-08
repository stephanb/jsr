/** rAF Promise wrapper */
export const rAF: () => Promise<number> = () => {
  return new Promise((resolve) => requestAnimationFrame(resolve));
};
