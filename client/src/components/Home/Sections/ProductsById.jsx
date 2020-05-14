import 'antd/es/checkbox/style/index.css';
import 'antd/es/collapse/style/index.css';
import React, {useState} from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

const categories = [
    {
        "_id": 1,
        "name": "Shirts"
    },
    {
        "_id": 2,
        "name": "T-Shirts"
    },
    {
        "_id": 3,
        "name": "Trousers"
    },
    {
        "_id": 4,
        "name": "Shorts"
    },
    {
        "_id": 5,
        "name": "Sarongs"
    },
];

function ProductsById(props) {

    const [Category, setCategory] = useState([]);

    const handleCategory = (value) => {

        const currentIndex = Category.indexOf(value);
        const newCategory = [...Category];

        if (currentIndex === -1){
            newCategory.push(value)
        } else {
            newCategory.splice(currentIndex, 1)
        }

        setCategory(newCategory)
        props.handleFilters(newCategory)

    };

    return(
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel key="1" header>
                    {categories.map((value, index) => (
                      <React.Fragment key={index}>
                          <Checkbox
                              type="checkbox"
                              onChange={() => handleCategory(value._id)}
                              checked={Category.indexOf(value._id) === -1 ? false : true}
                          />
                          <span>{value.name}</span>
                      </React.Fragment>
                    ))}
                </Panel>
            </Collapse>
        </div>
    )

}

export default ProductsById;