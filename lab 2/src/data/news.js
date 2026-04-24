const categories = ['Життя політехніки', 'Заходи', 'Конкурси', 'Добровольчі заходи', 'Новини від студентів'];


const images = [
  require('../../assets/images/news1.jpg'),
  require('../../assets/images/news2.jpg'),
  require('../../assets/images/news3.jpg'),
  require('../../assets/images/news4.jpg'),
];

export const getNewsImage = (id = 1) => images[id % images.length];

export const createNews = (start = 1, count = 20) =>
  Array.from({ length: count }, (_, index) => {
    const id = start + index;
    return {
      id: String(id),
      title: `Новина №${id}: ${categories[id % categories.length]}`,
      description:
        'Відбулося неймовірне , очевидці бачили що бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла бла',
      image: getNewsImage(id),
    };
  });
