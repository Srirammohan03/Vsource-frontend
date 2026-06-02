// src/pages/TermsAndConditions.tsx

import { motion } from "framer-motion";
import { FileText, Shield, Globe, AlertTriangle } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 shadow-md"
          >
            <FileText className="h-5 w-5 text-blue-600" />

            <span className="text-sm font-medium text-gray-700">
              Legal Terms & User Agreement
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl"
          >
            Terms & Conditions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 max-w-3xl text-base leading-8 text-gray-600 md:text-lg"
          >
            Please read these terms carefully before using the Vsource
            Admissions website or services.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="space-y-8">
            {/* INTRO CARD */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-xl md:p-10"
            >
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Terms of Use
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Your use of this website signifies acceptance of these
                    terms.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-[15px] leading-8 text-gray-600 md:text-base">
                <p>
                  These Terms and Conditions of use ("Terms of Use") describe
                  the agreement between Vsource Admissions and users of the
                  website regarding access to services, content, and facilities
                  provided through the platform.
                </p>

                <p>
                  Please read these Terms carefully before using or registering
                  on the website. Your use of the website or any service
                  provided through it signifies your acceptance and agreement to
                  be legally bound by these Terms.
                </p>

                <p>
                  Your continued use of the website also indicates that you have
                  read, understood, and accepted these Terms of Use.
                </p>
              </div>
            </motion.div>

            {/* WEBSITE INFO */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-xl md:p-10"
            >
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100">
                  <Globe className="h-8 w-8 text-cyan-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Website Usage
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Information regarding the Vsource Admissions platform.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-[15px] leading-8 text-gray-600 md:text-base">
                <p>
                  The website is owned and operated by Vsource Admissions, a
                  business firm incorporated under the laws of India with
                  operations across Hyderabad, India.
                </p>

                <p>
                  Access to the website is offered subject to acceptance of all
                  terms, conditions, and notices contained within these Terms of
                  Use, including any future amendments made by Vsource
                  Admissions.
                </p>

                <p>
                  Vsource Admissions reserves the right to introduce additional
                  charges for access to specific services or features available
                  on the platform.
                </p>

                <p>The official website address is:</p>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <a
                    href="https://vsourceadmissions.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-blue-600 transition-colors hover:text-blue-700"
                  >
                    https://vsourceadmissions.com/
                  </a>
                </div>
              </div>
            </motion.div>

            {/* UPDATES CARD */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-[32px] border border-orange-100 bg-gradient-to-br from-orange-50 to-yellow-50 p-6 shadow-xl md:p-10"
            >
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Updates & Modifications
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Terms may change periodically without prior notice.
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-[15px] leading-8 text-gray-600 md:text-base">
                <p>
                  Vsource Admissions is not required to notify users separately
                  regarding updates or changes made to these Terms of Use.
                </p>

                <p>
                  Revised Terms will be made available on the website and users
                  are encouraged to review them periodically.
                </p>

                <p>
                  Continued use of the website after any changes are published
                  will constitute acceptance of those updated Terms.
                </p>

                <p>
                  By using this website or any service provided through it, you
                  confirm that you agree to comply with these Terms and the
                  Privacy Policy available on the website homepage.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditions;
