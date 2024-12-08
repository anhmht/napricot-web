import { ref } from 'vue';

export function useActiveToc() {
  const activeId = ref<string | null>(null);
  const tocIds = ref<string[]>([]);
  const slug = ref<string | null>(null);
  const observer = ref<IntersectionObserver | null>(null);

  const getActiveId = () => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id; // Update active section ID
          }
        });
      },
      {
        root: null, // Viewport as root
        rootMargin: '0px 0px -60% 0px', // Trigger when 50% of the section is visible
        threshold: 0.5, // 50% visibility required
      }
    );

    // Observe each section
    tocIds.value.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        if (observer.value) {
          observer.value.observe(element);
        }
      }
    });
  }

  const cleanUp = () => {
    if (observer.value) {
      tocIds.value = [];
      observer.value.disconnect();
      // observer.value = null;
      slug.value = null;
    }
  }

  watch(tocIds, () => {
    getActiveId();
  })

  onMounted(() => {
    getActiveId()
  })

  onBeforeUnmount(() => {
    tocIds.value = []
    cleanUp()
  })

  return { activeId, tocIds, slug, getActiveId , cleanUp };
}
