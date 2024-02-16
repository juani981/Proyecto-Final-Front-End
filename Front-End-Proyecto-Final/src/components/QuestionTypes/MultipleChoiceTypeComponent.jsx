import { Label } from "@mui/icons-material";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  Paper,
} from "@mui/material";
import Divider from "@mui/material/Divider";

export const MultipleChoiceTypeComponent = ({
  question,
  answers,
  handleAnswerChange,
  label,
}) => {
  return (
    <>
      <FormControl component="fieldset" margin="normal">
        <FormLabel>Respuesta</FormLabel>

        {question.options.map((option, index) => (
          <FormControlLabel
            key={question.id}
            control={
              question.type === "multiple choice" ? (
                <Checkbox
                  checked={
                    Array.isArray(answers[question.id]) &&
                    answers[question.id].includes(option)
                  }
                  onChange={() => {
                    const listedOptions = answers[question.id] || [];
                    const updatedOptions = listedOptions.includes(option)
                      ? listedOptions.filter((o) => o !== option)
                      : [...listedOptions, option];
                    handleAnswerChange(question.id, updatedOptions);
                  }}
                />
              ) : (
                <Radio
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                />
              )
            }
            label={option}
          />
        ))}
      </FormControl>
    </>
  );
};
