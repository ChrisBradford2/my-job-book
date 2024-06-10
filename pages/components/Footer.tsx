import { useTranslation } from "next-i18next";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
    <div className="container mx-auto text-center">
      <p>&copy; {t("copyright")}.</p>
      <div className="mt-4">
        <Link href="/contact" className="text-gray-400 hover:text-white mx-2">{t("contact")}</Link>
        <Link href="/privacy-policy" className="text-gray-400 hover:text-white mx-2">{t("privacy_policy")}</Link>
        <Link href="/legal-notice" className="text-gray-400 hover:text-white mx-2">{t("legal_notice")}</Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer;
