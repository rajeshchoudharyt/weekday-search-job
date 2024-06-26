"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const getSalary = (min, max, currency) => {
    let str = "Estimated Salary: ";

    str += min
        ? max
            ? `${min}K - ${max}K ${currency}`
            : `min ${min}K currency`
        : max
        ? `upto ${max}K ${currency}`
        : `Not mentioned`;

    return str;
};

export default function JobCard({ item }) {
    const [expanded, setExpanded] = useState(false);
    const [viewButton, setViewButton] = useState(true);
    const ref = useRef();

    useEffect(() => {
        const { scrollHeight, clientHeight } = ref.current;
        setViewButton(scrollHeight > clientHeight);
    }, []);

    const handleClick = () => {
        const value = !expanded;

        setExpanded(value);
    };

    return (
        <Card
            variant="elevation"
            sx={{
                p: 2.5,
                borderRadius: "1.25rem",
                boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.25)",
                minWidth: "fit-content",
                height: "fit-content",
                minHeight: "100%",
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

            {/* Header */}
            <CardHeader
                sx={{ px: 0 }}
                avatar={
                    <Image
                        alt="logo"
                        src={item.logoUrl}
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
                        {item.companyName}
                    </Typography>
                }
                subheader={
                    <Typography
                        fontSize="0.9rem"
                        fontWeight={400}
                        textTransform="capitalize"
                        color="rgba(0, 0, 0, 0.8)">
                        {item.jobRole}
                        <br />
                        <span
                            style={{
                                fontSize: "12px",
                                fontWeight: 500,
                            }}>
                            {item.location}
                        </span>
                    </Typography>
                }
            />

            {/* Content */}
            <Collapse
                in={expanded}
                timeout="auto"
                collapsedSize={250}
                ref={ref}>
                <CardContent sx={{ p: 0 }}>
                    <Typography
                        fontSize={14}
                        fontWeight={400}
                        mb={2}
                        color="rgb(77, 89, 106)">
                        {getSalary(
                            item.minJdSalary,
                            item.maxJdSalary,
                            item.salaryCurrencyCode
                        )}
                        <span> ✅</span>
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                        About Company:
                    </Typography>
                    <Typography variant="body2">
                        {item.jobDetailsFromCompany}
                    </Typography>
                </CardContent>
            </Collapse>

            {/* Footer */}
            <CardActions
                sx={{
                    width: "100%",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    px: 0,
                    pt: 3,
                }}>
                <Box width="100%">
                    {viewButton ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="end"
                            width="100%"
                            height="7rem"
                            position="absolute"
                            top="-7rem"
                            sx={
                                !expanded
                                    ? {
                                          ...{
                                              background:
                                                  "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
                                          },
                                      }
                                    : {}
                            }>
                            <Button
                                variant="text"
                                onClick={handleClick}
                                sx={{
                                    textTransform: "none",
                                    height: "1rem",
                                    fontWeight: 400,
                                }}>
                                View {expanded ? "less" : "more"}
                            </Button>
                        </Box>
                    ) : (
                        ""
                    )}
                    <Typography
                        fontSize="0.85rem"
                        fontWeight={600}
                        color="#8b8b8b"
                        letterSpacing="1px">
                        Minimum Experience
                    </Typography>
                    <Typography
                        fontSize="0.9rem"
                        fontWeight={400}
                        color="rgba(0, 0, 0, 0.8)">
                        {item.minExp ? `${item.minExp} years` : "Not required"}
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            mt: 2,
                            backgroundColor: "rgb(85, 239, 196)",
                            color: "black",
                            p: 0,
                        }}>
                        <Link
                            href={item.jdLink}
                            target="_blank"
                            style={{
                                textDecoration: "none",
                                padding: "0.5rem",
                                width: "100%",
                            }}>
                            ⚡ Easy Apply
                        </Link>
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}
