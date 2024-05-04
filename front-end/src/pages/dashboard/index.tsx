import { StudentDashboardPage } from "./studentDashboard";
import { LecturerDashboardPage } from "./lecturerDashboard";
import { redirect } from "react-router-dom";


export const DashboardPage: React.FC = () => {
  const role = localStorage.getItem('role');

   const parsedRole = role!== null? JSON.parse(role): {role: null}


  console.log(parsedRole);  
  
  if (parsedRole.role === 'student') {
    return <StudentDashboardPage />
  }
  else if (parsedRole.role === 'lecturer')  {
    return <LecturerDashboardPage />
  }
  else {
    redirect('/student-login')
  }
};
