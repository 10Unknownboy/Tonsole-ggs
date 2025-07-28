import { useState } from "react";
import { GameCard } from "@/components/GameCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const gamesData = [
  {
    id: "1",
    name: "Grand Theft Auto: San Andreas",
    description: "Dive into 90s gang wars, street racing, and crime-filled missions in this legendary open-world game.",
    icon: "\src\pages\images\gta-sanandreas-cover-art-definitive-edition-1920.jpg"
  },
  {
    id: "2",
    name: "Scarface: The World Is Yours",
    description: "Rebuild Tony Montana’s empire and take revenge in this gritty open-world action game.",
    icon: "\\src\\pages\\images\\scarface.jpg"
  },
  {
    id: "3",
    name: "Stick Fight: The Game",
    description: "Fight friends or foes in this fast-paced, physics-based stickman brawler with chaotic weapons.",
    icon: "\\src\\pages\\images\\stickfight.jpg"
  },
  {
    id: "4",
    name: "Geometry Dash",
    description: "A rhythm-based platformer packed with pulse-pounding music, intense levels, and perfect timing.",
    icon: "\\src\\pages\\images\\geometrydash.jpg"
  },
  {
    id: "5",
    name: "Plants vs. Zombies (Classic)",
    description: "Defend your home from hilarious zombie hordes with peashooters, wall-nuts, and more.",
    icon: "\\src\\pages\\images\\PlantsvsZombiesCoverArt.jpg"
  },
  {
    id: "6",
    name: "Limbo",
    description: "Explore a haunting world in this atmospheric puzzle-platformer filled with mystery and danger.",
    icon: "\\src\\pages\\images\\Limbo_Box_Art.jpg"
  },
  {
    id: "7",
    name: "The Godfather: The Game",
    description: "Step into 1940s New York’s criminal underworld and rise through the Corleone family ranks.",
    icon: "\\src\\pages\\images\\The_Godfather,_The_Game.jpg"
  },
  {
    id: "8",
    name: "Teardown",
    description: "Plan the perfect heist and destroy everything in your path in this physics-based sandbox.",
    icon: "\\src\\pages\\images\\teardown.avif"
  },
  {
    id: "9",
    name: "Among Us",
    description: "Unmask the impostor or sabotage the crew in this thrilling game of teamwork and betrayal.",
    icon: "\\src\\pages\\images\\amongus.jpg"
  },
  {
    id: "10",
    name: "Getting Over It with Bennett Foddy",
    description: "A punishing climbing game about frustration, perseverance, and a man in a pot with a hammer.",
    icon: "\\src\\pages\\images\\getting-over-it-with-bennett-foddy-iphone-front-cover.jpg"
  },
  {
    id: "11",
    name: "Minecraft",
    description: "Create, explore, and survive in a blocky, procedurally-generated world full of endless possibilities.",
    icon: "\\src\\pages\\images\\minecraft.jpg" // Suggest changing this, as original points to Among Us image
  },
  {
    id: "12",
    name: "Roblox",
    description: "Play and create millions of games in this vast multiplayer universe built by its users.",
    icon: "\\src\\pages\\images\\roblox.jpg" // Suggest changing this, as original points to Among Us image
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter games based on search query (titles first, then descriptions)
  const filteredGames = gamesData.filter(game => {
    const query = searchQuery.toLowerCase();
    return game.name.toLowerCase().includes(query) || 
           game.description.toLowerCase().includes(query);
  }).sort((a, b) => {
    // Prioritize title matches over description matches
    const query = searchQuery.toLowerCase();
    const aNameMatch = a.name.toLowerCase().includes(query);
    const bNameMatch = b.name.toLowerCase().includes(query);
    
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    return 0;
  });
  return (
    <div className="min-h-screen bg-background font-quicksand relative overflow-hidden">
      {/* Animated Background Waves */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 w-96 h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-wave"></div>
        <div className="absolute top-40 w-80 h-1.5 bg-gradient-to-r from-transparent via-secondary/15 to-transparent animate-wave-2"></div>
        <div className="absolute top-60 w-72 h-1 bg-gradient-to-r from-transparent via-accent/10 to-transparent animate-wave-3"></div>
        <div className="absolute bottom-40 w-96 h-2 bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-wave" style={{animationDelay: '10s'}}></div>
        <div className="absolute bottom-60 w-80 h-1.5 bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-wave-2" style={{animationDelay: '15s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4 animate-scale-in">
            Tonsole.GGs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Discover amazing games and download them instantly and Compleatly Free. Hover over cards to explore, click to learn more!
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur-sm border-border text-foreground placeholder:text-muted-foreground font-quicksand"
            />
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {filteredGames.map((game) => (
              <div key={game.id} className="animate-scale-in">
                <GameCard {...game} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-foreground mb-2 font-quicksand">
              No games found
            </h3>
            <p className="text-muted-foreground font-quicksand">
              Try searching for a different game title
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-muted/30 border-t border-border py-12 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 Tonsole GGs. Discover your next favorite game.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
