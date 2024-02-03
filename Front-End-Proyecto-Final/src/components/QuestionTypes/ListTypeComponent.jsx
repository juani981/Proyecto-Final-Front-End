import { FormControl,InputLabel,Select,MenuItem } from "@mui/material"

export const ListTypeComponent = ({question,answers,handleAnswerChange,label}) => {
  return (
    <>
        <FormControl fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                autoWidth 
                >
                {question.options.map((option, index) => (
                 <MenuItem key={index} value={option}>
                    {option}
                </MenuItem>
                ))}
                </Select>
        </FormControl>
    </>
  )
}
