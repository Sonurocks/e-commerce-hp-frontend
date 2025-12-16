/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useCallback } from "react";
import { HiRefresh } from "react-icons/hi";
import Toast from "@/components/profile/Toast";



const inputClasses =
  "w-full rounded-xl border px-4 py-3 text-base text-preto placeholder:text-[var(--color-hina)] focus:outline-none border-preto focus:border-preto";

// const selectClasses = inputClasses;

const cardClasses =
  "rounded-3xl border border-[var(--colorGrey)] bg-[var(--color-branco)] text-preto shadow-[0_25px_70px_rgba(15,23,42,0.08)] p-6 md:p-8 space-y-6";

const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="space-y-2">
    <h3 className="text-xl font-semibold text-preto">{title}</h3>
    {description && <p className="text-sm text-(--color-emperor)">{description}</p>}
  </div>
);

const VendorPortal = () => {
  // Register form state
  const [registerName, setRegisterName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPhone, setRegisterPhone] = useState<string>("");
  const [organizationalName, setOrganizationalName] = useState<string>("");
  const [registerNameError, setRegisterNameError] = useState("");
  const [registerEmailError, setRegisterEmailError] = useState("");
  const [registerPhoneError, setRegisterPhoneError] = useState("");
  const [captchaCode, setCaptchaCode] = useState<string>("");
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaError, setCaptchaError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Generate random captcha code
  const generateCaptcha = useCallback(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"; // Excluding confusing characters like 0, O, I, 1, l
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
    setCaptchaError("");
  }, []);

  // Generate captcha on component mount
  useEffect(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"; // Excluding confusing characters like 0, O, I, 1, l
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
    setCaptchaError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const validatePhone = (phone: string): boolean => {
    // Remove spaces, dashes, and plus signs for validation
    const cleanedPhone = phone.replace(/[\s\-+]/g, '');
    // Check if it contains only digits and has at least 10 digits
    return /^\d{10,15}$/.test(cleanedPhone);
  };

  // Handle captcha input change
  const handleCaptchaChange = (value: string) => {
    const newValue = value;
    setCaptchaInput(newValue);
    
    // Clear error when user starts typing
    if (captchaError) {
      setCaptchaError("");
    }
    
    // Validate when user enters complete code (5 characters)
    if (newValue.length === 5) {
      if (newValue.toLowerCase() !== captchaCode.toLowerCase()) {
        setCaptchaError("Captcha code does not match");
      } else {
        setCaptchaError("");
      }
    }
  };

  // Handle captcha input blur
  const handleCaptchaBlur = () => {
    if (captchaInput.trim()) {
      if (captchaInput.toLowerCase() !== captchaCode.toLowerCase()) {
        setCaptchaError("Captcha code does not match");
      } else {
        setCaptchaError("");
      }
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;
    
    // Clear previous messages
    setSubmitMessage(null);
    
    // Validate name
    if (!registerName.trim()) {
      setRegisterNameError("Please enter your name");
      isValid = false;
    } else if (registerName.trim().length < 2) {
      setRegisterNameError("Name must be at least 2 characters");
      isValid = false;
    } else {
      setRegisterNameError("");
    }
    
    // Validate email
    if (!registerEmail.trim()) {
      setRegisterEmailError("Please enter your email address");
      isValid = false;
    } else if (!validateEmail(registerEmail)) {
      setRegisterEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setRegisterEmailError("");
    }
    
    // Validate phone
    if (!registerPhone.trim()) {
      setRegisterPhoneError("Please enter your phone number");
      isValid = false;
    } else if (!validatePhone(registerPhone)) {
      setRegisterPhoneError("Please enter a valid phone number (10-15 digits)");
      isValid = false;
    } else {
      setRegisterPhoneError("");
    }
    
    // Validate captcha
    if (!captchaInput.trim()) {
      setCaptchaError("Please enter the captcha code");
      isValid = false;
    } else if (captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setCaptchaError("Captcha code does not match");
      isValid = false;
      // Refresh captcha only when form is submitted with wrong captcha
      setTimeout(() => {
        generateCaptcha();
      }, 500);
    } else {
      setCaptchaError("");
    }
    
    if (isValid) {
      setIsSubmitting(true);
      setSubmitMessage(null);
      
      try {
        // Prepare request body
        const requestBody = {
          name: registerName.trim(),
          email: registerEmail.trim(),
          phone: registerPhone.trim(),
          organizationName: organizationalName.trim() || undefined
        };
        
        // Make API call through Next.js API route (proxy) to avoid CORS issues
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        let response;
        try {
          // Use Next.js API route as proxy instead of calling backend directly
          response = await fetch('/api/vendor/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (fetchError: any) {
          clearTimeout(timeoutId);
          
          // Handle specific error types
          if (fetchError.name === 'AbortError') {
            throw new Error('Connection timeout. The server took too long to respond. Please check if the API server is running and try again.');
          } else if (fetchError.message?.includes('Failed to fetch') || fetchError.message?.includes('NetworkError')) {
            throw new Error('Network error: Cannot connect to the server. Please check:\n1. The API server is running\n2. The IP address is correct\n3. Your network connection');
          } else {
            throw fetchError;
          }
        }
        
        // Try to parse response
        let data;
        try {
          const text = await response.text();
          data = text ? JSON.parse(text) : {};
        } catch (parseError) {
          // If response is not JSON, use status text
          data = { message: response.statusText || 'Unknown error' };
        }
        
        if (response.ok) {
          // Success - show toast message
          setShowToast(true);
          setSubmitMessage(null);
          
          // Reset form
          setRegisterName("");
          setRegisterEmail("");
          setRegisterPhone("");
          setOrganizationalName("");
          setCaptchaInput("");
          generateCaptcha();
        } else {
          // Error from API
          const errorMessage = data?.message || data?.error || data?.detail || `Registration failed (Status: ${response.status}). Please try again.`;
          setSubmitMessage({
            type: 'error',
            text: errorMessage
          });
        }
      } catch (error: any) {
        // Network or other errors
        console.error('Registration error:', error);
        const errorMessage = error?.message || 'Failed to submit registration. Please check your connection and try again.';
        setSubmitMessage({
          type: 'error',
          text: errorMessage
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="bg-(--color-branco) text-preto" style={{ fontFamily: 'var(--fontNormal)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-(--color-hina)">Farfetch Collective</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-preto">
            Become a FARFETCH Vendor
          </h1>
          <p className="text-(--color-emperor) max-w-2xl mx-auto">
            Partner with the global platform for luxury fashion. Complete the registration
            form to start selling with FARFETCH.
          </p>
        </header>

        <form className="space-y-8" onSubmit={handleRegisterSubmit}>
          <div className={`${cardClasses} relative`}>
            {/* Toast Notification */}
            <Toast
              message="Registration submitted successfully! Your request has been sent to the admin for approval. You will be notified once approved."
              isVisible={showToast}
              onClose={() => setShowToast(false)}
              duration={3000}
            />
            <SectionHeading
              title="Register as Vendor"
              description="Enter your details to register as a vendor."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block text-xs font-normal text-preto">
                Name
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRegisterName(value);
                    if (value.trim() && value.trim().length < 2) {
                      setRegisterNameError("Name must be at least 2 characters");
                    } else if (!value.trim()) {
                      setRegisterNameError("Please enter your name");
                    } else {
                      setRegisterNameError("");
                    }
                  }}
                  onBlur={() => {
                    if (!registerName.trim()) {
                      setRegisterNameError("Please enter your name");
                    } else if (registerName.trim().length < 2) {
                      setRegisterNameError("Name must be at least 2 characters");
                    } else {
                      setRegisterNameError("");
                    }
                  }}
                  className={`mt-2 ${inputClasses} ${
                    registerNameError ? "border-(--color-error)" : ""
                  }`}
                  placeholder="Enter your name"
                />
                {registerNameError && (
                  <p className="mt-1 text-xs text-(--color-error)">{registerNameError}</p>
                )}
              </label>
              <label className="block text-xs font-normal text-preto">
                Email Address
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRegisterEmail(value);
                    if (value && !validateEmail(value)) {
                      setRegisterEmailError("Please enter a valid email address");
                    } else if (!value.trim()) {
                      setRegisterEmailError("Please enter your email address");
                    } else {
                      setRegisterEmailError("");
                    }
                  }}
                  onBlur={() => {
                    if (!registerEmail.trim()) {
                      setRegisterEmailError("Please enter your email address");
                    } else if (!validateEmail(registerEmail)) {
                      setRegisterEmailError("Please enter a valid email address");
                    } else {
                      setRegisterEmailError("");
                    }
                  }}
                  className={`mt-2 ${inputClasses} ${
                    registerEmailError ? "border-(--color-error)" : ""
                  }`}
                  placeholder="name@vendor.com"
                />
                {registerEmailError && (
                  <p className="mt-1 text-xs text-(--color-error)">{registerEmailError}</p>
                )}
              </label>
              <label className="block text-xs font-normal text-preto">
                Phone Number
                <input
                  type="tel"
                  value={registerPhone}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRegisterPhone(value);
                    if (value.trim() && !validatePhone(value)) {
                      setRegisterPhoneError("Please enter a valid phone number (10 digits)");
                    } else if (!value.trim()) {
                      setRegisterPhoneError("Please enter your phone number");
                    } else {
                      setRegisterPhoneError("");
                    }
                  }}
                  onBlur={() => {
                    if (!registerPhone.trim()) {
                      setRegisterPhoneError("Please enter your phone number");
                    } else if (!validatePhone(registerPhone)) {
                      setRegisterPhoneError("Please enter a valid phone number (10 digits)");
                    } else {
                      setRegisterPhoneError("");
                    }
                  }}
                  className={`mt-2 ${inputClasses} ${
                    registerPhoneError ? "border-(--color-error)" : ""
                  }`}
                  placeholder="+91 234 567 8900"
                />
                {registerPhoneError && (
                  <p className="mt-1 text-xs text-(--color-error)">{registerPhoneError}</p>
                )}
              </label>
              <label className="block text-xs font-normal text-preto">
                Organizational name <span className="text-(--color-hina)">(optional)</span>
                <input
                  type="text"
                  value={organizationalName}
                  onChange={(e) => setOrganizationalName(e.target.value)}
                  className={`mt-2 ${inputClasses}`}
                  placeholder="Enter organizational name"
                />
              </label>
            </div>
            
            {/* Custom Captcha */}
            <div className="py-4">
              <label className="block text-xs font-normal text-preto mb-2">
                Enter the code shown below
              </label>
              <div className="max-w-60">
                {/* Single Box containing Captcha Code, Refresh Button, and Input Field */}
                <div className="bg-(--color-branco) border border-(--color-silver) rounded-lg px-3 py-1.5 relative overflow-hidden">
                  {/* Visual noise overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-30">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      {/* Random lines */}
                      <line x1="10%" y1="20%" x2="30%" y2="80%" stroke="var(--color-hina)" strokeWidth="1" />
                      <line x1="50%" y1="10%" x2="70%" y2="90%" stroke="var(--color-hina)" strokeWidth="1" />
                      <line x1="80%" y1="30%" x2="90%" y2="70%" stroke="var(--color-hina)" strokeWidth="1" />
                      {/* Random dots */}
                      <circle cx="25%" cy="40%" r="2" fill="var(--color-hina)" />
                      <circle cx="60%" cy="60%" r="2" fill="var(--color-hina)" />
                      <circle cx="75%" cy="25%" r="2" fill="var(--color-hina)" />
                      <circle cx="40%" cy="75%" r="2" fill="var(--color-hina)" />
                    </svg>
                  </div>
                  {/* Captcha Code and Refresh Button Row */}
                  <div className="flex items-center gap-2 mb-1.5 relative z-10">
                    {/* Captcha Code */}
                    <div className="flex-1 text-center">
                      <span className="text-lg font-bold tracking-widest text-preto select-none" style={{ 
                        letterSpacing: '0.15em',
                        fontFamily: 'monospace'
                      }}>
                        {captchaCode}
                      </span>
                    </div>
                    {/* Refresh Icon Button */}
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="p-1 rounded bg-(--color-whiteSmoke) hover:bg-(--color-shell) transition-colors cursor-pointer"
                      title="Refresh code"
                    >
                      <HiRefresh className="w-3.5 h-3.5 text-preto" />
                    </button>
                  </div>
                  
                  {/* Input Field Inside Box */}
                  <div className="relative z-10">
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={(e) => handleCaptchaChange(e.target.value)}
                      onBlur={handleCaptchaBlur}
                      className={`w-full rounded-xl border px-3 py-1.5 text-sm text-preto placeholder:text-(--color-hina) focus:outline-none border-preto focus:border-preto ${
                        captchaError ? "border-(--color-error)" : ""
                      }`}
                      placeholder="Enter code"
                      maxLength={5}
                    />
                    {captchaError && (
                      <p className="mt-1 text-xs text-(--color-error)">{captchaError}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Error Message */}
            {submitMessage && submitMessage.type === 'error' && (
              <div className="p-4 rounded-lg bg-(--color-error)/10 border border-(--color-error)/30 text-(--color-error)">
                <p className="text-sm font-medium">{submitMessage.text}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto px-8 py-3 rounded-lg bg-[#222] text-white font-semibold tracking-wide shadow-lg shadow-black/10 ${
                isSubmitting 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'cursor-pointer hover:bg-(--color-emperor) transition-colors'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Register as vendor'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VendorPortal;


