import React, { useState } from 'react';

function useInput() {
    const [ value, setValue ] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    } // input 창의 값
    return { value, setValue, onChange };
}

export default useInput;