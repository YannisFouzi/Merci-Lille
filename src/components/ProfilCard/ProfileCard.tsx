import React from "react";
import bananaSmootie from "../../media/banana_smoothie.jpg";
import raptureFouzi from "../../media/rapture_fouzi.jpg";
import scooby from "../../media/scooby.jpg";

interface ProfileCardProps {
  name: string;
  description: string;
  imageSrc: string;
  type: string;
  size: string;
  weight: string;
  imageOnLeft: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  description,
  imageSrc,
  type,
  size,
  weight,
  imageOnLeft,
}) => {
  return (
    <div
      className={`flex flex-col ${
        imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
      } gap-4 max-w-4xl mx-auto mb-8`}
    >
      <div className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.5)]">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.5)] p-4 flex flex-col">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
          {name}
        </h2>
        <p className="text-gray-600 text-lg md:text-xl leading-tight mb-2 flex-grow">
          {description}
        </p>
        <div className="flex justify-between border-t border-gray-200 pt-3 text-sm">
          <div>
            <p className="text-gray-500 uppercase font-medium">
              Groupe sanguin
            </p>
            <p className="font-semibold text-gray-800">{type}</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase font-medium">Taille</p>
            <p className="font-semibold text-gray-800">{size}</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase font-medium">Animal fav</p>
            <p className="font-semibold text-gray-800">{weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCardsGrid: React.FC = () => {
  const profilesData = [
    {
      name: "Banana Smoothie",
      description: `Deux idiots passeront de toute façon le plus clair de leur temps accoudés au bar à essayer de faire comprendre à un habitué - qui n'a rien demandé à personne - pourquoi Taylor Swift, c'est quand même mieux qu'Eminem. "Vous pouvez les sortir ces deux-là?" sera sans doute votre phrase fétiche de la soirée quand viendra le moment de parler de la qualité des DJ présents ce soir, le temps que cette purge se termine sur les coups de 2h.`,
      imageSrc: bananaSmootie,
      type: "O+",
      size: "1m78",
      weight: "Pigeon",
    },
    {
      name: "Rapture Fouzi",
      description:
        "vous voyez un jeune débraillé grimé de merch ignoble d'artiste dont vous avez rien à battre dans un coin du bar, c'est notre Parisien déjanté qui tape sa meilleure sieste. Allongé dans une flaque d'alcool et d'autres substances non identifiées, il se lèvera de temps en temps pour prendre le contrôle des platines et vous assourdir d'un mashup mal calé à 270 bpm.",
      imageSrc: raptureFouzi,
      type: "A+",
      size: "1m83",
      weight: "Rendard",
    },
    {
      name: "Scooby",
      description:
        "La troupe de Merci Lille se coltine à nouveau son espèce de Jacouille local pour vous faire profiter (non) de sa sélection disco house mégaterror xtra uptempo qui a déjà lassé le public rien qu'à la lecture de la présentation.",
      imageSrc: scooby,
      type: "AB+",
      size: "90cm",
      weight: "Rat",
    },
  ];

  return (
    <div>
      <h1 className="text-6xl font-bold text-center mb-16 text-white">
        Nos ""Artistes"""
      </h1>

      <div className="space-y-8">
        {profilesData.map((profile, index) => (
          <ProfileCard key={index} {...profile} imageOnLeft={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};

export default ProfileCardsGrid;
