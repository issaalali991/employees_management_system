import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';
function AddDepartment() {
  const [sending, setSending] = useState(false);
  const [data, setData] = useState({
    dep_name: '',
    description: '',
  });
  const navigate = useNavigate();
  const VITE_APP_API_BASE_URL=import.meta.env.VITE_APP_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post(
        `${VITE_APP_API_BASE_URL}/employee/registerdep`,
        data,
      );
      if (response.status === 201) {
        setData({
          dep_name: '',
          description: '',
        });
        setSending(false);
        toast.success('Department Added');
      }
    } catch (error) {
      setSending(false);
      toast.error(error.response.data.error);
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  if (sending) {
    return (
      <div className=''>
        <SpinnerDotted
          size={50}
          thickness={100}
          speed={100}
          color='rgba(57, 107, 172, 1)'
        />
      </div>
    );
  }
  return  (
    <div className='container mx-auto max-w-md mt-20 rounded-xl shadow-xl shadow-gray-500'>
      <div className='p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Add Department</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <p className='block mb-2'>Department Name:</p>
            <input
              type='text'
              name='dep_name'
              value={data.dep_name}
              onChange={handleChange}
              className='border rounded w-full p-2'
            />
          </div>
          <div className='mb-4'>
            <p className='block mb-2'>description:</p>
            <input
              type='text-area'
              name='description'
              value={data.description}
              onChange={handleChange}
              className='border rounded w-full p-2 h-40'
            />
          </div>
         

          <button
            type='submit'
            className='bg-blue-500 text-white rounded p-2 mt-4'
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddDepartment;



