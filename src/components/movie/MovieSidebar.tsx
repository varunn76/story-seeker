import React from "react";

interface MovieSidebarProps {
  movie: any;
  providers: any;
}

export const MovieSidebar = ({ movie, providers }: MovieSidebarProps) => {
  return (
    <div className="lg:col-span-4 lg:pl-12">
      <div className="p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] space-y-12 h-fit text-center lg:text-left sticky top-32">
        <div className="space-y-2">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Architected By
          </h4>
          <p className="text-2xl font-black italic uppercase tracking-tighter text-white">
            {movie.director?.[0]?.name || "Visionary Director"}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Global Origin
          </h4>
          <p className="text-lg font-bold text-white/80">
            {movie.original_language.toUpperCase()} • Worldwide
            Release
          </p>
        </div>

        <div className="pt-8 space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-center lg:text-left">
            Watch Now
          </h4>

          {providers &&
          (providers.flatrate ||
            providers.rent ||
            providers.buy) ? (
            <div className="space-y-6">
              {providers.flatrate && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {providers.flatrate.map((provider: any) => (
                    <div
                      key={provider.provider_id}
                      className="group relative"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:scale-110 active:scale-95 transition-all shadow-xl hover:shadow-primary/20">
                        <img
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-[8px] font-black uppercase px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {provider.provider_name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {!providers.flatrate &&
                (providers.rent || providers.buy) && (
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest text-center lg:text-left">
                    Available for{" "}
                    {providers.rent ? "Rent" : "Buy Only"}
                  </div>
                )}
            </div>
          ) : (
            <div className="text-sm font-bold text-white/20 italic">
              Streaming data currently unavailable for your
              region.
            </div>
          )}

          <div className="pt-8 border-t border-white/5">
            <button className="w-full py-4 bg-white text-black font-black uppercase text-xs rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              Start Streaming
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
