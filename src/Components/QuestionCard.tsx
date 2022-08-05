import { Typography, Button, List, ListItemText } from '@mui/material';
import { AnswerObject } from '../App';
import { decodeEntities } from '../utils';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    answered: boolean;
    questionNr: number;
    totalQuestions: number;
  };

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, answered, questionNr, totalQuestions}) => {
    return (
        <>
            <Typography>Question: {questionNr} of {totalQuestions}</Typography>
            <Typography>{decodeEntities(question)}</Typography>
            <List>
                {answers.map((answer) => (
                    <ListItemText
                        key={answer}
                        >
                        <Button
                            variant={userAnswer?.correctAnswer === answer || userAnswer?.answer === answer ? "contained" : "outlined"}
                            color={userAnswer?.correctAnswer === answer ? "success" : userAnswer?.answer === answer ? "error" : undefined}
                            value={answer}
                            onClick={!answered ? callback : undefined}
                            fullWidth
                        >
                            <Typography>{decodeEntities(answer)}</Typography>
                        </Button>
                    </ListItemText>
                ))}
            </List>
        </>
    )
}

export default QuestionCard;