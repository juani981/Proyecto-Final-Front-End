import { TextField } from "@mui/material"

export const TextTypeComponent = ({question , handleTitleChange}) => {
  return (
    <>
    <TextField
                    label={question.label}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => handleTitleChange(question.id, e.target.value)}
                    />
    </>
  )
}
