import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Mic, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis UniversIA, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const playAudioResponse = async (text: string) => {
    if (!audioEnabled) return;

    try {
      const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/text-to-speech`;
      
      const response = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          text,
          voice: "onyx"
        }),
      });

      if (!response.ok) {
        console.error('TTS error:', response.status);
        return;
      }

      const { audioContent } = await response.json();
      
      // Convert base64 to audio blob
      const binaryString = atob(audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const audioBlob = new Blob([bytes], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);

      // Stop any currently playing audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      // Play new audio
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      await audio.play();
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        currentAudioRef.current = null;
      };

    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Enregistrement en cours",
        description: "Parlez maintenant...",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'accéder au microphone.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      setIsLoading(true);
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const TRANSCRIBE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/transcribe-audio`;
        
        const response = await fetch(TRANSCRIBE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ audio: base64Audio }),
        });

        if (!response.ok) {
          throw new Error('Transcription failed');
        }

        const { text } = await response.json();
        
        if (text && text.trim()) {
          setInputValue(text);
          // Automatically send the transcribed message
          await handleSendMessage(text);
        }
      };
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast({
        title: "Erreur",
        description: "Impossible de transcrire l'audio.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          }))
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Trop de requêtes",
            description: "Veuillez réessayer dans quelques instants.",
            variant: "destructive",
          });
          return;
        }
        if (response.status === 402) {
          toast({
            title: "Service temporairement indisponible",
            description: "Veuillez contacter notre équipe au +221 77 123 45 67.",
            variant: "destructive",
          });
          return;
        }
        throw new Error("Erreur lors de la communication avec l'IA");
      }

      if (!response.body) {
        throw new Error("Pas de réponse du serveur");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let assistantMessageId = messages.length + 2;

      // Create initial assistant message
      const initialAssistantMessage: Message = {
        id: assistantMessageId,
        text: "",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, initialAssistantMessage]);

      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, text: assistantText }
                    : msg
                )
              );
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, text: assistantText }
                    : msg
                )
              );
            }
          } catch {}
        }
      }

      // Play audio response if enabled
      if (assistantText && audioEnabled) {
        await playAudioResponse(assistantText);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erreur",
        description: "Impossible de communiquer avec l'assistant. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-[9999]"
          size="icon"
          aria-label="Ouvrir l'assistant UniversIA"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-[9999] flex flex-col">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg flex flex-row items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <CardTitle className="text-lg">UniversIA</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              aria-label="Fermer l'assistant"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t space-y-2">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                  disabled={isLoading || isRecording}
                />
                <Button 
                  onClick={isRecording ? stopRecording : startRecording}
                  size="icon"
                  variant={isRecording ? "destructive" : "outline"}
                  disabled={isLoading}
                  aria-label={isRecording ? "Arrêter l'enregistrement" : "Enregistrer un message vocal"}
                >
                  <Mic className={`h-4 w-4 ${isRecording ? 'animate-pulse' : ''}`} />
                </Button>
                <Button 
                  onClick={() => handleSendMessage()} 
                  size="icon"
                  disabled={isLoading || !inputValue.trim() || isRecording}
                  aria-label="Envoyer le message"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="text-xs"
                >
                  {audioEnabled ? (
                    <>
                      <Volume2 className="h-3 w-3 mr-1" />
                      Audio activé
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-3 w-3 mr-1" />
                      Audio désactivé
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
