import { useState, useContext } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react'; // Make sure lucide-react is installed
import { useAuth } from '../components/Auth/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
 const { login, user } = useAuth();
 const navigate = useNavigate();
  // Form state
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     await login(form.email, form.password);
  //     // Redirect or other logic after login success
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        const loggedInUser = await login(form.email, form.password);
        if (loggedInUser?.role === 'admin') {
          navigate('/admin');
        } else if (loggedInUser?.role === 'user') {
          navigate('/home');
        } else {
          console.log('staff');
          
          navigate('/');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
      <div className="bg-neutral-900 rounded-2xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-yellow-300 mb-8 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-yellow-200 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-yellow-200 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </form>
      </div>
    </section>
  );
}
