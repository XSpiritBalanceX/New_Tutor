import { TextField, FormHelperText, Box, InputAdornment, MenuItem } from "@mui/material";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import classNames from "classnames";
import "./Fields.scss";

interface IControlledSelectProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  error: React.ReactNode;
  classNameField?: string;
  options: string[];
  defaultOption?: string;
}

const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  classNameField,
  options,
  defaultOption,
}: IControlledSelectProps<T>) => {
  const classBoxInput: string = classNames("controlledFieldBox", {
    errorField: error,
  });

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      defaultValue={(defaultOption || "") as PathValue<T, Path<T>>}
      render={({ field }) => {
        return (
          <Box className={classBoxInput}>
            <TextField
              {...field}
              select={true}
              label={label ?? ""}
              error={!!error}
              className={`controlledField ${classNameField}`}
              placeholder={placeholder ?? ""}
              InputProps={{
                endAdornment: !!error && (
                  <InputAdornment position="end" className="errorIcon">
                    <WarningAmberRoundedIcon />
                  </InputAdornment>
                ),
              }}
            >
              {options.map((el, ind) => (
                <MenuItem key={ind} value={ind}>
                  {el}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText className="errorMessage">{error}</FormHelperText>
          </Box>
        );
      }}
    />
  );
};

export default ControlledSelect;
