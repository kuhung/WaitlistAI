import WaitlistApp from "@/components/WaitlistApp";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505]">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[128px] animate-float-delayed" />
        <div className="absolute top-[60%] left-[60%] w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <WaitlistApp />
      </div>
    </div>
  );
}
