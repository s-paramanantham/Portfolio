export interface UseHeroSectionViewModelReturn {
  readonly scrollToSection: (sectionId: string) => void;
}

export const useHeroSectionViewModel = (): UseHeroSectionViewModelReturn => {
  const scrollToSection = (sectionId: string): void => {
    if (typeof window === 'undefined') return;

    const targetId = sectionId === 'work' ? 'projects' : sectionId;
    const element = document.getElementById(targetId) || document.getElementById(sectionId);

    if (element) {
      const yOffset = -70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + yOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return {
    scrollToSection,
  };
};
