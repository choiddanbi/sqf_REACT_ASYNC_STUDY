import React from 'react';
import useInput from '../../hooks/useInput';
import axios from 'axios';

function PostPage(props) {
    const schoolNameInput = useInput();
    const departmentInput = useInput();
    const gradeInput = useInput();
    const nameInput = useInput();

    const schoolNameInput2 = useInput();
    const phoneInput = useInput();
    const addressInput = useInput();
    const nameInput2 = useInput();

    const handleSubmit = () => {
        const student = {
            schoolName : schoolNameInput.value,
            department : departmentInput.value,
            grade : gradeInput.value,
            name : nameInput.value
        }

        const teacher = {
            schoolName2 : schoolNameInput2.value,
            phone : phoneInput.value,
            address : addressInput.value,
            name2 : nameInput2.value
        }

        /*fetch("http://localhost:8080/basic/student", {
            method: "post", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        }).then(response => {
            response.json().then(responseData => {
                console.log(responseData);
            })
        })*/
        
        // react -> springboot 로 보냄 (객체를 json으로 변환해서)
        // 비동기 -> 동기로
        axios.post("http://localhost:8080/basic/student", student)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });


        axios.post("http://localhost:8080/basic/teacher", teacher)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }


    return (
        <>
            <header>
                <h1>비동기 데이터 통신(POST)</h1>
            </header>
            <main>
                <h3>학생정보</h3>
                <p>
                    <label htmlFor="">학교명: </label>
                    <input type="text" 
                        onChange={schoolNameInput.onChange} 
                        value={schoolNameInput.value} />
                </p>
                <p>
                    <label htmlFor="">학과명: </label>
                    <input type="text" 
                        onChange={departmentInput.onChange} 
                        value={departmentInput.value} />
                </p>
                <p>
                    <label htmlFor="">학년: </label>
                    <input type="text" 
                        onChange={gradeInput.onChange} 
                        value={gradeInput.value} />
                </p>
                <p>
                    <label htmlFor="">이름: </label>
                    <input type="text" 
                        onChange={nameInput.onChange} 
                        value={nameInput.value} />
                </p>
                <p>
                    <button onClick={handleSubmit}>전송</button>
                </p>


                <h3>선생님정보</h3>
                <p>
                    <label htmlFor="">학교명: </label>
                    <input type="text" 
                        onChange={schoolNameInput2.onChange} 
                        value={schoolNameInput2.value} />
                </p>
                <p>
                    <label htmlFor="">연락처: </label>
                    <input type="text" 
                        onChange={phoneInput.onChange} 
                        value={phoneInput.value} />
                </p>
                <p>
                    <label htmlFor="">주소: </label>
                    <input type="text" 
                        onChange={addressInput.onChange} 
                        value={addressInput.value} />
                </p>
                <p>
                    <label htmlFor="">이름: </label>
                    <input type="text" 
                        onChange={nameInput2.onChange} 
                        value={nameInput2.value} />
                </p>
                <p>
                    <button onClick={handleSubmit}>전송</button>
                </p>
            </main>
        </>
    );
}

export default PostPage;