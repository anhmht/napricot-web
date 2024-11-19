export function useMediaQuery() {
  return {
    isMobile: useState<boolean>('isMobile', () => false),
    isDesktop: useState<boolean>('isDesktop', () => false),
  };
}
