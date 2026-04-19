import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network request
    console.log(data);
    reset();
    alert('Message sent successfully!');
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-surface p-8 rounded-2xl shadow-sm border border-transparent hover:border-accent/20 transition-colors duration-300"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 font-display tracking-tight text-text text-center">Let's Work Together</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-dim mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200 bg-bg border-gray-200 focus:border-transparent ${
                  errors.name ? 'border-red-300 focus:ring-red-200' : ''
                } min-h-[44px]`}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-dim mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200 bg-bg border-gray-200 focus:border-transparent ${
                  errors.email ? 'border-red-300 focus:ring-red-200' : ''
                } min-h-[44px]`}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-dim mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register('message')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200 bg-bg border-gray-200 focus:border-transparent resize-none ${
                  errors.message ? 'border-red-300 focus:ring-red-200' : ''
                } min-h-[44px]`}
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              className="w-full bg-accent text-white py-4 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-out-quart focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[44px]"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
---