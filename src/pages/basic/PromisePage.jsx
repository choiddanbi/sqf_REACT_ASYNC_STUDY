import React from 'react';

function PromisePage(props) {

    const loop = (name) => {
        // random : 0 < random < 1 인 값들 ex) 0.1234878445
        // floor : 버림
        const random = Math.floor(Math.random() * 100) + 1;
        for(let i = 0; i < random; i++) {
            console.log(`${name}: ${i}`);
        }
    }

    const testPromise = () => {
        return new Promise((resolve, reject) => {
            loop("test1");
            resolve("test1반복 완료");
        });
    }

    const testPromise2 = () => {
        return new Promise((resolve, reject) => {
            loop("test2");
            resolve("test2반복 완료");
        });
    }
    
    const testPromise3 = () => {
        return new Promise((resolve, reject) => {
            loop("test3");
            resolve("test3반복 완료");
        });
    }

    // 4, 5 동일코드
    const testPromise4 = (num) => {
        return new Promise((resolve, reject) => {
            console.log("test4");
            if(num === 0) {
                reject("test4 오류!!!");
                return;
            }
            resolve("test4 성공~~~");
        });
    }

    const testPromise5 = async (num) => {
        console.log("test5");
        if(num === 0) {
            throw new Error("test5 오류!!!");
        }
        return "test5 성공~~~"
    }



    const handleClick1 = () => {
        /* 비동기
        loop1 -> loop2 -> loop3 -> resolve1 -> resolve2 -> resolve3
        testPromise().then(r => console.log(r));
        testPromise2().then(r => console.log(r));
        testPromise3().then(r => console.log(r));
        */

    // loop1 -> resolve1 -> loop2 -> resolve2 -> loop3 -> resolve3
    // 비동기 -> 동기
        testPromise().then(r => {
            console.log(r);
            testPromise2().then(r => {
                console.log(r);
                testPromise3().then(r => { 
                    console.log(r)
                });
            });
       });
    }

    // 비동기 --> 동기 await
    // loop1 -> resolve1 -> loop2 -> resolve2 -> loop3 -> resolve3
    const handleClick2 = async () => {
        const r = await testPromise();
        console.log(r);
        const r2 = await testPromise2();
        console.log(r2);
        const r3 = await testPromise3();
        console.log(r3);
    }


    const handleClick3 = () => {
        testPromise4(0)
        .then(r => {
            console.log(r);
            testPromise5(0)
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.log(e);
            });
        })
        .catch(e => {
            console.log(e);
            testPromise5(0)
            .then(r => {
                console.log(r);
            })
            .catch(e => {
                console.log(e);
            });
        });
    }



    // 비동기를 동기로
    const handleClick4 = async () => {
        try {
            const r = await testPromise4(0);
            console.log(r);
        } catch(e) {
            console.error(e);
        }

        try {
            const r = await testPromise5(0);
            console.log(r);
        } catch(e) {
            console.log(e);
        }
    }



    return (
        <div>
            <button onClick={handleClick1}>버튼1</button>
            <button onClick={handleClick2}>버튼2</button>
            <button onClick={handleClick3}>버튼3</button>
            <button onClick={handleClick4}>버튼4</button>
        </div>
    );
}

export default PromisePage;