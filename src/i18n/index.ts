// i18n utility functions for Astro.js multilingual support
// Provides type-safe translation system with fallback to English

export type Locale = 'en' | 'ar';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'ar'];

// Translation type definition
export interface Translations {
  [key: string]: string | Translations;
}

// Cache for loaded translations
const translationCache = new Map<Locale, Translations>();

/**
 * Load translations for a specific locale
 * @param locale - The locale to load translations for
 * @returns Promise<Translations> - The loaded translations
 */
export async function loadTranslations(locale: Locale): Promise<Translations> {
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    // Dynamic import of translation files
    const translations = await import(`../locales/${locale}.json`);
    const translationData = translations.default || translations;
    translationCache.set(locale, translationData);
    return translationData;
  } catch (error) {
    console.warn(`Failed to load translations for locale: ${locale}`, error);
    
    // Fallback to default locale if current locale fails
    if (locale !== defaultLocale) {
      return loadTranslations(defaultLocale);
    }
    
    // Return empty object if even default locale fails
    return {};
  }
}

/**
 * Get nested translation value using dot notation
 * @param obj - The translation object
 * @param path - The dot-separated path to the translation key
 * @returns string | undefined - The translation value or undefined if not found
 */
function getNestedValue(obj: Translations, path: string): string | undefined {
  return path.split('.').reduce((current: any, key: string) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj) as string | undefined;
}

/**
 * Main translation function
 * @param key - The translation key (supports dot notation for nested keys)
 * @param locale - The target locale
 * @param fallback - Optional fallback text if translation is not found
 * @returns Promise<string> - The translated text
 */
export async function t(key: string, locale: Locale, fallback?: string): Promise<string> {
  try {
    const translations = await loadTranslations(locale);
    const translation = getNestedValue(translations, key);
    
    if (translation && typeof translation === 'string') {
      return translation;
    }
    
    // Try fallback locale if translation not found
    if (locale !== defaultLocale) {
      const defaultTranslations = await loadTranslations(defaultLocale);
      const defaultTranslation = getNestedValue(defaultTranslations, key);
      
      if (defaultTranslation && typeof defaultTranslation === 'string') {
        return defaultTranslation;
      }
    }
    
    // Return fallback or key if no translation found
    return fallback || key;
  } catch (error) {
    console.warn(`Translation error for key "${key}" in locale "${locale}":`, error);
    return fallback || key;
  }
}

/**
 * Synchronous translation function for use in components
 * Requires translations to be pre-loaded
 * @param key - The translation key
 * @param locale - The target locale
 * @param translations - Pre-loaded translations object
 * @param fallback - Optional fallback text
 * @returns string - The translated text
 */
export function tSync(
  key: string, 
  locale: Locale, 
  translations: Translations, 
  fallback?: string
): string {
  const translation = getNestedValue(translations, key);
  
  if (translation && typeof translation === 'string') {
    return translation;
  }
  
  return fallback || key;
}

/**
 * Get the opposite locale for language switching
 * @param currentLocale - The current locale
 * @returns Locale - The opposite locale
 */
export function getOppositeLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'ar' : 'en';
}

/**
 * Check if a locale is RTL (Right-to-Left)
 * @param locale - The locale to check
 * @returns boolean - True if the locale is RTL
 */
export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}

/**
 * Get the text direction for a locale
 * @param locale - The locale
 * @returns 'ltr' | 'rtl' - The text direction
 */
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

/**
 * Get the language attribute value for HTML
 * @param locale - The locale
 * @returns string - The language code
 */
export function getLanguageCode(locale: Locale): string {
  return locale;
}

/**
 * Extract locale from URL path
 * @param pathname - The URL pathname
 * @returns Locale - The extracted locale or default locale
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] as Locale;
  
  // If path starts with /ar/, it's Arabic
  if (firstSegment === 'ar') {
    return 'ar';
  }
  
  // Otherwise, it's English (default locale in root)
  return defaultLocale;
}

/**
 * Build localized URL path
 * @param locale - The target locale
 * @param path - The path without locale prefix
 * @returns string - The localized URL path
 */
export function getLocalizedPath(locale: Locale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  if (locale === 'ar') {
    // Arabic pages go in /ar/ folder
    return `/ar/${cleanPath}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/ar';
  } else {
    // English pages go in root
    return `/${cleanPath}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  }
}
