const baseURL = 'http://localhost:4040'; 

export const APIs = {
    baseURL: 'http://localhost:4040',
    otpServiceApi: `${baseURL}/api/appraisals`,
    getUsers: `${baseURL}/api/users`,
    userRegistration: `${baseURL}/api/auth/register`,
    bypassRegistration: `${baseURL}/api/auth/bypass/register`,
    createQuestion: `${baseURL}/api/questions/create`,
    getQuestions: `${baseURL}/api/questions/get`,
    createAssociation: `${baseURL}/api/formAssociation/create`,
    getAllAssociation: `${baseURL}/api/formAssociation/get-all`,
  };
  