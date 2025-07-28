import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useState } from "react";

// ✅ Correctly import all game images
import gtaSan from "@/images/gta-sanandreas-cover-art-definitive-edition-1920.jpg";
import scarface from "@/images/scarface.jpg";
import stickfight from "@/images/stickfight.jpg";
import geometrydash from "@/images/geometrydash.jpg";
import plantsvszombies from "@/images/PlantsvsZombiesCoverArt.jpg";
import limbo from "@/images/Limbo_Box_Art.jpg";
import godfather from "@/images/The_Godfather,_The_Game.jpg";
import teardown from "@/images/teardown.avif";
import amongus from "@/images/amongus.jpg";
import gettingOverIt from "@/images/getting-over-it-with-bennett-foddy-iphone-front-cover.jpg";
import minecraft from "@/images/minecraft.jpg";
import roblox from "@/images/roblox.jpg";

// ✅ Use imported images in your data
const gameData = {
  "1": {
    name: "Grand Theft Auto: San Andreas",
    description: "...",
    longDescription: "...",
    icon: gtaSan,
    downloadUrl: "..."
  },
  "2": {
    name: "Scarface: The World Is Yours",
    description: "...",
    longDescription: "...",
    icon: scarface,
    downloadUrl: "..."
  },
  "3": {
    name: "Stick Fight: The Game",
    description: "...",
    longDescription: "...",
    icon: stickfight,
    downloadUrl: "..."
  },
  "4": {
    name: "Geometry Dash",
    description: "...",
    longDescription: "...",
    icon: geometrydash,
    downloadUrl: "..."
  },
  "5": {
    name: "Plants vs Zombies",
    description: "...",
    longDescription: "...",
    icon: plantsvszombies,
    downloadUrl: "..."
  },
  "6": {
    name: "Limbo",
    description: "...",
    longDescription: "...",
    icon: limbo,
    downloadUrl: "..."
  },
  "7": {
    name: "The Godfather: The Game",
    description: "...",
    longDescription: "...",
    icon: godfather,
    downloadUrl: "..."
  },
  "8": {
    name: "Teardown",
    description: "...",
    longDescription: "...",
    icon: teardown,
    downloadUrl: "..."
  },
  "9": {
    name: "Among Us",
    description: "...",
    longDescription: "...",
    icon: amongus,
    downloadUrl: "..."
  },
  "10": {
    name: "Getting Over It",
    description: "...",
    longDescription: "...",
    icon: gettingOverIt,
    downloadUrl: "..."
  },
  "11": {
    name: "Minecraft",
    description: "...",
    longDescription: "...",
    icon: minecraft,
    downloadUrl: "..."
  },
  "12": {
    name: "Roblox",
    description: "...",
    longDescription: "...",
    icon: roblox,
    downloadUrl: "..."
  }
};

export const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const game = id ? gameData[id as keyof typeof gameData] : null;

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Game Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (!game?.downloadUrl || game.downloadUrl === "#") {
      alert("Download link not available.");
      return;
    }

    setIsDownloading(true);

    setTimeout(() => {
      setIsDownloading(false);
      const link = document.createElement("a");
      link.href = game.downloadUrl;
      link.setAttribute("download", "");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-32 w-96 h-2 bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-wave"></div>
        <div className="absolute top-52 w-80 h-1.5 bg-gradient-to-r from-transparent via-secondary/10 to-transparent animate-wave-2"></div>
        <div className="absolute bottom-32 w-72 h-1 bg-gradient-to-r from-transparent via-accent/8 to-transparent animate-wave-3"></div>
      </div>

      <div className="relative z-10 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 font-quicksand">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        <div className="animate-scale-in">
          <div className="text-center mb-8">
            <img src={game.icon} alt={game.name} className="w-64 h-64 object-cover rounded-3xl shadow-lg mx-auto" />
          </div>

          <article className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4 font-quicksand">{game.name}</h1>
              <p className="text-lg text-muted-foreground font-quicksand leading-relaxed">{game.description}</p>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-foreground font-quicksand leading-relaxed text-center">{game.longDescription}</p>
            </div>
          </article>

          <div className="text-center">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              size="lg"
              className={`font-quicksand font-semibold text-lg px-12 py-6 rounded-2xl
                bg-gradient-to-r from-primary to-primary/80 
                hover:from-primary/90 hover:to-primary/70
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-xl
                ${isDownloading ? "animate-pulse-gentle" : ""}`}
            >
              <Download className="w-5 h-5 mr-3" />
              {isDownloading ? "Preparing Download..." : "Download Game"}
            </Button>

            {isDownloading && (
              <p className="text-sm text-muted-foreground mt-4 font-quicksand">
                Your download will begin shortly...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
