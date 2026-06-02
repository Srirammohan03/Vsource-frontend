// src/pages/PrivacyPolicy.tsx

import { ShieldCheck, Cookie, Lock } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 shadow-md"
          >
            <ShieldCheck className="h-5 w-5 text-blue-600" />

            <span className="text-sm font-medium text-gray-700">
              Secure & Trusted Privacy Protection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 max-w-3xl text-base leading-8 text-gray-600 md:text-lg"
          >
            Your privacy matters to us. Vsource Admissions is committed to
            protecting your personal information with complete transparency,
            confidentiality, and security.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="space-y-8">
            {/* CARD 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-xl md:p-10"
            >
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Customer Privacy Policy
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    We respect and protect your personal information.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-[15px] leading-8 text-gray-600 md:text-base">
                <p>
                  We at Vsource Admissions recognize your right to
                  confidentiality and are committed to protecting your privacy.
                  Vsource Admissions does not furnish any identifiable
                  information at the individual level regarding its customers to
                  any third party.
                </p>

                <p>
                  The information you provide to us is stored with utmost care
                  and security. This information is collected primarily to
                  fulfill your requirements and provide a personalized
                  experience.
                </p>

                <p>
                  While navigating our website, personal information is not
                  collected automatically without your knowledge.
                </p>

                <p>
                  We are also required to cooperate fully should a situation
                  arise where we must provide customer information under
                  applicable law or legal process.
                </p>

                <p>
                  We may share non-personal statistical or demographic
                  information in aggregate form with marketing partners,
                  advertisers, or third parties for research and advertising
                  purposes. However, individual customer information is never
                  disclosed.
                </p>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-xl md:p-10"
            >
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                  <Cookie className="h-8 w-8 text-cyan-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Cookies Policy
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Enhancing your browsing experience securely.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-[15px] leading-8 text-gray-600 md:text-base">
                <p>
                  When you use our website, certain information may be stored as
                  cookies. Cookies are small data files stored by your browser
                  on your device.
                </p>

                <p>
                  Personal details, passwords, or credit card information are
                  never stored within cookies. We also use JavaScript to improve
                  your browsing experience.
                </p>

                <p>
                  Cookies help us identify returning visitors and retain
                  information between visits for a smoother experience.
                </p>

                <p>
                  Most web browsers automatically accept cookies, but you may
                  modify your browser settings if preferred.
                </p>

                <p>
                  These files never allow us access to your hard drive or
                  private system information. They only help recognize previous
                  visits to our website.
                </p>

                <p>
                  Our system is optimized to work efficiently with cookies
                  enabled to provide the best website functionality and user
                  experience.
                </p>
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-[32px] border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-xl md:p-10"
            >
              <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                Communication Policy
              </h2>

              <p className="text-[15px] leading-8 text-gray-600 md:text-base">
                At Vsource Admissions, we value your communication preferences.
                We do not frequently send promotional or unnecessary emails. We
                only contact you regarding important updates related to your
                inquiries, admissions process, applications, or essential
                service-related information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
