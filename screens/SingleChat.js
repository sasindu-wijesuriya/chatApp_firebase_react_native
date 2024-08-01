import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, set, push } from "firebase/database";

const SingleChat = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const [user1, setUser1] = useState("User_1");
  const [user2, setUser2] = useState("User_2");
  let tempChatRoomID = "";

  function sendMessageHandler() {
    tempChatRoomID = user1 < user2 ? user1 + "^" + user2 : user2 + "^" + user1;
    msgID = push(ref(db, "chats/" + tempChatRoomID), {
      msg: messageToSend,
      sender: user1,
      receiver: user2,
    });
    console.log(msgID);
    console.log(
      "Msg sent ---> chatRoomID:",
      tempChatRoomID,
      "\tmsgID:",
      msgID,
      "\tmessage:",
      messageToSend
    );
    setMessageToSend("");
  }

  useEffect(() => {
    tempChatRoomID = user1 < user2 ? user1 + "^" + user2 : user2 + "^" + user1;
    const dbRef = ref(db, "chats/" + tempChatRoomID);
    onValue(dbRef, (snapshot) => {
      const dataReceived = snapshot.val();
      console.log(dataReceived);
    });
  }, [db]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type the message to send"
        value={messageToSend}
        onChangeText={setMessageToSend}
      />
      <Button
        title="Send"
        onPress={sendMessageHandler}
        disabled={messageToSend.length === 0}
      />
      <Button title="Get Messages" />
    </View>
  );
};

export default SingleChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messagesContainer: {
    flex: 1,
    marginTop: 10,
  },
  message: {
    marginBottom: 5,
  },
  messageUser: {
    fontWeight: "bold",
    marginRight: 5,
  },
  messageText: {
    flex: 1,
  },
});
