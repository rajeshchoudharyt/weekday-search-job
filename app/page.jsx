import Box from "@mui/material/Box";
import NavigationMenu from "@/components/NavigationMenu";

export default function Home() {
    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="1rem"
            p={2}
            width="100%"
            height="100%">
            <NavigationMenu
                items={[
                    {
                        label: "Search jobs",
                        value: "searchJobs",
                    },
                ]}
            />
        </Box>
    );
}
