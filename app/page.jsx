"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import NavigationMenu from "@/components/NavigationMenu";
import DropdownButton from "@/components/DropdownButton";
import JobContainer from "@/components/JobContainer";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function Home() {
    // Filter options
    const [minExperience, setMinExperience] = useState(null);
    const [minBasePay, setMinBasePay] = useState(null);
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [companyName, setCompanyName] = useState("");

    // Job Data
    const [jobItems, setJobItems] = useState([]); // Root
    const [jobItemsCopy, setJobItemsCopy] = useState([]); // Copy

    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(10);
    const [progress, setProgress] = useState(true);
    const ref = useRef();

    // Role filter
    const applyRoleFilter = () => {
        let items = [...jobItemsCopy];

        if (roles.length > 0) {
            let data = [];
            for (let obj of roles) {
                data.push(
                    ...items.filter(
                        (item) =>
                            item.jobRole.toLowerCase() ===
                            obj.role.toLowerCase()
                    )
                );
            }
            setJobItems(data);
        } else setJobItems(jobItemsCopy);
    };

    useEffect(() => {
        applyRoleFilter();
    }, [roles, jobItemsCopy]);
    //

    // Location or remote filter
    const applyLocationFilter = () => {
        let items = [...jobItemsCopy];

        if (locations.length > 0) {
            let data = [];
            for (let location of locations) {
                data.push(
                    ...items.filter(
                        (item) =>
                            item.location.toLowerCase() ===
                            location.toLowerCase()
                    )
                );
            }
            setJobItems(data);
        } else setJobItems(jobItemsCopy);
    };

    useEffect(() => {
        applyLocationFilter();
    }, [locations, jobItemsCopy]);
    //

    // Min Base Pay Filter
    const applyMinBasePayFilter = () => {
        let items = [...jobItemsCopy];

        if (minBasePay) {
            let data = [];
            data.push(
                ...items.filter((item) =>
                    item.minJdSalary
                        ? item.minJdSalary >= Number(minBasePay.slice(0, -1))
                        : Number(minBasePay.slice(0, -1)) <= item.maxJdSalary
                )
            );
            setJobItems(data);
        } else setJobItems(jobItemsCopy);
    };

    useEffect(() => {
        applyMinBasePayFilter();
    }, [minBasePay, jobItemsCopy]);
    //

    // Min Experience Filter
    const applyMinExperienceFilter = () => {
        let items = [...jobItemsCopy];

        if (minExperience) {
            let data = [];
            data.push(
                ...items.filter((item) => item.minExp >= Number(minExperience))
            );
            setJobItems(data);
        } else setJobItems(jobItemsCopy);
    };

    useEffect(() => {
        applyMinExperienceFilter();
    }, [minExperience, jobItemsCopy]);
    //

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
                setJobItemsCopy(result.jdList);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        };

        setIsLoading(true);
        getData();
        setIsLoading(false);
    }, []);

    // To update page data when scrolled to the end
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

            setJobItemsCopy((prev) => [...prev, ...result.jdList]);

            console.log(result);
        } catch (error) {
            console.log(error);
        }

        setOffset((prev) => prev + 10);
        setIsLoading(false);
    }, [isLoading, offset]);

    // To detect page scrolled to the end
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (jobItems.length > 0 && target.isIntersecting) {
                fetchData();
            }
        });

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [fetchData, jobItems]);
    //

    // To handle Company Name Search Bar
    const handleChange = (e) => {
        const value = e.target.value;
        setCompanyName(value);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            let items = [...jobItemsCopy];
            const regex = new RegExp(companyName, "i");

            if (companyName) {
                let data = [];
                data.push(
                    ...items.filter((item) => regex.test(item.companyName))
                );
                setJobItems(data);
            } else setJobItems(jobItemsCopy);
        }, 400);

        return () => clearTimeout(timeout);
    }, [companyName, jobItemsCopy]);
    //

    useEffect(() => {
        let timeout = null;
        if (jobItems.length === 0) {
            timeout = setTimeout(() => {
                setProgress(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [jobItems]);

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
                    label="Min Experience"
                    options={[
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                    ]}
                    value={minExperience}
                    setValue={setMinExperience}
                />

                <DropdownButton
                    label="Min Base Pay"
                    options={[
                        "0K",
                        "10K",
                        "20K",
                        "30K",
                        "40K",
                        "50K",
                        "60K",
                        "70K",
                        "80K",
                        "90K",
                        "100K",
                    ]}
                    value={minBasePay}
                    setValue={setMinBasePay}
                />

                <DropdownButton
                    label="Location / Remote"
                    options={[
                        "Bangalore",
                        "Delhi NCR",
                        "Mumbai",
                        "Chennai",
                        "Remote",
                    ]}
                    value={locations}
                    setValue={setLocations}
                    multiple={true}
                />

                <DropdownButton
                    label="Role"
                    options={[
                        { category: "ENGINEERING", role: "Backend" },
                        { category: "ENGINEERING", role: "Frontend" },
                        { category: "ENGINEERING", role: "Android" },
                        { category: "ENGINEERING", role: "Tech Lead" },
                        { category: "ENGINEERING", role: "Ios" },
                        {
                            category: "MARKETING",
                            role: "Digital Marketing Manager",
                        },
                        {
                            category: "MARKETING",
                            role: "Product Marketing Manager",
                        },
                    ]}
                    value={roles}
                    setValue={setRoles}
                    multiple={true}
                    groupedOptions={true}
                />

                <TextField
                    label="Company Name"
                    value={companyName}
                    onChange={handleChange}
                    size="small"
                    sx={{
                        position: "relative",
                        minWidth: "10rem",
                        width: "fit-content",
                        "& .MuiInputLabel-root": {
                            fontSize: "0.8rem",
                            marginTop: "0.2rem",
                        },
                    }}
                />
            </Box>

            <JobContainer items={jobItems} />
            {progress ? (
                <CircularProgress size="1.5rem" ref={ref} sx={{ mt: 2 }} />
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    No jobs found
                </Box>
            )}
        </Box>
    );
}
