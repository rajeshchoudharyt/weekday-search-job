import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function NavigationMenu({ items }) {
    return (
        <Tabs
            value="searchJobs"
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
            textColor="inherit">
            {items.map((item) => (
                <Tab
                    label={item.label}
                    value={item.value}
                    key={item.label}
                    sx={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        textTransform: "none",
                        letterSpacing: "0.04em",
                    }}
                />
            ))}
        </Tabs>
    );
}
