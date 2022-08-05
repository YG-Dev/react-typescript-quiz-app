import React, { BaseSyntheticEvent, useState } from 'react';
import { Container, Grid, Typography, Button, CircularProgress, Input, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import './App.css';
import { requestQuizQuestions, Difficulty, QuestionsState } from './Services/RequestQuizQuestions';
import QuestionCard from './Components/QuestionCard';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [difficultyState, setDifficultyState] = useState<Difficulty>(Difficulty.EASY);
  const [totalQuestions, setTotalQuestions] = useState(10);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject>();
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    setGameStarted(true);
    const newQuestions = await requestQuizQuestions(
      totalQuestions,
      difficultyState
    );
    setQuestions(newQuestions);
    setScore(0);
    setAnswered(false);
    setQuestionNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: BaseSyntheticEvent) => {
    if (gameStarted) {
      const answer = e.currentTarget.value
      const correct = questions[questionNumber].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setAnswered(true);
      setUserAnswer({...answerObject});
    }
  };

  const nextQuestion = () => {
    if (questionNumber + 1 === totalQuestions) {
      setGameStarted(false);
    } else {
      setQuestionNumber(questionNumber + 1);
      setAnswered(false);
    }
  }

  const selectDifficulty = (e: SelectChangeEvent<Difficulty>) => {
    setDifficultyState(e.target.value as Difficulty);
  }

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1" component="h1" align="center">Quiz app</Typography>
        {!gameStarted ? ( 
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Input
              type="number"
              inputProps={{
                min: 1
              }}
              sx={{ mr: 5, minWidth: 230 }}
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(parseInt(e.target.value))}
            />
            <Button variant="contained" onClick={startQuiz} sx={{ mr: 4 }}>Start quiz</Button>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-select-label"
                id="difficulty-select"
                label="Difficulty"
                defaultValue={Difficulty.EASY}
                value={difficultyState}
                onChange={selectDifficulty}
              >
                <MenuItem value={Difficulty.EASY}>Easy</MenuItem>
                <MenuItem value={Difficulty.MEDIUM}>Medium</MenuItem>
                <MenuItem value={Difficulty.HARD}>Hard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ) : null}
        {loading ? (
          <Typography>
            <CircularProgress />
          </Typography>
        ) : null}
        {!loading && gameStarted ? (
          <QuestionCard
            questionNr={questionNumber + 1}
            totalQuestions={totalQuestions}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            answered={answered}
            userAnswer={userAnswer ? userAnswer : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {gameStarted && !loading ? (
          <Typography sx={{ mt: 5 }}>Score: {score}</Typography>
        ) : null}
        {gameStarted && !loading && userAnswer && answered ? (
          <Button variant="contained" onClick={nextQuestion}>
            {questionNumber + 1 === totalQuestions ? "Finish quiz" : "Next"}
          </Button>
        ) : null}
      </Grid>
    </Container>
  );
}

export default App;
