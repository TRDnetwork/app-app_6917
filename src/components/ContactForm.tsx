import React, { useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// PERF: Lazy load form dependencies — they're not needed on initial render
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  company: z.string().optional().refine(val => !val, {
    message: 'Spam detected',
  }),
});

type FormInputs = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setSubmitStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.errors?.message || 'Something went wrong');
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <section className="container mx-auto px-6 py-16 max-w-2xl animate-slide-up">
      <h2 className="text-2xl font-bold text-text mb-8 font-display">Get In Touch</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field (hidden) */}
        <input
          {...register('company')}
          type="text"
          className="hidden"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
        />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-dim mb-1">
            Name
          </label>
          <input
            id="name"
            {...register('name')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            }`}
            disabled={submitStatus === 'submitting'}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-dim mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
            disabled={submitStatus === 'submitting'}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-dim mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent focus:outline-none transition ${
              errors.message ? 'border-red-500' : 'border-gray-200'
            }`}
            disabled={submitStatus === 'submitting'}
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitStatus === 'submitting'}
          className="w-full bg-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>

        {submitStatus === 'success' && (
          <p className="text-green-600 font-medium">Thank you! Your message has been sent.</p>
        )}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </form>
    </section>
  );
};

export default ContactForm;
---