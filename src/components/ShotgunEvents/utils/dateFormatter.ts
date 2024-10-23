const days = {
  lundi: "lun.",
  mardi: "mar.",
  mercredi: "mer.",
  jeudi: "jeu.",
  vendredi: "ven.",
  samedi: "sam.",
  dimanche: "dim.",
};

const months = {
  janvier: "jan.",
  février: "fév.",
  mars: "mar.",
  avril: "avr.",
  mai: "mai",
  juin: "juin",
  juillet: "juil.",
  août: "août",
  septembre: "sep.",
  octobre: "oct.",
  novembre: "nov.",
  décembre: "déc.",
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const dayName = dateObj.toLocaleDateString("fr-FR", { weekday: "long" });
  const monthName = dateObj.toLocaleDateString("fr-FR", { month: "long" });
  const day = dateObj.getDate();

  const shortDay = days[dayName as keyof typeof days];
  const shortMonth = months[monthName as keyof typeof months];

  return `${shortDay} ${day} ${shortMonth}`;
};
