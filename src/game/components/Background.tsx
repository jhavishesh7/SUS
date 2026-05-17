export function NeonBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-neon-magenta/40 blur-3xl animate-float-blob" />
      <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-neon-cyan/30 blur-3xl animate-float-blob" style={{ animationDelay: "3s" }} />
      <div className="absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-neon-violet/40 blur-3xl animate-float-blob" style={{ animationDelay: "6s" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,oklch(0.08_0.03_280/0.6)_100%)]" />
    </div>
  );
}
