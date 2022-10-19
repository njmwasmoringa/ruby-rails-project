import './App.css';
import { useEffect, useState } from "react";
import Members from './members/Member';
import Layout from './layout/Layout';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MemberDetails from './members/MemberDetails';

function App() {

  const [members, setMembers] = useState([]);

  useEffect(() => {

    fetch("/members").then(res => res.json())
      .then(members => {
        setMembers(members);
      });

  }, []);

  function updateMembers(newMember) {
    if (newMember && newMember.name) {
      const updatedMemberIndex = members.findIndex(m => m.id == newMember.id);
      if (updatedMemberIndex > -1) {
        setMembers(() => {
          members[updatedMemberIndex] = newMember
          return members;
        });
      }
      else {
        setMembers([...members, newMember])
      };
    }
  }

  return (<Layout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Members members={members} onAddMember={updateMembers} />} />
      </Routes>
      <Routes>
        <Route path="/details/:id" element={<MemberDetails />} />
      </Routes>
    </BrowserRouter>
  </Layout>
  );
}

export default App;
