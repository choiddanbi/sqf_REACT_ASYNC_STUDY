import React, { useState } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';

const layout = css`
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 2px solid #dbdbdb;
`;



function ComputerPage(props) {

    const [ registerComputer, setRegisterComputer ] = useState({
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    });

    const [ params, setParams ] = useState({
        company: "",
        cpu: ""
    });

    const [ computerList, setComputerList ] = useState([]);

    // 롸... 모르게써
    // 왜 get url 옆에 {params} 로 들어오는지...
    const requestComputerList = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/computers", {
                params // "params": params
            });
            setComputerList(response.data);
            //console.log(response);
        } catch(e) {
            console.log(e);
        }
    }


    const handleSearchInputChange = (e) => {
        setParams(p => {
            return {
                ...p,
                [e.target.name]: e.target.value
            }
        })
    }

    // 검색
    const handleSearchClick = () => {

        requestComputerList();

        setParams({
            company: "",
            cpu: ""
        });
    }


    const handleRegisterInputChange = (e) => {
        setRegisterComputer(rc => {
            return  {
                ...rc,
                [e.target.name]: e.target.value
            }
        })

    }

    const handleRegisterSubmitClick = async () => {
        try{
            const response = await axios.post("http://localhost:8080/api/v1/computer", registerComputer);
            //console.log(response.data);
            if(response.status == 200) { // if(response.data > 0) 도 가능
                alert("등록성공~~");
            }
        } catch(e) {
            console.log(e);
            alert("등록실패!!");
        }
    }

    return (
        <div>
            <div css={layout}>
                <h2>목록</h2>
                <p>
                    <input type="text" name='company' onChange={handleSearchInputChange} value={params.company} placeholder='제조사'/>
                    <input type="text" name='cpu' onChange={handleSearchInputChange} value={params.cpu} placeholder='CPU'/>
                    <button onClick={handleSearchClick}>조회</button>
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>ID</th>
                            <th>제조사</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            computerList.map(computer => 
                                <tr key={computer.computerId}>
                                    <td><button>선택</button></td>
                                    <td>{computer.computerId}</td>
                                    <td>{computer.company}</td>
                                    <td><button>수정</button></td>
                                    <td><button>삭제</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </div>


            <div css={layout}>
                <h2>세부정보</h2>

            </div>

        
            <div css={layout}>
                <h2>등록</h2>
                <p>
                    <label htmlFor="">제조사</label>
                    <input type="text" 
                        name='company' 
                        onChange={handleRegisterInputChange}
                        value={registerComputer.company}
                    />
                </p>
                <p>
                    <label htmlFor="">CPU</label>
                    <input type="text" 
                        name='cpu' 
                        onChange={handleRegisterInputChange}
                        value={registerComputer.cpu}
                    />
                </p>
                <p>
                    <label htmlFor="">RAM</label>
                    <input type="text" 
                        name='ram' 
                        onChange={handleRegisterInputChange}
                        value={registerComputer.ram}
                    />
                </p>
                <p>
                    <label htmlFor="">SSD</label>
                    <input type="text" 
                        name='ssd' 
                        onChange={handleRegisterInputChange}
                        value={registerComputer.ssd}
                    />
                </p>
                <p>
                    <button onClick={handleRegisterSubmitClick}>등록하기</button>
                </p>
            </div>



            <div css={layout}>
                <h2>수정</h2>

            </div>
        </div>
    );
}

export default ComputerPage;