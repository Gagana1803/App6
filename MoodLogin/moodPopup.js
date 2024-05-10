// MoodDetailsPopup.js

import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

const MoodDetailsPopup = ({ visible, onClose, date, mood, positiveEmotions, negativeEmotions, summary, time }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Date: {date}</Text>
          <Text style={styles.modalText}>Mood: {mood}</Text>
          <Text>Positive Emotions: {Array.isArray(positiveEmotions) ? positiveEmotions.join(', ') : 'N/A'}</Text>
          <Text>Negative Emotions: {Array.isArray(negativeEmotions) ? negativeEmotions.join(', ') : 'N/A'}</Text>
          <Text style={styles.modalText}>Summary: {summary}</Text>
          <Text style={styles.modalText}>time: {time}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
  },
});

export default MoodDetailsPopup;
