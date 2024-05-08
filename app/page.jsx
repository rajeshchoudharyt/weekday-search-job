"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import NavigationMenu from "@/components/NavigationMenu";
import DropdownButton from "@/components/DropdownButton";
import JobContainer from "@/components/JobContainer";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

import applyFilters from "@/utils/jobFilters";

const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

export default function Home() {
    // Job Data
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);

    // Filter options data
    const [filters, setFilters] = useState({
        minExperience: null,
        minBasePay: null,
        companyName: "",
        locations: [],
        roles: [],
    });

    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(10);
    const ref = useRef();

    //
    // Data initialization
    const getData = async () => {
        const body = JSON.stringify({ limit: 10, offset: 0 });

        try {
            const response = await fetch(
                "https://api.weekday.technology/adhoc/getSampleJdJSON",
                { ...options, body }
            );
            const result = await response.json();

            setFilteredData(result.jdList);
            setData(result.jdList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getData();
        setIsLoading(false);
    }, []);

    //
    // Apply filters
    useEffect(() => {
        const items = applyFilters([...data], filters);
        setFilteredData(items);
    }, [filters, data]);

    //
    // To update data on page scroll
    const fetchData = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        const body = JSON.stringify({ limit: 10, offset: offset });
        try {
            const response = await fetch(
                "https://api.weekday.technology/adhoc/getSampleJdJSON",
                { ...options, body }
            );
            const result = await response.json();
            setData((prev) => [...prev, ...result.jdList]);
        } catch (error) {
            console.log(error);
        }

        setOffset((prev) => prev + 10);
        setIsLoading(false);
    }, [isLoading, offset]);

    //
    // Observe on page scroll - Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) fetchData();
        });
        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [fetchData]);

    //
    // To handle filter options on change
    const handleChange = (value, key) => {
        const filterData = { ...filters };
        filterData[key] = value;
        setFilters(filterData);
    };

    //
    // To handle company name filter option on change
    const handleSearchChange = (e) => {
        const filtersOptions = { ...filters };
        filtersOptions.companyName = e.target.value;
        setFilters(filtersOptions);
    };

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
                    value={filters.minExperience}
                    onChange={handleChange}
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
                    value={filters.minBasePay}
                    onChange={handleChange}
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
                    value={filters.locations}
                    onChange={handleChange}
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
                    value={filters.roles}
                    onChange={handleChange}
                    multiple={true}
                    groupedOptions={true}
                />

                <TextField
                    label="Company Name"
                    value={filters.companyName}
                    onChange={handleSearchChange}
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

            <JobContainer items={filteredData} />
            <CircularProgress size="1.5rem" ref={ref} sx={{ mt: 2 }} />
        </Box>
    );
}
