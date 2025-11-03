import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

const FounderProfileEditor = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
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

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { full_name: string; title: string; bio: string; photo_url?: string }) => {
      if (!profile) throw new Error("No profile found");
      
      const { error } = await supabase
        .from("founder_profile")
        .update(data)
        .eq("id", profile.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["founder-profile"] });
      toast.success("Profil mis à jour avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour du profil");
      console.error(error);
    },
  });

  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: Blob) => {
      const fileName = `founder-${Date.now()}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from("founder-photos")
        .upload(fileName, file, {
          contentType: "image/jpeg",
          upsert: true,
        });
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from("founder-photos")
        .getPublicUrl(fileName);
      
      return publicUrl;
    },
    onSuccess: (photoUrl) => {
      if (profile) {
        updateProfileMutation.mutate({
          full_name: profile.full_name,
          title: profile.title,
          bio: profile.bio || "",
          photo_url: photoUrl,
        });
      }
    },
    onError: (error) => {
      toast.error("Erreur lors de l'upload de la photo");
      console.error(error);
    },
  });

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      setStream(mediaStream);
      setIsCapturing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      toast.error("Impossible d'accéder à la caméra");
      console.error(error);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          uploadPhotoMutation.mutate(blob);
          stopCamera();
        }
      }, "image/jpeg", 0.9);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCapturing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPhotoMutation.mutate(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    updateProfileMutation.mutate({
      full_name: formData.get("full_name") as string,
      title: formData.get("title") as string,
      bio: formData.get("bio") as string,
      photo_url: profile?.photo_url,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Modifier le Profil du Fondateur</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Section */}
          <div className="space-y-4">
            <Label>Photo de profil</Label>
            
            <div className="flex justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20">
                {isCapturing ? (
                  <video 
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : profile?.photo_url ? (
                  <img 
                    src={profile.photo_url} 
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              {isCapturing ? (
                <>
                  <Button 
                    type="button"
                    onClick={capturePhoto}
                    disabled={uploadPhotoMutation.isPending}
                  >
                    {uploadPhotoMutation.isPending ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4 mr-2" />
                    )}
                    Capturer
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={stopCamera}
                  >
                    Annuler
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={startCamera}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Prendre une photo
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Nom complet</Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={profile?.full_name}
                required
              />
            </div>

            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                name="title"
                defaultValue={profile?.title}
                required
              />
            </div>

            <div>
              <Label htmlFor="bio">Biographie</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={profile?.bio || ""}
                rows={4}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mise à jour...
              </>
            ) : (
              "Enregistrer les modifications"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FounderProfileEditor;
