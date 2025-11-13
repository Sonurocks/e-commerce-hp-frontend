/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ReCAPTCHA from 'react-google-recaptcha';
import DownloadAppBanner from '@/components/department/DownloadAppBanner';

// Validation schema
const contactFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  contactPreferences: Yup.string().required('Contact preferences is required'),
  countryId: Yup.string().required('Country is required'),
  queryType: Yup.string().required('Query type is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

// Custom Dropdown Component
interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
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
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);
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
          error && touched ? 'border-red-500' : 'border-gray-300'
        } rounded focus:outline-none focus:border-[var(--color-preto)] text-base bg-white font-normal text-left flex items-center justify-between ${
          isPlaceholder ? 'text-gray-500' : 'text-[var(--color-preto)]'
        }`}
      >
        <span>{displayText}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                  ? 'bg-gray-100 text-[var(--color-preto)]'
                  : 'bg-white text-[var(--color-preto)] hover:bg-gray-100'
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

  const handleSubmit = async (values: any, { setSubmitting, resetForm, setFieldError }: any) => {
    if (!recaptchaToken) {
      setFieldError('recaptcha', 'Please complete the reCAPTCHA verification');
      setSubmitting(false);
      return;
    }

    console.log('Form values:', values);
    console.log('Selected files:', selectedFiles);
    console.log('reCAPTCHA token:', recaptchaToken);
    
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
      <h2 className="text-2xl font-normal text-[var(--color-preto)] mb-2">
        Help & Contact Us
      </h2>
      <p className="text-sm text-[var(--color-preto)] font-normal mb-6">
        Simply complete the form and click &apos;send&apos; to submit an enquiry:
      </p>

      <Formik
        initialValues={{
          name: '',
          email: '',
          contactPreferences: '',
          countryId: '',
          queryType: '',
          subject: '',
          message: '',
        }}
        validationSchema={contactFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, values }) => (
          <Form className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-thin text-(--color-preto) mb-1">
                Name<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`w-full px-3 py-2 border ${
                  errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
                } rounded focus:outline-none focus:border-(--color-preto) text-base bg-white font-normal`}
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-thin text-(--color-preto) mb-1">
                Email<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`w-full px-3 py-2 border ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                } rounded focus:outline-none focus:border-(--color-preto) text-base bg-white font-normal`}
              />
              <p className="text-xs text-(--color-preto) font-normal mt-1">
                Please ensure that your email address is correct so that we can respond to your enquiry.
              </p>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Contact Preferences Field */}
            <div>
              <label htmlFor="contactPreferences" className="block text-xs font-normal text-(--color-preto) mb-1">
                Contact Preferences<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                name="contactPreferences"
                component={({ field, form }: any) => (
                  <CustomSelect
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={[
                      { value: 'no-phone', label: "I don't want to be contacted by phone" },
                      { value: 'prefer-phone', label: 'I prefer to be contacted by phone' },
                      { value: 'may-phone', label: 'If you need to, you may contact me by phone' },
                    ]}
                    placeholder="Contact Preferences"
                    error={form.errors.contactPreferences}
                    touched={form.touched.contactPreferences}
                  />
                )}
              />
              <ErrorMessage name="contactPreferences" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Country Id Field */}
            <div>
              <label htmlFor="countryId" className="block text-xs font-normal text-(--color-preto) mb-1">
                Country Id<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                name="countryId"
                component={({ field, form }: any) => (
                  <CustomSelect
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={[
                      { value: 'af', label: 'Afghanistan' },
                      { value: 'al', label: 'Albania' },
                      { value: 'dz', label: 'Algeria' },
                      { value: 'ad', label: 'Andorra' },
                      { value: 'ao', label: 'Angola' },
                      { value: 'ai', label: 'Anguilla' },
                      { value: 'ag', label: 'Antigua and Barbuda' },
                      { value: 'aq', label: 'AQ' },
                      { value: 'ar', label: 'Argentina' },
                      { value: 'am', label: 'Armenia' },
                      { value: 'aw', label: 'Aruba' },
                      { value: 'as', label: 'AS' },
                      { value: 'au', label: 'Australia' },
                      { value: 'at', label: 'Austria' },
                      { value: 'az', label: 'Azerbaijan' },
                      { value: 'bs', label: 'Bahamas' },
                      { value: 'bh', label: 'Bahrain' },
                      { value: 'bd', label: 'Bangladesh' },
                      { value: 'bb', label: 'Barbados' },
                      { value: 'by', label: 'Belarus' },
                      { value: 'be', label: 'Belgium' },
                      { value: 'bz', label: 'Belize' },
                      { value: 'bj', label: 'Benin' },
                      { value: 'bm', label: 'Bermuda' },
                      { value: 'bt', label: 'Bhutan' },
                      { value: 'bo', label: 'Bolivia' },
                      { value: 'ba', label: 'Bosnia and Herzegovina' },
                      { value: 'bw', label: 'Botswana' },
                      { value: 'br', label: 'Brazil' },
                      { value: 'io', label: 'British Indian Ocean Territory' },
                      { value: 'bn', label: 'Brunei Darussalam' },
                      { value: 'bg', label: 'Bulgaria' },
                      { value: 'bf', label: 'Burkina Faso' },
                      { value: 'bi', label: 'Burundi' },
                      { value: 'bv', label: 'BV' },
                      { value: 'kh', label: 'Cambodia' },
                      { value: 'cm', label: 'Cameroon' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'cv', label: 'Cape Verde' },
                      { value: 'ky', label: 'Cayman Islands' },
                      { value: 'cc', label: 'CC' },
                      { value: 'cf', label: 'Central African Republic' },
                      { value: 'td', label: 'Chad' },
                      { value: 'cl', label: 'Chile' },
                      { value: 'cn', label: 'China' },
                      { value: 'ci-uk', label: 'CI-UK' },
                      { value: 'co', label: 'Colombia' },
                      { value: 'ck', label: 'Cook Islands' },
                      { value: 'cr', label: 'Costa Rica' },
                      { value: 'ci', label: 'Cote D`Ivoire' },
                      { value: 'hr', label: 'Croatia' },
                      { value: 'cw', label: 'CW' },
                      { value: 'cx', label: 'CX' },
                      { value: 'cy', label: 'Cyprus' },
                      { value: 'cz', label: 'Czech Republic' },
                      { value: 'dk', label: 'Denmark' },
                      { value: 'dj', label: 'Djibouti' },
                      { value: 'dm', label: 'Dominica' },
                      { value: 'do', label: 'Dominican Republic' },
                      { value: 'tl', label: 'East Timor' },
                      { value: 'ec', label: 'Ecuador' },
                      { value: 'eg', label: 'Egypt' },
                      { value: 'eh', label: 'EH' },
                      { value: 'sv', label: 'El Salvador' },
                      { value: 'gq', label: 'Equatorial Guinea' },
                      { value: 'ee', label: 'Estonia' },
                      { value: 'et', label: 'Ethiopia' },
                      { value: 'fo', label: 'Faeroe Islands' },
                      { value: 'fk', label: 'Falkland Islands (Malvinas)' },
                      { value: 'fj', label: 'Fiji' },
                      { value: 'fi', label: 'Finland' },
                      { value: 'fr', label: 'France' },
                      { value: 'gf', label: 'French Guiana' },
                      { value: 'pf', label: 'French Polynesia' },
                      { value: 'ga', label: 'Gabon' },
                      { value: 'gm', label: 'Gambia' },
                      { value: 'ge', label: 'Georgia' },
                      { value: 'de', label: 'Germany' },
                      { value: 'gh', label: 'Ghana' },
                      { value: 'gi', label: 'Gibraltar' },
                      { value: 'gr', label: 'Greece' },
                      { value: 'gl', label: 'Greenland' },
                      { value: 'gd', label: 'Grenada' },
                      { value: 'gp', label: 'Guadeloupe' },
                      { value: 'gu', label: 'Guam' },
                      { value: 'gt', label: 'Guatemala' },
                      { value: 'gg', label: 'Guernsey, C.I.' },
                      { value: 'gn', label: 'Guinea' },
                      { value: 'gw', label: 'Guinea-Bissau' },
                      { value: 'gy', label: 'Guyana' },
                      { value: 'ht', label: 'Haiti' },
                      { value: 'hm', label: 'HM' },
                      { value: 'hn', label: 'Honduras' },
                      { value: 'hk', label: 'Hong Kong SAR' },
                      { value: 'hu', label: 'Hungary' },
                      { value: 'is', label: 'Iceland' },
                      { value: 'im', label: 'IM' },
                      { value: 'in', label: 'India' },
                      { value: 'id', label: 'Indonesia' },
                      { value: 'iq', label: 'Iraq' },
                      { value: 'ie', label: 'Ireland' },
                      { value: 'il', label: 'Israel' },
                      { value: 'it', label: 'Italy' },
                      { value: 'jm', label: 'Jamaica' },
                      { value: 'jp', label: 'Japan' },
                      { value: 'je', label: 'Jersey, C.I.' },
                      { value: 'jo', label: 'Jordan' },
                      { value: 'kz', label: 'Kazakhstan' },
                      { value: 'ke', label: 'Kenya' },
                      { value: 'ki', label: 'KI' },
                      { value: 'km', label: 'KM' },
                      { value: 'kn', label: 'KN' },
                      { value: 'kr', label: 'Korea, Republic of' },
                      { value: 'kw', label: 'Kuwait' },
                      { value: 'kg', label: 'Kyrgyzstan' },
                      { value: 'la', label: 'Lao Peoples Democratic Republic' },
                      { value: 'lv', label: 'Latvia' },
                      { value: 'lb', label: 'Lebanon' },
                      { value: 'ls', label: 'Lesotho' },
                      { value: 'li', label: 'Liechtenstein' },
                      { value: 'lt', label: 'Lithuania' },
                      { value: 'lr', label: 'LR' },
                      { value: 'lu', label: 'Luxembourg' },
                      { value: 'mo', label: 'Macau SAR' },
                      { value: 'mg', label: 'Madagascar' },
                      { value: 'mw', label: 'Malawi' },
                      { value: 'my', label: 'Malaysia' },
                      { value: 'mv', label: 'Maldives' },
                      { value: 'ml', label: 'Mali' },
                      { value: 'mt', label: 'Malta' },
                      { value: 'mq', label: 'Martinique' },
                      { value: 'mr', label: 'Mauritania' },
                      { value: 'mu', label: 'Mauritius' },
                      { value: 'mx', label: 'Mexico' },
                      { value: 'mh', label: 'MH' },
                      { value: 'fm', label: 'Micronesia, Fed. States of' },
                      { value: 'mm', label: 'MM' },
                      { value: 'md', label: 'Moldova, Republic of' },
                      { value: 'mc', label: 'Monaco' },
                      { value: 'mn', label: 'Mongolia' },
                      { value: 'me', label: 'Montenegro' },
                      { value: 'ms', label: 'Montserrat' },
                      { value: 'ma', label: 'Morocco' },
                      { value: 'mz', label: 'Mozambique' },
                      { value: 'na', label: 'Namibia' },
                      { value: 'nr', label: 'Nauru' },
                      { value: 'np', label: 'Nepal' },
                      { value: 'an', label: 'Netherland Antilles' },
                      { value: 'nl', label: 'Netherlands' },
                      { value: 'nc', label: 'New Caledonia' },
                      { value: 'nz', label: 'New Zealand' },
                      { value: 'nf', label: 'NF' },
                      { value: 'ni', label: 'Nicaragua' },
                      { value: 'ne', label: 'Niger' },
                      { value: 'ng', label: 'Nigeria' },
                      { value: 'nu', label: 'Niue' },
                      { value: 'mp', label: 'Northern Mariana Islands' },
                      { value: 'no', label: 'Norway' },
                      { value: 'om', label: 'Oman' },
                      { value: 'pk', label: 'Pakistan' },
                      { value: 'pw', label: 'Palau' },
                      { value: 'pa', label: 'Panama' },
                      { value: 'pg', label: 'Papua New Guinea' },
                      { value: 'py', label: 'Paraguay' },
                      { value: 'pe', label: 'Peru' },
                      { value: 'ph', label: 'Philippines' },
                      { value: 'pm', label: 'PM' },
                      { value: 'pn', label: 'PN' },
                      { value: 'pl', label: 'Poland' },
                      { value: 'pt', label: 'Portugal' },
                      { value: 'pr', label: 'Puerto Rico' },
                      { value: 'qa', label: 'Qatar' },
                      { value: 'mk', label: 'Republic of Macedonia' },
                      { value: 're', label: 'Reunion' },
                      { value: 'ro', label: 'Romania' },
                      { value: 'ru', label: 'Russian Federation' },
                      { value: 'rw', label: 'Rwanda' },
                      { value: 'lc', label: 'Saint Lucia' },
                      { value: 'sm', label: 'San Marino' },
                      { value: 'sa', label: 'Saudi Arabia' },
                      { value: 'sb', label: 'SB' },
                      { value: 'sd', label: 'SD' },
                      { value: 'sn', label: 'Senegal' },
                      { value: 'rs', label: 'Serbia' },
                      { value: 'sc', label: 'Seychelles' },
                      { value: 'sh', label: 'SH' },
                      { value: 'sl', label: 'Sierra Leone' },
                      { value: 'sg', label: 'Singapore' },
                      { value: 'sj', label: 'SJ' },
                      { value: 'sk', label: 'Slovakia' },
                      { value: 'si', label: 'Slovenia' },
                      { value: 'so', label: 'SO' },
                      { value: 'za', label: 'South Africa' },
                      { value: 'es', label: 'Spain' },
                      { value: 'es-ci', label: 'Spain - Canary Islands' },
                      { value: 'lk', label: 'Sri Lanka' },
                      { value: 'st', label: 'ST' },
                      { value: 'sr', label: 'Suriname' },
                      { value: 'se', label: 'Sweden' },
                      { value: 'ch', label: 'Switzerland' },
                      { value: 'sy', label: 'SY' },
                      { value: 'sz', label: 'SZ' },
                      { value: 'tw', label: 'Taiwan Region' },
                      { value: 'tj', label: 'Tajikistan' },
                      { value: 'tz', label: 'Tanzania, United Republic of' },
                      { value: 'tf', label: 'TF' },
                      { value: 'th', label: 'Thailand' },
                      { value: 'cg', label: 'The Republic of Congo' },
                      { value: 'tk', label: 'TK' },
                      { value: 'tm', label: 'TM' },
                      { value: 'to', label: 'TO' },
                      { value: 'tg', label: 'Togo' },
                      { value: 'tt', label: 'Trinidad and Tobago' },
                      { value: 'tn', label: 'Tunisia' },
                      { value: 'tr', label: 'Turkey' },
                      { value: 'tc', label: 'Turks and Caicos Islands' },
                      { value: 'tv', label: 'TV' },
                      { value: 'ae', label: 'UAE' },
                      { value: 'ug', label: 'Uganda' },
                      { value: 'ua', label: 'Ukraine' },
                      { value: 'um', label: 'UM' },
                      { value: 'gb', label: 'United Kingdom' },
                      { value: 'us', label: 'United States' },
                      { value: 'uy', label: 'Uruguay' },
                      { value: 'uz', label: 'Uzbekistan' },
                      { value: 'va', label: 'Vatican City State' },
                      { value: 'vc', label: 'VC' },
                      { value: 've', label: 'Venezuela' },
                      { value: 'vn', label: 'Vietnam' },
                      { value: 'vg', label: 'Virgin Islands (British)' },
                      { value: 'vi', label: 'Virgin Islands, U.S.' },
                      { value: 'vu', label: 'VU' },
                      { value: 'wf', label: 'WF' },
                      { value: 'ws', label: 'WS' },
                      { value: 'xk', label: 'XK' },
                      { value: 'ye', label: 'Yemen, Republic of' },
                      { value: 'zm', label: 'Zambia' },
                      { value: 'zw', label: 'Zimbabwe' },
                      { value: 'zr', label: 'ZR' },
                    ]}
                    placeholder="Country Id"
                    error={form.errors.countryId}
                    touched={form.touched.countryId}
                  />
                )}
              />
              <ErrorMessage name="countryId" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Query Type Field */}
            <div>
              <label htmlFor="queryType" className="block text-sm font-normal text-(--color-preto) mb-1">
                Query Type<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                name="queryType"
                component={({ field, form }: any) => (
                  <CustomSelect
                    name={field.name}
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={[
                      { value: 'about-refund', label: 'About my refund' },
                      { value: 'about-return', label: 'About my return' },
                      { value: 'cant-place-order', label: "Can't Place An Order" },
                      { value: 'change-address', label: 'Change my address' },
                      { value: 'product-received', label: 'Product I received' },
                      { value: 'product-information', label: 'Product Information' },
                      { value: 'order-status', label: 'Status of my order' },
                      { value: 'track-delivery', label: 'Track my delivery' },
                    ]}
                    placeholder="Query Type"
                    error={form.errors.queryType}
                    touched={form.touched.queryType}
                  />
                )}
              />
              <ErrorMessage name="queryType" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-xs font-normal text-(--color-preto) mb-1">
                Subject<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                type="text"
                id="subject"
                name="subject"
                className={`w-full px-3 py-2 border ${
                  errors.subject && touched.subject ? 'border-red-500' : 'border-gray-300'
                } rounded focus:outline-none focus:border-(--color-preto) text-base bg-white font-normal`}
              />
              <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-xs font-normal text-[var(--color-preto)] mb-1">
                Message<span className="text-(--color-preto)">*</span>
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                rows={6}
                className={`w-full px-3 py-2 border ${
                  errors.message && touched.message ? 'border-red-500' : 'border-gray-300'
                } rounded focus:outline-none focus:border-[var(--color-preto)] text-base bg-white font-normal resize-y`}
              />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Attachments Field */}
            <div>
              <label className="block text-xs font-normal text-[var(--color-preto)] mb-1">
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
                  className="px-15 py-3 border border-(--color-preto) rounded-lg text-sm text-[var(--color-preto)] font-bold cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Add File
                </label>
                {selectedFiles.length > 0 && (
                  <span className="text-m text-[var(--color-preto)] font-bold">
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
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                  onChange={handleRecaptchaChange}
                  theme="light"
                />
                {recaptchaToken === null && (
                  <ErrorMessage name="recaptcha" component="div" className="text-red-500 text-sm mt-1" />
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

const ContactUs = () => {
  const [expandedSections, setExpandedSections] = useState<{
    cancelReturn: boolean;
    emailService: boolean;
    generalContacts: boolean;
  }>({
    cancelReturn: false,
    emailService: false,
    generalContacts: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-white font-normal">
      <div className="container mx-auto px-[48px] py-16 max-w-[1440px]">
        

        {/* Four Column Horizontal Layout - All sections aligned horizontally */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 items-start">
          {/* Column 1 - Information Links */}
          <div>
            <h3 className="text-normal font-normal text-[var(--color-preto)] mb-2 underline">
              HOLIDAY DATES YOU&apos;LL WANT TO KNOW
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact-us" className="text-base text-[var(--color-preto)] underline font-normal">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  How to shop
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Orders and delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Payment and pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Cryptocurrency Payments
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Returns and refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Modern slavery statement
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Cookie preferences
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-[var(--color-preto)] underline font-normal">
                  Promotions terms &amp; conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Customer Service */}
          <div className="ml-16">
            <h2 className="text-2xl font-normal text-[var(--color-preto)] mb-13">
              Contact us
            </h2>
            <h3 className="text-2xl font-normal text-[var(--color-preto)] mb-3">
              Customer Service
            </h3>
            <div className="mb-4">
              <p className="text-sm text-[var(--color-preto)] font-normal mb-1">
                <strong>Email service hours:</strong>
              </p>
              <p className="text-sm text-[var(--color-preto)] font-normal">
                Monday to Friday: 24 hours a day
              </p>
              <p className="text-sm text-[var(--color-preto)] font-normal">
                Saturday and Sunday: 8am to 3pm EST
              </p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-preto)] font-normal mb-1">
                <strong>Phone service hours:</strong>
              </p>
              <p className="text-sm text-[var(--color-preto)] font-normal">
                Monday to Friday: 8am to 9pm EST
              </p>
            </div>
          </div>

          {/* Column 3 - FAQs */}
          <div className="pt-[81px] ml-8">
            <h3 className="text-2xl font-normal text-[var(--color-preto)] mb-4">
              FAQs
            </h3>
            <p className="text-sm text-[var(--color-preto)] font-normal mb-2">
              Find the answers you need in our{' '}
              <Link href="#" className="underline">
                FAQs
              </Link>
            </p>
            <div>
              <p className="text-base font-normal text-[var(--color-preto)] mb-0">
                <strong>Quick Actions:</strong>
              </p>
              <ul className="space-y-1">
                <li>
                  <Link href="#" className="text-sm text-[var(--color-preto)] underline font-normal">
                    Check the status of my order
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-[var(--color-preto)] underline font-normal">
                    Cancel my order
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-(--color-preto) underline font-normal">
                    Return my order
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-(--color-preto) underline font-normal">
                    Check my return status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4 - Response Time Information */}
          <div className="pt-[81px]">
            <h2 className="text-2xl font-normal text-[var(--color-preto)] mb-4">
              We&apos;ll be in touch soon.
            </h2>
            <p className="text-sm text-[var(--color-preto)] font-normal leading-relaxed mb-4">
              We aim to respond within 24 hours, but during busy periods like holidays, sales and special campaigns, we may take a little longer getting back to you.
            </p>
            <p className="text-sm text-[var(--color-preto)] font-normal leading-relaxed">
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
                  onClick={() => toggleSection('cancelReturn')}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-l font-normal text-[var(--color-preto)]">
                    STEP BY STEP TO CANCEL OR RETURN YOUR ORDER
                  </h3>
                  <svg
                    className={`w-5 h-5 text-[var(--color-preto)] transition-transform ${
                      expandedSections.cancelReturn ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.cancelReturn && (
                  <div className="mt-4 text-base text-[var(--color-preto)] font-normal space-y-6">
                    {/* To cancel your order */}
                    <div>
                      <h4 className="text-medium  text-[var(--color-preto)] mb-3 font-semibold">
                        To cancel your order:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li className="text-sm text-(--color-preto) font-normal">
                          Go to Orders & Returns if you have an account, or if you placed an order as a guest, enter your guest order details <strong>here</strong> - you&apos;ll need to provide your order number and email address
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          Select the items you want to cancel and your reason for cancellation
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          We&apos;ll send you a confirmation email of your cancelled order
                        </li>
                      </ol>
                      <p className="text-sm text-(--color-preto) font-normal mt-3">
                        If you can&apos;t cancel your order as self-service in your account, it means the order has already been prepared and can no longer be cancelled—neither by you nor our Customer Service Team. However, you can still return - please see our <strong>Returns and Refunds</strong> page.
                      </p>
                    </div>

                    {/* To return your order */}
                    <div>
                      <h4 className="text-medium font-semibold text-(--color-preto) mb-3">
                        To return your order:
                      </h4>
                      <ol className="list-decimal list-inside space-y-2 ml-4">
                        <li className="text-sm text-(--color-preto) font-normal">
                          Go to Orders & Returns if you have an account. If you placed your order as a guest, enter your guest order details <strong>here</strong>.
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          Find the order you want to return and click Return Item(s)
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          Select each item and your reason for returning
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          There are two ways to return your items. At least one will always be available:
                          <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                            <li>
                              Book a free returns collection - Select your collection address and number of packages, schedule a collection date, suitable time and click Book Collection
                            </li>
                            <li>
                              Return for free at a drop-off point near you - Select the drop-off option in your account and take the return to your chosen courier drop-off point
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
                          Place the item inside the FARFETCH packaging - don&apos;t forget any brand boxes, dust bags, or cases
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          Attach your Return Label to the outside of the FARFETCH packaging.
                        </li>
                        <li className="text-sm text-(--color-preto) font-normal">
                          If you received a Return Note with your order, attach it to the outside of your package
                        </li>
                      </ol>
                    </div>

                    {/* Important Tracking Note */}
                    <p className="text-sm text-(--color-preto)  font-semibold">
                      When your package is collected or dropped off, make sure you ask the courier to scan the label so you can track your return.
                    </p>

                    {/* Final Note on Documents */}
                    <p className="text-sm text-(--color-preto) font-normal">
                      All the documents you need to return your item should be included in your FARFETCH package. If you need to reprint them, head to Orders & Returns in your account, or if you placed an order as a guest, enter your guest order details here.
                    </p>
                  </div>
                )}
              </div>

              {/* Email Our Customer Service Team */}
              <div className="border-b border-gray-300 pb-4">
                <button
                  onClick={() => toggleSection('emailService')}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-sm font-normal text-[var(--color-preto)] uppercase">
                    EMAIL OUR CUSTOMER SERVICE TEAM
                  </h3>
                  <svg
                    className={`w-5 h-5 text-[var(--color-preto)] transition-transform ${
                      expandedSections.emailService ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                  onClick={() => toggleSection('generalContacts')}
                  className="w-full flex justify-between items-center text-left"
                >
                  <h3 className="text-sm font-normal text-(--color-preto)">
                    GENERAL CONTACTS
                  </h3>
                  <svg
                    className={`w-5 h-5 text-(--color-preto) transition-transform ${
                      expandedSections.generalContacts ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSections.generalContacts && (
                  <div className="mt-4 text-base text-(--color-preto) font-normal space-y-6" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                    {/* Customer Service */}
                    <div>
                      <h4 className="text-xs font-semibold text-(--color-preto) mb-0" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        Customer Service
                      </h4>
                      <div className="space-y-2 text-sm text-(--color-preto) font-base" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        <p>
                          Email:{' '}
                          <a href="mailto:customerservice@farfetch.com" className="underline">
                            customerservice@farfetch.com
                          </a>
                        </p>
                        <p>
                          Phone number:{' '}
                          <a href="tel:+16467913768" className="underline">
                            +1 646 791 3768
                          </a>
                        </p>
                        <p>
                          We also offer support in Spanish. Envíanos un email en español utilizando el formulario de contacto a continuación, o llámanos al{' '}
                          <a href="tel:+525553509445" className="underline">
                            +52 55 5350 9445
                          </a>{' '}
                          de lunes a viernes, de 9:00 a. m a 5:00 p. m EST
                        </p>
                        <p>
                          During busy periods like holidays, sales and special campaigns you might experience higher waiting times from our Customer Service team. Your deliveries may take longer than usual to get to you, but don&apos;t worry — you&apos;ll receive a confirmation email as soon as your order is sent. For more information,{' '}
                          <Link href="#" className="underline">
                            visit the FAQs
                          </Link>
                        </p>
                      </div>
                    </div>

                    {/* Press */}
                    <div>
                      <h4 className="text-xs font-semibold text-(--color-preto) mb-0" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        Press
                      </h4>
                      <div className="space-y-2 text-sm text-(--color-preto) font-normal" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        <p>
                          Email:{' '}
                          <a href="mailto:press@farfetch.com" className="underline">
                            press@farfetch.com
                          </a>
                        </p>
                        <p>
                          If you&apos;re a journalist and require images for editorial purposes, please email your requests to{' '}
                          <a href="mailto:press@farfetch.com" className="underline">
                            press@farfetch.com
                          </a>
                          . We don&apos;t hold samples, but we may be able to put you in touch with our brands and partner boutiques.
                        </p>
                      </div>
                    </div>

                    {/* Retail Partners */}
                    <div>
                      <h4 className="text-xs font-semibold text-(--color-preto) mb-0" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        Retail Partners
                      </h4>
                      <div className="space-y-2 text-sm text-(--color-preto) font-normal" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        <p>
                          Email:{' '}
                          <a href="mailto:retailpartners@farfetch.com" className="underline">
                            retailpartners@farfetch.com
                          </a>
                        </p>
                        <p>
                          If you would like to join FARFETCH as a retail partner, email{' '}
                          <a href="mailto:retailpartners@farfetch.com" className="underline">
                            retailpartners@farfetch.com
                          </a>
                          . Please include all the details and the website address if you have one.
                        </p>
                      </div>
                    </div>

                    {/* Jobs */}
                    <div>
                      <h4 className="text-xs font-semibold text-(--color-preto) mb-0" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        Jobs
                      </h4>
                      <div className="space-y-2 text-sm text-(--color-preto) font-normal" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        <p>
                          Interested in a career at FARFETCH?{' '}
                          <Link href="#" className="underline">
                            Visit our careers page here
                          </Link>
                        </p>
                        <p>
                          Please do not email your CV. Applicants will only be considered if they apply for a job role through our careers page.
                        </p>
                      </div>
                    </div>

                    {/* Buying */}
                    <div>
                      <h4 className="text-xs font-semibold text-(--color-preto) mb-0" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        Buying
                      </h4>
                      <div className="space-y-2 text-sm text-(--color-preto) font-normal" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        <p>
                          FARFETCH operates as a marketplace for our brands and partner boutiques. We don&apos;t have a buying department or buy stock directly from brands.
                        </p>
                        <p>
                          FARFETCH UK Ltd, The Bower, 211 Old Street, London, EC1V 9NR
                        </p>
                        <p>
                          Please note, returns will not be accepted at this address.
                        </p>
                      </div>
                    </div>

                    {/* Speak Up Line */}
                    <div>
                      <h4 className="text-xs font-semibold text-(--color-preto) mb-0" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        Speak Up Line
                      </h4>
                      <div className="space-y-2 text-sm text-(--color-preto) font-normal" style={{ fontFamily: '"Farfetch Basis", "Helvetica Neue", Arial, sans-serif', fontSize: '0.780rem' }}>
                        <p>
                          If you are aware of any ethics concerns/unethical practices or violations of our Code of Conduct, please{' '}
                          <Link href="#" className="underline">
                            raise a concern here
                          </Link>
                          . This link is not to reach our Customer Service team.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="pt-8 mt-8">
              <p className="text-sm font-normal text-(--color-preto) mb-2">
                Tell us what you think
              </p>
              <p className="text-2xl font-normal text-(--color-preto) mb-4">
                Was this content helpful?
              </p>
              <div className="flex gap-4">
                <button className="px-4 py-2 border border-black rounded-lg text-l text-(--color-preto)  font-semibold hover:bg-gray-100 transition-colors">
                  Yes
                </button>
                <button className="px-4 py-2 border border-black rounded-lg text-l text-(--color-preto)  font-semibold hover:bg-gray-100 transition-colors">
                  Not really
                </button>
              </div>
            </div>
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
