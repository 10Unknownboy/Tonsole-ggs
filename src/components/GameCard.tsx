import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const GameCard = ({ id, name, description, icon }: GameCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${id}`);
  };

  return (
    <div 
      className="relative w-64 h-64 mx-auto group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleClick}
    >
      <div className="relative w-full h-full preserve-3d transition-transform duration-600 ease-in-out group-hover:rotate-y-180">
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden">
          <img 
            src={icon} 
            alt={name}
            className="w-full h-full object-cover rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          />
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl shadow-lg border border-border p-6 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-foreground mb-3 font-quicksand">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground font-quicksand leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};