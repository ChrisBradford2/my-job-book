import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
    <div className="container mx-auto text-center">
      <p>&copy; {t("copyright")}.</p>
      <div className="mt-4">
        <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
        <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
      </div>
    </div>
  </footer>
  )
}

export default Footer;
