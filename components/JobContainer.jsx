"use client";

import JobCard from "./JobCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const jobCardProps = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 4,
    xl: 3,
};

export default function JobContainer({ items }) {
    return (
        <Grid container spacing={4} width={1} height="max-content">
            {items?.map((item) => (
                <Grid {...jobCardProps} key={item.jdUid}>
                    <JobCard item={item} />
                </Grid>
            ))}
        </Grid>
    );
}
