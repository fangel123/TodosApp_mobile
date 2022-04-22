import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList} from "react-native";
import Card from "../components/Card";
import { COLORS } from "../utils";
import axios from "axios";

export default function Homepage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  function addText(text) {
    if (value !== "") {
      axios
        .post(
          "https://api.kontenbase.com/query/api/v1/8addf18b-228b-491d-82d6-81506a7120cc/todos",
          {
            notes: text,
          }
        )
        .then((res) => console.log(res))
        .catch((error) => {
          console.log(error);
        });
      setValue("");
    } else {
      alert("No todos to work");
    }
  }

  useEffect(() => {
    getTodos();
  }, [value]);

  function getTodos() {
    axios
      .get(
        "https://api.kontenbase.com/query/api/v1/8addf18b-228b-491d-82d6-81506a7120cc/todos"
      )
      .then((res) => {
        setList(res.data);
      })
      .catch(() => {
        alert("Error Fetch Data");
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>List of things ...</Text>

      <View style={{ height: "84%" }}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <Card
              text={item.notes}
              _id={item._id.toString()}
              refresh={getTodos}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>

      <View style={styles.textBoxWrap}>
        <TextInput
          style={styles.textInput}
          placeholder={"Plan it here!"}
          onChangeText={(text) => setValue(text)}
          value={value}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={() => addText(value)}>
          <Text style={styles.btnStyle}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "black",
    padding: 19,
  },
  textBoxWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 19,
  },
  textInput: {
    borderRadius: 15,
    backgroundColor: "white",
    height: 45,
    width: "87%",
    color: COLORS.text,
    marginRight: 10,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  btnAdd: {
    borderRadius: 15,
    backgroundColor: "#4B7BE5",
    height: 45,
    justifyContent: "center",
    width: "15%",
    alignItems: "center",
  },
  btnStyle: {
    fontSize: 37,
    color: "white",
    fontFamily: "Avenir",
  },
  headerTxt: {
    fontSize: 24,
    marginBottom: 17,
    color: COLORS.secondary,
  },
});
