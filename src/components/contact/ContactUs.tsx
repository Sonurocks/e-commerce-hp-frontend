/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import FeedbackPrompt from "@/components/support/FeedbackPrompt";
import {
  ContactFormOption,
  contactPreferenceOptions,
  countryOptions,
  generalContactsContent,
  GeneralContactParagraph,
  quickActionLinks,
  queryTypeOptions,
  supportLinks,
} from "@/constants/contactFormOptions";
import { supportPageStyles } from "@/constants/supportPageStyles";

// Validation schema
const contactFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactPreferences: Yup.string().required("Contact preferences is required"),
  countryId: Yup.string().required("Country is required"),
  queryType: Yup.string().required("Query type is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

// Custom Dropdown Component
interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: ContactFormOption[];
  placeholder: string;
  error?: string;
  touched?: boolean;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  error,
  touched,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const isPlaceholder = !value;

  const handleSelect = (optionValue: string) => {
    const syntheticEvent = {
      target: { name, value: optionValue },
    } as React.ChangeEvent<HTMLSelectElement>;
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    // Delay to allow option click to register first
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        // Create a synthetic event for the hidden select
        const syntheticEvent = {
          target: { name },
        } as React.FocusEvent<HTMLSelectElement>;
        onBlur(syntheticEvent);
      }
    }, 200);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={handleBlur}
        className={`w-full px-3 py-2 border ${
          error && touched ? "border-red-500" : "border-gray-300"
        } rounded focus:outline-none focus:border-[var(--color-preto)] text-base bg-white font-normal text-left flex items-center justify-between ${
          isPlaceholder ? "text-gray-500" : "text-[var(--color-preto)]"
        }`}
      >
        <span>{displayText}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-3 py-2 text-left text-base font-normal transition-colors ${
                value === option.value
                  ? "bg-gray-100text-(--color-preto)"
                  : "bg-whitetext-(--color-preto) hover:bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Hidden select for Formik */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="hidden"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm, setFieldError }: any,
  ) => {
    if (!recaptchaToken) {
      setFieldError("recaptcha", "Please complete the reCAPTCHA verification");
      setSubmitting(false);
      return;
    }

    console.log("Form values:", values);
    console.log("Selected files:", selectedFiles);
    console.log("reCAPTCHA token:", recaptchaToken);

    // TODO: Add API call to submit form with recaptchaToken
    // You'll need to verify the token on your backend

    setSubmitting(false);
    resetForm();
    setSelectedFiles([]);
    setRecaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-normaltext-(--color-preto) mb-2">
        Help & Contact Us
      </h2>
      <p className="text-smtext-(--color-preto) font-normal mb-6">
        Simply complete the form and click &apos;send&apos; to submit an
        enquiry:
      </p>

      <Formik
        initialValues={{
          name: "",
          email: "",
          contactPreferences: "",
          countryId: "",
          queryType: "",
          subject: "",
          message: "",
        }}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-thin text-(--color-preto) mb-1"
              >
                Name<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`w-full px-3 py-2 border ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-(--color-preto) text-base bg-white font-normal`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-thin text-(--color-preto) mb-1"
              >
                Email<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`w-full px-3 py-2 border ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-(--color-preto) text-base bg-white font-normal`}
              />
              <p className="text-xs text-(--color-preto) font-normal mt-1">
                Please ensure that your email address is correct so that we can
                respond to your enquiry.
              </p>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Contact Preferences Field */}
            <div>
              <label
                htmlFor="contactPreferences"
                className="block text-xs font-normal text-(--color-preto) mb-1"
              >
                Contact Preferences
                <span className="text-(--color-preto)">*</span>
              </label>
              <Field name="contactPreferences">
                {({ field, form }: FieldProps<string>) => (
                  <CustomSelect
                    name={field.name}
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={contactPreferenceOptions}
                    placeholder="Contact Preferences"
                    error={form.errors.contactPreferences as string}
                    touched={Boolean(form.touched.contactPreferences)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="contactPreferences"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Country Id Field */}
            <div>
              <label
                htmlFor="countryId"
                className="block text-xs font-normal text-(--color-preto) mb-1"
              >
                Country Id<span className="text-(--color-preto)">*</span>
              </label>
              <Field name="countryId">
                {({ field, form }: FieldProps<string>) => (
                  <CustomSelect
                    name={field.name}
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={countryOptions}
                    placeholder="Country Id"
                    error={form.errors.countryId as string}
                    touched={Boolean(form.touched.countryId)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="countryId"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Query Type Field */}
            <div>
              <label
                htmlFor="queryType"
                className="block text-sm font-normal text-(--color-preto) mb-1"
              >
                Query Type<span className="text-(--color-preto)">*</span>
              </label>
              <Field name="queryType">
                {({ field, form }: FieldProps<string>) => (
                  <CustomSelect
                    name={field.name}
                    value={field.value || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={queryTypeOptions}
                    placeholder="Query Type"
                    error={form.errors.queryType as string}
                    touched={Boolean(form.touched.queryType)}
                  />
                )}
              </Field>
              <ErrorMessage
                name="queryType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-normal text-(--color-preto) mb-1"
              >
                Subject<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                type="text"
                id="subject"
                name="subject"
                className={`w-full px-3 py-2 border ${
                  errors.subject && touched.subject
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-(--color-preto) text-base bg-white font-normal`}
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-normaltext-(--color-preto) mb-1"
              >
                Message<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows={6}
                className={`w-full px-3 py-2 border ${
                  errors.message && touched.message
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded focus:outline-none focus:border-[var(--color-preto)] text-base bg-white font-normal resize-y`}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Attachments Field */}
            <div>
              <label className="block text-xs font-normaltext-(--color-preto) mb-1">
                Attachments
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="attachments"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="attachments"
                  className="px-15 py-3 border border-(--color-preto) rounded-lg text-smtext-(--color-preto) font-bold cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Add File
                </label>
                {selectedFiles.length > 0 && (
                  <span className="text-mtext-(--color-preto) font-bold">
                    {selectedFiles.length} file(s) selected
                  </span>
                )}
              </div>
            </div>

            {/* reCAPTCHA Widget */}
            <div className="py-4">
              <div className="max-w-xs">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={
                    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                    "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  }
                  onChange={handleRecaptchaChange}
                  theme="light"
                />
                {recaptchaToken === null && (
                  <ErrorMessage
                    name="recaptcha"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-[var(--color-preto)] text-white px-8 py-3 rounded text-base font-normal hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

interface ContactLinkLineProps {
  label: string;
  href: string;
  text: string;
}

const ContactLinkLine: React.FC<ContactLinkLineProps> = ({
  label,
  href,
  text,
}) => (
  <p className="text-sm text-(--color-preto) font-normal">
    {label}:{" "}
    <Link href={href} className="underline">
      {text}
    </Link>
  </p>
);

const ParagraphWithOptionalLink: React.FC<{
  paragraph: GeneralContactParagraph;
}> = ({ paragraph }) => {
  if (paragraph.text) {
    return (
      <p className="text-sm text-(--color-preto) font-normal">{paragraph.text}</p>
    );
  }

  return (
    <p className="text-sm text-(--color-preto) font-normal">
      {paragraph.textBeforeLink}
      {paragraph.link && (
        <Link href={paragraph.link.href} className="underline">
          {paragraph.link.text}
        </Link>
      )}
      {paragraph.textAfterLink}
    </p>
  );
};

const GeneralContactsSection = () => {
  const { customerService, sections } = generalContactsContent;

  return (
    <div className="mt-4 text-sm text-(--color-preto) font-normal space-y-6">
      <section className="space-y-2">
        <h4 className="text-base font-semibold text-(--color-preto)">
          {customerService.title}
        </h4>
        <ContactLinkLine
          label={customerService.email.label ?? "Email"}
          href={customerService.email.href}
          text={customerService.email.text}
        />
        <ContactLinkLine
          label={customerService.phone.label ?? "Phone number"}
          href={customerService.phone.href}
          text={customerService.phone.text}
        />
        <div className="space-y-1">
          <p className="text-sm text-(--color-preto) font-semibold">
            For Swiss Customers:
          </p>
          <ul className="space-y-1 pl-4 list-none">
            {customerService.swissCustomers.map(({ label, number }) => (
              <li key={`${label}-${number}`}>{`${label}: ${number}`}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-(--color-preto) font-semibold">
            For Romanian Customers:
          </p>
          <p className="text-sm text-(--color-preto) font-normal">
            {customerService.romanianNumber}
          </p>
        </div>
        <ParagraphWithOptionalLink paragraph={customerService.description} />
      </section>

      {sections.map((section) => (
        <section key={section.title} className="space-y-2">
          <h4 className="text-base font-semibold text-(--color-preto)">
            {section.title}
          </h4>
          {section.email && (
            <ContactLinkLine
              label={section.email.label ?? "Email"}
              href={section.email.href}
              text={section.email.text}
            />
          )}
          {section.descriptions?.map((paragraph, index) => (
            <ParagraphWithOptionalLink
              key={`${section.title}-paragraph-${index}`}
              paragraph={paragraph}
            />
          ))}
        </section>
      ))}
    </div>
  );
};

const ContactUs = () => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<{
    cancelReturn: boolean;
    emailService: boolean;
    generalContacts: boolean;
  }>({
    cancelReturn: false,
    emailService: false,
    generalContacts: false,
  });
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  const toggleSection = useCallback(
    (section: keyof typeof expandedSections) => {
      setExpandedSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    },
    [],
  );

  const handleFeedbackChange = useCallback((value: boolean) => {
    setFeedbackHelpful(value);
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-(--color-preto) font-normal"
      style={supportPageStyles}
    >
      <div className="container mx-auto px-[48px] py-16 max-w-[1440px]">
        {/* Four Column Horizontal Layout - All sections aligned horizontally */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 items-start">
          {/* Column 1 - Information Links */}
          <div>
            <h3 className="text-normal font-normaltext-(--color-preto) mb-2 underline">
              HOLIDAY DATES YOU&apos;LL WANT TO KNOW
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li key={`${link.href}-${index}`}>
                    <Link
                      href={link.href}
                      className={`block py-1 text-sm underline hover:no-underline transition text-base font-normal ${
                        isActive
                          ? "font-thin text-(--color-preto)"
                          : "text-(--color-preto)"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 2 - Customer Service */}
          <div className="ml-16">
            <h2 className="text-2xl font-normaltext-(--color-preto) mb-13">
              Contact us
            </h2>
            <h3 className="text-2xl font-normaltext-(--color-preto) mb-3">
              Customer Service
            </h3>
            <div className="mb-4">
              <p className="text-smtext-(--color-preto) font-normal mb-1">
                <strong>Email service hours:</strong>
              </p>
              <p className="text-smtext-(--color-preto) font-normal">
                Monday to Friday: 24 hours a day
              </p>
              <p className="text-smtext-(--color-preto) font-normal">
                Saturday and Sunday: 8am to 3pm EST
              </p>
            </div>
            <div>
              <p className="text-smtext-(--color-preto) font-normal mb-1">
                <strong>Phone service hours:</strong>
              </p>
              <p className="text-smtext-(--color-preto) font-normal">
                Monday to Friday: 8am to 9pm EST
              </p>
            </div>
          </div>

          {/* Column 3 - FAQs */}
          <div className="pt-[81px] ml-8">
            <h3 className="text-2xl font-normaltext-(--color-preto) mb-4">
              FAQs
            </h3>
            <p className="text-smtext-(--color-preto) font-normal mb-2">
              Find the answers you need in our{" "}
              <Link href="#" className="underline">
                FAQs
              </Link>
            </p>
            <div>
              <p className="text-base font-normaltext-(--color-preto) mb-0">
                <strong>Quick Actions:</strong>
              </p>
              <ul className="space-y-1">
                {quickActionLinks.map((action) => (
                  <li key={action.label}>
                    <Link
                      href={action.href}
                      className="text-smtext-(--color-preto) underline font-normal"
                    >
                      {action.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4 - Response Time Information */}
          <div className="pt-[81px]">
            <h2 className="text-2xl font-normaltext-(--color-preto) mb-4">
              We&apos;ll be in touch soon.
            </h2>
            <p className="text-smtext-(--color-preto) font-normal leading-relaxed mb-4">
              We aim to respond within 24 hours, but during busy periods like
              holidays, sales and special campaigns, we may take a little longer
              getting back to you.
            </p>
            <p className="text-smtext-(--color-preto) font-normal leading-relaxed">
              Want to get in touch? Scroll down for more details.
            </p>
          </div>
        </div>

        {/* Expandable Sections and Feedback - Positioned to the right of first column, below other 3 sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 -mt-29">
          {/* Empty first column to align with first section */}
          <div></div>

          {/* Content spanning the other 3 columns */}
          <div className="md:col-span-3 ml-14">
            {/* Expandable Sections */}
            <div className="space-y-4 mb-8">
              {/* Step by Step to Cancel or Return Your Order */}
              <div className="border-b border-gray-300 pb-4">
                <button
                  onClick={() => toggleSection("cancelReturn")}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-l font-normaltext-(--color-preto)">
                    STEP BY STEP TO CANCEL OR RETURN YOUR ORDER
                  </h3>
                  <svg
                    className={`w-5 h-5text-(--color-preto) transition-transform ${
                      expandedSections.cancelReturn ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedSections.cancelReturn && (
                  <div className="mt-4 text-basetext-(--color-preto) font-normal space-y-6">
                    {/* To cancel your order */}
                    <div>
                      <h4 className="text-medium text-(--color-preto) mb-3 font-semibold">
                        To cancel your order:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li className="text-sm text-(--color-preto) font-normal">
                          Go to Orders & Returns if you have an account, or if
                          you placed an order as a guest, enter your guest order
                          details <strong>here</strong> - you&apos;ll need to
                          provide your order number and email address
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          Select the items you want to cancel and your reason
                          for cancellation
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          We&apos;ll send you a confirmation email of your
                          cancelled order
                        </li>
                      </ol>
                      <p className="text-sm text-(--color-preto) font-normal mt-3">
                        If you can&apos;t cancel your order as self-service in
                        your account, it means the order has already been
                        prepared and can no longer be cancelled—neither by you
                        nor our Customer Service Team. However, you can still
                        return - please see our{" "}
                        <strong>Returns and Refunds</strong> page.
                      </p>
                    </div>

                    {/* To return your order */}
                    <div>
                      <h4 className="text-medium font-semibold text-(--color-preto) mb-3">
                        To return your order:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li className="text-sm text-(--color-preto) font-normal">
                          Go to Orders & Returns if you have an account. If you
                          placed your order as a guest, enter your guest order
                          details <strong>here</strong>.
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          Find the order you want to return and click Return
                          Item(s)
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          Select each item and your reason for returning
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          There are two ways to return your items. At least one
                          will always be available:
                          <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                            <li>
                              Book a free returns collection - Select your
                              collection address and number of packages,
                              schedule a collection date, suitable time and
                              click Book Collection
                            </li>
                            <li>
                              Return for free at a drop-off point near you -
                              Select the drop-off option in your account and
                              take the return to your chosen courier drop-off
                              point
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>

                    {/* Prepare your return */}
                    <div>
                      <h4 className="text-medium font-semibold text-(--color-preto) mb-3">
                        Prepare your return:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li className="text-sm  text-(--color-preto) font-normal">
                          Place the item inside the FARFETCH packaging -
                          don&apos;t forget any brand boxes, dust bags, or cases
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          Attach your Return Label to the outside of the
                          FARFETCH packaging.
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          If you received a Return Note with your order, attach
                          it to the outside of your package
                        </li>
                      </ol>
                    </div>

                    {/* Important Tracking Note */}
                    <p className="text-sm text-(--color-preto)  font-semibold">
                      When your package is collected or dropped off, make sure
                      you ask the courier to scan the label so you can track
                      your return.
                    </p>

                    {/* Final Note on Documents */}
                    <p className="text-sm text-(--color-preto) font-normal">
                      All the documents you need to return your item should be
                      included in your FARFETCH package. If you need to reprint
                      them, head to Orders & Returns in your account, or if you
                      placed an order as a guest, enter your guest order details
                      here.
                    </p>
                  </div>
                )}
              </div>

              {/* Email Our Customer Service Team */}
              <div className="border-b border-gray-300 pb-4">
                <button
                  onClick={() => toggleSection("emailService")}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-sm font-normaltext-(--color-preto) uppercase">
                    EMAIL OUR CUSTOMER SERVICE TEAM
                  </h3>
                  <svg
                    className={`w-5 h-5text-(--color-preto) transition-transform ${
                      expandedSections.emailService ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedSections.emailService && (
                  <div className="mt-4">
                    <ContactForm />
                  </div>
                )}
              </div>

              {/* General Contacts */}
              <div className="border-b border-gray-300 pb-4">
                <button
                  onClick={() => toggleSection("generalContacts")}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-sm font-normal text-(--color-preto)">
                    GENERAL CONTACTS
                  </h3>
                  <svg
                    className={`w-5 h-5 text-(--color-preto) transition-transform ${
                      expandedSections.generalContacts ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedSections.generalContacts && (
                  <GeneralContactsSection />
                )}
              </div>
            </div>

            {/* Feedback Section */}
            <FeedbackPrompt
              helpfulValue={feedbackHelpful}
              onFeedbackChange={handleFeedbackChange}
              containerClassName="pt-8 mt-8"
              titleClassName="text-sm font-normal text-(--color-preto) mb-2"
              questionClassName="text-2xl font-normal text-(--color-preto) mb-4"
              buttonClassName="px-4 py-2 border border-black rounded-lg text-l font-semibold transition-colors"
              activeButtonClassName="bg-(--color-preto) text-white"
              inactiveButtonClassName="text-(--color-preto) hover:bg-gray-100"
            />
          </div>
        </div>

        {/* Download App Banner */}
        <div className="mt-16">
          <DownloadAppBanner />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
