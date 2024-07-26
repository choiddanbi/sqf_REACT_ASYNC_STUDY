import React, { useState } from 'react';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import ReactModal from 'react-modal';
ReactModal.setAppElement("#root");


const layout = css`
    box-sizing: border-box;
    margin-bottom: 20px;
    border-bottom: 2px solid #dbdbdb;
`;


function ComputerPage(props) {
    // 수정창 모달 > false 면 닫기
    const [ isModalOpen, setModalOpen ] = useState(false);

    // 세부정보
    const [ computerDetail, setComputerDetail ] = useState({
        computerId: "",
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    }); 

    // 등록
    const [ registerComputer, setRegisterComputer ] = useState({
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    });

    // 수정
    const [ updateComputer, setUpdateComputer ] = useState({
        computerId: "",
        company: "",
        cpu: "",
        ram: "",
        ssd: ""
    });

    // 목록 - 조회
    const [ params, setParams ] = useState({
        company: "",
        cpu: ""
    });

    const [ computerList, setComputerList ] = useState([]);

    // 얘는 params 라는 함수(?)를 가져온거고.. 그 안에 params라는거를 값으로 넣을건데 키값이랑 이름이 같아서?????
    // 만약에 sparams, setParams였으면 axios.get(url, {"params": sparams});
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

    // 다건조회 - 검색(목록)
    const handleSearchClick = () => {

        requestComputerList();

        setParams({
            company: "",
            cpu: ""
        });
    }

    // 이벤트가 아닌 computerId를 매개변수로!!
    // computerid로 요청 >> 선택 누르면 단건조회 실행
    const handleSelectComputerClick = async (computerId) => {
        //console.log(computerId);
        const data = await requestGetComputer(computerId);
        if(!data) { 
            setComputerDetail({
                computerId: "",
                company: "",
                cpu: "",
                ram: "",
                ssd: ""
            });
            return;
        } 
        setComputerDetail(data);
    }

    // 단건조회 - 세부정보
    const requestGetComputer = async (computerId) => {
        let responseData = null;
        
        try{
            const response = await axios.get(`http://localhost:8080/api/v1/computer/${computerId}`) // 단건조회
            console.log(response);
            responseData = response.data;
        } catch(e) {
            console.log(e);
        }
        return responseData;
    }

    const handleRegisterInputChange = (e) => {
        setRegisterComputer(rc => {
            return  {
                ...rc,
                [e.target.name]: e.target.value
            }
        })

    }

    // 등록
    const handleRegisterSubmitClick = async () => {
        try{
            const response = await axios.post("http://localhost:8080/api/v1/computer", registerComputer); // 얘는 그냥 변수를 가져온거고
            //console.log(response.data);
            if(response.status == 200) { // if(response.data > 0) 도 가능
                alert("등록성공~~");
            }
        } catch(e) {
            console.log(e);
            alert("등록실패!!");
        }
    }

    // 삭제 - 목록
    const handleDeleteComputerClick = async (computerId) => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            await requestDeleteComputer(computerId);
            await requestComputerList(); // 삭제 후 다시 조회 >> alert이 없으면 await 생략 가능 (기다릴 필요 없으니까)
            alert("삭제 완료");
        }
    }

    // springboot로 보냄
    const requestDeleteComputer = async (computerId) => {
        let responseData = null;

        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/computer/${computerId}`);
            responseData = response.data;
        } catch(e)
        {
            console.log(e);
        }
        return responseData;
    }

    const closeModal = () => {
        setModalOpen(false);
        setUpdateComputer({
            computerId: "",
            company: "",
            cpu: "",
            ram: "",
            ssd: ""
        });
    }

    // 수정창 클릭
    const handleUpdateComputerClick = async (computerId) => {
        setModalOpen(true);
        const data = await requestGetComputer(computerId);
        setUpdateComputer(data); // 수정창 눌렀을때 내가 누른 거 값 받아오려고
    }

    // 수정 -> 확인 버튼 클릭
    const handleUpdateSubmitClick = async () => {
        await requestUpdateComputer(); // 수정하기
        await requestComputerList(); // 수정된 리스트로 보여주기
        closeModal();
    }

    // 수정값 springboot로 보내기
    const requestUpdateComputer = async () => {
        let responseData = null;

        try {
            const response = await axios.put(`http://localhost:8080/api/v1/computer/${updateComputer.computerId}`, updateComputer);
            responseData = response.data;
        } catch(e) {
            console.log(e);
        }

        return responseData;

    }

    // 수정입력받기
    const handleUpdateInputChange = (e) => {
        setUpdateComputer(uc => {
            return {
                ...uc,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div>
            <ReactModal 
                style={{
                    content: {
                        boxSizing: 'border-box',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%',
                        padding:'20px',
                        width: '400px',
                        height: '400px',
                        backgroundColor: '#fafafa'
                    }
                }}
                isOpen={isModalOpen}  
                onRequestClose={closeModal}  
            >
                <div css={css`
                    display: flex; 
                    flex-direction: column; 
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                `}>
                    <h2>컴퓨터 정보 수정</h2>
                    <input type="text" name='computerId' onChange={handleUpdateInputChange} value={updateComputer.computerId} disabled={true} />
                    <input type="text" name='company' placeholder='제조사' onChange={handleUpdateInputChange} value={updateComputer.company} />
                    <input type="text" name='cpu' placeholder='CPU' onChange={handleUpdateInputChange} value={updateComputer.cpu} />
                    <input type="text" name='ram' placeholder='RAM' onChange={handleUpdateInputChange} value={updateComputer.ram} />
                    <input type="text" name='ssd' placeholder='SSD' onChange={handleUpdateInputChange} value={updateComputer.ssd} />
                    <div>
                        <button onClick={handleUpdateSubmitClick}>확인</button>
                        <button onClick={() => closeModal()}>취소</button>
                    </div>
                </div>
            </ReactModal>

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
                                    <td><button onClick={() => handleSelectComputerClick(computer.computerId)}>선택</button></td> 
                                    <td>{computer.company}</td>
                                    <td><button onClick={() => handleUpdateComputerClick(computer.computerId)}>수정</button></td>
                                    <td><button onClick={() => handleDeleteComputerClick(computer.computerId)}>삭제</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </div>


            <div css={layout}>
                <h2>세부정보</h2>
                <ul>
                    <li>ID: {computerDetail.computerId}</li>
                    <li>제조사: {computerDetail.company}</li>
                    <li>CPU: {computerDetail.cpu}</li>
                    <li>RAM: {computerDetail.ram}</li>
                    <li>SSD: {computerDetail.ssd}</li>
                </ul>
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
        </div>
    );
}

export default ComputerPage;