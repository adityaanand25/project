import { useState } from 'react';
import { UserPlus, Mail, User, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function RegistrationForm() {
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([{ email: formData.email, full_name: formData.fullName }]);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Registration successful! We\'ll be in touch soon.' });
      setFormData({ fullName: '', email: '' });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Register Your Interest
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Be the first to know when we launch
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register Now'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg flex items-start gap-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message.type === 'success' && <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
            <p className="text-sm">{message.text}</p>
          </div>
        )}
      </div>
    </section>
  );
}
