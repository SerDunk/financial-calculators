import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "faq-1",
    question: "How is my personal data protected when using the calculators?",
    answer:
      "We take data security seriously and implement multiple layers of protection. All data is encrypted both during transmission (using SSL connections) and when stored on our servers. Access to your information is strictly limited to authorized personnel only, and we conduct regular security audits to ensure our systems remain secure. Additionally, we have comprehensive incident management procedures in place to quickly address any potential security issues.",
  },
  {
    id: "faq-2",
    question: "What information do you collect when I use the calculators?",
    answer:
      "We collect information through three main methods: directly from your input when using our calculators, automatically through cookies and analytics to improve your experience, and occasionally from third parties such as business partners or service providers. We only collect data that is necessary to provide our services effectively and enhance your user experience.",
  },
  {
    id: "faq-3",
    question: "Why do you need my data and how is it used?",
    answer:
      "We use your data for several important purposes: to provide our calculator services, fulfill any contractual obligations from purchases or subscriptions, enable essential site features like user accounts and personalized analysis, communicate important updates or support information, and process any payments securely. All data usage is directly related to improving and delivering our services to you.",
  },
  {
    id: "faq-4",
    question: "What is the legal basis for processing my personal information?",
    answer:
      "We process your personal data based on four main legal grounds: your explicit consent for specific uses, contractual necessity to provide our services, legal obligations we must comply with as a business, and legitimate interests in improving our services while respecting your privacy rights. We always ensure we have a valid legal basis before processing any personal information.",
  },
  {
    id: "faq-5",
    question: "Can I control what data you collect and how it's used?",
    answer:
      "Absolutely! You have full control over your data. You can review, update, or delete your personal information at any time. You can also opt out of non-essential data collection like analytics cookies through your browser settings. If you have any questions about your data or want to exercise your privacy rights, please contact our support team who will be happy to assist you.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#EFEDF4] px-3 font-lexend">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header Card */}
        <div
          className="rounded-xl px-6 py-5 text-white relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
          }}
        >
          {/* Top-right FAQ Icon */}
          <div className="absolute top-3 right-4 w-20 h-20">
            <div className="w-full h-full flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 17h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-lg font-semibold mb-2 z-10 relative">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-white z-10 w-50 relative">
            Get answers to common questions about data security, privacy, and
            how we protect your information.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-xl mb-4 overflow-hidden drop-shadow-xl border-none"
                style={{
                  background: "linear-gradient(to right, #E3E3E3, #FFFFFF)",
                }}
              >
                <AccordionTrigger className="px-4 py-4 text-left hover:no-underline">
                  <h3 className="text-sm font-semibold text-[#323233] pr-4">
                    {faq.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Card */}
        <div
          className="rounded-xl px-4 py-4 drop-shadow-xl"
          style={{
            background: "linear-gradient(to right, #E3E3E3, #FFFFFF)",
          }}
        >
          <h3 className="text-sm font-semibold text-[#323233] mb-2">
            Still have questions?
          </h3>
          <p className="text-xs text-[#666666] mb-3">
            Can't find the answer you're looking for? Please reach out to our
            support team.
          </p>
          <button
            style={{
              background:
                "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
            }}
            className="text-white text-xs px-4 py-2 rounded-lg hover:bg-[#7555C1] transition-colors duration-200"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
