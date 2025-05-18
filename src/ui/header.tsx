import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';

const lngs: Record<string, { nativeName: string }> = {
  en: { nativeName: 'English' },
  de: { nativeName: 'Deutsch' },
};

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="pt-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <div className="space-x-2">
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
    </header>
  );
};

export { Header };
