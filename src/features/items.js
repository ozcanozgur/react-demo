import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
    loading: false,
    error: false,
    items: [],
    filteredItemsLength: 0,
    sortingBy: "priceLowToHigh",
    brands: [],
    selectedBrands: ["All"],
    allItemsLength: 0,
    basketItems: [],
    totalPrice: 0,
    activeItemType: "mug"
};

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setItems: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.items = payload.data;
            state.filteredItemsLength = payload.headers["x-total-count"];
        },
        setBrands: (state, { payload }) => {
            let brands, brand;

            if (state.brands.length == 0) {
                state.allItemsLength = payload.length

                brands = { "All": state.allItemsLength };

                payload.map((item) => {
                    brand = item.manufacturer;

                    if (!brands[brand]) {
                        brands[brand] = 1;
                    }
                    else {
                        brands[brand] = brands[brand] + 1;
                    }
                })
                state.brands = brands;
            }
        },
        setError: (state) => {
            state.error = true;
        },
        setSorting: (state, { payload }) => {
            state.sortingBy = payload;
        },
        setSelectedBrands: (state, { payload }) => {
            if (payload.length === 0) {
                state.selectedBrands = ["All"];
                return;
            }

            if (payload.includes("All") && payload.length > 1) {
                payload.splice(payload.indexOf("All"), 1);
            }

            state.selectedBrands = payload;
        },
        addBasket: (state, { payload }) => {
            let isAdded = false;

            state.basketItems.forEach((item) => {
                if (item.added == payload.added) {
                    item.qty++;
                    isAdded = true;
                }
            })

            if (!isAdded) {
                let newItem = {
                    "added": payload.added,
                    "name": payload.name,
                    "price": payload.price,
                    "qty": 1,
                }
                state.basketItems.push(newItem)
            }

            state.totalPrice += payload.price
        },
        removeBasket: (state, { payload }) => {
            state.basketItems.forEach((item, index) => {
                if (item.added == payload.added) {
                    if (item.qty > 1) {
                        item.qty--;

                    }
                    else {
                        state.basketItems.splice(index, 1)
                    }

                    state.totalPrice = Math.abs(state.totalPrice - payload.price)
                }
            })
        },
        setActiveItemType: (state, { payload }) => {
            state.activeItemType = payload;
        },
    },
});

export const { setLoading, setItems, setError, setSorting, setBrands, setSelectedBrands, setSelectedTags, addBasket, removeBasket, setActiveItemType } = itemSlice.actions;

export const itemsSelector = (state) => state.items;

export default itemSlice.reducer;

const api = axios.create({
    baseURL: "https://fake-server-react-demo.herokuapp.com/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

let isBrandsSetted;

export function fetchItems(sortingBy, selectedBrands, activeItemType, paginationInfo) {
    let order, sort, brands, url = "";
    let { currentPage } = paginationInfo;

    switch (sortingBy) {
        case "priceLowToHigh":
            sort = "price";
            order = "asc"
            break;
        case "priceHighToLow":
            sort = "price";
            order = "desc"
            break;
        case "newToOld":
            sort = "added";
            order = "desc"
            break;
        case "oldToNow":
            sort = "added";
            order = "asc"
            break;
    }

    url = `items?_start=${(currentPage - 1) * 16}&_limit=${16}&_sort=${sort}&_order=${order}&itemType=${activeItemType}`;

    if (selectedBrands[0] !== "All") {
        brands = "&manufacturer_like="
        url += brands + selectedBrands.join("&manufacturer_like=")
    }

    return async (dispatch) => {

        dispatch(setLoading());
        if (!isBrandsSetted) {
            await api.get("items")
                .then((response) => {
                    dispatch(setBrands(response.data));
                })
                .catch((er) => {
                    dispatch(setError(er));
                });
            isBrandsSetted = true;
        }

        if (isBrandsSetted) {
            api
                .get(url)
                .then((response) => {
                    dispatch(setItems(response));
                })
                .catch((er) => {
                    dispatch(setError(er));
                });
        }
    };
}