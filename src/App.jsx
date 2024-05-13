/* eslint-disable no-unused-vars */
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider  } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'
import NotFoundPage from './pages/NotFoundPage'
import JobsPage from './pages/JobsPage'
import JobPage, { jobLoader } from './pages/JobPage'

const App = () => {

  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index={true} path='/' element={<HomePage />}/>
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path='/edit-job/:id' element={<EditJobPage editJobSubmit={updateJob}/>} loader={jobLoader}/>
        <Route path='/jobs' element={<JobsPage />}/>
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App