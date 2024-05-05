import Box from "@mui/material/Box";
import JobCard from "./JobCard";

export default function JobContainer() {
    return (
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={2}
            width={1}>
            <Box gridColumn="span 4">
                <JobCard />
            </Box>
            <Box gridColumn="span 4">Hello</Box>
            <Box gridColumn="span 4">Hello</Box>
        </Box>
    );
}
