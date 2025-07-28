import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useState } from "react";

// Mock game data - replace with your actual data
const gameData = {
  "1": {
    name: "Grand Theft Auto: San Andreas",
    description: "Grand Theft Auto: San Andreas is an open-world action-adventure game developed by Rockstar Games. Dive into 90s gang wars, street racing, and crime-filled missions across a massive, living world. One of the most iconic games of all time.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Step into the shoes of Carl Johnson as he returns to Los Santos, a city riddled with gang trouble, corruption, and drugs. Experience an expansive narrative, freedom of movement, vehicle customization, and countless side missions in this critically acclaimed open-world game.",
    icon: "\\src\\pages\\images\\gta-sanandreas-cover-art-definitive-edition-1920.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/rv8mgs6htzr7p0hbudumq/Grand-Theft-Auto-San-Andreas.zip?rlkey=xymad2jdrjxs4q5ahlsvtp496&st=kjgjrskn&dl=1"
  },
  "2": {
    name: "Scarface: The World Is Yours",
    description: "Scarface: The World Is Yours is a third-person action game that acts as a sequel to the iconic film. Take on the role of Tony Montana and rebuild your empire.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', After surviving the assault on his mansion, Tony Montana seeks revenge and works to reclaim his fallen empire. Engage in intense combat, manage drug operations, and expand your control over Miami in this gritty and violent open-world experience.",
    icon: "\\src\\pages\\images\\scarface.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/5ob2i5kt5l735anlxygoh/Scarface.zip?rlkey=zazceunlfajxoasp15ucgxj49&st=fpevslyx&dl=1"
  },
  "3": {
    name: "Stick Fight: The Game",
    description: "Stick Fight: The Game is a physics-based fighting game where players battle it out as iconic stick figures.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Fight it out against friends or strangers in various arenas filled with traps, weapons, and chaos. Fast-paced and hilarious, this game offers hours of fun through dynamic gameplay and unpredictable physics.",
    icon: "\\src\\pages\\images\\stickfight.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/jiwywhyvt2z28o6eiknyu/Stick-Fight-The-Game.zip?rlkey=aovpshrbslsvoojmhxt3n9in1&st=pavv61pt&dl=1"
  },
  "4": {
    name: "Geometry Dash",
    description: "Geometry Dash is a rhythm-based platformer with challenging levels and a catchy soundtrack.",
    longDescription: "Jump, fly, and flip your way through dangerous passages and spiky obstacles. With simple one-touch gameplay, it offers addictive challenges and a level editor for endless fun.",
    icon: "\\src\\pages\\images\\geometrydash.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/6yu61pm9uqkuwgh24s52n/Geometry.Dash.zip?rlkey=u33s7yyvhtbo1yaf9hsb52p82&st=a10h429g&dl=1"
  },
  "5": {
    name: "Plants vs Zombies",
    description: "Plants vs Zombies is a tower defense game where you use a variety of plants to stop an oncoming horde of zombies.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Strategically place your plants across the lawn to defend your home from waves of hilarious and unique zombies. Enjoy dozens of levels, each with increasing difficulty and fun surprises.",
    icon: "\\src\\pages\\images\\PlantsvsZombiesCoverArt.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/ow1p0jqy8f3ai1zgjfrsy/Plants-vs-Zombies.zip?rlkey=ywzhnqixhk2i1u9ujm6awkus8&st=hfgylwu6&dl=1"
  },
  "6": {
    name: "Limbo",
    description: "Limbo is a 2D puzzle-platformer known for its eerie black-and-white art style and emotional depth.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Play as a boy who enters a mysterious and dangerous world in search of his sister. Solve puzzles, avoid traps, and uncover secrets in this critically acclaimed indie classic.",
    icon: "public/image/Limbo_Box_Art.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/lmeaaz7vubs4agr4aq2hd/LIMBO.zip?rlkey=wuhmdavjpwpiv4yuj4ouy4ak6&st=429n4t0u&dl=1"
  },
  "7": {
    name: "The Godfather: The Game",
    description: "The Godfather: The Game is an action-adventure game based on the iconic movie franchise.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Rise through the ranks of the Corleone family in 1940s New York. Participate in extortion, drive-bys, and mob takeovers as you carve out your place in the criminal underworld.",
    icon: "\\src\\pages\\images\\The_Godfather,_The_Game.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/abh76cr0ohqjqnxnbzpnw/The-Godfather.zip?rlkey=i88yt4elqg6y63nhnuzvn6xvw&st=9eesnqg5&dl=1"
  },
  "8": {
    name: "Teardown",
    description: "Teardown is a physics-based sandbox game focused on destruction and heist planning.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Plan the perfect heist using creative solutions and total destruction. Use vehicles, explosives, and the environment to execute your missions in fully destructible voxel-based levels.",
    icon: "\\src\\pages\\images\\teardown.avif",
    downloadUrl: "https://drive.usercontent.google.com/download?id=1KKfQWxYypfJDqEzJ4TD8rpAmDOos5tb7&export=download&authuser=1&confirm=t&uuid=a2f98fd6-fa41-404f-a44f-7e784ba0b185&at=AN8xHoo_ub-jsw7wVLLcSejlC7gF%3A1753622536744"
  },
  "9": {
    name: "Among Us",
    description: "Among Us is a multiplayer social deduction game where crewmates work together to complete tasks while impostors try to sabotage them.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Use teamwork and communication to find the impostor before they eliminate everyone. Or, if you're the impostor, deceive your friends and cause chaos.",
    icon: "\\src\\pages\\images\\amongus.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/5kmwtnfkjwczvyzep37e4/Among.Us.zip?rlkey=d1torj9zn4e7k0bzi0e801k47&st=ysz0zh49&dl=1"
  },
  "10": {
    name: "Getting Over It",
    description: "Getting Over It with Bennett Foddy is a punishing climbing game featuring a man in a pot and a hammer.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Climb a surreal mountain filled with bizarre obstacles using only a hammer. It’s frustrating, hilarious, and incredibly rewarding if you persist.",
    icon: "\\src\\pages\\images\\getting-over-it-with-bennett-foddy-iphone-front-cover.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/lk36te7nsch8w3i556vga/Getting-Over-It.zip?rlkey=k1nik7gl369qa7oznfmn4cdu1&st=una7xcbc&dl=1"
  },
  "11": {
    name: "Minecraft",
    description: "Minecraft is a sandbox game that allows players to build and explore pixelated worlds made up of blocks.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Using Tlauncher, Play in Creative mode with unlimited resources or mine deep into the world in Survival mode. Build anything you can imagine and explore an endless world with updates and new features constantly added.",
    icon: "\\src\\pages\\images\\minecraft.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/7dq0q1sq8elotlm4vq5qf/Minecraft.zip?rlkey=gz2cpttnc2961gc9kj8ebdvxh&st=do7qrqkg&dl=1"
  },
  "12": {
    name: "Roblox",
    description: "Roblox is an online platform that lets users create and play games created by other users.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Join a vast community of developers and players. Experience countless virtual worlds, roleplays, and game genres made by creators from around the globe.",
    icon: "\\src\\pages\\images\\roblox.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/lnsi7ogfoqm3rx4qi4are/Roblox.zip?rlkey=omltw2nhppkbl746zfb1odi81&st=y1fo7wd9&dl=1"
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
      {/* Animated Background Waves */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-32 w-96 h-2 bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-wave"></div>
        <div className="absolute top-52 w-80 h-1.5 bg-gradient-to-r from-transparent via-secondary/10 to-transparent animate-wave-2"></div>
        <div className="absolute bottom-32 w-72 h-1 bg-gradient-to-r from-transparent via-accent/8 to-transparent animate-wave-3"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6 font-quicksand"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>

      {/* Game Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        <div className="animate-scale-in">
          {/* Game Icon */}
          <div className="text-center mb-8">
            <img 
              src={game.icon} 
              alt={game.name}
              className="w-64 h-64 object-cover rounded-3xl shadow-lg mx-auto"
            />
          </div>

          {/* Game Info */}
          <article className="bg-card rounded-2xl shadow-lg border border-border p-8 mb-8">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4 font-quicksand">
                {game.name}
              </h1>
              <p className="text-lg text-muted-foreground font-quicksand leading-relaxed">
                {game.description}
              </p>
            </header>

            <div className="prose prose-lg max-w-none">
              <p className="text-foreground font-quicksand leading-relaxed text-center">
                {game.longDescription}
              </p>
            </div>
          </article>

          {/* Download Section */}
          <div className="text-center">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              size="lg"
              className={`
                font-quicksand font-semibold text-lg px-12 py-6 rounded-2xl
                bg-gradient-to-r from-primary to-primary/80 
                hover:from-primary/90 hover:to-primary/70
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-xl
                ${isDownloading ? 'animate-pulse-gentle' : ''}
              `}
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
