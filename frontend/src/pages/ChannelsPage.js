import { useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ChannelCard from '../components/ChannelCard';
import CreateChannelModal from '../components/CreateChannelModal';
import SearchBar from '../components/SearchBar';
import channelService from '../services/channelService';
import { AuthContext } from '../context/AuthContext';

const ChannelsPage = () => {
  const { user } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchChannels() {
      try {
        const data = await channelService.getChannels();
        setChannels(data);
        setFilteredChannels(data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    }
    fetchChannels();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredChannels(channels);
    } else {
      const filtered = channels.filter(channel =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (channel.description && channel.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredChannels(filtered);
    }
  };

  const handleCreateChannel = async (channelData) => {
    try {
      const newChannel = await channelService.createChannel({...channelData, userId: user.id});
      const updatedChannels = [...channels, newChannel];
      setChannels(updatedChannels);
      setFilteredChannels(updatedChannels);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  return (
    <Container className="my-5">
      <h2>Channels</h2>
      <SearchBar placeholder="Search channels..." onSearch={handleSearch} />
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Create Channel
      </Button>
      <Row>
        {filteredChannels.map((channel) => (
          <Col key={channel.id} md={4} className="mb-3">
            <ChannelCard channel={channel} />
          </Col>
        ))}
      </Row>
      <CreateChannelModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleCreate={handleCreateChannel}
      />
    </Container>
  );
};

export default ChannelsPage;
