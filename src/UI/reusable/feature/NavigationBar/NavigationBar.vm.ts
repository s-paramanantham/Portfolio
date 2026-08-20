import { useState, useEffect } from 'react';
import { NavigationItemBo } from '../../../../services/PortfolioService/bo/Navigation.bo';
import { PortfolioServiceInterface } from '../../../../services/PortfolioService/PortfolioService.interface';
import { ServiceFactory } from '../../../../services/ServiceFactory';
import { Logger } from '../../../../helpers/Logger';

export interface UseNavigationBarViewModelProps {
  readonly portfolioService?: PortfolioServiceInterface;
}

export interface UseNavigationBarViewModelReturn {
  readonly activeSection: string;
  readonly isScrolled: boolean;
  readonly isMobileMenuOpen: boolean;
  readonly navItems: readonly NavigationItemBo[];
  readonly toggleMobileMenu: () => void;
  readonly closeMobileMenu: () => void;
  readonly handleNavClick: (href: string, sectionId: string) => void;
}

export const useNavigationBarViewModel = (
  props: UseNavigationBarViewModelProps = {}
): UseNavigationBarViewModelReturn => {
  const { portfolioService = ServiceFactory.getPortfolioService() } = props;
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [navItems, setNavItems] = useState<readonly NavigationItemBo[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchNavItems = async () => {
      try {
        const items = await portfolioService.getNavigationItems();
        if (isMounted) {
          setNavItems(items);
        }
      } catch (error: unknown) {
        Logger.error('Failed to load navigation items', error);
      }
    };

    fetchNavItems();
    return () => {
      isMounted = false;
    };
  }, [portfolioService]);

  useEffect(() => {
    const handleScroll = (): void => {
      if (typeof window === 'undefined') return;

      setIsScrolled(window.scrollY > 20);

      // Check if at the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // Ordered list of section IDs in the page
      const sectionMapping: Record<string, string> = {
        home: 'home',
        experience: 'experience',
        journey: 'experience',
        scale: 'scale',
        projects: 'projects',
        capabilities: 'capabilities',
        about: 'about',
        contact: 'contact',
      };

      const trackedSections = [
        'home',
        'experience',
        'journey',
        'scale',
        'projects',
        'capabilities',
        'about',
        'contact',
      ];


      const threshold = window.innerHeight * 0.35;
      let matchedSection = 'home';

      for (const sectionId of trackedSections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            matchedSection = sectionMapping[sectionId] ?? sectionId;
          }
        }
      }

      setActiveSection(matchedSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger on mount/items load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);


  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string, sectionId: string): void => {
    setActiveSection(sectionId);
    closeMobileMenu();

    if (typeof window !== 'undefined') {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return {
    activeSection,
    isScrolled,
    isMobileMenuOpen,
    navItems,
    toggleMobileMenu,
    closeMobileMenu,
    handleNavClick,
  };
};
