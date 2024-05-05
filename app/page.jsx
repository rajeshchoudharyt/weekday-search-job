"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import NavigationMenu from "@/components/NavigationMenu";
import DropdownButton from "@/components/DropdownButton";

export default function Home() {
    const [remote, setRemote] = useState([]);
    const [experience, setExperience] = useState(null);
    const [minBasePay, setMinBasePay] = useState(null);
    const [location, setLocation] = useState([]);
    const [role, setRole] = useState([]);
    const [techStack, setTechStack] = useState([]);

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
        </Box>
    );
}
