import React from "react";
import bananaSmootie from "../../media/artist/banana_smoothie.jpg";
import raptureFouzi from "../../media/artist/rapture_fouzi.jpg";
import scooby from "../../media/artist/scooby.jpg";

interface Characteristic {
  label: string;
  value: string;
}

interface ProfileCardProps {
  name: string;
  description: string;
  imageSrc: string;
  characteristics: Characteristic[];
  imageOnLeft: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  description,
  imageSrc,
  characteristics,
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
          loading="lazy"
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
          {characteristics.map((char, index) => (
            <div key={index}>
              <p className="text-gray-500 uppercase font-medium">
                {char.label}
              </p>
              <p className="font-semibold text-gray-800">{char.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Optimisation avec React.memo car les props sont statiques
 * et ne changent jamais après le premier render
 */
const MemoizedProfileCard = React.memo(ProfileCard);

const ProfileCardsGrid: React.FC = () => {
  // useMemo pour éviter de recréer l'array à chaque render
  const profilesData = React.useMemo(
    () => [
      {
        name: "Banana Smoothie",
        description: `Deux imbéciles amateurs de mashups et de sets Freestyle à la cohérence artistique inexistante. Il est recommandé de trouver une autre activité lorsque ceux-ci sont bookés à une de nos soirées afin de gagner du temps (et de l'argent). Leur passion : vous faire préférer Katy Perry à la Techno Boom Boom sans saveur ni intérêt. Le font-ils correctement ? Non. Est-ce que c'est quand même rigolo ? Un peu.`,
        imageSrc: bananaSmootie,
        characteristics: [
          { label: "Style", value: "Freestyle" },
          { label: "Animal Préféré", value: "Scooby" },
          { label: "BPM", value: "825" },
        ],
      },
      {
        name: "Rapture Fouzi",
        description:
          "Bon, lui il est de Paris mais par nécessité diplomatique nous faisons croire à tout le monde qu'il est Lillois. En gros, il fait un peu de tout et de rien (surtout de rien) et il s'amuse à edit un peu n'importe quoi tant que ça plait aux gens. Le soucis, c'est que ça ne plait à personne, mais au moins il ramène des machins à bidouiller en live et du coup ça fait un peu illusion qu'il fait de la musique.",
        imageSrc: raptureFouzi,
        characteristics: [
          { label: "Style", value: "Débraillé" },
          { label: "Soleil Préféré", value: "UY Scuti" },
          { label: "Cachet Moyen", value: "180 000€" },
        ],
      },
      {
        name: "Scooby",
        description:
          "Car Merci Lille est non seulement un collectif d'événementiel mais également un refuge pour animaux, nous proposons les services du plus célèbre des chiens enquêteurs de Police. Son style unique permettra de transformer votre établissement en chenil le temps d'une soirée. Laisser la fenêtre entrouverte et une gamelle d'eau à l'entrée avant toute utilisation. N'aime pas les chats.",
        imageSrc: scooby,
        characteristics: [
          { label: "Style ", value: "Drum & Bass" },
          { label: "Accessoire Préféré", value: "Caisson de Basse" },
          { label: "Race", value: "Dogue Allemand" },
        ],
      },
    ],
    []
  );

  return (
    <div>
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-16 text-white">
        Nos ""Artistes""
      </h1>

      <div className="space-y-8">
        {profilesData.map((profile, index) => (
          <MemoizedProfileCard key={profile.name} {...profile} imageOnLeft={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
};

export default ProfileCardsGrid;
