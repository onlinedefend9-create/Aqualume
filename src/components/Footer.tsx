import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Droplets, Facebook, Instagram, Twitter } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useLanguage } from "../lib/LanguageContext";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useLanguage();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage(t.footerSubscribeError);
      return;
    }

    try {
      setStatus("loading");
      setErrorMessage("");

      await addDoc(collection(db, "subscribers"), {
        email: email,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Erreur newsletter:", error);
      setStatus("error");
      setErrorMessage(t.footerSubscribeError);
    }
  };

  return (
    <footer className="bg-[#0a0f1a] border-t-2 border-[#4ade80]/20 pt-16 pb-8 px-6 relative z-10 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-16">
          <Link to="/" className="flex items-center gap-2">
            <Droplets className="text-[#4ade80] w-8 h-8 animate-pulse" />
            <span className="font-bold text-2xl tracking-wide uppercase text-white">
              AQUA<span className="text-[#4ade80]">LUME</span>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 text-center md:text-left">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
              {t.navAbout}
            </h4>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li>
                <a
                  href="/#about"
                  className="hover:text-[#4ade80] transition-colors"
                >
                  {t.aboutMissionTitle}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">
              {t.footerNewsletterTitle}
            </h4>
            <p className="text-gray-400 text-sm font-light mb-4">
              {t.footerNewsletterSub}
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col w-full max-w-sm"
            >
              <div className="flex w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footerPlaceholder}
                  className="bg-[#151b27] text-white px-4 py-3 rounded-l-full flex-1 border border-white/10 focus:outline-none focus:border-[#4ade80] text-sm font-light placeholder-gray-500"
                  disabled={status === "loading" || status === "success"}
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="bg-[#4ade80] text-[#151b27] px-6 py-3 rounded-r-full font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? t.footerSubscribeLoading : t.footerSubscribeBtn}
                </button>
              </div>
              {status === "success" && (
                <p className="text-[#4ade80] text-xs mt-2 ml-4">
                  {t.footerSubscribeSuccess}
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-xs mt-2 ml-4">{errorMessage}</p>
              )}
            </form>
            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#151b27] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#4ade80] hover:border-[#4ade80] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#151b27] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#4ade80] hover:border-[#4ade80] transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#151b27] border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#4ade80] hover:border-[#4ade80] transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-gray-500 text-sm font-light">
            &copy; {new Date().getFullYear()} AquaLume. {t.footerCopyright}
          </p>
          <div className="flex gap-6 text-sm text-gray-500 font-light">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t.footerPrivacy}</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">{t.footerTerms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
