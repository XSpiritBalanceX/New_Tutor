import { useState } from "react";
import { OutlinedInput, InputAdornment, FormHelperText, Box, IconButton, InputLabel, FormControl } from "@mui/material";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";
import classNames from "classnames";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import "./Fields.scss";

interface IControlledPasswordProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  error: React.ReactNode;
  classNameField?: string;
}

const ControlledPassword = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  classNameField,
}: IControlledPasswordProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const classBoxInput: string = classNames("controlledFieldBox", {
    errorField: error,
  });

  const classPasswordInput: string = classNames("passwordField", {
    errorField: error,
    [classNameField as string]: classNameField,
  });
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field }) => {
        return (
          <Box className={classBoxInput}>
            <FormControl className={classPasswordInput}>
              {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
              <OutlinedInput
                {...field}
                id={name}
                type={showPassword ? "text" : "password"}
                error={!!error}
                placeholder={placeholder ?? ""}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    {error && <WarningAmberRoundedIcon className="errorIcon" />}
                  </InputAdornment>
                }
                label={label}
              />
            </FormControl>
            <FormHelperText className="errorMessage">{error}</FormHelperText>
          </Box>
        );
      }}
    />
  );
};

export default ControlledPassword;
