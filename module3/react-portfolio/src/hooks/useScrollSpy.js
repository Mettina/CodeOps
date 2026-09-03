import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently in view and exposes it,
 * plus a setter so a nav click can update it immediately
 * (rather than waiting on the next intersection event).
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return [activeId, setActiveId];
}
