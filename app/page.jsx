"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import NavigationMenu from "@/components/NavigationMenu";
import DropdownButton from "@/components/DropdownButton";
import JobContainer from "@/components/JobContainer";
import CircularProgress from "@mui/material/CircularProgress";

const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function Home() {
    const [remote, setRemote] = useState([]);
    const [experience, setExperience] = useState(null);
    const [minBasePay, setMinBasePay] = useState(null);
    const [location, setLocation] = useState([]);
    const [role, setRole] = useState([]);
    const [techStack, setTechStack] = useState([]);
    const [jobItems, setJobItems] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(10);
    const ref = useRef();

    useEffect(() => {
        const getData = async () => {
            const body = {
                body: JSON.stringify({
                    limit: 10,
                    offset: 0,
                }),
            };

            try {
                const response = await fetch(
                    "https://api.weekday.technology/adhoc/getSampleJdJSON",
                    { ...options, ...body }
                );
                const result = await response.json();

                setJobItems(result.jdList);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        };

        setIsLoading(true);
        getData();
        setIsLoading(false);
    }, []);

    // To detect end of page for infinite scrolling
    const fetchData = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);

        const body = {
            body: JSON.stringify({
                limit: 10,
                offset: offset,
            }),
        };

        try {
            const response = await fetch(
                "https://api.weekday.technology/adhoc/getSampleJdJSON",
                { ...options, ...body }
            );
            const result = await response.json();

            setJobItems((prev) => [...prev, ...result.jdList]);

            console.log(result);
        } catch (error) {
            console.log(error);
        }

        setOffset((prev) => prev + 10);
        setIsLoading(false);
    }, [isLoading, offset]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) fetchData();
        });

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [fetchData]);

    //

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

            <Box display="flex" flexWrap="wrap" gap="0.4rem" width="100%">
                <DropdownButton
                    label="Remote"
                    options={["Remote", "Hybrid", "In-office"]}
                    value={remote}
                    setValue={setRemote}
                    multiple={true}
                />

                <DropdownButton
                    label="Experience"
                    options={["1", "2", "3", "4"]}
                    value={experience}
                    setValue={setExperience}
                />

                <DropdownButton
                    label="Min Base Pay"
                    options={["0L", "10L", "20L", "30L"]}
                    value={minBasePay}
                    setValue={setMinBasePay}
                />

                <DropdownButton
                    label="Location"
                    options={["Bangalore", "Delhi", "India"]}
                    value={location}
                    setValue={setLocation}
                    multiple={true}
                />

                <DropdownButton
                    label="Role"
                    options={[
                        { category: "ENGINEERING", role: "Backend" },
                        { category: "ENGINEERING", role: "Frontend" },
                        { category: "ENGINEERING", role: "Fullstack" },
                        {
                            category: "MARKETING",
                            role: "Digital Marketing Manager",
                        },
                        {
                            category: "MARKETING",
                            role: "Product Marketing Manager",
                        },
                    ]}
                    value={role}
                    setValue={setRole}
                    multiple={true}
                    groupedOptions={true}
                />

                <DropdownButton
                    label="Tech Stack"
                    options={["Python", "JavaScript", "Java"]}
                    value={techStack}
                    setValue={setTechStack}
                    multiple={true}
                />
            </Box>

            <JobContainer items={jobItems} />

            <CircularProgress size="1.5rem" ref={ref} />
        </Box>
    );
}
