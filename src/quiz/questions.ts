export type QuizQuestion = {
  question: string
  options: [string, string, string, string]
  correctAnswer: string
}

export const questions: QuizQuestion[] = [
  { question: 'What is my favorite food?', options: ['Pizza', 'Fried rice', 'Burger', 'Biryani'], correctAnswer: 'Fried rice' },
  { question: 'What is my favorite color?', options: ['Blue', 'Pink', 'Black', 'White'], correctAnswer: 'Black' },
  { question: 'Which of these best describes my personality?', options: ['Calm and quiet with everyone', 'Talkative, but only with my favorite people', 'Talkative and energetic with everyone', 'Serious and reserved with everyone'], correctAnswer: 'Talkative, but only with my favorite people' },
  { question: 'What do I prefer doing in my free time?', options: ['Watching movies/series', 'Reading books', 'Playing outdoor games', 'Cooking'], correctAnswer: 'Watching movies/series' },
  { question: 'What is something I really like doing?', options: ['Cooking', 'Travelling', 'Shopping', 'Gardening'], correctAnswer: 'Shopping' },
  { question: 'What do I usually like buying when I go shopping?', options: ['Clothes', 'Books', 'Gadgets', 'Shoes'], correctAnswer: 'Clothes' },
  { question: 'What is my dream career?', options: ['Software Developer', 'Teacher', 'Doctor', 'Business Owner'], correctAnswer: 'Software Developer' },
  { question: 'What are the names of my pets?', options: ['Romen and Rolex', 'Rocky and Romeo', 'Rohan and Rex', 'Rony and Rio'], correctAnswer: 'Romen and Rolex' },
  { question: 'What is my native place?', options: ['Devakottai', 'Karaikudi', 'Sivaganga', 'Madurai'], correctAnswer: 'Devakottai' },
  { question: 'What is my date of birth?', options: ['23 March 2005', '25 March 2005', '22 March 2005', '24 March 2005'], correctAnswer: '23 March 2005' },
  { question: 'What is my zodiac sign?', options: ['Leo', 'Aries', 'Taurus', 'Gemini'], correctAnswer: 'Leo' },
  { question: 'What is my favorite type of weather?', options: ['Rainy', 'Cold/Chilly', 'Sunny', 'Cloudy'], correctAnswer: 'Rainy' },
]
