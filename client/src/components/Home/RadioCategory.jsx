import 'antd/es/collapse/style/index.css';
import 'antd/es/radio/style/index.css';
import React, {useState} from "react";
//import Axios from "axios";
import {Collapse, Radio} from "antd";
const { Panel } = Collapse;

const category = [
    {
        "_id": 0,
        "name": "Any"
    },
    {
        "_id": 1,
        "name": "Mens Wear"
    },
    {
        "_id": 2,
        "name": "Ladies Wear"
    },
    {
        "_id": 3,
        "name": "Foot Wear"
    },
    {
        "_id": 4,
        "name": "Kids Wear"
    },
    {
        "_id": 5,
        "name": "Accessories"
    }
];


function RadioCategory(props) {


    const [Value, setValue] = useState('0');
    //const [ValuePass, setValuePass] = useState('Any');

    const renderRadioBox = () => (
        category.map((value) => (
            <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
        ))
    );

    const handleChange = (event) => {
        setValue(event.target.value);

        if (event.target.value === '0'){
            props.handleFilters('Any')
        } else if (event.target.value === '1'){
            props.handleFilters('Mens Wear')
        } else if (event.target.value === '2'){
            props.handleFilters('Ladies Wear')
        } else if (event.target.value === '3'){
            props.handleFilters('Foot Wear')
        } else if (event.target.value === '4'){
            props.handleFilters('Kids Wear')
        } else if (event.target.value === '5'){
            props.handleFilters('Accessories')
        }

        //console.log(event.target.value);

    };


    return(
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Category" key="1">
                    <Radio.Group onChange={handleChange} value={Value}>

                        {renderRadioBox()}

                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )

}

export default RadioCategory;