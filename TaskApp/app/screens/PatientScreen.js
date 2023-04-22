import React, { useContext} from "react";
import { StyleSheet,View,Text } from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebaseConfig";


import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import PatientGender from "../components/patient/PatientGender";
import PatientDOB from "../components/patient/PatientDOB";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import { createPatient } from "../actions";




const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  gender:Yup.string(),
  dob:Yup.string().required(),
});

function PatientScreen({navigation}) {

  const {store}=useContext(AuthContext);

  const todoRef=firebase.firestore().collection('patientDetails');
  const sendDataToFirebase =  (userInfo)=>{

    todoRef.add(userInfo)
            .then(()=>{
              console.log("posted data")
            })
            .catch((error)=>{
              console.log(error);
            })
  }


  const handleSubmit=async (userInfo)=>{
    sendDataToFirebase(userInfo);
    store.dispatch(createPatient(userInfo));
    navigation.navigate('Home');
};

  return (
    <>  
    <Screen style={styles.container}>
      <View style={{width:"100%",padding:20,backgroundColor:colors.secondary,alignItems:"center"}}>
      <Text>ENTER PATIENT DETAILS</Text>
      </View>
     
      <Form
        initialValues={{ name: "",gender:"MALE",dob:""}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
   
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />

        <PatientGender/>

        <PatientDOB/>
        
        <SubmitButton title="Create Patient"/>
      </Form>
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default PatientScreen;
