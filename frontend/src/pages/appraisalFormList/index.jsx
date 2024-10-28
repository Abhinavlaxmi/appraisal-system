import React, { useEffect, useState } from 'react';
import CustomButton from '../../components/Buttons/CustomButton';
import axios from '../../axiosinstances';
import { APIs } from '../../services/APIs';
import { useSelector } from 'react-redux';

const AppraisalFormList = () => {
  const [appraisalForms, setAppraisalForms] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [questions, setQuestions] = useState(['']);
  const role = useSelector((state) => state.auth.user?.role);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newForm = { title: formTitle, questions: questions.filter(q => q.trim() !== '') };
      await axios.post(`${APIs.createQuestion}`, newForm)
      allQuestions();
      resetForm();
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const allQuestions = async () => {
    try {
      const response = await axios.get(`${APIs?.getQuestions}`);
      setAppraisalForms(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    allQuestions();
  }, []);

  const resetForm = () => {
    setFormTitle('');
    setQuestions(['']);
  };

  const handleCancel = () => {
    resetForm();
    setIsPopupOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Appraisal Forms</h1>
        {role ==="admin" &&
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setIsPopupOpen(true)}
        >
          Add
        </button>}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <ul>
          {appraisalForms.map((form, index) => (
            <li key={index} className="p-2 border-b">
              <h2 className="font-semibold">{form.title}</h2>
              <ul>
                {form.questions.map((question, qIndex) => (
                  <li key={qIndex} className="text-gray-600">{question}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Create Appraisal Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Form Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter form title"
                />
              </div>

              <div className=' max-h-[40vh] overflow-y-auto'>
                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Question {index + 1}</label>
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      required
                      className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Enter question ${index + 1}`}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="text-blue-500 hover:underline mb-2"
                onClick={handleAddQuestion}
              >
                Add Another Question
              </button>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 mr-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create Form
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppraisalFormList;