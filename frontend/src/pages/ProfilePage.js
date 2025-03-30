// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import userService from '../services/userService';

const ProfilePage = () => {
  const [profile, setProfile] = useState({ displayName: '', username: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ displayName: '' });
  const [message, setMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await userService.getProfile();
        setProfile(data);
        setFormData({ displayName: data.displayName });
        // If no avatar provided, generate a random one each time the page is opened
        if (!data.avatar) {
          const randomAvatar = `https://robohash.org/${Math.random().toString(36).substring(7)}?set=set4`;
          setAvatarUrl(randomAvatar);
        } else {
          setAvatarUrl(data.avatar);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await userService.updateProfile(formData);
      setProfile(updatedProfile);
      setMessage('Profile updated successfully.');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile.');
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <p>Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2>User Profile</h2>
      {message && <p>{message}</p>}
      {!editMode ? (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Display Name:</strong> {profile.displayName}</p>
          <div>
            <strong>Avatar:</strong>
            <br />
            <Image src={avatarUrl} rounded width="150" height="150" alt="User Avatar" />
          </div>
          <Button variant="primary" className="mt-3" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        </div>
      ) : (
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="displayName" className="mb-3">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* We are not editing avatar since it's generated randomly */}
          <Button variant="secondary" onClick={() => setEditMode(false)} className="me-2">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ProfilePage;
