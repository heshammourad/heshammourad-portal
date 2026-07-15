import { auth, signOut } from "@/auth";
import Link from "next/link";
import MonogramLogo from "@/components/MonogramLogo";

export default async function HomePage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const userEmail = session?.user?.email;
  const userName = session?.user?.name || "User";
  const userImage = session?.user?.image;

  return (
    <div className="relative min-h-screen flex flex-col bg-[#08090d] text-white overflow-hidden pb-12">
      {/* Background Glows */}
      <div className="absolute top-[-25%] right-[-10%] w-[70%] h-[70%] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 md:py-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <MonogramLogo size={40} showBg={true} />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Hesham Mourad</h1>
            <p className="text-xs text-neutral-400 font-medium">Workspace Portal</p>
          </div>
        </div>

        {/* Profile / Auth Button */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/5 py-1.5 pl-2.5 pr-4 rounded-full">
              {userImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userImage}
                  alt={userName}
                  className="w-7 h-7 rounded-full border border-white/10"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-violet-600/30 flex items-center justify-center border border-white/10 text-xs font-semibold text-violet-300">
                  {userName.charAt(0)}
                </div>
              )}
              <span className="hidden sm:inline text-sm font-semibold text-neutral-200">
                {userName}
              </span>
              <span className="h-4 w-px bg-white/10 hidden sm:inline" />
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="text-xs text-neutral-400 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-white text-black hover:bg-neutral-100 transition-colors shadow-lg shadow-white/5"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Main Dashboard Section */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-6 mt-12 md:mt-20">
        {/* Intro */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Central Routing System
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
            Developer Workspace
          </h2>
          <p className="mt-4 text-neutral-400 text-base md:text-lg leading-relaxed">
            Welcome, Hesham. This portal consolidates your isolated Vercel projects under a single domain. Access is restricted using secure Google OAuth.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Reading List (Protected) */}
          <Link
            href="/reading-list"
            className="group relative flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.02]"
          >
            {/* Absolute hovering glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-violet-600/0 to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div>
              {/* Badge & Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-violet-500/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-neutral-400 group-hover:text-violet-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                {isLoggedIn ? (
                  <span className="px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold">
                    Authorized
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-semibold">
                    Auth Required
                  </span>
                )}
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-bold group-hover:text-white transition-colors">
                Reading List
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Your private workspace for bookmarking, categorization, and tracking article queues. Secured behind OAuth check.
              </p>
            </div>

            {/* Action text */}
            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-neutral-300 group-hover:text-violet-400 transition-colors">
              Launch App
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>

          {/* Card 2: Spotify Tools (Public) */}
          <Link
            href="/spotify-tools"
            className="group relative flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/[0.02]"
          >
            {/* Absolute hovering glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-600/0 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div>
              {/* Badge & Icon */}
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-emerald-500/20 transition-colors">
                  <svg
                    className="w-6 h-6 text-neutral-400 group-hover:text-emerald-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>

                <span className="px-2.5 py-1 rounded-full border border-neutral-500/20 bg-neutral-500/5 text-neutral-300 text-xs font-semibold">
                  Public Access
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-2xl font-bold group-hover:text-white transition-colors">
                Spotify Tools
              </h3>
              <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
                Playlists helper, ELO matching, and analytics toolkit. Accessible directly without active portal logins.
              </p>
            </div>

            {/* Action text */}
            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-neutral-300 group-hover:text-emerald-400 transition-colors">
              Launch App
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Admin Details footer in case logged in */}
        {isLoggedIn && (
          <div className="mt-12 p-4 rounded-2xl bg-white/[0.01] border border-white/5 text-center text-xs text-neutral-500 font-medium">
            Session validated for <span className="text-neutral-400 font-semibold">{userEmail}</span>. All proxy paths fully unlocked.
          </div>
        )}
      </main>
    </div>
  );
}
