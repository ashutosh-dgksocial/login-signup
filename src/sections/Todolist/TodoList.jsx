import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBack2Line } from "react-icons/ri";
const TodoList = () => {

  const [inputData, setInputData] = useState("");
  const [value, setValue] = useState([]); // ['apple', 'ball', 'banana', 'orange', 'pineapple']
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleOnchnage = (e) => {
    setInputData(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData === "") {
      alert('ops! your have to enter text...')
      return
    }
    const TrimedValue = [...value, inputData.trim()]
    setValue(TrimedValue);
    setInputData("");
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    // const value = ['apple', 'ball', 'banana', 'orange', 'pineapple']
    const copyValueArr = [...value];
    copyValueArr[editIndex] = inputData.trim();
    setValue(copyValueArr);
    setInputData('');
    setIsEdit(false);
    setEditIndex(null);
  }
  // Edit btn
  const handleEdit = (myindex) => {
    setEditIndex(myindex);
    setInputData(value[myindex].trim()); // trim not working
    setIsEdit(true)
  }


  const handleDelete = (myindex) => {
    const copyValueArr = [...value];
    const deletedArr = copyValueArr.filter((data) => data !== copyValueArr[myindex]); // agar data 'banana' ke baraar hai to new array me dalo or agar iske barabar nahi hai to array se remove kar do 
    setValue(deletedArr);
    // copyValueArr.splice(myindex, 1);
    // setValue(copyValueArr);
  }

  useEffect(() => {
    // console.log('myvalue=', value)
    // console.log('myinptData:', inputData)
    // console.log('stringINdex ', isEdit)

  }, [])
  return (
    <div className="flex md:flex-row flex-col h-lvh items-center justify-evenly gap-5">
      {/* second div */}

      <div className="mx-2 flex h-auto w-full md:w-2/4 items-center rounded-[4px]">
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="mx-auto flex flex-col justify-center gap-4"
        >
          <p className="text-4xl" htmlFor="todobox">
            Enter Your todo list
          </p>
          <input
            type="text"
            name="todobox"
            placeholder="Enter you task"
            onChange={handleOnchnage}
            value={inputData}
            className="w-[100%] border border-white bg-transparent px-4 py-2 text-2xl caret-neutral-50"
          />
          {isEdit !== true ?
            (
              <button
                className="w-[100%] border-2 border-white py-3 duration-300 hover:border-black hover:bg-white hover:text-black"
                type="submit" // onClick ke jagah ye
              >
                ADD
              </button>
            ) :
            (<button
              className="w-[100%] border-2 border-white py-3 duration-300 hover:border-black hover:bg-white hover:text-black"
              onClick={handleUpdate}
            >
              Update
            </button>)
          }
        </form>
      </div>
      {/* second div */}
      <div className="overflow-y-auto mx-2 py-5 flex flex-col gap-5 h-full md:w-2/4 w-full border-0 md:border-l-2 border-white px-6 text-2xl">
        <h2 className="text-3xl">(-_-) Your data Goes down here</h2>
        {value.map((data, index) => (
          <ol
            key={index}
            className="text-white space-y-4 "
          >
            <li className="flex flex-col gap-4">
              <span className="mr-2">{index}. <span>{data}</span></span>

              <span onClick={() => { handleEdit(index) }}><FiEdit className="ml-3 cursor-pointer text-green-600" /></span>
              <span onClick={() => { handleDelete(index) }}><RiDeleteBack2Line className="ml-3 cursor-pointer text-red-600" /></span>
            </li>
            <br />
          </ol>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
