import myPhoto from "../images/Ivica.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center bg-white">

      {/* Background panel */}
      <div
        className="absolute inset-0 h-screen bg-zinc-100 hidden md:block"
        style={{ clipPath: "polygon(0 0, 52% 0, 38% 100%, 0 100%)" }}
      />
      <div
        className="absolute inset-0 h-screen bg-zinc-100 block md:hidden"
        style={{ clipPath: "polygon(0 0, 75% 0, 12% 100%, 0 100%)" }}
      />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center">

        {/* Left — photo */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-8 md:px-12 pt-16 md:pt-0">
          <div className="w-48 h-48 md:w-96 md:h-96">
            <img
              src={myPhoto}
              alt="Ivica Silic"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Right — text */}
        <div className="w-full md:flex-1 px-8 md:px-12 py-12 md:py-16 text-center md:text-left">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase mb-4 text-gray-500">
             Hello there! I'm
          </p>
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 text-zinc-900">
            Ivica<br />
            <span className="text-gray-500">Silic</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 max-w-md mx-auto md:mx-0 leading-relaxed text-zinc-600">
            Junior web developer with a passion for learning and
            <span className="font-semibold text-zinc-900"> building things that work.</span>
          </p>
        </div>

      </div>
    </section>
  );
}