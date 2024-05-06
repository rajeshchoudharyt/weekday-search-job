import JobCard from "./JobCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function JobContainer() {
    return (
        <Grid container spacing={2} width={1}>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <JobCard />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <JobCard />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <JobCard />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <JobCard />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <JobCard />
            </Grid>
            <Grid xs={12} sm={6} md={4} lg={3}>
                <JobCard />
            </Grid>
        </Grid>
    );
}
