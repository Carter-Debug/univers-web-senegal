import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from "lucide-react";

const FounderProfile = () => {
  const { data: profile } = useQuery({
    queryKey: ["founder-profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("founder_profile")
        .select("*")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (!profile) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Le Fondateur</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Qui suis-je ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center animate-slide-up">
            {/* Photo */}
            <div className="md:col-span-1 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-[var(--shadow-hover)]">
                  {profile.photo_url ? (
                    <img 
                      src={profile.photo_url} 
                      alt={profile.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <User className="w-24 h-24 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 space-y-6 text-center md:text-left">
              <div className="space-y-3">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  {profile.full_name}
                </h3>
                <p className="text-xl text-primary font-semibold">
                  {profile.title}
                </p>
              </div>
              
              {profile.bio && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderProfile;
