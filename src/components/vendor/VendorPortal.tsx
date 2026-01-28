/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useCallback } from "react";
import { HiRefresh } from "react-icons/hi";
import Toast from "@/components/profile/Toast";
import { useMutation } from "@tanstack/react-query";
import { registerVendorQn, type VendorRegistrationData } from "@/queries/vendor";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

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
  const [showToast, setShowToast] = useState(false);

  // TanStack Query mutation for vendor registration
  const registrationMutation = useMutation({
    mutationFn: registerVendorQn,
    retry: 1,
  });

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

  // Handle successful registration
  useEffect(() => {
    if (registrationMutation.isSuccess) {
      // Show toast message
      setShowToast(true);
      
      // Reset form
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPhone("");
      setOrganizationalName("");
      setCaptchaInput("");
      generateCaptcha();
    }
  }, [registrationMutation.isSuccess, generateCaptcha]);

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;
    
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
      // Prepare request body - same structure as before
      const requestBody = {
        name: registerName.trim(),
        email: registerEmail.trim(),
        phone: registerPhone.trim(),
        organizationName: organizationalName.trim() || undefined
      };
      
      // Use TanStack Query mutation - API endpoint remains the same
      registrationMutation.mutate(requestBody);
    }
  };

  return (
    <section className=" text-preto" style={{ fontFamily: 'var(--fontNormal)' }}>
      <div className="container mx-auto px-6 lg:px-12 xl:px-[48px] py-16 space-y-12 max-w-[1440px]">
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
              <Input
                name="registerName"
                label="Name"
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
                error={registerNameError}
                placeholder="Enter your name"
                inputClassName="rounded-xl"
              />
              <Input
                name="registerEmail"
                label="Email Address"
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
                error={registerEmailError}
                placeholder="name@vendor.com"
                inputClassName="rounded-xl"
              />
              <Input
                name="registerPhone"
                label="Phone Number"
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
                error={registerPhoneError}
                placeholder="+91 234 567 8900"
                inputClassName="rounded-xl"
              />
              <Input
                name="organizationalName"
                label={
                  <>
                    Organizational name <span className="text-(--color-hina)">(optional)</span>
                  </>
                }
                type="text"
                value={organizationalName}
                onChange={(e) => setOrganizationalName(e.target.value)}
                placeholder="Enter organizational name"
                inputClassName="rounded-xl"
              />
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
                    <Button
                      type="button"
                      onClick={generateCaptcha}
                      variant="ghost"
                      size="small"
                      className="p-1 rounded bg-(--color-whiteSmoke) hover:bg-(--color-shell)"
                      title="Refresh code"
                    >
                      <HiRefresh className="w-3.5 h-3.5 text-preto" />
                    </Button>
                  </div>
                  
                  {/* Input Field Inside Box */}
                  <div className="relative z-10">
                    <Input
                      name="captchaInput"
                      type="text"
                      value={captchaInput}
                      onChange={(e) => handleCaptchaChange(e.target.value)}
                      onBlur={handleCaptchaBlur}
                      error={captchaError}
                      placeholder="Enter code"
                      maxLength={5}
                      size="small"
                      inputClassName="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Error Message */}
            {registrationMutation.isError && registrationMutation.error && (
              <div className="p-4 rounded-lg bg-(--color-error)/10 border border-(--color-error)/30 text-(--color-error)">
                <p className="text-sm font-medium">{registrationMutation.error.message}</p>
              </div>
            )}
            
            <Button
              type="submit"
              disabled={registrationMutation.isPending}
              loading={registrationMutation.isPending}
              variant="primary"
              className="w-full md:w-auto px-8 py-3 rounded-lg shadow-lg shadow-black/10 hover:bg-(--color-emperor)"
            >
              {registrationMutation.isPending ? 'Submitting...' : 'Register as vendor'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default VendorPortal;


