// src/data/mockData.js
export const INITIAL_NEWS = Array.from({ length: 15 }).map((_, i) => ({
  id: `news-${i}`,
  title: `Новина #${i + 1}`,
  description: `Це детальний опис новини #${i + 1}. Тут може бути текст про технології, університет або світ IT.`,
  image: `https://picsum.photos/seed/${i}/200/200`,
}));

export const CONTACTS_DATA = [
  {
    title: 'Викладачі',
    data: [
      { id: 'c1', name: 'Іван Іванов', role: 'Лектор' },
      { id: 'c2', name: 'Петро Петров', role: 'Асистент лектора' },
    ],
  },
  {
    title: 'Одногрупники',
    data: [
      { id: 'c3', name: 'Олексій Смирнов', role: 'Студент' },
      { id: 'c4', name: 'Марія Коваленко', role: 'Студентка' },
    ],
  },
];