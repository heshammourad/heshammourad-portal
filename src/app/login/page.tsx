import { signIn } from "@/auth";
import Link from "next/link";
import MonogramLogo from "@/components/MonogramLogo";

interface PageProps {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams.callbackUrl || "/";
  const error = resolvedSearchParams.error;

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#0a0b10] overflow-hidden text-white">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300 hover:border-white/20">
        
        {/* Portal Logo/Name */}
        <div className="flex flex-col items-center mb-8 text-center">
          <MonogramLogo size={64} showBg={true} className="mb-4 shadow-lg shadow-violet-500/10" />
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
            Hesham Mourad
          </h1>
          <p className="text-sm mt-2 text-neutral-400 font-medium">
            Personal Dashboard & Project Portal
          </p>
        </div>

        {/* Error Message if redirecting with failure */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm text-center">
            {error === "Configuration"
              ? "OAuth configuration error. Verify environment variables."
              : "Authentication failed. Please try again."}
          </div>
        )}

        {/* OAuth Action Form */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: callbackUrl });
          }}
          className="space-y-4"
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl font-semibold bg-white text-black hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200 shadow-xl cursor-pointer group"
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.56h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.48C21.68,12.02 21.56,11.53 21.35,11.1z" fill="#4285F4" />
                <path d="M12,20.68c2.61,0 4.81,-0.87 6.41,-2.36l-3.3,-2.56c-0.91,0.61 -2.08,0.98 -3.11,0.98 -2.39,0 -4.42,-1.62 -5.14,-3.8H3.45v2.64c1.6,3.19 4.91,5.29 8.55,5.29z" fill="#34A853" />
                <path d="M6.86,13.14c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7s0.1,-1.16 0.28,-1.7V7.1H3.45c-0.6,1.2 -0.95,2.56 -0.95,4.0s0.35,2.8 0.95,4.0l3.41,-2.66z" fill="#FBBC05" />
                <path d="M12,6.12c1.42,0 2.7,0.49 3.7,1.44l2.78,-2.78C16.8,3.22 14.61,2.32 12,2.32c-3.64,0 -6.95,2.1 -8.55,5.29L6.86,10.27c0.72,-2.18 2.75,-3.8 5.14,-3.8z" fill="#EA4335" />
              </g>
            </svg>
            Sign in with Google
          </button>
        </form>

        {/* Restriction Info */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-neutral-500 font-medium">
            Restricted Access: Authorized administrator account only.
          </p>
          <p className="text-xs text-neutral-400 mt-1 font-semibold">
            heshammourad@gmail.com
          </p>
        </div>

        {/* Public Access Link */}
        <div className="mt-4 text-center">
          <Link
            href="/spotify-tools"
            className="text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors underline underline-offset-4"
          >
            Looking for Spotify Tools? (Skip Login)
          </Link>
        </div>
      </div>
    </div>
  );
}
