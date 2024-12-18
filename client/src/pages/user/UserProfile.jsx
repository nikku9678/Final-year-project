import React, { useEffect, useState } from "react";
import {
  
  Typography,
  Button,
  Avatar,
  Modal,
  Input
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import {

  Dialog,
  Card,
 
  CardBody,
  CardFooter,


  Checkbox,
} from "@material-tailwind/react";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("token")) || null;
  console.log(token);
  const [profileData, setProfileData] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({
    codingProfiles: {
      codeforces: "",
      leetcode: "",
      hackerrank: ""
    },
    phoneNo: "",
    githubUrl: "",
    linkedinUrl: "",
    aboutUs: "",
    skills: []
  });

  React.useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `${BASE_URL}/u/profileInfo/${user?.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setProfileData(response.data.profile);
          setEditData(response.data.profile);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, [user, token]);

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/u/profiles/${profileData._id}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setProfileData(response.data.profile);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile data", error);
    }
  };

  return (
    <>
      <div className="w-[80%] mx-auto border-2 p-2 mt-4 flex flex-row">
        <div className="w-1/2 border-2 flex gap-4 flex-row ">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            size="xxl"
            alt="avatar"
          />
          <div>
            <Typography variant="h4" className="">
              Hello {user?.name} {profileData ? profileData.aboutUs : "User"}
            </Typography>

            <p>{profileData ? profileData.aboutUs : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, iure."}</p>
          </div>
        </div>
        <div className="flex gap-4 w-1/2 justify-center border-2 align-center border-red-400">
        <DialogWithForm />
          <Button variant="gradient " className="h-fit">
            Resume
          </Button>
        </div>
      </div>

      <div className="w-[80%] my-4 p-4 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="h-40 border-2 border-blue-600 w-full max-w-full rounded-lg object-cover object-center">
          <Typography>{profileData ? profileData.codingProfiles.codeforces : "Hello"}</Typography>
        </div>
        <div className="h-40 border-2 border-blue-600 w-full max-w-full rounded-lg object-cover object-center">
          <Typography>{profileData ? profileData.codingProfiles.leetcode : "Hello"}</Typography>
        </div>
        <div className="h-40 border-2 border-blue-600 w-full max-w-full rounded-lg object-cover object-center">
          <Typography>{profileData ? profileData.codingProfiles.hackerrank : "Hello"}</Typography>
        </div>
        <div className="h-40 border-2 border-blue-600 w-full max-w-full rounded-lg object-cover object-center">
          <Typography>{profileData ? profileData.githubUrl : "Hello"}</Typography>
        </div>
      </div>

      
    </>
  );
};

export default UserProfile;



export function DialogWithForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { user } = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("token")) || null;
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState({
    codingProfiles: {
      codeforces: "",
      leetcode: "",
      hackerrank: ""
    },
    phoneNo: "",
    githubUrl: "",
    linkedinUrl: "",
    aboutUs: "",
    skills: []
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (user) {
          const response = await axios.get(
            `${BASE_URL}/u/profileInfo/${user?.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          setProfileData(response.data.profile);
          setEditData(response.data.profile);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, [user, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/u/profiles/${profileData._id}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setProfileData(response.data.profile);
      handleOpen(); // Close the modal on successful update
    } catch (error) {
      console.error("Error updating profile data", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="h-fit">Edit</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-[100vw]"
      >
        <Card className="">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit Profile
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Edit your profile details below.
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input value={profileData?.codingProfiles.codeforces} onChange={handleInputChange} label="Codeforces URL" size="lg" name="codingProfiles.codeforces" />

            <Input value={profileData?.codingProfiles.leetcode} onChange={handleInputChange} label="LeetCode URL" size="lg" name="codingProfiles.leetcode" />

            <Input value={profileData?.codingProfiles.hackerrank} onChange={handleInputChange} label="Hackerrank URL" size="lg" name="codingProfiles.hackerrank" />

            <Input value={profileData?.phoneNo} onChange={handleInputChange} label="Phone Number" size="lg" name="phoneNo" />

            <Input value={profileData?.githubUrl} onChange={handleInputChange} label="GitHub URL" size="lg" name="githubUrl" />

            <Input value={profileData?.linkedinUrl} onChange={handleInputChange} label="LinkedIn URL" size="lg" name="linkedinUrl" />

            <Input value={profileData?.aboutUs} onChange={handleInputChange} label="About Us" size="lg" name="aboutUs" />

            <Typography className="-mb-2" variant="h6">
              Your Skills
            </Typography>
            <Checkbox label="React" onChange={() => setEditData((prev) => ({
              ...prev,
              skills: prev.skills.includes('React') ? prev.skills.filter(skill => skill !== 'React') : [...prev.skills, 'React']
            }))} checked={editData.skills.includes('React')} />
            <Checkbox label="Node.js" onChange={() => setEditData((prev) => ({
              ...prev,
              skills: prev.skills.includes('Node.js') ? prev.skills.filter(skill => skill !== 'Node.js') : [...prev.skills, 'Node.js']
            }))} checked={editData.skills.includes('Node.js')} />
            <Checkbox label="JavaScript" onChange={() => setEditData((prev) => ({
              ...prev,
              skills: prev.skills.includes('JavaScript') ? prev.skills.filter(skill => skill !== 'JavaScript') : [...prev.skills, 'JavaScript']
            }))} checked={editData.skills.includes('JavaScript')} />
            <Checkbox label="HTML" onChange={() => setEditData((prev) => ({
              ...prev,
              skills: prev.skills.includes('HTML') ? prev.skills.filter(skill => skill !== 'HTML') : [...prev.skills, 'HTML']
            }))} checked={editData.skills.includes('HTML')} />
            <Checkbox label="CSS" onChange={() => setEditData((prev) => ({
              ...prev,
              skills: prev.skills.includes('CSS') ? prev.skills.filter(skill => skill !== 'CSS') : [...prev.skills, 'CSS']
            }))} checked={editData.skills.includes('CSS')} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleFormSubmit} fullWidth>
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
