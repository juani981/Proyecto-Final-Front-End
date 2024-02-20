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

export const UniqueChoiceTypeComponent = ({
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
              question.type === "unique choice" && (
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
