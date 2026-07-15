import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function AuthErrorPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams.error;

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#0a0b10] overflow-hidden text-white">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-md p-8 md:p-10 rounded-3xl border border-red-500/20 bg-white/[0.01] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-center">
        
        {/* Error Shield Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
          Access Denied
        </h1>

        <div className="p-4 mb-6 rounded-2xl bg-red-500/5 border border-red-500/10 text-neutral-300 text-sm leading-relaxed text-left">
          {error === "AccessDenied" ? (
            <p>
              Your account is not authorized to access this portal. This system is restricted exclusively to:
              <strong className="block text-center text-white mt-2 font-mono bg-white/5 p-2 rounded-lg border border-white/5">
                heshammourad@gmail.com
              </strong>
            </p>
          ) : (
            <p>
              An authentication error occurred. Please verify your connection and try logging in again.
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full text-center py-4 rounded-2xl font-semibold bg-white text-black hover:bg-neutral-100 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg"
          >
            Try Again
          </Link>
          
          <Link
            href="/spotify-tools"
            className="block w-full text-center py-4 rounded-2xl font-semibold border border-white/10 hover:bg-white/5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Go to Spotify Tools (Public)
          </Link>
        </div>
      </div>
    </div>
  );
}
