import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MedicationList from "./MedicationList";
import {useDispatch, useSelector} from "react-redux";
import {fetchShops, selectShop} from "../redux/shopSlice"; // Import Bootstrap CSS
import useAxios from "../hooks/useAxios";
import axios from "axios";
const ShopsList = () => {
    const shopsData = useSelector(selectShop);
    const [selected, setSelected] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchShops());
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if(shopsData.length > 0){
            setSelected(shopsData[0])
        }
    }, [shopsData])

    return (
        <div className="container mt-4">
            <h1>Shops: </h1>
            <div className="row">
                {/* Left column for shops */}
                <div className="col-md-6">
                    <ul className="list-group">
                        {shopsData.map((shop, index) => (
                            <li
                                key={index}
                                className={`list-group-item m-2 p-3 rounded pe-auto${selected === shop ? 'bg-blue text-bg-danger' : ''}`}
                                style={{cursor:'pointer'}}
                                onClick={() => setSelected(shop)}
                            >
                                <h2>{shop.name}</h2>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right column for medications */}
                <div className="col-md-6">
                    <MedicationList selectedShop={selected} />
                </div>
            </div>
        </div>
    );
};

export default ShopsList;