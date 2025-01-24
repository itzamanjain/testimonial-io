"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast, {Toaster} from 'react-hot-toast';
import { useRouter } from "next/navigation";
export default function EditProfile() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    avatar: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const updatedData = new FormData();

    // Append only fields that have values
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        updatedData.append(key, value);
      }
    });

    try {
      const response = await fetch("/api/user/edit-profile", {
        method: "PATCH",
        body: updatedData,
      });
      toast.success('Profile updated successfully!');

      if (response.ok) {
      
        // Reset form fields
        setFormData({
          name: "",
          email: "",
          username: "",
          avatar: null,

        });
        router.push('/profile');
      } else {
        toast.error('Failed to update profile.');
        
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full min-h-screen m-5 max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Edit Profile</CardTitle>
        </div>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label>Name (Optional)</label>
            <Input
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email (Optional)</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Username (Optional)</label>
            <Input
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Avatar (Optional)</label>
            <Input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
      <Toaster />
    </Card>
  );
}
