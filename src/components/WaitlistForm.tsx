import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Copy } from 'phosphor-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sanitizeInput, validateEmail, validateTextLength, validateName } from '@/utils/validation';
import { getReferralLink, getAppConfig } from '@/utils/config';
import BetaReservationOffer from './BetaReservationOffer';

interface FormData {
  problem: string;
  feature: string;
  goals: string;
  pricing: string;
  firstName: string;
  lastName: string;
  email: string;
}

const WaitlistForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBetaOffer, setShowBetaOffer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const { toast } = useToast();
  const config = getAppConfig();
  
  const [formData, setFormData] = useState<FormData>({
    problem: '',
    feature: '',
    goals: '',
    pricing: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const steps = [
    'intro', 'problem', 'feature', 'goals', 'pricing', 'contact'
  ];

  const featureOptions = [
    'Instant, personalized plan creation',
    'Client food swaps with auto-adjusting portions',
    'Live daily meal visibility',
    'Real-time compliance tracking',
    'Centralized coaching dashboard',
    'Something else'
  ];

  const validateCurrentStep = (): boolean => {
    const errors: Partial<FormData> = {};
    let isValid = true;

    switch (steps[currentStep]) {
      case 'problem':
        if (!formData.problem.trim()) {
          errors.problem = 'Please describe your biggest challenge';
          isValid = false;
        } else if (!validateTextLength(formData.problem, config.maxTextLength)) {
          errors.problem = `Please keep your response under ${config.maxTextLength} characters`;
          isValid = false;
        }
        break;
        
      case 'feature':
        if (!formData.feature.trim()) {
          errors.feature = 'Please select a feature';
          isValid = false;
        }
        break;
        
      case 'goals':
        if (!formData.goals.trim()) {
          errors.goals = 'Please share your goals';
          isValid = false;
        } else if (!validateTextLength(formData.goals, config.maxTextLength)) {
          errors.goals = `Please keep your response under ${config.maxTextLength} characters`;
          isValid = false;
        }
        break;
        
      case 'pricing':
        if (!formData.pricing.trim()) {
          errors.pricing = 'Please enter your expected pricing';
          isValid = false;
        }
        break;
        
      case 'contact':
        if (!validateName(formData.firstName)) {
          errors.firstName = 'Please enter a valid first name';
          isValid = false;
        }
        if (!validateName(formData.lastName)) {
          errors.lastName = 'Please enter a valid last name';
          isValid = false;
        }
        if (!validateEmail(formData.email)) {
          errors.email = 'Please enter a valid email address';
          isValid = false;
        }
        break;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Sanitize all text inputs before submission
      const sanitizedData = {
        problem: sanitizeInput(formData.problem),
        feature: sanitizeInput(formData.feature),
        goals: sanitizeInput(formData.goals),
        pricing: sanitizeInput(formData.pricing),
        first_name: sanitizeInput(formData.firstName),
        last_name: sanitizeInput(formData.lastName),
        email: formData.email.toLowerCase().trim(), // Email doesn't need HTML sanitization
        referral_code: generateReferralCode()
      };

      const { data, error } = await supabase
        .from('waitlist_submissions')
        .insert(sanitizedData)
        .select('id')
        .single();

      if (error) {
        console.error('Submission error:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive"
        });
      } else {
        setSubmissionId(data.id);
        setIsSubmitted(true);
        // Show beta offer after successful submission
        setTimeout(() => {
          setShowBetaOffer(true);
        }, 2000);
        toast({
          title: "Successfully Joined!",
          description: "You've been added to the waitlist. Check your email for confirmation.",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateReferralCode = () => {
    const sanitizedFirstName = sanitizeInput(formData.firstName).toLowerCase();
    return `${sanitizedFirstName}-${Date.now().toString(36)}`;
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setValidationErrors({}); // Clear validation errors when going back
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const copyReferralLink = async () => {
    const referralCode = generateReferralCode();
    const referralLink = getReferralLink(referralCode);
    
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link Copied!",
        description: "Your referral link has been copied to clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast({
        title: "Copy Failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive"
      });
    }
  };

  const isStepValid = () => {
    switch (steps[currentStep]) {
      case 'intro':
        return true;
      case 'problem':
        return formData.problem.trim().length > 0 && 
               validateTextLength(formData.problem, config.maxTextLength);
      case 'feature':
        return formData.feature.trim().length > 0;
      case 'goals':
        return formData.goals.trim().length > 0 && 
               validateTextLength(formData.goals, config.maxTextLength);
      case 'pricing':
        return formData.pricing.trim().length > 0;
      case 'contact':
        return validateName(formData.firstName) && 
               validateName(formData.lastName) && 
               validateEmail(formData.email);
      default:
        return false;
    }
  };

  if (showBetaOffer) {
    return (
      <section id="waitlist-form" className="py-20 bg-white">
        <div className="container-width section-padding">
          <BetaReservationOffer 
            submissionId={submissionId || undefined}
            userEmail={formData.email}
          />
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section id="waitlist-form" className="py-20 bg-white">
        <div className="container-width section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} weight="fill" className="text-white" />
              </div>
              
              <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
                You Are On The Early Access List
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Thanks for sharing your goals and insights. This helps us make NutriSteward even more 
                powerful for coaches like you. We will email you as soon as your invite is ready.
              </p>
              
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Bonus:</strong> Want to move to the front of the line? Share this link with other coaches. 
                  Every referral moves you up in priority.
                </p>
                
                <button 
                  onClick={copyReferralLink}
                  className="neumorphic-btn inline-flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy Your Unique Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'intro':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
              You Are Almost On The List
            </h2>
            <p className="text-gray-600 mb-8">
              Answer 5 quick questions. Takes less than 60 seconds so we can tailor NutriSteward to your needs.
            </p>
            <button 
              onClick={handleNext} 
              className="neumorphic-btn inline-flex items-center gap-2"
            >
              Let's Go <ArrowRight size={16} />
            </button>
          </div>
        );

      case 'problem':
        return (
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              If you could completely remove one key problem from your nutrition coaching, what would it be?
            </h3>
            <textarea
              value={formData.problem}
              onChange={(e) => updateFormData('problem', e.target.value)}
              className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                validationErrors.problem ? 'border-red-500' : 'border-gray-200'
              }`}
              rows={4}
              placeholder="Describe your biggest challenge..."
              maxLength={config.maxTextLength}
            />
            {validationErrors.problem && (
              <p className="text-red-500 text-sm mt-2">{validationErrors.problem}</p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              {formData.problem.length}/{config.maxTextLength} characters
            </p>
          </div>
        );

      case 'feature':
        return (
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Which NutriSteward feature are you most excited about?
            </h3>
            <div className="space-y-3">
              {featureOptions.map((option, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="feature"
                    value={option}
                    checked={formData.feature === option}
                    onChange={(e) => updateFormData('feature', e.target.value)}
                    className="text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
              {formData.feature === 'Something else' && (
                <input
                  type="text"
                  placeholder="Please specify..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mt-3"
                  onChange={(e) => updateFormData('feature', `Something else: ${e.target.value}`)}
                  maxLength={200}
                />
              )}
            </div>
            {validationErrors.feature && (
              <p className="text-red-500 text-sm mt-2">{validationErrors.feature}</p>
            )}
          </div>
        );

      case 'goals':
        return (
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              What are you hoping to achieve with NutriSteward?
            </h3>
            <textarea
              value={formData.goals}
              onChange={(e) => updateFormData('goals', e.target.value)}
              className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                validationErrors.goals ? 'border-red-500' : 'border-gray-200'
              }`}
              rows={4}
              placeholder="Share your goals and expectations..."
              maxLength={config.maxTextLength}
            />
            {validationErrors.goals && (
              <p className="text-red-500 text-sm mt-2">{validationErrors.goals}</p>
            )}
            <p className="text-gray-500 text-sm mt-2">
              {formData.goals.length}/{config.maxTextLength} characters
            </p>
          </div>
        );

      case 'pricing':
        return (
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              What would you honestly expect to pay monthly for NutriSteward?
            </h3>
            <input
              type="text"
              value={formData.pricing}
              onChange={(e) => updateFormData('pricing', e.target.value)}
              className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                validationErrors.pricing ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="$X per month"
              maxLength={50}
            />
            {validationErrors.pricing && (
              <p className="text-red-500 text-sm mt-2">{validationErrors.pricing}</p>
            )}
          </div>
        );

      case 'contact':
        return (
          <div>
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Almost done! Just need your contact information.
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.firstName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="First Name"
                  maxLength={config.maxNameLength}
                  required
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    validationErrors.lastName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Last Name"
                  maxLength={config.maxNameLength}
                  required
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  validationErrors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Email Address"
                maxLength={254}
                required
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="waitlist-form" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="container-width section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</span>
                <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {renderStep()}

            {/* Navigation Buttons */}
            {currentStep > 0 && (
              <div className="flex justify-between items-center mt-8">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button 
                  onClick={handleNext}
                  disabled={!isStepValid() || isSubmitting}
                  className="neumorphic-btn inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : (currentStep === steps.length - 1 ? 'Submit' : 'Continue')}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
