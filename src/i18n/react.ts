// React-specific i18n utilities for client-side components
// Provides hooks and utilities for React components that need client-side interactivity

import type { Locale, Translations } from './index.js';
import { defaultLocale, getOppositeLocale, getLocalizedPath } from './index.js';

/**
 * Client-side locale detection and management
 */
export class LocaleManager {
  private static readonly STORAGE_KEY = 'preferred-locale';
  
  /**
   * Get the user's preferred locale from localStorage
   * @returns Locale - The preferred locale or default locale
   */
  static getPreferredLocale(): Locale {
    if (typeof window === 'undefined') {
      return defaultLocale;
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY) as Locale;
      return stored === 'en' || stored === 'ar' ? stored : defaultLocale;
    } catch {
      return defaultLocale;
    }
  }
  
  /**
   * Save the user's preferred locale to localStorage
   * @param locale - The locale to save
   */
  static setPreferredLocale(locale: Locale): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      localStorage.setItem(this.STORAGE_KEY, locale);
    } catch (error) {
      console.warn('Failed to save locale preference:', error);
    }
  }
  
  /**
   * Switch to a different locale and redirect
   * @param targetLocale - The locale to switch to
   * @param currentPath - The current path without locale prefix
   */
  static switchLocale(targetLocale: Locale, currentPath: string = ''): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    // Save preference
    this.setPreferredLocale(targetLocale);
    
    // Build new URL
    const newPath = getLocalizedPath(targetLocale, currentPath);
    
    // Redirect to new locale
    window.location.href = newPath;
  }
  
  /**
   * Get the current locale from the URL
   * @returns Locale - The current locale
   */
  static getCurrentLocale(): Locale {
    if (typeof window === 'undefined') {
      return defaultLocale;
    }
    
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    // If path starts with /ar/, it's Arabic
    if (firstSegment === 'ar') {
      return 'ar';
    }
    
    // Otherwise, it's English (default locale in root)
    return defaultLocale;
  }
  
  /**
   * Get the current path without locale prefix
   * @returns string - The path without locale prefix
   */
  static getCurrentPath(): string {
    if (typeof window === 'undefined') {
      return '';
    }
    
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    
    // Remove Arabic locale segment if present
    if (segments.length > 0 && segments[0] === 'ar') {
      segments.shift();
    }
    
    return segments.length > 0 ? segments.join('/') : '';
  }
}

/**
 * React hook for managing locale state and translations
 * @param initialTranslations - Pre-loaded translations
 * @returns Object with locale utilities and translation function
 */
export function useLocale(initialTranslations: Translations = {}) {
  const currentLocale = LocaleManager.getCurrentLocale();
  const currentPath = LocaleManager.getCurrentPath();
  
  /**
   * Translation function for React components
   * @param key - The translation key
   * @param fallback - Optional fallback text
   * @returns string - The translated text
   */
  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: any = initialTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : fallback || key;
  };
  
  /**
   * Switch to the opposite locale
   */
  const toggleLocale = () => {
    const targetLocale = getOppositeLocale(currentLocale);
    LocaleManager.switchLocale(targetLocale, currentPath);
  };
  
  /**
   * Switch to a specific locale
   * @param locale - The target locale
   */
  const switchToLocale = (locale: Locale) => {
    LocaleManager.switchLocale(locale, currentPath);
  };
  
  return {
    locale: currentLocale,
    t,
    toggleLocale,
    switchToLocale,
    isRTL: currentLocale === 'ar',
    oppositeLocale: getOppositeLocale(currentLocale),
    currentPath
  };
}

/**
 * Initialize locale preference on page load
 * This should be called in a client-side script
 */
export function initializeLocalePreference(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  // Check if user has a stored preference
  const preferredLocale = LocaleManager.getPreferredLocale();
  const currentLocale = LocaleManager.getCurrentLocale();
  
  // If stored preference differs from current URL locale, redirect
  if (preferredLocale !== currentLocale && preferredLocale !== defaultLocale) {
    const currentPath = LocaleManager.getCurrentPath();
    LocaleManager.switchLocale(preferredLocale, currentPath);
  }
}

/**
 * Utility function to create a language switcher button
 * @param currentLocale - The current locale
 * @param currentPath - The current path
 * @param className - CSS classes for the button
 * @returns Object with button properties
 */
export function createLanguageSwitcherProps(
  currentLocale: Locale,
  currentPath: string,
  className: string = ''
) {
  const targetLocale = getOppositeLocale(currentLocale);
  const targetPath = getLocalizedPath(targetLocale, currentPath);
  
  return {
    href: targetPath,
    className,
    'data-locale': targetLocale,
    onClick: (e: Event) => {
      e.preventDefault();
      LocaleManager.switchLocale(targetLocale, currentPath);
    }
  };
}
