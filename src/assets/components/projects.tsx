export default function Projects() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center gap-16 py-20">

      <h1 className="text-4xl font-bold tracking-tight">
        Projekti
      </h1>

      <div className="flex justify-center">
        <div className="relative w-[360px] h-[740px] rounded-[48px] bg-black p-3 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">

          {/* Outer frame */}
          <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-black border border-neutral-800">

            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-20"></div>

            {/* Screen */}
            <iframe
              src="https://maca-miljenica-najamalatasplit.hr/"
              className="w-full h-full bg-white"
            />

          </div>
        </div>
      </div>

    </div>
  );
}