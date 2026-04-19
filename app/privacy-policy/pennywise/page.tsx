import {
  PrivacyPolicyClient,
  type Section,
} from "@/components/legal/privacy-policy-client";
import type { Metadata } from "next";
import { ShieldCheck, Share2, Lock, Megaphone } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | PennyWise",
  description:
    "Learn how PennyWise protects your data. Offline-first financial tracking with enterprise-grade security and biometrics.",
};

const sections: Section[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <p>
        Your privacy is critically important to us. PennyWise is built with a
        private-first philosophy, ensuring that your financial data remains
        under your control. This Privacy Policy describes how PennyWise
        (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) handles your
        information when you use our mobile application.
      </p>
    ),
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    content: (
      <div className="space-y-8">
        <p>
          The following categories of information may be processed and stored{" "}
          <strong className="text-foreground">only on your device</strong> to
          provide app features. PennyWise does not upload this information to
          our servers for storage.
        </p>
        <div className="bg-muted/30 border-border/50 rounded-xl border p-6">
          <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold tracking-wider uppercase opacity-80">
            <ShieldCheck className="text-primary size-5" />
            2.1 User-Provided Information (Stored Locally)
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-base">
              <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
              <span>
                <strong className="text-foreground">
                  Profile Information:
                </strong>{" "}
                Your name, preferred primary currency, and monthly budget
                settings.
              </span>
            </li>
            <li className="flex gap-3 text-base">
              <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
              <span>
                <strong className="text-foreground">Financial Data:</strong>{" "}
                Records of your income, expenses, categories, and payment card
                profiles (e.g., last four digits and card names).
              </span>
            </li>
            <li className="flex gap-3 text-base">
              <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
              <span>
                <strong className="text-foreground">
                  Notes and Attachments:
                </strong>{" "}
                Optional notes or images (such as receipts) that you attach to
                your transactions.
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-muted/30 border-border/50 rounded-xl border p-6">
          <h3 className="text-foreground mb-4 flex items-center gap-2 text-lg font-bold tracking-wider uppercase opacity-80">
            <Share2 className="text-primary size-5" />
            2.2 Device Permissions
          </h3>
          <p className="text-muted-foreground mb-4 text-base leading-relaxed">
            To provide its core features, PennyWise may request access to:
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-base">
              <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
              <span>
                <strong className="text-foreground">
                  Camera/Photo Library:
                </strong>{" "}
                For capturing or selecting images of receipts to attach to
                transactions.
              </span>
            </li>
            <li className="flex gap-3 text-base">
              <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
              <span>
                <strong className="text-foreground">
                  Biometrics (FaceID/Fingerprint):
                </strong>{" "}
                To securely unlock the application.
              </span>
            </li>
            <li className="flex gap-3 text-base">
              <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
              <span>
                <strong className="text-foreground">Notifications:</strong> To
                send budget alerts and reminders.
              </span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "collection-use",
    title: "3. Information Collection and Use",
    content: (
      <div className="space-y-4">
        <p>
          PennyWise itself does not collect, store, or transmit any personal
          financial data to external servers or to the developer. Financial
          information you enter is stored only on your device.
        </p>
        <p>
          However, third-party services integrated into the app (such as Google
          AdMob) may collect certain information automatically for advertising
          purposes.
        </p>
        <p>
          PennyWise does not require user registration or account creation. We
          do not collect personally identifiable information such as email
          addresses or phone numbers.
        </p>
      </div>
    ),
  },
  {
    id: "storage",
    title: "4. Data Storage and Processing",
    content: (
      <div className="space-y-6">
        <p>PennyWise is an offline-first application.</p>
        <p>
          PennyWise does not collect or store your financial data on external
          servers.
        </p>
        <p>
          However, the app may use third-party services (such as Google AdMob)
          which may collect limited device-level data.
        </p>
        <p>
          While PennyWise does not track your financial activity, advertising
          partners may collect limited technical data required to serve ads.
        </p>
        <div className="border-primary bg-primary/5 rounded-r-lg border-l-4 py-4 pl-6">
          <ul className="space-y-4">
            <li>
              <strong className="text-foreground block">Local Storage:</strong>
              All your financial data, profile information, and attachments are
              stored locally on your device using encrypted and secure storage
              mechanisms (Hive and Flutter Secure Storage).
            </li>
            <li>
              <strong className="text-foreground block">No Cloud Sync:</strong>
              By default, PennyWise does not transmit your personal or financial
              data to any external servers or cloud services operated by us. Your
              data remains on your device unless you choose to manually export
              or share it.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "advertising",
    title: "5. Advertising",
    content: (
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Megaphone className="text-primary mt-1 size-6 shrink-0" />
          <div className="space-y-4">
            <p>
              This app uses Google AdMob, a mobile advertising service provided
              by Google.
            </p>
            <p>
              AdMob may collect certain information automatically, including:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Device identifiers (such as advertising ID)</li>
              <li>IP address</li>
              <li>Device information</li>
              <li>Interaction data with ads</li>
            </ul>
            <p>
              This information is used to provide and improve advertising
              services.
            </p>
            <p>
              You can learn more about how Google uses data here:{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-primary font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://policies.google.com/privacy
              </a>
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "third-party",
    title: "6. Third-Party Services",
    content: (
      <div className="space-y-4">
        <p>
          The app may use third-party services that collect information used to
          identify you.
        </p>
        <p>These include:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Google AdMob</li>
        </ul>
        <p>
          These services operate under their own privacy policies.
        </p>
      </div>
    ),
  },
  {
    id: "consent",
    title: "7. User Consent",
    content: (
      <p>
        By using the app, you agree to the use of third-party services as
        described in this policy.
      </p>
    ),
  },
  {
    id: "use",
    title: "8. Use of Information",
    content: (
      <ul className="space-y-4">
        <li className="flex gap-3 text-base">
          <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
          <span>Provide financial tracking and visualization features.</span>
        </li>
        <li className="flex gap-3 text-base">
          <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
          <span>
            Calculate and display budget progress and financial insights.
          </span>
        </li>
        <li className="flex gap-3 text-base">
          <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
          <span>
            Secure your application access via PIN or biometric authentication.
          </span>
        </li>
      </ul>
    ),
  },
  {
    id: "security",
    title: "9. Security",
    content: (
      <div className="flex items-start gap-4">
        <Lock className="text-primary mt-1 size-6 shrink-0" />
        <div className="space-y-4">
          <p>
            We implement industry-standard security measures to protect your
            data locally:
          </p>
          <ul className="space-y-2">
            <li>
              <strong className="text-foreground">On-Device Encryption:</strong>{" "}
              Sensitive keys (like your PIN) are stored in the device&apos;s
              secure enclave/keystore.
            </li>
            <li>
              <strong className="text-foreground">
                Biometric Integration:
              </strong>{" "}
              Biometric authentication is handled by your device&apos;s
              operating system. The app only receives a confirmation of
              successful authentication.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "rights",
    title: "10. Your Data Rights",
    content: (
      <div className="space-y-4">
        <p>
          Since your data is stored locally on your device, you have full
          control:
        </p>
        <ul className="space-y-2">
          <li>
            <strong className="text-foreground">Access & Modify:</strong> You
            can view and edit any entry directly within the app.
          </li>
          <li>
            <strong className="text-foreground">Deletion:</strong> You can
            delete specific transactions, cards, or your entire data store from
            the settings menu within the app. All data can be permanently
            deleted by clearing app data or uninstalling the app.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "children",
    title: "11. Children's Privacy",
    content: (
      <p>
        This app is not directed to children under the age of 13. We do not
        knowingly collect personal information from children.
      </p>
    ),
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    content: (
      <p>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the &quot;Last Updated&quot; date.
      </p>
    ),
  },
  {
    id: "contact",
    title: "13. Contact Us",
    content: (
      <p>
        If you have any questions about this Privacy Policy, you can contact us
        at:{" "}
        <a
          href="mailto:contact@adityatripathi.dev"
          className="text-primary font-medium hover:underline"
        >
          contact@adityatripathi.dev
        </a>
      </p>
    ),
  },
];

const LAST_UPDATED = "April 19, 2026";

export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyClient sections={sections} lastUpdated={LAST_UPDATED} />
  );
}
