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
    icon: "/images/gta-sanandreas-cover-art-definitive-edition-1920.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/htel2l81rn05ew73aw7tk/gta.exe?rlkey=mzhfuqdaenqc9v1bid753vy45&st=854xvg4i&dl=1"
  },
  "2": {
    name: "Scarface: The World Is Yours",
    description: "Scarface: The World Is Yours is a third-person action game that acts as a sequel to the iconic film. Take on the role of Tony Montana and rebuild your empire.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', After surviving the assault on his mansion, Tony Montana seeks revenge and works to reclaim his fallen empire. Engage in intense combat, manage drug operations, and expand your control over Miami in this gritty and violent open-world experience.",
    icon: "/images/scarface.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/uv78mkpxu2uwpvmox1ejp/scarface.exe?rlkey=4gj93sykgmhcu7ce1ejctxnpy&st=qtg5xsj4&dl=1"
  },
  "3": {
    name: "Stick Fight: The Game",
    description: "Stick Fight: The Game is a physics-based fighting game where players battle it out as iconic stick figures.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Fight it out against friends or strangers in various arenas filled with traps, weapons, and chaos. Fast-paced and hilarious, this game offers hours of fun through dynamic gameplay and unpredictable physics.",
    icon: "/images/stickfight.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/hvbmmt34gvupq4txu4t05/stick.exe?rlkey=yfzfami1m315ng4o8o0ujoe9r&st=r9mrx9qd&dl=1"
  },
  "4": {
    name: "Geometry Dash",
    description: "Geometry Dash is a rhythm-based platformer with challenging levels and a catchy soundtrack.",
    longDescription: "Jump, fly, and flip your way through dangerous passages and spiky obstacles. With simple one-touch gameplay, it offers addictive challenges and a level editor for endless fun.",
    icon: "/images/geometrydash.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/wck9s9cw1hashoub8w2d3/geometry.exe?rlkey=5rks0gd5m6hxjiixx22l9r9mh&st=7mpzlfd6&dl=1"
  },
  "5": {
    name: "Plants vs Zombies",
    description: "Plants vs Zombies is a tower defense game where you use a variety of plants to stop an oncoming horde of zombies.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Strategically place your plants across the lawn to defend your home from waves of hilarious and unique zombies. Enjoy dozens of levels, each with increasing difficulty and fun surprises.",
    icon: "/images/PlantsvsZombiesCoverArt.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/lvpyf2rcj0c8wvihvxcb3/plantvszombie.exe?rlkey=sz656vyf2l7iqnb5r310xtcl6&st=6jhmxh66&dl=1"
  },
  "6": {
    name: "Limbo",
    description: "Limbo is a 2D puzzle-platformer known for its eerie black-and-white art style and emotional depth.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Play as a boy who enters a mysterious and dangerous world in search of his sister. Solve puzzles, avoid traps, and uncover secrets in this critically acclaimed indie classic.",
    icon: "/images/Limbo_Box_Art.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/agli1ryozge98noe1hk4n/LIMBO.exe?rlkey=i4dnd58afy12ni5zochcjmjhe&st=ag4hlmvh&dl=1"
  },
  "7": {
    name: "The Godfather: The Game",
    description: "The Godfather: The Game is an action-adventure game based on the iconic movie franchise.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Rise through the ranks of the Corleone family in 1940s New York. Participate in extortion, drive-bys, and mob takeovers as you carve out your place in the criminal underworld.",
    icon: "/images/The_Godfather,_The_Game.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/js7flhgdk2825r1jy78vs/god.exe?rlkey=tzjzzrvnd3ef93bqmm0m1cpa3&st=8ap2tqnc&dl=1"
  },
  "8": {
    name: "Teardown",
    description: "Teardown is a physics-based sandbox game focused on destruction and heist planning.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Plan the perfect heist using creative solutions and total destruction. Use vehicles, explosives, and the environment to execute your missions in fully destructible voxel-based levels.",
    icon: "/images/teardown.avif",
    downloadUrl: "https://www.dropbox.com/scl/fi/1nlmqrz2jp4oeoizz4ln7/teardown.exe?rlkey=08w76pulzc5mdraj920o0q978&st=up7esdcf&dl=1"
  },
  "9": {
    name: "Among Us",
    description: "Among Us is a multiplayer social deduction game where crewmates work together to complete tasks while impostors try to sabotage them.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Use teamwork and communication to find the impostor before they eliminate everyone. Or, if you're the impostor, deceive your friends and cause chaos.",
    icon: "/images/amongus.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/5r988wudmhst1gxuhdxak/amongus.exe?rlkey=2msg3e6ah8sneoth6qvzk0lre&st=xg8z0o9t&dl=1"
  },
  "10": {
    name: "Getting Over It",
    description: "Getting Over It with Bennett Foddy is a punishing climbing game featuring a man in a pot and a hammer.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Climb a surreal mountain filled with bizarre obstacles using only a hammer. It’s frustrating, hilarious, and incredibly rewarding if you persist.",
    icon: "/images/getting-over-it-with-bennett-foddy-iphone-front-cover.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/7ci529px6yce1oxfxsveo/gettingoverit.exe?rlkey=qszksbnmzwkp3dp1wt2q9eh7f&st=ld6uykqr&dl=1"
  },
  "11": {
    name: "Minecraft",
    description: "Minecraft is a sandbox game that allows players to build and explore pixelated worlds made up of blocks.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Using Tlauncher, Play in Creative mode with unlimited resources or mine deep into the world in Survival mode. Build anything you can imagine and explore an endless world with updates and new features constantly added.",
    icon: "/images/minecraft.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/nmfo1z9wph09qhup4kcj1/minecraft.exe?rlkey=9obb71izs2rnfeisg660brtyo&st=toh9agy1&dl=1"
  },
  "12": {
    name: "Roblox",
    description: "Roblox is an online platform that lets users create and play games created by other users.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Join a vast community of developers and players. Experience countless virtual worlds, roleplays, and game genres made by creators from around the globe.",
    icon: "/images/roblox.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/pm27qn8134dwyt7zzbccu/roblox.exe?rlkey=j8mn2452fhnjakk1nwmdsk0z8&st=lwil1ici&dl=1"
  },
  "13": {
    name: "Aeolis Tournament",
    description: "A chaotic multiplayer party game where players use air cannons to battle, collect points, and dominate arenas.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Challenge friends in explosive mini-games using air cannons to knock opponents off, capture objectives, and dominate fast-paced party arenas. Supports both local and online multiplayer for endless fun.",
    icon: "/images/Aeolis-Tournament.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/uviqt3q371a57vl246rv1/aeolis.exe?rlkey=78p70395rg8stetzy269q1r92&st=0ddyxg63&dl=1"
  },
  "14": {
    name: "A Leap Forward",
    description: "An indie adventure-platformer where precision jumps and quick reflexes are the keys to survival.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Leap across challenging platforms, dodge traps, and master tricky movement mechanics in this minimalist yet addictive adventure-platformer.",
    icon: "/images/A-Leap-Forward.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/3it718gy5mddvpsoka22g/aleap.exe?rlkey=pn2kgewyne30mqnuefufw1s2c&st=8czd156g&dl=1"
  },
  "15": {
    name: "Bad Dream: Butcher",
    description: "Enter a disturbing dreamscape in this horror point-and-click where danger lurks at every choice.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Explore an unsettling nightmare world, solve eerie puzzles, and survive the horrifying presence of the Butcher in this dark, atmospheric point-and-click game.",
    icon: "/images/Bad-Dream-Butcher.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/u53z11719qkp6gx5f45uc/butcher.exe?rlkey=7bksv15acktr5rd0m2bh0upvr&st=ay1jiref&dl=1"
  },
  "16": {
    name: "Buggyleague",
    description: "Compete in fast-paced off-road buggy races filled with stunts, obstacles, and explosive fun.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Race across dirt tracks, jump over hazards, and battle your rivals with speed and precision in this adrenaline-fueled buggy racing game.",
    icon: "/images/buggyleague.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/hn75q3ge1j2x6cyj8au7b/buggy.exe?rlkey=ywc1x5e3sh27ge0sovdfbgp8j&st=ovnpnbpf&dl=1"
  },
  "17": {
    name: "CASE: Animatronics",
    description: "Survive a night trapped in a police station with killer animatronics hunting your every move.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Navigate a dark, abandoned police station, hack security systems, and avoid deadly animatronics in this intense stealth-horror game.",
    icon: "/images/CASE-Animatronics.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/vut3t567l1sg1ea1ek6og/case.exe?rlkey=1go1xy0en258wqbhcd3opklju&st=n8k8eepx&dl=1"
  },
  "18": {
    name: "Emily Is Away",
    description: "Relive early-2000s internet chat nostalgia in this interactive story about friendship and choices.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Experience a heartfelt narrative through AOL-style chat windows, where your choices shape relationships and endings.",
    icon: "/images/Emily-Is-Away.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/x9zs4ehwn4izs4pcnrubk/emilyisaway.exe?rlkey=zc02cs7at6k9kuwdonfjwckfm&st=ddsp71ah&dl=1"
  },
  "19": {
    name: "Fatigue",
    description: "Navigate an eerie, dreamlike world as you unravel unsettling mysteries while battling exhaustion.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Venture through surreal landscapes filled with strange encounters as your character struggles with fatigue and creeping dread.",
    icon: "/images/Fatigue.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/hrawcvkbbdgrrkpivv6fd/fatigue.exe?rlkey=q6d38b30kg7utrnahrmju0x3e&st=gml84cb9&dl=1"
  },
  "20": {
    name: "Five Nights at Freddy's",
    description: "Survive the night shift by monitoring cameras and conserving power while avoiding deadly animatronics.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Play as a security guard trapped in Freddy Fazbear’s Pizza, managing power usage and surviving relentless animatronic attacks through the night.",
    icon: "/images/Five-Nights-at-Freddy.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/p3w637k5vv1iwnzwnoc95/fivenightsatfreddy.exe?rlkey=dlv9h75j5crkktthb4ba0sdkf&st=epqdn4oz&dl=1"
  },
  "21": {
    name: "Granny: Chapter 1",
    description: "Escape Granny’s creepy house by solving puzzles and avoiding her terrifying presence.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', You have five days to escape a locked house, avoiding Granny’s deadly traps and solving puzzles in this tense horror experience.",
    icon: "/images/Granny-Chapter1.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/arno4saa09vea910r4qu8/granny.exe?rlkey=akz8t350rwaydajlbeg73c16s&st=ij6yidsu&dl=1"
  },
  "22": {
    name: "Granny: Chapter 2",
    description: "Face Granny and Grandpa in a bigger, more dangerous house filled with new challenges and horrors.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Navigate a larger house, avoid Granny and Grandpa, and uncover secrets as you plan your daring escape.",
    icon: "/images/Granny-Chapter2.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/wg92ukld1bswltdmh3vja/granny2.exe?rlkey=ishsjzras49segul1vljld2f9&st=2gypmlxh&dl=1"
  },
  "23": {
    name: "HUMAN",
    description: "A short horror experience set in an abandoned research facility with a disturbing backstory.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Explore a chilling, isolated facility while uncovering a disturbing narrative through environmental storytelling.",
    icon: "/images/HUMAN.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/6o95hykw8li3oj7o9071j/human.exe?rlkey=7wzm731bo7obnyqylf25sfb28&st=gd0b9scx&dl=1"
  },
  "24": {
    name: "I See You",
    description: "A tense horror game where an unseen entity stalks you through unsettling environments.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Explore creepy hallways, solve puzzles, and avoid being caught by something that always seems to be watching you.",
    icon: "/images/I-See-You.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/i6oedg71n5psa5twqrrre/iseeyou.exe?rlkey=et3qv71ofuslaqfzjkvx5rsgk&st=f2xht4rt&dl=1"
  },
  "25": {
    name: "Kunker",
    description: "A fast-paced multiplayer FPS with customizable characters and intense shooting battles.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Jump into quick, competitive matches with fast movement, diverse weapons, and a thriving online community.",
    icon: "/images/KUNKER.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/ootr7exhp0a46rhd78x44/kankar.exe?rlkey=xe6pvrbhlhqjci5b2sm6wyfig&st=fydsyrw5&dl=1"
  },
  "26": {
    name: "League of Legends",
    description: "Join intense 5v5 battles in this competitive MOBA where strategy, teamwork, and skill decide victory.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Choose from over 140 champions, each with unique abilities, and battle to destroy the enemy nexus in strategic, team-based matches.",
    icon: "/images/Leauge-Of-Legends.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/mw566ojat9f4i58cf95re/League-Of-The-Legends.exe?rlkey=omp7vmvznqsm1kjywz9oepxii&st=6pe2ta8p&dl=1"
  },
  "27": {
    name: "Mayhem In Single Valley",
    description: "Unravel a quirky apocalypse filled with puzzles, chaos, and unexpected twists in a pixel art world.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Help a boy save his hometown from a bizarre apocalypse in this puzzle-adventure filled with humor and danger.",
    icon: "/images/Mayhem-In-Single-Valley.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/zjp0kqzqd1lv9tc72oy6a/mayhem.exe?rlkey=xv62onk1gylk9ejd5horxcxg4&st=q4f16dpy&dl=1"
  },
  "28": {
    name: "Midnight",
    description: "A chilling horror game set in eerie darkness, where every sound could mean danger.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Navigate pitch-black environments, relying on sound and light to survive whatever lurks in the dark.",
    icon: "/images/midnight.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/wwoyk7b1mv4v4bxixkfwq/mid.exe?rlkey=10m3ehu8azx45y9fw1y572zeh&st=404wbd51&dl=1"
  },
  "29": {
    name: "Monday Night Monsters",
    description: "A multiplayer brawler where monstrous creatures battle for dominance in chaotic arenas.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Choose your monster, smash your opponents, and dominate wild multiplayer arenas.",
    icon: "/images/Monday-Night-Monsters.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/rnjpm4a6yd01l6r9h96so/mondaymonsters.exe?rlkey=39re18v6pzvlwhj4khgyrglg3&st=5lwhdm84&dl=1"
  },
  "30": {
    name: "My Friend Is a Raven",
    description: "A dark, short narrative adventure about a man’s last conversation with a mysterious raven.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Uncover a somber tale through symbolic dialogue and eerie visuals in this atmospheric short story game.",
    icon: "/images/my-friend-is-a-raven.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/ay6gopxzs4ibdgl1kp1qn/ranveer.exe?rlkey=vx5j5lbnyxnm4bl3581hkelx3&st=g4ywpme3&dl=1"
  },
  "31": {
    name: "Not Alone",
    description: "A psychological horror experience where you are never truly alone in the shadows.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Explore dark, tense environments while evading the ever-present threat that hunts you.",
    icon: "/images/not-alone.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/3xzymc39u9bc2mm1zm3xb/NotAlone.exe?rlkey=97ot62zuhavbbji8lc8om4ijq&st=befhoozk&dl=1"
  },
  "32": {
    name: "Overwatch 2",
    description: "A fast-paced hero shooter where teams battle with unique abilities and objectives.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Play as diverse heroes, each with unique playstyles, in thrilling team-based shooter action.",
    icon: "/images/Over-Watch-2.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/wch54t2qf7fqgqk167v68/overwatch-2.exe?rlkey=0sci7thfcc6pudr8bofmv2g9r&st=92oz6199&dl=1"
  },
  "33": {
    name: "Pocket Bravery",
    description: "A retro-inspired fighting game with modern mechanics and pixel art charm.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Fight in intense, stylish matches using colorful characters and fluid combos.",
    icon: "/images/pocket-bravery.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/w3xd9jyumjz8hfhniu9bn/pocket.exe?rlkey=6nutyzlx4ulcdzymc4v7oc4d7&st=hv10lmbj&dl=1"
  },
  "34": {
    name: "Stairs",
    description: "Descend into psychological horror as you uncover the truth behind chilling stories.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Explore disturbing locations, uncover hidden truths, and survive the horrors lurking within.",
    icon: "/images/STAIRS.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/ve6rs1w4iei3xm3jrmx1j/stairs.exe?rlkey=ddf7uhp4ehqnuwm9y43tuzmmj&st=d3u803mf&dl=1"
  },
  "35": {
    name: "Super Crate Box",
    description: "Grab crates, shoot enemies, and survive as long as possible in this chaotic arcade shooter.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Pick up random weapons from crates and survive endless waves of enemies in this retro arcade challenge.",
    icon: "/images/Super-Crate-Box.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/ve6rs1w4iei3xm3jrmx1j/stairs.exe?rlkey=ddf7uhp4ehqnuwm9y43tuzmmj&st=7wio1r5d&dl=1"
  },
  "36": {
    name: "Valorant",
    description: "A tactical shooter combining precise gunplay with unique agent abilities.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Team up and outplay your opponents in strategic rounds where every move counts.",
    icon: "/images/VALORANT.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/z5f9qnpu2xpmgzxurmm98/valorant.exe?rlkey=s0ws5l0c53evmaf1jbgeyliz5&st=mq3zr4c5&dl=1"
  },
  "37": {
    name: "Winter's Grasp",
    description: "An atmospheric adventure set in a frozen world where survival is a constant challenge.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Journey through a snowbound land, solving puzzles and uncovering the mysteries of the cold.",
    icon: "/images/Winter's-Grasp.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/0q31284c7q9ek9noze1zv/Winter.exe?rlkey=0fu5tfwvxdgpc6m5rfyjmzcv8&st=zs10509x&dl=1"
  },
  "38": {
    name: "World of Tanks",
    description: "Engage in massive tank battles with historically accurate armored vehicles.",
    longDescription: "'OPEN THE README FILE AFTER DOWNLOADING THE GAME', Command realistic tanks in large-scale battles across detailed maps.",
    icon: "/images/World-Of-Tanks.jpg",
    downloadUrl: "https://www.dropbox.com/scl/fi/m0aqudfa5ebuwh2bd1s4n/wot.exe?rlkey=pol9uygj6px9j1vezwzkix96e&st=2r1kzrrl&dl=1"
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
