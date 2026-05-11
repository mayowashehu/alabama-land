import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import apiClient from '../../services/api';
import { isAdminDemoMode } from '../../config/demoMode';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  'w-full bg-[#0c1610] border border-white/[0.08] px-4 py-3 font-sans text-sm text-[#f5f0e8]/80 placeholder-[#f5f0e8]/20 tracking-wide focus:outline-none focus:border-[#b8975a]/50 transition-colors';

const errorClass = 'mt-1.5 font-sans text-[11px] text-red-400/80';

export function Login(): JSX.Element {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    try {
      const { data } = await apiClient.post<{
        success: boolean;
        token: string;
        user: { name: string; email: string; role: string };
      }>('/api/v1/auth/login', values);

      if (!data.success || !data.token) {
        toast.error('Login failed. Please try again.');
        return;
      }

      login(data.token);
      toast.success('Welcome back');
      navigate('/admin/listings');
    } catch (e) {
      const message =
        typeof e === 'object' && e !== null && 'response' in e
          ? String((e as { response?: { data?: { message?: unknown } } }).response?.data?.message ?? '')
          : '';
      toast.error(message || 'Wrong email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1610] flex items-center justify-center px-6">

      {/* Ghost bg mark */}
      <span
        className="fixed select-none pointer-events-none font-cormorant font-medium text-[clamp(120px,20vw,220px)] leading-none text-[#f5f0e8]/[0.025] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        AO
      </span>

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <span className="font-cormorant text-3xl font-medium leading-none text-[#f5f0e8] tracking-wide mb-1">
            AO
          </span>
          <span className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-[#b8975a]">
            Alabama Onas
          </span>
          <span className="font-sans text-[9px] font-light tracking-[0.12em] text-[#f5f0e8]/20 mt-0.5">
            Admin Panel
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-5 h-px bg-[#b8975a]" />
            <span className="font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-[#b8975a]">
              Secure access
            </span>
          </div>
          <h1 className="font-cormorant text-[clamp(24px,3vw,32px)] font-medium text-[#f5f0e8]">
            Admin Login
          </h1>
        </div>

        {/* Demo banner */}
        {isAdminDemoMode && (
          <div className="mb-6 border-l-2 border-[#d4b87a]/40 pl-4 py-1">
            <p className="font-sans text-[11px] text-[#d4b87a]/70 leading-relaxed">
              Demo mode is enabled. Backend is bypassed for quick admin preview.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="block font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#b8975a]/60 mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className={inputClass}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email?.message && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-[#b8975a]/60 mb-2">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              className={inputClass}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password?.message && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-sans text-[12px] font-medium tracking-widest uppercase py-4 bg-[#b8975a] text-[#0f1810] transition-all duration-200 hover:bg-[#d4b87a] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>

          {isAdminDemoMode && (
            <button
              type="button"
              onClick={() => {
                login('demo-token');
                navigate('/admin/dashboard');
              }}
              className="w-full font-sans text-[12px] font-medium tracking-widest uppercase py-4 border border-[#b8975a]/30 text-[#b8975a]/70 transition-all duration-200 hover:border-[#b8975a]/60 hover:text-[#b8975a]"
            >
              Enter Demo Admin
            </button>
          )}
        </form>

        <p className="font-sans text-[11px] font-light text-[#f5f0e8]/20 text-center mt-8">
          For admin access, contact Mrs. Alaba Afusat on WhatsApp
        </p>
      </div>
    </div>
  );
}