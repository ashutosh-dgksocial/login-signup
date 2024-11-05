import { useEffect, useState } from "react";
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SubmitChangeEvent = React.ChangeEvent<HTMLFormElement>;

const ToDo = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [originalArr, setOriginalArr] = useState<string[]>(() => {
        const getlocal = localStorage.getItem('localstore') ?? "[]";
        return JSON.parse(getlocal); // Do not need to check empty or not 
    });
    const [indexSaver, setIndexSaver] = useState<number | null>(null);
    const [edit, setEdit] = useState<boolean>(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
    const [isEditBtnDisabled, setIsEditBtnDisabled] = useState<boolean>(false);


    // useEffect(() => {
    //     const myLocal = localStorage.getItem('localstore') ?? "[]"; //string '[]'
    //     const parseMylocal = JSON.parse(myLocal) // []
    //     if (parseMylocal.length > 0) { // need to check empty or not 
    //         setOriginalArr(parseMylocal); // store into array
    //     }
    // }, []);

    useEffect(() => {
        localStorage.setItem('localstore', JSON.stringify(originalArr));
    }, [originalArr]);

    const handleInput = (e: InputChangeEvent) => {
        const value = e.target.value;
        if (!value.trim()) {
            setIsBtnDisabled(true);

        }
        setInputValue(value);
        setIsBtnDisabled(value.trim() === "");
    };

    const handleSubmit = (e: SubmitChangeEvent) => {
        e.preventDefault();
        const TrimedInpData = inputValue.trim();
        if (!TrimedInpData) return;
        if (TrimedInpData.length > 50) {
            alert('text should be less then 50 letters')
            return
        }
        if (originalArr.includes(TrimedInpData)) {
            alert('This text alreay taken')
            return;
        };

        setOriginalArr([...originalArr, TrimedInpData]);
        setInputValue('');
        setIsBtnDisabled(true);
    };

    const handleUpdate = (e: SubmitChangeEvent) => {
        e.preventDefault();
        if (indexSaver === null) {
            alert("Invalid task index");
            return;
        }
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) {
            alert('Cannot update with an empty task');
            return;
        }
        const copyOfarr = [...originalArr];
        copyOfarr[indexSaver] = trimmedValue;

        setOriginalArr(copyOfarr);
        setIndexSaver(null);
        setEdit(false); // Hide the Update button (or toggle add btn)
        setInputValue('');
        setIsEditBtnDisabled(false)

    };

    const handleDelete = (myindex: number) => {
        const copyOfarr = [...originalArr];
        // copyOfarr.splice(myindex, 1);
        // setOriginalArr(copyOfarr);
        const filteredArr = copyOfarr.filter((_, index) => index !== myindex) // condition 2 !== 2 --removed
        setOriginalArr(filteredArr);
    };

    const handleEdit = (index: number) => {
        setIsEditBtnDisabled(true);
        if (index < 0 || index >= originalArr.length) {
            alert("Invalid task index");
            return;
        }
        setIndexSaver(index);
        setEdit(true);
        const selectedValue = originalArr[index].trim();
        setInputValue(selectedValue);
        setIsBtnDisabled(selectedValue.trim() === "" ? true : false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black-300">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">My To-Do List</h1>

                <form onSubmit={edit === true ? handleUpdate : handleSubmit} className="flex flex-col items-center gap-4">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={inputValue}
                        onChange={handleInput}
                        className="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-2 w-full">
                        {!edit ? (
                            <button
                                type="submit"
                                disabled={isBtnDisabled}
                                className={`w-full cursor-pointer px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 ${isBtnDisabled ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed" : ""}`}
                            >
                                Add Task
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isBtnDisabled}
                                className={`w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 ${isBtnDisabled ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed" : ""}`}
                            >
                                Update Task
                            </button>
                        )}
                    </div>
                </form>

                <div className="mt-6 h-auto max-h-[20rem] overflow-y-auto">
                    <h2 className="text-xl font-medium text-gray-800 mb-2">Tasks:</h2>
                    <div className="space-y-3 ">
                        {originalArr.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-200 rounded-lg shadow-sm">
                                <span className="text-lg font-medium text-gray-700 line-clamp-1">{index + 1}. {item}</span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(index)}
                                        disabled={isEditBtnDisabled}
                                        className={`px-3 py-1 cursor-pointer text-sm font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600 ${isEditBtnDisabled === true ? "!cursor-not-allowed !bg-gray-300 !hover:bg-gray-300" : ''}`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        disabled={isEditBtnDisabled}
                                        className={`px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600  ${isEditBtnDisabled === true ? "!cursor-not-allowed !bg-gray-300 !hover:bg-gray-300" : ''}`}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ToDo;
