import { questions } from './questions'

export type FriendshipResult = { title: string; message: string }
export type QuizResult = {
  score: number
  correct: number
  wrong: number
  percentage: number
  friendship: FriendshipResult
}

export function calculateScore(answers: Record<number, string>): QuizResult {
  const correct = questions.reduce(
    (total, question, index) => total + Number(answers[index] === question.correctAnswer),
    0,
  )
  return {
    score: correct,
    correct,
    wrong: questions.length - correct,
    percentage: Math.round((correct / questions.length) * 100),
    friendship: getFriendshipResult(correct),
  }
}

export function getFriendshipResult(score: number): FriendshipResult {
  if (score >= 11) return { title: 'BEST FRIEND MATERIAL! ❤️', message: 'You know me so well! At this point, you probably know me better than I know myself!' }
  if (score >= 9) return { title: 'YOU KNOW ME REALLY WELL! 💕', message: 'Okayyy, you definitely pay attention! You know me pretty well!' }
  if (score >= 6) return { title: 'GOOD FRIEND! 😄', message: 'Not bad! You know quite a lot about me, but there are still some things you need to learn!' }
  if (score >= 3) return { title: 'YOU NEED TO KNOW ME BETTER! 😂', message: 'We definitely need to spend more time together!' }
  return { title: 'ARE WE EVEN FRIENDS? 😂', message: 'Okay... we seriously need to have a conversation!' }
}
