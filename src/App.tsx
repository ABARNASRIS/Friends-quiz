import { useState } from 'react'
import { calculateScore } from './quiz/scoring'
import { questions } from './quiz/questions'
import type { QuizResult } from './quiz/scoring'
import './App.css'

type Screen = 'welcome' | 'quiz' | 'result' | 'review'
const letters = ['A', 'B', 'C', 'D']

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [friendName, setFriendName] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [shareMessage, setShareMessage] = useState('')
  const question = questions[currentQuestion]
  const completedCount = Object.keys(answers).length
  const supportsShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  function startQuiz(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!friendName.trim()) return
    setCurrentQuestion(0)
    setScreen('quiz')
  }

  function submitQuiz() {
    if (completedCount !== questions.length) return
    setResult(calculateScore(answers))
    setScreen('result')
  }

  function retakeQuiz() {
    if (!window.confirm('Ready to take the quiz again? Your current answers will be cleared.')) return
    setAnswers({})
    setResult(null)
    setCurrentQuestion(0)
    setShareMessage('')
    setScreen('welcome')
  }

  async function shareResult() {
    if (!result) return
    const message = `I just took the “How Well Do You Know Me?” quiz and scored ${result.score}/${questions.length}! 😎❤️ How well do you know me?`
    setShareMessage('')
    if (supportsShare) {
      try {
        await navigator.share({ title: 'How Well Do You Know Me?', text: message })
        return
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(message)
      setShareMessage('Result copied. Send it to your friend!')
    } catch {
      setShareMessage('Clipboard access is unavailable in this browser.')
    }
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand-mark" href="#home" onClick={(event) => event.preventDefault()} aria-label="Friendship quiz home">
          <span className="brand-heart" aria-hidden="true">♥</span> little things club
        </a>
        <span className="header-note"><span aria-hidden="true">✳</span> a tiny test of your friendship</span>
      </header>

      {screen === 'welcome' && (
        <section className="welcome-page" aria-labelledby="welcome-title">
          <div className="welcome-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> THE FRIENDSHIP EDITION</div>
            <h1 id="welcome-title">How well<br />do you <em>know me?</em></h1>
            <p className="welcome-subtitle">Think you know me? Let’s find out!</p>
            <form className="name-form" onSubmit={startQuiz}>
              <label htmlFor="friend-name">Your name, please</label>
              <div className="name-input-wrap">
                <span className="name-input-icon" aria-hidden="true">✦</span>
                <input id="friend-name" name="friendName" type="text" placeholder="Enter your name" value={friendName} onChange={(event) => setFriendName(event.target.value)} autoComplete="given-name" maxLength={40} required />
              </div>
              <button className="button button-primary start-button" type="submit" disabled={!friendName.trim()}>Let’s play <span aria-hidden="true">↗</span></button>
              <p className="form-footnote"><span aria-hidden="true">♥</span> 12 questions, one very good friend</p>
            </form>
          </div>
          <div className="welcome-art" aria-label="A little friendship scrapbook illustration">
            <div className="art-spark art-spark-one" aria-hidden="true">✳</div>
            <div className="art-spark art-spark-two" aria-hidden="true">✦</div>
            <div className="art-note art-note-back" aria-hidden="true"><span>you + me</span><b>♡</b></div>
            <div className="art-note art-note-front"><span className="note-caption">A VERY IMPORTANT QUESTION</span><div className="note-heart" aria-hidden="true">♥</div><p>Are we<br /><em>besties?</em></p><span className="note-answer">let’s find out <b>↗</b></span></div>
            <span className="art-sticker sticker-smile" aria-hidden="true">☺</span>
            <span className="art-sticker sticker-heart" aria-hidden="true">♥</span>
            <span className="art-caption">made for the people<br />who just get you</span>
          </div>
          <div className="welcome-footer"><span>01</span><span className="footer-rule" /><span>YOUR FRIENDSHIP, IN 12 QUESTIONS</span></div>
        </section>
      )}

      {screen === 'quiz' && (
        <section className="quiz-page" aria-labelledby="question-title">
          <div className="quiz-topline">
            <button className="text-button" type="button" onClick={() => setScreen('welcome')}>← <span>Back to start</span></button>
            <span className="quiz-for">A QUIZ FOR <strong>{friendName.trim()}</strong></span>
          </div>
          <div className="quiz-progress-label"><span>Question {currentQuestion + 1} <span className="muted">of {questions.length}</span></span><span className="progress-count">{String(Math.round(((currentQuestion + 1) / questions.length) * 100)).padStart(2, '0')}%</span></div>
          <div className="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={currentQuestion + 1}><span style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} /></div>
          <div className="question-content" key={currentQuestion}>
            <div className="question-kicker">A LITTLE SOMETHING ABOUT ME <span aria-hidden="true">✳</span></div>
            <h1 id="question-title">{question.question}</h1>
            <p className="question-hint">Pick the one that feels right</p>
            <div className="answer-list" role="group" aria-labelledby="question-title">
              {question.options.map((option, index) => {
                const selected = answers[currentQuestion] === option
                return <button className={`answer-option${selected ? ' is-selected' : ''}`} type="button" key={option} aria-pressed={selected} onClick={() => setAnswers((current) => ({ ...current, [currentQuestion]: option }))}><span className="answer-letter">{letters[index]}</span><span className="answer-text">{option}</span><span className="answer-check" aria-hidden="true">{selected ? '✓' : ''}</span></button>
              })}
            </div>
          </div>
          <div className="quiz-navigation">
            <button className="button button-secondary" type="button" onClick={() => setCurrentQuestion((index) => Math.max(0, index - 1))} disabled={currentQuestion === 0}><span aria-hidden="true">←</span> Previous</button>
            {currentQuestion < questions.length - 1 ? <button className="button button-primary" type="button" onClick={() => setCurrentQuestion((index) => index + 1)} disabled={answers[currentQuestion] === undefined}>Next question <span aria-hidden="true">→</span></button> : <button className="button button-primary" type="button" onClick={submitQuiz} disabled={completedCount !== questions.length}>Submit quiz <span aria-hidden="true">↗</span></button>}
          </div>
          <p className="quiz-reassurance"><span aria-hidden="true">♥</span> Your answers stay secret until the very end</p>
        </section>
      )}

      {screen === 'result' && result && (
        <section className={`result-page${result.score >= 9 ? ' result-celebrate' : ''}`} aria-labelledby="result-title">
          {result.score >= 9 && <div className="confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <span key={index} />)}</div>}
          <div className="result-intro"><div className="eyebrow"><span className="eyebrow-dot" /> THE FRIENDSHIP REPORT</div><h1 id="result-title">Hey, <em>{friendName.trim()}</em>! <span aria-hidden="true">👋</span></h1><p>You showed up. Let’s see what you know.</p></div>
          <div className="result-scoreboard">
            <div className="score-main"><span className="score-label">YOUR SCORE</span><div className="score-number">{result.score}<span>/{questions.length}</span></div><div className="score-percent">{result.percentage}% <span>of the lore, unlocked</span></div></div>
            <div className="score-stats">
              <div className="stat-row"><span className="stat-symbol correct-symbol">✓</span><span>Correct answers</span><strong>{result.correct}</strong></div>
              <div className="stat-row"><span className="stat-symbol wrong-symbol">×</span><span>Wrong answers</span><strong>{result.wrong}</strong></div>
              <div className="stat-row friendship-row"><span className="stat-symbol friendship-symbol">♥</span><span>Friendship level</span><strong>{result.friendship.title.replace(/[!]/g, '').replaceAll('❤️', '').replaceAll('💕', '').replaceAll('😄', '').replaceAll('😂', '').trim()}</strong></div>
            </div>
          </div>
          <div className="friendship-message"><span className="friendship-spark" aria-hidden="true">✳</span><div><h2>{result.friendship.title}</h2><p>{result.friendship.message}</p></div></div>
          <div className="result-actions">
            <button className="button button-primary" type="button" onClick={() => setScreen('review')}>Review my answers <span aria-hidden="true">↗</span></button>
            <button className="button button-secondary" type="button" onClick={shareResult}>{supportsShare ? 'Share my result' : 'Copy result'} <span aria-hidden="true">{supportsShare ? '↗' : '▢'}</span></button>
            <button className="retake-button" type="button" onClick={retakeQuiz}>↻ <span>Retake quiz</span></button>
          </div>
          {shareMessage && <p className="share-feedback" role="status">{shareMessage}</p>}
        </section>
      )}

      {screen === 'review' && result && (
        <section className="review-page" aria-labelledby="review-title">
          <div className="review-header"><button className="text-button" type="button" onClick={() => setScreen('result')}>← <span>Back to results</span></button><div className="eyebrow"><span className="eyebrow-dot" /> THE ANSWER KEY</div><h1 id="review-title">Let’s see what<br /><em>you remembered.</em></h1><p>{result.correct} out of 12 right, {friendName.trim()}. Here’s the full story.</p></div>
          <div className="review-list">{questions.map((item, index) => {
            const correct = answers[index] === item.correctAnswer
            return <article className={`review-item${correct ? ' review-correct' : ' review-wrong'}`} key={item.question}><div className="review-status" aria-label={correct ? 'Correct' : 'Incorrect'}>{correct ? '✓' : '×'}</div><div className="review-copy"><span className="review-number">QUESTION {String(index + 1).padStart(2, '0')}</span><h2>{item.question}</h2><p>Your answer <strong>{answers[index]}</strong></p>{!correct && <p className="correct-answer-line">The answer <strong>{item.correctAnswer}</strong></p>}</div></article>
          })}</div>
          <div className="review-footer"><button className="button button-secondary" type="button" onClick={() => setScreen('result')}>← Back to results</button><button className="button button-primary" type="button" onClick={retakeQuiz}>Retake quiz <span aria-hidden="true">↻</span></button></div>
        </section>
      )}

      <footer className="site-footer"><span>MADE WITH A LITTLE EXTRA LOVE</span><span aria-hidden="true">♥</span><span>FOR YOUR FAVORITE PEOPLE</span></footer>
    </main>
  )
}

export default App
