import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const deleteIcon = (
    <Typography
        variant="body2"
        fontWeight="500"
        sx={{
            px: 0.7,
            borderRadius: "2px",
            height: "100%",
            position: "relative",
            left: "3px",
            ":hover": {
                backgroundColor: "#f88379",
                opacity: 0.7,
                fill: "#800000",
            },
        }}>
        <svg height="14" width="14" viewBox="0 0 20 14">
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
        </svg>
    </Typography>
);

const multiSelectProps = {
    getOptionLabel: (option) => option,
    filterSelectedOptions: true,
    renderTags: (tagValue, tagProps) =>
        tagValue.map((option, index) => (
            <Chip
                {...tagProps({ index })}
                key={option}
                label={option}
                size="small"
                deleteIcon={deleteIcon}
                sx={{
                    borderRadius: 1,
                }}
            />
        )),
};

const groupProps = {
    getOptionLabel: (option) => option.role,
    groupBy: (option) => option.category,
    isOptionEqualToValue: (option, value) => option.role === value.role,
    renderTags: (tagValue, tagProps) =>
        tagValue.map((option, index) => (
            <Chip
                {...tagProps({ index })}
                key={option.role}
                label={option.role}
                size="small"
                deleteIcon={deleteIcon}
                sx={{
                    borderRadius: 1,
                }}
            />
        )),
};

export default function DropdownButton({
    label,
    options,
    value,
    setValue,
    multiple = false,
    groupedOptions = false,
}) {
    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (
        <Autocomplete
            multiple={multiple}
            id={label}
            value={value}
            size="small"
            onChange={handleChange}
            options={options}
            renderInput={(params) => {
                return <TextField label={label} {...params} />;
            }}
            sx={{
                position: "relative",
                minWidth: "10rem",
                width: "fit-content",
                "& .MuiInputLabel-root": {
                    fontSize: "0.8rem",
                    marginTop: "0.2rem",
                },
            }}
            {...(multiple ? { ...multiSelectProps } : "")}
            {...(groupedOptions ? { ...groupProps } : "")}
        />
    );
}
