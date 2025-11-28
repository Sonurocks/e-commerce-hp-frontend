'use client';

import React, { useState } from "react";
import ForgotPassword from "../profile/ForgotPassword";

type Tab = "login" | "register";

const businessTypes = ["Individual Seller", "Manufacturer", "Retailer", "Wholesaler", "Distributor"];
const businessCategories = ["Fashion", "Electronics", "Beauty", "Home", "Accessories", "Lifestyle"];
const documentUploads = [
  { id: "idProof", label: "ID Proof (Aadhar / Passport / Driver License)" },
  { id: "businessRegistration", label: "Business Registration Certificate" },
  { id: "gstCertificate", label: "GST Certificate / Tax License" },
  { id: "addressProof", label: "Address Proof" },
  { id: "cancelledCheque", label: "Cancelled Cheque or Bank Verification Document" },
  { id: "signatureUpload", label: "Signature Upload (optional)", optional: true },
];
const policyStatements = [
  "I agree to the Terms & Conditions",
  "I agree to the Vendor/Seller Policies",
  "I accept the Payment & Commission Terms",
  "I confirm all details are correct",
];

const inputClasses =
  "w-full rounded-xl border px-4 py-3 text-base text-preto placeholder:text-(--color-hina) focus:outline-none border-preto focus:border-(--color-preto)";

const selectClasses = inputClasses;

const cardClasses =
  "rounded-3xl border border-gray-100 bg-white text-preto shadow-[0_25px_70px_rgba(15,23,42,0.08)] p-6 md:p-8 space-y-6";

const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="space-y-2">
    <h3 className="text-xl font-semibold text-preto">{title}</h3>
    {description && <p className="text-sm text-gray-600">{description}</p>}
  </div>
);

const VendorPortal = () => {
  const [activeTab, setActiveTab] = useState<Tab>("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [registerEmailError, setRegisterEmailError] = useState("");
  const [registerPasswordError, setRegisterPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password: string): boolean => {
    if (password.length < 6 || password.length > 12) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[@$!%*?&#]/.test(password)) {
      return false;
    }
    return true;
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;
    
    if (!validateEmail(loginEmail)) {
      setLoginEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setLoginEmailError("");
    }
    
    if (!validatePassword(loginPassword)) {
      setLoginPasswordError("Password must be 6-12 characters with 1 uppercase and 1 special character");
      isValid = false;
    } else {
      setLoginPasswordError("");
    }
    
    if (isValid) {
      // Proceed with login
      console.log("Login successful");
    }
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;
    
    if (!validateEmail(registerEmail)) {
      setRegisterEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setRegisterEmailError("");
    }
    
    if (!validatePassword(registerPassword)) {
      setRegisterPasswordError("Password must be 6-12 characters with 1 uppercase and 1 special character");
      isValid = false;
    } else {
      setRegisterPasswordError("");
    }
    
    if (registerPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }
    
    if (isValid) {
      // Proceed with registration
      console.log("Registration successful");
    }
  };

  return (
    <section className="bg-white text-preto" style={{ fontFamily: 'var(--fontNormal)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Farfetch Collective</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-preto">
            Become a FARFETCH Vendor
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partner with the global platform for luxury fashion. Log in to manage your boutique or complete the registration
            form to start selling with FARFETCH.
          </p>
        </header>

        <div className="flex justify-center gap-4">
          {(["login", "register"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab
                  ? "border-[var(--colorDark)] bg-[var(--colorDark)] text-white shadow-lg shadow-black/20"
                  : "border-gray-300 text-[#1a1a1a] bg-white hover:text-preto"
              }`}
            >
              {tab === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        {activeTab === "login" ? (
          <div className={cardClasses}>
            <SectionHeading title="Vendor Login" description="Access your vendor dashboard to manage products, orders, and payouts." />
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block text-xs font-normal text-preto">
                  Email address
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginEmailError) {
                        setLoginEmailError("");
                      }
                    }}
                    onBlur={() => {
                      if (loginEmail && !validateEmail(loginEmail)) {
                        setLoginEmailError("Please enter a valid email address");
                      } else {
                        setLoginEmailError("");
                      }
                    }}
                    className={`mt-2 ${inputClasses} ${
                      loginEmailError ? "border-red-500" : ""
                    }`}
                    placeholder="vendor@boutique.com"
                  />
                  {loginEmailError && (
                    <p className="text-xs text-red-500">{loginEmailError}</p>
                  )}
                </label>
                <label className="block text-xs font-normal text-preto">
                  Password
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginPasswordError) {
                        setLoginPasswordError("");
                      }
                    }}
                    onBlur={() => {
                      if (loginPassword && !validatePassword(loginPassword)) {
                        setLoginPasswordError("Password must be 6-12 characters with 1 uppercase and 1 special character");
                      } else {
                        setLoginPasswordError("");
                      }
                    }}
                    className={`mt-2 ${inputClasses} ${
                      loginPasswordError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  {loginPasswordError && (
                    <p className="text-xs text-red-500">{loginPasswordError}</p>
                  )}
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-preto focus:ring-preto" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs font-thin text-preto underline hover:text-preto underline-offset-2 hover:underline cursor-pointer"
                >
                  Forgot your password ?
                </button>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-black text-white font-semibold tracking-wide shadow-lg shadow-black/10"
              >
                Login
              </button>
              <p className="text-sm text-gray-600">
                New to FARFETCH?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="font-semibold underline underline-offset-4 hover:text-preto"
                >
                  Register your bussiness
                </button>
              </p>
            </form>
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleRegisterSubmit}>
            <div className={cardClasses}>
              <SectionHeading
                title="Personal Information"
                description="These details help us verify you as the primary contact for the boutique."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block text-xs font-normal text-preto">
                  Full Name
                  <input type="text" required placeholder="Enter your full name" className={`mt-2 ${inputClasses}`} />
                </label>
                <label className="block text-xs font-normal text-preto">
                  Email Address
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                      if (registerEmailError) {
                        setRegisterEmailError("");
                      }
                    }}
                    onBlur={() => {
                      if (registerEmail && !validateEmail(registerEmail)) {
                        setRegisterEmailError("Please enter a valid email address");
                      } else {
                        setRegisterEmailError("");
                      }
                    }}
                    className={`mt-2 ${inputClasses} ${
                      registerEmailError ? "border-red-500" : ""
                    }`}
                    placeholder="name@vendor.com"
                  />
                  {registerEmailError && (
                    <p className="mt-1 text-xs text-red-500">{registerEmailError}</p>
                  )}
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Phone Number</span>
                  <input type="tel" required placeholder="+1 234 567 8900" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Country</span>
                  <input type="text" required placeholder="United Kingdom" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>State / City</span>
                  <input type="text" required placeholder="London" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Gender <span className="text-gray-500 text-xs">(optional)</span></span>
                  <select className={selectClasses} defaultValue="">
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="nonBinary">Non-binary</option>
                    <option value="preferNot">Prefer not to say</option>
                  </select>
                </label>
                <label className="block text-xs font-normal text-preto">
                  Password
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => {
                      setRegisterPassword(e.target.value);
                      if (registerPasswordError) {
                        setRegisterPasswordError("");
                      }
                      if (confirmPassword && e.target.value !== confirmPassword) {
                        setConfirmPasswordError("Passwords do not match");
                      } else {
                        setConfirmPasswordError("");
                      }
                    }}
                    onBlur={() => {
                      if (registerPassword && !validatePassword(registerPassword)) {
                        setRegisterPasswordError("Password must be 6-12 characters with 1 uppercase and 1 special character");
                      } else {
                        setRegisterPasswordError("");
                      }
                    }}
                    className={`mt-2 ${inputClasses} ${
                      registerPasswordError ? "border-red-500" : ""
                    }`}
                    placeholder="Create a strong password"
                  />
                  {registerPasswordError && (
                    <p className="mt-1 text-xs text-red-500">{registerPasswordError}</p>
                  )}
                </label>
                <label className="block text-xs font-normal text-preto">
                  Confirm Password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (confirmPasswordError) {
                        setConfirmPasswordError("");
                      }
                      if (registerPassword && e.target.value !== registerPassword) {
                        setConfirmPasswordError("Passwords do not match");
                      } else {
                        setConfirmPasswordError("");
                      }
                    }}
                    onBlur={() => {
                      if (confirmPassword && registerPassword && confirmPassword !== registerPassword) {
                        setConfirmPasswordError("Passwords do not match");
                      } else {
                        setConfirmPasswordError("");
                      }
                    }}
                    className={`mt-2 ${inputClasses} ${
                      confirmPasswordError ? "border-red-500" : ""
                    }`}
                    placeholder="Re-enter password"
                  />
                  {confirmPasswordError && (
                    <p className="mt-1 text-xs text-red-500">{confirmPasswordError}</p>
                  )}
                </label>
              </div>
            </div>

            <div className={cardClasses}>
              <SectionHeading
                title="Business Information"
                description="Tell us more about your business so we can verify your eligibility."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="space-y-2 text-sm font-medium">
                  <span>Business Name</span>
                  <input type="text" required placeholder="Boutique Name" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Business Type</span>
                  <select className={selectClasses} defaultValue="" required>
                    <option value="" disabled>
                      Select business type
                    </option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Business Category</span>
                  <select className={selectClasses} defaultValue="" required>
                    <option value="" disabled>
                      Select category
                    </option>
                    {businessCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Business Registration Number (GST / Tax ID)</span>
                  <input type="text" required placeholder="GSTIN / Tax ID" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium md:col-span-2">
                  <span>Business Address</span>
                  <input type="text" required placeholder="Street, City, ZIP" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium md:col-span-2">
                  <span>Alternate Contact Number <span className="text-gray-500 text-xs">(optional)</span></span>
                  <input type="tel" placeholder="+1 987 654 3210" className={inputClasses} />
                </label>
              </div>
            </div>

            <div className={cardClasses}>
              <SectionHeading
                title="Store Details"
                description="Public-facing information for your FARFETCH storefront."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="space-y-2 text-sm font-medium">
                  <span>Store Name</span>
                  <input type="text" required placeholder="Displayed store name" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Store Logo</span>
                  <input type="file" accept="image/*" className={`${inputClasses} file:mr-4 file:rounded-full file:border-0 file:bg-preto file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white`} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Store Banner</span>
                  <input type="file" accept="image/*" className={`${inputClasses} file:mr-4 file:rounded-full file:border-0 file:bg-preto file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white`} />
                </label>
                <label className="space-y-2 text-sm font-medium md:col-span-2">
                  <span>Store Description</span>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your brand story, signature products, and what makes your boutique unique."
                    className={`${inputClasses} resize-none`}
                  />
                </label>
                <label className="space-y-2 text-sm font-medium md:col-span-2">
                  <span>Website / Social Media Links <span className="text-gray-500 text-xs">(optional)</span></span>
                  <input type="url" placeholder="https://instagram.com/yourstore" className={inputClasses} />
                </label>
              </div>
            </div>

            <div className={cardClasses}>
              <SectionHeading title="Bank & Payment Details" description="Secure banking information for payouts and commissions." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="space-y-2 text-sm font-medium">
                  <span>Account Holder Name</span>
                  <input type="text" required placeholder="Name as per bank records" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Bank Account Number</span>
                  <input type="text" required placeholder="Account number" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>IFSC / SWIFT / Routing Number</span>
                  <input type="text" required placeholder="IFSC / SWIFT / Routing" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>Bank Name</span>
                  <input type="text" required placeholder="Bank name" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>UPI ID <span className="text-gray-500 text-xs">(for India)</span></span>
                  <input type="text" placeholder="vendor@bank" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium">
                  <span>PayPal Email <span className="text-gray-500 text-xs">(for international sellers)</span></span>
                  <input type="email" placeholder="paypal@vendor.com" className={inputClasses} />
                </label>
                <label className="space-y-2 text-sm font-medium md:col-span-2">
                  <span>Billing Address <span className="text-gray-500 text-xs">(optional)</span></span>
                  <input type="text" placeholder="Billing address if different" className={inputClasses} />
                </label>
              </div>
            </div>

            <div className={cardClasses}>
              <SectionHeading title="Document Uploads" description="Provide verified documents to complete compliance checks." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentUploads.map((doc) => (
                  <label key={doc.id} className="space-y-2 text-sm font-medium">
                    <span>
                      {doc.label} {doc.optional && <span className="text-gray-500 text-xs">(optional)</span>}
                    </span>
                    <input
                      type="file"
                      required={!doc.optional}
                      className={`${inputClasses} file:mr-4 file:rounded-full file:border-0 file:bg-preto file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white`}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className={cardClasses}>
              <SectionHeading title="Terms & Policy Agreements" description="Please confirm the following to submit your application." />
              <div className="space-y-4">
                {policyStatements.map((statement) => (
                  <label key={statement} className="flex items-start gap-3 text-sm leading-tight">
                    <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-gray-300 text-preto focus:ring-preto" />
                    <span>{statement}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-gray-100">
                <div>
                  <h4 className="text-lg font-semibold">Ready to launch?</h4>
                  <p className="text-sm text-gray-600">
                    Our partnerships team will review your submission and contact you within 3-5 business days.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg bg-black text-white font-semibold tracking-wide shadow-lg shadow-black/10"
                >
                  Register as Vendor
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="font-semibold underline underline-offset-4 hover:text-preto dark:hover:text-white"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
      
      {/* Forgot Password Modal */}
      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </section>
  );
};

export default VendorPortal;


