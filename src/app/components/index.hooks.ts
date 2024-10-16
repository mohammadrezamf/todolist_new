import {FormTypes} from "@/app/components/index.types";

const useFilterByField = (searchTerm: string) => {
    const filterByField: { [key: string]: (item: FormTypes) => boolean } = {
        title: (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        time: (item) => item.time.toLowerCase().includes(searchTerm.toLowerCase()),
        status: (item) => {
            const statusString = item.status ? "completed" : "pending";
            return statusString.toLowerCase().includes(searchTerm.toLowerCase());
        },
        severity: (item) =>
            item.severity.toLowerCase().includes(searchTerm.toLowerCase()),
    };

    return filterByField;
};

export default useFilterByField;