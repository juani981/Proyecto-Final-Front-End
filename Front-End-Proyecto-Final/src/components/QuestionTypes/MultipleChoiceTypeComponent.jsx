import { Label } from "@mui/icons-material";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
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
        <FormLabel>{label}</FormLabel>

        {question.options.map((option, index) => (
          <FormControlLabel
            key={question.id}
            control={
              question.type === "multiple choice" && (
                <Checkbox
                  checked={
                    answers[question.id] &&
                    answers[question.id].includes(option)
                  }
                  onChange={() => {
                    const updatedOptions = [];
                    if (answers[question.id]) {
                      updatedOptions.push(...answers[question.id]);
                    }
                    const indexOfOption = updatedOptions.indexOf(option);
                    if (indexOfOption === -1) {
                      updatedOptions.push(option);
                    } else {
                      updatedOptions.splice(indexOfOption, 1);
                    }
                    handleAnswerChange(question.id, updatedOptions);
                  }}
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
