import { http, HttpResponse } from 'msw';

interface HeartPost {
  id: number;
  category: string;
  author: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
  content: string;
}

const heartPosts: HeartPost[] = [
  {
    id: 1,
    category: 'Health',
    author: 'Alice',
    likeCount: 15,
    viewCount: 120,
    commentCount: 4,
    content:
      'Staying hydrated is key to a healthy lifestyle. Drink at least 8 cups of water daily.',
  },
  {
    id: 2,
    category: 'Travel',
    author: 'Bob',
    likeCount: 25,
    viewCount: 230,
    commentCount: 10,
    content: 'Exploring the hidden gems of Japan was an unforgettable experience.',
  },
  {
    id: 3,
    category: 'Food',
    author: 'Charlie',
    likeCount: 30,
    viewCount: 340,
    commentCount: 8,
    content: 'Tried a new recipe for vegan lasagna that turned out delicious!',
  },
  {
    id: 4,
    category: 'Technology',
    author: 'Diana',
    likeCount: 50,
    viewCount: 540,
    commentCount: 15,
    content: 'The latest smartphone release features incredible camera improvements.',
  },
  {
    id: 5,
    category: 'Fitness',
    author: 'Ethan',
    likeCount: 20,
    viewCount: 150,
    commentCount: 5,
    content: 'Morning yoga routines help improve flexibility and reduce stress.',
  },
  {
    id: 6,
    category: 'Education',
    author: 'Fiona',
    likeCount: 18,
    viewCount: 200,
    commentCount: 7,
    content: 'Online courses provide great opportunities for continuous learning.',
  },
  {
    id: 7,
    category: 'Music',
    author: 'George',
    likeCount: 22,
    viewCount: 180,
    commentCount: 6,
    content: 'Discovered a new indie band with unique sound and lyrics.',
  },
  {
    id: 8,
    category: 'Books',
    author: 'Hannah',
    likeCount: 35,
    viewCount: 400,
    commentCount: 12,
    content: 'Reading historical fiction helps me understand different eras better.',
  },
  {
    id: 9,
    category: 'Nature',
    author: 'Ian',
    likeCount: 40,
    viewCount: 450,
    commentCount: 9,
    content: 'Hiking in the mountains offers breathtaking views and fresh air.',
  },
  {
    id: 10,
    category: 'Art',
    author: 'Jane',
    likeCount: 28,
    viewCount: 320,
    commentCount: 11,
    content: 'Painting landscapes is a great way to express creativity.',
  },
  {
    id: 11,
    category: 'Photography',
    author: 'Kevin',
    likeCount: 33,
    viewCount: 370,
    commentCount: 13,
    content: 'Capturing the golden hour light makes photos look magical.',
  },
  {
    id: 12,
    category: 'Cooking',
    author: 'Laura',
    likeCount: 26,
    viewCount: 290,
    commentCount: 7,
    content: 'Baking sourdough bread requires patience but is very rewarding.',
  },
  {
    id: 13,
    category: 'Gaming',
    author: 'Mike',
    likeCount: 45,
    viewCount: 600,
    commentCount: 20,
    content: 'The new RPG game has an immersive storyline and stunning graphics.',
  },
  {
    id: 14,
    category: 'Movies',
    author: 'Nina',
    likeCount: 38,
    viewCount: 420,
    commentCount: 14,
    content: 'Watched a documentary that changed my perspective on climate change.',
  },
  {
    id: 15,
    category: 'Science',
    author: 'Oscar',
    likeCount: 42,
    viewCount: 480,
    commentCount: 16,
    content: 'Recent discoveries in space exploration are truly fascinating.',
  },
];

export const heartPostHandlers = [
  http.get('/api/heart-posts', ({ request }) => {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get('page');
    const sizeParam = url.searchParams.get('size');

    const page = pageParam ? Math.max(0, parseInt(pageParam, 10)) : 0;
    const size = sizeParam ? Math.max(1, parseInt(sizeParam, 10)) : 5;

    const totalElements = heartPosts.length;
    const totalPages = Math.ceil(totalElements / size);
    const start = page * size;
    const end = start + size;
    const content = heartPosts.slice(start, end);
    const last = page >= totalPages - 1;

    return HttpResponse.json({
      page,
      content,
      size,
      totalElements,
      totalPages,
      last,
    });
  }),
];
