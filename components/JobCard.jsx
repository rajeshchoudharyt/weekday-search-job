import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { CardHeader, Typography } from "@mui/material";

import Image from "next/image";

export default function JobCard() {
    return (
        <Card
            variant="elevation"
            sx={{
                p: 2.5,
                borderRadius: "1.25rem",
                boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.25)",
            }}>
            <Typography
                fontWeight={400}
                fontSize="0.6rem"
                boxShadow="0 1px 4px 0 rgba(0, 0, 0, 0.25)"
                width="fit-content"
                borderRadius={4}
                px={0.8}
                py={0.3}
                lineHeight={1.5}>
                ⏳ Posted 13 days ago
            </Typography>
            <CardHeader
                sx={{ px: 0 }}
                avatar={
                    <Image
                        alt="logo"
                        src={"https://logo.clearbit.com/dropbox.com"}
                        width={50}
                        height={50}
                        priority
                    />
                }
                title={
                    <Typography
                        fontSize="0.85rem"
                        fontWeight={600}
                        color="#8b8b8b"
                        letterSpacing="1px">
                        Homework App
                    </Typography>
                }
                subheader={
                    <Typography
                        fontSize="0.9rem"
                        fontWeight={400}
                        color="rgba(0, 0, 0, 0.8)">
                        Jr Fullstack
                        <br />
                        <span
                            style={{
                                fontSize: "12px",
                                fontWeight: 500,
                            }}>
                            India
                        </span>
                    </Typography>
                }
                titleTypographyProps={{}}
            />
            <CardContent>
                <Typography
                    fontSize={14}
                    fontWeight={400}
                    color="rgb(77, 89, 106)">
                    Estimated Salary: 35K - 45K USD
                    <span> ✅</span>
                </Typography>
                <Typography variant="body2" textOverflow="clip">
                    Job Description
                </Typography>
            </CardContent>
        </Card>
    );
}
