import ImageUpload from "@/components/ImageUploadnext-13";
import Input from "@/components/Inputnext-13";
import Modal from "@/components/Modalnext-13";
import { useCurrentUser } from "@/hooks/useCurrentUsernext-13";
import useEditModal from "@/hooks/useEditModalnext-13";
import useUser from "@/hooks/useUsernext-13";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();

  const { mutate: editUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setusername] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setProfileImage(currentUser.profileImage);
      setName(currentUser.name);
      setBio(currentUser.bio);
      setusername(currentUser.username);
      setCoverImage(currentUser.coverImage);
    }
  }, [currentUser]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    try {
      axios.patch(`/api/edit/`, {
        profileImage,
        name,
        bio,
        username,
        coverImage,
      });
      editUser();
      toast.success("Profile updated");
      editModal.closeModal();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <ImageUpload value={profileImage} onChange={setProfileImage} label="Profile Image" disabled={isLoading} />
      <ImageUpload value={coverImage} onChange={setCoverImage} label="Cover Image" disabled={isLoading} />
      <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
      <Input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} disabled={isLoading} />
      <Input type="text" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} disabled={isLoading} />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-500 text-center mt-4">
      <p className="text-white">
        First time using Twitter? {""}
        <span className="text-red-200 cursor-pointer underline hover:underline ">Create an account</span>
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={editModal.isOpen}
      onClose={editModal.closeModal}
      title="Edit Profile"
      onSubmit={onSubmit}
      actionLabel="Save"
      disabled={isLoading}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default EditModal;
