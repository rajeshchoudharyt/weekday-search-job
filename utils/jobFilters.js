// Role filter
function applyRoleFilter(items, filters) {
    if (filters.roles.length > 0) {
        let data = [];
        for (let obj of filters.roles) {
            data.push(
                ...items.filter(
                    (item) =>
                        item.jobRole.toLowerCase() === obj.role.toLowerCase()
                )
            );
        }
        return data;
    } else return items;
}

// Location or remote filter
function applyLocationFilter(items, filters) {
    if (filters.locations.length > 0) {
        let data = [];
        for (let location of filters.locations) {
            data.push(
                ...items.filter(
                    (item) =>
                        item.location.toLowerCase() === location.toLowerCase()
                )
            );
        }
        return data;
    } else return items;
}

// Min Base Pay Filter
function applyMinBasePayFilter(items, filters) {
    if (filters.minBasePay) {
        const data = items.filter((item) =>
            item.minJdSalary
                ? item.minJdSalary >= Number(filters.minBasePay.slice(0, -1))
                : Number(filters.minBasePay.slice(0, -1)) <= item.maxJdSalary
        );

        return data;
    } else return items;
}

// Min Experience Filter
function applyMinExperienceFilter(items, filters) {
    if (filters.minExperience) {
        const data = items.filter(
            (item) => item.minExp >= Number(filters.minExperience)
        );
        return data;
    } else return items;
}

// Company Name Filter
function applyCompanyNameFilter(items, filters) {
    const regex = new RegExp(filters.companyName, "i");

    if (filters.companyName) {
        const data = items.filter((item) => regex.test(item.companyName));
        return data;
    } else return items;
}

export default function applyFilters(items, filters) {
    let data = [...items];
    data = applyMinExperienceFilter(data, filters);

    if (data.length === 0) return data;
    data = applyMinBasePayFilter(data, filters);

    if (data.length === 0) return data;
    data = applyLocationFilter(data, filters);

    if (data.length === 0) return data;
    data = applyRoleFilter(data, filters);

    if (data.length === 0) return data;
    return applyCompanyNameFilter(data, filters);
}
