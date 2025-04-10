import { ref } from 'vue';

export function useFilters() {
    const searchText = ref('');
    const searchedColumn = ref('');

    const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
        confirm();
        searchText.value = selectedKeys[0];
        searchedColumn.value = dataIndex;
    };

    const handleReset = (clearFilters: any) => {
        clearFilters({ confirm: true });
        searchText.value = '';
    };

    return { searchText, searchedColumn, handleSearch, handleReset };
}