// src/data/mockData.js
export const generateNewsItem = () => {
  const randomNum = Math.floor(Math.random() * 100000);
  return {
    id: Math.random().toString(36).substring(2, 11),
    title: `Новина #${randomNum}`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
    image: `https://picsum.photos/seed/${randomNum}/200/200`,
  };
};
export const INITIAL_NEWS = Array.from({ length: 15 }).map(generateNewsItem);
export const CONTACTS_DATA = [
  {
    title: 'Викладачі',
    data: [
      { id: 'c1', name: 'Іван Іванов', role: 'Викладач ЗПІ' },
      { id: 'c2', name: 'Петро Петров', role: 'Викладач ТВ' },
    ],
  },
  {
    title: 'Одногрупники',
    data: [
      { id: 'c3', name: 'Олексій Олексійович', role: 'Староста' },
      { id: 'c4', name: 'Марія Батьківна', role: 'Замстарости' },
    ],
  },
];