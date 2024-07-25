import axios from 'axios';
import React, { useState } from 'react';

//2
function RegisterSizePage(props) {

    const [ size, setSize ] = useState({
        sizeName: ""
    });

    //3
    const handleInputChange = (e) => {
        setSize(size => {
            return {
                ...size,
                [e.target.name]: e.target.value
            }
        });
    }

    //4
    const handleSubmitClick = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/size", size)
        } catch(error) {
            console.log(error);
        }

        setSize(size => {
            return {
                sizeName: ""
            }
        });
    }


    //1
    return (
        <div>
            <h1>사이즈 등록 페이지</h1>
            <p>
                <label htmlFor="">사이즈이름</label>
                <input type="text" 
                    name='sizeName' 
                    onChange={handleInputChange}
                    value={size.sizeName}
                    />
            </p>
            <p>
                <button onClick={handleSubmitClick}>등록</button>
            </p>
        </div>
    );
}

export default RegisterSizePage;