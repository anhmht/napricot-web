export default defineNuxtPlugin((nuxtApp) => {
  const addImageSizesWithObserver = () => {
    const imgs = document.querySelectorAll<HTMLImageElement>('img[data-width][data-height]');

    imgs.forEach((img) => {
      img.onload = () => {
        // Update dimensions dynamically from natural size
        if (img.naturalWidth && img.naturalHeight) {
          img.setAttribute('width', img.naturalWidth.toString());
          img.setAttribute('height', img.naturalHeight.toString());
        }
      };

      // Trigger for cached images
      if (img.complete) {
        img.onload?.(new Event('load'));
      }
    });
  };
  if (import.meta.client) {
    nuxtApp.hook('page:finish', addImageSizesWithObserver);
  }
});
