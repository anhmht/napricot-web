import { ref, onMounted, onUnmounted } from 'vue';

export function useActiveToc(tocIds: string[]) {
  const activeId = ref<string | null>(null);

  onMounted(() => {
    const observer = new IntersectionObserver(
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
    tocIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    onUnmounted(() => {
      observer.disconnect(); // Cleanup observer
    });
  });

  return { activeId };
}
