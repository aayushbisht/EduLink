import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import CompanyLogin from "./pages/CompanyLogin";
import CompanyRegister from "./pages/CompanyRegister";
import CompanyPage from "./pages/CompanyPage";
import CollegeLogin from "./pages/CollegeLogin";
import CollegeRegister from "./pages/CollegeRegister";
import CollegePage from "./pages/CollegePage";
import { CollegeAbout } from "./components";
import { About } from "./components";
import CheckAboutCompany from "./pages/CheckAboutCompany";
import CheckAboutCollege from "./pages/CheckAboutCollege";
import Stats from "./components/Stats";
import EmailVerify from "./components/EmailVerify";
import CompanyEmailVerify from "./components/CompanyEmailVerify";
import CollegeEmail from "./pages/CollegeEmail";
import CollegeResetPass from "./components/EmailVerify/CollegeResetPass";
import CompanyEmail from "./pages/CompanyEmail"
import CompanyResetPass from "./components/CompanyEmailVerify/CompanyResetPass";


function App() {

  const userId = localStorage.getItem("companytoken") || localStorage.getItem("collegetoken");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/companyregister" element={<CompanyRegister />} />
          <Route exact path="/companylogin" element={<CompanyLogin />} />
          <Route exact path="/companypage" element={<CompanyPage />} />
          <Route exact path="/collegelogin" element={<CollegeLogin />} />
          <Route exact path="/collegeregister" element={<CollegeRegister />} />
          <Route exact path="/collegepage" element={<CollegePage />} />
          <Route exact path="/collegepage/:collegeId/collegeabout" element={<CollegeAbout />} />
          <Route exact path="/companypage/:companyId/companyabout" element={<About />} />
          <Route exact path="/collegepage/:companyId/view/companyabout" element={<CheckAboutCompany />} />
          <Route exact path="/companypage/:collegeId/view/collegeabout" element={<CheckAboutCollege />} />
          <Route exact path="/collegeregister/:id/verify/:token" element = {<EmailVerify />}/>
          <Route exact path="/companyregister/:id/verify/:token" element = {<CompanyEmailVerify />}/>
          <Route exact path="/collegereset" element={<CollegeEmail />} />
          <Route exact path="/collegereset/:id/verify/:token" element={<CollegeResetPass/>} />
          <Route exact path="/companyreset" element={<CompanyEmail />} />
          <Route exact path="/companyreset/:id/verify/:token" element={<CompanyResetPass/>} />

          <Route exact path="/stats" element={<Stats />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
