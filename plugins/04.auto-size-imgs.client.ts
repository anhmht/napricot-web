export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    const { isMobile, isDesktop } = useMediaQuery();

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    isMobile.value = mediaQuery.matches;
    isDesktop.value = !mediaQuery.matches;

    const addImageSizes = () => {
      const imgs = document.querySelectorAll<HTMLImageElement>('img:not([width]):not([height])');
      imgs.forEach((img) => {
        // Wait for the image to load to ensure it has rendered sizes
        img.onload = () => {
          if (img.width && img.height) {
            img.setAttribute('width', img.width.toString());
            img.setAttribute('height', img.height.toString());
          }
        };

        // For cached images, force the `onload` event to trigger
        if (img.complete) {
          img.onload?.(new Event('load'));
        }
      });
    };
    // Run on DOMContentLoaded and whenever new content is added (e.g., via navigation)
    document.addEventListener('DOMContentLoaded', addImageSizes);
    const observer = new MutationObserver(addImageSizes);
    observer.observe(document.body, { childList: true, subtree: true });
  });
});
