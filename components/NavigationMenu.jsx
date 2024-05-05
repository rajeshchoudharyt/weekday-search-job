import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function NavigationMenu() {
    return (
        <Tabs
            value="searchJobs"
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
            textColor="inherit">
            <Tab
                label="Search jobs"
                value="searchJobs"
                sx={{
                    fontSize: "1rem",
                    fontWeight: "400",
                    textTransform: "none",
                    letterSpacing: "0.04em",
                }}
            />
        </Tabs>
    );
}
