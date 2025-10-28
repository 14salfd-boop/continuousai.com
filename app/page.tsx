export default function Home() {
  return (
    <div className="bg-[#212121] min-h-screen px-20 py-10">
      <div className="max-w-[1512px] mx-auto">
        <p className="font-['Molengo',sans-serif] text-[36px] text-white mb-4 leading-normal">
          Continuous AI
        </p>

        <p className="font-['Molengo',sans-serif] text-[18px] text-white mb-8 leading-normal max-w-[1393px]">
          <span>As AI capabilities </span>
          <span className="animated-underline">grow exponentially</span>
          <span>, we&apos;re shifting from just-in-time prompting to spec-driven development. The role of AI isn&apos;t to replace developers—it&apos;s to separate essential complexity from accidental complexity.</span>
        </p>

        <div className="space-y-6">
          {/* Build for 10x scale */}
          <div className="flex gap-6 items-start">
            <div className="w-[100px] h-[100px] flex-shrink-0">
              <img alt="Build for 10x scale icon" className="w-full h-full object-contain" src="/icon1.svg" />
            </div>
            <div className="font-['Molengo',sans-serif] text-[18px] text-white leading-normal flex-1">
              <p className="mb-2"><span className="animated-underline">Build for 10x scale</span></p>
              <p>Invest in your platform team and infrastructure as if your company is already 10x larger. The same software development best practices apply, but their effects are amplified with AI.</p>
            </div>
          </div>

          {/* Measure everything */}
          <div className="flex gap-6 items-start">
            <div className="w-[100px] h-[100px] flex-shrink-0">
              <img alt="Measure everything icon" className="w-full h-full object-contain" src="/icon2.svg" />
            </div>
            <div className="font-['Molengo',sans-serif] text-[18px] text-white leading-normal flex-1">
              <p className="mb-2"><span className="animated-underline">Measure everything</span></p>
              <p>You can&apos;t automate what you don&apos;t understand. You can&apos;t improve what you don&apos;t measure. Use DORA metrics and intervention rates to optimize your system.</p>
            </div>
          </div>

          {/* Shift left, systematically */}
          <div className="flex gap-6 items-start">
            <div className="w-[100px] h-[100px] flex-shrink-0">
              <img alt="Shift left systematically icon" className="w-full h-full object-contain" src="/icon3.svg" />
            </div>
            <div className="font-['Molengo',sans-serif] text-[18px] text-white leading-normal flex-1">
              <p className="mb-2"><span className="animated-underline">Shift left, systematically</span></p>
              <p>Human review → Agent review → Generation rules. Each shift reduces intervention rates—the new build times.</p>
            </div>
          </div>
        </div>

        <p className="font-['Molengo',sans-serif] text-[18px] text-white mt-8 leading-normal max-w-[1393px]">
          Continuous AI will seem optional until it becomes essential. Success comes from systematically reducing workflow friction, not fancy frameworks. It&apos;s not a project—it&apos;s a capability that forms the foundation for the next decade of software development.
        </p>
      </div>
    </div>
  );
}
